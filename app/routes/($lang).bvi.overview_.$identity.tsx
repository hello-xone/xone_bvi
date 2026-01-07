import { Flex, Show, SimpleGrid, Wrap } from "@chakra-ui/react";
import { useLoaderData, useParams } from "@remix-run/react";
import IdentityTopInfo from "~/components/page/bvi/overview/IdentityTopInfo";
import Season from "~/components/page/bvi/overview/Season";
import GV2XOC from "~/components/page/bvi/overview/GV2XOC";
import Ranking from "~/components/page/bvi/overview/Ranking";
import DataOverview from "~/components/page/bvi/explore/details/Data";
import Data from "~/components/page/bvi/overview/Data";
import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "~/sessions";
import { useTranslation } from "react-i18next";
import JumpButton from "~/components/ui/jump-button";

export const identitys = ["person", "organization", "project"];

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userInfo = session.get("userInfo");

  if (!userInfo?.role) {
    return redirect("/bvi/overview");
  }

  const { identity } = params;

  if (!identitys.includes(identity)) {
    return redirect("/bvi/overview");
  }

  return userInfo.team;
};

export default function BVIOverviewIdentity() {
  const no: string = useLoaderData();
  const { identity } = useParams();
  const { t } = useTranslation();

  return (
    <Flex direction="column" gap="20px" p={{ base: "!16px", md: "!22px" }}>
      <IdentityTopInfo identity={identity} />
      <Show when={identity !== "person"}>
        <DataOverview no={no} title={t("Data Overview")}>
          <JumpButton
            order={{ base: -1, md: "inherit" }}
            _firstLetter={{ textTransform: "uppercase" }}
            ml="auto"
          >
            {t(identity)}?
          </JumpButton>
        </DataOverview>
      </Show>
      <Flex
        direction={{ base: "column", xl: "column", "2xl": "row" }}
        gap="20px"
      >
        <Wrap
          maxW={{ base: "full", "2xl": "848px" }}
          direction="column"
          gap={{ base: "16px", md: "20px" }}
        >
          <Season />
          <GV2XOC />
        </Wrap>
        <Ranking />
      </Flex>
      <Data />
    </Flex>
  );
}
