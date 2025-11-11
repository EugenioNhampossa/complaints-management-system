"use client";

import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Checkbox,
} from "@mantine/core";
import { IconAt, IconLock, IconUser, IconPhone } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validate: {
      name: (value) => 
        value.length < 3 ? "O nome deve ter pelo menos 3 caracteres" : null,
      email: (value) => 
        !/^\S+@\S+$/.test(value) ? "Email inválido" : null,
      phone: (value) =>
        value.length < 9 ? "Número de telefone inválido" : null,
      password: (value) =>
        value.length < 6 ? "A senha deve ter pelo menos 6 caracteres" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "As senhas não coincidem" : null,
      terms: (value) =>
        !value ? "Deve aceitar os termos e condições" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Registro:", values);

  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Nome completo"
          placeholder="Digite seu nome completo"
          leftSection={<IconUser size={16} />}
          required
          {...form.getInputProps("name")}
        />

        <TextInput
          label="Email"
          placeholder="seu.email@exemplo.com"
          leftSection={<IconAt size={16} />}
          required
          {...form.getInputProps("email")}
        />

        <TextInput
          label="Telefone"
          placeholder="84 123 4567"
          leftSection={<IconPhone size={16} />}
          required
          {...form.getInputProps("phone")}
        />

        <PasswordInput
          label="Senha"
          placeholder="Digite sua senha"
          leftSection={<IconLock size={16} />}
          required
          {...form.getInputProps("password")}
        />

        <PasswordInput
          label="Confirmar senha"
          placeholder="Digite a senha novamente"
          leftSection={<IconLock size={16} />}
          required
          {...form.getInputProps("confirmPassword")}
        />

        <Checkbox
          label="Aceito os termos e condições de uso"
          {...form.getInputProps("terms", { type: "checkbox" })}
        />

        <Button type="submit" fullWidth size="md">
          Criar conta
        </Button>
      </Stack>
    </form>
  );
}