import { Flex, Box, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Grid from "~/components/ui/grid";
import useMobile from "~/hooks/useMobile";
export default function Collaboration() {
  const { t } = useTranslation();
  const list = [
    {
      title: "hello@xone.org",
      icon: "/images/community/hello.png",
      desc: t("Explore the future with Xone"),
    },
    {
      title: "support@xone.org",
      icon: "/images/community/support.png",
      desc: t("Get help and support for Xone"),
    },
    {
      title: "business@xone.org",
      icon: "/images/community/business.png",
      desc: t("Looking for opportunities to collaborate with Xone"),
    },
    {
      title: "developers@xone.org",
      icon: "/images/community/developers.png",
      desc: t("Build a better Xone together"),
    },
    {
      title: "community@xone.org",
      icon: "/images/community/community.png",
      desc: t("Promote Xone with community members"),
    },
  ];
  return (
    <Flex
      direction="column"
      gap={{ base: "20px", md: "30px" }}
      mt={{ base: "16px", md: "30px" }}
      data-nobold
    >
      <Box
        as="h1"
        fontSize={{ base: "18px", md: "36px" }}
        fontWeight="600"
        pl={{ base: "0", md: "18px" }}
      >
        {t("Collaboration and Support")}
      </Box>
      <Box
        color="#404150"
        lineHeight="normal"
        pl={{ base: "0", md: "18px" }}
        fontSize={{ base: "14px", md: "24px" }}
      >
        {t(
          "Discover opportunities for collaboration, work side by side with the Xone team, build a blockchain ecosystem, and enjoy technological and resource support."
        )}
      </Box>
      <Grid
        w={{ base: "full", md: "300px" }}
        gap={{ base: "16px", md: "20px" }}
      >
        {list.map((item, index) => (
          <a href={`mailto:${item.title}`} style={{ flex: 1 }} key={index}>
            <Box
              flex={1}
              position="relative"
              p={{ base: "16px 20px", md: "16px 14px" }}
              bg="#FFF"
              rounded="12px"
              display="flex"
              alignItems="center"
              justifyContent={{ base: "center", md: "flex-start" }}
              gap="12px"
              h={{ base: "auto", md: "120px" }}
            >
              <Image src={item.icon} boxSize={{ base: "36px", md: "60px" }} />
              <Flex direction="column" gap="12px">
                <Text
                  fontSize={{ base: "16px", md: "20px" }}
                  fontWeight="600"
                  color="#000"
                >
                  {item.title}
                </Text>
                <Box
                  fontSize={{ base: "14px", md: "16px" }}
                  w={{ base: "201px", md: "auto" }}
                  color="#979797"
                  lineHeight="normal"
                >
                  {item.desc}
                </Box>
              </Flex>
            </Box>
          </a>
        ))}
      </Grid>
    </Flex>
  );
}
