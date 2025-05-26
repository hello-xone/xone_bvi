import { Box, Stack } from "@chakra-ui/react";
import Banner from "~/components/page/developer/learn/Banner";
import Learns from "~/components/page/developer/learn/Learns";
import OpenRoles from "~/components/page/developer/learn/Open";
import Contact from "~/components/page/developer/learn/Contact";

export default function Developer() {
  return (
    <Box p={{ base: "!0", md: "!22px" }}>
      <Banner />
      <Stack gap="0" p={{ base: "16px", md: 0 }}>
        <Learns />
        <OpenRoles />
        <Contact />
      </Stack>
    </Box>
  );
}
