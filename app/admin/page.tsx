"use client";

import {
  Paper,
  SimpleGrid,
  Text,
  Group,
  Stack,
  NumberFormatter,
  Grid,
  Box,
  Button,
  Skeleton,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  IconClock,
  IconFileDescription,
  IconShoppingCart,
  IconStar,
} from "@tabler/icons-react";
import React, { useMemo } from "react";
import { BarChart } from "@mantine/charts";
import { range } from "@mantine/hooks";
import { ComplaintCard } from "@/components/ui/complaintCard";
import { Breadcrumbs } from "@/components/layout/admin/breadcrumbs";
import { TitleBar } from "@/components/layout/admin/titleBar";
import { useFindManyComplaints } from "@/modules/complaints/complaints.hooks";

const data = [
  { day: "Segunda", total: 2000 },
  { day: "Terça", total: 4000 },
  { day: "Quarta", total: 2000 },
  { day: "Quinta", total: 8000 },
  { day: "Sexta", total: 1200 },
  { day: "Sábado", total: 1000 },
  { day: "Domingo", total: 2000 },
];

export default function Dashboard() {
  const { data: complaints, isLoading } = useFindManyComplaints({
    limit: 5,
  });

  const ComplaintsList = () => {
    if (isLoading) {
      return (
        <Stack className="pr-[2px]">
          {range(1, 8).map((index) => (
            <Skeleton key={index} className="w-full h-[190px] rounded-md" />
          ))}
        </Stack>
      );
    }
    return (
      <Stack className="pr-[2px]">
        {complaints?.data.result.map((complaint) => (
          <ComplaintCard
            href={`/complaints/${complaint.id}`}
            key={complaint.id}
            complaint={complaint}
          />
        ))}
      </Stack>
    );
  };

  return (
    <div className="mb-[20px]">
      <Breadcrumbs
        items={[{ title: "Página inicial", href: "/" }, { title: "Dashboard" }]}
      />
      <div className="px-xs sm:px-lg">
        <TitleBar
          title="Dashboard"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          rightSection={
            <DatePickerInput
              popoverProps={{ position: "bottom-end", shadow: "md" }}
              variant="filled"
              value={new Date()}
              valueFormat="ddd, DD MMMM, YYYY"
            />
          }
        />
        <Stack gap="xs">
          <SimpleGrid spacing="xs" cols={{ base: 1, sm: 2, lg: 4 }}>
            <Paper className="border-paper p-xs">
              <Group mb="xs" justify="space-between">
                <Text className="font-semibold text-sm">Submissões hoje</Text>
                <IconShoppingCart size={18} className="text-stone-500" />
              </Group>
              <Text className="font-bold text-2xl">40</Text>
              <Text c="dimmed" className="text-xs">
                +2 em relação a ontem
              </Text>
            </Paper>
            <Paper className="border-paper p-xs">
              <Group mb="xs" justify="space-between">
                <Text className="font-semibold text-sm">
                  Problemas resolvidos
                </Text>
                <IconFileDescription size={18} className="text-stone-500" />
              </Group>
              <NumberFormatter
                className="font-bold text-2xl"
                value={270}
                decimalScale={2}
                fixedDecimalScale
                thousandSeparator
              />
              <Text c="dimmed" className="text-xs">
                +5% em relação ao mes passado
              </Text>
            </Paper>
            <Paper className="border-paper p-xs">
              <Group mb="xs" justify="space-between">
                <Text className="font-semibold text-sm">
                  Tempo médio de resolução
                </Text>
                <IconClock size={18} className="text-stone-500" />
              </Group>
              <Text className="font-bold text-2xl">21 min</Text>
              <Text c="dimmed" className="text-xs">
                -7 min em relação a semana passada
              </Text>
            </Paper>
            <Paper className="border-paper p-xs">
              <Group mb="xs" justify="space-between">
                <Text className="font-semibold text-sm">Avaliação média</Text>
                <IconStar size={18} className="text-stone-500" />
              </Group>
              <Text className="font-bold text-2xl">4.3/5.0</Text>
              <Text c="dimmed" className="text-xs">
                +0.2 em relação a ontem
              </Text>
            </Paper>
          </SimpleGrid>
          <Grid gutter="xs">
            <Grid.Col span={{ base: 12, md: 6, lg: 7 }}>
              <Paper className="border-paper p-xs">
                <Box mb="sm">
                  <Text className="font-bold text-2xl">
                    Reclamações da semana
                  </Text>
                  <Text c="dimmed" size="sm">
                    Visualize o desempenho nos últimos 7 dias
                  </Text>
                </Box>
                <BarChart
                  h={350}
                  data={data}
                  dataKey="day"
                  series={[{ name: "total", color: "dark" }]}
                  tickLine="y"
                  barChartProps={{}}
                  barProps={{
                    radius: [5, 5, 0, 0],
                    isAnimationActive: true,
                    dataKey: "total",
                  }}
                />
              </Paper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
              <Paper className="border-paper p-xs">
                <Group mb="sm" justify="space-between gap-sm w-full">
                  <Box className="grow">
                    <Text className="font-bold text-2xl">
                      Submissões activas
                    </Text>
                    <Text c="dimmed" size="sm">
                      Acompanhe os pedidos em andamento
                    </Text>
                  </Box>
                  <Button size="sm" variant="default">
                    Ver todos
                  </Button>
                </Group>
                <div className="scrollArea overflow-y-auto h-[350px]">
                  <Stack className="pr-[2px]">
                    <ComplaintsList />
                  </Stack>
                </div>
              </Paper>
            </Grid.Col>
          </Grid>
        </Stack>
      </div>
    </div>
  );
}
