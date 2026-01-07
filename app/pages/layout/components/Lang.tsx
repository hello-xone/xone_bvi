import { Box, Button, Flex, Popover } from "@chakra-ui/react";
import { useState, useMemo } from "react";
import i18n from "i18next";
import { ReactSVG } from "react-svg";
import { changeLanguage, langs } from "~/i18n";
import { useNavigate } from "@remix-run/react";
import useMobile from "~/hooks/useMobile";
import clsx from "clsx";
import Font from "~/components/ui/font";
import { useTranslation } from "react-i18next";
import { CloseButton } from "~/components/ui/button";

export default function Lang() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobile = useMobile();

  const currentLanguage = useMemo(() => {
    const fallback = langs.find((item) => item.value === "en");
    return (
      langs.find((item) => {
        return item.value === i18n.language;
      }) || fallback
    );
  }, [i18n.language]);

  const handleChangeLanguage = async (type: string) => {
    await changeLanguage(type);
    const currentPath = window.location.pathname.split("/").slice(2).join("/");
    const newPath = `/${type}/${currentPath}`;
    navigate(newPath, {
      preventScrollReset: true,
    });
    setOpen(false);
  };

  return (
    <Popover.Root
      open={open}
      modal={isMobile}
      positioning={{ placement: "bottom-end" }}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Popover.Trigger asChild>
        <Button
          order={{ base: 1, md: "inherit" }}
          variant={{ base: "ghost", md: "subtle" }}
          rounded="12px"
          bg={{ base: "none", md: "rgba(0, 0, 0, 0.20)" }}
          _hover={{ bg: "rgba(0, 0, 0, 0.40)" }}
          _open={{ bg: "rgba(0, 0, 0, 0.20)" }}
          color="#FFF"
        >
          <ReactSVG
            src="/images/icons/global.svg"
            className={clsx({
              "scale-[1.4]": isMobile,
              "[&_path]:!fill-[black]": isMobile,
            })}
          />
          {!isMobile && currentLanguage?.label}
        </Button>
      </Popover.Trigger>
      <Popover.Positioner
        h={{ base: "100vh", md: "max-content" }}
        css={isMobile ? { "--y": "!0", "--x": "!0", display: "flex" } : {}}
      >
        {open && isMobile && (
          <Box
            bg="blackAlpha.300"
            pos="fixed"
            zIndex="1"
            left="0"
            top="0"
            w="100vw"
            h="100vh"
          />
        )}
        <Popover.Content
          pos="relative"
          zIndex="2"
          w={{ base: "100vw", md: "max-content" }}
          h="max-content"
          rounded={{ base: "24px 24px 0 0", md: "16px" }}
          pb={{ base: "20px", md: "0" }}
          mt={{ base: "auto", md: "0" }}
        >
          <Popover.CloseTrigger />
          <Popover.Body p="16px" rounded="16px">
            <Flex
              direction="column"
              gap={{ base: "16px", md: "5px" }}
              w={{ base: "full", md: "200px" }}
            >
              <Flex
                hidden={!isMobile}
                alignItems="center"
                justifyContent="space-between"
              >
                <Font size="20px" weight="600">
                  {t("Language")}
                </Font>
                <CloseButton scale="1.5" onClick={() => setOpen(false)} />
              </Flex>
              {langs.map((item) => {
                const isSelected = item.value === i18n.language;
                return (
                  <Flex
                    data-nobold
                    key={item.value}
                    alignItems="center"
                    cursor="pointer"
                    justifyContent="space-between"
                    fontWeight="400"
                    fontSize={{ base: "16px", md: "14px" }}
                    lineHeight="normal"
                    pr="8px"
                    pl={{ base: "calc(50% - 30px)", md: "8px" }}
                    h="40px"
                    data-state={isSelected ? "checked" : "unchecked"}
                    _checked={{
                      base: {
                        outline: "1px solid #FF0206",
                        rounded: "10px",
                      },
                      md: {
                        bg: "rgba(0, 0, 0, 0.08)",
                        rounded: "8px",
                        outline: "none",
                      },
                    }}
                    _hover={{
                      bg: "rgba(0, 0, 0, 0.08)",
                      rounded: "8px",
                    }}
                    onClick={() => handleChangeLanguage(item.value)}
                  >
                    {item.label}
                    {isSelected && !isMobile && (
                      <ReactSVG src="/images/icons/check.svg" />
                    )}
                  </Flex>
                );
              })}
            </Flex>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
