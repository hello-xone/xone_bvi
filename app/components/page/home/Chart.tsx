import { Box, ClientOnly } from "@chakra-ui/react";
import ReactECharts from "echarts-for-react";
import { useTranslation } from "react-i18next";
import * as echarts from "echarts";
import { useSize } from "ahooks";
import dayjs from "dayjs";
import { ConverListItem, ConvertListData } from "../bvi/overview/GV2XOC";

type Props = {
  data: ConvertListData;
  height?: string;
};

type DataObjItem = {
  days: string[];
  xocs: string[];
  transactions: string[];
};

export default function Chart(props: Props) {
  const { t } = useTranslation();
  const { data, height = "310px" } = props;

  const size = useSize(document.querySelector("body"));

  const dataObj = data.list.reduce<DataObjItem>(
    (curr, next: ConverListItem) => {
      curr.days.push(dayjs(next.day).format("YYYY-MM-DD"));
      curr.xocs.push(next.xoc);
      curr.transactions.push(next.transactions);
      return curr;
    },
    { days: [], xocs: [], transactions: [] }
  );

  const option = {
    color: ["#1CB619", "#F5CACA"],
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderColor: "rgba(0, 0, 0, 0.3)",
      textStyle: {
        color: "#fff",
      },
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      top: "15%",
      left: "0",
      right: "0",
      bottom: "17%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: dataObj.days,
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 20,
        fillerColor: "rgba(245, 202, 202, 0.2)",
        borderColor: "#F5CACA",
        moveHandle: {
          show: true,
          color: "#F5CACA",
          opacity: 0.8,
        },
        moveHandleStyle: {
          color: "#F5CACA",
        },
        brushSelect: true,
        brushStyle: {
          color: "rgba(245, 202, 202, 0.2)",
          borderColor: "#F5CACA",
        },
        zoomSelectStyle: {
          color: "rgba(245, 202, 202, 0.4)",
        },
        dataBackground: {
          lineStyle: {
            color: "#F5CACA",
          },
          areaStyle: {
            color: "#F5CACA",
          },
        },
        selectedDataBackground: {
          lineStyle: {
            color: "#F5CACA",
          },
          areaStyle: {
            color: "#F5CACA",
          },
        },
      },
      {
        start: 0,
        end: 20,
        fillerColor: "rgba(245, 202, 202, 0.2)",
        borderColor: "#F5CACA",
        handleStyle: {
          color: "#F5CACA",
          borderColor: "#F5CACA",
        },
        moveHandleStyle: {
          color: "#F5CACA",
        },
        brushSelect: true,
        brushStyle: {
          color: "rgba(245, 202, 202, 0.2)",
          borderColor: "#F5CACA",
        },
        zoomSelectStyle: {
          color: "rgba(245, 202, 202, 0.4)",
        },
        dataBackground: {
          lineStyle: {
            color: "#F5CACA",
          },
          areaStyle: {
            color: "#F5CACA",
          },
        },
        selectedDataBackground: {
          lineStyle: {
            color: "#F5CACA",
          },
          areaStyle: {
            color: "#F5CACA",
          },
        },
      },
    ],
    series: [
      {
        name: t("Team Release"),
        type: "bar",
        zlevel: 2,
        barWidth: 20,
        itemStyle: {
          color: "rgba(253, 141, 144, 0.6)",
        },
        data: dataObj.xocs,
        emphasis: {
          itemStyle: {
            color: "rgba(253, 141, 144, 0.6)",
          },
        },
        tooltip: {
          formatter: "{b}<br/>{a}: {c}",
        },
      },
      {
        name: t("Release Quantity (XOC)"),
        type: "line",
        // stack: "Total",
        smooth: true,
        lineStyle: {
          width: 2,
          color: "rgba(253, 141, 144, 0)",
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0, [
            {
              offset: 0,
              color: "rgb(218, 255, 232)",
            },
            {
              offset: 1,
              color: "rgb(255, 255, 255)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: dataObj.xocs,
      },
      {
        name: t("Transaction Addresses"),
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 2,
          color: "#FD8D90",
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 231, 231)",
            },
            {
              offset: 1,
              color: "rgb(255, 255, 255)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: dataObj.transactions,
      },
    ],
  };

  return (
    <Box key={size.width} w="full" pos="relative">
      <ReactECharts
        key={size.width}
        option={option}
        style={{ width: "100%", height }}
      />
    </Box>
  );
}
