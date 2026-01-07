import { Box } from "@chakra-ui/react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useSize } from "ahooks";

export default function Chart({
  height = "152px",
  title = "",
  data = {},
  time = [],
}: {
  height?: string;
  title?: string;
  data: any;
  time: any[];
}) {
  const size = useSize(document.querySelector("body"));

  const option = {
    color: ["#FD8D90", "#D7D7D7"],
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        return (
          `${title}<br />` +
          params
            .map((item) => {
              return (
                time[item.seriesIndex][item.dataIndex] +
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                item.marker +
                Number(item.value).toFixed(2)
              );
            })
            .join("<br/>")
        );
      },
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
        data: time[0],
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
        // stack: "Total",
        smooth: true,
        showSymbol: data?.[0]?.length === 1,
        symbol: "circle",
        symbolSize: 6,
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
        data: data[0],
      },
      {
        name: "Line 2",
        type: "line",
        // stack: "Total",
        smooth: true,
        showSymbol: data?.[1]?.length === 1,
        symbol: "circle",
        symbolSize: 6,
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
        data: data[1],
      },
    ],
  };

  return (
    <Box key={size.width} pos="relative">
      <ReactECharts option={option} style={{ width: "100%", height }} />
    </Box>
  );
}
