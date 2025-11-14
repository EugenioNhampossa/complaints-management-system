"use client";

import { Breadcrumbs } from "@/components/layout/admin/breadcrumbs";
import { TitleBar } from "@/components/layout/admin/titleBar";
import { EmptyState } from "@/components/ui/emptyState";
import { usePagination } from "@/hooks/usePagination";
import { ComplaintsColumns } from "@/modules/complaints/complaints.columns";
import { useFindManyComplaints } from "@/modules/complaints/complaints.hooks";
import { getTableProps } from "@/utils/getTableProps";
import { Box, Paper, SimpleGrid, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { DataTable } from "mantine-datatable";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Complaints() {
  const router = useRouter();
  const pagination = usePagination();

  const queryParams = useMemo(
    () => ({
      ...pagination.queryParams,
    }),
    [pagination.queryParams]
  );

  const { data: complaints, isLoading } = useFindManyComplaints({
    ...queryParams,
  });

  return (
    <div className="mb-[20px]">
      <Breadcrumbs
        items={[
          { title: "Página inicial", href: "/" },
          { title: "Reclamações" },
        ]}
      />
      <div className="px-xs sm:px-lg">
        <TitleBar
          title="Reclamações"
          description="Lista de reclamações submetidas."
          rightSection={
            <DatePickerInput
              size="xs"
              type="range"
              popoverProps={{ position: "bottom-end", shadow: "md" }}
              variant="filled"
              value={[
                new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                new Date(),
              ]}
              valueFormat="ddd, DD MMMM, YYYY"
            />
          }
        />
        <Box mt="xl">
          <Paper className="border-paper p-xs">
            <SimpleGrid cols={{ base: 1, md: 3 }}>
              <TextInput
                size="xs"
                placeholder="Pesquise pelo títilo"
                label="Título"
                variant="filled"
              />
              <Select
                size="xs"
                placeholder="Pesquise pela categoria"
                label="Categoria"
                variant="filled"
              />
              <Select
                size="xs"
                placeholder="Pesquise pelo estado"
                label="Estado"
                variant="filled"
              />
            </SimpleGrid>
          </Paper>
          <DataTable
            {...getTableProps()}
            mt="xs"
            height={"65vh"}
            columns={ComplaintsColumns}
            withTableBorder
            records={complaints?.data.result}
            fetching={isLoading}
            noRecordsIcon={
              <EmptyState message="Não existem reclamações registradas" />
            }
            onRowClick={(e) => router.push(`/admin/complaints/${e.record.id}`)}
            recordsPerPageOptions={[20, 50, 100]}
            recordsPerPageLabel="Por página"
            page={pagination.queryParams.page}
            totalRecords={complaints?.data.meta?.totalCount}
            recordsPerPage={pagination.queryParams.limit}
            onRecordsPerPageChange={(limit: number) =>
              pagination.handleRecordsPerPageChange(limit)
            }
            onPageChange={(page: number) => pagination.setPage(page)}
          />
        </Box>
      </div>
    </div>
  );
}
