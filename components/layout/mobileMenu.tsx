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

export function MobileMenu() {
  return (
    <Menu shadow="md" width={200}>
      <MenuTarget>
        <ActionIcon size="lg" hiddenFrom="lg" variant="subtle">
          <IconMenu2 size={32} />
        </ActionIcon>
      </MenuTarget>

      <MenuDropdown>
        {NavLinks.map((link) => (
          <MenuItem component={Link} key={link.key} href={link.href}>
            {link.label}
          </MenuItem>
        ))}
        <MenuDivider />
        <MenuItem variant="outline">Registre-se</MenuItem>
        <MenuItem color="primary" variant="filled">
          Entrar
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
}
