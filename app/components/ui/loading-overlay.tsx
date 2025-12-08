import { Box, Flex, Image } from "@chakra-ui/react";
import { useLocation, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function LoadingOverlay() {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const location = useLocation();
  const [showDelayed, setShowDelayed] = useState(false);

  // 检查是否为同一路由的二次刷新
  const isSameRouteReload = navigation.location
    ? navigation.location.pathname === location.pathname
    : false;

  useEffect(() => {
    if (navigation.state === "loading" && !isSameRouteReload) {
      const timer = setTimeout(() => {
        setShowDelayed(true);
      }, 300); // 添加300ms延迟，避免闪烁

      return () => {
        clearTimeout(timer);
      };
    } else {
      setShowDelayed(false);
    }
  }, [navigation.state, isSameRouteReload]);

  if (navigation.state !== "loading" || !showDelayed || isSameRouteReload) {
    return null;
  }

  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={50}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="blackAlpha.200"
      backdropFilter="blur(4px)"
    >
      <Flex
        direction="column"
        align="center"
        gap="10px"
        bg="whiteAlpha.600"
        px="63px"
        py="34px"
        rounded="12px"
        boxShadow="lg"
      >
        <Image
          src="/images/icons/loading_overlay.svg"
          className="w-[80px] h-[80px] animate-spin"
        />
        <Box
          data-nobold
          fontSize={{ base: "24px", md: "36px" }}
          fontWeight="400"
        >
          {t("Loading")}
        </Box>
      </Flex>
    </Box>
  );
}
