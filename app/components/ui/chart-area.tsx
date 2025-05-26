import { Chart, useChart } from "@chakra-ui/charts";
import { Area, AreaChart } from "recharts";

type Props = {
  data: {
    value: number;
  }[];
};

export default function ChartArea({ data }: Props) {
  const chart = useChart({
    data,
    series: [{ name: "value", color: "teal.solid" }],
  });

  return (
    <Chart.Root width="180px" height="39px" chart={chart}>
      <AreaChart accessibilityLayer data={chart.data}>
        {chart.series.map((item) => (
          <defs key={item.name}>
            <Chart.Gradient
              id={`${item.name}-gradient`}
              stops={[
                { offset: "0%", color: "#FFE5E5", opacity: 1 },
                { offset: "100%", color: "#FFE5E5", opacity: 0.1 },
              ]}
            />
          </defs>
        ))}

        {chart.series.map((item) => (
          <Area
            key={item.name}
            type="natural"
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={`url(#${item.name}-gradient)`}
            stroke={chart.color("#ED0000")}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </Chart.Root>
  );
}
