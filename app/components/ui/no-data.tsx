import { Spinner, Stack, StackProps } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";
import Font from "./font";

type Props = {
  loading?: boolean;
} & StackProps;

export default function NoData({ loading = false, ...rest }: Props) {
  const { t } = useTranslation();
  return (
    <Stack m="auto" alignItems="center" gap="0" {...rest}>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <ReactSVG src="/images/icons/no_data.svg" />
          <Font size="14px" weight="600" mx="auto">
            {t("No Data")}
          </Font>
        </>
      )}
    </Stack>
  );
}
