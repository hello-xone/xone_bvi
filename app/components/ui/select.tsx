import { JSX, useState } from "react";
import {
  Box,
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

  const isMobile = useMobile();

  const [open, setOpen] = useState(false);

  return (
    <SelectBase.Root
      {...(isMobile ? { open } : {})}
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
        <SelectBase.Trigger
          w={{ base: "120px", md: "120px" }}
          h="44px"
          rounded="12px"
          borderColor={borderColor}
          onClick={() => setOpen(!open)}
        >
          <SelectBase.ValueText placeholder={placeholder} />
        </SelectBase.Trigger>
        <SelectBase.IndicatorGroup>
          <SelectBase.Indicator />
        </SelectBase.IndicatorGroup>
      </SelectBase.Control>
      <Portal>
        <SelectBase.Positioner
          pos={{ base: "!fixed", md: "!absolute" }}
          zIndex="!1005"
          css={
            isMobile
              ? {
                  "--x": "!0",
                  "--y": "!auto",
                  bottom: 0,
                  display: "flex",
                  "--reference-width": "!full",
                }
              : {}
          }
        >
          {open && isMobile && (
            <Box
              bg="blackAlpha.300"
              pos="fixed"
              zIndex="1"
              left="0"
              top="0"
              w="100vw"
              h="100vh"
              onClick={() => setOpen(false)}
            />
          )}
          <SelectBase.Content
            pos="relative"
            zIndex="2"
            data-nobold
            minW={{ base: "100vw", md: contentMinWidth }}
            rounded={{ base: "24px 24px 0 0", md: "4px" }}
            mt={{ base: "auto", md: "0" }}
            py={{ base: "15px", md: "5px" }}
            gap={{ base: "16px", md: "0" }}
            fontSize={{ base: "16px", md: "14px" }}
          >
            {collection.items.map((item, index) => {
              const childrenValue = children?.(item, index);
              if (typeof childrenValue === "object") {
                return childrenValue;
              } else {
                return (
                  <SelectBase.Item
                    item={item}
                    key={item.value}
                    pl={{ base: "20px", md: "8px" }}
                    mx={{ base: "10px", md: "0" }}
                    maxH={{ base: "!40px", md: "32px" }}
                    _checked={{
                      base: {
                        outline: "1px solid #FF0206",
                        rounded: "10px",
                        bg: "transparent",
                      },
                      md: {
                        bg: "rgba(0, 0, 0, 0.08)",
                        rounded: "3px",
                        outline: "none",
                      },
                    }}
                    onClick={() => setOpen(false)}
                  >
                    {children ?? item.label}
                    {!isMobile && <SelectBase.ItemIndicator />}
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
