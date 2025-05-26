import { Box, Button, Center, Flex, Grid } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRef } from "react";
import { LuBell } from "react-icons/lu";
import clsx from "clsx";
import DialogBase from "~/components/ui/dialog";
import { useNavigate } from "@remix-run/react";
import { setMember } from "~/api/modules/auth";
import { useRequest } from "alova/client";
import useUserStore from "~/store/userStore";
import LoginButton from "~/components/ui/login-button";
import { PrimaryButton } from "~/components/ui/button";
import useMobile from "~/hooks/useMobile";
import { BiArrowBack } from "react-icons/bi";

export default function Identity() {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const dialogRef = useRef<any>(null);
  const navigator = useNavigate();

  const introduces = [
    {
      title: t("What is a person?"),
      icon: "/images/icons/introduce_1.svg",
      identity: "person",
      subtitle: t("Independent individual"),
      description: t(
        "POBVI (Proof of Behavior Value Incentive) is an innovative blockchain consensus mechanism used to identify the value of user behavior and incentivize the specified behavior value."
      ),
    },
    {
      title: t("What is organization?"),
      icon: "/images/icons/introduce_2.svg",
      identity: "organization",
      subtitle: t("Active organization"),
      description: t(
        "POBVI (Proof of Behavior Value Incentive) is an innovative blockchain consensus mechanism used to identify the value of user behavior and incentivize the specified behavior value."
      ),
    },
    {
      title: t("What is a project?"),
      icon: "/images/icons/introduce_3.svg",
      identity: "project",
      subtitle: t("Independent Project"),
      description: t(
        "POBVI (Proof of Behavior Value Incentive) is an innovative blockchain consensus mechanism used to identify the value of user behavior and incentivize the specified behavior value."
      ),
    },
  ];

  const {
    actions: { getUserInfo },
  } = useUserStore();

  const { send, loading, onSuccess } = useRequest(setMember, {
    immediate: false,
  });

  onSuccess(({ args }: any) => {
    getUserInfo();
    navigator(`/bvi/overview/${args[0].type}`);
  });

  const onConfirm = (identity: string) => {
    send({ type: identity });
  };

  return (
    <>
      <DialogBase
        ref={dialogRef}
        size={isMobile ? "full" : "md"}
        bg="white"
        title={t("Confirm your information")}
      >
        {({ identity }) => (
          <Flex direction="column">
            <Flex direction="column">
              <Flex
                data-nobold
                color="#FF0206"
                rounded="12px"
                bg="#FFF0F0"
                fontSize={{ base: "12px", md: "14px" }}
                fontWeight="400"
                alignItems="center"
                gap="10px"
                px="16px"
                py="7px"
                lineHeight="normal"
              >
                <LuBell className="text-[18px] min-w-[18px]" />
                {t(
                  "Please note that! The selected identity plan cannot be changed after confirmation. Please choose the appropriate plan type."
                )}
              </Flex>
              <Flex
                mt={{ base: "16px", md: "35px" }}
                px={{ base: "0", md: "14px" }}
                gap={{ base: "20px", md: "24px" }}
                direction={{ base: "column", md: "row" }}
              >
                <Flex
                  w={{ base: "full", md: "310px" }}
                  direction="column"
                  gap="20px"
                  fontSize="16px"
                  fontWeight="500"
                  lineHeight="normal"
                >
                  <Center w="full" h="165px" bg="#F1F1F1" rounded="15px">
                    <ReactSVG
                      src="/images/icons/confirm.svg"
                      className={clsx({
                        "[&_svg]:w-[140px]": isMobile,
                        "[&_svg]:h-[126px]": isMobile,
                      })}
                    />
                  </Center>
                  <Box>
                    {t("Do you need to see a more detailed plan introduction?")}
                  </Box>
                  <Flex color="#FF0206" alignItems="center" fontWeight="700">
                    {t("Please go here")}
                    <IoIosArrowRoundForward
                      className={clsx({
                        "text-[24px]": isMobile,
                        "text-[30px]": !isMobile,
                      })}
                    />
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  fontSize="18px"
                  fontWeight="500"
                  lineHeight="normal"
                >
                  <Box data-nobold>
                    {t("The identity plan you have chosen is:")}
                  </Box>
                  <Box
                    fontSize="20px"
                    fontWeight="700"
                    pt={{ base: "20px", md: "18px" }}
                    pb={{ base: "20px", md: "22px" }}
                  >
                    {t("Independent individual")}
                  </Box>
                  <Box
                    data-nobold
                    color="#404150"
                    pt={{ base: "16px", md: "0" }}
                    fontSize={{ base: "14px", md: "18px" }}
                  >
                    {t("You can obtain the following benefits:")}
                  </Box>
                  <Flex direction="column" gap="12px" pt="14px" data-nobold>
                    <Flex
                      alignItems="baseline"
                      color="#979797"
                      gap="8px"
                      fontSize={{ base: "12px", md: "15px" }}
                    >
                      <Center
                        as="span"
                        w="24px"
                        h="24px"
                        rounded="full"
                        bg="#C6C6C6"
                        color="white"
                      >
                        1
                      </Center>
                      <Box flex="1">{t("Fully-Backed Reserves")}</Box>
                    </Flex>
                    <Flex
                      alignItems="baseline"
                      color="#979797"
                      gap="8px"
                      fontSize={{ base: "12px", md: "15px" }}
                    >
                      <Center
                        as="span"
                        w="24px"
                        h="24px"
                        rounded="full"
                        bg="#C6C6C6"
                        color="white"
                      >
                        2
                      </Center>
                      <Box flex="1">1:1 {t("Fully-Backed Reserves")}</Box>
                    </Flex>
                    <Flex
                      alignItems="baseline"
                      color="#979797"
                      gap="8px"
                      fontSize={{ base: "12px", md: "15px" }}
                    >
                      <Center
                        as="span"
                        w="24px"
                        h="24px"
                        rounded="full"
                        bg="#C6C6C6"
                        color="white"
                      >
                        3
                      </Center>
                      <Box flex="1">
                        {t(
                          "One of the World's Leading Cryptocurrency Exchanges"
                        )}
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <LoginButton>
                <PrimaryButton
                  px="20px"
                  h="48px"
                  fontSize={{ base: "14px", md: "24px" }}
                  fontWeight="600"
                  w={{ base: "full", md: "410px" }}
                  mx="auto"
                  mt={{ base: "48px", md: "42px" }}
                  loading={loading}
                  rounded={{ base: "10px", md: "8px" }}
                  onClick={() => onConfirm(identity)}
                >
                  {t("Confirm selection")}
                </PrimaryButton>
              </LoginButton>
            </Flex>
          </Flex>
        )}
      </DialogBase>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          xl: "repeat(2, 1fr)",
          "2xl": "repeat(3, 1fr)",
        }}
        mt={{ base: "16px", md: "30px" }}
        gap="20px"
      >
        {introduces.map((item, index) => (
          <Flex
            key={index}
            data-nobold
            direction="column"
            w="full"
            px="20px"
            py={{ base: "20px", md: "30px" }}
            gap="8px"
            bg="white"
            rounded="12px"
            cursor="pointer"
            onClick={() => dialogRef.current?.open({ identity: item.identity })}
          >
            <Box
              fontSize={{ base: "20px", md: "42px" }}
              h={{ base: "29px", md: "73px" }}
              fontWeight="500"
              lineHeight="normal"
            >
              {item.title}
            </Box>

            <Flex
              justifyContent="space-between"
              alignItems="end"
              p={{ base: "14px 15px", md: "0" }}
            >
              <ReactSVG
                src={item.icon}
                className={clsx({
                  "[&_svg]:w-[130px]": isMobile,
                  "[&_svg]:h-[98px]": isMobile,
                })}
              />
              {!isMobile && <IoIosArrowRoundForward className="text-[40px]" />}
            </Flex>
            <Box
              fontSize={{ base: "16px", md: "28px" }}
              fontWeight="600"
              lineHeight="normal"
              pb="4px"
            >
              {item.subtitle}
            </Box>
            <Box
              fontSize={{ base: "12px", md: "18px" }}
              fontWeight="500"
              lineHeight="normal"
              color="#979797"
            >
              {item.description}
            </Box>
          </Flex>
        ))}
      </Grid>
    </>
  );
}
