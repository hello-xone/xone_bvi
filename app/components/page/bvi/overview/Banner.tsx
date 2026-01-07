import { Box, Flex, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";
import clsx from "clsx";
import CountDown from "./CountDown";
import { SeasonData } from "~/routes/($lang).bvi.overview";
import useMobile from "~/hooks/useMobile";

type Props = {
  data: SeasonData;
};

export default function Banner(props: Props) {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const { running, end_time } = props.data;

  return (
    <Flex direction="column">
      <Box pos="relative" overflow="hidden">
        <Image
          rounded={{ base: 0, md: "20px" }}
          w="full"
          h={{ "2xl": "529px", md: "400px" }}
          src={`/images/bvi/banner${isMobile ? "_h5" : ""}.png`}
        />
        {isMobile && (
          <Box pos="absolute" top="48px" right="38px">
            <ReactSVG src="/images/icons/overview_star.svg" />
          </Box>
        )}

        <Flex
          pos="absolute"
          w="full"
          direction="column"
          top="0"
          zIndex="2"
          color="white"
          px={{ base: "38px", md: "60px", "2xl": "180px" }}
          py={{ base: "48px", md: "40px", "2xl": "90px" }}
        >
          <Box
            fontSize={{
              base: "24px",
              md: "40px",
              xl: "56px",
            }}
            color="#FBFCFF"
            fontWeight="700"
            lineHeight="1"
          >
            {t("Join the BVI program and reap your own value")}
          </Box>
          <Box
            data-nobold
            fontSize={{
              base: "9px",
              md: "14px",
              xl: "18px",
            }}
            color="#FBFCFF"
            fontWeight={{ base: "300", md: "700" }}
            lineHeight="normal"
            my={{ base: "12px 20px", md: "20px 40px" }}
            textShadow="xl"
          >
            {t(
              "POBVI (Proof of Behavior Value Incentive) is an innovative blockchain consensus mechanism used to identify the value of user behavior and incentivize the specified behavior value. POBVI verifies the on-chain behavior of participants to determine who will receive the reward, thereby ensuring the integrity and fairness of the on-chain incentive system."
            )}
          </Box>
          <Flex
            alignItems="center"
            gap="4px"
            fontSize="14px"
            fontWeight="600"
            lineHeight="100%"
          >
            <ReactSVG
              src="/images/icons/hot.svg"
              className={clsx({
                "[&_svg]:w-[17px]": isMobile,
              })}
            />
            {t("Remaining at the end of the season")}
          </Flex>
          {running && <CountDown endTime={end_time * 1000} />}
        </Flex>
      </Box>
    </Flex>
  );
}
