import { Flex, Box, Image, Button } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useTranslation } from "react-i18next";
import ExternalLink from "~/components/ui/external-link";
export default function Learns() {
  const { t } = useTranslation();
  const list = [
    {
      title: t("Learn Xone"),
      img: "/images/developer/learn/learnXone.png",
      desc: t(
        "Refer to the official documentation for basic building knowledge"
      ),
      link: "https://docs.xone.org/developers/guide",
    },
    {
      title: t("Code Example"),
      img: "/images/developer/learn/codeExample.png",
      desc: t(
        "Quickly get started building using code examples provided by Xone developers"
      ),
      link: "https://docs.xone.org/developers/guide",
    },
  ];
  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      gap="20px"
      mt={{ base: "4px", md: "30px" }}
      data-nobold
    >
      {list.map((item, index) => (
        <Box
          key={index}
          flex={1}
          p="20px"
          bg="#FFF"
          rounded="12px"
          color="#000"
          cursor="pointer"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Box
              fontSize={{ base: "18px", md: "32px" }}
              fontWeight="800"
              lineHeight="normal"
            >
              {item.title}
            </Box>
            <Flex
              fontSize={{ base: "12px", md: "20px" }}
              fontWeight="400"
              color="#979797"
              _hover={{
                transform: "translateY(1px)",
                transition: "transform 0.2s ease",
              }}
            >
              <ExternalLink to={item.link} hasIcon={false}>
                {t("See More")}
                <MdKeyboardArrowRight className="scale-125" />
              </ExternalLink>
            </Flex>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" mt="12px">
            <Box
              fontSize={{ base: "14px", md: "20px" }}
              fontWeight="400"
              color="rgba(0, 0, 0, 0.60)"
              lineHeight="150%"
              maxW="501px"
            >
              {item.desc}
            </Box>
            <Image src={item.img} h={{ base: "80px", md: "120px" }} />
          </Flex>
        </Box>
      ))}
    </Flex>
  );
}
