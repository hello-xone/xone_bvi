import { Box, Wrap } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { EnterDetailButton } from "../JoinedProjects";
import { useParams } from "@remix-run/react";
import { useRequest } from "alova/client";
import { teamJoin } from "~/api/modules/bvi";
import Setting from "../Setting";
import { useState } from "react";
import LoginButton from "~/components/ui/login-button";
import useMobile from "~/hooks/useMobile";
import { TBanner } from "./Banner";
import Clipboard from "~/components/ui/clipboard";
import useUserStore from "~/store/userStore";
export default function JoinButton({ data, refresh = () => {} }: TBanner) {
  const isMobile = useMobile();
  const { t } = useTranslation();
  const [settingOpen, setSettingOpen] = useState(false);
  const { identity, no } = useParams();

  const { userInfo } = useUserStore();

  const { send, loading, onSuccess } = useRequest(() => teamJoin({ no }), {
    immediate: false,
  });

  onSuccess(() => {
    refresh();
  });

  return (
    <>
      <Setting
        data={data}
        open={settingOpen}
        identity={identity}
        onClose={setSettingOpen}
        onSuccess={refresh}
      />
      {data.my_team ? (
        <Wrap alignItems="center" gap="20px">
          {/* {!!data.invite && (
            <EnterDetailButton
              bg="white"
              icon={false}
              iconColor={isMobile ? "#C6C6C6" : "white"}
            >
              <Clipboard data-bold value={location.href}>
                <Box as="span" data-bold mr="5px">
                  {t("Invite To Join")}
                </Box>
              </Clipboard>
            </EnterDetailButton>
          )} */}
          <EnterDetailButton
            stat={!data.invite}
            bg="white"
            iconColor={isMobile ? "#C6C6C6" : "white"}
            onClick={() => setSettingOpen(true)}
          >
            {t("Setting")}
          </EnterDetailButton>
        </Wrap>
      ) : data.join ? (
        <EnterDetailButton
          bg="white"
          iconColor={isMobile ? "#C6C6C6" : "white"}
          onClick={() => window.open(data.website, "_blank")}
        >
          {t("Enter the official website")}
        </EnterDetailButton>
      ) : (
        <LoginButton>
          {((userInfo.role === "organization" && identity === "project") ||
            (userInfo.role === "person" && identity === "organization")) && (
            <EnterDetailButton
              loading={loading}
              bg="white"
              iconColor={isMobile ? "#C6C6C6" : "white"}
              onClick={send}
            >
              {t("Join The")}
              <Box
                as="span"
                ml="8px"
                display="inline-block"
                _firstLetter={{ textTransform: "uppercase" }}
              >
                {t(identity)}
              </Box>
            </EnterDetailButton>
          )}
        </LoginButton>
      )}
    </>
  );
}
