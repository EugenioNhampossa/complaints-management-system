"use client";

import { Breadcrumbs } from "@/components/layout/admin/breadcrumbs";
import { TitleBar } from "@/components/layout/admin/titleBar";
import { EmptyState } from "@/components/ui/emptyState";
import { usePagination } from "@/hooks/usePagination";
import { ComplaintsColumns } from "@/modules/complaints/complaints.columns";
import { useFindManyComplaints } from "@/modules/complaints/complaints.hooks";
import { getTableProps } from "@/utils/getTableProps";
import {
  Box,
  Paper,
  SimpleGrid,
  Select,
  TextInput,
  Loader,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { DataTable } from "mantine-datatable";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQueryState, parseAsString, parseAsStringEnum } from "nuqs";
import { useSelectCategories } from "@/modules/category/category.hooks";

export default function Complaints() {
  const router = useRouter();
  const pagination = usePagination();
  const [title, setTitle] = useQueryState(
    "title",
    parseAsString.withDefault("")
  );
  const [status, setStatus] = useQueryState(
    "status",
    parseAsStringEnum([
      "PENDING",
      "IN_PROGRESS",
      "COMPLETED",
      "CANCELLED",
      "ALL",
    ])
  );
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault("")
  );

  const { data: categories, isLoading: isLoadingCategories } =
    useSelectCategories({
      isActive: true,
    });

  const queryParams = useMemo(
    () => ({
      ...pagination.queryParams,
    }),
    [pagination.queryParams, category, title, status]
  );

  const {
    data: complaints,
    isLoading,
    refetch,
  } = useFindManyComplaints({
    ...queryParams,
    title: title || undefined,
    categoryId: category || undefined,
    status: status && status !== "ALL" ? status : undefined,
  });

  useEffect(() => {
    refetch();
  }, [pagination.queryParams, category, title, status]);

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
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
              <Select
                size="xs"
                placeholder="Pesquise pela categoria"
                label="Categoria"
                variant="filled"
                data={categories}
                disabled={isLoadingCategories}
                rightSection={isLoadingCategories && <Loader size={18} />}
                value={category}
                onChange={(value) => setCategory(value || "")}
              />
              <Select
                size="xs"
                placeholder="Pesquise pelo estado"
                label="Estado"
                variant="filled"
                data={[
                  { value: "ALL", label: "Todos" },
                  { value: "PENDING", label: "Pendente" },
                  { value: "IN_PROGRESS", label: "Em progresso" },
                  { value: "COMPLETED", label: "Concluído" },
                  { value: "CANCELLED", label: "Cancelado" },
                ]}
                value={status}
                onChange={(value: any) => setStatus(value || "ALL")}
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
