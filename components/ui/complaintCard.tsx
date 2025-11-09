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

export function ComplaintCard() {
  return (
    <UnstyledButton className="rounded-md">
      <Paper
        p="sm"
        className="shadow-none cusrsor-pointer bg-slate-50 hover:bg-primary/8 transition-colors duration-200"
      >
        <Stack gap="xs">
          <Group gap="xs">
            <Avatar />
            <div>
              <Text className="text-sm">Eugénio Nhampossa</Text>
              <Text className="text-xs text-slate-500">11/04/2020</Text>
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
              <IconMapPin size={16} className="text-slate-500" />
              <Text className="text-xs text-slate-500">Maputo, Moçambique</Text>
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
