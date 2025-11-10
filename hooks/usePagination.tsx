import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { useCallback, useMemo } from "react";

export function usePagination() {
  const [size, setSize] = useQueryState("size", parseAsInteger.withDefault(20));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("createdAt,desc"),
  );

  const queryParams = useMemo(() => ({ size, page, sort }), [size, page, sort]);

  const handleRecordsPerPageChange = useCallback(
    (size: number) => {
      setPage(0);
      setSize(size);
    },
    [setPage, setSize],
  );

  return {
    queryParams,
    setSize: useCallback(setSize, []),
    setPage: useCallback(setPage, []),
    setSort: useCallback(setSort, []),
    handleRecordsPerPageChange,
  };
}
