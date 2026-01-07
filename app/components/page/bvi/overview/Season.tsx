import { Box, Center, Flex, Wrap } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { CiClock2 } from "react-icons/ci";
import CountDown from "./CountDown";
import dayjs from "dayjs";
import { formatNumber } from "~/utils/format/number";
import JumpButton from "~/components/ui/jump-button";
import { detail } from "~/api/modules/bvi";
import { useRequest } from "alova/client";
import { useMount } from "ahooks";
import useMobile from "~/hooks/useMobile";
import Tip from "~/components/ui/tip";

export type DetailData = {
  name: string;
  content: string;
  reward_gv: number;
  start_block: number;
  end_block: number;
  participant: number;
  effective: number;
  start_at: number;
  end_at: number;
  status: string;
};

export default function Season() {
  const { t } = useTranslation();

  const isMobile = useMobile();

  const { data: detailData, send: detailSend } = useRequest(detail, {
    immediate: false,
    initialData: {},
  });

  const {
    name,
    start_at,
    end_at,
    reward_gv,
    start_block,
    end_block,
    participant,
    effective,
    content,
    status,
  } = (detailData as DetailData) || {};

  useMount(() => {
    detailSend();
  });

  return (
    <Flex
      hidden={!start_at}
      data-nobold
      w="full"
      direction="column"
      bg="white"
      p="20px"
      rounded="12px"
    >
      <Wrap alignItems="center" justifyContent="space-between">
        <Box
          fontSize={{ base: "16px", md: "24px" }}
          fontWeight="600"
          lineHeight="normal"
        >
          {t("Season information")}
        </Box>
        <JumpButton>{t("Historical Season")}</JumpButton>
      </Wrap>
      <Center pt={{ base: "16px", md: 0 }}>
        <CountDown showTitle bg="white" size="sm" endTime={end_at * 1000} />
      </Center>
      <Flex
        direction="column"
        mt="20px"
        p="16px"
        rounded="12px"
        border="1px solid #FFD3D3"
        bg="linear-gradient(0deg, #FFF 55.9%, #FFF4F4 112.31%)"
      >
        <Wrap
          w="full"
          alignItems="center"
          justifyContent="space-between"
          gap="10px"
          fontSize="14px"
          fontWeight="600"
          lineHeight="normal"
        >
          <Box fontSize="16px" fontWeight="500" lineHeight="normal">
            {name}
          </Box>
          <Center
            color="#FF5D00"
            border="1px solid #FF0206"
            bg="#FFF0F0"
            px="15px"
            h="25px"
            rounded="20px"
            mr="auto"
            fontSize={{ base: "12px", md: "14px" }}
          >
            <Box _firstLetter={{ textTransform: "uppercase" }} pb="2px">
              {status}
            </Box>
          </Center>
          <Center
            fontSize={{ base: "12px", md: "14px" }}
            fontWeight="400"
            gap="3px"
            pr={{ base: 0, md: "16px" }}
          >
            <CiClock2 size={isMobile ? "14px" : "18px"} />
            <Box as="span" fontWeight="700">
              {dayjs(start_at * 1000).format("MMMM D, YYYY")}
            </Box>
            {dayjs(start_at * 1000).format("HH:mm:ss")} -
            <Box as="span" fontWeight="700">
              {dayjs(end_at * 1000).format("MMMM D, YYYY")}
            </Box>
            {dayjs(end_at * 1000).format("HH:mm:ss")}
          </Center>
        </Wrap>
        <Box pt="20px" fontSize="14px" fontWeight="300" lineHeight="normal">
          {t("Total reward GV")}
        </Box>
        <Flex alignItems="center" gap="8px" pt="4px" pb="10px">
          <Box
            fontSize={{ base: "32px", md: "42px" }}
            fontWeight="600"
            lineHeight="normal"
          >
            <Tip content={reward_gv}>{formatNumber(reward_gv, 2)}</Tip>
          </Box>
          <Box fontSize="14px" fontWeight="400" color="#404150">
            GV
          </Box>
        </Flex>
        <Wrap
          direction={{ base: "column", md: "row" }}
          py="16px"
          gap={{ base: "0px", md: "110px" }}
        >
          <Flex
            flex="1"
            direction="column"
            gap="10px"
            fontSize="14px"
            color="#404150"
          >
            <Wrap direction="row" justifyContent="space-between">
              <Box fontWeight="500">Effective Block</Box>
              <Box fontWeight="400" color="#979797">
                {start_block}
              </Box>
            </Wrap>
            <Wrap justifyContent="space-between">
              <Box fontWeight="500">End block</Box>
              <Box fontWeight="400" color="#979797">
                {end_block}
              </Box>
            </Wrap>
          </Flex>
          <Flex
            flex="1"
            direction="column"
            gap="10px"
            fontSize="14px"
            color="#404150"
            pr={{ base: 0, md: "20px" }}
            mt={{ base: "20px", md: 0 }}
          >
            <Wrap alignItems="flex-end" justifyContent="space-between">
              <Box fontWeight="500">Participating address</Box>
              <Box
                fontSize={{ base: "12px", md: "14px" }}
                fontWeight="400"
                color="#979797"
              >
                {participant}
              </Box>
            </Wrap>
            <Wrap alignItems="flex-end" justifyContent="space-between">
              <Box fontWeight="500">Effective address</Box>
              <Box
                fontSize={{ base: "12px", md: "14px" }}
                fontWeight="400"
                color="#979797"
              >
                {effective}
              </Box>
            </Wrap>
          </Flex>
        </Wrap>

        <Box
          as="h3"
          pb="12px"
          fontSize={{ base: "16px", md: "28px" }}
          fontWeight="600"
          lineHeight="normal"
        >
          {t("Content")}
        </Box>
        <Box
          fontSize={{ base: "14px", md: "16px" }}
          fontWeight="400"
          lineHeight="normal"
          color="#404150"
        >
          {content}
        </Box>
      </Flex>
    </Flex>
  );
}
