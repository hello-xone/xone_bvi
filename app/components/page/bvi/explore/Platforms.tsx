import { Box, Flex, IconButton } from "@chakra-ui/react";
import { ReactSVG } from "react-svg";

type Props = {
  item: {
    telegram: string;
    twitter: string;
    website: string;
    discord: string;
  };
  color?: string;
};

export default function Platforms({ item, color = "#9FA2AB" }: Props) {
  return (
    <Flex alignItems="center" gap="4px">
      <ReactSVG src="" className={`hidden [&_path]:!fill-[#9FA2AB]`} />
      {!!item.telegram && (
        <Box cursor="pointer">
          <a href={item.telegram} target="_blank">
            <ReactSVG
              src="/images/icons/telegram_diy.svg"
              className={`[&_path]:!fill-[${color}]`}
            />
          </a>
        </Box>
      )}
      {!!item.twitter && (
        <Box cursor="pointer">
          <a href={item.twitter} target="_blank">
            <ReactSVG
              src="/images/icons/twitter_diy.svg"
              className={`[&_path]:!fill-[${color}]`}
            />
          </a>
        </Box>
      )}
      {!!item.website && (
        <Box cursor="pointer">
          <a href={item.website} target="_blank">
            <ReactSVG
              src="/images/icons/website_diy.svg"
              className={`[&_path]:!fill-[${color}]`}
            />
          </a>
        </Box>
      )}
      {!!item.discord && (
        <Box cursor="pointer">
          <a href={item.discord} target="_blank">
            <ReactSVG
              src="/images/icons/discord_diy.svg"
              className={`[&_path]:!fill-[${color}]`}
            />
          </a>
        </Box>
      )}
    </Flex>
  );
}
