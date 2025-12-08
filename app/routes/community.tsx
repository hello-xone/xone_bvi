import { Flex } from "@chakra-ui/react";
import Banner from "~/components/page/community/Banner";
import Notice from "~/components/page/community/Notice";
import Engineering from "~/components/page/community/Engineering";
import Collaboration from "~/components/page/community/Collaboration";
import Opportunities from "~/components/page/community/Opportunities";
import JoinUs from "~/components/page/community/JoinUs";

export default function Community() {
	return (
		<Flex flexDirection="column">
			<Banner />
			<Notice />
			<Engineering />
			<Collaboration />
			<Opportunities />
			<JoinUs />
		</Flex>
	)
}