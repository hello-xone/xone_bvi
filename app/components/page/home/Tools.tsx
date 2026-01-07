import { Box, Flex, Grid, GridItem, Wrap } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ExternalLink from "~/components/ui/external-link";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Link } from "@remix-run/react";

export default function Tools() {
  const { t } = useTranslation();
  const resources = [
    {
      title: "Xone Faucet",
      description:
        "The official testnet faucet of the Xone Chain, providing developers and users with free test tokens.",
      tags: ["Faucet"],
      link: "https://faucet.xone.org/en",
    },
    {
      title: "Xone Scan",
      description:
        "Xone Chain block browser, quickly view and analyze Xone related data.",
      tags: ["Explorer"],
      link: "https://xonescan.com/",
    },
    {
      title: "RainLink",
      description:
        "Omni-Chain Interoperability Layer: Connecting multiple blockchains, powering secure cross-chain liquidity for assets and messages.",
      tags: ["Bridges"],
      link: "https://rainlink.co/",
    },
    {
      title: "Web3.js",
      description: "Access full node capabilities without running your own.",
      tags: ["Front-End"],
      link: "https://web3js.org/",
    },
    {
      title: "Java Web3",
      description:
        "Lightweight Java and Android library for integration with Ethereum clients.",
      tags: ["Back-End"],
      link: "https://github.com/LFDT-web3j/web3j",
    },
    {
      title: "Remix",
      description:
        "Remix IDE allows developing, deploying and administering smart contracts for Ethereum like blockchains.",
      tags: ["IDE"],
      link: "https://remix.ethereum.org/",
    },
  ];

  return (
    <Flex flex="1" direction="column">
      <Flex direction="column" px="20px">
        <Box as="h1" fontSize={{ base: "20px", md: "42px" }} fontWeight="700">
          {t("Tools And Infrastructure")}
        </Box>
        <Box
          py={{ base: "10px", md: "30px" }}
          pb="20px"
          h="108px"
          lineClamp="2"
          fontSize={{ base: "14px", md: "16px" }}
          fontWeight="700"
          color="#404150"
        >
          {t(
            "Get Xone build related development tools and suites to help you or your team quickly and efficiently accept Xone."
          )}
          <Link to="/ecology" className="pl-[5px]">
            {t("See More")}
            <MdOutlineKeyboardArrowRight
              color="#404150"
              size="24px"
              className="inline-block"
            />
          </Link>
        </Box>
      </Flex>

      <Grid
        py={{ base: "16px", md: "30px" }}
        px={{ base: "15px", md: "24px" }}
        templateColumns={{ md: "repeat(2, 1fr)", sm: "repeat(1, 1fr)" }}
        templateRows="repeat(3, 1fr)"
        gap={{ base: "20px", md: "29px" }}
        rounded="12px"
        bg="white"
      >
        {resources.map((resource, index) => (
          <a key={index} href={resource.link} target="_blank">
            <GridItem
              key={index}
              display="flex"
              flexDir="column"
              p="20px"
              gap="5px"
              rounded="12px"
              border="1px solid #F2F4F8"
              h="162px"
              cursor="pointer"
              mb="1px"
              transition="all 0.2s ease-in-out"
              _hover={
                resource.link
                  ? { borderColor: "#FF0206", mt: "1px", mb: 0 }
                  : {}
              }
            >
              <Box
                as="h3"
                fontSize={{ base: "16px", md: "24px" }}
                fontWeight="800"
              >
                {resource.title}
              </Box>
              <Box
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight="500"
                color="#5F6066"
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {resource.description}
              </Box>
              <Wrap gap="10px" mt="auto">
                {resource.tags.map((tag, index) => (
                  <Box
                    key={index}
                    fontSize="13px"
                    fontWeight="500"
                    color="#919399"
                    rounded="4px"
                    bg="#F2F4F8"
                    w="max-content"
                    py="3px"
                    px="8px"
                  >
                    {tag}
                  </Box>
                ))}
              </Wrap>
            </GridItem>
          </a>
        ))}
      </Grid>
    </Flex>
  );
}
