"use client";

import { Hero } from "@/components/layout/hero";
import {
  Box,
  rem,
  SimpleGrid,
  Stack,
  Title,
  Text,
  Button,
} from "@mantine/core";
import { ComplaintCard } from "@/components/ui/complaintCard";
import { range } from "@mantine/hooks";

export default function HomePage() {
  return (
    <Stack gap={rem("50px")}>
      <Hero />
      <div className="container mx-auto p-4 mt-3 h-[50vh] rounded-md">
        <Box mb={rem("30px")}>
          <Title order={2} mb="" className="text-center">
            Reclamações submetidas
          </Title>
          <Text className="text-center text-sm  text-slate-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
            reprehenderit corrupti tenetur illo maxime.
          </Text>
        </Box>
        <SimpleGrid cols={{ lg: 4, md: 3, base: 1 }} spacing={20}>
          {range(1, 8).map((index) => (
            <ComplaintCard key={index} />
          ))}
        </SimpleGrid>
        <div className="flex justify-center mt-8">
          <Button size="md">Ver mais reclamações</Button>
        </div>
      </div>
    </Stack>
  );
}
