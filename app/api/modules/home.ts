import { LUMA_API_KEY } from '~/config/env';

export const stats = () => fetch("https://api.xonescan.com/api/v1/counters").then(r => r.json())

export const artwork = () => fetch("https://nft-api.xonetest.plus/api/v1/nft/total").then(r => r.json())

export const statsByNet = () => fetch("https://api.xonescan.com/api/v2/stats", {
	method: "GET",
	headers: {
		"updated-gas-oracle": true,
	} as any,
}).then(r => r.json())

export const activity = () => fetch("https://api.lu.ma/public/v1/calendar/list-events", {
	method: "GET",
	headers: {
		accept: "application/json",
		"x-luma-api-key": LUMA_API_KEY,
	},
}).then(r => r.json())


