export const stats = () => fetch(`${import.meta.env.VITE_APP_BLOCK_EXPLORER_API}/api/v1/counters`).then(r => r.json())

export const artwork = () => fetch(`${import.meta.env.VITE_APP_NFT_EXPLORER}/api/v1/nft/total`).then(r => r.json())

export const statsByNet = () => fetch(`${import.meta.env.VITE_APP_BLOCK_EXPLORER_API}/api/v2/stats`, {
	method: "GET",
	headers: {
		"updated-gas-oracle": true,
	} as any,
}).then(r => r.json())

const RELEASE_BASE_URL = import.meta.env.VITE_APP_RELEASE_BASE_URL

export const daily = (params: any) => fetch(`${RELEASE_BASE_URL}/count/daily?${new URLSearchParams(params)}`, {
	method: "GET",
	headers: {
		accept: "application/json",
	},
}).then(r => r.json())

export const activity = () => fetch("https://api.lu.ma/public/v1/calendar/list-events", {
	method: "GET",
	headers: {
		accept: "application/json",
		"x-luma-api-key": import.meta.env.VITE_APP_LUMA_API_KEY as string,
	},
}).then(r => r.json())


