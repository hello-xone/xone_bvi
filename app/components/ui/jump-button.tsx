import { Button, type ButtonProps } from "@chakra-ui/react";
import { ReactSVG } from "react-svg";

type Props = {
  children?: React.ReactNode | undefined;
  to?: string;
  onClick?: () => void;
} & ButtonProps;

export default function JumpButton({
  children,
  to,
  onClick = () => {},
  ...args
}: Props) {
  return (
    <a href={to} target="_blank">
      <Button
        data-nobold
        h="26px"
        pl="12px"
        pr="8px"
        fontSize="12px"
        fontWeight="600"
        border="1px solid #E8E8E8"
        rounded="20px"
        variant="ghost"
        onClick={onClick}
        {...args}
      >
        {children}
        <ReactSVG src="/images/icons/jump.svg" />
      </Button>
    </a>
  );
}
