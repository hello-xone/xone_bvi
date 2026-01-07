FROM public.ecr.aws/docker/library/node:20-alpine AS base

FROM base AS builder

ARG DOCKER_NODE_ENV
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat gcc musl-dev g++ make python3
WORKDIR /app

# Install dependencies based on the preferred package manager
# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN npm install -g corepack@latest && corepack enable pnpm

ENV CI=true
ENV PNPM_FORCE_STREAM=true

COPY . .
RUN ping registry.npmjs.org -c 4
RUN pnpm i --frozen-lockfile

RUN case ${DOCKER_NODE_ENV} in \
    test) \
    cp config_devops/config .env.test && pnpm run build:test \
    ;; \
    production) \
    cp config_devops/config .env.production && pnpm run build \
    ;; \
    *)\
    ;; \
    esac

FROM base AS runner
WORKDIR /app

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN npm install -g corepack@latest && corepack enable pnpm

RUN npm uninstall -g cross-spawn && \
    npm cache clean --force && \
    # Find and remove any remaining old versions
    find /usr/local/lib/node_modules -name "cross-spawn" -type d -exec rm -rf {} + && \
    # Install new version
    npm install -g cross-spawn@7.0.5 --force

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/remix.config.js .
COPY --from=builder /app/package.json .

# expose port
EXPOSE 9623
ENV PORT=9623
ENV HOSTNAME="0.0.0.0"
CMD [ "pnpm", "run", "start" ]
