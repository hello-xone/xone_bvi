import {
  Box,
  Button,
  createListCollection,
  Flex,
  Stack,
  Wrap,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import Font from "~/components/ui/font";
import RangePicker from "~/components/ui/range-picker";
import Select from "~/components/ui/select";
import Chart from "./Chart";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiSolidUpArrowAlt } from "react-icons/bi";
import { UpdateTime } from "~/components/ui/update-time";
import JumpButton from "~/components/ui/jump-button";
import Grid from "~/components/ui/grid";

export default function Overview({ identity }: { identity: string }) {
  const { t } = useTranslation();
  const cardConfig = [
    {
      title: t("Total Addresses"),
      value: "43.74 B",
      percentage: "0.34%",
      trend: "up",
    },
    {
      title: t("Active Address"),
      value: "43.74 B",
      percentage: "0.34%",
      trend: "up",
    },
    {
      title: t("GV Contribution"),
      value: "43.74 B",
      percentage: "0.34%",
      trend: "up",
    },
    {
      title: t("Transaction"),
      value: "43.74 B",
      percentage: "0.34%",
      trend: "up",
    },
  ];
  return (
    <Stack data-nobold flex="100%" p="20px" bg="white" rounded="12px">
      <Wrap gap="20px" alignItems="center">
        <Font
          as="h3"
          fontSize={{ base: "16px", md: "24px" }}
          order={{ base: -2, md: "inherit" }}
          weight="600"
        >
          {t("Data Overview")}
        </Font>
        <RangePicker value={[dayjs().subtract(7, "day"), dayjs()]} />
        <Font size="14px" weight="500">
          {t("contrast")}
        </Font>
        <Select
          w="120px"
          pl={{ base: 0, md: "15px" }}
          collection={createListCollection({
            items: [{ label: t("Day"), value: "react" }],
          })}
        />
        <JumpButton
          order={{ base: -1, md: "inherit" }}
          _firstLetter={{ textTransform: "uppercase" }}
          ml="auto"
        >
          {t(identity)}?
        </JumpButton>
      </Wrap>
      <Grid
        w={{ base: "300px" }}
        mt="20px"
        justifyContent="space-between"
        gap="60px"
      >
        {cardConfig.map((card, index) => (
          <Stack key={index} flex="1">
            <Flex w={{ base: "full", md: "inherit" }} alignItems="center">
              <Font
                size="12px"
                weight="500"
                color="#404150"
                pr="4px"
                textWrap="nowrap"
              >
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
            <Chart />
          </Stack>
        ))}
      </Grid>
      <UpdateTime />
    </Stack>
  );
}
