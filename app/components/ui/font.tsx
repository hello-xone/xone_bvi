import { Box, type HTMLChakraProps } from "@chakra-ui/react";

type FontProps = {
  children: React.ReactNode | string;
  size?: string | number | { [k in string]: string | number };
  weight?: string | number;
  color?: string;
  line?: string;
} & HTMLChakraProps<"span">;

export default function Font({
  children,
  size = "16px",
  color = "#000",
  weight = 600,
  line = "normal",
  ...args
}: FontProps) {
  return (
    <Box
      as="span"
      fontSize={size}
      fontWeight={weight}
      color={color}
      lineHeight={line}
      {...args}
    >
      {children}
    </Box>
  );
}
