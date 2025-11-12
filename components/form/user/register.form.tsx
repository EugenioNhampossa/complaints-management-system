"use client";

import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
  SimpleGrid,
} from "@mantine/core";
import {
  IconAt,
  IconLock,
  IconUser,
  IconPhone,
  IconId,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import z from "zod";
import { useRouter } from "next/navigation";
import { createCitizenSchema } from "@/modules/citizen/citizen.schema";
import { useCreateCitizen } from "@/modules/citizen/citizen.hooks";

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof createCitizenSchema>>({
    validate: zod4Resolver(createCitizenSchema),
    mode: "uncontrolled",
    validateInputOnChange: true,
  });

  const { mutate, isPending } = useCreateCitizen();

  const handleSubmit = (values: typeof form.values) => {
    mutate(values, {
      onSuccess() {
        form.reset();
        router.push("/");
      },
    });
  };

  console.log(form.errors);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <SimpleGrid cols={{ lg: 2, sm: 1 }}>
          <TextInput
            label="Primeiro nome"
            placeholder="Digite seu primeiro nome"
            leftSection={<IconUser size={16} />}
            variant="filled"
            key={form.key(`firstName`)}
            {...form.getInputProps("firstName")}
          />
          <TextInput
            label="Último nome"
            placeholder="Digite seu último nome"
            leftSection={<IconUser size={16} />}
            variant="filled"
            key={form.key(`lastName`)}
            {...form.getInputProps("lastName")}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ lg: 2, sm: 1 }}>
          <TextInput
            label="Email"
            placeholder="seu.email@exemplo.com"
            leftSection={<IconAt size={16} />}
            variant="filled"
            key={form.key(`email`)}
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Telefone"
            placeholder="84 123 4567"
            leftSection={<IconPhone size={16} />}
            variant="filled"
            key={form.key(`phone`)}
            {...form.getInputProps("phone")}
          />
        </SimpleGrid>
        <TextInput
          label="Número do BI"
          placeholder="110100123456A"
          leftSection={<IconId size={16} />}
          variant="filled"
          key={form.key(`idNumber`)}
          {...form.getInputProps("idNumber")}
        />
        <SimpleGrid cols={{ lg: 2, sm: 1 }}>
          <PasswordInput
            label="Senha"
            placeholder="Digite sua senha"
            leftSection={<IconLock size={16} />}
            variant="filled"
            key={form.key(`password`)}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirmar senha"
            placeholder="Digite a senha novamente"
            leftSection={<IconLock size={16} />}
            variant="filled"
            key={form.key(`confirmPassword`)}
            {...form.getInputProps("confirmPassword")}
          />
        </SimpleGrid>
        <Text c="dimmed" className="text-sm text-center">
          Ao criar conta, aceito todos os termos e condições
        </Text>
        <Button type="submit" loading={isPending} fullWidth size="md">
          Criar conta
        </Button>
      </Stack>
    </form>
  );
}
