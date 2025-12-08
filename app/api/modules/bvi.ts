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

