import { alovaInstance } from "../index"

export const season = () => alovaInstance.Get("/season")

export const epoch = () => alovaInstance.Get("/season/epoch")

export const detail = () => alovaInstance.Get("/season/detail")

export const person = (params = {}) => alovaInstance.Get("/rank", { params })

export const convert = (params = {}) => alovaInstance.Get("/convert", { params })

export const convertList = (params = {}) => alovaInstance.Get("/convert/list", { params })

export const reward = (params = {}) => alovaInstance.Get("/member/reward", { params })

export const teamHome = () => alovaInstance.Get("/team/home")

export const teamSearch = (params) => alovaInstance.Get("/team", { params })

export const teamData = (params = {}) => alovaInstance.Get("/team/data", { params })

export const bviData = (params = {}) => alovaInstance.Get("/data", { params })

export const teamJoinTotal = () => alovaInstance.Get("/team/join/total")

export const teamJoinList = (params = {}) => alovaInstance.Get("/team/join/list", { params })

export const teamDetail = (params = {}) => alovaInstance.Get("/team/detail", { params })

export const teamBehavior = (params = {}) => alovaInstance.Get("/team/behavior", { params })

export const teamContribute = (params = {}) => alovaInstance.Get("/team/behavior/logs", { params })

export const teamTrend = (params = {}) => {
	const { time, ...rest } = params as any
	return alovaInstance.Get(`/team/trend?time=${time[0]}&time=${time[1]}`, { params: rest })
}

export const teamMember = (params = {}) => alovaInstance.Get("/team/member", { params })

export const teamJoin = (data = {}) => alovaInstance.Post("/team/join", data)

export const teamEdit = (data: any = {}) => alovaInstance[data.no ? 'Put' : 'Post']("/team", data)

export const gv2token = (data = {}) => alovaInstance.Post("/member/gv2token", data)

export const uploadImage = async (files) => {
	return Promise.allSettled(Object.entries(files).map(async ([key, file]) => {
		if (!(file instanceof File)) {
			return file
		}
		// 使用本地代理路径访问上传接口
		const { data: { name, url } } = await fetch(`${import.meta.env.VITE_APP_UPLOAD_FILE_BASE_URL}/file/upload`, {
			method: 'POST',
			body: JSON.stringify({ type: 'png' }),
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(r => r.json())

		let proxyUrl = url
		if (import.meta.env.DEV) {
			proxyUrl = url.replace(import.meta.env.VITE_APP_IMAGE_BASE_URL, '/api/v3')
		}

		return await fetch(proxyUrl, {
			method: 'PUT',
			body: file as File,
		}).then(() => {
			files[key] = name.replace(import.meta.env.VITE_APP_IMAGE_BASE_URL, '')
			return files[key]
		})

	}))
}

export const logsDownload = (params = {}) => window.open(`${import.meta.env.VITE_APP_BASE_URL}/team/behavior/logs-download?${new URLSearchParams(params).toString()}`, '_blank')

export const memberDownload = (params = {}) => alovaInstance.Get("/team/member-download", {
	params,
	headers: {
		Accept: 'text/csv'
	}
})
