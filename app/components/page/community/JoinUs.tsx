import { Flex, Box, Image, Center } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ExternalLink from "~/components/ui/external-link";
export default function JoinUs() {
  const { t } = useTranslation();
  const list = [
    {
      title: t("Bounty Hunter"),
      img: "/images/community/hunter.png",
      desc: t(
        "Work together with us to maintain the security of the Xone Chain ecosystem."
      ),
      link: "https://docs.xone.org/study/bug",
    },
    {
      title: t("Participate in document contributions"),
      img: "/images/community/participate.png",
      desc: t("Help Xone build a brighter future in another way."),
      link: "https://docs.xone.org/study/contribut",
    },
  ];
  return (
    <Flex
      direction="column"
      gap={{ base: "18px", md: "30px" }}
      mt={{ base: "16px", md: "50px" }}
      mb={{ base: "73px", md: "32px" }}
      data-nobold
    >
      <Flex as="h1" fontSize={{ base: "18px", md: "48px" }} justifyContent={{  base: "flex-start", md: "center" }} fontWeight="600">
        {t("Join us together")}
      </Flex>
      <Flex direction={{ base: "column", md: "row" }} gap="20px">
        {list.map((item, index) => (
          <ExternalLink to={item.link} flex={1} hasIcon={false} key={index}>
            <Box
              flex={1}
              p={{  base: "16px", md: "31px 45px" }}
              bg="#FFF"
              rounded={{ base: "12px", md: "28px" }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={{ base: "10px", md: "29px" }}
              color="#000"
            >
              <Flex flexDirection="column" gap="10px" p="10px">
                <Box
                  fontSize={{ base: "18px", md: "36px" }}
                  fontWeight="600"
                  lineHeight="normal"
                  minH={{ base: "31px", md: "191px" }}
                >
                  {item.title}
                </Box>
                <Box
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight="600"
                  minH={{ base: "51px", md: "48px" }}
                >
                  {item.desc}
                </Box>
              </Flex>

              <Image src={item.img} h={{ base: "98px", md: "268px" }} />
            </Box>
          </ExternalLink>
        ))}
      </Flex>
    </Flex>
  );
}
