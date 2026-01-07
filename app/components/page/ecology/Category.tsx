import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Flex,
  Box,
  Input,
  InputGroup,
  Button,
  createListCollection,
  Text,
  SimpleGrid,
  Image,
  Wrap,
  Dialog,
  CloseButton,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Select from "~/components/ui/select";
import { Tooltip } from "~/components/ui/tooltip";
import ExternalLink from "~/components/ui/external-link";
import { GoSearch } from "react-icons/go";
import Detail from "./Detail";
import { EXTERNAL_LINKS } from "~/utils/external";
import NoData from "~/components/ui/no-data";
import useMobile from "~/hooks/useMobile";
import { useDebounce, useUpdateEffect } from "ahooks";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useUpdateUrlParams } from "~/hooks/useUpdateUrlParams";

type DappList = {
  name: string;
  content: Dapp[];
};

type Dapp = {
  audit_report_link: string;
  category: {
    category: {
      [key: string]: string;
    };
    id: number;
  }[];
  chain: any[];
  code_warehouse_link: string;
  contact_discord: string;
  contact_facebook: string;
  contact_medium: string;
  contact_telegram: string;
  contact_website: string;
  contact_x: string;
  contact_youtube: string;
  content: {
    en: string;
  };
  create_time: number;
  dapp_image_link: string;
  exclusive_link: string;
  logo: string;
  name: string;
  score: number;
  tags: string[] | null;
  update_time: number;
  url: string;
  white_paper_link: string;
};

const DappItem = ({ logo, name, content, tags, onClick }) => {
  const isMobile = useMobile();

  const truncateText = (text: string, maxLength: number) => {
    return text?.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <Box
      cursor="pointer"
      maxWidth="526px"
      display="flex"
      flexDirection="column"
      p={{ base: "16px 20px", md: "20px" }}
      gap={{ base: "16px", md: "24px" }}
      rounded="12px"
      bg="white"
      border={{ base: "none", md: "1px solid #F2F4F8" }}
      _hover={{
        border: "1px solid #FF0206",
        transform: "translateY(-4px)",
        transition: "transform 0.2s ease, border 0.2s ease",
      }}
      onClick={() => {
        onClick();
      }}
    >
      <Flex alignItems="center">
        <Image
          boxSize={{ base: "24px", md: "56px" }}
          rounded={{ base: "24px", md: "56px" }}
          src={logo ? logo : "#"}
        />

        <Box
          as="h3"
          fontSize={{ base: "16px", md: "24px" }}
          fontWeight="700"
          color="#000"
          ml="12px"
        >
          {name}
        </Box>
      </Flex>
      <Tooltip content={content?.en}>
        <Box minH="58px" mt="2">
          <Text
            fontSize={{ base: "14px", md: "16px" }}
            fontWeight="400"
            color="#404150"
            lineClamp="3"
          >
            {content?.en}
          </Text>
        </Box>
      </Tooltip>

      <Wrap gap="10px">
        {tags?.map((c: string) => (
          <Box
            h="28px"
            key={c}
            bg="#FFF0F0"
            rounded="8px"
            px="20px"
            py="5px"
            color="#000"
            fontSize="14px"
            fontWeight="600"
            lineHeight="normal"
          >
            {c}
          </Box>
        ))}
      </Wrap>
    </Box>
  );
};

const SearchInput = ({
  isModal = false,
  onOpen,
  onSearch,
  dappName,
}: {
  isModal?: boolean;
  onOpen?: (bl: boolean) => void;
  onSearch: (keyword: string) => void;
  dappName: string;
}) => {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debouncedValue = useDebounce(value, { wait: 500 });

  useUpdateEffect(() => {
    if (isModal) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, isModal]);

  useEffect(() => {
    setValue(dappName);
  }, [dappName, isMobile]);

  const renderEndElement = () => {
    if (isModal) {
      return value ? (
        <CloseButton
          size="xs"
          onClick={() => {
            setValue("");
            inputRef.current?.focus();
          }}
        />
      ) : (
        <Box
          onClick={(e) => {
            e.stopPropagation();
            onOpen(false);
          }}
          color="#404150"
          fontSize="14px"
          lineHeight="14px"
          cursor="pointer"
        >
          {t("Cancel")}
        </Box>
      );
    }
    return null;
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.keyCode === 13) {
        onSearch((e.target as HTMLInputElement).value);
      }
    },
    [onSearch]
  );

  return (
    <Box
      ml={{ base: 0, md: "20px" }}
      onClick={() => {
        if (isMobile && !isModal) {
          onOpen?.(true);
        }
      }}
    >
      <InputGroup
        startElement={<GoSearch size="18px" className="mr-[8px]" />}
        endElement={renderEndElement()}
      >
        <Input
          w={{ base: isModal ? "full" : 0, md: "488px" }}
          h="44px"
          bg="white"
          rounded="12px"
          color="#979797"
          fontWeight="600"
          pr="12px"
          border="none"
          value={value}
          placeholder={
            isMobile && !isModal ? null : t("Search for desired projects")
          }
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </InputGroup>
    </Box>
  );
};

const MobileSearchModal = ({
  visible,
  onOpen,
  filteredDapps,
  onSearch,
  dappName,
  handleDetail,
}) => {
  const mobileData = useMemo(() => {
    const map = new Map<string, Dapp>();
    filteredDapps.forEach((item) => {
      item.content.forEach((dapp) => {
        if (!map.has(dapp.name)) {
          map.set(dapp.name, dapp);
        }
      });
    });
    return Array.from(map.values());
  }, [filteredDapps]);
  return (
    <Dialog.Root placement="top" open={visible}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content p="16px" bg="transparent">
          <SearchInput
            isModal={true}
            onOpen={onOpen}
            onSearch={onSearch}
            dappName={dappName}
          />
          <Flex direction="column" gap="16px" mt="16px">
            {mobileData.map((item) => (
              <DappItem
                key={item.name}
                {...item}
                onClick={() => handleDetail(item)}
              />
            ))}
          </Flex>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default function Category({ categoryRes, dappRes }) {
  const { t } = useTranslation();
  const isMobile = useMobile();

  const [tabs, setTabs] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [dapps, setDapps] = useState<DappList[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const [showFullContent, setShowFullContent] = useState<
    Record<string, boolean>
  >({});

  const { param: category_, updateParam } = useUpdateUrlParams({
    key: "category",
  });

  const { param: dapp_name, updateParam: updateDappNameParam } =
    useUpdateUrlParams({
      key: "dapp_name",
    });
  useEffect(() => {
    const formattedTabs = categoryRes?.map?.((item) => ({
      label: item.category.en,
      value: item.category.en,
      id: item.id,
    }));
    setTabs([{ label: "All", value: "All" }, ...(formattedTabs || [])]);
  }, [categoryRes]);

  useEffect(() => {
    const result: DappList[] = [];
    const dappList = dappRes?.list || [];

    dappList?.forEach((dapp) => {
      if (!dapp.category || dapp.category?.length === 0) {
        return;
      }

      dapp.category.forEach((cat) => {
        const categoryName = cat.category?.en;

        if (activeTab !== "All" && categoryName !== activeTab) {
          return;
        }

        const existingCategory = result.find(
          (item) => item.name === categoryName
        );

        if (existingCategory) {
          existingCategory.content.push(dapp);
        } else {
          result.push({
            name: categoryName,
            content: [dapp],
          });
        }
      });
    });
    setDapps(result);
  }, [dappRes, activeTab]);

  const filteredDapps = useMemo(() => {
    return dapps;
  }, [dapps]);

  useEffect(() => {
    if (category_) {
      const matchedTab = tabs.find((tab) => tab.id === Number(category_));
      if (matchedTab) {
        setActiveTab(matchedTab.value);
      }
    }
  }, [category_, tabs]);

  const handleSearch = useCallback(
    (value: string) => {
      updateDappNameParam(value);
    },
    [updateDappNameParam]
  );

  return (
    <Flex direction="column" mt="20px" px={{ base: "20px", md: 0 }}>
      <Flex
        justifyContent={{ base: "space-between", md: "flex-start" }}
        gap={{ base: 0 }}
        alignItems="center"
        mb="20px"
      >
        <Detail
          open={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          record={currentItem}
        />
        <MobileSearchModal
          visible={isMobileSearch}
          onOpen={setIsMobileSearch}
          filteredDapps={filteredDapps}
          dappName={dapp_name}
          onSearch={handleSearch}
          handleDetail={(ls) => {
            setDrawerOpen(true);
            setCurrentItem(ls);
          }}
        />
        <ExternalLink
          to={import.meta.env.VITE_APP_DEVELOPER_URL}
          hasIcon={false}
          mr={{ base: "18px", md: "auto" }}
        >
          <Button
            bg="#FF0206"
            h="44px"
            w={{ base: "auto", md: "220px" }}
            p={{ base: "10px 16px", md: "0" }}
            rounded="12px"
            fontSize="14px"
            fontWeight="700"
          >
            {t("Create APP")}
          </Button>
        </ExternalLink>
        <Select
          w={{ base: "auto", md: "182px" }}
          pl="0"
          bg="white"
          mr={{ base: "auto", md: 0 }}
          px={{ base: "4px", md: "0" }}
          borderColor="#FFF"
          collection={createListCollection({
            items: tabs,
          })}
          value={[activeTab]}
          onValueChange={(e) => {
            setActiveTab(e.value[0]);
            updateParam(e.items[0]?.id);
          }}
        />
        <SearchInput
          isModal={false}
          onOpen={setIsMobileSearch}
          onSearch={handleSearch}
          dappName={dapp_name}
        />
      </Flex>
      {filteredDapps.length > 0 ? (
        filteredDapps.map((item) => (
          <Flex direction="column" mb="20px" key={item.name}>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={{ base: "8px", md: 0 }}
              justifyContent="space-between"
              alignItems={{ base: "flex-start", md: "center" }}
            >
              <Box
                fontSize={{ base: "18px", md: "36px" }}
                fontWeight="600"
                lineHeight="normal"
                color="#000"
                _firstLetter={{ textTransform: "uppercase" }}
              >
                {item.name}
              </Box>
              {/* <Wrap gap="12px">
              {categoryList.map((v) => (
                <Box
                  as="button"
                  h="28px"
                  key={v}
                  rounded="8px"
                  px="10px"
                  py="5px"
                  bg={activeCategories[item.name] === v ? "#FF0206" : "#FBFCFF"}
                  color={activeCategories[item.name] === v ? "#FFF" : "#000"}
                  fontSize={{ base: "12px", md: "14px" }}
                  fontWeight="600"
                  lineHeight="normal"
                  transition="0.2s all"
                  cursor="pointer"
                  onClick={() => {
                    setActiveCategories((prev) => ({
                      ...prev,
                      [item.name]: prev[item.name] === v ? null : v,
                    }));
                  }}
                >
                  {v}
                </Box>
              ))}
            </Wrap> */}
            </Flex>
            <SimpleGrid
              columns={isMobile ? 1 : 3}
              mt="20px"
              gap="20px"
              bg={{ base: "transparent", md: "white" }}
              p={{ base: 0, md: "20px" }}
              rounded="12px"
            >
              {(!showFullContent[item.name] && isMobile
                ? item.content.slice(0, 3)
                : item.content
              ).map((ls, index) => (
                <DappItem
                  key={index}
                  {...ls}
                  onClick={() => {
                    setCurrentItem({
                      ...ls,
                    });
                    setDrawerOpen(true);
                  }}
                />
              ))}
              {item.content?.length > 3 &&
                !showFullContent[item.name] &&
                isMobile && (
                  <Flex
                    fontSize="12px"
                    fontWeight="400"
                    color="#979797"
                    alignItems="center"
                    justifyContent="center"
                    mt="-8px"
                    onClick={() =>
                      setShowFullContent((prev) => ({
                        ...prev,
                        [item.name]: !prev[item.name],
                      }))
                    }
                  >
                    {t("See More")}
                    <MdKeyboardArrowRight className="scale-125" />
                  </Flex>
                )}
            </SimpleGrid>
          </Flex>
        ))
      ) : (
        <>
          <Box
            fontSize={{ base: "18px", md: "36px" }}
            fontWeight="600"
            lineHeight="normal"
            color="#000"
          >
            {activeTab}
          </Box>
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap="20px"
            h="330px"
            bg="#FFF"
            rounded="12px"
            mt="20px"
          >
            <NoData />
          </Flex>
        </>
      )}
    </Flex>
  );
}
