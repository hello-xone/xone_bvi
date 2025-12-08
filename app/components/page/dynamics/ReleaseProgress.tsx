import { Flex, Box, Image, Wrap, Text } from "@chakra-ui/react";
import { useState } from "react";
import { formatUnits } from "viem";
import { useMount } from "ahooks";
import { useTranslation } from "react-i18next";
import { readContract } from "~/utils/contract";
import { formatTSNumber } from "~/utils/format/number";
import { useReleaseScroll } from "~/hooks/useRelease";
import XOCReleaseAbi from "~/config/abi/XOCRelease.json";
import { CONTRACT_ADDRESSES, RPC_URLS, BLOCK_EXPLORER } from "~/config/env";

import useReleaseStore from "~/store/releaseStore";
import useMobile from "~/hooks/useMobile";
import { ReactSVG } from "react-svg";
import clsx from "clsx";

type EpochDetailsInfo = {
  totalEpoch: bigint;
  curlEpoch: bigint;
  details: EpochInfo[];
};

type EpochInfo = {
  epoch: bigint;
  blockNum: bigint;
  transactions: bigint;
  alRelease: string;
  curlRelease: string;
};

let timer: ReturnType<typeof setTimeout> | null = null;

export default function ReleaseProgress() {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const [current, setCurrent] = useState<number | null>(null);

  const [epochDetailsInfo, setEpochDetailsInfo] = useState<EpochDetailsInfo>(
    {} as EpochDetailsInfo
  );

  const { details = [], curlEpoch } = epochDetailsInfo;

  const getEpochDetailsInfo = async () => {
    const res = await readContract({
      address: CONTRACT_ADDRESSES.XOC_RELEASE,
      abi: XOCReleaseAbi,
      functionName: "getEpochDetailsInfo",
      rpcUrl: RPC_URLS.MAIN,
    });
    res.details.splice(1, 50);
    res.details.forEach((item) => {
      item.curlRelease = formatUnits(item.curlRelease, 18);
      item.alRelease = formatUnits(item.alRelease, 18);
    });
    setEpochDetailsInfo(res);
    const currentIndex = Math.max(
      0,
      res.details.findIndex((item: any) => item.epoch === res.curlEpoch)
    );

    setActiveIndex(currentIndex);
    setTimeout(() => {
      scrollToCenter(currentIndex);
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
  } = useReleaseScroll();

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

  const getEpochStatus = (epoch: bigint, curlEpoch: bigint): EpochStatus => {
    if (curlEpoch < BigInt(51)) {
      return epoch === BigInt(0) ? "releasing" : "pending";
    }
    if (epoch < curlEpoch) return "released";
    if (epoch === curlEpoch) return "releasing";
    return "pending";
  };

  const openBlockExplorer = (item: EpochInfo) => {
    window.open(
      `${BLOCK_EXPLORER}/block/${item.blockNum}`
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
      py={{ base: "20px", lg: "30px" }}
      pb={{ base: 0, lg: "30px" }}
      bg="white"
      rounded="20px"
    >
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
          {details.map((item: EpochInfo, index, arr) => {
            const status = getEpochStatus(item.epoch, curlEpoch);
            const isActive = index === activeIndex && current === null;

            return (
              <Box
                key={index}
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
                      {t("Block")} #{item.blockNum.toString()}
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
                      <Text>{formatTSNumber(item.curlRelease)}</Text>
                    </Flex>
                    <Flex justify="space-between" mb={2}>
                      <Text>{t("Transaction Count")}</Text>
                      <Text>{item.transactions.toString()}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text>{t("Successfully Released(XOC)")}</Text>
                      <Text>{formatTSNumber(item.alRelease)}</Text>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            );
          })}
          {!!details?.length && (
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
    const res = await readContract({
      address: CONTRACT_ADDRESSES.XOC_RELEASE,
      abi: XOCReleaseAbi,
      functionName: "getReleaseInfo",
      rpcUrl: RPC_URLS.MAIN,
    });
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
      value: formatTSNumber(info.alRelease),
    },
    {
      title: t("Next Release (XOC)"),
      value: formatTSNumber(info.nextEpochRelease),
    },
    {
      title: t("Remaining Total Quantity (XOC)"),
      value: formatTSNumber(Number(info.maxRelease) - Number(info.alRelease)),
    },
  ];

  return (
    <Wrap
      justifyContent="space-between"
      mx={{ base: "16px", lg: "68px" }}
      my={{ base: "20px", lg: "40px" }}
      px={{ base: 0, lg: "40px", xl: "92px" }}
      py={{ base: 0, lg: "29px" }}
      bg={{ base: "none", lg: "#FFF0F0" }}
      border={{ base: "none", lg: "1px solid #FF0206" }}
      rounded="20px"
      gap={{ base: "20px", lg: 0 }}
    >
      {config.map((item, index) => (
        <>
          <Flex
            key={index}
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
