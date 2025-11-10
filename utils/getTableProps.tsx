import classes from "@/styles/table.module.css";
import React from "react";
import { Loader } from "@mantine/core";

export const PAGE_SIZES = [30, 70, 100];

export function getTableProps() {
  return {
    withRowBorders: false,
    customLoader: <Loader size="lg" type="bars" />,
    classNames: {
      header: classes.header,
      table: classes.table,
      pagination: classes.pagination,
      root:classes.root
    },
    highlightOnHover: true,
    highlightOnHoverColor: "var(--mantine-primary-color-contrast)",
    scrollAreaProps: { scrollbarSize: "8px" },
    noRecordsText: "",
  };
}
