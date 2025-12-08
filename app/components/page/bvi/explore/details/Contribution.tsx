import { Avatar, Button, Center, Flex, Stack, Wrap } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Font from "~/components/ui/font";
import Clipboard from "~/components/ui/clipboard";
import AllItems from "../AllItems";
import { useRequest } from "alova/client";
import { teamBehavior, teamContribute } from "~/api/modules/bvi";
import { useParams } from "@remix-run/react";
import TimeSelect from "../TimeSelect";
import { useEffect, useState } from "react";
import BaseTable, { type TableColumn } from "~/components/ui/table";
import dayjs from "dayjs";

type Props = {
  data: {
    contract: string;
    owner_address: string;
  };
};

export default function Contribution({ data }: Props) {
  const { t } = useTranslation();
  const { no } = useParams();

  const [time, setTime] = useState("");

  const { data: teamBehaviorRes }: any = useRequest(
    () => teamBehavior({ no }),
    {
      force: true,
      initialData: [],
    }
  );

  const { data: teamContributeRes, send }: any = useRequest(teamContribute, {
    force: true,
    initialData: {},
    immediate: false,
  });

  useEffect(() => {
    if (time) {
      send({
        no,
        time: parseInt(time),
        page_size: 10,
      });
    }
  }, [time]);

  const columns: TableColumn[] = [
    {
      key: "member",
      title: t("Address"),
      render: ({ current, Clipboard }) => (
        <Flex alignItems="center" gap="4px">
          <Avatar.Root variant="subtle" bg="#FF5D00" w="20px" h="20px">
            <Avatar.Fallback
              name={current[0]}
              fontSize="12px"
              color="white"
              lineHeight={{ base: "128%", md: "100%" }}
            />
          </Avatar.Root>
          <Clipboard>{current}</Clipboard>
        </Flex>
      ),
    },
    {
      key: "type",
      title: t("Method"),
      render: ({ current }) => (
        <Center
          bg="#F2F4F8"
          h="25px"
          px="12px"
          fontSize="14px"
          fontWeight="500"
          rounded="8px"
        >
          {current}
        </Center>
      ),
    },
    {
      key: "time",
      title: t("Time (UTC+0)"),
      render: ({ current }) =>
        dayjs(current * 1000).format("MMMM D YYYY HH:mm:ss"),
    },
    {
      key: "gv",
      title: t("Contribution to GV"),
    },
  ];

  return (
    <Stack gap={{ base: "16px", md: "30px" }}>
      <Font as="h3" size={{ base: "16px", md: "32px" }} weight="600">
        {t("Contribution")}
      </Font>
      <Stack p="20px" gap="20px" rounded="12px" bg="white">
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: "20px", md: "100px" }}
        >
          <Flex
            alignItems={{ base: "flex-start", md: "center" }}
            gap={{ base: "4px", md: "8px" }}
          >
            <Font size={{ base: "14px", md: "18px" }} weight="700">
              {t("Owner Address")}:
            </Font>
            <Font as="span" size="14px" weight="500" color="#979797">
              {!!data.owner_address ? (
                <Clipboard value={data.owner_address} />
              ) : (
                t("To Be Updated")
              )}
            </Font>
          </Flex>

          <Flex alignItems="center" gap={{ base: "4px", md: "8px" }}>
            <Font size={{ base: "14px", md: "18px" }} weight="700">
              {t("Contract")}:
            </Font>
            <Font as="span" size="14px" weight="500" color="#979797">
              {!!data.contract ? (
                <Clipboard value={data.contract} />
              ) : (
                t("To Be Updated")
              )}
            </Font>
          </Flex>
        </Flex>
        <Flex alignItems="baseline" gap={{ base: "4px", md: "8px" }}>
          <Font
            size={{ base: "14px", md: "18px" }}
            weight="700"
            textWrap="nowrap"
          >
            {t("Contribution behavior")}:
          </Font>
          <Wrap alignItems="center" gap={{ base: "4px", md: "8px" }}>
            {teamBehaviorRes.map((item, index) => (
              <Center
                key={index}
                bg="#F2F4F8"
                h="25px"
                px="12px"
                fontSize={{ base: "12px", md: "14px" }}
                fontWeight="500"
                rounded="8px"
              >
                {item}
              </Center>
            ))}
          </Wrap>
        </Flex>

        <Stack gap="20px">
          <Flex gap="12px" justifyContent="space-between">
            <Button
              variant="ghost"
              rounded="30px"
              h="30px"
              border="1px solid #3DABFF"
              fontWeight="700"
              fontSize={{ base: "12px", md: "18px" }}
              bg="#3DABFF"
              color="white"
            >
              {t("Download CSV")}
            </Button>
            <TimeSelect onChange={setTime} />
          </Flex>

          <BaseTable
            data={teamContributeRes}
            pagination={false}
            thClass={{
              textAlign: "center",
            }}
            tdClass={{
              fontSize: { base: "12px", md: "14px" },
              fontWeight: 500,
              height: "52px",
              textAlign: "center",
            }}
            columns={columns}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
