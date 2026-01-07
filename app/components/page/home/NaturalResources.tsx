import { Box, Flex, Show } from "@chakra-ui/react";
import { ReactSVG } from "react-svg";
import { useTranslation } from "react-i18next";

export default function NaturalResources() {
  const { t } = useTranslation();
  const resources = [
    {
      icon: "/images/icons/resources_1.svg",
      title: t("Xone Guide"),
      link: "https://docs.xone.org/study/xone",
      description: t(
        "Understand what Xone is, explore, learn, and master its infinite possibilities"
      ),
    },
    {
      icon: "/images/icons/resources_2.svg",
      title: t("Xone Build"),
      link: "https://docs.xone.org/developers/ready",
      description: t(
        "Learn how to build DApps on Xone and unlock the future of Web3"
      ),
    },
    {
      icon: "/images/icons/resources_3.svg",
      title: t("Xone Blog"),
      link: "https://docs.xone.org/blog",
      description: t(
        "Read Xone's research report on the future of Web3 and learn about Xone's next steps"
      ),
    },
  ];

  return (
    <Flex flex="1" direction="column">
      <Flex direction="column" px="20px">
        <Box as="h1" fontSize={{ base: "20px", md: "42px" }} fontWeight="700">
          {t("Natural Resources")}
        </Box>
        <Box
          py={{ base: "10px", md: "30px" }}
          pb="20px"
          h="108px"
          lineClamp="2"
          overflow="hidden"
          fontSize={{ base: "14px", md: "16px" }}
          fontWeight="700"
          color="#404150"
        >
          {t(
            "Mastering key resources of Xone, obtaining technical support, development tools, and opportunities for community collaboration, and embarking on a journey of blockchain innovation"
          )}
        </Box>
      </Flex>
      <Flex
        direction="column"
        py={{ base: "16px", md: "30px" }}
        px={{ base: "15px", md: "40px" }}
        gap="30px"
        rounded="12px"
        bg="white"
      >
        {resources.map((resource, index) => (
          <a key={index} href={resource.link} target="_blank">
            <Flex
              pos="relative"
              flexDir={{ base: "column", md: "row" }}
              px="39px"
              pr={{ base: "10px", md: "39px" }}
              pt="29px"
              pb="28px"
              bg="#F8F8F8"
              rounded="12px"
              border="1px solid #F8F8F8"
              transition="all 0.2s ease-in-out"
              mb="1px"
              _hover={
                resource.link
                  ? { borderColor: "#FF0206", mt: "1px", mb: 0 }
                  : {}
              }
            >
              <ReactSVG src={resource.icon} />

              <Show when={!resource.link}>
                <Box
                  pos="absolute"
                  top="10px"
                  right="8px"
                  fontSize="13px"
                  fontWeight="500"
                  color="#919399"
                  rounded="4px"
                  bg="#F2F4F8"
                  w="max-content"
                  py="3px"
                  px="8px"
                >
                  {t("Under construction")}
                </Box>
              </Show>
              <Flex direction="column" justifyContent="center" gap="5px">
                <Box
                  as="h3"
                  fontSize="28px"
                  fontWeight="800"
                  pt={{ base: "30px", md: 0 }}
                  lineHeight={{ base: "normal", md: 1 }}
                >
                  {resource.title}
                </Box>
                <Box fontSize="16px" fontWeight="500" color="#5F6066">
                  {resource.description}
                </Box>
              </Flex>
            </Flex>
          </a>
        ))}
      </Flex>
    </Flex>
  );
}
