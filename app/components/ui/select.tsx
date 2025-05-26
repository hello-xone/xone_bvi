import { JSX } from "react";
import {
  Portal,
  Select as SelectBase,
  SelectRootProps,
} from "@chakra-ui/react";
import useMobile from "~/hooks/useMobile";

type Props = {
  children?: (item?: any, index?: number) => JSX.Element | string;
  label?: string;
  placeholder?: string;
  contentMinWidth?: string;
} & SelectRootProps;

const Select = (props: Props) => {
  const {
    children,
    label,
    placeholder,
    collection,
    borderColor = "#979797",
    contentMinWidth = "max-content",
    ...args
  } = props;

  const isMoibile = useMobile();

  return (
    <SelectBase.Root
      collection={collection}
      w={{ base: "100vw", md: "max-content" }}
      minW="100px"
      h="44px"
      rounded="12px"
      pl="10px"
      fontSize="14px"
      fontWeight="500"
      defaultValue={[collection.items[0]?.value]}
      {...args}
    >
      <SelectBase.HiddenSelect />
      {!!label && <SelectBase.Label>{label}</SelectBase.Label>}
      <SelectBase.Control>
        <SelectBase.Trigger h="42px" rounded="12px" borderColor={borderColor}>
          <SelectBase.ValueText placeholder={placeholder} />
        </SelectBase.Trigger>
        <SelectBase.IndicatorGroup>
          <SelectBase.Indicator />
        </SelectBase.IndicatorGroup>
      </SelectBase.Control>
      <Portal>
        <SelectBase.Positioner css={isMoibile ? { "--x": "!0" } : {}}>
          <SelectBase.Content minW={{ base: "100vw", md: contentMinWidth }}>
            {collection.items.map((item, index) => {
              const childrenValue = children?.(item, index);
              if (typeof childrenValue === "object") {
                return childrenValue;
              } else {
                return (
                  <SelectBase.Item item={item} key={item.value}>
                    {children ?? item.label}
                    <SelectBase.ItemIndicator />
                  </SelectBase.Item>
                );
              }
            })}
          </SelectBase.Content>
        </SelectBase.Positioner>
      </Portal>
    </SelectBase.Root>
  );
};

Select.Item = SelectBase.Item;

export default Select;
