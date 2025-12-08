import { useSize } from "ahooks";
import useMobile from "./useMobile";

export default function useWidthScale(maxWidth = 1440) {

	const { width } = useSize(() => document.querySelector("body"));
	const isMobile = useMobile()

	return isMobile || width >= maxWidth ? 1 : width / maxWidth

}