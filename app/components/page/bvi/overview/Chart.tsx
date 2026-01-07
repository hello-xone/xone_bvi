import { Box } from "@chakra-ui/react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useSize } from "ahooks";

export default function Chart({ height = "152px" }: { height?: string }) {
  const size = useSize(document.querySelector("body"));

  const option = {
    color: ["#1CB619", "#F5CACA"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      top: "5%",
      left: "0",
      right: "6px",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
    series: [
      {
        name: "Line 1",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 2,
          color: "#D7D7D7",
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(229, 227, 227, 0.74)",
            },
            {
              offset: 1,
              color: "rgba(255, 255, 255, 0.12)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
      {
        name: "Line 2",
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
        data: [120, 282, 111, 234, 220, 340, 310],
      },
    ],
  };

  return (
    <Box key={size.width} pos="relative">
      <ReactECharts option={option} style={{ width: "100%", height }} />
    </Box>
  );
}
