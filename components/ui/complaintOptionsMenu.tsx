import {
  Button,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuTarget,
} from "@mantine/core";

export function ComplaintOptionsMenu() {
  return (
    <Menu shadow="md" position="bottom-end">
      <MenuTarget>
        <Button size="sm" variant="light">
          Opções
        </Button>
      </MenuTarget>
      <MenuDropdown>
        <MenuItem variant="filled">Alocar funcionários</MenuItem>
        <MenuDivider />
        <MenuItem variant="filled" color="green">
          Marcar como concluído
        </MenuItem>
        <MenuItem variant="filled" color="orange">
          Marcar como em progresso
        </MenuItem>
        <MenuDivider />
        <MenuItem color="red" variant="filled">
          Marcar como duplicado
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
}
