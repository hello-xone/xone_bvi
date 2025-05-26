import { Box, HTMLChakraProps } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type Props = {
  children?: React.ReactNode | string;
} & HTMLChakraProps<"span">;

export function UpdateTime(props: Props) {
  const { t } = useTranslation();
  const { children = t("The data was updated 5 minutes ago."), ...args } =
    props;
  return (
    <Box
      data-nobold
      fontSize={{ base: "10px", md: "14px" }}
      fontWeight="400"
      lineHeight="normal"
      color="#979797"
      {...args}
    >
      {children}
    </Box>
  );
}
