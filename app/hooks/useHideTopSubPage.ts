import useSettingStore from "~/store/settingStore";
import useMobile from "./useMobile";
import { useEffect } from "react";

export default function useHideTopSubPage() {

	const isMobile = useMobile();

	const {
		actions: { setHeader },
	} = useSettingStore();

	useEffect(() => {
		setHeader(!isMobile);
		return () => setHeader(true);
	}, [isMobile]);
}