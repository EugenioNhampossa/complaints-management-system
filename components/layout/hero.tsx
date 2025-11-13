"use client";

import { Badge, Button, Grid, Image, SimpleGrid } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="container mx-auto px-4 mt-3">
      <SimpleGrid cols={{ md: 2, base: 1 }} spacing={50}>
        <div className="max-xs:text-center">
          <Badge leftSection={<IconHeart size={12} />} variant="outline">
            juntos fazemos a diferença
          </Badge>
          <h5 className="text-4xl md:text-6xl/[76px] font-semibold max-w-xl bg-gradient-to-r from-gray-700 to-primary-500 text-transparent bg-clip-text">
            Dê voz às suas preocupações
          </h5>
          <p className="text-sm md:text-base max-w-lg mt-6 max-md:px-2 text-stone-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore
            autem laboriosam ex, perspiciatis atque asperiores iure excepturi
            iste nostrum cumque, aliquam dolore.
          </p>
          <div className="flex items-center gap-4 mt-6 justify-start max-xs:justify-center">
            <Button component={Link} href="/complaints/add" size="md">
              Submeta uma reclamação
            </Button>
          </div>
          <div className="mt-lg flex  flex-1 gap-10 lg:gap-0 flex-row lg:justify-between">
            <div>
              <div className="font-manrope font-bold text-2xl text-stone-900">
                260+
              </div>
              <span className="text-stone-500  block text-sm">
                Reclamações Submetidas
              </span>
            </div>
            <div>
              <div className="font-manrope font-bold text-2xl text-stone-900">
                475+
              </div>
              <span className="text-stone-500  block text-sm">
                Usuários Cadastrados
              </span>
            </div>
            <div>
              <div className="font-manrope font-bold text-2xl text-stone-900">
                724+
              </div>
              <span className="text-stone-500  block text-sm">
                Situações Resolvidas
              </span>
            </div>
          </div>
        </div>
        <Grid>
          <Grid.Col span={6}>
            <Image
              className="bg-cover h-full rounded-md"
              src="/hero-img1.jpg"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Image
              className="bg-cover h-full rounded-md"
              src="/hero-img2.avif"
            />
          </Grid.Col>
          <Grid.Col span={6}></Grid.Col>
          <Grid.Col span={6}>
            <Image
              className="bg-cover h-full rounded-md"
              src="/hero-img3.avif"
            />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </div>
  );
}
