import { Stack } from "@chakra-ui/react";
import AllItems, { TAllTimes } from "~/components/page/bvi/explore/AllItems";
import Banner from "~/components/page/bvi/explore/Banner";
import CardList, { TCardList } from "~/components/page/bvi/explore/CardList";
import Notic from "~/components/ui/notic";
import { LoaderFunction } from "@remix-run/node";
import { teamData, teamHome } from "~/api/modules/bvi";
import { useLoaderData } from "@remix-run/react";
import LoginVisible from "~/components/ui/login-visible";
import JoinedProjects from "~/components/page/bvi/explore/JoinedProjects";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const time = url.searchParams.get("time");
  let res = [{}, {}];
  try {
    res = await Promise.all([
      teamHome(),
      teamData({ type: parseInt(time || "24") }),
    ]);
  } catch (error) {}

  return res;
};

export default function BVIExplore() {
  const [teamHomeRes, teamDataRes] = useLoaderData<[TCardList, TAllTimes]>();

  return (
    <Stack gap="30px">
      <Banner />
      <LoginVisible>
        <JoinedProjects />
      </LoginVisible>
      <Notic>
        Their information is provided by the application personnel who created
        them, and Xone cannot control or participate in any practices related to
        their services, content, privacy, etc. Please pay attention to
        protecting your privacy and property security.
      </Notic>
      <CardList data={teamHomeRes} />
      <AllItems data={teamDataRes as any} />
    </Stack>
  );
}
