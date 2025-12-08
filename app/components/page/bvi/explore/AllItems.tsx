import { Avatar, Flex, SegmentGroup, Stack } from "@chakra-ui/react";
import { ReactSVG } from "react-svg";
import { useTranslation } from "react-i18next";
import ChartArea from "~/components/ui/chart-area";
import Font from "~/components/ui/font";
import BaseTable, { type TableColumn } from "~/components/ui/table";
import Platforms from "./Platforms";
import { teamData } from "~/api/modules/bvi";
import { useState } from "react";
import TimeSelect from "./TimeSelect";
import useMobile from "~/hooks/useMobile";

type TItem = {
  active: number;
  active_day7: number;
  active_day30: number;
  growth: number[];
  gv: string;
  interact: number;
  interact_day7: number;
  interact_day30: number;
  member: number;
  no: string;
  team: string;
  team_hot: boolean;
  team_name: string;
  team_selected: boolean;
  team_trust: boolean;
  team_type: string;
};

export type TAllTimes = {
  data: {
    list?: TItem[];
    page: number;
    page_size: number;
    total: number;
  };
};

export default function AllItems(props: TAllTimes) {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const { data } = props;

  const [time, setTime] = useState("");

  const timeStr = time.toLocaleLowerCase();

  const columns: TableColumn[] = [
    {
      key: "number",
      title: t("Number"),
      tdClass: { fontSize: "16px", fontWeight: 700 },
      render: ({ index }) => index + 1,
    },
    {
      key: "team_name",
      title: t("Name"),
      thClass: { justifySelf: "start" },
      tdClass: { justifySelf: "start" },
      render: ({ current, row }) => {
        const tagClass = {
          rounded: "8px",
          size: "12px",
          weight: "500",
          px: "10px",
          py: "5px",
        };
        return (
          <Stack gap="8px">
            <Flex
              alignItems="center"
              gap="12px"
              fontSize={{ base: "12px", md: "14px" }}
            >
              <Avatar.Root w="20px" h="20px">
                <Avatar.Image src={row.logo} />
              </Avatar.Root>
              {current}
              {row.team_type === "organization" && (
                <ReactSVG src="/images/icons/tag_v.svg" />
              )}
              {row.team_type === "project" && (
                <ReactSVG src="/images/icons/tag_group.svg" />
              )}
            </Flex>
            {!isMobile && (
              <Flex alignItems="center" justifyContent="start" gap="8px">
                {row.team_selected && (
                  <Font bg="#FFF0F0" {...tagClass}>
                    {t("Popular")}
                  </Font>
                )}
                {row.team_hot && (
                  <Font bg="#FFF0F0" {...tagClass}>
                    {t("Hot")}
                  </Font>
                )}
                {row.team_new && (
                  <Font bg="#FFF0F0" {...tagClass}>
                    {t("Newest")}
                  </Font>
                )}
              </Flex>
            )}
          </Stack>
        );
      },
    },
    {
      key: "",
      title: t("Sharing Channels"),
      render: ({ row }) => <Platforms item={row} color="#9FA2AB" />,
    },
    {
      key: "member",
      title: t("Total Users"),
      isSorter: true,
    },
    {
      key: "gv",
      title: t("Total GV"),
      isSorter: true,
    },
    {
      key: "active_day7",
      title: `${time} ${t("active")}`,
      sortKey: `active_${timeStr}`,
      isSorter: true,
      render: ({ row }) => row[`active_${timeStr}`],
    },
    {
      key: "interact_day7",
      title: `${time} ${t("interaction volume")}`,
      sortKey: `interact_${timeStr}`,
      isSorter: true,
      render: ({ row }) => row[`interact_${timeStr}`],
    },
    {
      key: "growth",
      title: `${time} ${t("user growth")}`,
      render: ({ current }) => (
        <ChartArea data={current.map((value: number) => ({ value }))} />
      ),
    },
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
      <Flex alignItems="center" justifyContent="space-between" gap="12px">
        <Font as="h3" size={{ base: "24px", md: "28px" }} weight="600">
          {t("All Items")}
        </Font>
        <TimeSelect onChange={setTime} />
      </Flex>
      <BaseTable
        data={data}
        request={{
          api: teamData,
          force: true,
          params: {
            type: parseInt(time || "24"),
          },
        }}
        thClass={{
          textAlign: "center",
          fontWeight: 700,
          lineHeight: "120%",
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
