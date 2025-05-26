import { alovaInstance } from "../index"

type TLogin = {
	account: string;
	auth: string;
	nonce: string;
}

export const login = async (data: TLogin) => alovaInstance.Post("/login", {
	...data,
	// account: '0x0cD651f69F8F823D0907aa5B62D97d1C2F64BEBC',
	// auth: "0xef15897145a0b9b4d475eb77fa5f5573aecca5311cd4604c844d1962262f5ab076a62e3ffe17b7ad63a7b2c83983597089a1a605aea907f707a5dfe579fd41191c",
	// nonce: "qdBF5yzzlwi3o3DZ5io4U59SJ9KSfZzpxBX3"
})

export const getMember = () => alovaInstance.Get("/member")

export const member = async () => alovaInstance.Post("/member")

export const setMember = (data = {}) => alovaInstance.Put("/member", data)