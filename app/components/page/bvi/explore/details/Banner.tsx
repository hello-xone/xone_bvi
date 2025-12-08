import { Avatar, Box, Flex, Image, Stack, Wrap } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Font from "~/components/ui/font";
import Clipboard from "~/components/ui/clipboard";
import Platforms from "../Platforms";
import useMobile from "~/hooks/useMobile";
import JoinButton from "./JoinButton";

export type TBanner = {
  data: {
    no: string;
    title: string;
    logo: string;
    background: string;
    my_team: boolean;
    join: boolean;
    website: string;
    invite: boolean;
  };
  refresh?: () => void;
};

export default function Banner({ data, refresh = () => {} }: TBanner) {
  const { t } = useTranslation();
  const isMobile = useMobile();

  const linkUrl = location.href.split("/").slice(0, 5).join("/") + "...";
  return (
    <Flex direction="column">
      <Box pos="relative" overflow="hidden" h={{ base: "208px", md: "478px" }}>
        <Image
          w="full"
          rounded={{ base: "0", md: "20px" }}
          h="full"
          src={
            isMobile
              ? "/images/bvi/details_bg_h5.png"
              : "/images/bvi/details_bg.png"
          }
        />
        <Wrap
          pos="absolute"
          w="full"
          bottom={{ base: "16px", md: "28px" }}
          alignItems="center"
          justifyContent={{ base: "flex-start", md: "space-between" }}
          gap="12px"
          px={{ base: "16px", md: "40px" }}
        >
          <Avatar.Root
            w={{ base: "24px", md: "56px" }}
            h={{ base: "24px", md: "56px" }}
          >
            <Avatar.Image src={data.logo} />
          </Avatar.Root>
          <Stack mr="auto">
            <Flex color="white" alignItems="center" gap="12px">
              <Font
                maxW={{ base: "85px", md: "auto" }}
                size={{ base: "14px", md: "24px" }}
                weight="700"
                color="white"
                lineClamp="1"
              >
                {data.title}
              </Font>
              <Flex
                alignItems="center"
                px="12px"
                py="4px"
                h={{ base: "20px", md: "28px" }}
                bg="blackAlpha.400"
                rounded={{ base: "4px", md: "8px" }}
                fontSize={{ base: "10px", md: "14px" }}
                fontWeight="500"
                border="1px solid #404150"
              >
                <Clipboard value={location.href}>
                  {t("Link")}: {linkUrl}
                </Clipboard>
              </Flex>
            </Flex>
            <Flex w="max-content" alignItems="center" justifyContent="start">
              <Font
                size={{ base: "12px", md: "14px" }}
                weight="700"
                color="white"
              >
                {t("Follow")}
              </Font>
              <Platforms item={data as any} color="#fff" />
            </Flex>
          </Stack>
          {!isMobile && <JoinButton data={data} refresh={refresh} />}
        </Wrap>
      </Box>
    </Flex>
  );
}
