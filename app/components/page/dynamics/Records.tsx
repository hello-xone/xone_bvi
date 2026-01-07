import {
  Box,
  Button,
  createListCollection,
  Flex,
  Spinner,
  Text,
  Wrap,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useMemo, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";

import ExternalLink from "~/components/ui/external-link";
import SearchInput from "~/components/ui/search-input";
import { toaster } from "~/components/ui/toaster";
import ReleaseTable from "./ReleaseTable";
import { formatAddress } from "~/utils/format/address";
import { debounce } from "~/utils/helper";
import Select from "~/components/ui/select";

import { useNavigate } from "@remix-run/react";
import { DataType } from "~/routes/($lang).dynamics.release";
import RangePicker from "~/components/ui/range-picker";
import NoData from "~/components/ui/no-data";

dayjs.extend(utc);
dayjs.extend(timezone);

const ALLOWED_TIMEZONES = [
  { label: "UTC-8", value: "Etc/GMT+8" },
  { label: "UTC+0", value: "UTC" },
  { label: "UTC+1", value: "Etc/GMT-1" },
  { label: "UTC+7", value: "Asia/Bangkok" },
  { label: "UTC+8", value: "Asia/Shanghai" },
  { label: "UTC+9", value: "Asia/Tokyo" },
];

type SearchData = {
  pageNum: number;
  pageSize: number;
  startDate: any;
  endDate: any;
  timezone: string;
  searchValue: string;
};

export const convertToUTC = (
  date: any,
  timezone?: string,
  format = "YYYY-MM-DD HH:mm:ss"
) => {
  if (!date) return "";
  // 服务端返回的是UTC+0时间，需要转换为指定时区显示
  const utcDate = dayjs.utc(date);
  const zonedDate = utcDate.tz(timezone || "Asia/Shanghai");
  return dayjs.isDayjs(date)
    ? new Date(zonedDate.format(format)).getTime()
    : zonedDate.format(format);
};

const Records = ({ data }: { data: DataType }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState<SearchData>({
    pageNum: 1,
    pageSize: 10,
    startDate: dayjs().subtract(7, "day"),
    endDate: dayjs(),
    timezone: "Asia/Shanghai",
    searchValue: "",
  });

  const currentTimezoneLabel = ALLOWED_TIMEZONES.find(
    (item) => item.value === searchData.timezone
  ).label;

  useEffect(() => {
    const { pageNum, pageSize, startDate, endDate, searchValue, timezone } =
      searchData;
    const startTime = startDate ? convertToUTC(startDate, timezone) : "";
    const endTime = endDate ? convertToUTC(endDate, timezone) : "";

    navigate(
      `?pageNum=${pageNum}&pageSize=${pageSize}&startTime=${startTime}&endTime=${endTime}&address=${searchValue}`,
      {
        preventScrollReset: true,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);

  const hasMore = data.current < data.pages;

  const [inputValue, setInputValue] = useState("");
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.current === 1) {
      setRecords(data.records);
    } else {
      setRecords((pre) => [...pre, ...data.records]);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleDebounceSearch = useMemo(
    () =>
      debounce((value: string) => {
        updateSearchData({
          searchValue: value,
        });
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    handleDebounceSearch(inputValue);
  }, [inputValue, handleDebounceSearch]);

  const updateSearchData = (updates: Partial<typeof searchData>) => {
    setSearchData((prev) => ({
      ...prev,
      ...updates,
      pageNum: updates.pageNum ?? 1,
    }));
  };

  const handleLoadMore = () => {
    setLoading(true);
    updateSearchData({
      pageNum: searchData.pageNum + 1,
    });
  };

  const handleSearch = (value: string | React.FormEvent<HTMLDivElement>) => {
    const searchValue = typeof value === "string" ? value : "";
    setInputValue(searchValue);
  };

  const handleTimezoneChange = (e: any) => {
    updateSearchData({ timezone: e.value[0] });
  };

  const onChange = (dates: any) => {
    const [startDate, endDate] = dates || [];
    if (!validateDateRange(startDate, endDate)) return;

    updateSearchData({
      startDate,
      endDate,
    });
  };

  const validateDateRange = (start: any, end: any) => {
    if (!start && !end) return true;
    if (!start || !end) return false;
    const diff = end.diff(start, "hour");
    if (diff < 1) {
      toaster.create({
        description: "The time range cannot be less than 1 hour",
        type: "error",
      });
      return false;
    } else if (diff > 2160) {
      toaster.create({
        description: "The time range cannot be greater than 90 days",
        type: "error",
      });
      return false;
    }
    return diff >= 1 && diff <= 2160;
  };

  return (
    <Box>
      <Box
        position="relative"
        bgColor="white"
        p={{ base: "16px", md: "30px" }}
        rounded="20px"
        w="full"
        m="0"
      >
        <Box
          data-nobold
          fontSize={{ base: "16px", md: "36px" }}
          fontWeight="600"
          lineHeight="normal"
        >
          {t("Important Information")}
        </Box>
        <Wrap alignItems="center" gapX="18px" mt={{ base: "10px", md: "20px" }}>
          <Text fontSize="14px" fontWeight="700">
            {t("Release contract")}:
          </Text>
          <ExternalLink
            data-nobold
            hasIcon={false}
            ml={{ base: "auto", md: 0 }}
            color="#FF0206"
            fontSize="14px"
            fontWeight="400"
            to={`${import.meta.env.VITE_APP_BLOCK_EXPLORER}/address/${
              import.meta.env.VITE_APP_XOC_RELEASE_ADDRESS
            }`}
          >
            <Flex display="inline-flex" gap="6px" alignItems="center">
              <Text display={{ base: "none", md: "block" }}>
                {import.meta.env.VITE_APP_XOC_RELEASE_ADDRESS}
              </Text>
              <Text display={{ base: "block", md: "none" }}>
                {formatAddress(import.meta.env.VITE_APP_XOC_RELEASE_ADDRESS)}
              </Text>
              <ReactSVG src="/images/icons/arrowTopRight.svg" />
            </Flex>
          </ExternalLink>
        </Wrap>

        <Wrap alignItems="center" mt="5" gap={{ base: "10px", xl: "16px" }}>
          <Box
            w={{ base: "100%", md: "auto" }}
            order={{ base: 2, xl: "inherit" }}
          >
            <RangePicker
              value={[searchData.startDate, searchData.endDate]}
              onChange={onChange}
            />
          </Box>

          <Flex flexGrow="1" gap="10px">
            <Select
              collection={createListCollection({ items: ALLOWED_TIMEZONES })}
              rounded="12px"
              p="0"
              w={{ base: "max-content" }}
              defaultValue={[searchData.timezone]}
              onValueChange={handleTimezoneChange}
            />

            <SearchInput
              data-nobold
              placeholder={t("Search Address")}
              w={{ base: "inherit", xl: "320px" }}
              flexGrow="1"
              maxW={{ base: "inherit", xl: "320px" }}
              ml={{ base: 0, md: "auto" }}
              value={inputValue}
              onChange={handleSearch}
              rounded="12px"
              className="search-input"
            />
          </Flex>
        </Wrap>

        <Box mt="5">
          {records.length > 0 ? (
            <ReleaseTable
              records={records}
              timezone={searchData.timezone}
              timezoneLabel={currentTimezoneLabel}
            />
          ) : (
            <NoData mx="auto" py="50px" />
          )}
          <Flex justifyContent="center">
            {hasMore && (
              <Button
                data-nobold
                variant="plain"
                onClick={handleLoadMore}
                disabled={loading}
                fontSize={{ base: "12px", md: "16px" }}
              >
                {loading ? (
                  <Spinner size="sm" />
                ) : (
                  <>
                    {t("Load More")} <RiArrowDownSLine />
                  </>
                )}
              </Button>
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Records;
