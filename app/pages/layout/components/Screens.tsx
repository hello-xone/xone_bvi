import { Flex, Tag } from "@chakra-ui/react";
import { useResponsive } from "ahooks";

export default function Screens() {
  const responsive = useResponsive();
  return (
    <Flex mr="auto" gap="5px">
      {Object.keys(responsive).map((key) => (
        <Tag.Root key={key} colorPalette={responsive[key] ? "green" : "red"}>
          <Tag.Label>{key}</Tag.Label>
        </Tag.Root>
      ))}
    </Flex>
  );
}
