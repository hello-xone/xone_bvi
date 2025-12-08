import { Avatar, Box, Button, Flex, Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useParams } from "@remix-run/react";
import { useMount } from "ahooks";
import { useRequest } from "alova/client";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { person } from "~/api/modules/bvi";
import Font from "~/components/ui/font";
import BaseTable, { type TableColumn } from "~/components/ui/table";
import { UpdateTime } from "~/components/ui/update-time";
import { useUpdateUrlParams } from "~/hooks/useUpdateUrlParams";
import { identitys } from "~/routes/($lang).bvi.overview_.$identity";
import { useEffect } from "react";

export type PersonData = {
  list: {
    no: string;
    gv: string;
    total_gv: string;
  }[];
};

export default function Ranking() {
  const { t } = useTranslation();
  const { identity } = useParams();
  const { param: type, updateParam } = useUpdateUrlParams({
    key: "type",
    defaultParam: identity,
  });

  const { data, send } = useRequest(person, {
    immediate: false,
    initialData: {},
  });

  useEffect(() => {
    send({ type });
  }, [type]);

  const columns: TableColumn[] = [
    {
      key: "transactions",
      title: t("Transactions"),
      tdClass: { fontSize: "18px", fontWeight: 400 },
    },
    {
      key: "gv",
      title: t("Historical GV"),
      tdClass: { fontSize: "18px", fontWeight: 400 },
    },
  ];

  const items = [
    {
      title: identitys[0],
      content: () => (
        <BaseTable
          pagination={false}
          tdClass={{ height: "61px" }}
          columns={[
            {
              key: "address",
              title: t("Address"),
              thClass: { justifyContent: "start" },
              tdClass: { justifyContent: "start" },
              render: ({ current, Clipboard }) => (
                <Flex alignItems="center" gap="4px">
                  <Avatar.Root variant="subtle" bg="#FF5D00" w="20px" h="20px">
                    <Avatar.Fallback
                      name={current[0]}
                      fontSize="12px"
                      color="white"
                    />
                  </Avatar.Root>
                  <Clipboard>{current}</Clipboard>
                </Flex>
              ),
            },
            ...columns,
          ]}
          data={data}
        />
      ),
    },
    {
      title: identitys[1],
      content: () => (
        <BaseTable
          pagination={false}
          tdClass={{ height: "61px" }}
          columns={[
            {
              key: "name",
              title: t("Name"),
              thClass: { justifyContent: "start" },
              tdClass: { justifyContent: "start" },
              render: ({ current }) => (
                <Flex alignItems="center" gap="4px">
                  <Avatar.Root variant="subtle" bg="#FF5D00" w="20px" h="20px">
                    <Avatar.Fallback
                      name={current[0]}
                      fontSize="12px"
                      color="white"
                    />
                  </Avatar.Root>
                  {current}
                </Flex>
              ),
            },
            {
              key: "joined",
              title: t("Number of Addresses"),
              tdClass: { fontSize: "18px", fontWeight: 400 },
            },
            ...columns,
          ]}
          data={data}
        />
      ),
    },
    {
      title: identitys[2],
      content: () => (
        <BaseTable
          pagination={false}
          tdClass={{ height: "61px" }}
          columns={[
            {
              key: "name",
              title: t("Name"),
              thClass: { justifyContent: "start" },
              tdClass: { justifyContent: "start" },
              render: ({ current }) => (
                <Flex alignItems="center" gap="4px">
                  <Avatar.Root variant="subtle" bg="#FF5D00" w="20px" h="20px">
                    <Avatar.Fallback
                      name={current[0]}
                      fontSize="12px"
                      color="white"
                    />
                  </Avatar.Root>
                  {current}
                </Flex>
              ),
            },
            {
              key: "joined",
              title: t("Number of Addresses"),
              tdClass: { fontSize: "18px", fontWeight: 400 },
            },
            ...columns,
          ]}
          data={data}
        />
      ),
    },
  ];

  return (
    <Flex
      data-nobold
      flexGrow="1"
      direction="column"
      bg="white"
      p="20px"
      rounded="12px"
    >
      <Flex alignItems="center" justifyContent="space-between" gap="6px">
        <Font size={{ base: "16px", md: "24px" }} weight="600">
          {t("Ranking")}
        </Font>
        <AiOutlineQuestionCircle color="#B3B3B3" size="18px" />
        <Flex alignItems="center" gap="4px" ml="auto">
          <Button
            variant="ghost"
            fontSize="14px"
            fontWeight="400"
            color="#979797"
            pr="0"
          >
            {t("See More")}
            <MdOutlineKeyboardArrowRight color="#979797" size="24px" />
          </Button>
        </Flex>
      </Flex>

      <Tabs.Root value={type} onValueChange={({ value }) => updateParam(value)}>
        <Tabs.List border="0">
          {identitys.map((identity, index) => (
            <Tabs.Trigger
              key={index}
              value={identity}
              asChild
              pb="0"
              px="5px"
              mr="13px"
              _selected={{
                fontSize: "18px",
                color: "#FF0206",
                transition: "all 0.3s",
                fontWeight: "700",
                _before: { bg: "#FF0206", transition: "all 0.3s" },
              }}
            >
              <Font size="14px" weight="600">
                {identity}
              </Font>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Box pos="relative" h="max-content" width="full">
          {items.map((item, index) => (
            <Tabs.Content
              key={index}
              value={item.title}
              inset="0"
              _open={{
                animationName: "fade-in, scale-in",
                animationDuration: "300ms",
              }}
              _closed={{
                animationName: "fade-out, scale-out",
                animationDuration: "120ms",
              }}
            >
              {item.content()}
            </Tabs.Content>
          ))}
          {!!(data as PersonData)?.list?.length && <UpdateTime />}
        </Box>
      </Tabs.Root>
    </Flex>
  );
}
