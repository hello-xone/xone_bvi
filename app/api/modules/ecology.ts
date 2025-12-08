import { alovaInstance } from "../index"
export const dappCategory = (params = {}) => alovaInstance.Get("/dapp/category", { params })

export const dapp = (params = {}) => alovaInstance.Get("/dapp", { params })