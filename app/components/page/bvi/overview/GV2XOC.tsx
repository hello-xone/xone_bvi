import {
  Box,
  Flex,
  SegmentGroup,
  Wrap,
  FormatByte,
  Stack,
  Button,
  Drawer,
  CloseButton,
  Portal,
  Center,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiSolidDownArrowAlt, BiSolidUpArrowAlt } from "react-icons/bi";
import Chart from "../../home/Chart";
import { UpdateTime } from "~/components/ui/update-time";
import { useUpdateUrlParams } from "~/hooks/useUpdateUrlParams";
import { useEffect, useState } from "react";
import Font from "~/components/ui/font";
import { useRequest } from "alova/client";
import { useMount, useRafTimeout, useUpdateEffect } from "ahooks";

import { convert, convertList, reward } from "~/api/modules/bvi";
import RangePicker from "~/components/ui/range-picker";
import dayjs from "dayjs";
import BaseTable from "~/components/ui/table";
import JumpButton from "~/components/ui/jump-button";
import { AlovaGenerics } from "alova";
import GVRelease from "./GVRelease";
import useMobile from "~/hooks/useMobile";
import { ReactSVG } from "react-svg";

export type TData = {
  gv: string;
  gv_rate: string;
  total_gv: string;
  total_gv_rate: string;
  release_gv: string;
  release_gv_rate: string;
  xoc: string;
  xoc_rate: string;
  transactions: string;
  Transactions_rate: string;
};

export type ConverListItem = {
  no?: string;
  gv?: string;
  total_gv?: string;
  release_gv?: string;
  day: string;
  xoc: string;
  transactions: string;
};

export type ConvertListData = {
  list: ConverListItem[];
};

interface DataItem {
  title: string;
  percentage: string;
  direction: "up" | "down";
  value: string;
  isView?: boolean;
  onViewClick?: () => void;
}

const DataBlock = ({
  isGvRecord = false,
  item,
}: {
  isGvRecord?: boolean;
  item: DataItem;
}) => {
  const { t } = useTranslation();
  return (
    <Flex
      data-nobold
      direction="column"
      gap="8px"
      flex={{ base: 1, xl: "132px" }}
      minW="132px"
    >
      <Flex fontWeight="400" alignItems="center" gap="5px">
        <Box
          color="#404150"
          fontSize="12px"
          fontWeight="500"
          lineHeight="normal"
        >
          {item.title}
        </Box>
        <AiOutlineQuestionCircle color="#B3B3B3" size="18px" />
        {isGvRecord && (
          <Flex
            alignItems="center"
            color={item.direction === "up" ? "#02D300" : "#FF0206"}
            fontSize="12px"
            fontWeight="400"
            lineHeight="normal"
          >
            {item.direction === "up" ? (
              <BiSolidUpArrowAlt size="18px" />
            ) : (
              <BiSolidDownArrowAlt size="18px" />
            )}
            <Box>{item.percentage}%</Box>
          </Flex>
        )}
      </Flex>
      {isGvRecord || (
        <Flex
          alignItems="center"
          color={item.direction === "up" ? "#02D300" : "#FF0206"}
          fontSize="12px"
          fontWeight="400"
          lineHeight="normal"
        >
          {item.direction === "up" ? (
            <BiSolidUpArrowAlt size="18px" />
          ) : (
            <BiSolidDownArrowAlt size="18px" />
          )}
          <Box>{item.percentage}%</Box>
        </Flex>
      )}
      <Flex
        alignItems="center"
        gap="10px"
        fontSize="24px"
        fontWeight="600"
        lineHeight="normal"
      >
        <FormatByte value={+item.value} />
        {item.isView && (
          <JumpButton onClick={item.onViewClick}>
            {t("Go Release It")}
          </JumpButton>
        )}
      </Flex>
    </Flex>
  );
};

const rateCalc = (num: string | number) => (+num * 100).toFixed(2);
const incOrDec = (num: string | number) => (+num > 0 ? "up" : "down");

export default function GV2XOC() {
  const { t } = useTranslation();

  const isMobile = useMobile();

  const { param: gtx, updateParam } = useUpdateUrlParams({
    key: "gtx",
    defaultParam: "All network",
  });
  const [rendering, setRendering] = useState(false);

  useRafTimeout(() => {
    setRendering(true);
  }, 500);

  const isMy = gtx === "My";

  const { data, send } = useRequest(convert, {
    force: true,
    immediate: false,
    initialData: {},
  });
  const { data: chartData, send: chartSend } = useRequest(convertList, {
    immediate: false,
    initialData: { list: [] },
  });

  useEffect(() => {
    const type = gtx.toLowerCase();
    send({ type });
    chartSend({ type });
  }, [gtx]);

  const {
    gv,
    gv_rate,
    release_gv,
    release_gv_rate,
    total_gv,
    total_gv_rate,
    xoc,
    xoc_rate,
    transactions,
    Transactions_rate,
  } = data as TData;

  const dataItems: DataItem[] = [
    {
      title: t("All Network GV"),
      percentage: rateCalc(gv_rate),
      direction: incOrDec(gv_rate),
      value: gv,
    },
    {
      title: t("Released GV"),
      percentage: rateCalc(release_gv_rate),
      direction: incOrDec(release_gv_rate),
      value: release_gv,
    },
    {
      title: t("To Be Released GV"),
      percentage: rateCalc(total_gv_rate),
      direction: incOrDec(total_gv_rate),
      value: total_gv,
      isView: isMy,
      onViewClick: () => {
        setDrawerOpen(true);
      },
    },
    {
      title: t("XOC Total Release"),
      percentage: rateCalc(xoc_rate),
      direction: incOrDec(xoc_rate),
      value: xoc,
    },
    {
      title: t("Total Transactions"),
      percentage: rateCalc(Transactions_rate),
      direction: incOrDec(Transactions_rate),
      value: transactions,
    },
    // {
    //   title: "BVI Pledge",
    //   percentage: "",
    //   direction: "down",
    //   value: "43.74 B",
    // },
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: rewardData, send: rewardSend } = useRequest<AlovaGenerics, any>(
    reward,
    {
      initialData: { list: [] },
      immediate: true,
      force: true,
    }
  );

  useUpdateEffect(() => {
    if (drawerOpen) {
      rewardSend();
    }
  }, [drawerOpen]);

  const gvRecordConfig: DataItem[] = [
    {
      title: t("Total Historical GV"),
      percentage: rateCalc(gv_rate),
      direction: incOrDec(gv_rate),
      value: gv,
    },
    {
      title: t("Released GV"),
      percentage: rateCalc(gv_rate),
      direction: incOrDec(gv_rate),
      value: gv,
    },
    {
      title: t("To Be Released GV"),
      percentage: rateCalc(gv_rate),
      direction: incOrDec(gv_rate),
      value: gv,
    },
  ];

  const [selectedGv, setSelectedGv] = useState([]);
  const [gvRelease, setGvRelease] = useState<any>({});
  const [batchRelease, setBatchRelease] = useState(false);

  const selectedGvData = gvRelease.no
    ? [gvRelease]
    : rewardData.list?.filter((item) => selectedGv.includes(item.no));

  const gvRecordColumns = [
    {
      key: "no",
      isSelected: (row) => row.status === "wait",
    },
    {
      key: "time",
      title: t("Time (UTC+0)"),
      render: ({ current }) =>
        dayjs(current * 1000).format("MMMM D YYYY HH:mm:ss"),
    },
    {
      key: "epoch",
      title: t("Epoch"),
    },
    {
      key: "name",
      title: t("Season Name"),
    },
    {
      key: "rate",
      title: t("Percentage"),
      render: ({ current }) => `${current}%`,
    },
    {
      key: "gv",
      title: t("Obtain GV"),
      isSorter: true,
    },
    {
      key: "fee",
      title: t("Fee"),
    },
    {
      key: "status",
      title: t("State"),
      render: ({ current, row }) => (
        <Button
          bg={statusConfig[current].bg}
          variant={current === "release" ? "plain" : "solid"}
          color={statusConfig[current].color}
          cursor={current === "wait" ? "pointer" : "default"}
          size="xs"
          rounded="8px"
          fontSize="14px"
          fontWeight="600"
          onClick={() => setGvRelease(row)}
        >
          {statusConfig[current].label}
        </Button>
      ),
    },
  ];

  const statusConfig = {
    release: {
      label: t("Released"),
      color: "#979797",
      bg: "#F2F4F8",
    },
    wait: {
      label: t("Can be released"),
      color: "white",
      bg: "#FF0206",
    },
    expire: {
      label: t("Expired"),
      color: "#FF0206",
      bg: "#F2F4F8",
    },
  };

  return (
    <Flex w="full" direction="column" bg="white" p="20px" rounded="12px">
      <GVRelease
        show={!!gvRelease.no || batchRelease}
        data={selectedGvData}
        onCancel={() => {
          setGvRelease({});
          setBatchRelease(false);
        }}
      />
      <Drawer.Root
        open={drawerOpen}
        onOpenChange={(e) => setDrawerOpen(e.open)}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content
              bg={{ base: "#F2F4F8", md: "white" }}
              minW={{ base: "full", md: "65%" }}
              rounded={{ base: 0, md: "!20px" }}
            >
              <Drawer.Header
                bg={{ base: "white" }}
                minH={{ base: "44px", md: "auto" }}
                p={{ base: 0, md: "24px 24px 16px" }}
                lineHeight={{ base: "44px", md: "normal" }}
                borderBottom={{ base: "1px solid #F2F4F8", md: "none" }}
              >
                <Drawer.Title textAlign={{ base: "center", md: "left" }}>
                  <Font size={{ base: "16px", md: "24px" }} weight="600">
                    {t("My GV Record")}
                  </Font>
                </Drawer.Title>
              </Drawer.Header>
              <Drawer.Body
                px={{ base: "16px", md: "24px" }}
                py={{ base: "20px", md: "8px" }}
              >
                <Stack gap={{ base: "20px" }}>
                  <Wrap
                    direction={{ base: "column", md: "row" }}
                    minH="84px"
                    px="40px"
                    py="10px"
                    gap="10px"
                    rounded="12px"
                    border="1px solid #FFD3D3"
                    bg="linear-gradient(0deg, #FFF 55.9%, #FFF4F4 112.31%)"
                    alignItems={{ base: "flex-start", md: "center" }}
                  >
                    {gvRecordConfig.map((item) => (
                      <DataBlock key={item.title} isGvRecord item={item} />
                    ))}
                  </Wrap>
                  <Wrap
                    alignItems="center"
                    fontSize="14px"
                    fontWeight="600"
                    gap={{ base: "20px", md: "10px" }}
                  >
                    <Center
                      bg={{ base: "white" }}
                      h="44px"
                      px={{ base: "20px", md: 0 }}
                      rounded="12px"
                    >
                      {t("Selected")} {selectedGv.length}
                    </Center>
                    <Button
                      bg="#FF0206"
                      h="44px"
                      px="20px"
                      rounded="12px"
                      mr="auto"
                      disabled={selectedGv.length === 0}
                      onClick={() => setBatchRelease(true)}
                    >
                      {t("Release All")}
                    </Button>
                    <RangePicker value={[dayjs(), dayjs()]} />
                  </Wrap>
                  <BaseTable
                    data={rewardData}
                    columns={gvRecordColumns}
                    selectionChange={setSelectedGv}
                  />
                </Stack>
              </Drawer.Body>
              <Drawer.CloseTrigger
                asChild
                right={{ base: "!auto", md: "!30px" }}
                top={{ base: "0", md: "10px" }}
              >
                {isMobile ? (
                  <ReactSVG
                    src="/images/icons/arrow.svg"
                    className="mt-[10px] ml-[10px]"
                  />
                ) : (
                  <CloseButton size="lg" />
                )}
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      <Wrap justifyContent="space-between">
        <Box
          fontSize={{ base: "16px", md: "24px" }}
          fontWeight="600"
          lineHeight="normal"
        >
          {t("GV To XOC")}
        </Box>
        {rendering && (
          <SegmentGroup.Root
            value={gtx}
            size="sm"
            colorPalette="border"
            rounded="16px"
            p="4px"
            h={{ base: "32px", md: "" }}
            bg="white"
            shadow="none"
            border="1px solid #C6C6C6"
            onValueChange={({ value }) => updateParam(value)}
          >
            <SegmentGroup.Indicator
              rounded="20px"
              h={{ base: "22px", md: "" }}
              bg="#FFF0F0"
              shadow="none"
            />
            <SegmentGroup.Items
              data-nobold
              items={["All network", "My"]}
              _checked={{ color: "#FF0206" }}
              h={{ base: "22px", md: "" }}
              fontSize="12px"
              fontWeight="600"
            />
          </SegmentGroup.Root>
        )}
      </Wrap>

      <Flex
        data-nobold
        direction={{
          base: "column",
          lg: "column",
          xl: isMy ? "column" : "row",
        }}
        pt="17px"
      >
        <Flex direction="column" gap="12px">
          <Flex
            direction={{ base: "column", md: "row" }}
            gap="12px"
            pb={{ base: 0, md: "17px" }}
            borderBottom={{ base: 0, md: "1px solid #F2F4F8" }}
          >
            {dataItems.slice(isMy ? 1 : 0, 3).map((item) => (
              <DataBlock key={item.title} item={item} />
            ))}
          </Flex>

          {!isMy && (
            <Flex direction={{ base: "column", md: "row" }} gap="12px" pt="8px">
              {dataItems.slice(3).map((item) => (
                <DataBlock key={item.title} item={item} />
              ))}
            </Flex>
          )}
        </Flex>
        <Stack flexGrow="1">
          {rendering && (
            <Chart
              key={gtx}
              height="210px"
              data={chartData as ConvertListData}
            />
          )}
        </Stack>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <UpdateTime />
        <Box
          data-nobold
          fontSize={{ base: "12px", md: "16px" }}
          fontWeight="400"
          lineHeight="normal"
          color="#404150"
          textAlign="right"
        >
          {t("See More")}
        </Box>
      </Flex>
    </Flex>
  );
}
