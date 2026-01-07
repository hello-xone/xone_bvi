// import { ActionFunctionArgs } from "@remix-run/node";
import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Input,
  Icon,
  HoverCard,
  Wrap,
  Group,
  useUpdateEffect,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { useTranslation } from "react-i18next";
import { readContract } from "~/utils/contract";
import { formatNumber } from "~/utils/format/number";
import XOCReleaseAbi from "~/config/abi/XOCReleaseV2.json";
import ERC20Abi from "~/config/abi/ERC20.json";
import XOCMigrateAbi from "~/config/abi/XOCMigrate.json";
import { useWalletKit, ConnectStatus } from "@tokenup/walletkit";

import { ArrowIcon, LightIcon } from "~/components/icon";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { toaster } from "~/components/ui/toaster";
import { FaWallet } from "react-icons/fa";
import { BigNumber } from "bignumber.js";
import useReleaseStore from "~/store/releaseStore";
import InstructionModal from "./InstructionModal";
import AbstainModal from "./AbstainModal";
import useMobile from "~/hooks/useMobile";
import { PrimaryButton } from "~/components/ui/button";
import Font from "~/components/ui/font";
import useWidthScale from "~/hooks/useWidthScale";
import { useWallet } from "~/hooks/useWallet";
import { withdraw } from "~/api/modules/dynamics";

type PaddingReleaseInfo = {
  lockTotal: bigint;
  releaseTotal: bigint;
  pendingReleaseTotal: bigint;
};

type ParsePaddingReleaseInfo = {
  lockTotal: string;
  releaseTotal: string;
  pendingReleaseTotal: string;
};

export const MAX_AMOUNT =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

export default function NeedRelease({ curlEpoch }: { curlEpoch: number }) {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const {
    connectStatus,
    walletAddress,
    connect,
    disconnect,
    switchNetwork,
    writeContract,
    waitForTransactionReceipt,
  } = useWalletKit();
  const { releaseState } = useReleaseStore();

  const [focus, setFocus] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paddingReleaseInfo, setPaddingReleaseInfo] = useState(
    {} as ParsePaddingReleaseInfo
  );
  const {
    lockTotal = "0.00",
    releaseTotal = "0.00",
    pendingReleaseTotal = "0.00",
  } = paddingReleaseInfo;

  const setpConfig = [
    {
      id: 1,
      title: t("Send WXOC tokens"),
      subTitle: t("Send WXOC tokens to the XOC Release contract"),
      img: "/images/dynamics/intr_1.png",
    },
    {
      id: 2,
      title: t("Synchronize data"),
      subTitle: t(
        "After receiving the token, the contract will synchronize data with Xone Mainnet"
      ),
      img: "/images/dynamics/intr_2.png",
    },
    {
      id: 3,
      title: t("Release XOC"),
      subTitle: t(
        "After synchronization, XOC will be released, which can be confirmed by going to the main network"
      ),
      img: "/images/dynamics/intr_3.png",
    },
  ];

  const [paddingReleaseRes, setPaddingReleaseRes] = useState(
    {} as PaddingReleaseInfo
  );
  const paddingRelease = async () => {
    const res: PaddingReleaseInfo = await readContract({
      address: import.meta.env.VITE_APP_XOC_RELEASE_ADDRESS,
      abi: XOCReleaseAbi,
      functionName: "pendingRelease",
      rpcUrl: import.meta.env.VITE_APP_MAIN_RPC_URL,
      args: [walletAddress, curlEpoch],
    });

    setPaddingReleaseRes(res);

    setPaddingReleaseInfo({
      lockTotal: formatNumber(
        formatUnits(res.lockTotal - res.releaseTotal, 18),
        2
      ),
      releaseTotal: formatNumber(formatUnits(res.releaseTotal, 18), 2),
      pendingReleaseTotal: formatNumber(
        formatUnits(res.pendingReleaseTotal, 18),
        2
      ),
    });
  };

  const { balance, getBalanceLoading, getBalance } = useWallet("wxoc");

  useUpdateEffect(() => {
    if (walletAddress && (curlEpoch ?? false)) {
      paddingRelease();
    } else {
      setPaddingReleaseInfo({
        lockTotal: "0.00",
        releaseTotal: "0.00",
        pendingReleaseTotal: "0.00",
      });
      setPaddingReleaseRes({
        lockTotal: 0n,
        releaseTotal: 0n,
        pendingReleaseTotal: 0n,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress, curlEpoch]);

  const handleConnectClick = () => {
    if (connectStatus === ConnectStatus.Connected) {
      disconnect();
    } else {
      connect();
    }
  };

  const [amount, setAmount] = useState("");
  const [displayAmount, setDisplayAmount] = useState("");

  const formatDisplayValue = (val: string) => {
    if (!val) return "";

    const parts = val.split(".");

    const formattedInt = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (parts[1] !== undefined) {
      return `${formattedInt}.${parts[1].slice(0, 2)}`;
    }

    return formattedInt;
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^\d.]/g, "");

    const dots = input.match(/\./g)?.length || 0;
    if (dots > 1) return;

    if (input.includes(".")) {
      const [, decimal] = input.split(".");
      if (decimal?.length > 2) return;
    }

    setAmount(input);
    setDisplayAmount(formatDisplayValue(input));
  };

  const [sendLoading, setSendLoading] = useState(false);
  const handleSendWXOC = async () => {
    if (connectStatus !== ConnectStatus.Connected) {
      toaster.create({
        description: t("Please connect wallet!"),
        type: "error",
      });
      return;
    }
    setSendLoading(true);
    try {
      await switchNetwork(Number(import.meta.env.VITE_APP_TEST_CHAIN_ID));
      const data = await readContract({
        address: import.meta.env.VITE_APP_WXOC_ADDRESS,
        abi: ERC20Abi,
        functionName: "allowance",
        args: [walletAddress, import.meta.env.VITE_APP_XOC_MIGRATE_ADDRESS],
        rpcUrl: import.meta.env.VITE_APP_TEST_RPC_URL,
      });
      // console.log("allowance", data);
      if (BigNumber(data.toString()).lt(BigNumber(amount).shiftedBy(18))) {
        const hash = await writeContract({
          abi: ERC20Abi,
          address: import.meta.env.VITE_APP_WXOC_ADDRESS,
          functionName: "approve",
          args: [import.meta.env.VITE_APP_XOC_MIGRATE_ADDRESS, MAX_AMOUNT],
        });
        await waitForTransactionReceipt(hash).then(() => {
          paddingRelease();
          getBalance();
          setAmount("");
          setDisplayAmount("");
          toaster.create({
            description: t("Send WXOC success!"),
            type: "success",
          });
        });
      }
      // console.log("amount", amount, parseUnits(amount, 18));
      const res = await writeContract({
        address: import.meta.env.VITE_APP_XOC_MIGRATE_ADDRESS,
        abi: XOCMigrateAbi,
        functionName: "migrate",
        args: [parseUnits(amount, 18)],
      });
      // console.log(res);
      await waitForTransactionReceipt(res).then(() => {
        paddingRelease();
        getBalance();
        setAmount("");
        setDisplayAmount("");
        toaster.create({
          description: t("Send WXOC success!"),
          type: "success",
        });
      });
      setSendLoading(false);
    } catch (error) {
      setSendLoading(false);
      toaster.create({
        description: t("Cancellation of authorization"),
        type: "warning",
      });
    }
    // console.log("sendWXOC:res", res);
  };

  const { signMessage } = useWalletKit();
  const [releaseLoading, setReleaseLoading] = useState(false);

  const handleReleaseXOC = async () => {
    if (connectStatus !== ConnectStatus.Connected) {
      toaster.create({
        description: t("Please connect wallet!"),
        type: "error",
      });
      return;
    }
    setReleaseLoading(true);
    await switchNetwork(Number(import.meta.env.VITE_APP_MAIN_CHAIN_ID));
    signMessage(walletAddress)
      .then(async (sign) => {
        toaster.create({
          description: t("Authorization successful"),
          type: "success",
        });
        const fd = new FormData();
        fd.append("sign", sign);
        fd.append("address", walletAddress);
        withdraw(fd)
          .send()
          .then(async (result: any) => {
            const { s, v, r, epoch, randHash } = result;
            const res = await writeContract({
              address: import.meta.env.VITE_APP_XOC_RELEASE_ADDRESS,
              abi: XOCReleaseAbi,
              functionName: "release",
              args: [`0x${v}`, epoch, r, s, randHash],
            })
              .then(() => {
                toaster.create({
                  description: t("Release XOC success!"),
                  type: "success",
                });
                getBalance();
              })
              .catch((err) => {
                toaster.create({
                  description: t("Cancellation of authorization"),
                  type: "warning",
                });
              })
              .finally(() => {
                setReleaseLoading(false);
              });
          })
          .catch(() => {
            setReleaseLoading(false);
          });
      })
      .catch(() => {
        setReleaseLoading(false);
        toaster.create({
          description: t("Cancellation of authorization"),
          type: "warning",
        });
      });
  };

  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleMaxClick = () => {
    if (connectStatus !== ConnectStatus.Connected) {
      toaster.create({
        description: t("Please connect wallet!"),
        type: "error",
      });
      return;
    }
    if (balance) {
      const roundedDisplay = formatUnits(balance as bigint, 18);
      setAmount(roundedDisplay);
      setDisplayAmount(roundedDisplay);
    }
  };

  const scale = useWidthScale();

  const [isAbstainOpen, setIsAbstainOpen] = useState(false);
  const handleAbstainClick = () => {
    setIsAbstainOpen(true);
  };

  return (
    <Box
      id="need-release-section"
      w="full"
      rounded="20px"
      bg="white"
      px={{ base: "16px", md: "20px" }}
      py={{ base: "16px", md: "40px" }}
    >
      <Flex alignItems="center">
        <Box as="h1" fontSize={{ base: "16px", md: "36px" }} fontWeight="600">
          {t("I Need to Release")}
        </Box>
        <Button variant="ghost" onClick={() => setIsOpen(true)}>
          <LightIcon w="28px" h="28px" viewBox="" />
        </Button>
      </Flex>
      <Wrap
        lineHeight="48px"
        p="20px"
        rounded="20px"
        bg="#EFFAF5"
        flexDir={{ base: "column", md: "row" }}
        my={{ base: "10px", md: "32px" }}
        mb={{ base: "20px", md: "32px" }}
        gap="8px"
        alignItems={{ base: "flex-start", md: "center" }}
        color="#02D300"
      >
        <Box
          data-nobold
          as="h1"
          fontSize={{ base: "12px", md: "24px" }}
          fontWeight="500"
          lineHeight={{ base: "normal", md: "inherit" }}
        >
          {t("Current Release Remaining (XOC)")} :
        </Box>
        <Box
          fontSize={{ base: "14px", md: "36px" }}
          fontWeight="700"
          lineHeight={{ base: "normal", md: "inherit" }}
        >
          {formatNumber(releaseState.remaining || 0, 2)}
        </Box>

        <Flex ml={{ base: 0, md: "auto" }}>
          <Button
            data-nobold
            ml="auto"
            mt={{ base: "10px", md: 0 }}
            rounded="8px"
            bg="white"
            pl="20px"
            pr="12px"
            py="16px"
            color="#000"
            font={{ base: "12px", md: "18px" }}
            fontWeight="600"
            loading={getBalanceLoading}
            onClick={handleConnectClick}
          >
            {connectStatus === ConnectStatus.Connected ? (
              <>
                <FaWallet />
                {formatNumber(formatUnits(balance as bigint, 18), 2)}
              </>
            ) : (
              <>
                {t("Connect Wallet")}
                <ArrowIcon />
              </>
            )}
          </Button>
        </Flex>
      </Wrap>
      <Flex
        pos="relative"
        direction="column"
        alignItems="center"
        py={{ base: 0, md: "40px" }}
        pb={{ base: "25px", md: "40px" }}
        px={{ base: 0, md: "30px", "2xl": "150px" }}
        gap={{ base: "20px", md: "30px" }}
        rounded="20px"
        bg={{
          base: "none",
          md: "linear-gradient(0deg, #FFF 75.11%, #FFECE1 160.96%)",
        }}
        border={{ base: 0, md: "1px solid #FFE1D0" }}
      >
        <Wrap
          order={{ base: 2, md: "inherit" }}
          justifyContent={{ base: "center" }}
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          gap={{ base: "20px", md: "0", lg: "30px", "2xl": "80px" }}
        >
          {setpConfig.map((item, index) => (
            <>
              {!!index && !isMobile && (
                <Image
                  src="/images/dynamics/line_arrow.png"
                  w={`${200 * scale}px`}
                  key={index}
                  mt="60px"
                  mb="auto"
                  h="8px"
                  objectFit="contain"
                />
              )}
              <Flex
                key={item.id}
                direction="column"
                alignItems="center"
                pos="relative"
                maxW="400px"
                minH="182px"
                css={{
                  transform: `scale(${scale})`,
                }}
              >
                <Image src={item.img} w="80px" h="80px" minH="80px" />
                <Flex
                  direction="column"
                  alignItems="center"
                  pos={{ base: "static", md: "absolute" }}
                  top="100px"
                >
                  <Flex alignItems="center" gap="8px">
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      w="32px"
                      h="32px"
                      rounded="full"
                      bg="black"
                      color="white"
                      fontSize="18px"
                      fontWeight="800"
                    >
                      {index + 1}
                    </Flex>
                    <Box fontSize="20px" fontWeight="500" textWrap="nowrap">
                      {item.title}
                    </Box>
                  </Flex>
                  <Box
                    data-nobold
                    minW={{ base: "auto", md: "250px" }}
                    maxW={{ base: "auto", md: "350px" }}
                    pt="8px"
                    fontSize="14px"
                    fontWeight="500"
                    color="#979797"
                    textAlign="center"
                  >
                    {item.subTitle}
                  </Box>
                </Flex>
              </Flex>
            </>
          ))}
        </Wrap>
        <Group
          attached
          w="full"
          border="1px solid #C6C6C6"
          rounded={{ base: "12px", md: "20px" }}
          outline={focus ? "1px solid red" : "none"}
        >
          <Input
            h={{ base: "80px", md: "100px" }}
            fontSize={{ base: "32px", md: "48px" }}
            fontWeight="700"
            px="30px"
            py="10px"
            placeholder="0.00"
            border="0"
            rounded={{ base: "12px", md: "20px" }}
            _focus={{
              _placeholder: { opacity: 0 },
              outline: 0,
            }}
            textAlign={{ base: "left", md: "center" }}
            value={displayAmount}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            disabled={!balance}
            onChange={handleAmountChange}
          />
          <Font
            data-nobold
            size={{ base: "18px", md: "24px" }}
            weight="500"
            color="#FF0206"
            mr="30px"
            cursor="pointer"
            minW="max-content"
            onClick={handleMaxClick}
          >
            {t("ALL")}
          </Font>
        </Group>

        <Flex flexDir={{ base: "column", md: "row" }} w="full" gap="30px">
          <Flex flex="1" alignItems="center" justifyContent="space-between">
            <Flex w="full" alignItems="center">
              <Box data-nobold fontSize="14px" fontWeight="600">
                {t("Locked (WXOC)")}
              </Box>
              <HoverCard.Root>
                <HoverCard.Trigger asChild>
                  <Flex
                    cursor="pointer"
                    ml="8px"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={AiOutlineQuestionCircle} color="#B3B3B3" />
                  </Flex>
                </HoverCard.Trigger>
                <HoverCard.Positioner>
                  <HoverCard.Content bg="#FAF9F9">
                    <Text data-nobold>
                      {t(
                        "When you send XoneTestnet WXOC tokens to our contract address, they will be locked and await the next release for the corresponding amount to be unlocked."
                      )}
                      <a
                        href="https://docs.xone.org/study/release#about-the-release-mechanism"
                        target="_blank"
                      >
                        <Text
                          as="span"
                          color="red"
                          ml="8px"
                          textDecor="underline"
                        >
                          {t("Please go here")} &gt;&gt;
                        </Text>
                      </a>
                    </Text>
                  </HoverCard.Content>
                </HoverCard.Positioner>
              </HoverCard.Root>
              <Font data-nobold ml="auto">
                {lockTotal}
              </Font>
            </Flex>
          </Flex>
          <Flex flex="1" alignItems="center" justifyContent="space-between">
            <Flex w="full" alignItems="center">
              <Box data-nobold fontSize="14px" fontWeight="600">
                {t("Release (XOC)")}
              </Box>
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <Flex
                    cursor="pointer"
                    ml="8px"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={AiOutlineQuestionCircle} color="#B3B3B3" />
                  </Flex>
                </HoverCard.Trigger>
                <HoverCard.Positioner>
                  <HoverCard.Content bg="#FAF9F9">
                    <Text data-nobold>
                      {t(
                        "When releasing XoneMainnet XOC, the amount you can release is calculated based on the locked amount in your address. If you haven't made any releases before, Xone will send all previously releasable amounts to your XoneMainnet address when you confirm the release."
                      )}

                      <a
                        href="https://docs.xone.org/study/release#how-do-i-calculate-the-tokens-i-can-release"
                        target="_blank"
                      >
                        <Text
                          as="span"
                          color="red"
                          ml="8px"
                          textDecor="underline"
                        >
                          {t("Learn more")} &gt;&gt;
                        </Text>
                      </a>
                    </Text>
                  </HoverCard.Content>
                </HoverCard.Positioner>
              </HoverCard.Root>
              <Font data-nobold ml="auto">
                {releaseTotal}
              </Font>
            </Flex>
          </Flex>
        </Flex>
        <Flex data-nobold w="full" gap={{ base: "20px", md: "24px" }}>
          <PrimaryButton
            flex="1"
            fontSize={{ base: "14px", md: "24px" }}
            fontWeight="600"
            border="1.5px solid #FF0420"
            rounded={{ base: "12px", md: "20px" }}
            h={{ base: "44px", md: "76px" }}
            pl="20px"
            pr="12px"
            py="16px"
            whiteSpace="pre-wrap"
            lineHeight="1"
            disabled={!amount}
            loading={sendLoading}
            onClick={handleSendWXOC}
          >
            {t("Send WXOC")}
            {!isMobile && <ArrowIcon className="[&>svg]:fill-white" />}
          </PrimaryButton>
          <Button
            variant="ghost"
            flex="1"
            type="button"
            fontSize={{ base: "14px", md: "24px" }}
            fontWeight="600"
            border="1.5px solid #ED0000"
            rounded={{ base: "12px", md: "20px" }}
            h={{ base: "44px", md: "76px" }}
            pl="20px"
            pr="12px"
            py="16px"
            whiteSpace="pre-wrap"
            lineHeight="1"
            _hover={{ bg: "#FFF0F0" }}
            disabled={!paddingReleaseRes?.pendingReleaseTotal}
            loading={releaseLoading}
            onClick={handleReleaseXOC}
          >
            {paddingReleaseRes?.pendingReleaseTotal
              ? t("Releasable {{amount}} XOC", { amount: pendingReleaseTotal })
              : t("Unreleasable")}{" "}
            {!isMobile && <ArrowIcon />}
          </Button>
        </Flex>
        <Flex
          data-nobold
          direction="column"
          w="full"
          bg="#FAF9F9"
          p="12px"
          rounded="12px"
          fontSize="14px"
          fontWeight="500"
          gap="12px"
        >
          <Box>{t("Tips")}:</Box>
          <Box px="5px">
            {t(
              "1. Please ensure your connected wallet account has sufficient Xone Testnet gas fees."
            )}
            <a
              href="https://faucet.xone.org/en"
              target="_blank"
              className="text-red-500 pl-[5px] hover:underline"
            >
              {t("Out of gas?")}
            </a>
          </Box>
          <Box px="5px">
            {t("2. Each release has a limit, so plan ahead accordingly.")}
          </Box>
          <Box px="5px">
            {t(
              "3. It’s recommended to familiarize yourself with the release rules and process in advance."
            )}
            <a
              href="https://docs.xone.org/study/release"
              target="_blank"
              className="text-red-500 pl-[5px] hover:underline"
            >
              {t("Learn how to operate and understand the rules here.")}
            </a>
          </Box>
        </Flex>
      </Flex>
      <InstructionModal isOpen={isOpen} onClose={onClose} />
      <AbstainModal
        isOpen={isAbstainOpen}
        lockTotal={lockTotal}
        onClose={() => setIsAbstainOpen(false)}
      />
    </Box>
  );
}
