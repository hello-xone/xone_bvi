import {
  Avatar,
  Stack,
  Flex,
  AvatarGroup,
  StackProps,
  Box,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { ReactSVG } from "react-svg";
import Font from "~/components/ui/font";
import Platforms from "./Platforms";
import { useNavigate } from "@remix-run/react";
import useHashAvatar from "~/hooks/useHashAvatar";
import { getSrcPath } from "~/utils/file";

export type TItem = {
  no: string;
  logo: string;
  type: string;
  join_num: number;
  website: string;
  discord: string;
  telegram: string;
  title: string;
  twitter: string;
  join_account: string[];
};

type Props = {
  children?: React.ReactNode;
  item: TItem;
  size?: "mini" | "big";
} & StackProps;

const styleConfig = {
  mini: {
    wrap: {
      px: "12px",
      py: "12px",
      gap: "5px",
    },
    avatar: {
      w: {
        base: "24px",
        md: "32px",
      },
      h: {
        base: "24px",
        md: "32px",
      },
    },
    title: {
      fontSize: "16px",
    },
    count: {
      fontSize: "14px",
    },
  },
  big: {
    wrap: {
      px: { base: "16px", md: "20px" },
      py: { base: "16px", md: "20px" },
      gap: "12px",
    },
    avatar: {
      w: {
        base: "24px",
        md: "42px",
      },
      h: {
        base: "24px",
        md: "42px",
      },
    },
    title: {
      fontSize: { base: "16px", md: "20px" },
    },
    count: {
      fontSize: "14px",
    },
  },
};

export default function Item(props: Props) {
  const { children, item, size = "big", ...args } = props;

  const navigate = useNavigate();

  const num = useMemo(() => {
    return item.join_num > 1000 ? 1000 + "+" : item.join_num;
  }, [item.join_num]);

  item.join_account = Array.from({ length: item.join_num }, (_, i) => `${i}`);

  item.join_account = useHashAvatar(item.join_account);

  return (
    <Stack
      w="full"
      bg="white"
      py={styleConfig[size].wrap.py}
      px={styleConfig[size].wrap.px}
      rounded="12px"
      border="1px solid #F2F4F8"
      gap={styleConfig[size].wrap.gap}
      {...args}
      onClick={() => navigate(`/bvi/explore/${item.type}/${item.no}`)}
      cursor={"pointer"}
    >
      <Flex gap="12px" alignItems="center">
        <Avatar.Root
          w={styleConfig[size].avatar.w}
          h={styleConfig[size].avatar.h}
        >
          <Avatar.Image src={getSrcPath(item.logo)} />
        </Avatar.Root>
        <Font size={styleConfig[size].title.fontSize} weight="700">
          {item.title}
        </Font>

        {children ?? (
          <Flex
            ml="auto"
            alignItems="center"
            rounded={{ base: "4px", md: "8px" }}
            gap="4px"
            px={{ base: "6px", md: "10px" }}
            py={{ base: "3px", md: "5px" }}
            bg={item.type === "organization" ? "#D0E9FF" : "#C2F6C1"}
          >
            {item.type === "organization" && (
              <ReactSVG src="/images/icons/tag_v.svg" />
            )}
            {item.type === "project" && (
              <ReactSVG src="/images/icons/tag_group.svg" />
            )}

            <Font
              size={{ base: "12px", md: "14px" }}
              weight="600"
              _firstLetter={{ textTransform: "uppercase" }}
              color={item.type === "organization" ? "#3DABFF" : "#02D300"}
            >
              {item.type}
            </Font>
          </Flex>
        )}
      </Flex>
      <Flex alignItems="center" h="36px">
        {!!item.join_num && (
          <>
            <AvatarGroup gap="0" spaceX={{ base: "-6px", md: "-10px" }}>
              {item.join_account?.slice?.(0, 3)?.map?.((avatar, index) => (
                <Avatar.Root
                  key={index}
                  w={{ base: "20px", md: "28px" }}
                  h={{ base: "20px", md: "28px" }}
                  m="0"
                >
                  <Avatar.Image src={avatar} />
                </Avatar.Root>
              ))}
            </AvatarGroup>
            <Font
              pl="5px"
              size={styleConfig[size].count.fontSize}
              weight="500"
              color="#404150"
            >
              {num}
            </Font>
          </>
        )}
        <Box ml="auto" onClick={(e) => e.stopPropagation()}>
          <Platforms item={item} />
        </Box>
      </Flex>
    </Stack>
  );
}
