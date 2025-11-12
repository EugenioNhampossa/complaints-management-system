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
import React, { useEffect, useMemo } from "react";
import { useQueryState, parseAsString, parseAsStringEnum } from "nuqs";

export default function Users() {
  const pagination = usePagination();
  const [name, setName] = useQueryState("name", parseAsString.withDefault(""));
  const [email, setEmail] = useQueryState(
    "email",
    parseAsString.withDefault("")
  );
  const [type, setType] = useQueryState(
    "type",
    parseAsStringEnum(["CITIZEN", "EMPLOYEE"])
  );

  const queryParams = useMemo(
    () => ({
      ...pagination.queryParams,
    }),
    [pagination.queryParams, name, email, type]
  );

  const {
    data: users,
    isLoading,
    refetch,
  } = useFindManyUsers({
    ...queryParams,
    firstName: name,
    type: type ? type : undefined,
    email,
  });

  useEffect(() => {
    refetch();
  }, [name, email, type, pagination.queryParams]);

  console.log("render");
  

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
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
              <TextInput
                size="xs"
                placeholder="Pesquise pelo email"
                label="Email"
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <Select
                size="xs"
                placeholder="Pesquise pela função"
                label="Função"
                variant="filled"
                value={type}
                onChange={(value) => {
                  if (value != "TODOS") {
                    setType(value as "CITIZEN" | "EMPLOYEE");
                  } else {
                    setType(null);
                  }
                }}
                data={[
                  {
                    value: "TODOS",
                    label: "Todos",
                  },
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
            onRowClick={(record) => console.log(record)}
            recordsPerPageOptions={[2, 20, 50, 100]}
            recordsPerPageLabel="Por página"
            page={pagination.queryParams.page}
            totalRecords={users?.data.meta?.totalCount}
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
