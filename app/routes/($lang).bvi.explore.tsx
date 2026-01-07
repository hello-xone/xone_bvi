import { Show, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import AllItems, { TAllTimes } from "~/components/page/bvi/explore/AllItems";
import Banner from "~/components/page/bvi/explore/Banner";
import CardList, { TCardList } from "~/components/page/bvi/explore/CardList";
import Notic from "~/components/ui/notic";
import { LoaderFunction } from "@remix-run/node";
import { teamData, teamHome } from "~/api/modules/bvi";
import { useLoaderData } from "@remix-run/react";
import LoginVisible from "~/components/ui/login-visible";
import JoinedProjects from "~/components/page/bvi/explore/JoinedProjects";
import useUserStore from "~/store/userStore";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const time = url.searchParams.get("time");
  let res = [{}, {}];
  try {
    res = await Promise.allSettled([
      teamHome().send(true),
      teamData({ type: parseInt(time || "24") }).send(true),
    ]);
  } catch (error) {}
  return res.map((r: any) => r.value || {});
};

export default function BVIExplore() {
  const { t } = useTranslation();
  const [teamHomeRes, teamDataRes] = useLoaderData<[TCardList, TAllTimes]>();
  const { userInfo } = useUserStore();

  return (
    <Stack
      gap={{ base: "20px", md: "30px" }}
      padding={{ base: "!0", md: "!22px" }}
    >
      <Banner />
      <Stack px={{ base: "16px", md: "0" }} gap={{ base: "20px", md: "30px" }}>
        <LoginVisible>
          <Show when={!!userInfo.role}>
            <JoinedProjects />
          </Show>
        </LoginVisible>
        <Notic>
          {t(
            "Their information is provided by the application personnel who created them, and Xone cannot control or participate in any practices related to their services, content, privacy, etc. Please pay attention to protecting your privacy and property security."
          )}
        </Notic>
        <CardList data={teamHomeRes} />
        <AllItems data={teamDataRes as any} />
      </Stack>
    </Stack>
  );
}
