import { Flex, Box, Image } from "@chakra-ui/react";
import { LuBell } from "react-icons/lu";
import { ReactSVG } from "react-svg";
import { useTranslation } from "react-i18next";
import ExternalLink from "~/components/ui/external-link";
import useMobile from "~/hooks/useMobile";
import Grid from "~/components/ui/grid";

export default function Notice() {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const list = [
    {
      title: "Telegram",
      icon: "/images/icons/telegram_11.svg",
      tag: t("Global community"),
      tagColor: "#3DABFF",
      link: "https://t.me/hello_xonechain",
    },
    {
      title: "Telegram",
      icon: "/images/icons/telegram_11.svg",
      tag: t("Developer"),
      tagColor: "#FF0206",
      link: "https://t.me/Xone_Developers",
    },
    {
      title: "Youtube",
      icon: "/images/icons/youtube_1.svg",
      link: "https://www.youtube.com/@HelloXone",
    },
    {
      title: "X",
      icon: "/images/icons/twitter_1.svg",
      link: "https://x.com/xone_chain",
    },
    {
      title: "Medium",
      icon: "/images/icons/medium.svg",
      link: "https://medium.com/@xone_chain",
    },
  ];
  return (
    <Flex
      direction="column"
      gap={{ base: "16px", md: "22px" }}
      mt={{ base: "16px", md: "20px" }}
      data-nobold
    >
      <Box
        as="h1"
        fontSize={{ base: "18px", md: "36px" }}
        fontWeight="600"
        pl={{ base: "0", md: "18px" }}
      >
        {t("Notice")}
      </Box>
      <Flex
        rounded="12px"
        bg="#FFF0F0"
        px="16px"
        py="8px"
        alignItems="center"
        gap="10px"
        color="#FF0206"
        fontSize={{ base: "12px", md: "14px" }}
        lineHeight="normal"
      >
        <LuBell className="text-[18px] min-w-[18px]" />
        <Box fontWeight="400">
          {t("Timely capture the latest updates and announcements of Xone")}
        </Box>
      </Flex>
      <Grid
        w={{ base: "full", md: "300px" }}
        gap={{ base: "16px", md: "20px" }}
      >
        {list.map((item, index) => (
          <ExternalLink to={item.link} flex={1} hasIcon={false} key={index}>
            <Box
              flex={1}
              position="relative"
              px="20px"
              py="16px"
              bg="#FFF"
              rounded="12px"
              display="flex"
              alignItems="center"
              gap="12px"
              h={{ base: "auto", md: "88px" }}
              overflow="hidden"
            >
              <ReactSVG
                src={item.icon}
                beforeInjection={(svg) => {
                  svg.setAttribute("width", isMobile ? "24px" : "36px");
                  svg.setAttribute("height", isMobile ? "24px" : "36px");
                }}
              />
              <Box fontSize={{ base: "18px", md: "24px" }} fontWeight="500">
                {item.title}
              </Box>
              {item.tag && <TagBox color={item.tagColor}>{item.tag}</TagBox>}
            </Box>
          </ExternalLink>
        ))}
      </Grid>
    </Flex>
  );
}

const TagBox = ({ children, color }) => {
  return (
    <Box pos="absolute" top="0" right="0">
      <Box
        pos="relative"
        fontSize="12px"
        color="#FFF"
        px="9px"
        py="3px"
        bg={color}
        roundedBottomLeft="12px"
        lineHeight="normal"
      >
        <Box pos="absolute" bottom="-6px" right="0" w="6px" h="6px">
          <Box
            pos="relative"
            w="6px"
            h="6px"
            bg={color}
            _before={{
              content: '""',
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "6px",
              height: "6px",
              backgroundColor: "#FFF",
              roundedTopRight: "6px",
            }}
          />
        </Box>
        <Box pos="absolute" top="0" left="-6px" w="6px" h="6px">
          <Box
            pos="relative"
            w="6px"
            h="6px"
            bg={color}
            _before={{
              content: '""',
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "6px",
              height: "6px",
              backgroundColor: "#FFF",
              roundedTopRight: "6px",
            }}
          />
        </Box>
        {children}
      </Box>
    </Box>
  );
};
