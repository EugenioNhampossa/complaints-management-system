"use client";

import { RegisterForm } from "@/components/form/user/register.form";
import { Breadcrumbs } from "@/components/layout/admin/breadcrumbs";
import { TitleBar } from "@/components/layout/admin/titleBar";
import { EmptyState } from "@/components/ui/emptyState";
import { usePagination } from "@/hooks/usePagination";
import { UsersColumns } from "@/modules/user/user.columns";
import { useFindManyUsers } from "@/modules/user/user.hooks";
import { getTableProps } from "@/utils/getTableProps";
import {
  Box,
  Paper,
  SimpleGrid,
  Select,
  TextInput,
  Button,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { DataTable } from "mantine-datatable";
import React, { useMemo } from "react";

export default function Users() {
  const pagination = usePagination();

  const queryParams = useMemo(
    () => ({
      ...pagination.queryParams,
    }),
    [pagination.queryParams]
  );

  const { data: users, isLoading } = useFindManyUsers({ ...queryParams });

  return (
    <div className="mb-[20px]">
      <Breadcrumbs
        items={[
          { title: "Página inicial", href: "/" },
          { title: "Utilizadores" },
        ]}
      />
      <div className="px-xs sm:px-lg">
        <TitleBar
          title="Utilizadores"
          description="Lista de utilizadores registrados."
          rightSection={
            <Button
              size="xs"
              onClick={() =>
                openModal({
                  title: "Registrar utilizador",
                  children: <RegisterForm withUserType />,
                  size: "lg",
                })
              }
            >
              Adicionar utilizadores
            </Button>
          }
        />
        <Box mt="xl">
          <Paper className="border-paper p-xs">
            <SimpleGrid cols={{ base: 1, md: 3 }}>
              <TextInput
                size="xs"
                placeholder="Pesquise pelo nome"
                label="Nome"
                variant="filled"
              />
              <TextInput
                size="xs"
                placeholder="Pesquise pelo email"
                label="Email"
                variant="filled"
              />
              <Select
                size="xs"
                placeholder="Pesquise pela função"
                label="Função"
                variant="filled"
                data={[
                  {
                    value: "CITIZEN",
                    label: "Cidadão",
                  },
                  {
                    value: "EMPLOYEE",
                    label: "Funcionário",
                  },
                ]}
              />
            </SimpleGrid>
          </Paper>
          <DataTable
            {...getTableProps()}
            mt="xs"
            height={"65vh"}
            columns={UsersColumns}
            withTableBorder
            records={users?.data.result}
            fetching={isLoading}
            noRecordsIcon={
              <EmptyState message="Não existem utilizadores registrados" />
            }
            recordsPerPageOptions={[20, 50, 100]}
            recordsPerPageLabel="Por página"
            page={pagination.queryParams.page + 1}
            totalRecords={users?.data.meta?.totalCount}
            recordsPerPage={pagination.queryParams.limit}
            onRecordsPerPageChange={(limit: number) =>
              pagination.handleRecordsPerPageChange(limit)
            }
            onPageChange={(page: number) => pagination.setPage(page - 1)}
          />
        </Box>
      </div>
    </div>
  );
}
