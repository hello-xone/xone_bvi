import { createAlova } from 'alova';
// eslint-disable-next-line import/no-unresolved
import adapterFetch from 'alova/fetch';
import ReactHook from 'alova/react';
import { toaster } from '~/components/ui/toaster';
import userStore from '~/store/userStore';
import { API_BASE_URL } from '~/config/env';

export const alovaInstance = createAlova({
	baseURL: API_BASE_URL,
	requestAdapter: adapterFetch(),
	statesHook: ReactHook,
	// cacheFor: null
	async beforeRequest(method) {
		if (method.url.startsWith('http')) {
			method.baseURL = ''
		}

		if (typeof localStorage !== 'undefined') {
			method.config.headers['X-Token'] = localStorage.getItem("XToken")
		}
	},
	responded: {
		onSuccess: async (response) => {
			if (response.status >= 400) {
				throw new Error(response.statusText)
			}
			const res = await response.json()
			const { code, errMsg, message, data, result } = res
			switch (code) {
				case 0:
				case 200:
					return result ?? data
				case 10005:
					// logout
					userStore.getState().actions.logout();
					break
				default:
					toaster.create({
						description: errMsg || message,
						type: "error",
					});
					return Promise.reject(errMsg || message)
			}
		}
	}
});