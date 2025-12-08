import { Flex, Show, SimpleGrid, Wrap } from "@chakra-ui/react";
import { useParams } from "@remix-run/react";
import IdentityTopInfo from "~/components/page/bvi/overview/IdentityTopInfo";
import Season from "~/components/page/bvi/overview/Season";
import GV2XOC from "~/components/page/bvi/overview/GV2XOC";
import Ranking from "~/components/page/bvi/overview/Ranking";
import Data from "~/components/page/bvi/overview/Data";
import Overview from "~/components/page/bvi/overview/Overview";
import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "~/sessions";

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

  return null;
};

export default function BVIOverviewIdentity() {
  const { identity } = useParams();

  return (
    <Flex direction="column" gap="20px">
      <IdentityTopInfo identity={identity} />
      <Show when={identity !== "person"}>
        <Overview identity={identity} />
      </Show>
      <Flex direction={{ xl: "column", "2xl": "row" }} gap="20px">
        <Wrap maxW={{ "2xl": "848px" }} direction="column" gap="20px">
          <Season />
          <GV2XOC />
        </Wrap>
        <Ranking />
      </Flex>
      <Data />
    </Flex>
  );
}
