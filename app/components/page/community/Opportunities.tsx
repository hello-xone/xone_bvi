import { Flex, Box, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Opportunities() {
  const { t } = useTranslation();
  return (
    <Flex
      direction={{ base: "column-reverse", md: "row" }}
      justifyContent="space-between"
      mt={{ base: "16px", md: "50px" }}
      gap={{ base: "4px", md: "64px" }}
      bg="#FFF7F6"
      rounded="12px"
      px={{ base: "anto", md: "89px 112px" }}
      py={{ base: "19px", md: "0" }}
    >
      <Flex
        direction="column"
        pt={{ base: "0", md: "60px" }}
        px={{ base: "24px", md: "0" }}
        data-nobold
      >
        <Box
          fontSize={{ base: "24px", md: "56px" }}
          color="#000"
          fontWeight="600"
          lineHeight="normal"
        >
          {t("Xone employment opportunities")}
        </Box>
        <Box
          data-nobold
          fontSize={{ base: "16px", md: "20px" }}
          fontWeight="600"
          lineHeight="normal"
          color="#404150"
          mt={{ base: "20px", md: "30px" }}
        >
          {t(
            "Explore career opportunities in a decentralized world, immerse yourself in the forefront of technological change, and become an innovative pioneer in the Web3 era"
          )}
        </Box>
      </Flex>
      <Flex
        w={{ base: "full", md: "auto" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <Image
          w={{ base: "200px", md: "auto" }}
          h={{ base: "106px", md: "275px" }}
          src="/images/community/op.png"
        />
      </Flex>
    </Flex>
  );
}
