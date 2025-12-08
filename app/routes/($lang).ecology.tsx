import { Flex } from "@chakra-ui/react";
import Banner from "~/components/page/ecology/Banner";
import Category from "~/components/page/ecology/Category";
import { LoaderFunction } from "@remix-run/node";
import { dappCategory, dapp } from "~/api/modules/ecology";
import { useLoaderData } from "@remix-run/react";


export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const category_ = url.searchParams.get("category") ?? undefined;
	const dapp_ = url.searchParams.get("dapp_name") ?? undefined;

	let res = [{}, {}];
	try {
		res = await Promise.all([
			dappCategory(),
			dapp({
				category: category_,
				dapp_name: dapp_,
				must_category: true
			}).send(true),
		]);
	} catch (error) {}
	return res;
};

export default function Ecology() {
	const [dappCategoryRes = {}, dappRes = {} ] = useLoaderData<any>();
	return (
		<Flex direction="column" p={{ base: "!0", md: "!22px" }} pos="relative">
			<Banner />
			<Category categoryRes={dappCategoryRes} dappRes={dappRes}/>
		</Flex>
	)
}