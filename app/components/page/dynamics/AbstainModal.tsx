import {
  Box,
  Button,
  Flex,
  Image,
  Dialog,
  Text,
  Input,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "~/components/ui/button";
import Clipboard from "~/components/ui/clipboard";
import { useWalletKit } from "@tokenup/walletkit";
import XOCReleaseAbi from "~/config/abi/XOCReleaseV2.json";
import { toaster } from "~/components/ui/toaster";
import { useWallet } from "~/hooks/useWallet";

type Props = {
  isOpen: boolean;
  lockTotal: string;
  onClose: () => void;
};

const AbstainDialog = (props: Props) => {
  const { t } = useTranslation();
  const { isOpen, lockTotal = "0.00", onClose } = props;

  const { writeContract, switchNetwork } = useWalletKit();
  const { getBalance } = useWallet("wxoc");

  const handleClose = () => {
    setConfirmValue("");
    onClose();
  };

  const [confirmValue, setConfirmValue] = useState<string>("");

  const submit = async () => {
    await switchNetwork(Number(import.meta.env.VITE_APP_MAIN_CHAIN_ID));
    writeContract({
      address: import.meta.env.VITE_APP_XOC_RELEASE_ADDRESS,
      abi: XOCReleaseAbi,
      functionName: "waiver",
      args: [],
    })
      .then(() => {
        toaster.create({
          description: t("Waiver success"),
          type: "success",
        });
        getBalance();
        onClose();
      })
      .catch((err) => {
        toaster.create({
          description: t("Cancellation of authorization"),
          type: "warning",
        });
      });
  };

  return (
    <Dialog.Root
      placement={{ base: "bottom", md: "center" }}
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          w={{ base: "100%", md: "840px" }}
          maxW={{ base: "100%", md: "840px" }}
          minH={{ base: "auto", md: "560px" }}
          maxH={{ base: "75%", md: "max-content" }}
          rounded={{ base: "20px 20px 0 0", md: "20px" }}
          mb={{ base: 0, md: "auto" }}
          px={{ base: "16px", md: "34px" }}
          py="22px"
          overflow="auto"
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            mb={{ base: "15px", md: "35px" }}
          >
            <Box
              fontSize={{ base: "18px", md: "32px" }}
              lineHeight="38px"
              fontWeight={{ base: 700, md: 800 }}
            >
              {t("Waiver Reminder")}
            </Box>
            <IoIosClose
              size="35px"
              color="#404150"
              cursor="pointer"
              onClick={handleClose}
            />
          </Flex>
          <Box pb={{ base: "24px", md: "0" }}>
            <Flex
              direction="column"
              gap={{ base: "16px", md: "20px" }}
              pb={{ base: 0, md: "30px" }}
              lineHeight="24px"
            >
              <Image src="/images/dynamics/abstain.png" />
              <Text
                data-nobold
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={{ base: 600, md: 800 }}
                lineHeight={{ base: "normal", md: "inherit" }}
                mt="20px"
              >
                {t(
                  "We want to support users who seek liquidity and optionality now, rather than waiting for a fully vested schedule. By introducing an exemption path, you can accelerate your exposure through ROT, while unvested principal (XOC) will be redistributed to the Foundation for mission-related purposes. This will increase IRO participation and align incentives with RWA cash flows rather than locked balances."
                )}
              </Text>
              <Flex
                direction={{ base: "column", md: "row" }}
                alignItems="center"
                gap="5px"
              >
                <Text
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight="800"
                  lineHeight="normal"
                >
                  RWA Options Token：
                </Text>
                <Link
                  data-nobold
                  href={`${import.meta.env.VITE_APP_BLOCK_EXPLORER}/address/${
                    import.meta.env.VITE_APP_RWA_ADDRESS
                  }`}
                  target="_blank"
                >
                  {import.meta.env.VITE_APP_RWA_ADDRESS}
                </Link>
                <Clipboard value={import.meta.env.VITE_APP_RWA_ADDRESS}>
                  {""}
                </Clipboard>
              </Flex>
              <Flex color="#404150">
                <Text fontSize={{ base: "14px", md: "16px" }} fontWeight="500">
                  {t("You can get")}：
                </Text>
                <Text fontSize={{ base: "16px", md: "24px" }}>
                  {lockTotal} ROT
                </Text>
              </Flex>
              <Flex>
                <Text fontSize={{ base: "14px", md: "16px" }}>
                  {t("For more information, please see")}
                </Text>
                <Link
                  href="https://docs.xone.org/study/early_unlock"
                  target="_blank"
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight="800"
                  color="#FF0206"
                  lineHeight="normal"
                >
                  《{t("Unlock Immunity in Advance")}》
                </Link>
              </Flex>
              <Input
                value={confirmValue}
                placeholder={t("Please enter")}
                h={{ base: "48px", md: "64px" }}
                rounded="8px"
                onInput={(e: any) => setConfirmValue(e.target.value)}
              />
              <Text>
                {t('Please enter "{{confirmation}}"', {
                  confirmation: t("I know and confirm to give up"),
                })}
              </Text>
              <Flex
                alignItems="center"
                justifyContent="center"
                gap="20px"
                mt={{ base: "20px" }}
              >
                <Button
                  data-nobold
                  variant="ghost"
                  rounded="12px"
                  fontSize="18px"
                  border="1.5px solid #FF0206"
                  flex="1"
                  h="48px"
                  color="#FF0206"
                  onClick={handleClose}
                >
                  {t("Cancel")}
                </Button>
                <PrimaryButton
                  data-nobold
                  disabled={
                    confirmValue !== t("I know and confirm to give up") ||
                    !+lockTotal.replace(",", "")
                  }
                  fontSize="18px"
                  flex="1"
                  h="48px"
                  onClick={submit}
                >
                  {t("Confirm to give up")}
                  <RiArrowRightLine />
                </PrimaryButton>
              </Flex>
            </Flex>
          </Box>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default AbstainDialog;
