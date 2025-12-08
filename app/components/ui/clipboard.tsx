import { Flex, Clipboard as ClipboardBase } from "@chakra-ui/react";

export default function Clipboard({
  children,
  value,
}: {
  children?: React.ReactNode;
  value: string;
}) {
  return (
    <ClipboardBase.Root value={value}>
      <ClipboardBase.Trigger asChild>
        <Flex alignItems="center" gap="8px" cursor="pointer">
          {children ?? value}
          <ClipboardBase.Indicator />
        </Flex>
      </ClipboardBase.Trigger>
    </ClipboardBase.Root>
  );
}
