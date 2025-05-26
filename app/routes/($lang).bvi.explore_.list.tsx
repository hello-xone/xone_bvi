import {
  Button,
  Center,
  Flex,
  SimpleGrid,
  Stack,
  useUpdateEffect,
} from "@chakra-ui/react";
import { useRequest } from "alova/client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowRoundForward } from "react-icons/io";
import { teamJoinTotal, teamJoinList } from "~/api/modules/bvi";
import Item from "~/components/page/bvi/explore/Item";
import Breadcrumb from "~/components/ui/breadcrumb";
import NoData from "~/components/ui/no-data";
import { useQueryParams } from "~/hooks/useQueryParams";

export default function BVIExploreList() {
  const { t } = useTranslation();
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

  const tabs = [
    { title: "Joined projects", type: "project", num: counts.project_num },
    {
      title: "Joined organizations",
      type: "organization",
      num: counts.organization_num,
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
    <Stack gap="20px" px="!16px">
      <Breadcrumb
        data={[
          { title: "Explore", to: "/bvi/explore" },
          { title: "Item List" },
        ]}
      />
      <Flex
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
        columns={data.list?.length ? [null, null, 1, 1, 2, 3] : 1}
        gap={{ base: "16px", md: "20px" }}
      >
        {data.list?.map?.((item) => (
          <Item flex="1" key={item.no} item={item}>
            <Button
              variant="ghost"
              rounded="30px"
              h="38px"
              ml="auto"
              border="1px solid #F2F4F8"
              fontSize={{ base: "12px", md: "16px" }}
              fontWeight="600"
              color="black"
              pos="relative"
              pr="35px"
            >
              {t("Details")}
              <IoIosArrowRoundForward className="w-[30px] h-[30px] absolute right-[5px]" />
            </Button>
          </Item>
        ))}
        {!data.list?.length && <NoData loading={loading} py="50px" />}
      </SimpleGrid>
    </Stack>
  );
}
