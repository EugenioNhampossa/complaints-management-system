import { Group, Menu, MenuProps, Text } from "@mantine/core";
import {
  IconExclamationCircle,
  IconForklift,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import React from "react";
import { UserButton } from "./userButton";
import { modals } from "@mantine/modals";
import Link from "next/link";

export type UserMenuProps = MenuProps;

const UserMenu = React.forwardRef<HTMLDivElement, UserMenuProps>(
  (props, ref) => {
    return (
      <div ref={ref}>
        <Menu {...props} shadow="md" width={210}>
          <Menu.Target>
            <UserButton />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Menu do utilizador</Menu.Label>
            <Menu.Item
              component={Link}
              href="/admin/user-profile"
              className="p-1"
              leftSection={<IconUser size={14} />}
            >
              Perfil
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              component={Link}
              href="/pre-admin"
              className="p-1"
              leftSection={<IconForklift size={14} />}
            >
              Mudar restautante
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              className="p-1"
              color="red"
              leftSection={<IconLogout size={14} />}
              onClick={() =>
                modals.openConfirmModal({
                  title: (
                    <Group gap={5}>
                      <IconExclamationCircle size={16} />
                      <Text className="font-semibold">Confirme</Text>
                    </Group>
                  ),
                  children: <Text>Deseja terminar a sessão?</Text>,
                  onConfirm: () => {},
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
      </div>
    );
  }
);

UserMenu.displayName = "UserMenu";

export { UserMenu };
