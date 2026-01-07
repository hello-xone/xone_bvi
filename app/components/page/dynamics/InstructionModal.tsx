import { Box, Button, Flex, Image, Dialog, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "~/components/ui/button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const InstructionDialog = (props: Props) => {
  const { t } = useTranslation();
  const { isOpen, onClose } = props;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    isOpen && setActiveStep(0);
  }, [isOpen]);

  const handleNext = () => {
    setActiveStep((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleClose = () => {
    onClose();
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Flex
            direction="column"
            gap="14px"
            pb={{ base: 0, md: "30px" }}
            lineHeight="24px"
          >
            <Text
              data-nobold
              fontSize={{ base: "14px", md: "16px" }}
              fontWeight={{ base: 600, md: 800 }}
              lineHeight={{ base: "normal", md: "inherit" }}
            >
              {t(
                "Welcome to the XOC Release page! This guide will help you quickly understand why you need to release your XOC and how to complete the release to ensure your operation goes smoothly."
              )}
            </Text>
            <Text
              fontSize={{ base: "12px", md: "16px" }}
              fontWeight="800"
              color="#FF0206"
              lineHeight="normal"
            >
              1. {t("Why Release XOC?")}
            </Text>
            <Text
              data-nobold
              fontSize={{ base: "12px", md: "14px" }}
              fontWeight="500"
              color="#404150"
            >
              {t(
                "XOC is the native token of the Xone public chain, and WXOC (Wrapped XOC) is a mapping token used for Xone Testnet interaction. In order to use XOC on the Xone Mainnet, you need to convert WXOC to XOC, a process called unwrap."
              )}
            </Text>
            <Text
              fontSize={{ base: "12px", md: "16px" }}
              fontWeight="800"
              color="#FF0206"
              lineHeight="normal"
            >
              2. {t("How to Release XOC?")}
            </Text>
            <Text
              data-nobold
              fontSize={{ base: "12px", md: "14px" }}
              fontWeight="500"
              color="#404150"
            >
              {t(
                "Get your tokens unlocked fast by learning what to do in this guide! Ready to start unlocking XOC?"
              )}
            </Text>
            <Flex
              alignItems="center"
              justifyContent="center"
              gap={{ base: "26px", md: "44px" }}
              pt={{ base: 0, md: "28px" }}
              flexDir={{ base: "column", md: "row" }}
            >
              <Flex
                flexDirection="column"
                alignItems="center"
                w={{ base: "100%", md: "310px" }}
              >
                <Box
                  w={{ base: "100%", lg: "310px" }}
                  h={{ base: "100%", lg: "165px" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb="14px"
                >
                  <Image src="/images/dynamics/instruction/close.png" />
                </Box>
                <Button
                  data-nobold
                  variant="ghost"
                  fontSize="16px"
                  fontWeight="500"
                  w={{ base: "100%", md: "auto" }}
                  textWrap="wrap"
                  onClick={handleClose}
                >
                  {t(
                    "I have understood and know how to perform the release operation"
                  )}
                  <RiArrowRightLine />
                </Button>
              </Flex>
              <Flex
                flexDirection="column"
                alignItems="center"
                w={{ base: "100%", md: "310px" }}
              >
                <Box
                  w={{ base: "100%", md: "310px" }}
                  h={{ base: "100%", md: "165px" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb="14px"
                >
                  <Image src="/images/dynamics/instruction/check.png" />
                </Box>
                <Button
                  data-nobold
                  variant="ghost"
                  fontSize="16px"
                  textWrap="wrap"
                  fontWeight="500"
                  w={{ base: "100%", md: "auto" }}
                  onClick={handleNext}
                >
                  {t("I need to see how to release XOC")}
                  <RiArrowRightLine />
                </Button>
              </Flex>
            </Flex>
          </Flex>
        );
      case 1:
        return (
          <Flex flexDir="column">
            <Box>
              <Image src="/images/dynamics/instruction/step_1.png" />
              <Text
                mt={{ base: "20px", md: "40px" }}
                fontSize={{ base: "16px", md: "20px" }}
                fontWeight="700"
              >
                {t("Step 1")}
              </Text>
              <Text
                data-nobold
                mt={{ base: "10px", md: "20px" }}
                fontSize={{ base: "12px", md: "16px" }}
                fontWeight="500"
                color="#404150"
              >
                {t(
                  "Verify that the connected wallet address has sufficient funds to pay transaction fees for interacting with the Xone testnet. Also, check if the wallet holds WXOC tokens."
                )}
              </Text>
            </Box>
            <PrimaryButton
              data-nobold
              my={{ base: "60px", md: "40px" }}
              mb={{ base: 0, md: "40px" }}
              mx="auto"
              fontSize={{ base: "14px", md: "24px" }}
              fontWeight="600"
              color="white"
              w={{ base: "100%", md: "410px" }}
              h="48px"
              onClick={handleNext}
            >
              {t("Next step")}
              <RiArrowRightLine />
            </PrimaryButton>
          </Flex>
        );
      case 2:
        return (
          <Box>
            <Box>
              <Image src="/images/dynamics/instruction/step_2.png" />
              <Text
                mt={{ base: "20px", md: "40px" }}
                fontSize={{ base: "16px", md: "20px" }}
                fontWeight="700"
              >
                {t("Step 2")}
              </Text>
              <Text
                mt={{ base: "10px", md: "20px" }}
                fontSize={{ base: "12px", md: "16px" }}
                fontWeight="500"
                color="#404150"
              >
                {t(
                  "Transfer WXOC tokens from the connected wallet to the designated contract address on the Xone test network. Waiting for confirmation of transaction data."
                )}
              </Text>
            </Box>
            <Flex
              alignItems="center"
              justifyContent="center"
              gap="20px"
              my={{ base: "60px", md: "40px" }}
              mb={{ base: 0, md: "40px" }}
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
                onClick={handlePrev}
              >
                {t("Previous")}
              </Button>
              <PrimaryButton
                data-nobold
                fontSize="18px"
                flex="1"
                h="48px"
                onClick={handleNext}
              >
                {t("Next step")}
                <RiArrowRightLine />
              </PrimaryButton>
            </Flex>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Box>
              <Image src="/images/dynamics/instruction/step_3.png" />
              <Text
                mt={{ base: "20px", md: "40px" }}
                fontSize={{ base: "16px", md: "20px" }}
                fontWeight="700"
              >
                {t("Step 3")}
              </Text>
              <Text
                data-nobold
                mt={{ base: "10px", md: "20px" }}
                fontSize={{ base: "12px", md: "16px" }}
                fontWeight="500"
                color="#404150"
              >
                {t(
                  "Once the WXOC token is successfully sent to the specified contract address and the transaction data is confirmed, Xone will automatically send the same amount of XOC to the address you used to interact with the contract. After that, switch the wallet network to the Xone mainnet and verify that the token has been received."
                )}
              </Text>
            </Box>
            <Flex
              alignItems="center"
              justifyContent="center"
              gap="20px"
              my={{ base: "60px", md: "40px" }}
              mb={{ base: 0, md: "40px" }}
            >
              <PrimaryButton
                data-nobold
                fontSize="18px"
                flex="1"
                h="48px"
                onClick={handlePrev}
              >
                {t("Previous")}
              </PrimaryButton>
              <Button
                data-nobold
                variant="ghost"
                rounded="12px"
                fontSize="18px"
                border="1.5px solid #FF0206"
                flex="1"
                h="48px"
                color="#FF0206"
                onClick={() => {
                  const section = document.getElementById("need-release-section");
                  if (section) {
                    const offset = section.offsetTop - 40;
                    window.scrollTo({
                      top: offset,
                      behavior: "smooth",
                    });
                  }
                  handleClose();
                }}
              >
                {t("Go to release")}
              </Button>
            </Flex>
          </Box>
        );
      default:
        return null;
    }
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
              {t("Operation Guide")}
            </Box>
            {activeStep === 3 ? (
              <IoIosClose
                size="35px"
                color="#404150"
                cursor="pointer"
                onClick={handleClose}
              />
            ) : (
              <Button
                data-nobold
                variant="outline"
                w="max-content"
                h="25px"
                px="20px"
                rounded="full"
                fontSize="13px"
                fontWeight="500"
                border="1px solid #000"
                onClick={handleClose}
              >
                {t("Skip")}
              </Button>
            )}
          </Flex>
          <Box pb={{ base: "24px", md: "0" }}>
            {renderStepContent(activeStep)}
          </Box>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default InstructionDialog;
