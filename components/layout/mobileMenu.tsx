import {
  ActionIcon,
  Group,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { NavLinks } from "./header";
import { IconExclamationCircle, IconMenu2 } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { AvatarButton } from "./avatarButton";
import { modals } from "@mantine/modals";
import { signOut } from "next-auth/react";

export function MobileMenu() {
  const { status, data } = useSession();

  return (
    <Menu shadow="md" position="bottom-end" width={200}>
      <MenuTarget>
        <ActionIcon size="lg" hiddenFrom="lg" variant="subtle">
          <IconMenu2 size={32} />
        </ActionIcon>
      </MenuTarget>
      <MenuDropdown>
        {status === "authenticated" && (
          <>
            <AvatarButton px={10} />
            <MenuItem component={Link} href={"/profile"}>
              Perfil do usuário
            </MenuItem>
            <MenuDivider />
          </>
        )}
        {NavLinks.map((link) => (
          <MenuItem component={Link} key={link.key} href={link.href}>
            {link.label}
          </MenuItem>
        ))}

        {data?.user && data.user.type === "ADMIN" && (
          <>
            <MenuDivider />
            <MenuItem color="primary" component={Link} href="/admin">
              Dashboard
            </MenuItem>
            <MenuItem
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
            </MenuItem>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <MenuItem
              href={"/auth/register"}
              component={Link}
              variant="outline"
            >
              Registre-se
            </MenuItem>
            <MenuItem
              href={"/auth/login"}
              component={Link}
              color="primary"
              variant="filled"
            >
              Entrar
            </MenuItem>
          </>
        )}
      </MenuDropdown>
    </Menu>
  );
}
