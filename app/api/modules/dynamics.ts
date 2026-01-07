import { alovaInstance } from "../index"

const RELEASE_BASE_URL = import.meta.env.VITE_APP_RELEASE_BASE_URL

export const releaseProgress = async (params = {}) => alovaInstance.Get(`${RELEASE_BASE_URL}/count/releaseProgress`, { params })

export const pageRelease = async (params = {}) => alovaInstance.Get(`${RELEASE_BASE_URL}/count/pageRelease`, { params })

export const releaseInfo = async (params = {}) => alovaInstance.Get(`${RELEASE_BASE_URL}/count/releaseInfo`, { params })

export const withdraw = (data = {}) => alovaInstance.Post(`${RELEASE_BASE_URL}/claim/withdraw`, data)