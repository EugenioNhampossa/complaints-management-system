"use client";

import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Checkbox,
} from "@mantine/core";
import { IconAt, IconLock, IconUser, IconPhone } from "@tabler/icons-react";

export function RegisterForm() {
  return (
    <form>
      <Stack>
        <TextInput
          label="Nome completo"
          placeholder="Digite seu nome completo"
          leftSection={<IconUser size={16} />}
          required
        />

        <TextInput
          label="Email"
          placeholder="seu.email@exemplo.com"
          leftSection={<IconAt size={16} />}
          required
        />

        <TextInput
          label="Telefone"
          placeholder="8x 123 4567"
          leftSection={<IconPhone size={16} />}
          required
        />

        <PasswordInput
          label="Senha"
          placeholder="Digite sua senha"
          leftSection={<IconLock size={16} />}
          required
        />

        <PasswordInput
          label="Confirmar senha"
          placeholder="Digite a senha novamente"
          leftSection={<IconLock size={16} />}
          required
        />

        <Checkbox
          label="Aceito os termos e condições de uso"
        />

        <Button type="submit" fullWidth size="md">
          Criar conta
        </Button>
      </Stack>
    </form>
  );
}