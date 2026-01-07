import { Avatar, Flex } from "@chakra-ui/react";
import useHashAvatar from "~/hooks/useHashAvatar";

export default function AddressAvatar({
  address,
  Clipboard,
}: {
  address: string;
  Clipboard: any;
}) {
  const avatar = useHashAvatar(address);

  return (
    <Flex alignItems="center" gap="4px">
      <Avatar.Root variant="subtle" w="20px" h="20px">
        <Avatar.Image src={avatar} />
      </Avatar.Root>
      <Clipboard>{address}</Clipboard>
    </Flex>
  );
}
