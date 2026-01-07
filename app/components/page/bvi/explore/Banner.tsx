import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  Popover,
  Stack,
} from "@chakra-ui/react";
import { useDebounce, useUpdateEffect } from "ahooks";
import { useTranslation } from "react-i18next";
import { useRequest } from "alova/client";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { teamSearch } from "~/api/modules/bvi";
import Item from "./Item";
import NoData from "~/components/ui/no-data";
import useMobile from "~/hooks/useMobile";

export default function Banner() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const debouncedValue = useDebounce(value, { wait: 500 });

  const { data, send, loading }: any = useRequest(teamSearch, {
    force: true,
    immediate: false,
    initialData: { list: [] },
  });

  useUpdateEffect(() => {
    if (data?.list) {
      setList(data.list);
    }
  }, [data]);

  useUpdateEffect(() => {
    if (debouncedValue) {
      setOpen(true);
      send({ wd: debouncedValue });
    } else {
      setOpen(false);
      setList([]);
    }
  }, [debouncedValue]);

  const isMobile = useMobile();

  return (
    <Flex direction="column">
      <Box pos="relative" overflow="hidden">
        <Image
          rounded={{ base: 0, md: "20px" }}
          h={{ base: "auto", md: "400px", xl: "auto" }}
          src={`/images/bvi/explore_banner${isMobile ? "_h5" : ""}.png`}
        />
        <Flex
          pos="absolute"
          w="full"
          direction="column"
          top="0"
          zIndex="2"
          color="white"
          px={{ base: "28px", xl: "40px", "2xl": "180px" }}
          py={{ base: "40px", "2xl": "90px" }}
        >
          <Box
            maxW={{ base: "full", md: "70%" }}
            fontSize={{
              base: "24px",
              lg: "28px",
              xl: "38px",
              "2xl": "48px",
            }}
            fontWeight="700"
            lineHeight="normal"
          >
            {t(
              "Search for popular organizations and projects, follow them Finding the Best Practices for Xone"
            )}
          </Box>
          <Box
            data-nobold
            maxW={{ base: "full", md: "70%" }}
            fontSize="16px"
            fontWeight="400"
            lineHeight="normal"
            mt="20px"
            mb={{ base: "20px", md: "40px" }}
          >
            {t(
              "POBVI (Proof of Behavior Value Incentive) is an innovative blockchain consensus mechanism used to identify the value of user behavior and incentivize the specified behavior value."
            )}
          </Box>
          <Box>
            <Popover.Root
              open={open}
              autoFocus={false}
              positioning={{ placement: "bottom-start" }}
            >
              <Popover.Trigger asChild>
                <InputGroup
                  startElement={<GoSearch size="20px" className="ml-[10px]" />}
                >
                  <Input
                    data-nobold
                    maxW="563px"
                    h={{ base: "56px", md: "66px" }}
                    bg="white"
                    rounded="30px"
                    color="#979797"
                    px="!50px"
                    placeholder={
                      isMobile
                        ? t("Find the organization or project")
                        : t(
                            "Find the organization or project that you are interested in and join them"
                          )
                    }
                    onChange={(e) => setValue(e.target.value)}
                    // onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(!!debouncedValue)}
                  />
                </InputGroup>
              </Popover.Trigger>
              <Popover.Positioner left="!0" w="85%">
                <Popover.Content
                  w={{ base: "full", md: "563px" }}
                  rounded="8px"
                  minH="212px"
                >
                  <Popover.CloseTrigger />
                  <Popover.Body>
                    <Stack gap="20px">
                      {list?.map?.((item) => (
                        <Item key={item.no} item={item} size="mini" />
                      ))}
                      {!list?.length && <NoData loading={loading} />}
                    </Stack>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
