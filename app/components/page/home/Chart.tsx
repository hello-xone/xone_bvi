import { Box } from "@chakra-ui/react";
import ReactECharts from "echarts-for-react";
import { useTranslation } from "react-i18next";
import * as echarts from "echarts";
import { useSize } from "ahooks";

type Props = {
  data: any;
  height?: string;
};

export default function Chart(props: Props) {
  const { t } = useTranslation();
  const { data, height = "310px" } = props;

  const size = useSize(document.querySelector("body"));

  const option = {
    color: ["#1CB619", "#F5CACA"],
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderColor: "rgba(0, 0, 0, 0.3)",
      textStyle: {
        color: "#fff",
      },
      formatter: (params) => {
        const date = params[0].axisValue + " (UTC+0)";
        let content = date + "<br/>";
        params.forEach((item) => {
          content += `<div style="display: flex; justify-content: space-between; align-items: center;">`;
          content += `<span>${item.marker}${item.seriesName}:</span>`;
          content += `<span style="text-align: right; margin-left: 20px;">${item.value}</span>`;
          content += `</div>`;
        });
        return content;
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
      right: "6px",
      bottom: "17%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: data?.days ?? [],
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
        end: 100,
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
        end: 100,
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
      // {
      //   name: t("Team Release"),
      //   type: "bar",
      //   zlevel: 2,
      //   barWidth: 20,
      //   itemStyle: {
      //     color: "rgba(253, 141, 144, 0.6)",
      //   },
      //   data: data.teamRelease,
      //   emphasis: {
      //     itemStyle: {
      //       color: "rgba(253, 141, 144, 0.6)",
      //     },
      //   },
      //   tooltip: {
      //     formatter: "{b}<br/>{a}: {c}",
      //   },
      // },
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
        data: data?.personRelease ?? [],
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
        data: data?.addressCount ?? [],
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
