"use client";

import { Footer } from "@/components/layout/footer";
import { ComplaintCard } from "@/components/ui/complaintCard";
import { usePagination } from "@/hooks/usePagination";
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
} from "@mantine/core";
import { range } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";

export default function ComplaintsPage() {
  const pagination = usePagination();

  const queryParams = useMemo(
    () => ({
      ...pagination.queryParams,
    }),
    [pagination.queryParams]
  );

  const {
    data: complaints,
    isLoading,
    refetch,
  } = useFindManyComplaints({ ...queryParams });

  useEffect(() => {
    refetch();
  }, [pagination.queryParams]);

  const ComplaintsList = () => {
    if (isLoading) {
      return (
        <SimpleGrid cols={{ lg: 4, md: 3, sm: 2, base: 1 }} spacing={20}>
          {range(1, 8).map((index) => (
            <Skeleton key={index} className="w-full h-[190px] rounded-md" />
          ))}
        </SimpleGrid>
      );
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
          <Paper className="shadow-none bg-primary flex flex-col items-center justify-center mb-6 text-white py-12">
            <Title className="text-center">
              Veja Todas Reclamações Submetidas
            </Title>
            <Text className="text-center text-sm text-stone-50 md:text-base max-w-lg mt-6 max-md:px-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              expedita animi ducimus consequatur sapiente id dignissimos
              placeat.
            </Text>
            <Button
              size="md"
              component={Link}
              href="/complaints/add"
              className="mt-6 bg-white text-primary hover:bg-stone-100"
            >
              Submeter reclamação
            </Button>
          </Paper>
          <div>
            <SimpleGrid mb="sm" cols={{ md: 2, sm: 1 }}>
              <TextInput
                placeholder="Pesquise pelo título..."
                leftSection={<IconSearch size={18} />}
                className="w-full"
                variant="filled"
              />
              <Group grow>
                <Select placeholder="Seleccione o estado" variant="filled" />
                <Select placeholder="Seleccione a categoria" variant="filled" />
              </Group>
            </SimpleGrid>
            <ComplaintsList />
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
