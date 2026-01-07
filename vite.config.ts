import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  build: {
    target: "esnext",
    minify: true,
    cssMinify: true,
  },
  define: {
    'process.env': process.env
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    proxy: {
      "/api/v3": {
        target: "https://xo-image-af92h8.s3.ap-southeast-1.amazonaws.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/v3/, ""),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, HEAD, OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        },
      },
    }
  },
  ssr: {
    noExternal: [
      /^@tokenup\/.*/,
      'styled-components',
      '@emotion/react',
    ]
  },
  optimizeDeps: {
    include: [
      '@chakra-ui/react',
      '@emotion/react',
      'react',
      'react-dom',
    ]
  }
});
