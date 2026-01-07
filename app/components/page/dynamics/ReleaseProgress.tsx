import {
  Flex,
  Box,
  Image,
  Wrap,
  Text,
  Spinner,
  Center,
  VStack,
  useUpdateEffect,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useMount } from "ahooks";
import { useTranslation } from "react-i18next";
import { formatNumber } from "~/utils/format/number";
import { useReleaseScroll } from "~/hooks/useRelease";

import useReleaseStore from "~/store/releaseStore";
import useMobile from "~/hooks/useMobile";
import { ReactSVG } from "react-svg";
import clsx from "clsx";
import { releaseInfo, releaseProgress } from "~/api/modules/dynamics";

type EpochDetailsInfo = {
  current: number;
  info: EpochInfo[];
};

type EpochInfo = {
  epoch: number;
  blockNum: bigint;
  transactionCount: bigint;
  released: string;
  releaseAmount: string;
};

let timer: ReturnType<typeof setTimeout> | null = null;

export default function ReleaseProgress({
  updateCurlEpoch,
}: {
  updateCurlEpoch: (current: number) => void;
}) {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const [current, setCurrent] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const [epochDetailsInfo, setEpochDetailsInfo] = useState<EpochDetailsInfo>(
    {} as EpochDetailsInfo
  );
  const [fetchLoading, setFetchLoading] = useState(false);

  const { info = [], current: curlEpoch } = epochDetailsInfo;

  useEffect(() => {
    if (updateCurlEpoch) {
      updateCurlEpoch(curlEpoch);
    }
  }, [curlEpoch]);

  const fetchEpochInfo = async () => {
    if (fetchLoading) return;
    const { info = [] } = epochDetailsInfo;
    let params = {};
    if (info?.length) {
      const { epoch } = info.at(-1);
      params = {
        startEpoch: epoch,
        endEpoch: epoch + 50,
      };
    }
    setFetchLoading(true);
    const res: any = await releaseProgress(params);
    setFetchLoading(false);
    // res.details.splice(1, 50);
    res.info.forEach((item) => {
      item.released = formatUnits(item.released, 18);
      item.releaseAmount = formatUnits(item.releaseAmount, 18);
    });
    setEpochDetailsInfo((pre: any) => {
      return {
        ...pre,
        ...res,
        info: [...(pre?.info ?? []), ...res.info].reduce(
          (pre: any, cur: any) => {
            if (!pre.some((item) => item.epoch === cur.epoch)) pre.push(cur);
            return pre;
          },
          []
        ),
      };
    });

    return res;
  };

  useUpdateEffect(() => {
    if (info.length < 50) {
      fetchEpochInfo();
    }
  }, [info.length]);

  const getEpochDetailsInfo = async () => {
    const res = await fetchEpochInfo();
    const currentIndex = Math.max(
      0,
      res.info.findIndex((item: any) => item.epoch === res.current)
    );

    setActiveIndex(currentIndex);
    setTimeout(() => {
      scrollToCenter(currentIndex);
      setLoading(false);
    }, 100);
  };

  const {
    activeIndex,
    timelineRef,
    setActiveIndex,
    scrollToCenter,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handlePointClick,
    handlePointMouseEnter,
  } = useReleaseScroll(() => {
    fetchEpochInfo();
  });

  const statusStyles = {
    released: {
      color: "#404150",
      bg: "#C6C6C6",
      border: "1px solid #C6C6C6",
    },
    releasing: {
      color: "#02D300",
      bg: "rgba(0, 0, 0, 0.50)",
      border: "1px solid #F2F4F8",
    },
    pending: {
      color: "#FFF",
      bg: "#C6C6C6",
      border: "1px solid #E0E0E0",
    },
  };

  const dotStyles = {
    released:
      "w-[26px] min-w-[26px] h-[26px] bg-[url('/images/icons/end.svg')] bg-no-repeat bg-fixed bg-cover !bottom-[-5px]",
    releasing:
      "w-[26px] min-w-[26px] h-[26px] border-[3px] border-[#f00] bg-white !bottom-[-5px]",
    pending: "w-[14px] min-w-[14px] h-[14px] bg-[#C6C6C6]",
  };

  const statusText = {
    released: t("Ended"),
    releasing: t("Releasing"),
    pending: t("Pending Release"),
  };

  type EpochStatus = "released" | "releasing" | "pending";

  const getEpochStatus = (epoch: number): EpochStatus => {
    if (epoch < curlEpoch) return "released";
    if (epoch === curlEpoch) return "releasing";
    return "pending";
  };

  const openBlockExplorer = (item: EpochInfo) => {
    window.open(
      `${import.meta.env.VITE_APP_BLOCK_EXPLORER}/block/${item.blockNum}`
    );
  };

  const pointMouseLeave = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setCurrent(null);
      scrollToCenter(activeIndex ?? 0);
    }, 3000);
  };

  useMount(() => {
    getEpochDetailsInfo();
  });

  return (
    <Box
      pos="relative"
      aria-busy="true"
      userSelect="none"
      py={{ base: "20px", lg: "30px" }}
      pb={{ base: 0, lg: "30px" }}
      bg="white"
      rounded="20px"
    >
      <Box
        hidden={!loading}
        pos="absolute"
        zIndex={5}
        inset="0"
        bg="bg/80"
        rounded="20px"
      >
        <Center h="full">
          <VStack colorPalette="teal">
            <Spinner color="teal.500" />
            <Text data-nobold color="colorPalette.600">
              Loading...
            </Text>
          </VStack>
        </Center>
      </Box>
      <Box
        data-nobold
        as="h1"
        fontSize={{ base: "16px", md: "36px" }}
        fontWeight="600"
        px={{ base: "24px", md: "61px" }}
      >
        {t("Release Progress")}
      </Box>
      <Box
        pos="absolute"
        right={{ base: "17px", lg: "117px" }}
        top={{ base: "-60px", lg: "15px" }}
      >
        <ReactSVG
          src="/images/dynamics/release.svg"
          className={clsx({
            "[&_svg]:w-[80px]": isMobile,
          })}
        />
      </Box>
      <Flex
        ref={timelineRef}
        direction="column"
        className="relative h-[245px] px-[80px] cursor-grab overflow-x-auto overflow-y-hidden scroll-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        style={{ willChange: "transform" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => {
          if (timer) clearTimeout(timer);
        }}
        onMouseLeave={pointMouseLeave}
      >
        <Flex
          gap={{ base: "90px", md: "264px" }}
          className="absolute bottom-[10px] z-[1]"
        >
          {info.map((item: EpochInfo, index, arr) => {
            const status = getEpochStatus(item.epoch);
            const isActive = index === activeIndex && current === null;

            return (
              <Box
                key={`${item.epoch}_${index}`}
                className={`point relative cursor-pointer transition-all text-[12px] ${
                  index === current || isActive
                    ? "[&>.dot]:scale-[1.3] [&>div]:!block"
                    : "[&>.dot]:scale-100"
                }`}
                onMouseEnter={() => handlePointMouseEnter()}
              >
                <Box
                  className={`${
                    dotStyles[status]
                    // isActive || index === activeIndex
                    //   ? "w-[26px] min-w-[26px] h-[26px] border-[3px] border-[#f00] bg-white !bottom-[-5px]"
                    //   : "w-[14px] min-w-[14px] h-[14px] bg-[#C6C6C6]"
                  } dot absolute z-[1] bottom-[0] left-[50%] translate-x-[-50%] rounded-full transition-all`}
                  onMouseEnter={() =>
                    setCurrent(index === activeIndex ? null : index)
                  }
                  onClick={(e) => handlePointClick(index, e)}
                />
                <Flex
                  direction="column"
                  color="white"
                  w={{ base: "300px", md: "374px" }}
                  h={{ base: "auto", md: "145px" }}
                  px={{ base: "10px", md: "20px" }}
                  bg="#f00"
                  className={`!hidden absolute rounded-xl bottom-[80px] left-[50%] translate-x-[-50%] box-border py-[10px] transition-all ${
                    !index && "translate-x-[-60px]"
                  } ${arr.length - 1 === index && "!translate-x-[-320px]"}`}
                >
                  {(current === index || isActive) && (
                    <Image
                      src="/images/dynamics/arrow.png"
                      className={`object-contain w-[13px] h-[40px] absolute bottom-[-55px] left-[50%] translate-x-[-50%] ml-[-7px] select-none animate-bounce [animation-duration:2000ms] ${
                        !index && "left-[60px]"
                      } ${arr.length - 1 === index && "!left-[320px]"}`}
                    />
                  )}

                  <Flex
                    justify="space-between"
                    mb={2}
                    alignItems="center"
                    fontSize={{ base: "11px", md: "14px" }}
                  >
                    <Text
                      cursor="pointer"
                      pt="10px"
                      _hover={{ textDecoration: "underline" }}
                      onClick={() => openBlockExplorer(item)}
                    >
                      Epoch #{item.epoch}
                    </Text>
                    <Flex
                      color={statusStyles[status].color}
                      border={statusStyles[status].border}
                      fontWeight="bold"
                      rounded="full"
                      alignItems="center"
                      gap="8px"
                      px="10px"
                      py="6px"
                      h="26px"
                      bg={statusStyles[status].bg}
                      fontSize={{ base: "11px", md: "12px" }}
                    >
                      <Box
                        data-nobold
                        w="5px"
                        h="5px"
                        bg={statusStyles[status].color}
                        rounded="full"
                      />
                      {statusText[status]}
                    </Flex>
                  </Flex>

                  <Box fontSize={{ base: "11px", md: "14px" }}>
                    <Flex justify="space-between" mb={2}>
                      <Text>{t("Release Amount(XOC)")}</Text>
                      <Text>{formatNumber(item.releaseAmount, 2)}</Text>
                    </Flex>
                    <Flex justify="space-between" mb={2}>
                      <Text>{t("Transaction Count")}</Text>
                      <Text>{item.transactionCount}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text>{t("Successfully Released(XOC)")}</Text>
                      <Text>{formatNumber(item.released, 2)}</Text>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            );
          })}
          {!!info?.length && (
            <Box className="absolute left-[-80px] bottom-[6px] w-[calc(100%+160px)] h-0 border-0 border-t-[2px] border-dotted border-[#CDCDCD]" />
          )}
        </Flex>
      </Flex>
      <ReleaseProgressInfo />
    </Box>
  );
}

function ReleaseProgressInfo() {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const [info, setInfo] = useState({} as Record<string, string>);
  const {
    actions: { setReleaseState },
  } = useReleaseStore();

  const getReleaseInfo = async () => {
    const res: any = await releaseInfo();
    const formatRes = {} as Record<string, string>;
    Object.keys(res).forEach((key: keyof typeof res) => {
      formatRes[key as string] = formatUnits(res[key], 18);
    });
    // console.log("getReleaseInfo", formatRes);
    setReleaseState?.(formatRes);
    setInfo(formatRes);
  };

  useMount(() => {
    getReleaseInfo();
  });

  const config = [
    {
      title: t("Released (XOC)"),
      value: formatNumber(info.released, 2),
    },
    {
      title: t("Next Release (XOC)"),
      value: formatNumber(info.nextReleased, 2),
    },
    {
      title: t("Remaining Total Quantity (XOC)"),
      value: formatNumber(info.totalSurplus, 2),
    },
  ];

  return (
    <Wrap
      justifyContent="space-between"
      mx={{ base: "16px", lg: "68px" }}
      my={{ base: "20px", lg: "40px" }}
      px={{ base: 0, lg: "20px", xl: "92px" }}
      py={{ base: 0, lg: "29px" }}
      bg={{ base: "none", lg: "#FFF0F0" }}
      border={{ base: "none", lg: "1px solid #FF0206" }}
      rounded="20px"
      gap={{ base: "20px", lg: 0 }}
    >
      {config.map((item, index) => (
        <>
          <Flex
            key={item.title}
            direction="column"
            gap="17px"
            w={{ base: "100%", lg: "auto" }}
            p={{ base: "20px", lg: 0 }}
            bg={{ base: "#FFF0F0", lg: "none" }}
            border={{ base: "1px solid #FF0206", lg: "none" }}
            rounded={{ base: "20px", lg: 0 }}
          >
            <Box
              fontSize={{ base: "20px", lg: "28px", xl: "32px" }}
              fontWeight="700"
              lineHeight="normal"
            >
              {item.value}
            </Box>
            <Box
              data-nobold
              fontSize={{ base: "12px", lg: "16px", xl: "20px" }}
              fontWeight="400"
              color="#404150"
            >
              {item.title}
            </Box>
          </Flex>
          {(!index || index < config.length - 1) && (
            <Box
              key={index}
              hidden={isMobile}
              w="0"
              borderRight="1px dotted #F2F4F8"
            />
          )}
        </>
      ))}
    </Wrap>
  );
}
