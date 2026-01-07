import { Box, Flex, Image } from "@chakra-ui/react";
import Screens from "./Screens";
import Lang from "./Lang";
import UserInfo from "./UserInfo";
import useSettingStore from "~/store/settingStore";
import useMobile from "~/hooks/useMobile";
import { useNavigate } from "@remix-run/react";
import { ReactSVG } from "react-svg";
import { useScroll } from "ahooks";

export default function Header() {
  const {
    settings: { header, sidebar },
  } = useSettingStore();

  const isMobile = useMobile();
  const navigate = useNavigate();
  const {
    actions: { setSideBar },
  } = useSettingStore();

  const scroll = useScroll(document);

  return (
    <Flex
      hidden={!header}
      position="fixed"
      left={isMobile ? 0 : sidebar ? "220px" : "62px"}
      zIndex="98"
      bg="white"
      w={{
        base: "100%",
        md: `calc(100% - ${sidebar ? "220px" : "62px"})`,
      }}
      borderBottom="1px solid white"
      borderColor={scroll?.top > 55 ? "#F2F4F8" : "white"}
      h="55px"
      minH="55px"
      transition="all 0.3s ease-in-out"
    >
      <Flex
        w={{ base: "full" }}
        px={{ base: "16px", md: "22px" }}
        gap={{ base: 0, md: "12px" }}
        mx="auto"
        alignItems="center"
        justifyContent="end"
      >
        <Image
          hidden={!isMobile}
          mr={{ base: "auto", md: 0 }}
          src="/images/logo.png"
          w="28px"
          h="28px"
          fit="contain"
          onClick={() => navigate("/")}
        />
        {import.meta.env.DEV && !isMobile && <Screens />}
        <Lang />
        <UserInfo />
        <Box hidden={!isMobile} order="2" onClick={() => setSideBar(true)}>
          <ReactSVG src="/images/icons/menu.svg" />
        </Box>
      </Flex>
    </Flex>
  );
}
