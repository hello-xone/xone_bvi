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
          h={{ base: "496px", md: "500px" }}
          w="full"
          fit="cover"
          src={`/images/community/banner${isMobile ? "_h5" : ""}.png`}
        />
        <Flex
          pos="absolute"
          w="full"
          direction="column"
          top="0"
          zIndex="2"
          color="white"
          px={{ base: "30px", md: "80px 45%" }}
          pt={{ base: "57px", md: "127px" }}
          textAlign="left"
        >
          <Box
            fontSize={{ base: "32px", md: "72px" }}
            color="#FF0206"
            fontWeight="700"
            lineHeight="normal"
          >
            {t("Global community")}
          </Box>
          <Box
            data-nobold
            fontSize={{ base: "16px", md: "32px" }}
            fontWeight="500"
            lineHeight="normal"
            mt={{ base: "20px", md: "42px" }}
          >
            {t(
              "Bringing together Xone's global developers, token holders, validators, and all supporters, working together towards a common ideal"
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
