import {
  Button,
  CloseButton as CloseButtonBase,
  type ButtonProps,
} from "@chakra-ui/react";
import { ReactSVG } from "react-svg";

type Props = {
  children?: React.ReactNode;
} & ButtonProps;

export const PrimaryButton = ({ children, ...rest }: Props) => (
  <Button
    px="16px"
    gap="5px"
    bg="#FF0420"
    color="white"
    fontSize="14px"
    fontWeight="600"
    rounded="8px"
    h="40px"
    _hover={{
      bg: "#D9031B",
    }}
    transition="all 0.3s ease"
    {...rest}
  >
    {children}
  </Button>
);

export const BorderButton = ({ children }) => (
  <Button bg="blue.500" color="white" py="2" px="4" rounded="md">
    {children}
  </Button>
);

export const CloseButton = ({ ...rest }: Props) => (
  <CloseButtonBase variant="ghost" aria-label="Close" {...rest}>
    <ReactSVG src="/images/icons/close.svg" />
  </CloseButtonBase>
);
