import { Flex, Box } from "@chakra-ui/react";
import { ReactSVG } from "react-svg";
import { useTranslation } from "react-i18next";
import ExternalLink from "~/components/ui/external-link";
import { EXTERNAL_LINKS } from "~/utils/external";
import useMobile from "~/hooks/useMobile";
import Grid from "~/components/ui/grid";

export default function Engineering() {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const list = [
    {
      title: "Discord",
      icon: "/images/icons/discord_blue.svg",
      link: EXTERNAL_LINKS.Discord,
    },
    {
      title: "GitHub",
      icon: "/images/icons/github_black.svg",
      tag: "website",
      link: "https://github.com/hello-xone/xone_website",
    },
    {
      title: "GitHub",
      icon: "/images/icons/github_black.svg",
      tag: "faucet",
      link: "https://github.com/hello-xone/xone_faucet",
    },
    {
      title: "GitHub",
      icon: "/images/icons/github_black.svg",
      tag: "Block Browser",
      link: "https://github.com/hello-xone/xone_explorer",
    },
    {
      title: "GitHub",
      icon: "/images/icons/github_black.svg",
      tag: "xone chain",
      link: "https://github.com/hello-xone/xone_chain",
    },
  ];
  return (
    <Flex direction="column" mt={{ base: "16px", md: "30px" }} data-nobold>
      <Box
        as="h1"
        fontSize={{ base: "18px", md: "36px" }}
        fontWeight="600"
        pl={{ base: "0", md: "18px" }}
      >
        {t("Engineering")}
      </Box>
      <Box
        fontSize={{ base: "14px", md: "24px" }}
        color="#404150"
        lineHeight="normal"
        mt={{ base: "20px", md: "24px" }}
        pl={{ base: "0", md: "18px" }}
      >
        {t(
          "Gain a deep understanding of Xone's technical architecture and development progress, and explore the underlying innovation and engineering practices of blockchain."
        )}
      </Box>
      <Grid
        w={{ base: "full", md: "300px" }}
        gap={{ base: "16px", md: "20px" }}
        mt={{ base: "16px", md: "30px" }}
      >
        {list.map((item, index) => (
          <ExternalLink to={item.link} flex={1} hasIcon={false} key={index}>
            <Box
              key={index}
              flex={1}
              position="relative"
              px="20px"
              py="16px"
              bg="#FFF"
              rounded="12px"
              display="flex"
              alignItems="center"
              gap="12px"
              h={{ base: "auto", md: "114px" }}
            >
              <ReactSVG
                src={item.icon}
                beforeInjection={(svg) => {
                  svg.setAttribute("width", isMobile ? "24px" : "36px");
                  svg.setAttribute("height", isMobile ? "24px" : "36px");
                }}
              />
              <Box fontSize={{ base: "16px", md: "24px" }} fontWeight="500">
                {item.title}
              </Box>
              {item.tag && (
                <Box
                  bg="#FFF0F0"
                  position="absolute"
                  top="8px"
                  right="8px"
                  color="#404150"
                  fontWeight="600"
                  fontSize="12px"
                  rounded="8px"
                  lineHeight="normal"
                  p={{ base: "2px 11px", md: "3px 16px" }}
                  textTransform="capitalize"
                >
                  {item.tag}
                </Box>
              )}
            </Box>
          </ExternalLink>
        ))}
      </Grid>
    </Flex>
  );
}
