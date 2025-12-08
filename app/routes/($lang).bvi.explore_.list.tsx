import {
  Button,
  Flex,
  SimpleGrid,
  Stack,
  useUpdateEffect,
} from "@chakra-ui/react";
import { useRequest } from "alova/client";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { IoIosArrowRoundForward } from "react-icons/io";
import { teamJoinTotal, teamJoinList } from "~/api/modules/bvi";
import Item from "~/components/page/bvi/explore/Item";
import Breadcrumb from "~/components/ui/breadcrumb";
import NoData from "~/components/ui/no-data";
import { useQueryParams } from "~/hooks/useQueryParams";
import BreadcrumbH5 from "~/components/ui/breadcrumb-h5";
import useHideTopSubPage from "~/hooks/useHideTopSubPage";
import useMobile from "~/hooks/useMobile";

export default function BVIExploreList() {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const [checked, setChecked] = useState(0);

  const { data: counts }: any = useRequest(teamJoinTotal, {
    force: true,
    initialData: { project_num: 0, organization_num: 0 },
  });

  const { data, send, loading }: any = useRequest(
    () => teamJoinList({ type: tabs[checked].type }),
    {
      force: true,
      initialData: { list: [] },
    }
  );
  useHideTopSubPage();

  const tabs = [
    { title: "Joined projects", type: "project", num: counts?.project_num },
    {
      title: "Joined organizations",
      type: "organization",
      num: counts?.organization_num,
    },
  ];

  const {
    params: { query },
    setPageParams,
  } = useQueryParams({
    data,
    query: { type: tabs[checked].type },
    page_size: 15,
    refetch: send,
  });

  useUpdateEffect(() => {
    setPageParams({ type: tabs[checked].type });
  }, [checked]);

  return (
    <Stack
      gap={{ base: "0", md: "20px" }}
      p={{ base: "!0", md: "!22px" }}
      bg={{ base: "#FFF", md: "transparent" }}
      h={{ base: "100vh", md: "auto" }}
    >
      {isMobile ? (
        <BreadcrumbH5 title={t("Item List")} to={"/bvi/explore"} />
      ) : (
        <Breadcrumb
          data={[
            { title: t("Explore"), to: "/bvi/explore" },
            { title: t("Item List") },
          ]}
        />
      )}

      <Flex
        data-nobold
        px={{ base: "16px", md: "0" }}
        pt={{ base: "16px", md: "0" }}
        alignItems="center"
        color="#979797"
        fontSize={{ base: "16px", md: "20px" }}
        fontWeight={{ base: "400", md: "600" }}
        gap={{ base: "12px", md: "22px" }}
      >
        {tabs.map((item, index) => (
          <Flex
            key={item.title}
            align="center"
            data-state={checked === index ? "checked" : "unchecked"}
            cursor="pointer"
            _checked={{
              fontSize: { base: "16px", md: "24px" },
              fontWeight: 700,
              color: { base: "#FF0206", md: "black" },
              cursor: "default",
            }}
            h="30px"
            alignItems="center"
            transition="all 0.3s"
            onClick={() => setChecked(index)}
          >
            {item.title}({item.num})
          </Flex>
        ))}
      </Flex>
      <SimpleGrid
        p="20px"
        bg="white"
        rounded="20px"
        columns={data?.list?.length ? [null, null, 1, 1, 2, 3] : 1}
        gap={{ base: "16px", md: "20px" }}
      >
        {data?.list?.map?.((item) => (
          <Item flex="1" key={item.no} item={item}>
            <Button
              variant="ghost"
              rounded="30px"
              h={{ base: "28px", md: "38px" }}
              ml="auto"
              border="1px solid #C6C6C6"
              fontSize={{ base: "12px", md: "16px" }}
              fontWeight="600"
              color="black"
              pos="relative"
            >
              {t("Details")}
              <ReactSVG
                src="/images/icons/arrow-right.svg"
                className={clsx({
                  "[&_svg]:w-[24px] [&_svg]:h-[24px]": !isMobile,
                  "[&_svg]:w-[16px] [&_svg]:h-[16px]": isMobile,
                })}
              />
            </Button>
          </Item>
        ))}
        {!data?.list?.length && <NoData loading={loading} py="50px" />}
      </SimpleGrid>
    </Stack>
  );
}
