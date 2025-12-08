import {
  Box,
  Button,
  Center,
  DataList,
  Flex,
  Image,
  Stack,
  Clipboard,
  useUpdateEffect,
  Link,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { ReactSVG } from "react-svg";
import DialogBase from "~/components/ui/dialog";
import Font from "~/components/ui/font";
import Table from "~/components/ui/table";
import { formatTSNumber } from "~/utils/format/number";
import useMobile from "~/hooks/useMobile";

type Props = {
  show: boolean;
  data: any[];
  onCancel?: () => void;
};

export default function GVRelease(props: Props) {
  const { t } = useTranslation();

  const isMobile = useMobile();

  const { show = false, data = [], onCancel = () => {} } = props;

  const [step, setStep] = useState(1);

  const stepConfig = [
    {
      id: 1,
      title: t("Confirmation Information"),
      prompt: t(
        "Ensure that the selected release GV information and rates are correct."
      ),
    },
    {
      id: 2,
      title: t("Authorization Confirmation"),
      prompt: t("Confirm wallet authorization and start XOC release."),
    },
    { id: 3, title: t("Release Complete"), prompt: "" },
  ];

  const columns = [
    {
      key: "name",
      title: t("Season Name"),
    },
    {
      key: "gv",
      title: t("Obtain GV"),
    },
    {
      key: "fee",
      title: t("Fee"),
    },
  ];

  const totalGV = data.reduce((prev, cur) => prev + +cur.gv, 0);

  useUpdateEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        setStep(3);
      }, 2000);
    }
  }, [step]);

  const stats = [
    { label: t("Time (UTC+0)"), value: "2025-03-20 13:00:00" },
    {
      label: t("Hash"),
      value: "0x39df3ce12fa9c9e5981d9f48108e1e3c62",
      isClipboard: true,
    },
    {
      label: t("Block number"),
      value: "944853242",
    },
    {
      label: t("Quantity (XOC)"),
      value: formatTSNumber(10000),
    },
  ];

  const shares = [
    { name: "twitter" },
    { name: "ins" },
    { name: "telegram" },
    { name: "reddit" },
    { name: "tiktok" },
  ];

  const handleCancel = () => {
    onCancel();
    setStep(1);
  };

  return (
    <DialogBase
      data-nobold
      show={show}
      onCancel={handleCancel}
      title={t("Release My GV")}
    >
      <Box hidden={isMobile} pos="absolute" right="80px" top="17px">
        <ReactSVG src="/images/icons/gv_release.svg" />
      </Box>
      <Flex
        data-nobold
        justifyContent={{ base: "", md: "space-between" }}
        h="56px"
        rounded="8px"
        bg="#F2F4F8"
        pos="relative"
      >
        {stepConfig.map((item) => (
          <Flex
            key={item.id}
            pos="relative"
            alignItems="center"
            px={{ base: "11px", md: "23px" }}
            gap={{ base: "8px", md: "12px" }}
            fontSize="12px"
            fontWeight="500"
            color="#979797"
            rounded="8px"
            flex={{ base: 1, md: "auto" }}
            justifyContent={{ base: "center", md: "flex-start" }}
            bg={item.id === step ? "#FF0206" : ""}
          >
            <Center
              w={{ base: "24px", md: item.id === step ? "35px" : "24px" }}
              h={{ base: "24px", md: item.id === step ? "35px" : "24px" }}
              fontSize="18px"
              rounded="full"
              bg={item.id === step ? "white" : "#979797"}
              color={item.id === step ? "#FF0206" : "white"}
            >
              {item.id}
            </Center>
            <Box
              hidden={isMobile ? item.id !== step : false}
              fontSize={item.id === step ? "18px" : ""}
              color={item.id === step ? "white" : ""}
              textWrap="nowrap"
            >
              {item.title}
            </Box>
            {step === item.id && (
              <Box
                pos="absolute"
                bottom="-9px"
                left="50%"
                transform="translateX(-50%)"
              >
                <ReactSVG src="/images/icons/water_drop_arrow.svg" />
              </Box>
            )}
          </Flex>
        ))}
      </Flex>
      {!!stepConfig[step - 1].prompt && (
        <Font
          as="h3"
          mt="38px"
          mb="25px"
          size="16px"
          weight="500"
          color="#404150"
        >
          {stepConfig[step - 1].prompt}
        </Font>
      )}
      <Stack data-nobold>
        {step === 1 ? (
          <Stack gap="30px">
            <Stack border="1px solid #FF0206" gap="0" p="20px" rounded="12px">
              <Font size="14px" weight="600" pb="10px">
                {t("Selected")} {data.length}
              </Font>
              <Table
                pagination={false}
                isEmpty={false}
                columns={columns}
                data={{ list: data }}
              />
              <Flex
                bg="#FBFCFF"
                rounded="12px"
                h="52px"
                alignItems="center"
                justifyContent="space-between"
                px="20px"
                fontSize="18px"
                fontWeight="500"
              >
                <Box>{t("Total")}</Box>
                <Box>{formatTSNumber(totalGV)}</Box>
              </Flex>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                h="36px"
                px="20px"
              >
                <Flex alignItems="center" gap="5px">
                  <Font size="12px" weight="500" color="#979797">
                    {t("Available")}
                  </Font>
                  <AiOutlineQuestionCircle color="#B3B3B3" size="18px" />
                </Flex>
                <Font size="14px" weight="600">
                  ≈ {formatTSNumber(totalGV)}
                </Font>
              </Flex>
            </Stack>
            <Flex alignItems="center" gap="20px" pb="46px">
              <Button
                variant="ghost"
                flex="1"
                rounded="12px"
                h="48px"
                fontSize="18px"
                fontWeight="500"
                color="#FF0206"
                border="1px solid #FF0206"
                onClick={handleCancel}
              >
                {t("Cancel")}
              </Button>
              <Button
                flex="1"
                rounded="12px"
                h="48px"
                fontSize="18px"
                fontWeight="500"
                color="white"
                bg="#FF0206"
                onClick={() => setStep(2)}
              >
                {t("Go Releasing")}
              </Button>
            </Flex>
          </Stack>
        ) : step === 2 ? (
          <Center data-nobold py="100px">
            <Stack alignItems="center">
              <Box className="animate-spin" w="80px" h="80px">
                <ReactSVG src="/images/icons/loading.svg" />
              </Box>
              <Font
                color="#FF0206"
                pt="78px"
                lineHeight="1.5"
                textAlign={{ base: "center", md: "left" }}
              >
                {t(
                  "Please do not close this page and Authorize in the awakened wallet!"
                )}
              </Font>
            </Stack>
          </Center>
        ) : (
          <Stack mt="23px">
            <Image src="/images/bvi/release_complete.png" h="224px" />
            <DataList.Root orientation="horizontal" pt="30px">
              {stats.map((item) => (
                <DataList.Item key={item.label}>
                  <DataList.ItemLabel color="#404150" fontWeight="300">
                    {item.label}
                  </DataList.ItemLabel>
                  <DataList.ItemValue
                    color="black"
                    justifyContent="end"
                    fontWeight="500"
                  >
                    {item.isClipboard ? (
                      <Clipboard.Root value={item.value}>
                        <Clipboard.Trigger asChild>
                          <Link as="span" textStyle="sm">
                            <Clipboard.ValueText />
                            <Clipboard.Indicator />
                          </Link>
                        </Clipboard.Trigger>
                      </Clipboard.Root>
                    ) : (
                      item.value
                    )}
                  </DataList.ItemValue>
                </DataList.Item>
              ))}
            </DataList.Root>
            <Flex alignItems="center" gap="20px" pt="10px">
              <Font size="16px" weight="700" color="#404150">
                {t("Share to")}
              </Font>
              {shares.map((item: any, index: number) => (
                <Box key={index} cursor="pointer">
                  <ReactSVG src={`/images/icons/${item.name}.svg`} />
                </Box>
              ))}
            </Flex>
            <Button
              flex="1"
              rounded="12px"
              h="48px"
              minH="48px"
              mt="30px"
              w="50%"
              mx="auto"
              fontSize="18px"
              fontWeight="500"
              color="white"
              bg="#FF0206"
              onClick={handleCancel}
            >
              {t("Confirm")}
            </Button>
          </Stack>
        )}
      </Stack>
    </DialogBase>
  );
}
