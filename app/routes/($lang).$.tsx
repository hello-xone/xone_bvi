import { Center, ClientOnly, Flex, Stack } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Font from "~/components/ui/font";
import { useTranslation, Trans } from "react-i18next";

export default function SeparatorDemo() {
  const { t } = useTranslation();
  return (
    <ClientOnly>
      <Center h="100vh">
        <Stack maxW="500px">
          <Font size="48px" weight="800" lineHeight="52px">
            {t("Page Not Found")}
          </Font>
          <Font as="div" size="16px" weight="400" pt="24px" pb="48px">
            <Trans i18nKey="pageNotFoundMessage">
              We're sorry! The page you're looking for could not be found. You can try
              <Link to="" className="text-[#FF0206] px-[5px] hover:underline">
                refreshing
              </Link>
              the page or
              <Link to="/" className="text-[#FF0206] px-[5px] hover:underline">
                returning to the homepage
              </Link>
              .
            </Trans>
          </Font>
          <Flex
            fontSize="18px"
            fontWeight="600"
            color="#FF0206"
            textDecorationLine="underline"
            alignItems="center"
            cursor="pointer"
            gap="6px"
          >
            {t("Contact us for further assistance!")}
            <MdOutlineKeyboardArrowRight color="#FF0206" size="24px" />
          </Flex>
        </Stack>
      </Center>
    </ClientOnly>
  );
}
