import {
  Avatar,
  Box,
  Flex,
  Clipboard,
  Center,
  Wrap,
  FormatByte,
  Skeleton,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { formatAddress } from "~/utils/format/address";
import dayjs from "dayjs";
import JumpButton from "~/components/ui/jump-button";
import { useWalletKit } from "@tokenup/walletkit";
import { useMount } from "ahooks";
import { useRequest } from "alova/client";
import { epoch } from "~/api/modules/bvi";
import { useWallet } from "~/hooks/useWallet";
import { formatNumber, formatTSNumber } from "~/utils/format/number";
import { UpdateTime } from "~/components/ui/update-time";
import useMobile from "~/hooks/useMobile";
import useUserStore from "~/store/userStore";
import Tip from "~/components/ui/tip";
import useHashAvatar from "~/hooks/useHashAvatar";

type Props = {
  identity: string;
};

export type EpochData = {
  start_at: number;
  end_at: number;
  epoch: number;
  previous_participant: number;
  previous_reward: string;
};

const identityBg = {
  person: "#FF5D00",
  organization: "#3DABFF",
  project: "#02D300",
};

export default function IdentityTopInfo(props: Props) {
  const { t } = useTranslation();
  const { identity } = props;

  const { walletAddress } = useWalletKit();
  const isMobile = useMobile();

  const { userInfo } = useUserStore();

  const { data: epochData, send: epochSend }: any = useRequest(epoch, {
    immediate: true,
    initialData: {
      start_at: 0,
      end_at: 0,
      epoch: 0,
    },
  });

  const { balance, getBalanceLoading } = useWallet();

  useMount(() => {
    epochSend();
  });

  const process = Math.floor(
    ((Date.now() / 1000 - epochData?.start_at) /
      (epochData?.end_at - epochData?.start_at)) *
      100
  );

  const userAvatar = useHashAvatar(walletAddress);

  return (
    <Wrap gap="20px">
      <Flex
        flex={{ base: "100%", xl: "458px", "2xl": 1 }}
        minW={{ base: "100%", md: "458px" }}
        direction="column"
        p="20px"
        bg="white"
        rounded="12px"
      >
        <Flex
          alignItems="center"
          rounded="12px"
          bg="url(/images/bvi/info_bg.png)"
          bgRepeat="no-repeat"
          bgSize="cover"
          w="max-content"
          h="48px"
          minH="48px"
          px="10px"
          gap="10px"
        >
          <Avatar.Root w="36px" h="36px" border="3px solid #090B1399">
            <Avatar.Image w="30px" h="30px" src={userAvatar} />
          </Avatar.Root>
          <Box
            fontSize="16px"
            fontWeight="700"
            lineHeight="normal"
            borderBottom="1px dotted black"
          >
            <Clipboard.Root value={walletAddress}>
              <Tip content={walletAddress}>
                <Clipboard.Trigger asChild>
                  <Flex data-nobold alignItems="center" gap="8px">
                    {formatAddress(walletAddress, 6)}
                    <Clipboard.Indicator />
                  </Flex>
                </Clipboard.Trigger>
              </Tip>
            </Clipboard.Root>
          </Box>
          <Center
            h="28px"
            px="8px"
            rounded="8px"
            fontSize="14px"
            fontWeight="600"
            color="white"
            bg={identityBg[identity]}
            textTransform="Capitalize"
          >
            {t(identity)}
          </Center>
        </Flex>
        <Wrap mt="16px" justifyContent="space-between" alignItems="center">
          <Box
            data-nobold
            fontSize={{ base: "32px", md: "42px" }}
            fontWeight="600"
            lineHeight="normal"
          >
            <Tip content={balance as number} disabled={getBalanceLoading}>
              <Skeleton minW="160px" loading={getBalanceLoading}>
                {formatTSNumber(balance)}
              </Skeleton>
            </Tip>
          </Box>
          <JumpButton
            hidden={isMobile}
            to={`${
              import.meta.env.VITE_APP_BLOCK_EXPLORER
            }/address/${walletAddress}`}
          >
            {t("Check in the browser")}
          </JumpButton>
        </Wrap>
        <Flex
          direction="column"
          h="full"
          gap="8px"
          pt="8px"
          fontSize="14px"
          fontWeight="500"
          lineHeight="normal"
          color="#404150"
        >
          <Box data-nobold>{t("XOC balance")}</Box>
          {/* <Flex justifyContent="space-between" alignItems="center" gap="8px">
            <Box>Yesterday:</Box>
            <Flex alignItems="center" color="#02D300" mr="auto" gap="8px">
              <ReactSVG src="/images/icons/up_card.svg" />
              <Box fontSize="12px" fontWeight="400">
                0.34%
              </Box>
              <AiOutlineQuestionCircle color="#B3B3B3" />
            </Flex>
            <Box>+100.00</Box>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" gap="8px">
            <Box>Today:</Box>
            <Flex alignItems="center" color="#FF0206" mr="auto" gap="8px">
              <ReactSVG src="/images/icons/down_card.svg" />
              <Box fontSize="12px" fontWeight="400">
                0.34%
              </Box>
              <AiOutlineQuestionCircle color="#B3B3B3" />
            </Flex>
            <Box>+100.00</Box>
          </Flex> */}
          <JumpButton hidden={!isMobile} w="max-content">
            {t("Check in the browser")}
          </JumpButton>
          <UpdateTime mt="auto">
            {t(
              "The data has been precision processed and updated before 10 seconds."
            )}
          </UpdateTime>
        </Flex>
      </Flex>

      <Flex
        flex={{ base: "100%", xl: 1, "2xl": "370px" }}
        maxW={{ base: "100%", "2xl": "370px" }}
        minW={{ base: "100%", md: "370px" }}
        direction="column"
        p="20px"
        bg="white"
        rounded="12px"
      >
        <Wrap
          alignItems="center"
          justifyContent={{ base: "space-between", md: "flex-start" }}
          gap="10px"
        >
          <Box
            data-nobold
            fontSize={{ base: "16px", md: "28px" }}
            fontWeight="600"
            lineHeight="normal"
          >
            {t("GV Overview")}
          </Box>
          <AiOutlineQuestionCircle
            color="#B3B3B3"
            size="18px"
            className="mr-auto"
          />
          <JumpButton>{t("What is GV?")}</JumpButton>
        </Wrap>
        <Flex data-nobold mt="16px" gap="8px" alignItems="center">
          <Box
            fontSize={{ base: "32px", md: "42px" }}
            fontWeight="600"
            lineHeight="normal"
          >
            {formatNumber(userInfo.gv, 2)}
          </Box>
          <Box fontSize="14px" fontWeight="400" color="#404150">
            GV
          </Box>
        </Flex>
        <Flex
          data-nobold
          direction="column"
          mt="auto"
          gap="8px"
          pt="8px"
          fontSize="14px"
          fontWeight="500"
          lineHeight="normal"
          color="#404150"
        >
          <Flex justifyContent="space-between" alignItems="center" gap="8px">
            <Box>{t("Yesterday")}:</Box>
            <Flex
              alignItems="center"
              color={
                userInfo.growth?.yesterday?.rate >= 0 ? "#02D300" : "#FF0206"
              }
              mr="auto"
              gap="8px"
            >
              <ReactSVG
                src={`/images/icons/${
                  userInfo.growth?.yesterday?.rate >= 0 ? "up" : "down"
                }_card.svg`}
              />
              <Box fontSize="12px" fontWeight="400">
                {userInfo.growth?.yesterday?.rate * 100}%
              </Box>
              <AiOutlineQuestionCircle color="#B3B3B3" />
            </Flex>
            <Box>
              {userInfo.growth?.yesterday?.num > 0 ? "+" : ""}
              {formatNumber(userInfo.growth?.yesterday?.num, 2)}
            </Box>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" gap="8px">
            <Box>{t("Today")}:</Box>
            <Flex
              alignItems="center"
              color={userInfo.growth?.today?.rate >= 0 ? "#02D300" : "#FF0206"}
              mr="auto"
              gap="8px"
            >
              <ReactSVG
                src={`/images/icons/${
                  userInfo.growth?.today?.rate >= 0 ? "up" : "down"
                }_card.svg`}
              />
              <Box fontSize="12px" fontWeight="400">
                {userInfo.growth?.today?.rate * 100}%
              </Box>
              <AiOutlineQuestionCircle color="#B3B3B3" />
            </Flex>
            <Box>
              {userInfo.growth?.today?.num > 0 ? "+" : ""}
              {formatNumber(userInfo.growth?.today?.num, 2)}
            </Box>
          </Flex>
          <UpdateTime>
            {t(
              "The data has been precision processed and updated before 10 seconds."
            )}
          </UpdateTime>
        </Flex>
      </Flex>

      <Flex flexGrow="1" direction="column" p="20px" bg="white" rounded="12px">
        <Wrap
          alignItems="center"
          justifyContent={{ base: "space-between", md: "flex-start" }}
          gap="10px"
        >
          <Box
            data-nobold
            fontSize={{ base: "16px", md: "28px" }}
            fontWeight="600"
            lineHeight="normal"
          >
            {t("Epoch")}
          </Box>
          <Tip content={0} mr="auto" />
          <JumpButton to="https://docs.xone.org/study/epoch">
            {t("What is Epoch?")}
          </JumpButton>
        </Wrap>
        <Wrap
          data-nobold
          mt="24px"
          gap="8px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            fontSize={{ base: "32px", md: "42px" }}
            fontWeight="600"
            lineHeight="normal"
          >
            {epochData?.epoch}
            {/* <FormatByte value={epochData?.epoch} /> */}
          </Box>
          <Flex
            direction="column"
            minW={{ base: "100%", md: "370px" }}
            gap="5px"
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              fontSize="14px"
              fontWeight="400"
              lineHeight="normal"
              color="#404150"
            >
              <Box>{t("Next")}</Box>
              <Box>{process}%</Box>
            </Flex>
            <Flex w="full" h="6px" bg="#F2F4F8" rounded="25px">
              <Box w={`${process}%`} h="full" bg="#FF0206" rounded="25px" />
            </Flex>
          </Flex>
        </Wrap>
        <Wrap
          data-nobold
          pt="32px"
          fontSize="14px"
          fontWeight="500"
          lineHeight="normal"
          color="#404150"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex direction="column" gap="8px">
            <Flex fontWeight="400" alignItems="center" gap="8px">
              <Box>{t("Previous Epoch Reward")}</Box>
              <Tip content={epochData?.previous_reward} />
            </Flex>
            <Box
              fontSize="16px"
              fontWeight="600"
              lineHeight="normal"
              color="black"
            >
              <FormatByte value={+epochData?.previous_reward} />
            </Box>
          </Flex>
          <Flex direction="column" gap="8px">
            <Flex fontWeight="400" alignItems="center" gap="8px">
              <Box>{t("Previous Epoch participation")}</Box>
              <Tip content={epochData?.previous_participant} />
            </Flex>
            <Box
              fontSize="16px"
              fontWeight="600"
              lineHeight="normal"
              color="black"
            >
              <FormatByte value={epochData?.previous_participant} />
            </Box>
          </Flex>
          <Flex direction="column" gap="8px">
            <Flex fontWeight="400" alignItems="center" gap="8px">
              <Box>{t("The current Epoch starts from")}</Box>
              <Tip
                content={dayjs(epochData?.start_at * 1000).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              />
            </Flex>
            <Box
              fontSize="16px"
              fontWeight="600"
              lineHeight="normal"
              color="black"
            >
              {dayjs(epochData?.start_at * 1000).format("YYYY-MM-DD")}
            </Box>
          </Flex>
        </Wrap>
        <UpdateTime mt="8px">
          {t(
            "The data has been precision processed and updated before 10 seconds."
          )}
        </UpdateTime>
      </Flex>
    </Wrap>
  );
}
