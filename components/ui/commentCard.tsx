import { Avatar, Group, Paper, Rating, Stack, Text } from "@mantine/core";

export type CommentCardProps = {
  rating?: number;
};

export function CommentCard({ rating }: CommentCardProps) {
  return (
    <Paper
      p="sm"
      className="shadow-none cusrsor-pointer bg-stone-50 hover:bg-stone-700/8 transition-colors duration-200"
    >
      <Stack gap="xs">
        <Group justify="space-between">
          <Group gap="xs">
            <Avatar />
            <div>
              <Text className="text-sm">Eugénio Nhampossa</Text>
              <Text className="text-xs text-stone-500">11/04/2020</Text>
            </div>
          </Group>
          {rating && <Rating color="primary" defaultValue={rating} readOnly />}
        </Group>
        <Text c="dimmed" className="text-sm line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora porro
          facere temporibus eligendi perferendis! Magnam vel corporis deserunt,
          optio adipisci nostrum impedit similique illo sapiente eligendi esse
          earum porro non.
        </Text>
      </Stack>
    </Paper>
  );
}
