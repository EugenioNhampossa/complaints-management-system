"use client";

import { usePagination } from "@/hooks/usePagination";
import { Group, Select, Pagination as DefaultPagination } from "@mantine/core";
import React from "react";

export interface CustomPaginationProps {
  paginationData: ReturnType<typeof usePagination>;
  totalPages: number;
  totalElements: number;
  lessOptions?: boolean;
}

const CustomPagination = React.forwardRef<
  HTMLDivElement,
  CustomPaginationProps
>(
  (
    {
      paginationData: data,
      totalPages,
      totalElements,
      lessOptions = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} {...props}>
        <Group justify={!lessOptions ? "space-between" : "right"}>
          {!lessOptions && (
            <span className="text-sm text-nowrap">{`${data.queryParams.page + 1} - ${data.queryParams.limit} / ${totalElements}`}</span>
          )}
          <Group>
            {!lessOptions && (
              <Group>
                <span className="text-sm text-nowrap">Por página</span>
                <Select
                  size="xs"
                  variant="filled"
                  w="100px"
                  onChange={(value) =>
                    data.handleRecordsPerPageChange(parseInt(value || "1"))
                  }
                  value={`${data.queryParams.limit}`}
                  data={["1", "20", "50", "100"]}
                />
              </Group>
            )}
            <DefaultPagination
              total={totalPages || 1}
              value={data?.queryParams.page + 1}
              onChange={(value) => data.setPage(value - 1)}
              size="sm"
              radius="xs"
            />
          </Group>
        </Group>
      </div>
    );
  },
);

CustomPagination.displayName = "CustomPagination";

export { CustomPagination };
