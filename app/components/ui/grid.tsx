import { Grid as G, GridProps } from "@chakra-ui/react";
import useMobile from "~/hooks/useMobile";

type Props = {
  children: React.ReactNode | React.ReactNode[];
  itemWidth?: string;
} & GridProps & {
    w: any;
  };

export default function Grid(props: Props) {
  const { children, w = { base: "335px" }, ...rest } = props;

  const isMobile = useMobile();

  const itemWidth = isMobile ? w.base : w.md || w.base;

  return (
    <G
      templateColumns={`repeat(auto-fit, minmax(${itemWidth}, 1fr))`}
      gap="22px"
      {...rest}
    >
      {children}
    </G>
  );
}
