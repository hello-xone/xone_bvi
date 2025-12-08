import { Flex } from "@chakra-ui/react";
import Banner from "~/components/page/ecology/Banner";
import Category from "~/components/page/ecology/Category";

export default function Ecology() {
	return (
		<Flex direction="column">
			<Banner />
			<Category />
		</Flex>
	)
}