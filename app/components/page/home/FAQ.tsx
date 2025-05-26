import { Accordion, Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation();
  const items = [
    {
      title: t("Q1_title"),
      text: t("Q1_text"),
    },
    {
      title: t("Q2_title"),
      text: t("Q2_text"),
    },    {
      title: t("Q3_title"),
      text: t("Q3_text"),
    },    {
      title: t("Q4_title"),
      text: t("Q4_text"),
    },    {
      title: t("Q5_title"),
      text: t("Q5_text"),
    },
  ];

  const [active, setActive] = useState<string>("");

  const onValueChange = ({ value }: any) => {
    setActive(value[0]);
  };

  return (
    <Flex direction="column" gap="20px">
      <Box
        as="h1"
        fontSize={{ base: "20px", md: "42px" }}
        px={{ base: "20px", md: 0 }}
        py={{ base: "10px", md: 0 }}
        fontWeight="700"
        pb={{ base: "5px", md: "20px" }}
      >
        {t("FAQ")}
      </Box>
      <Accordion.Root collapsible multiple onValueChange={onValueChange}>
        {items.map((item, index) => (
          <Accordion.Item
            key={index}
            value={`${index}`}
            rounded="12px"
            bg="white"
            px={{ base: "20px", md: "40px" }}
            py={{ base: "20px", md: "30px" }}
            mb="20px"
            _last={{ mb: 0 }}
          >
            <Accordion.ItemTrigger>
              <Flex w="full" justifyContent="space-between" alignItems="center">
                <Box
                  flex="1"
                  fontSize={{ base: "16px", md: "28px" }}
                  lineHeight={{ base: "normal", md: 1 }}
                  pr="20px"
                  fontWeight="600"
                  cursor="pointer"
                >
                  {item.title}
                </Box>
                {active === `${index}` ? (
                  <IoIosRemoveCircleOutline className="scale-[1.7]" />
                ) : (
                  <IoIosAddCircleOutline className="scale-[1.7]" />
                )}
              </Flex>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent rounded="0">
              <Accordion.ItemBody
                fontSize={{ base: "12px", md: "16px" }}
                fontWeight="600"
                color="#979797"
              >
                <Box
                  px="40px"
                  mt={{ base: "0", md: "20px" }}
                  mb={{ base: "15px", md: "30px" }}
                  borderTop="1px solid #F2F4F8"
                />
                {item.text}
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Flex>
  );
}
