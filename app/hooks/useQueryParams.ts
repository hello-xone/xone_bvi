import { useEffect, useState } from "react";
import { useDeepCompareEffect } from "ahooks";

export type TQuery = {
  page?: number;
  page_size?: number;
  sort?: string;
  [k: string]: any;
};

interface Props {
  data: any;
  initSort?: string;
  watch?: boolean;
  page_size?: number;
  query?: TQuery;
  fetch?: boolean;
  refetch: (params: any) => void;
}

export function useQueryParams(props: Props) {
  const {
    data = {},
    watch = true,
    query = {},
    initSort,
    page_size = 10,
    refetch = () => {},
  } = props;

  const [params, setParams] = useState({
    query: {
      page: 1,
      page_size,
      sort: "",
      ...query,
    },
    fetch: true,
    total: 0,
  });

  useEffect(() => {
    if (data?.list?.length && watch) {
      const { page, total } = data;
      setParams((state) => ({
        fetch: true,
        query: {
          ...state.query,
          page: page || 1,
        },
        total,
      }));
    }
  }, [data, watch]);

  const setPageParams = <T extends TQuery>(
    param: T | ((state: any) => T),
    fetch = true
  ) => {
    setParams((state: any) => {
      let values = {};
      if (typeof param === "function") {
        values = param(state.query);
      } else {
        values = param;
      }
      return {
        ...state,
        fetch,
        query: { ...state.query, ...values },
      };
    });
  };

  useDeepCompareEffect(() => {
    try {
      if (watch || params.fetch) refetch({ ...params.query, ...query });
    } catch (error) {}
  }, [params.query, query]);

  const searchSubmit = () => {
    if (params.query.page !== 1) return setPageParams({ page: 1 });
    refetch(params.query);
  };

  const onSearchFormReset = () => {
    setParams((state: any) => ({
      ...state,
      query: {
        ...state.query,
        page: 1,
        sort: "",
      },
    }));
    if (params.query.page === 1) refetch(params.query);
  };

  const onChange = (...args: {}[]) => {
    const { order = "ascend", field = initSort } = args[2] as any;
    const isSort = !!Object.keys(args[2]).length;
    if (isSort) {
      setParams((state: any) => ({
        ...state,
        query: {
          ...state.query,
          // page: 1,
          sort: field ? `${order === "ascend" ? "+" : "-"}${field}` : "",
        },
      }));
    }
  };

  return {
    params,
    setPageParams,
    searchSubmit,
    onSearchFormReset,
    onChange,
  };
}
