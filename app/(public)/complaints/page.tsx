"use client";

import { Footer } from "@/components/layout/footer";
import { ComplaintCard } from "@/components/ui/complaintCard";
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
} from "@mantine/core";
import { range } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";

export default function ComplaintsPage() {
  return (
    <div>
      <div className="container mx-auto p-4 mb-md rounded-md">
        <Stack gap={rem("20px")}>
          <Paper className="shadow-none bg-primary flex flex-col items-center justify-center mb-6 text-white py-12">
            <Title className="text-center">
              Veja Todas Reclamações Submetidas
            </Title>
            <Text className="text-center text-sm text-slate-50 md:text-base max-w-lg mt-6 max-md:px-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              expedita animi ducimus consequatur sapiente id dignissimos
              placeat.
            </Text>
            <Button
              size="md"
              component={Link}
              href="/complaints/add"
              className="mt-6 bg-white text-primary hover:bg-slate-100"
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
            <SimpleGrid cols={{ lg: 4, md: 3, sm: 2, base: 1 }} spacing={20}>
              {range(1, 8).map((index) => (
                <ComplaintCard key={index} />
              ))}
            </SimpleGrid>
            <Divider my="xs" />
            <Group justify="space-between">
              <Text c="dimmed" className="text-sm">
                Página 1 de 5
              </Text>
              <Pagination total={5} size="sm" />
            </Group>
          </div>
        </Stack>
      </div>
      <Footer />
    </div>
  );
}
