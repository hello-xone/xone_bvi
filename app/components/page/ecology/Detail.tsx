import {
  Drawer,
  Portal,
  Image,
  Box,
  Flex,
  Text,
  Grid,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ExternalLink from "~/components/ui/external-link";
import { ArrowIcon } from "~/components/icon";
import { ReactSVG } from "react-svg";
import { BiArrowBack } from "react-icons/bi";
import useMobile from "~/hooks/useMobile";

interface Props {
  open: boolean;
  setDrawerOpen: (open: boolean) => void;
  record: any;
}

const Detail = ({ open, setDrawerOpen, record }: Props) => {
  const { t } = useTranslation();
  const isMobile = useMobile();

  const reportList = [
    {
      title: t("Audit"),
      desc: t("Audit report"),
      icon: "/images/icons/audit.svg",
      link: record?.audit_report_link,
    },
    {
      title: t("Code"),
      desc: t("Github repository"),
      icon: "/images/icons/github.svg",
      link: record?.code_warehouse_link,
    },
    {
      title: t("White paper"),
      desc: t("Description"),
      icon: "/images/icons/paper.svg",
      link: record?.white_paper_link,
    },
  ].filter((item) => item.link);

  const contactList = [
    {
      key: "contact_website",
      icon: "/images/icons/contact_website.svg",
      link: record?.contact_website,
    },
    {
      key: "contact_twitter",
      icon: "/images/icons/contact_twitter.svg",
      link: record?.contact_twitter,
    },
    {
      key: "contact_discord",
      icon: "/images/icons/contact_discord.svg",
      link: record?.contact_discord,
    },
    {
      key: "contact_telegram",
      icon: "/images/icons/contact_telegram.svg",
      link: record?.contact_telegram,
    },
    {
      key: "contact_medium",
      icon: "/images/icons/contact_medium.svg",
      link: record?.contact_medium,
    },
    {
      key: "contact_facebook",
      icon: "/images/icons/contact_facebook.svg",
      link: record?.contact_facebook,
    },
    {
      key: "contact_youtube",
      icon: "/images/icons/contact_youtube.svg",
      link: record?.contact_youtube,
    },
  ].filter((item) => item.link);

  const renderContactIcons = () =>
    contactList.map((item) => (
      <ExternalLink to={item.link} hasIcon={false} key={item.key}>
        <ReactSVG
          src={item.icon}
          beforeInjection={(svg) => {
            svg.setAttribute("width", isMobile ? "20px" : "24px");
            svg.setAttribute("height", isMobile ? "20px" : "24px");
          }}
        />
      </ExternalLink>
    ));

  const renderTags = () =>
    record?.tags?.map((tag) => (
      <Box
        key={tag}
        p="5px 10px"
        bg="#FFF0F0"
        rounded="8px"
        fontSize={{ base: "10px", md: "14px" }}
      >
        {tag}
      </Box>
    ));

  const renderChains = () =>
    record?.chain?.map((ch) => (
      <Box cursor="pointer" key={ch.name}>
        <ReactSVG src={ch.logo} />
      </Box>
    ));
  return (
    <Drawer.Root open={open} onOpenChange={(e) => setDrawerOpen(e.open)}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content
            minW={{ base: "full", md: "942px" }}
            rounded={{ base: 0, md: "20px 0px 0px 20px" }}
            bg={{ base: "#F2F4F8", md: "#FFF" }}
          >
            {isMobile && (
              <Flex
                p="4px 16px"
                h="44px"
                alignItems="center"
                bg="#FFF"
                pos="relative"
              >
                <BiArrowBack size={24} onClick={() => setDrawerOpen(false)} />
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
                  {record?.name}
                </Box>
              </Flex>
            )}

            <Drawer.Body
              px={{ base: "16px", md: "30px" }}
              py={{ base: "16px", md: "40px 30px" }}
            >
              <Flex
                flexDirection="column"
                gap={{ base: "16px", md: "50px" }}
                my={{ base: 0, md: "50px" }}
              >
                {record?.dapp_image_link && (
                  <Image
                    rounded={{ base: "12px", md: "20px" }}
                    h={{ base: "180px", md: "404px" }}
                    src={record?.dapp_image_link}
                  />
                )}
                <Box
                  data-nobold
                  color="#FF0206"
                  rounded="8px"
                  fontWeight="400"
                  lineHeight="normal"
                  p="16px"
                  bg="#FFF0F0"
                  fontSize={{ base: "10px", md: "14px" }}
                >
                  {t(
                    "The current content is provided by application developers. Xone has no control over the content, privacy policies, or practices of any third-party websites or services, and assumes no responsibility. If you have any questions, please contact the project directly."
                  )}
                </Box>
                <Flex
                  flexDirection="column"
                  gap={{ base: "20px", md: "40px" }}
                  p="20px"
                  rounded="12px"
                  bg="#FFF"
                  border="1px solid #F2F4F8"
                >
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    alignItems={{ base: "flex-start", md: "center" }}
                    gap={{ base: "12px", md: 0 }}
                    justifyContent="space-between"
                  >
                    <Flex alignItems="center" gap="8px">
                      <Image
                        boxSize={{ base: "24px", md: "56px" }}
                        rounded={{ base: "24px", md: "56px" }}
                        src={record?.logo}
                      />
                      <Text
                        fontSize={{ base: "16px", md: "24px" }}
                        fontWeight="700"
                        color="#000"
                        mr="2"
                      >
                        {record?.name}
                      </Text>
                      <ExternalLink to={record?.url} hasIcon={false}>
                        <Button
                          data-nobold
                          bg="#FF0206"
                          h="26px"
                          pl="8px"
                          pr="4px"
                          py="6px"
                          rounded="8px"
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="normal"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {t("Website")}
                          <ArrowIcon
                            className="[&>svg]:fill-white ml-[-4px]"
                            style={{
                              width: isMobile ? "12px" : "16px",
                              height: isMobile ? "12px" : "16px",
                            }}
                          />
                        </Button>
                      </ExternalLink>
                    </Flex>
                    {contactList.length > 0 && (
                      <Flex alignItems="center" gap="16px">
                        <Box
                          color="#000"
                          fontWeight="700"
                          lineHeight="normal"
                          fontSize={{ base: "12px", md: "14px" }}
                        >
                          {t("Share")}
                        </Box>
                        <Flex
                          alignItems="center"
                          gap={{ base: "4px", md: "16px" }}
                        >
                          {renderContactIcons()}
                        </Flex>
                      </Flex>
                    )}
                  </Flex>
                  <Box
                    data-nobold
                    color="#404150"
                    fontSize={{ base: "12px", md: "16px" }}
                    fontWeight="400"
                    lineHeight="normal"
                  >
                    {record?.content.en}
                  </Box>
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    gap={{ base: "24px", md: 0 }}
                    alignItems={{ base: "flex-start", md: "center" }}
                    justifyContent="space-between"
                  >
                    <Flex gap="24px">{renderChains()}</Flex>
                    <Flex gap="16px">{renderTags()}</Flex>
                  </Flex>
                </Flex>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                  gap={{ base: "20px", md: "24px" }}
                >
                  {reportList
                    .filter((v) => v.link)
                    ?.map((item) => (
                      <ExternalLink
                        to={item?.link}
                        hasIcon={false}
                        key={item.title}
                      >
                        <Flex
                          flex={1}
                          flexDirection="column"
                          gap={{ base: "16px", md: "24px" }}
                          px="20px"
                          py="16px"
                          rounded="12px"
                          bg="#FFF"
                          border="1px solid #F2F4F8"
                        >
                          <Box
                            color="#000"
                            fontSize={{ base: "16px", md: "24px" }}
                            fontWeight="700"
                            textTransform="capitalize"
                          >
                            {item.title}
                          </Box>
                          <Flex gap="12px" alignItems="center">
                            <ReactSVG src={item.icon} />
                            <Box
                              color="#404150"
                              fontSize={{ base: "14px", md: "16px" }}
                              fontWeight="400"
                              lineHeight="normal"
                              data-nobold
                            >
                              {item.desc}
                            </Box>
                          </Flex>
                        </Flex>
                      </ExternalLink>
                    ))}
                </Grid>
              </Flex>
            </Drawer.Body>
            {!isMobile && (
              <Drawer.CloseTrigger asChild pr="30px" cursor="pointer">
                <ReactSVG src="/images/icons/close.svg" />
              </Drawer.CloseTrigger>
            )}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default Detail;
