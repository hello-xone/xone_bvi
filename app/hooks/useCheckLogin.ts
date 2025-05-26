import { useEffect } from "react";
import useUserStore from "~/store/userStore";
import { useNavigate } from '@remix-run/react';


export default function useCheckLogin(notLoginUrl: string = "/") {

	const { isLogin } = useUserStore();
	const navigator = useNavigate();

	useEffect(() => {
		if (!isLogin) {

			navigator(notLoginUrl);
		}
	}, [isLogin])
};