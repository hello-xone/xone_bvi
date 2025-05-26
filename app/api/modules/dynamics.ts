import { alovaInstance } from "../index"

export const pageRelease = async (params = {}) => alovaInstance.Get("https://api.xone.org/count/pageRelease", { params })