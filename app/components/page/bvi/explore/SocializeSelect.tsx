"use client";

import {
  HStack,
  Select,
  createListCollection,
  useSelectContext,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";
import Font from "~/components/ui/font";

const SelectValue = () => {
  const { t } = useTranslation();
  const select = useSelectContext();
  const items = select.selectedItems as Array<{ name: string; icon: string }>;
  const { name, icon } = items?.[0] ?? {};
  return (
    <Select.ValueText>
      <HStack>
        <ReactSVG src={icon} className="[&_path]:fill-[#9FA2AB]" />
        {name}
      </HStack>
    </Select.ValueText>
  );
};

export default function SocializeSelect({
  value,
  selected,
  onChange,
}: {
  value: any;
  selected: any[];
  onChange: (value: any) => void;
}) {
  const { t } = useTranslation();
  const selectedIds = selected.map((item) => item.id);
  const items = socializes.items.filter(
    (item) => !selectedIds.includes(item.id)
  );
  return (
    <Select.Root
      collection={socializes}
      defaultValue={[value?.id]}
      positioning={{ sameWidth: true }}
      onValueChange={({ value }) => onChange(socializesObj[value as any])}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <SelectValue />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {items.length ? (
            items.map((item) => (
              <Select.Item
                item={item}
                key={item.id}
                justifyContent="flex-start"
              >
                <ReactSVG src={item.icon} className="[&_path]:fill-[#9FA2AB]" />
                {item.name}
                <Select.ItemIndicator />
              </Select.Item>
            ))
          ) : (
            <Font
              as="div"
              p="10px"
              textAlign="center"
              size="14px"
              weight="400"
              color="#777"
            >
              {t("No Data")}
            </Font>
          )}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}

export const socializes = createListCollection({
  items: [
    {
      name: "twitter",
      id: "twitter",
      icon: "/images/icons/twitter_diy.svg",
    },
    {
      name: "telegram",
      id: "telegram",
      icon: "/images/icons/telegram_diy.svg",
    },
    {
      name: "discord",
      id: "discord",
      icon: "/images/icons/discord_diy.svg",
    },
    {
      name: "website",
      id: "website",
      icon: "/images/icons/website_diy.svg",
    },
  ],
  itemToString: (item) => item.name,
  itemToValue: (item) => item.id,
});

const socializesObj = socializes.items.reduce(
  (curr, next) => ((curr[next.id] = next), curr),
  {}
);
