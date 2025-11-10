"use client";

import { Breadcrumbs } from "@/components/layout/admin/breadcrumbs";
import { TitleBar } from "@/components/layout/admin/titleBar";
import { Footer } from "@/components/layout/footer";
import { LocationPicker } from "@/components/map/LocationPicker";
import { CommentSection } from "@/components/ui/commentSection";
import { ComplaintOptionsMenu } from "@/components/ui/complaintOptionsMenu";
import {
  Grid,
  GridCol,
  Stack,
  Title,
  Text,
  Divider,
  Avatar,
  Group,
  ThemeIcon,
  Badge,
  SimpleGrid,
  Image,
  UnstyledButton,
  Box,
} from "@mantine/core";
import { range } from "@mantine/hooks";
import { IconMap2 } from "@tabler/icons-react";

export default function ComplaintDetails() {
  return (
    <div className="mb-[20px]">
      <Breadcrumbs
        items={[
          { title: "Página inicial", href: "/admin" },
          { title: "Reclamações", href: "/admin/complaints" },
          { title: "Detalhes" },
        ]}
      />
      <div className="px-xs sm:px-lg">
        <TitleBar
          title="Detalhes da reclamação"
          rightSection={<ComplaintOptionsMenu/>}
        />
        <Box mt="xl">
          <Stack>
            <Grid>
              <GridCol span={{ md: 8, sm: 12 }}>
                <div className="h-[400px] rounded-md bg-stone-100">
                  <LocationPicker
                    setLocation={() => {}}
                    setDescription={() => {}}
                  />
                </div>
              </GridCol>
              <GridCol span={{ md: 4, sm: 12 }}>
                <Stack gap="sm">
                  <Title order={3}>Remoção de lixo na rua 3344</Title>
                  <Text size="sm" c="dimmed" className="text-justify">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Accusantium dolorem cumque magni culpa possimus quis iusto
                    ipsam, accusamus tempore veniam rerum obcaecati delectus
                    dolores aut pariatur eos quasi! Perferendis, quas. Lorem
                    ipsum dolor sit, amet consectetur adipisicing elit.
                    Accusantium dolorem cumque magni culpa possimus quis iusto
                    ipsam, accusamus tempore veniam rerum obcaecati delectus
                    dolores aut pariatur eos quasi! Perferendis, quas.
                  </Text>
                  <Divider />
                  <Group gap="xs">
                    <Avatar />
                    <div>
                      <Text className="text-sm">Eugénio Nhampossa</Text>
                      <Text className="text-xs text-stone-500">11/04/2020</Text>
                    </div>
                  </Group>
                  <Divider />
                  <Group gap="xs">
                    <ThemeIcon
                      variant="light"
                      className="rounded-full"
                      size={38}
                    >
                      <IconMap2 stroke={1.7} />
                    </ThemeIcon>
                    <Text className="text-sm">Maputo, Matola Tsalala</Text>
                  </Group>
                  <Divider />
                  <Group>
                    <Text className="text-sm" c="dimmed">
                      Estado actual:
                    </Text>
                    <Badge size="sm" variant="light" color="blue">
                      Submetido
                    </Badge>
                  </Group>
                </Stack>
              </GridCol>
            </Grid>
            <Title order={4}>Imagens</Title>
            <SimpleGrid cols={{ lg: 4, md: 3, sm: 2, xs: 1 }}>
              {range(0, 3).map((index) => (
                <UnstyledButton
                  key={index}
                  className="w-full relative mx-auto h-auto overflow-hidden rounded-lg "
                >
                  <Image
                    className="bg-cover h-full rounded-md transition-all duration-300 hover:scale-110"
                    src="https://images.unsplash.com/photo-1591486085897-f433f05e7aed?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
                  />
                </UnstyledButton>
              ))}
            </SimpleGrid>
            <CommentSection />
          </Stack>
        </Box>
      </div>
    </div>
  );
}
