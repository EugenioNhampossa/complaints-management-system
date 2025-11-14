"use client";

import { Footer } from "@/components/layout/footer";
import { MapView } from "@/components/map/mapview";
import { CommentSection } from "@/components/ui/commentSection";
import { useFindOneComplaint } from "@/modules/complaints/complaints.hooks";
import {
  getComplaintStatusColor,
  getComplaintStatusText,
} from "@/utils/getComplaintStatusText";
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
  Skeleton,
} from "@mantine/core";
import { range } from "@mantine/hooks";
import { IconMap2 } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

export default function ComplaintDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string>("");
  useEffect(() => {
    params.then((value) => setId(value.id));
  }, [params]);

  const { data, isLoading } = useFindOneComplaint(id);

  if (isLoading || !data) {
    return (
      <div>
        <Stack className="container mx-auto p-4 mb-md rounded-md">
          <Grid>
            <GridCol span={{ md: 8, sm: 12 }}>
              <Skeleton className="h-[400px] rounded-md bg-stone-100" />
            </GridCol>
            <GridCol span={{ md: 4, sm: 12 }}>
              <Stack gap="sm">
                <Skeleton className="h-[32px] w-3/4 rounded-md" />
                <Skeleton className="h-[180px] w-full rounded-md" />
                <Divider />
                <Skeleton className="h-[40px] rounded-md" />
                <Divider />
                <Skeleton className="h-[40px] rounded-md" />
              </Stack>
            </GridCol>
          </Grid>
          <Title order={4}>Imagens</Title>
          <SimpleGrid cols={{ lg: 4, md: 3, sm: 2, xs: 1 }}>
            {range(0, 3).map((index) => (
              <Skeleton
                key={`loader-${index}`}
                className="h-[200px] rounded-md"
              />
            ))}
          </SimpleGrid>
          <CommentSection />
        </Stack>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Stack className="container mx-auto p-4 mb-md rounded-md">
        <Grid>
          <GridCol span={{ md: 8, sm: 12 }}>
            <div className="h-[400px] rounded-md bg-stone-100">
              {data?.data && (
                <MapView
                  latitude={data?.data?.address.latitude}
                  longitude={data?.data?.address.longitude}
                  zoom={13}
                />
              )}
            </div>
          </GridCol>
          <GridCol span={{ md: 4, sm: 12 }}>
            <Stack gap="sm">
              <Title order={3}>{data?.data?.title}</Title>
              <Text size="sm" c="dimmed" className="text-justify h-[170px]">
                {data?.data?.description}
              </Text>
              <Divider />
              <Group gap="xs">
                <Avatar />
                <div>
                  <Text className="text-sm">{`${data?.data?.citizen.personalInfo.firstName} ${data?.data?.citizen.personalInfo.lastName}`}</Text>
                  <Text className="text-xs text-stone-500">
                    {dayjs(data?.data?.createdAt).format("DD/MM/YYYY")}
                  </Text>
                </div>
              </Group>
              <Divider />
              <Group gap="xs">
                <ThemeIcon variant="light" className="rounded-full" size={38}>
                  <IconMap2 stroke={1.7} />
                </ThemeIcon>
                <Text className="text-sm">{`${data?.data?.address.province}, ${data?.data?.address.district}`}</Text>
              </Group>
              <Divider />
              <Group>
                <Text className="text-sm" c="dimmed">
                  Estado actual:
                </Text>
                <Badge
                  size="sm"
                  className={getComplaintStatusColor(data?.data?.status!)}
                >
                  {getComplaintStatusText(data?.data?.status!)}
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
      <Footer />
    </div>
  );
}
