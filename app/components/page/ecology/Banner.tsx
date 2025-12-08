import { Flex, Box, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import useMobile from "~/hooks/useMobile";

export default function Banner() {
  const { t } = useTranslation();
  const isMobile = useMobile();
  return (
    <Flex direction="column" className="max-w-full">
      <Box pos="relative" overflow="hidden">
        <Image
          rounded={{ base: 0, md: "20px" }}
          h={{ base: "489px", md: "386px" }}
          w="full"
          fit="cover"
          src={`/images/ecology/banner${isMobile ? "_h5" : ""}.png`}
        />
        <Flex
          data-nobold
          h="full"
          pos="absolute"
          w="full"
          direction="column"
          top="0"
          zIndex="2"
          color="white"
          justifyContent={{ base: "flex-start", md: "center" }}
          pl={{ base: "22px", md: "110px" }}
          pr={{ base: "22px", md: "620px" }}
          pt={{ base: "41px", md: 0 }}
        >
          <Box
            fontSize={{ base: "32px", md: "42px" }}
            color="#FF0206"
            fontWeight="700"
            lineHeight="normal"
          >
            {t("Discover DApps in the Xone Chain ecosystem")}
          </Box>
          <Box
            fontSize={{ base: "16px", md: "24px" }}
            fontWeight="500"
            mt={{ base: "23px", md: "30px" }}
            lineHeight="normal"
          >
            {t("A top-level DApp built on the Xone Chain ecosystem, exploring infinite possibilities and driving cutting-edge innovation.")}
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}