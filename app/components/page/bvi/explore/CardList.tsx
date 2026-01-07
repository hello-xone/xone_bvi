import { Stack, Wrap, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Item, { TItem } from "./Item";
import Font from "~/components/ui/font";

export type TCardList = {
  newest: TItem[];
  popular: TItem[];
  selected: TItem[];
};

export default function CardList({
  data: { newest = [], popular = [], selected = [] },
}: {
  data: TCardList;
}) {
  const { t } = useTranslation();
  const listAll = [
    {
      title: t("Featured"),
      list: selected,
    },
    {
      title: t("Popular"),
      list: popular,
    },
    {
      title: t("Newest"),
      list: newest,
    },
  ];

  const renderItem = () => {
    return listAll.map((v) => (
      <Stack
        gap={{ base: "16px", md: "20px" }}
        flex={{ base: "100%", md: "1" }}
      >
        <Font
          size={{ base: "24px", md: "32px" }}
          weight="600"
          data-nobold
          mb={{ base: "14px", md: "0" }}
        >
          {v.title}
        </Font>
        {v.list?.map((item) => (
          <Box
            p={{ base: "16px", md: 0 }}
            bg="white"
            rounded={{ base: "12px", md: "0" }}
          >
            <Item key={item.no} item={item} />
          </Box>
        ))}
      </Stack>
    ));
  };
  return (
    <Wrap
      bg={{ base: "#F2F4F8", md: "white" }}
      rounded="12px"
      p={{ base: 0, md: "20px" }}
      gap="20px"
    >
      {renderItem()}
    </Wrap>
  );
}
