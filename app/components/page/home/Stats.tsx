import { JSX } from "react";
import { Stat, Wrap } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import CountUp from "~/components/ui/count-up";
import Font from "~/components/ui/font";
import { formatUnitsNumber } from "~/utils/format/number";

interface StatConfig {
  value: string;
  className?: string;
  prefix?: string;
  units: Array<{
    text: JSX.Element | string;
    className?: string;
  }>;
  label: string;
}

export default function Stats(props: { [key: string]: any }) {
  const { t } = useTranslation();
  const statsConfig: StatConfig[] = [
    {
      value: formatUnitsNumber(props.activeAccounts).value,
      units: [
        {
          text: formatUnitsNumber(props.activeAccounts).unit,
          className: "text-[20px] font-[800] text-black",
        },
        { text: "+", className: "text-[20px] font-[500] text-black mb-auto" },
      ],
      label: t("Active address"),
    },
    {
      value: formatUnitsNumber(props.arkwork).value,
      units: [
        {
          text: formatUnitsNumber(props.arkwork).unit ? "+" : "",
          className: "text-[20px] font-[500] text-black mb-auto",
        },
      ],
      label: t("Artwork"),
    },
    {
      prefix: "≈$",
      value: props.gasFee,
      className: "text-[30px] font-[700]",
      units: [
        { text: "/TX", className: "text-[14px] font-[500] text-[#979797]" },
      ],
      label: t("Avg. Tx Cost"),
    },
    {
      value: formatUnitsNumber(props.newTxns24h).value,
      units: [
        {
          text: formatUnitsNumber(props.newTxns24h).unit,
          className: "text-[20px] font-[500] text-black",
        },
        {
          text: (
            <Font
              data-nobold
              size="12px"
              weight="800"
              bg="#02D300"
              color="white"
              px="10px"
              py="4px"
              rounded="4px"
              ml="5px"
            >
              24h
            </Font>
          ),
          className: "text-[20px] font-[500] text-black mb-auto",
        },
      ],
      label: t("24H Tx Amount"),
    },
    {
      value: (+props.averageBlockTime)?.toFixed?.(3),
      units: [
        { text: "/S", className: "text-[14px] font-[500] text-[#979797]" },
      ],
      label: t("Avg. Block Time"),
    },
  ];

  return (
    <Wrap
      h={{ base: "auto", md: "160px" }}
      flexDir={{ base: "column", md: "row" }}
      py={{ base: "20px", md: 0 }}
      pl={{ base: "62px", md: 0 }}
      gap={{ base: "20px", md: 0 }}
      rounded="12px"
      bg="white"
      alignItems={{ base: "flex-start", md: "center" }}
      justifyContent="space-between"
    >
      {statsConfig.map((stat, index) => (
        <Stat.Root
          key={index}
          alignItems={{ md: "center" }}
          justifyContent="center"
          flex={{ md: "auto", "2xl": 1 }}
          h="80px"
          py={{ base: "13px", md: 0 }}
          borderRight={{ base: "none", md: "1px solid #F2F4F8" }}
          className="last:border-0"
        >
          <Stat.ValueText
            data-bold
            alignItems="baseline"
            fontSize={{ base: "34px", md: "20px", lg: "26px", xl: "34px" }}
            transition="all 0.3s ease-in-out"
            className={`${stat.className ?? "font-[800]"}`}
          >
            {stat.prefix}
            <CountUp value={+stat.value} />
            {stat.units.map((unit: any, i) => (
              <Stat.ValueUnit key={i} className={unit.className}>
                {unit.text}
              </Stat.ValueUnit>
            ))}
          </Stat.ValueText>
          <Stat.HelpText
            data-nobold
            fontSize={{ base: "16px", md: "10px", lg: "12px", xl: "16px" }}
            fontWeight="500"
            color="#7A7A7A"
            textAlign={{ base: "left", md: "center" }}
          >
            {stat.label}
          </Stat.HelpText>
        </Stat.Root>
      ))}
    </Wrap>
  );
}
