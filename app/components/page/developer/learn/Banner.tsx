import { Flex, Box, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import useMobile from "~/hooks/useMobile";

export default function Banner() {
  const { t } = useTranslation();

  const isMobile = useMobile();

  return (
    <Flex direction="column">
      <Box pos="relative" overflow="hidden">
        <Image
          rounded={{ base: 0, md: "20px" }}
          h={{ base: "402px", md: "500px" }}
          w="full"
          fit="cover"
          src={`/images/developer/learn/banner${isMobile ? "_h5" : ""}.png`}
        />
        <Flex
          pos="absolute"
          w="full"
          h="full"
          top="0"
          left="0"
          zIndex="2"
          alignItems={{ base: "flex-start", md: "center" }}
          pl={{ base: 0, md: "80px" }}
          pt={{ base: "136px", md: 0 }}
        >
          <Box
            fontSize={{ base: "24px", md: "72px" }}
            mx={{ base: "auto", md: 0 }}
            color="#FAF9F9"
            fontWeight="700"
            lineHeight="normal"
          >
            {t("Xone Developer Resources")}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
