import { Avatar, Box, Flex, Image, Stack, Wrap } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Font from "~/components/ui/font";
import Clipboard from "~/components/ui/clipboard";
import Platforms from "../Platforms";
import { EnterDetailButton } from "../JoinedProjects";
import { useParams } from "@remix-run/react";
import { useRequest } from "alova/client";
import { teamJoin } from "~/api/modules/bvi";
import Setting from "../Setting";
import { useState } from "react";
import LoginButton from "~/components/ui/login-button";

type TBanner = {
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
  refresh: () => void;
};

export default function Banner({ data, refresh = () => {} }: TBanner) {
  const { t } = useTranslation();
  const { identity, no } = useParams();

  const { send, loading, onSuccess } = useRequest(() => teamJoin({ no }), {
    immediate: false,
  });

  onSuccess(() => {
    refresh();
  });

  const [settingOpen, setSettingOpen] = useState(false);

  const linkUrl = location.href.split("/").slice(0, 5).join("/") + "...";
  return (
    <Flex direction="column">
      <Setting
        data={data}
        open={settingOpen}
        identity={identity}
        onClose={setSettingOpen}
        onSuccess={refresh}
      />
      <Box pos="relative" overflow="hidden" h={{ "2xl": "529px", md: "400px" }}>
        <Image rounded="20px" h="full" src={data.background} />
        <Wrap
          pos="absolute"
          w="full"
          bottom="28px"
          alignItems="center"
          justifyContent="space-between"
          gap="12px"
          px="40px"
        >
          <Avatar.Root w="56px" h="56px">
            <Avatar.Image src={data.logo} />
          </Avatar.Root>
          <Stack mr="auto">
            <Flex color="white" alignItems="center" gap="12px">
              <Font size="24px" weight="700" color="white">
                {data.title}
              </Font>
              <Flex
                alignItems="center"
                px="12px"
                py="4px"
                h="28px"
                bg="blackAlpha.400"
                rounded="8px"
                fontSize="14px"
                fontWeight="500"
                border="1px solid #404150"
              >
                <Clipboard value={location.href}>Link: {linkUrl}</Clipboard>
              </Flex>
            </Flex>
            <Flex w="max-content" alignItems="center" justifyContent="start">
              <Font size="14px" weight="700" color="white">
                {t("Follow")}
              </Font>
              <Platforms item={data as any} color="#fff" />
            </Flex>
          </Stack>
          {data.my_team ? (
            <Wrap alignItems="center" gap="20px">
              {!!data.invite && (
                <EnterDetailButton bg="white" iconColor="white">
                  {t("Invite To Join")}
                </EnterDetailButton>
              )}
              <EnterDetailButton
                stat={!data.invite}
                bg="white"
                iconColor="white"
                onClick={() => setSettingOpen(true)}
              >
                {t("Setting")}
              </EnterDetailButton>
            </Wrap>
          ) : data.join ? (
            <EnterDetailButton
              bg="white"
              iconColor="white"
              onClick={() => window.open(data.website, "_blank")}
            >
              {t("Enter the official website")}
            </EnterDetailButton>
          ) : (
            <LoginButton>
              <EnterDetailButton
                loading={loading}
                bg="white"
                iconColor="white"
                onClick={send}
              >
                {t("Join The")}
                <Box
                  as="span"
                  ml="8px"
                  display="inline-block"
                  _firstLetter={{ textTransform: "uppercase" }}
                >
                  {identity}
                </Box>
              </EnterDetailButton>
            </LoginButton>
          )}
        </Wrap>
      </Box>
    </Flex>
  );
}
