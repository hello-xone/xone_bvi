import { Clipboard as ClipboardBase, Box, Flex } from "@chakra-ui/react";

type Props = {
  children?: React.ReactNode;
  value: string;
};

export default function Clipboard({ children, value }: Props) {
  return (
    <ClipboardBase.Root value={value}>
      <ClipboardBase.Trigger asChild>
        <Flex
          data-nobold
          flexWrap="wrap"
          overflowWrap="anywhere"
          alignItems="center"
          gap="8px"
          cursor="pointer"
          verticalAlign="middle"
        >
          {children ?? value}
          <ClipboardBase.Indicator display="inline-block" mx="5px" />
        </Flex>
      </ClipboardBase.Trigger>
    </ClipboardBase.Root>
  );
}
