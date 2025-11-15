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
  Skeleton,
} from "@mantine/core";
import { ComplaintCard } from "@/components/ui/complaintCard";
import { range } from "@mantine/hooks";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { useFindManyComplaints } from "@/modules/complaints/complaints.hooks";
import { EmptyState } from "@/components/ui/emptyState";

export default function HomePage() {
  const { data: complaints, isLoading } = useFindManyComplaints({ limit: 8 });

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
    <Stack gap={rem("50px")}>
      <Hero />
      <section className="container mx-auto p-4 mt-3 rounded-md">
        <Box mb={rem("30px")}>
          <Title order={2} mb="" className="text-center">
            Reclamações submetidas
          </Title>
          <Text className="text-center text-sm  text-stone-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
            reprehenderit corrupti tenetur illo maxime.
          </Text>
        </Box>
        <ComplaintsList />
        <div className="flex justify-center mt-8">
          <Button component={Link} href="/complaints" size="md">
            Ver mais reclamações
          </Button>
        </div>
      </section>
      {/* <section className="bg-stone-50 py-10 ">
        <SimpleGrid
          className="container mx-auto px-4"
          cols={{ md: 2, base: 1 }}
          spacing={50}
        >
          <Image
            className="bg-cover h-full lg:max-w-[500px] rounded-md"
            src="/men-on-cell.jpg"
          />
          <Stack>
            <Title order={2} mb="" className="text-center">
              Reclamações submetidas
            </Title>
            <Text className="text-center text-sm  text-stone-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Similique reprehenderit corrupti tenetur illo maxime.
            </Text>
          </Stack>
        </SimpleGrid>
      </section> */}
      <Footer />
    </Stack>
  );
}
