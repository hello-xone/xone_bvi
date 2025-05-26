import { Show, SimpleGrid, Stack } from "@chakra-ui/react";
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
  const { identity, no } = useParams();

  const { data, send, loading }: any = useRequest(() => teamDetail({ no }), {
    force: true,
    immediate: false,
    initialData: {},
  });

  useEffect(() => {
    if (no) send();
  }, []);

  return (
    <Stack gap="20px">
      <Breadcrumb
        data={[
          { title: "Explore", to: "/bvi/explore" },
          { title: `${identity} Details` },
        ]}
      />
      <Banner data={data} refresh={send} />
      <Stack gap="12px">
        <Font as="h3" size="32px" weight="600">
          {t("Content")}
        </Font>
        <Font size="16px" weight="400" color="#404150">
          {data.description || "To Be Updated"}
        </Font>
      </Stack>

      <Show when={identity === "organization"}>
        <Stack gap="30px">
          <Font as="h3" size="32px" weight="600">
            {t("Joined projects")}
          </Font>
          <SimpleGrid
            columns={data.Projects?.length ? 3 : 1}
            bg="white"
            rounded="12px"
            p="20px"
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
      <Data />

      <Show when={data.my_team}>
        <Stack gap="30px">
          <Font as="h3" size="32px" weight="600">
            {t("Contributor")}
          </Font>
          <Contributor />
        </Stack>
      </Show>
    </Stack>
  );
}
