import { Link, useMatches, useParams } from "@remix-run/react";
import {
  Box,
  Flex,
  Accordion,
  Center,
  Image,
  CloseButton,
  useUpdateEffect,
  Stack,
} from "@chakra-ui/react";
import { ReactSVG } from "react-svg";
import HomeSvg from "/images/nav/home.svg";
import bviSvg from "/images/nav/bvi.svg";
import developerSvg from "/images/nav/developer.svg";
import dynamicsSvg from "/images/nav/dynamics.svg";
import ecologySvg from "/images/nav/ecology.svg";
import communitySvg from "/images/nav/community.svg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import useSettingStore from "~/store/settingStore";
import { useState } from "react";
import useMobile from "~/hooks/useMobile";
import useScrollLock from "~/hooks/useScrollLock";
import { useTranslation } from "react-i18next";
import { useDebounce } from "ahooks";
import Footer from "./Footer";

type navItemType = {
  title: string;
  link: string;
  icon?: string;
  hidden?: boolean;
  children?: Array<{
    title: string;
    link: string;
  }>;
};

export default function Sidebar() {
  const { t } = useTranslation();
  let navList: navItemType[] = [
    {
      title: t("Home"),
      link: "/",
      icon: HomeSvg,
    },
    {
      title: "BVI",
      link: "/bvi",
      icon: bviSvg,
      hidden: import.meta.env.MODE === "production",
      children: [
        {
          title: t("Overview"),
          link: "overview",
        },
        {
          title: t("Explore"),
          link: "explore",
        },
      ],
    },
    // {
    // 	title: "Data",
    // 	link: "/data",
    // 	icon: dataSvg
    // },
    {
      title: t("Developer"),
      link: "/developer",
      icon: developerSvg,
      children: [
        {
          title: t("Learn"),
          link: "learn",
        },
      ],
    },
    {
      title: t("Dynamics"),
      link: "/dynamics",
      icon: dynamicsSvg,
      children: [
        {
          title: t("Coin release"),
          link: "release",
        },
      ],
    },
    {
      title: t("Ecology"),
      link: "/ecology",
      icon: ecologySvg,
    },
    {
      title: t("Community"),
      link: "/community",
      icon: communitySvg,
    },
  ];
  navList = navList.filter((item) => !item.hidden);

  const matches = useMatches();
  const { lang } = useParams();
  const isMobile = useMobile();
  const { lockScroll, unLockScroll } = useScrollLock();

  const currentPath = matches[matches.length - 1].pathname.replace(
    `/${lang}`,
    ""
  );
  const currentPathname = currentPath.split("/");
  const lastPathname = currentPathname.at(
    currentPathname.length === 3 ? -2 : -1
  );

  const navItem =
    "flex items-center justify-content h-[54px] font-[800] cursor-pointer";

  const {
    settings: { sidebar },
    actions: { switchSideBar, setSideBar },
  } = useSettingStore();

  const [navHover, setNavHover] = useState<boolean>(false);

  const sidebarIsOpen = sidebar || navHover || isMobile;
  const debouncedSidebarIsOpen = useDebounce(sidebarIsOpen, { wait: 200 });
  const logoChanged = sidebarIsOpen ? debouncedSidebarIsOpen : sidebarIsOpen;

  const width = isMobile ? "full" : sidebarIsOpen ? "220px" : "62px";

  const onLinkClick = () => {
    if (isMobile) {
      setSideBar(false);
    }
  };

  useUpdateEffect(() => {
    if (isMobile) {
      setSideBar(false);
    } else {
      unLockScroll();
    }
  }, [isMobile]);

  useUpdateEffect(() => {
    if (sidebar && isMobile) {
      lockScroll();
    } else {
      unLockScroll();
    }
  }, [sidebar]);

  const IconTitle = ({
    children,
    item,
  }: {
    children: string;
    item: navItemType;
  }) => {
    return (
      <Flex
        alignItems="center"
        w="full"
        gap="12px"
        px="16px"
        transition="all 0.3s ease-in-out"
        className={`hover:bg-[#FFF0F0] [&_.nav-icon]:hover:bg-[#FF0206] ${
          currentPath === item.link
            ? "bg-[#FFF0F0] [&_.nav-icon]:bg-[#FF0206]"
            : ""
        }`}
      >
        <Flex
          pos="relative"
          zIndex="2"
          alignItems="center"
          justifyContent="center"
          transition="all 0.3s ease-in-out"
          className="nav-icon w-[32px] min-w-[32px] h-[32px] bg-black rounded-[6px]"
        >
          <ReactSVG src={item.icon} />
        </Flex>
        <Box
          data-title
          className={navItem}
          fontSize={{ base: "16px", md: "14px" }}
          fontFamily={{ base: "nobold", md: "Figtree" }}
          style={{
            opacity: debouncedSidebarIsOpen && sidebarIsOpen ? 100 : 0,
          }}
          transition="all 0.3s ease-in-out"
        >
          {children}
        </Box>
      </Flex>
    );
  };

  return (
    <>
      <Box
        pos="fixed"
        zIndex="99"
        w="full"
        h="full"
        top="0"
        left={navHover ? 0 : -5000}
        bg="blackAlpha.300"
        hidden={isMobile}
        opacity={navHover ? 100 : 0}
        transition="opacity 0.3s ease-in-out"
        onMouseEnter={() => setNavHover(false)}
      />
      <Flex
        pos="fixed"
        top={0}
        left={0}
        zIndex="100"
        direction="column"
        bg="white"
        w={width}
        minW={width}
        h="100vh"
        transform={
          isMobile ? (sidebar ? "translateX(0)" : "translateX(-100%)") : null
        }
        minH="100vh"
        pt="12px"
        pb="10px"
        px={{ base: "16px", md: 0 }}
        transition="all 0.2s ease-in-out"
      >
        <Flex
          alignItems={isMobile ? "center" : "baseline"}
          justifyContent={isMobile ? "space-between" : "flex-start"}
          w="full"
          px="16px"
          py="14px"
          pr={{ base: 0, md: "16px" }}
          mb="12px"
        >
          <a href="https://www.xone.org" target="_blank">
            <Flex alignItems="center">
              <Image src="/images/logo.png" w="28px" h="28px" />
              <Image
                hidden={!logoChanged}
                src="/images/logo_txt.png"
                w="188px"
                h="28px"
              />
            </Flex>
          </a>
          <CloseButton hidden={!isMobile} onClick={switchSideBar} />
        </Flex>
        <Center
          hidden={isMobile}
          pos="absolute"
          right="-18px"
          top="40px"
          w="33px"
          h="33px"
          rounded="full"
          border="1px solid #E5E6ED"
          bg="white"
          cursor="pointer"
          rotate={sidebarIsOpen ? "180deg" : "0"}
          transition="all 0.3s ease-in-out"
          onMouseEnter={(e) => e.preventDefault()}
          onClick={switchSideBar}
        >
          <MdOutlineKeyboardArrowRight size="20px" />
        </Center>
        <Stack gap="50px" overflowY="auto" flexGrow="1">
          <Flex
            key={sidebarIsOpen ? 1 : 0}
            direction="column"
            overflow="hidden"
            minH="max-content"
            onMouseEnter={() => setNavHover(!sidebar)}
            onMouseLeave={() => setNavHover(false)}
          >
            <Accordion.Root
              key={currentPath}
              collapsible
              defaultValue={sidebar || isMobile ? [`/${lastPathname}`] : []}
            >
              {navList.map((item, index) => {
                if (item.children) {
                  return (
                    <Accordion.Item
                      key={index}
                      value={item.link}
                      border="none"
                      className={`[&_.nav-trigger]:hover:bg-[#FFF0F0] [&_.nav-icon]:hover:bg-[#FF0206]`}
                    >
                      <Accordion.ItemTrigger
                        p="0"
                        transition="all 0.3s ease-in-out"
                        className={`nav-trigger ${
                          currentPath.startsWith(item.link)
                            ? "bg-[#FFF0F0] [&_.nav-icon]:bg-[#FF0206] [&_[data-title]]:font-[Figtree] [&_[data-title]]:text-[#FF0206]"
                            : ""
                        }`}
                      >
                        <IconTitle item={item}>{item.title}</IconTitle>
                        <Accordion.ItemIndicator
                          pos="absolute"
                          opacity={sidebarIsOpen ? 100 : 0}
                          right={{ base: "30px", md: "16px" }}
                          color="black"
                          transition="all 0.3s ease-in-out"
                        />
                      </Accordion.ItemTrigger>
                      <Accordion.ItemContent rounded="0">
                        <Accordion.ItemBody className="p-0">
                          {item.children.map((child, index) => (
                            <Link
                              key={index}
                              to={`${item.link}/${child.link}`}
                              onClick={onLinkClick}
                            >
                              <Box
                                pl="60px"
                                transition="all 0.3s ease-in-out"
                                borderRight="2px solid transparent"
                                _hover={{
                                  bg: "#FAF9F9",
                                  borderColor: "#FF0420",
                                }}
                                fontSize={{ base: "16px", md: "14px" }}
                                fontFamily={{ base: "nobold", md: "Figtree" }}
                                className={`${navItem} ${
                                  currentPath.startsWith(
                                    `${item.link}/${child.link}`
                                  )
                                    ? "bg-[#FAF9F9] !border-[#FF0420]"
                                    : ""
                                }`}
                              >
                                {child.title}
                              </Box>
                            </Link>
                          ))}
                        </Accordion.ItemBody>
                      </Accordion.ItemContent>
                    </Accordion.Item>
                  );
                } else {
                  return (
                    <Link key={index} to={item.link} onClick={onLinkClick}>
                      <IconTitle item={item}>{item.title}</IconTitle>
                    </Link>
                  );
                }
              })}
            </Accordion.Root>
          </Flex>
          <Footer />
        </Stack>
      </Flex>
    </>
  );
}
