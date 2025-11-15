"use client";

import { Footer } from "@/components/layout/footer";
import { ComplaintCard } from "@/components/ui/complaintCard";
import { EmptyState } from "@/components/ui/emptyState";
import { usePagination } from "@/hooks/usePagination";
import { useSelectCategories } from "@/modules/category/category.hooks";
import { useGetCitizenByUserId } from "@/modules/citizen/citizen.hooks";
import { useFindManyComplaints } from "@/modules/complaints/complaints.hooks";
import {
  Paper,
  Title,
  Text,
  Button,
  rem,
  Stack,
  SimpleGrid,
  Group,
  TextInput,
  Select,
  Divider,
  Pagination,
  Skeleton,
  Loader,
  Avatar,
} from "@mantine/core";
import { range } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useQueryState, parseAsString, parseAsStringEnum } from "nuqs";
import { useEffect, useMemo } from "react";

export default function Profile() {
  const { data } = useSession();
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

  const { data: citizen } = useGetCitizenByUserId(data?.user.id || "");

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
    [pagination.queryParams, category, title, status, citizen?.data?.id]
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
    citizenId: citizen?.data?.id,
  });

  useEffect(() => {
    refetch();
  }, [pagination.queryParams, category, title, status, citizen?.data?.id]);

  const ComplaintsList = () => {
    if (isLoading || !citizen?.data?.id) {
      return (
        <SimpleGrid cols={{ lg: 4, md: 3, sm: 2, base: 1 }} spacing={20}>
          {range(1, 8).map((index) => (
            <Skeleton key={index} className="w-full h-[190px] rounded-md" />
          ))}
        </SimpleGrid>
      );
    }
    if (!complaints || complaints.data.result.length === 0) {
      return <EmptyState message="Sem reclamações registradas" />;
    }
    return (
      <SimpleGrid cols={{ lg: 4, md: 3, sm: 2, base: 1 }} spacing={20}>
        {complaints?.data.result.map((complaint) => (
          <ComplaintCard
            href={`/complaints/${complaint.id}`}
            key={complaint.id}
            complaint={complaint}
          />
        ))}
      </SimpleGrid>
    );
  };

  return (
    <div>
      <div className="container mx-auto p-4 mb-md rounded-md">
        <Stack gap={rem("20px")}>
          <Paper className="shadow-none bg-stone-100 flex items-center justify-between mb-6 px-4 py-4">
            <Group wrap="nowrap">
              <Avatar
                name={data?.user.name}
                size="lg"
                variant="filled"
                color="initials"
                alt={data?.user.name}
              />
              <div>
                <Title order={3}>{data?.user.name}</Title>
                <Text size="xs" c="dimmed">
                  {data?.user.email}
                </Text>
              </div>
            </Group>
            <Button>Editar dados</Button>
          </Paper>
          <div>
            <SimpleGrid mb="sm" cols={{ md: 2, sm: 1 }}>
              <TextInput
                placeholder="Pesquise pelo título..."
                leftSection={<IconSearch size={18} />}
                className="w-full"
                variant="filled"
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
              />
              <Group grow>
                <Select
                  placeholder="Seleccione o estado"
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
                <Select
                  placeholder="Seleccione a categoria"
                  variant="filled"
                  data={categories}
                  disabled={isLoadingCategories}
                  rightSection={isLoadingCategories && <Loader size={18} />}
                  value={category}
                  onChange={(value) => setCategory(value || "")}
                />
              </Group>
            </SimpleGrid>
            <Stack>
              <div>
                <Title order={4}>Reclamações submetidas</Title>
                <Text c="dimmed" size="sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>
              </div>
              <ComplaintsList />
            </Stack>
            <Divider my="xs" />
            <Group justify="space-between">
              <span className="text-sm text-nowrap">{`${
                pagination.queryParams.page
              } - ${pagination.queryParams.limit} / ${
                complaints?.data.meta?.pageCount || 1
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
                  total={complaints?.data.meta?.pageCount || 1}
                  value={complaints?.data.meta?.currentPage}
                  onChange={(value) => pagination.setPage(value - 1)}
                  size="sm"
                  radius="xs"
                />
              </Group>
            </Group>
          </div>
        </Stack>
      </div>
      <Footer />
    </div>
  );
}
