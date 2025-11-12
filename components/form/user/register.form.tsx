"use client";

import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
  SimpleGrid,
  Select,
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
import { UserType } from "@/prisma/generated/prisma";
import { getUserTypeText } from "@/utils/getUserTypeText";

export function RegisterForm({
  withUserType = false,
}: {
  withUserType?: boolean;
}) {
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
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        {withUserType && (
          <Select
            placeholder="Seleccione a função do utilizador"
            description="Se o campo não for preenchido, o utlizador será registrado como cidadão"
            label="Estado"
            variant="filled"
            data={[
              {
                value: "CITIZEN",
                label: "Cidadão",
              },
              {
                value: "EMPLOYEE",
                label: "Funcionário",
              },
            ]}
            key={form.key(`type`)}
            {...form.getInputProps("type")}
          />
        )}
        <SimpleGrid cols={{ lg: 2, sm: 1 }}>
          <TextInput
            withAsterisk
            label="Primeiro nome"
            placeholder="Digite seu primeiro nome"
            leftSection={<IconUser size={16} />}
            variant="filled"
            key={form.key(`firstName`)}
            {...form.getInputProps("firstName")}
          />
          <TextInput
            withAsterisk
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
            withAsterisk
            label="Email"
            placeholder="seu.email@exemplo.com"
            leftSection={<IconAt size={16} />}
            variant="filled"
            key={form.key(`email`)}
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Telefone"
            placeholder="84 123 4567"
            leftSection={<IconPhone size={16} />}
            variant="filled"
            key={form.key(`phone`)}
            {...form.getInputProps("phone")}
          />
        </SimpleGrid>
        <TextInput
          withAsterisk
          label="Número do BI"
          placeholder="110100123456A"
          leftSection={<IconId size={16} />}
          variant="filled"
          key={form.key(`idNumber`)}
          {...form.getInputProps("idNumber")}
        />
        <SimpleGrid cols={{ lg: 2, sm: 1 }}>
          <PasswordInput
            withAsterisk
            label="Senha"
            placeholder="Digite sua senha"
            leftSection={<IconLock size={16} />}
            variant="filled"
            key={form.key(`password`)}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            withAsterisk
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
