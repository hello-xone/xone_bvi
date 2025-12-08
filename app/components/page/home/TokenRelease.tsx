import { Box, Button, Flex } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Chart from "./Chart";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export default function TokenRelease() {
  const { t } = useTranslation();
  return (
    <Flex direction="column" w="full" gap={{ base: "16px", md: "30px" }}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box as="h1" fontSize={{ base: "20px", md: "32px" }} fontWeight="700">
          {t("Token release")}
        </Box>
        <Link to="/dynamics/release">
          <Button
            variant="ghost"
            fontSize={{ base: "14px", md: "20px" }}
            fontWeight="400"
            color="#979797"
          >
            {t("See More")}
            <MdKeyboardArrowRight className="scale-125" />
          </Button>
        </Link>
      </Flex>
      <Box
        h={{ base: "315px", md: "330px" }}
        px={{ base: "10px", md: "28px" }}
        rounded="12px"
        bg="white"
      >
        <Chart
          data={{
            list: Array.from({ length: 31 }, (_, index) => ({
              day: `2025-03-${String(index + 1).padStart(2, "0")}`,
              xoc: String(Math.floor(Math.random() * 2000) + 100),
              transactions: String(Math.floor(Math.random() * 3000) + 500),
            })),
          }}
        />
      </Box>
    </Flex>
  );
}
