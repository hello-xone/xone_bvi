import { useResponsive } from "ahooks";

export default function useMobile() {

	const responsive = useResponsive();

	return responsive.sm && !responsive.md || Object.values(responsive).every(val => !val)
}