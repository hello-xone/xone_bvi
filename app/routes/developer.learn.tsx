import { Box } from "@chakra-ui/react";
import Banner from "~/components/page/developer/learn/Banner";
import Learns from "~/components/page/developer/learn/Learns";
import OpenRoles from "~/components/page/developer/learn/Open";
import Contact from "~/components/page/developer/learn/Contact";

export default function Developer() {
	return (
		<Box>
			<Banner />
			<Learns />
			<OpenRoles />
			<Contact />
		</Box>
	)
}