import { Button, Flex, Popover, useUpdateEffect } from "@chakra-ui/react";
import { useNavigate, useSubmit } from "@remix-run/react";
import { ConnectStatus, useWalletKit } from "@web3jskit/walletkit";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { login } from "~/api/modules/auth";
import Font from "~/components/ui/font";
import useUserStore from "~/store/userStore";
import { toaster } from "~/components/ui/toaster";
import { PrimaryButton } from "~/components/ui/button";

export default function UserInfo() {
  const { t } = useTranslation();
  const { connectStatus, walletAddress, connect, disconnect, signMessage } =
    useWalletKit();

  const address = `${walletAddress.substring(0, 5)}...${walletAddress.substring(
    walletAddress.length - 5
  )}`;

  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const {
    isLogin,
    actions: { getUserInfo, logout },
  } = useUserStore();

  const submit = useSubmit();

  useEffect(() => {
    if (isLogin) {
      getUserInfo().then((res) => {
        submit(res, {
          method: "post",
          encType: "application/json",
          navigate: false,
        });
      });
    }
  }, [isLogin]);

  useEffect(() => {
    if (connectStatus === ConnectStatus.Connected) {
      try {
        if (isLogin || loading) return;
        setLoading(true);
        const nonce = `${dayjs().unix()}`;
        signMessage(
          `Welcome to BVI! \n Address:${walletAddress} \n Nonce:${nonce} \n Note:This signature is for identity verification only.`
        )
          .then(async (auth) => {
            const token = await login({
              account: walletAddress,
              auth,
              nonce,
            }).finally(() => {
              setLoading(false);
            });
            if (token) {
              localStorage.setItem("XToken", token as string);
              await getUserInfo();

              toaster.create({
                description: t("Login successfully"),
                type: "success",
              });
              navigator(window.location.pathname, {
                replace: true,
              });
            }
          })
          .catch(() => {
            setLoading(false);
            logout();
            disconnect();
          });
      } catch (error) {
        disconnect();
      }
    } else {
      disconnect();
      logout();
    }
  }, [connectStatus, isLogin]);

  useUpdateEffect(() => {
    if (!isLogin) {
      submit(
        {},
        { method: "post", encType: "application/json", navigate: false }
      );
    }
  }, [isLogin]);

  const [open, setOpen] = useState(false);

  const handleConnect = () => {
    if (isLogin) return;
    connect();
  };

  return (
    <>
      <Popover.Root
        open={open}
        positioning={{ placement: "bottom-end" }}
        onOpenChange={(e) => setOpen(isLogin ? e.open : false)}
      >
        <Popover.Trigger asChild>
          <PrimaryButton
            loading={loading}
            mr={{ base: "20px", md: 0 }}
            onClick={handleConnect}
          >
            <ReactSVG src="/images/icons/wallet.svg" />
            {isLogin ? address : t("Connect Wallet")}
          </PrimaryButton>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content w="max-content">
            <Popover.CloseTrigger />
            <Popover.Body px="12px" py="16px">
              <Flex
                alignItems="center"
                gap="10px"
                cursor="pointer"
                px="12px"
                py="6px"
                rounded="8px"
                _hover={{
                  bg: "#F2F4F8",
                }}
                onClick={() => {
                  disconnect();
                  setOpen(false);
                }}
              >
                <Font size="14px" weight="700">
                  {t("Disconnect")}
                </Font>
                <ReactSVG src="/images/icons/exit.svg" />
              </Flex>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </>
  );
}
