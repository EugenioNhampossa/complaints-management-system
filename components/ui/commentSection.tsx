import {
  Avatar,
  Group,
  Rating,
  Stack,
  Tabs,
  Textarea,
  Title,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { range } from "@mantine/hooks";
import { CommentCard } from "./commentCard";
import { IconSend } from "@tabler/icons-react";

export function CommentSection() {
  return (
    <Tabs defaultValue="rating" variant="pills" mt="xl">
      <Tabs.List className="bg-stone-100 p-2 rounded-md mb-lg">
        <Tabs.Tab value="rating">Avaliações</Tabs.Tab>
        <Tabs.Tab value="comments">Comentários</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="rating">
        <Stack>
          <Title order={4}>Avaliações</Title>
          <Stack gap="xs">
            <Group justify="space-between">
              <Group gap="xs">
                <Avatar />
                <div>
                  <Text className="text-sm">Eugénio Nhampossa</Text>
                  <Text className="text-xs text-stone-500">11/04/2020</Text>
                </div>
              </Group>
              <Rating defaultValue={2} />
            </Group>
            <Group justify="space-between">
              <Textarea
                className="grow"
                variant="filled"
                placeholder="Digite um comentário"
              />
              <UnstyledButton className="h-[60px] p-xs rounded-md text-primary bg-primary/30 hover:bg-primary/20">
                <IconSend />
              </UnstyledButton>
            </Group>
          </Stack>
          {range(0, 3).map((index) => (
            <CommentCard key={index} rating={index} />
          ))}
        </Stack>
      </Tabs.Panel>
      <Tabs.Panel value="comments">
        <Stack>
          <Title order={4}>Comentários</Title>
          {range(0, 3).map((index) => (
            <CommentCard key={index + "0"} />
          ))}
        </Stack>
      </Tabs.Panel>
    </Tabs>
  );
}
