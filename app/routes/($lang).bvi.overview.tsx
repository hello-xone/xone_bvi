import { Flex, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LoaderFunction, redirect } from "@remix-run/node";
import About from "~/components/page/bvi/overview/About";
import Banner from "~/components/page/bvi/overview/Banner";
import Follow from "~/components/page/bvi/overview/Follow";
import Identity from "~/components/page/bvi/overview/Identity";
import Other from "~/components/page/bvi/overview/Other";
import FAQ from "~/components/page/home/FAQ";

import { season } from "~/api/modules/bvi";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/sessions";
import Notic from "~/components/ui/notic";

export type SeasonData = {
  name?: string;
  start_time: number;
  end_time: number;
  join_num: number;
  running: boolean;
  join_account: string[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userInfo = session.get("userInfo");

  if (userInfo?.role) {
    return redirect(`/bvi/overview/${userInfo.role}`);
  }
  let res = {};
  try {
    res = await season();
  } catch (error) {
    console.error(error);
  }

  return res;
};

export default function BVIOverview() {
  const { t } = useTranslation();
  const data: SeasonData = useLoaderData();

  return (
    <Flex direction="column" p={{ base: "!0", md: "!22px" }}>
      <Banner data={data} />
      <Stack
        px={{ base: "16px", md: "0" }}
        pb={{ base: "20px", md: "0" }}
        gap="0"
      >
        <Follow data={data} />
        <Notic>
          {t(
            "Please note that! The selected identity plan cannot be changed after confirmation. Please choose the appropriate plan type."
          )}
        </Notic>
        <Identity />
        <Flex
          direction={{ base: "column", xl: "column", "2xl": "row" }}
          my={{ base: "20px", md: "30px" }}
          gap={{ base: "20px", md: "22px" }}
        >
          <About />
          <Other />
        </Flex>
        <FAQ />
      </Stack>
    </Flex>
  );
}
