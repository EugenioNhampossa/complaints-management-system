"use client";

import { authSchema } from "@/modules/auth/auth.schema";
import {
  Box,
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Alert,
  Group,
  Anchor,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  IconCircleX,
  IconExclamationCircle,
  IconLogin,
} from "@tabler/icons-react";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import z from "zod";
import { notificationType, notify } from "@/utils/notify.util";

export function LoginForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const form = useForm<z.infer<typeof authSchema>>({
    validate: zod4Resolver(authSchema),
    mode: "uncontrolled",
    validateInputOnChange: true,
  });

  async function onSubmit(values: z.infer<typeof authSchema>) {
    const { email, password } = values;
    setIsPending(true);
    setErrorMessage(null);

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!response?.ok) {
        throw new Error("Credenciais inválidas");
      }

      notify({
        type: notificationType.info,
        title: "Autenticação bem-sucedida",
        message: "A redirecionar...",
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Ocorreu um erro desconhecido";

      setErrorMessage(errorMsg);

      notify({
        type: notificationType.error,
        title: "Falha na autenticação",
        message: errorMsg,
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Box>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          {errorMessage && (
            <Alert color="red" icon={<IconExclamationCircle />}>
              {errorMessage}
            </Alert>
          )}
          <Stack>
            <TextInput
              withAsterisk
              placeholder="Insira o email"
              variant="filled"
              label="Email"
              disabled={isPending}
              key={form.key(`email`)}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              placeholder="Insira a senha"
              variant="filled"
              label="Senha"
              disabled={isPending}
              key={form.key(`password`)}
              {...form.getInputProps("password")}
            />
            <Group justify="space-between">
              <Checkbox label="Lembre de mim" disabled={isPending} />
              <Anchor size="sm" href="/auth/forgot-password">
                Esqueceu a senha?
              </Anchor>
            </Group>
          </Stack>
          <Button loading={isPending} type="submit" leftSection={<IconLogin />}>
            Entrar
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
