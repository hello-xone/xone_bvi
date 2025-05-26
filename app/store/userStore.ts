import { create } from "zustand";
import { getMember } from "~/api/modules/auth";

export type UserInfo = {
	no?: string;
	address?: string;
	gv?: string;
	role?: string;
	team?: string;
	growth?: { [k: string]: any }
}

type UserStore = {
	userInfo: UserInfo;
	isLogin: boolean;
	actions: {
		getUserInfo: () => Promise<UserInfo>;
		setUserInfo: (state: any) => void;
		setIsLogin: (state: boolean) => void;
		logout: () => void;
	};
};

const useUserStore = create<UserStore>()(
	(set) => ({
		userInfo: {},
		isLogin: typeof localStorage === 'undefined' ? false : !!localStorage.getItem("XToken"),
		actions: {
			setIsLogin: (state: boolean) => {
				set(() => ({
					isLogin: state,
				}));
			},
			getUserInfo: async () => {
				return getMember().send(true).then((res) => {
					set(() => ({
						isLogin: true,
						userInfo: res,
					}));
					sessionStorage.setItem("userInfo", JSON.stringify(res))
					return res
				});
			},
			setUserInfo: (state: any) => {
				set(() => ({
					userInfo: state,
				}));
			},
			logout: () => {
				localStorage.removeItem("XToken");
				set(() => ({
					isLogin: false,
					userInfo: {},
				}));
			},
		},
	}),
);

export default useUserStore;
