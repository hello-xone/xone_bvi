import { Flex, Stack } from "@chakra-ui/react";
import Banner from "~/components/page/community/Banner";
import Notice from "~/components/page/community/Notice";
import Engineering from "~/components/page/community/Engineering";
import Collaboration from "~/components/page/community/Collaboration";
import Opportunities from "~/components/page/community/Opportunities";
import JoinUs from "~/components/page/community/JoinUs";

export default function Community() {
	return (
		<Flex flexDirection="column" p={{ base: "!0", md: "!22px" }}>
			<Banner />
			<Stack px={{ base: "16px", md: "!0" }}>
				<Notice />
				<Engineering />
				<Collaboration />
				<Opportunities />
				<JoinUs />
			</Stack>
		</Flex>
	)
}