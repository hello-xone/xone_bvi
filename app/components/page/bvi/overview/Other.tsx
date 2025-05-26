import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";

export default function Other() {
  const { t } = useTranslation();
  const resources = [
    {
      title: "Xone faucet",
    },
    {
      title: "GetBlock",
    },
    {
      title: "Java SDK",
    },
    {
      title: "Hardhat",
    },
    {
      title: "Remix",
    },
    {
      title: "Triton One",
    },
  ];

  return (
    <Flex flex="1" direction="column">
      <Box
        as="h1"
        px={{ base: 0, md: "20px" }}
        pb={{ base: "20px", md: "30px" }}
        fontSize={{ base: "20px", md: "42px" }}
        fontWeight="700"
        lineHeight="normal"
      >
        {t("Other")}
      </Box>
      <Grid
        py={{ base: "20px", md: "30px" }}
        px={{ base: "16px", md: "28px" }}
        templateColumns={{ md: "repeat(2, 1fr)", sm: "repeat(1, 1fr)" }}
        templateRows="repeat(3, 1fr)"
        gapX="20px"
        gapY={{ base: "20px", md: "30px" }}
        rounded="12px"
        bg="white"
      >
        {resources.map((resource, index) => (
          <GridItem
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={{ base: "20px 30px 20px 20px", md: "30px" }}
            gap="5px"
            rounded="12px"
            border={{ base: "1px solid #C6C6C6", md: "1px solid #F2F4F8" }}
            h={{ base: "auto", md: "122px" }}
          >
            <Box
              as="h3"
              fontSize={{ base: "16px", md: "24px" }}
              fontWeight="800"
            >
              {resource.title}
            </Box>
            <ReactSVG src="/images/icons/jump.svg" />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}
