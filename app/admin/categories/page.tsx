"use client";

import { CreateCategoryForm } from "@/components/form/category/create.form";
import { Breadcrumbs } from "@/components/layout/admin/breadcrumbs";
import { TitleBar } from "@/components/layout/admin/titleBar";
import { CategoryCard } from "@/components/ui/categoryCard";
import { usePagination } from "@/hooks/usePagination";
import {
  Box,
  Paper,
  SimpleGrid,
  TextInput,
  Button,
  Divider,
  Group,
  Pagination,
  Text,
} from "@mantine/core";
import { range } from "@mantine/hooks";
import { openModal } from "@mantine/modals";
import React, { useMemo } from "react";

export default function Categories() {
  const pagination = usePagination();

  const queryParams = useMemo(
    () => ({
      ...pagination.queryParams,
    }),
    [pagination.queryParams]
  );

  return (
    <div className="mb-[20px]">
      <Breadcrumbs
        items={[
          { title: "Página inicial", href: "/" },
          { title: "Categorias" },
        ]}
      />
      <div className="px-xs sm:px-lg">
        <TitleBar
          title="Categorias"
          description="Lista de categorias de reclamações."
          rightSection={
            <Button
              size="xs"
              onClick={() =>
                openModal({
                  title: <Text className="text-semibold">Registrar categoria</Text>,
                  children: <CreateCategoryForm />,
                })
              }
            >
              Adicionar categoria
            </Button>
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
            </SimpleGrid>
          </Paper>
          <SimpleGrid cols={{ lg: 3, sm: 2, xs: 1 }} mt="xs">
            {range(0, 7).map((index) => (
              <CategoryCard
                key={index}
                label={`Categoria ${index + 2}`}
                description={
                  "Qui do magna fugiat laborum sunt exercitation anim anim sint dolore nisi incididunt ea eiusmod."
                }
              />
            ))}
          </SimpleGrid>
          <Divider my="xs" />
          <Group justify="space-between">
            <Text c="dimmed" className="text-sm">
              Página 1 de 5
            </Text>
            <Pagination total={5} size="sm" />
          </Group>
        </Box>
      </div>
    </div>
  );
}
