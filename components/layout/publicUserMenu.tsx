import { Group, Menu, Text } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { signOut, useSession } from "next-auth/react";
import { AvatarButton } from "./avatarButton";
import Link from "next/link";

export function PublicUserMenu() {
  const { data } = useSession();
  return (
    <Menu offset={10} shadow="md" position="bottom-end">
      <Menu.Target>
        <AvatarButton px="sm" />
      </Menu.Target>
      <Menu.Dropdown>
        <Group p="sm" visibleFrom="sm">
          <div style={{ flex: 1 }}>
            <Text fw={500}>{data?.user.name}</Text>
            <Text c="dimmed">{data?.user.email}</Text>
          </div>
        </Group>
        <Menu.Divider />
        <Menu.Item component={Link} href={"/profile"}>
          Perfil do usuário
        </Menu.Item>
        <Menu.Item>Definições</Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          onClick={() =>
            modals.openConfirmModal({
              title: (
                <Group gap={5}>
                  <IconExclamationCircle size={16} />
                  <Text className="font-semibold">Confirme</Text>
                </Group>
              ),
              children: <Text>Deseja terminar a sessão?</Text>,
              onConfirm: () => signOut(),
              confirmProps: {
                children: "Sim",
                size: "xs",
              },
              cancelProps: {
                children: "Fechar",
                size: "xs",
              },
            })
          }
        >
          Saír
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
