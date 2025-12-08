import { Flex, Box } from "@chakra-ui/react";
import { ReactSVG } from "react-svg";
import { Link } from "@remix-run/react";

type Props = {
  title: string;
  to: string;
};

export default function BreadcrumbH5({ title, to }: Props) {
  return (
    <Flex
      w="full"
      p="4px 16px"
      h="44px"
      alignItems="center"
      bg="#FFF"
      borderBottom={{ base: "1px solid #F2F4F8", md: "none" }}
    >
      <Link to={to}>
        <ReactSVG
          src="/images/icons/arrow.svg"
        />
      </Link>

      <Box
        pos="absolute"
        left="50%"
        transform="translateX(-50%)"
        fontSize="16px"
        display="flex"
        alignItems="center"
        fontWeight="700"
        data-nobold
        lineHeight="100%"
        textTransform="capitalize"
      >
        {title}
      </Box>
    </Flex>
  );
}
