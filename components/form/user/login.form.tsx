"use client";

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
import { IconExclamationCircle, IconLogin } from "@tabler/icons-react";
import { useState } from "react";

export function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  return (
    <Box c="gray.8">
      <form>
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
            />
            <PasswordInput
              withAsterisk
              placeholder="Insira a senha "
              variant="filled"
              label="Senha"
            />
            <Group justify="space-between">
              <Checkbox label="Lembre de mim" />
              <Anchor size="sm" href="#">
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
