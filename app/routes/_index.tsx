import { Flex, Wrap } from "@chakra-ui/react";
import Activity from "~/components/page/home/Activity";
import Banner from "~/components/page/home/Banner";
import NaturalResources from "~/components/page/home/NaturalResources";
import Stats from "~/components/page/home/Stats";
import TokenRelease from "~/components/page/home/TokenRelease";
import Tools from "~/components/page/home/Tools";
import FAQ from "~/components/page/home/FAQ";

export default function Index() {
  return (
    <Flex direction="column" gap="30px">
      <Banner />
      <Stats />
      <TokenRelease />
      <Activity />
      <Wrap gap="22px">
        <NaturalResources />
        <Tools />
      </Wrap>
      <FAQ />
    </Flex>
  );
}
