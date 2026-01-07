import { useEffect, useState } from "react";
import Identicons from "@nimiq/identicons";
import { useDeepCompareEffect } from "ahooks";

export default function useHashAvatar(data: string | any[], key?: string) {
	const [avatarUrl, setAvatarUrl] = useState<string>("");
	const [processedData, setProcessedData] = useState<any>([]);

	useDeepCompareEffect(() => {
		if (!data) return;

		const fetchAvatar = async (txt: string) => {
			const url = await Identicons.toDataUrl(txt);
			setAvatarUrl(url);
			return url;
		};

		if (Array.isArray(data)) {
			const processArray = async () => {
				const newData = await Promise.all(
					data.map(async (item, index) => {
						if (!key) {
							return await fetchAvatar(item);
						}
						if (!item?._logo) {
							return {
								...item,
								_logo: await fetchAvatar(item[key])
							};
						}
						return item;
					})
				);
				setProcessedData(newData);
			};
			processArray();
			return;
		}

		fetchAvatar(data);
	}, [data, key]);

	return Array.isArray(data) ? processedData : avatarUrl;
}