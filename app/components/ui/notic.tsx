import { Flex } from "@chakra-ui/react";
import { LuBell } from "react-icons/lu";

type Props = {
  children: React.ReactNode;
};

export default function Notic({ children }: Props) {
  return (
    <Flex
      data-nobold
      color="#FF0206"
      rounded="12px"
      bg="#FFF0F0"
      fontSize={{ base: "10px", md: "14px" }}
      fontWeight="400"
      alignItems="center"
      gap="10px"
      w={{ lg: "auto", xl: "max-content" }}
      maxW="100%"
      px="16px"
      py={{ base: "6px", md: "8px" }}
      overflowWrap="break-word"
      lineHeight="normal"
    >
      <LuBell className="text-[18px] min-w-[18px]" />
      {children}
    </Flex>
  );
}
