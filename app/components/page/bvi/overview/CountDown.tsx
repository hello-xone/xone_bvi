import { Center, Flex } from "@chakra-ui/react";
import { useInterval } from "ahooks";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useState } from "react";
import { useTranslation } from "react-i18next";

dayjs.extend(duration);

const getDiffTime = (endTime: number | string = "2025-06-20 00:00:00") => {
  const now = dayjs();
  const end = dayjs(endTime);
  const duration = end.diff(now);
  return dayjs.duration(duration);
};

const formatNumber = (num: number) => String(num).padStart(2, "0");

type CountDownProps = {
  bg?: "white" | "black";
  size?: "sm" | "lg";
  showTitle?: boolean;
  endTime?: number;
};

export default function CountDown({
  bg = "black",
  size = "lg",
  showTitle = false,
  endTime,
}: CountDownProps) {
  const { t } = useTranslation();
  const [date, setDate] = useState<any>(() => getDiffTime(endTime));

  useInterval(() => {
    setDate(getDiffTime(endTime));
  }, 1000);

  const isBlack = bg === "black";
  const isLg = size === "lg";

  const itemStyle = {
    pos: "relative",
    w: isLg ? { base: "44px", md: "60px" } : "48px",
    h: isLg ? { base: "44px", md: "60px" } : "48px",
    rounded: { base: "6px", md: "8px" },
    p: { base: "8px", md: "10px" },
    bg: isBlack ? "blackAlpha.800" : "white",
    border: isBlack ? "1px solid #FBFCFF" : "1px solid #E0E0E0",
    color: isBlack ? "#FBFCFF" : "#1A1A1A",
    fontSize: { base: "20px" },
    fontWeight: "700",
    mt: showTitle ? "5px" : "12px",
    _after: {
      content: '":"',
      fontWeight: { base: 100, md: 500 },
      right: isLg ? { base: "-15px", md: "-20px" } : "-12px",
      position: "absolute",
    },
  };

  const titleStyle = {
    fontSize: { base: "12px", md: "12px" },
    fontWeight: "500",
    lineHeight: "normal",
    color: isBlack ? "#FBFCFF" : "#979797",
    display: showTitle ? "flex" : "none",
  };

  return (
    <Flex gap={isLg ? { base: "22px", md: "30px" } : "16px"}>
      <Flex direction="column">
        <Center {...titleStyle}>{t("Days")}</Center>
        <Center {...itemStyle}>
          {formatNumber(Math.floor(date.asDays()))}
        </Center>
      </Flex>
      <Flex direction="column">
        <Center {...titleStyle}>{t("Hours")}</Center>
        <Center {...itemStyle}>{formatNumber(date.hours())}</Center>
      </Flex>
      <Flex direction="column">
        <Center {...titleStyle}>{t("Minutes")}</Center>
        <Center {...itemStyle}>{formatNumber(date.minutes())}</Center>
      </Flex>
      <Flex direction="column">
        <Center {...titleStyle}>{t("Seconds")}</Center>
        <Center {...itemStyle} _after={{ display: "none" }}>
          {formatNumber(date.seconds())}
        </Center>
      </Flex>
    </Flex>
  );
}
