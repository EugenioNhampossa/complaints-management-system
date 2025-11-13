import {
  ActionIcon,
  Button,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Stack,
} from "@mantine/core";
import Link from "next/link";
import { NavLinks } from "./header";
import { IconMenu2 } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { AvatarButton } from "./avatarButton";

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
            <MenuDivider />
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <MenuItem variant="outline">Registre-se</MenuItem>
            <MenuItem color="primary" variant="filled">
              Entrar
            </MenuItem>
          </>
        )}
      </MenuDropdown>
    </Menu>
  );
}
