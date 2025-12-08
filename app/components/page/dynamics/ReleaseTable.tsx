import {
  Box,
  Link,
  Table,
  Clipboard,
  useBreakpointValue,
} from "@chakra-ui/react";
import { formatUnits } from "viem";
import { useTranslation } from "react-i18next";
import { formatAddress } from "~/utils/format/address";
import { formatTSNumber } from "~/utils/format/number";
import { convertToUTC } from "./Records";

type Props = {
  records?: any[];
  timezone: string;
};

const ReleaseTable = (props: Props) => {
  const { t } = useTranslation();
  const { records = [], timezone } = props;

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box overflowX="auto">
      <Table.Root className="bg-[#f2f4f8]">
        <Table.Header>
          <Table.Row
            h={{ base: "60px", md: "80px" }}
            fontSize={{ base: "14px", md: "18px" }}
            className="font-[700] bg-[#FBFCFF] rounded-[12px]"
          >
            <Table.ColumnHeader border="none">
              {t("Address")}
            </Table.ColumnHeader>
            <Table.ColumnHeader border="none" minW="150px">
              {t("Time (UTC+0)")}
            </Table.ColumnHeader>
            <Table.ColumnHeader border="none" minW="150px">
              {t("Quantity (XOC)")}
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body data-nobold>
          {records.length ? (
            records.map((record) => (
              <Table.Row
                key={record.id}
                className="hover:bg-[#FFF0F0]"
                h={{ base: "60px", md: "80px" }}
                fontSize={{ base: "12px", md: "16px" }}
              >
                <Table.Cell border="none">
                  <Clipboard.Root
                    value={
                      isMobile ? formatAddress(record.address) : record.address
                    }
                  >
                    <Clipboard.Trigger asChild>
                      <Link as="span">
                        <Clipboard.ValueText />
                        <Clipboard.Indicator />
                      </Link>
                    </Clipboard.Trigger>
                  </Clipboard.Root>
                </Table.Cell>
                <Table.Cell border="none">
                  {convertToUTC(record.createdTime, timezone)}
                </Table.Cell>
                <Table.Cell border="none">
                  {formatTSNumber(formatUnits(BigInt(record.amountStr), 18))}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={3} textAlign="center" py="10">
                {t("No Data")}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default ReleaseTable;
