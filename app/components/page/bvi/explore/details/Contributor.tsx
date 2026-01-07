import {
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  Wrap,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";
import ChartArea from "~/components/ui/chart-area";
import Font from "~/components/ui/font";
import BaseTable, { type TableColumn } from "~/components/ui/table";
import { memberDownload, teamMember } from "~/api/modules/bvi";
import { useRequest } from "alova/client";
import dayjs from "dayjs";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useDebounce, useUpdateEffect } from "ahooks";
import AddressAvatar from "~/components/ui/address-avatar";

export default function Contributor() {
  const { t } = useTranslation();
  const [selectMember, setSelectMember] = useState([]);
  const [searchNo, setSearchNo] = useState("");
  const debouncedSearchNo = useDebounce(searchNo, { wait: 500 });

  const { data, send } = useRequest(teamMember, {
    force: true,
    immediate: false,
  });

  useUpdateEffect(() => {
    send({ address: debouncedSearchNo });
  }, [debouncedSearchNo]);

  // 然后修改columns定义
  const columns: TableColumn[] = [
    {
      key: "no",
      isSelected: () => true,
    },
    {
      key: "number",
      title: t("Number"),
      thClass: { w: "60px" },
      tdClass: { w: "60px", fontSize: "16px", fontWeight: 700 },
      render: ({ index }) => (
        <Center>
          {index < 3 ? (
            <ReactSVG src={`/images/icons/rank_${index + 1}.svg`} />
          ) : (
            index + 1
          )}
        </Center>
      ),
    },
    {
      key: "address",
      title: t("Address"),
      render: ({ current, Clipboard }) => (
        <AddressAvatar address={current} Clipboard={Clipboard} />
      ),
    },
    {
      key: "gv",
      title: t("Contribution to GV"),
      isSorter: true,
    },
    {
      key: "join_time",
      title: t("Joined on"),
      render: ({ current }) =>
        dayjs(current * 1000).format("MMMM DD, YYYY HH:mm:ss"),
    },
    {
      key: "last_time",
      title: t("Last Seen"),
      render: ({ current }) =>
        dayjs(current * 1000).format("MMMM DD, YYYY HH:mm:ss"),
    },
    {
      key: "activity",
      title: t("Activity level (30 D)"),
      render: ({ current }) => (
        <ChartArea data={current.map((value: number) => ({ value }))} />
      ),
    },
  ];

  return (
    <Flex
      flex="100%"
      gap="10px"
      direction="column"
      bg="white"
      p="20px"
      rounded="12px"
      maxW="-webkit-fill-available"
    >
      <Wrap alignItems="center" gap="10px">
        <Font size="14px" weight="600" px={{ base: 0, md: "20px" }}>
          {t("Selected")} {selectMember.length}
        </Font>
        {/* <Button
          variant="ghost"
          px="20px"
          fontSize="14px"
          fontWeight="600"
          color="black"
          rounded="12px"
          border="1px solid #979797"
        >
          Invite
        </Button>
        <Button
          variant="ghost"
          px="20px"
          fontSize="14px"
          fontWeight="600"
          color="black"
          rounded="12px"
          border="1px solid #979797"
        >
          Remove
        </Button> */}
        <Button
          variant="ghost"
          px="20px"
          fontSize="14px"
          fontWeight="600"
          color="black"
          rounded="12px"
          border="1px solid #979797"
          mr={{ base: 0, md: "auto" }}
          ml={{ base: "auto", md: 0 }}
          onClick={() => memberDownload({ no: debouncedSearchNo }).send(true)}
        >
          {t("Download")}
        </Button>
        <InputGroup
          w={{ base: "full", md: "max-content" }}
          startElement={<LuSearch />}
        >
          <Input
            placeholder="Enter address query"
            w={{ base: "full", md: "294px" }}
            rounded="8px"
            borderColor="#979797"
            onChange={(e) => setSearchNo(e.target.value)}
          />
        </InputGroup>
      </Wrap>
      <BaseTable
        data={data}
        request={{
          api: send,
          force: true,
          params: {
            no: debouncedSearchNo,
          },
        }}
        thClass={{
          textAlign: "center",
        }}
        tdClass={{
          fontSize: "14px",
          fontWeight: 500,
          height: "52px",
          textAlign: "center",
        }}
        columns={columns}
        selectionChange={setSelectMember}
      />
    </Flex>
  );
}
