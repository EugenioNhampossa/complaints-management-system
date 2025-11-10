import {
  Avatar,
  Badge,
  Group,
  Paper,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import Link from "next/link";

export type ComplaintCardProps = {
  href?: string;
  onClick?: () => void;
};

export function ComplaintCard({ href = "#", onClick }: ComplaintCardProps) {
  return (
    <UnstyledButton
      onClick={onClick}
      component={Link}
      href={href}
      className="rounded-md"
    >
      <Paper
        p="sm"
        className="shadow-none cusrsor-pointer bg-stone-50 hover:bg-stone-700/8 transition-colors duration-200"
      >
        <Stack gap="xs">
          <Group gap="xs">
            <Avatar />
            <div>
              <Text className="text-sm">Eugénio Nhampossa</Text>
              <Text className="text-xs text-stone-500">11/04/2020</Text>
            </div>
          </Group>
          <Text className="font-semibold text-sm">
            Lixo a transbordar do contentor
          </Text>
          <Text c="dimmed" className="text-sm line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            porro facere temporibus eligendi perferendis! Magnam vel corporis
            deserunt, optio adipisci nostrum impedit similique illo sapiente
            eligendi esse earum porro non.
          </Text>
          <Group justify="space-between" align="center">
            <Group gap="2px">
              <IconMapPin size={16} />
              <Text className="text-xs ">Maputo, Moçambique</Text>
            </Group>
            <Badge size="sm" color="red" variant="light" className="text-xs">
              Pendente
            </Badge>
          </Group>
        </Stack>
      </Paper>
    </UnstyledButton>
  );
}
