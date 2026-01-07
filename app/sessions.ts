import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno
import { UserInfo } from "./store/userStore";

type SessionData = {
	userInfo: UserInfo;
	lang: string;
};

type SessionFlashData = {
	error: string;
};

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>({
		// a Cookie from `createCookie` or the same CookieOptions to create one
		cookie: {
			name: "__session",
			secrets: ["r3m1xr0ck5"],
			sameSite: "lax",
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 30, // 修改为30天（单位：秒）
			path: "/",
			secure: false,
		},
	});

export { getSession, commitSession, destroySession };