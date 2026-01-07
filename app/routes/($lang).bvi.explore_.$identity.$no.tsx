import { Show, SimpleGrid, Stack, Center, Box } from "@chakra-ui/react";
import { redirect, useParams } from "@remix-run/react";
import Banner from "~/components/page/bvi/explore/details/Banner";
import Breadcrumb from "~/components/ui/breadcrumb";
import { useRequest } from "alova/client";
import { teamDetail } from "~/api/modules/bvi";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Font from "~/components/ui/font";
import Item from "~/components/page/bvi/explore/Item";
import Contribution from "~/components/page/bvi/explore/details/Contribution";
import Data from "~/components/page/bvi/explore/details/Data";
import Contributor from "~/components/page/bvi/explore/details/Contributor";
import NoData from "~/components/ui/no-data";
import BreadcrumbH5 from "~/components/ui/breadcrumb-h5";
import JoinButton from "~/components/page/bvi/explore/details/JoinButton";
import useMobile from "~/hooks/useMobile";
import useHideTopSubPage from "~/hooks/useHideTopSubPage";
import useUserStore from "~/store/userStore";

const identitys = ["organization", "project"];

export const loader = async ({ params }) => {
  const { identity } = params;
  if (!identitys.includes(identity)) {
    return redirect("/bvi/explore");
  }

  return null;
};

export default function Details() {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const { identity, no } = useParams();
  const { isLogin } = useUserStore();

  useHideTopSubPage();

  const { data, send, loading }: any = useRequest(() => teamDetail({ no }), {
    force: true,
    immediate: false,
    initialData: {},
  });

  useEffect(() => {
    if (no) send();
  }, [isLogin, no]);

  return (
    <Stack gap={{ base: "0", md: "30px" }} p={{ base: "!0", md: "!22px" }}>
      {isMobile ? (
        <BreadcrumbH5
          title={`${identity} ${t("Details")}`}
          to={"/bvi/explore"}
        />
      ) : (
        <Breadcrumb
          data={[
            { title: t("Explore"), to: "/bvi/explore" },
            { title: `${t(identity)} ${t("Details")}` },
          ]}
        />
      )}
      <Banner data={data} refresh={send} />
      {isMobile && (
        <Center py="16px">
          <JoinButton data={data} />
        </Center>
      )}
      <Stack px={{ base: "16px", md: "0" }} gap={{ base: "16px", md: "30px" }}>
        <Stack
          bg="white"
          rounded="12px"
          p={{ base: "16px", md: "20px" }}
          gap={{ base: "16px", md: "12px" }}
        >
          <Font as="h3" size={{ base: "16px", md: "32px" }} weight="600">
            {t("Content")}
          </Font>
          <Font
            size={{ base: "12px", md: "16px" }}
            weight="400"
            color="#404150"
          >
            {data.description || t("To Be Updated")}
          </Font>
        </Stack>

        <Show when={identity === "organization"}>
          <Stack gap={{ base: "16px", md: "30px" }}>
            <Font as="h3" size={{ base: "16px", md: "32px" }} weight="600">
              {t("Joined projects")}
            </Font>
            <SimpleGrid
              columns={isMobile ? 1 : data.Projects?.length ? 3 : 1}
              bg="white"
              rounded="12px"
              gap="20px"
              p={{ base: "16px", md: "20px" }}
            >
              {data.Projects?.map?.((item: any) => (
                <Item key={item.no} item={item}>
                  {true}
                </Item>
              ))}
              {!data.Projects?.length && <NoData loading={loading} pb="20px" />}
            </SimpleGrid>
          </Stack>
        </Show>

        <Contribution data={data} />
        <Data no={no} title={t("Data")} />

        <Show when={data.my_team}>
          <Stack gap={{ base: "16px", md: "30px" }}>
            <Font as="h3" size={{ base: "16px", md: "32px" }} weight="600">
              {t("Contributor")}
            </Font>
            <Contributor />
          </Stack>
        </Show>
      </Stack>
    </Stack>
  );
}
