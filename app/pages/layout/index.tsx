import { Box, ClientOnly, Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import useSettingStore from "~/store/settingStore";
import { useLayoutEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    settings: { header, sidebar },
    actions: { setHeader },
  } = useSettingStore();

  useLayoutEffect(() => {
    setHeader(true);
  }, []);

  return (
    <Flex w="full">
      <Sidebar />
      <Flex
        direction="column"
        flexGrow="1"
        pl={{ base: "0", md: sidebar ? "220px" : "62px" }}
        w={{
          base: "100%",
          md: `calc(100% - ${sidebar ? "220px" : "62px"})`,
        }}
        transition="all 0.3s ease-in-out"
      >
        <ClientOnly>
          <Header />
        </ClientOnly>
        <Box
          w="full"
          maxW={{ base: "full", md: "1660px" }}
          h="full"
          mt={header ? "56px" : "0"}
          mx="auto"
          className="[&>div]:p-[22px]"
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
