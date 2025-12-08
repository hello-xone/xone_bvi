import {
  createListCollection,
  Flex,
  Stack,
  useUpdateEffect,
  Wrap,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import Font from "~/components/ui/font";
import RangePicker from "~/components/ui/range-picker";
import Select from "~/components/ui/select";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiSolidUpArrowAlt } from "react-icons/bi";
import { UpdateTime } from "~/components/ui/update-time";
import Chart from "./Chart";
import TimeSelect from "../TimeSelect";
import React, { useState } from "react";
import { useRequest } from "alova/client";
import { teamTrend } from "~/api/modules/bvi";
import { formatTSNumber } from "~/utils/format/number";

type Props = {
  children?: React.ReactNode;
  no: string;
  title: string;
};

export default function Data({ children, no, title }: Props) {
  const { t } = useTranslation();

  const [dataTime, setDataTime] = useState("");
  const [rangeTime, setRangeTime] = useState([
    dayjs().subtract(7, "day"),
    dayjs(),
  ]);
  const [type, setType] = useState("day");

  const { data, send }: any = useRequest(teamTrend, {
    force: true,
    immediate: false,
    initialData: [],
  });

  const chartData = data?.reduce?.(
    (curr, next) => {
      Object.keys(curr).forEach((key) => {
        [next, next.contrast].forEach((data, index) => {
          const value =
            key === "time"
              ? dayjs(data[key] * 1000).format("MMMM DD")
              : data[key];

          curr[key][index] = curr[key]?.[index] || [];
          curr[key][index].push(value);
        });
      });
      return curr;
    },
    { time: [], total: [], active: [], gv: [], Tx: [] }
  );

  useUpdateEffect(() => {
    if (no) {
      send({
        no,
        type,
        contrast: parseInt(dataTime),
        time: [rangeTime[0].unix(), rangeTime[1].unix()],
      });
    }
  }, [no, type, dataTime, rangeTime]);

  const totalData = (type: string, index: number = 0) =>
    chartData?.[type]?.[index]?.reduce?.(
      (curr, next) => ((curr += +next), curr),
      0
    ) ?? 0;

  const calcPercentage = (type: string) => {
    const value = (totalData(type, 0) / (totalData(type, 1) || 1)).toFixed(2);
    return {
      value: `${value}%`,
      trend: +value > 0 ? "up" : "down",
    };
  };

  const cardConfig = [
    {
      title: t("Total Addresses"),
      value: formatTSNumber(totalData("total"), false),
      percentage: calcPercentage("total").value,
      trend: calcPercentage("total").trend,
      chartKey: "total",
    },
    {
      title: t("Active Address"),
      value: formatTSNumber(totalData("active"), false),
      percentage: calcPercentage("active").value,
      trend: calcPercentage("active").trend,
      chartKey: "active",
    },
    {
      title: t("GV Contribution"),
      value: formatTSNumber(totalData("gv")),
      percentage: calcPercentage("gv").value,
      trend: calcPercentage("gv").trend,
      chartKey: "gv",
    },
    {
      title: t("Transaction"),
      value: formatTSNumber(totalData("Tx"), false),
      percentage: calcPercentage("Tx").value,
      trend: calcPercentage("Tx").trend,
      chartKey: "Tx",
    },
  ];

  return (
    <Stack
      flex="100%"
      p={{ base: "16px", md: "20px" }}
      bg="white"
      rounded="12px"
    >
      <Wrap gap={{ base: "12px", md: "20px" }} alignItems="center">
        <Font as="h3" size={{ base: "16px", md: "24px" }} weight="600">
          {title}
        </Font>
        <RangePicker value={rangeTime} onChange={setRangeTime} />
        <Font size="14px" weight="500">
          {t("Granularity")}
        </Font>
        <Select
          w="120px"
          pl="0"
          mr="auto"
          collection={createListCollection({
            items: [
              { label: t("Day"), value: "day" },
              { label: t("Hour"), value: "hour" },
            ],
          })}
          onValueChange={({ value }: any) => setType(value)}
        />
        {children ?? <TimeSelect paramKey="dataTime" onChange={setDataTime} />}
      </Wrap>
      <Wrap
        mt="20px"
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        gap={{ base: "24px", md: "60px" }}
      >
        {cardConfig.map((card, index) => (
          <Stack key={index} flex="1">
            <Flex alignItems="center">
              <Font size="12px" weight="500" color="#404150" pr="4px">
                {card.title}
              </Font>
              <AiOutlineQuestionCircle color="#B3B3B3" />
              <BiSolidUpArrowAlt size="18px" color="#02D300" />
              <Font size="12px" weight="400" color="#02D300">
                {card.percentage}
              </Font>
            </Flex>
            <Font as="h4" size="24px" weight="600">
              {card.value}
            </Font>
            <Chart
              title={card.title}
              time={chartData?.time}
              data={chartData?.[card.chartKey]}
            />
          </Stack>
        ))}
      </Wrap>
      <UpdateTime />
    </Stack>
  );
}
