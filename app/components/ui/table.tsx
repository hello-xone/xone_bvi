import {
  Table,
  Clipboard,
  EmptyState,
  VStack,
  Stack,
  Link,
  Pagination,
  ButtonGroup,
  IconButton,
  Wrap,
  Box,
  Flex,
  Select,
  Portal,
  createListCollection,
  Checkbox,
  Center,
  useUpdateEffect,
  type JsxStyleProps,
} from "@chakra-ui/react";
import { JSX, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { TbMoodEmpty } from "react-icons/tb";
import { RxTriangleUp, RxTriangleDown } from "react-icons/rx";
import { UpdateTime } from "./update-time";
import { useQueryParams } from "~/hooks/useQueryParams";
import { useUpdateUrlParams } from "~/hooks/useUpdateUrlParams";
import { useRequest } from "alova/client";
import { useDeepCompareEffect } from "ahooks";

type StyleObj = { [key in keyof JsxStyleProps]: any };

type StyleProps = {
  thClass?: StyleObj;
  tdClass?: StyleObj;
};

export type TableColumn = {
  key: string;
  title?: string;
  isClipboard?: boolean;
  isSelected?: ((row: any) => boolean) | boolean;
  sortKey?: string;
  isSorter?: boolean;
  render?: (arg: {
    current?: any;
    row?: any;
    index?: number;
    Clipboard?: typeof ClipboardWrap;
  }) => JSX.Element | string | number;
} & StyleProps;

type TableProps = {
  data?: { [k: string]: any };
  columns?: TableColumn[];
  wrapClass?: StyleObj;
  thWrapClass?: StyleObj;
  tdWrapClass?: StyleObj;
  pagination?: { isPageSizeChange?: boolean } | boolean;
  isEmpty?: boolean;
  request?: {
    api?: (...args: any) => any;
    params?: { [k: string]: any };
    force?: boolean;
    initialData?: any;
  };
  selectionChange?: (selections: any) => void;
} & StyleProps;

const ClipboardWrap = (props) => {
  const {
    children,
    item = {},
    row = {},
  } = props as {
    children: string;
    item?: any;
    row?: any;
  };
  return (
    <Clipboard.Root value={children ?? item[row.key]}>
      <Clipboard.Trigger asChild>
        <Link as="span">
          {children ?? <Clipboard.ValueText {...row.tdClass} />}
          <Clipboard.Indicator />
        </Link>
      </Clipboard.Trigger>
    </Clipboard.Root>
  );
};

const BaseTable = (props: TableProps) => {
  const {
    data,
    columns = [],
    wrapClass = {},
    thWrapClass = {},
    tdWrapClass = {},
    thClass = {},
    tdClass = {},
    pagination = true,
    isEmpty = true,
    selectionChange,
    request: {
      api = () => {},
      params = {},
      force = false,
      initialData = {},
    } = {
      api: () => {},
      params: {},
      force: false,
      initialData: {},
    },
  } = props;
  const { t } = useTranslation();

  const { data: res, send } = useRequest(api, {
    force,
    immediate: false,
    initialData,
  });

  const isPageSizeChange = pagination
    ? (typeof pagination === "object"
        ? pagination.isPageSizeChange
        : undefined) ?? true
    : false;

  const { param: pageSizeParam, updateParam } = useUpdateUrlParams({
    key: "pageSize",
    defaultParam: "10",
    isDisabled: !isPageSizeChange,
  });

  const {
    params: { query },
    setPageParams,
  } = useQueryParams({
    data: data ?? res,
    query: params as any,
    page_size: +pageSizeParam,
    refetch: send,
  });

  const { page, sort, page_size: pageSize } = query;

  const dataList = res.page > 1 ? res.list ?? [] : data?.list ?? res.list ?? [];
  const total = res.total ?? data?.total ?? 0;

  const buttonClass = {
    w: "32px",
    minW: "32px",
    h: "32px",
    border: "1px solid #E0E0E0",
    rounded: "6px",
    color: "#9FA2AB",
    fontSize: "14px",
    fontWeight: "500",
    overflow: "hidden",
    _selected: {
      color: "white",
      bg: "#4C4C4C",
      borderColor: "#4C4C4C",
      _hover: {
        color: "white",
      },
    },
    _hover: {
      color: "#000",
    },
  };

  // useUpdateEffect(() => {
  //   send(query);
  // }, [page, sort]);

  useDeepCompareEffect(() => {
    setPageParams({ sort: "" }, false);
  }, [query.page_size]);

  const handleSortBy = (key: string) => {
    if (sort.startsWith(`+${key}`)) {
      setPageParams({ sort: "" });
    } else {
      setPageParams({
        sort: `${sort.startsWith(`-${key}`) ? "+" : "-"}${key}`,
      });
    }
  };

  const pageSizeList = createListCollection({
    items: [
      { value: "10" },
      { value: "20" },
      { value: "50" },
      { value: "100" },
    ],
  });

  useUpdateEffect(() => {
    if (!isPageSizeChange) return;
    updateParam(`${pageSize}`);
  }, [pageSize, isPageSizeChange]);

  const selectedPageSize = isPageSizeChange ? +pageSizeParam : pageSize;

  const [selection, setSelection] = useState<string[]>([]);
  const hasSelection = selection.length > 0;
  const indeterminate =
    hasSelection &&
    selection.length <
      dataList.filter((v) => (columns[0] as any).isSelected?.(v)).length;

  useEffect(() => {
    selectionChange?.(selection);
  }, [selection]);

  return (
    <Stack>
      <Table.ScrollArea maxW="full">
        <Table.Root
          interactive
          native
          key="no"
          w="full"
          overflowX="auto"
          px="20px"
          {...wrapClass}
        >
          <Table.Header>
            <Table.Row
              h="52px"
              bg="#FBFCFF"
              rounded="12px"
              fontSize={{ base: "14px", md: "18px" }}
              fontWeight="700"
              lineHeight="normal"
              {...thWrapClass}
            >
              {columns.map((item, index) => {
                const sortKey = item.sortKey ?? item.key;
                return (
                  <Table.ColumnHeader key={index} border="none">
                    <Center {...thClass} {...item.thClass}>
                      {item.isSelected ? (
                        <Checkbox.Root
                          size="sm"
                          top="0.5"
                          borderColor="red"
                          checked={
                            indeterminate
                              ? "indeterminate"
                              : selection.length > 0
                          }
                          onCheckedChange={(changes) => {
                            setSelection(
                              changes.checked
                                ? dataList
                                    .filter((v) =>
                                      (item as any).isSelected?.(v)
                                    )
                                    .map((row) => row[item.key])
                                : []
                            );
                          }}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control
                            rounded="4px"
                            borderColor="#979797"
                            cursor="pointer"
                            _checked={{
                              bg: "#FF0206",
                              borderColor: "#FF0206",
                            }}
                            _indeterminate={{
                              bg: "#FF0206",
                              borderColor: "#FF0206",
                            }}
                          />
                        </Checkbox.Root>
                      ) : (
                        <Flex
                          cursor={!!item.isSorter ? "pointer" : null}
                          onClick={() => handleSortBy(sortKey)}
                        >
                          {item.title}
                          {!!item.isSorter && (
                            <Stack gap="2px" pos="relative" color="#979797">
                              <RxTriangleUp
                                color={sort === `-${sortKey}` ? "#000" : ""}
                              />
                              <Box
                                pos="absolute"
                                top="5px"
                                color={sort === `+${sortKey}` ? "#000" : ""}
                              >
                                <RxTriangleDown />
                              </Box>
                            </Stack>
                          )}
                        </Flex>
                      )}
                    </Center>
                  </Table.ColumnHeader>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {dataList.length
              ? dataList.map((item, index) => (
                  <Table.Row
                    data-nobold
                    key={index}
                    fontSize={{ base: "12px", md: "14px" }}
                    {...tdWrapClass}
                    bg={selection.includes(item["no"]) ? "!#FFF0F0" : ""}
                  >
                    {columns.map((row) => (
                      <Table.Cell border="none">
                        <Center {...tdClass} {...row.tdClass}>
                          {row.render?.({
                            current: item[row.key],
                            row: item,
                            index,
                            Clipboard: ClipboardWrap,
                          }) ??
                            (row.isSelected ? (
                              <Checkbox.Root
                                size="sm"
                                top="0.5"
                                checked={selection.includes(item[row.key])}
                                disabled={!(row as any).isSelected?.(item)}
                                onCheckedChange={(changes) => {
                                  setSelection((prev) =>
                                    changes.checked
                                      ? [...prev, item[row.key]]
                                      : selection.filter(
                                          (v) => v !== item[row.key]
                                        )
                                  );
                                }}
                              >
                                <Checkbox.HiddenInput />
                                <Checkbox.Control
                                  rounded="4px"
                                  borderColor="#979797"
                                  cursor="pointer"
                                  _checked={{
                                    bg: "#FF0206",
                                    borderColor: "#FF0206",
                                  }}
                                />
                              </Checkbox.Root>
                            ) : row.isClipboard ? (
                              <ClipboardWrap item={item} row={row} />
                            ) : (
                              item[row.key]
                            ))}
                        </Center>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))
              : isEmpty && (
                  <Table.Row>
                    <Table.Cell
                      border="none"
                      colSpan={columns.length}
                      textAlign="center"
                      py="10"
                      _hover={{ bg: "white" }}
                    >
                      <EmptyState.Root>
                        <EmptyState.Content>
                          <EmptyState.Indicator>
                            <TbMoodEmpty />
                          </EmptyState.Indicator>
                          <VStack textAlign="center">
                            <EmptyState.Title>{t("No Data")}</EmptyState.Title>
                            <EmptyState.Description>
                              {t(
                                "Please refresh the page or contact the administrator."
                              )}
                            </EmptyState.Description>
                          </VStack>
                        </EmptyState.Content>
                      </EmptyState.Root>
                    </Table.Cell>
                  </Table.Row>
                )}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      {!!pagination && (
        <Wrap
          data-nobold
          justifyContent="space-between"
          alignItems="center"
          gap="20px"
        >
          {isPageSizeChange && (
            <Select.Root
              collection={pageSizeList}
              defaultValue={[`${selectedPageSize}`]}
              size="sm"
              width="180px"
              fontSize="14px"
              fontWeight="500"
              onValueChange={({ value }) =>
                setPageParams({ page_size: +value[0] })
              }
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger rounded="!8px" bg="white">
                  <Select.ValueText data-nobold>
                    {t("Show {{ count }} Results", {
                      count: Number(selectedPageSize),
                    })}
                  </Select.ValueText>
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner bg="white" zIndex="!9999">
                  <Select.Content data-nobold>
                    {pageSizeList.items.map((item) => (
                      <Select.Item item={item.value} key={item.value}>
                        {t("Show {{ count }} Results", {
                          count: Number(item.value),
                        })}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          )}
          <UpdateTime mr="auto" />
          {!!total && (
            <Pagination.Root
              count={total}
              pageSize={selectedPageSize}
              page={+page}
            >
              <ButtonGroup variant="ghost" size="xs" wrap="wrap">
                <Pagination.PrevTrigger asChild>
                  <IconButton
                    {...buttonClass}
                    onClick={() =>
                      setPageParams(({ page }) => ({ page: page - 1 }))
                    }
                  >
                    <LuChevronLeft />
                  </IconButton>
                </Pagination.PrevTrigger>

                <Pagination.Items
                  render={(page) => (
                    <IconButton
                      {...buttonClass}
                      onClick={() => setPageParams({ page: page.value })}
                    >
                      {page.value}
                    </IconButton>
                  )}
                />

                <Pagination.NextTrigger asChild>
                  <IconButton
                    {...buttonClass}
                    onClick={() =>
                      setPageParams(({ page }) => ({ page: page + 1 }))
                    }
                  >
                    <LuChevronRight />
                  </IconButton>
                </Pagination.NextTrigger>
              </ButtonGroup>
            </Pagination.Root>
          )}
        </Wrap>
      )}
    </Stack>
  );
};

export default memo(BaseTable);
