import { Box, Flex, Stack } from "@chakra-ui/react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";

import "~/styles/activity.less";
import ActivityItem from "./ActivityItem";
import useMobile from "~/hooks/useMobile";

export type EntriesItem = {
  api_id: string;
  event: {
    api_id: string;
    name: string;
    start_at: string;
    end_at: string;
    cover_url: string;
    url: string;
    description: string;
  };
};

export default function Activity({ entries }: { entries: EntriesItem[] }) {
  const { t } = useTranslation();
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: entries?.length > 4,
    draggable: entries?.length > 4,
  };

  const isMobile = useMobile();

  const Wrap = ({ children }: { children: React.ReactNode }) =>
    isMobile ? (
      <Stack gap="20px">{children}</Stack>
    ) : (
      <Slider {...settings}>{children}</Slider>
    );

  return (
    <Flex direction="column" gap={{ base: "16px", md: "40px" }}>
      <Box as="h1" fontSize={{ base: "20px", md: "42px" }} fontWeight="700">
        {t("Activity")}
      </Box>
      <Box fontSize={{ base: "12px", md: "16px" }} fontWeight="700">
        {t(
          "Explore Xone's future vision and growth path, and witness how we drive the advancement of blockchain technology. From technological innovation to community building, Xone creates unlimited opportunities for users and developers, jointly ushering in a new era of decentralization"
        )}
      </Box>
      <Wrap>
        {entries.map((item) => (
          <ActivityItem key={item.api_id} item={item} />
        ))}
      </Wrap>
    </Flex>
  );
}
