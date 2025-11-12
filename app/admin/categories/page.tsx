"use client";

import { CreateCategoryForm } from "@/components/form/category/create.form";
import { Breadcrumbs } from "@/components/layout/admin/breadcrumbs";
import { TitleBar } from "@/components/layout/admin/titleBar";
import { CategoryCard } from "@/components/ui/categoryCard";
import { EmptyState } from "@/components/ui/emptyState";
import { usePagination } from "@/hooks/usePagination";
import { useFindManyCategories } from "@/modules/category/category.hooks";
import { findManyCategories } from "@/modules/category/category.service";
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
  Select,
  Skeleton,
} from "@mantine/core";
import { range } from "@mantine/hooks";
import { openModal } from "@mantine/modals";
import { useQueryState, parseAsString } from "nuqs";
import React, { useEffect, useMemo } from "react";

export default function Categories() {
  const [title, setTitle] = useQueryState(
    "title",
    parseAsString.withDefault("")
  );

  const pagination = usePagination();

  const queryParams = useMemo(
    () => ({
      ...pagination.queryParams,
    }),
    [pagination.queryParams, title]
  );

  const {
    data: categories,
    isLoading,
    isFetching,
    refetch,
  } = useFindManyCategories({
    ...queryParams,
    title,
  });

  useEffect(() => {
    refetch();
  }, [title]);

  const ListContent = () => {
    if (isLoading || isFetching) {
      return (
        <SimpleGrid cols={{ lg: 3, sm: 2, xs: 1 }} mt="xs">
          {range(0, 5).map((item) => (
            <Skeleton key={item} className="w-full h-[63px] rounded-xs" />
          ))}
        </SimpleGrid>
      );
    } else {
      if (categories?.data.result?.length) {
        return (
          <SimpleGrid cols={{ lg: 3, sm: 2, xs: 1 }} mt="xs">
            {categories?.data.result.map((category) => (
              <CategoryCard
                key={category.id}
                label={category.title}
                description={category.description}
              />
            ))}
          </SimpleGrid>
        );
      } else {
        return <EmptyState message="Sem categorias registradas" />;
      }
    }
  };

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
                  title: (
                    <Text className="text-semibold">Registrar categoria</Text>
                  ),
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
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </SimpleGrid>
          </Paper>
          <ListContent />
          <Divider my="xs" />
          <Group justify="space-between">
            <span className="text-sm text-nowrap">{`${
              pagination.queryParams.page
            } - ${pagination.queryParams.limit} / ${
              categories?.data.meta?.pageCount || 1
            }`}</span>
            <Group>
              <Group>
                <span className="text-sm text-nowrap">Por página</span>
                <Select
                  size="xs"
                  variant="filled"
                  w="100px"
                  onChange={(value) => {
                    pagination.setLimit(parseInt(value || "20"));
                    pagination.setPage(1);
                  }}
                  value={`${pagination.queryParams.limit}`}
                  data={["20", "50", "100"]}
                />
              </Group>
              <Pagination
                total={categories?.data.meta?.pageCount || 1}
                value={categories?.data.meta?.currentPage}
                onChange={(value) => pagination.setPage(value - 1)}
                size="sm"
                radius="xs"
              />
            </Group>
          </Group>
        </Box>
      </div>
    </div>
  );
}
