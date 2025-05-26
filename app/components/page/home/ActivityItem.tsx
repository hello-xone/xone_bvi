import { Box, Flex, Image } from "@chakra-ui/react";
import { EntriesItem } from "./Activity";
import { Tooltip } from "~/components/ui/tooltip";
import Font from "~/components/ui/font";
import { t } from "i18next";

export default function ActivityItem({ item }: { item: EntriesItem }) {
  const isEnded = new Date(item.event.end_at).getTime() <= new Date().getTime();

  return (
    <a href={item.event.url} target="_blank">
      <Flex
        display="!flex"
        direction="column"
        w={{ base: "full", md: "!420px" }}
        maxW={{ base: "full", md: "420px" }}
        h={{ base: "full", md: "495px" }}
        py="20px"
        px={{ base: "20px", md: "24px" }}
        rounded="12px"
        bg="white"
        border="1px solid rgba(0, 0, 0, 0.08)"
        mr="20px"
        gap={{ base: "10px", md: "5px" }}
        cursor="pointer"
        transition="all 0.2s ease-in-out"
        mb="1px"
        _hover={{
          borderColor: "#FF0206",
          mt: "1px",
          mb: 0,
        }}
      >
        <Image h="290px" src={item.event.cover_url} rounded="12px" />
        <Tooltip content={item.event.name}>
          <Box
            fontSize={{ base: "16px", md: "18px" }}
            fontWeight="700"
            lineClamp="1"
          >
            {item.event.name}
          </Box>
        </Tooltip>
        {/* <Tooltip content={item.event.description}> */}
        <Box
          data-nobold
          fontSize={{ base: "14px", md: "16px" }}
          fontWeight="500"
          color="#979797"
          lineClamp="3"
        >
          {item.event.description}
        </Box>
        {/* </Tooltip> */}
        <Flex mt="auto" alignItems="center" justifyContent="space-between">
          <Box
            data-nobold
            fontSize={{ base: "12px", md: "16px" }}
            fontWeight={400}
            color="#979797"
          >
            {new Date(item.event.start_at).toLocaleString("en", {
              month: "long",
              day: "numeric",
              timeZone: "America/New_York",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </Box>
          <Font
            data-nobold
            size="14px"
            weight="600"
            bg={isEnded ? "#C6C6C6" : "#02D300"}
            color="white"
            px="10px"
            py="4px"
            rounded="4px"
            ml="5px"
          >
            {isEnded ? t("Ended") : t("In Progress")}
          </Font>
        </Flex>
      </Flex>
    </a>
  );
}
