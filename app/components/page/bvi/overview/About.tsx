import { Box, Flex } from "@chakra-ui/react";
import { ReactSVG } from "react-svg";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import useMobile from "~/hooks/useMobile";

export default function About() {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const resources = [
    {
      icon: "/images/icons/about_1.svg",
      title: t("Developer resources"),
      description: t("Access comprehensive tools and documentation."),
    },
    {
      icon: "/images/icons/about_2.svg",
      title: t("Engagement opportunities"),
      description: t(
        "Connect with an engaged user base for feedback and adoption."
      ),
    },
  ];

  return (
    <Flex flex="1" direction="column">
      <Box
        as="h1"
        fontSize={{ base: "20px", md: "42px" }}
        px={{ base: 0, md: "20px" }}
        pb={{ base: "20px", md: "30px" }}
        fontWeight="700"
        lineHeight="normal"
      >
        {t("About BVI, you need to know")}
      </Box>
      <Flex
        direction="column"
        py={{ base: "10px", md: "30px" }}
        px={{ base: "16px", md: "40px" }}
        gap={{ base: "20px", md: "30px" }}
        rounded="12px"
        bg="white"
      >
        {resources.map((resource, index) => (
          <Flex
            key={index}
            h={{ base: "auto", md: "198px" }}
            px={{ base: "15px", md: "40px" }}
            py={{ base: "20px", md: "30px" }}
            bg="#F8F8F8"
            alignItems={{ base: "center", md: "flex-start" }}
            rounded="12px"
          >
            <ReactSVG
              src={resource.icon}
              className={clsx({
                "[&_svg]:w-[100px]": isMobile,
                "[&_svg]:h-[60px]": isMobile,
              })}
            />
            <Flex
              direction="column"
              justifyContent="center"
              gap={{ base: "12px", md: "5px" }}
              mb="auto"
              mt={{ base: 0, md: "10px" }}
            >
              <Box
                as="h3"
                fontSize={{ base: "14px", md: "28px" }}
                fontWeight="800"
              >
                {resource.title}
              </Box>
              <Box
                data-nobold
                fontSize={{ base: "12px", md: "16px" }}
                fontWeight="500"
                color="#5F6066"
              >
                {resource.description}
              </Box>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
