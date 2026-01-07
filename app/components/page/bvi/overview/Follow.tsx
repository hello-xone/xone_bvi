import { Avatar, AvatarGroup, Box, Center } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { SeasonData } from "~/routes/($lang).bvi.overview";

type Props = {
  data: SeasonData;
};

export default function Follow(props: Props) {
  const { t } = useTranslation();
  const { join_num = 0, join_account = [] } = props.data || {};

  return (
    <Center pt={{ base: "22px", md: "38px" }} pb={{ base: "20px", md: "42px" }}>
      <Box
        fontSize={{ base: "16px", md: "48px" }}
        fontWeight="600"
        lineHeight="normal"
      >
        <Box as="span" color="#FF0206" mr="10px">
          {t("Follow")}
        </Box>
        {t("them together")}
      </Box>
      <AvatarGroup
        gap="0"
        spaceX={{ base: "-8px", md: "-20px" }}
        pl={{ base: "8px", md: "25px" }}
      >
        {join_account.map((avatar, index) => (
          <Avatar.Root
            key={index}
            bg="white"
            w={{ base: "22px", md: "60px" }}
            h={{ base: "22px", md: "60px" }}
          >
            <Avatar.Fallback name={avatar} />
            <Avatar.Image
              minW={{ base: "22px", md: "60px" }}
              minH={{ base: "22px", md: "60px" }}
              src={avatar}
              bg="white"
              border="2px solid white"
            />
          </Avatar.Root>
        ))}
      </AvatarGroup>
      <Box
        pl={{ base: "8px", md: "25px" }}
        fontSize={{ base: "12px", md: "36px" }}
        fontWeight="500"
        color="#404150"
      >
        {join_num} +
      </Box>
    </Center>
  );
}
