import { SegmentGroup } from "@chakra-ui/react";
import { useEffect } from "react";
import { useUpdateUrlParams } from "~/hooks/useUpdateUrlParams";

export default function TimeSelect({
  paramKey = "time",
  onChange,
}: {
  paramKey?: string;
  onChange: (time: string) => void;
}) {
  const { param: time, updateParam } = useUpdateUrlParams({
    key: paramKey,
    defaultParam: "7D",
  });

  useEffect(() => {
    onChange(time);
  }, [time]);

  return (
    <SegmentGroup.Root
      value={time}
      size="sm"
      h="30px"
      colorPalette="border"
      rounded="16px"
      p="3px"
      bg="white"
      shadow="none"
      border="1px solid #E8E8E8"
      onValueChange={({ value }) => updateParam(value)}
    >
      <SegmentGroup.Indicator
        h="22px"
        rounded="20px"
        bg="#FFF0F0"
        shadow="none"
        px="10px"
      />
      <SegmentGroup.Items
        items={["7D", "30D"]}
        _checked={{ color: "#FF0206" }}
        fontSize="12px"
        fontWeight="600"
        h="22px"
        px="10px"
        cursor="pointer"
      />
    </SegmentGroup.Root>
  );
}
