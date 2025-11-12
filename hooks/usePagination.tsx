import { useQueryState, parseAsInteger } from "nuqs";
import { useCallback, useMemo } from "react";

export function usePagination() {
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(20)
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const queryParams = useMemo(() => ({ limit, page }), [limit, page]);

  const handleRecordsPerPageChange = useCallback(
    (limit: number) => {
      setPage(1);
      setLimit(limit);
    },
    [setPage, setLimit]
  );

  return {
    queryParams,
    setLimit: useCallback(setLimit, []),
    setPage: useCallback(setPage, []),
    handleRecordsPerPageChange,
  };
}
