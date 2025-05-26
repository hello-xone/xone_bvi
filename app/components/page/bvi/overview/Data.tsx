import { Avatar, Box, Button, Center, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ReactSVG } from "react-svg";
import Font from "~/components/ui/font";
import BaseTable, { type TableColumn } from "~/components/ui/table";

export default function Data() {
  const { t } = useTranslation();
  const columns: TableColumn[] = [
    {
      key: "number",
      title: t("Number"),
      tdClass: { w: "60px", fontSize: "16px", fontWeight: 700 },
      render: ({ index }) => (
        <Center>
          {index < 3 ? (
            <ReactSVG src={`/images/icons/rank_${index + 1}.svg`} />
          ) : (
            index + 1
          )}
        </Center>
      ),
    },
    {
      key: "address",
      title: t("Address"),
      thClass: { justifyContent: "left" },
      tdClass: { justifyContent: "start" },
      render: ({ current, Clipboard }) => (
        <Flex alignItems="center" gap="4px">
          <Avatar.Root variant="subtle" bg="#FF5D00" w="20px" h="20px">
            <Avatar.Fallback
              name="Segun Adebayo"
              fontSize="12px"
              color="white"
            />
          </Avatar.Root>
          <Clipboard>{current}</Clipboard>
          <ReactSVG src="/images/icons/tag_v.svg" />
        </Flex>
      ),
    },
    {
      key: "gv",
      title: t("Historical GV"),
      sortKey: "gv",
      isSorter: true,
    },
    {
      key: "xoc",
      title: t("Quantity (XOC)"),
      isSorter: true,
    },
    {
      key: "percentage",
      title: t("Percentage"),
      isSorter: true,
    },
    {
      key: "trading",
      title: t("Trading (24 hours)"),
    },
    {
      key: "joined",
      title: t("Joined on"),
    },
    {
      key: "activity",
      title: t("Activity level (30 D)"),
      render: ({ current }) => (
        <Flex w="full" h="6px" bg="#F2F4F8" rounded="25px">
          <Box w={`${current}%`} h="100%" bg="#FF0206" rounded="25px" />
        </Flex>
      ),
    },
  ];

  const dataList = [
    ...Array.from({ length: 10 }).map((_, index) => ({
      address: "AE2Af7D2A06baEb3689fFfEEc4530Ac3",
      transactions: "2025-01-01  13:00:00",
      gv: "349.29 M",
      xoc: "349.29 M",
      percentage: "33.33%",
      trading: "349.29 M",
      joined: t("Joined 10 days ago"),
      activity: index * 10,
    })),
  ];

  return (
    <Flex
      flex="100%"
      gap="10px"
      direction="column"
      bg="white"
      p="20px"
      rounded="12px"
      maxW="-webkit-fill-available"
    >
      <Flex data-nobold alignItems="center">
        <Font as="h3" size={{ base: "16px", md: "28px" }} weight="600">
          {t("Data")}
        </Font>
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
      <BaseTable
        data={{ list: dataList }}
        request={{
          api: () => {},
        }}
        thClass={{
          textAlign: "center",
        }}
        tdClass={{
          fontSize: "14px",
          fontWeight: 500,
          height: "52px",
          textAlign: "center",
        }}
        columns={columns}
      />
    </Flex>
  );
}
