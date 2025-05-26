import { Flex, Box, Grid } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ArrowIcon } from "~/components/icon";

export default function OpenRoles() {
  const { t } = useTranslation();
  const list = [
    {
      title: t("What is an Xone Chain account?"),
      href: "https://docs.xone.org/developers/architecture/account",
    },
    {
      title: t("How to trade Xone Chain?"),
      href: "https://docs.xone.org/developers/architecture/transaction",
    },
    {
      title: t("What is EVM?"),
      href: "https://ethereum.org/en/developers/docs/evm/",
    },
    {
      title: t("What is a block?"),
      href: "https://docs.xone.org/study/block",
    },
    {
      title: t("What is Xone's replay protection"),
      href: "https://docs.xone.org/developers/architecture/replay",
    },
    {
      title: t("What is the Xone Chain module?"),
      href: "https://docs.xone.org/study/modules",
    },
    {
      title: t("Nodes of Xone Chain"),
      href: "https://docs.xone.org/study/nodes",
    },
    {
      title: t("Attempt to build the first ERC-20 token"),
      href: "https://docs.xone.org/developers/standard/erc20",
    },
  ];
  return (
    <Flex
      direction="column"
      gap={{ base: "30px", md: "45px" }}
      mt={{ base: "20px", md: "30px" }}
      data-nobold
    >
      <Box as="h1" fontSize={{ base: "24px", md: "32px" }} fontWeight="600">
        {t("Open roles in our network")}
      </Box>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        templateRows="repeat(2, 1fr)"
        gap="20px"
      >
        {list.map((item) => (
          <a href={item?.href} target="_blank">
            <Box
              cursor="pointer"
              px="30px"
              py="10px"
              rounded="12px"
              bg="#FFF"
              h="100px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box color="#000" fontWeight="700" fontSize="16px">
                {item.title}
              </Box>
              <Box w="24px">
                <ArrowIcon className="[&>svg]:fill-black" />
              </Box>
            </Box>
          </a>
        ))}
      </Grid>
    </Flex>
  );
}
