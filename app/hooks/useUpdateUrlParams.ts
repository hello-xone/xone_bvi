import { useSearchParams } from "@remix-run/react";
import { useEffect } from "react";

type Props = {
	key: string;
	defaultParam?: string;
	isDisabled?: boolean;
}

export const useUpdateUrlParams = (props: Props) => {

	const { key, defaultParam, isDisabled = false } = props

	const [searchParams, setSearchParams] = useSearchParams(location.search);

	const param = searchParams.get(key);

	useEffect(() => {
		if (!param && !isDisabled) {
			updateParam();
		}
	}, [searchParams, isDisabled]);

	const updateParam = (value: string = defaultParam) => {
		if(value === null || value === undefined) {
			searchParams.delete(key)
			setSearchParams(searchParams, {
				preventScrollReset: true,
			});
		} else {
			searchParams.set(key, value);
			setSearchParams(searchParams, {
				preventScrollReset: true,
			});
		}
	};

	return {
		param: param || defaultParam,
		updateParam
	}
}