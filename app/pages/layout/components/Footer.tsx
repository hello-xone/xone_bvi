import { Stack } from "@chakra-ui/react";
import { useDebounce } from "ahooks";
import { useTranslation } from "react-i18next";
import Font from "~/components/ui/font";
import Grid from "~/components/ui/grid";
import useMobile from "~/hooks/useMobile";
import useSettingStore from "~/store/settingStore";

export default function Footer() {
  const { t } = useTranslation();

  const isMobile = useMobile();

  const {
    settings: { sidebar },
  } = useSettingStore();

  const debouncedSidebarIsOpen = useDebounce(sidebar, { wait: 200 });

  const fontStyle = {
    size: "12px",
    weight: 500,
  };

  const linkConfig = [
    { title: t("Media toolkit"), url: "https://docs.xone.org/study/media" },
    { title: t("White paper"), url: "https://docs.xone.org/study/wiki" },
    { title: t("Term of service"), url: "https://docs.xone.org/study/service" },
    { title: t("Privacy Policy"), url: "https://docs.xone.org/study/privacy" },
  ];

  return (
    <Stack
      hidden={!sidebar || !debouncedSidebarIsOpen}
      data-nobold
      mt="auto"
      px="14px"
      color="#404150"
      gap="18px"
    >
      <Font {...fontStyle}>{t("Let's embrace the future together")}</Font>
      <Grid w={{ base: "150px", md: "80px" }} gap="10px">
        {linkConfig.map((item, index) => (
          <Font
            key={index}
            {...fontStyle}
            _even={{ borderLeft: "1px solid #505868", pl: "10px" }}
          >
            <a href={item.url} target="_blank">
              {item.title}
            </a>
          </Font>
        ))}
      </Grid>
      <Font {...fontStyle}>© 2025 Xone.</Font>
    </Stack>
  );
}
