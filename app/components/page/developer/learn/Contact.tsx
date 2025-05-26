import { Flex, Box, Grid } from "@chakra-ui/react";
import { ReactSVG } from "react-svg";
import { useTranslation } from "react-i18next";
import { EXTERNAL_LINKS } from "~/utils/external";
import clsx from "clsx";
import useMobile from "~/hooks/useMobile";

export default function ContactUs() {
  const { t } = useTranslation();

  const isMobile = useMobile();

  const list = [
    {
      title: "Telegram",
      icon: "/images/icons/telegram_11.svg",
      tag: "developer",
      link: "https://t.me/Xone_Developers",
    },
    {
      title: "Discord",
      icon: "/images/icons/youtube.svg",
      link: EXTERNAL_LINKS.Discord,
    },
    {
      title: "developers@xone.org",
      icon: "/images/icons/telegram_2.svg",
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
        {t("Contact us for assistance")}
      </Box>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap="20px"
        mb="57px"
      >
        {list.map((item) => (
          <a
            key={item.link}
            href={item.link ? item.link : `mailto:${item.title}`}
            target={item.link ? "_blank" : "_self"}
          >
            <Box
              px="30px"
              py="16px"
              rounded="12px"
              bg="#FFF"
              h={{ base: "auto", md: "100px" }}
              display="flex"
              alignItems="center"
              gap="12px"
            >
              <ReactSVG
                src={item.icon}
                className={clsx({
                  "[&_svg]:w-[24px]": isMobile,
                })}
              />
              <Flex alignItems="center" gap="20px">
                <Box
                  color="#000"
                  fontWeight="600"
                  fontSize={{ base: "16px", md: "24px" }}
                >
                  {item.title}
                </Box>
                {item.tag && (
                  <Box
                    color="#404150"
                    fontWeight="600"
                    fontSize="12px"
                    bg="#FFF0F0"
                    rounded="4px"
                    px="8px"
                    h="20px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexShrink={0}
                  >
                    {item.tag}
                  </Box>
                )}
              </Flex>
            </Box>
          </a>
        ))}
      </Grid>
    </Flex>
  );
}
