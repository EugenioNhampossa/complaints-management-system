"use client";

import { CheckboxCard } from "@/components/ui/checkboxCard";
import { useCreateCategory } from "@/modules/category/category.hooks";
import { createCategorySchema } from "@/modules/category/category.schema";
import {
  Button,
  Stack,
  Group,
  Textarea,
  TextInput,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { zod4Resolver } from "mantine-form-zod-resolver";
import React from "react";
import { z } from "zod";

export function CreateCategoryForm() {
  const form = useForm<z.infer<typeof createCategorySchema>>({
    validate: zod4Resolver(createCategorySchema),
    mode: "uncontrolled",
    validateInputOnChange: true,
    initialValues: {
      description: "",
      isActive: false,
      title: "",
    },
  });

  const { mutate, isPending } = useCreateCategory();

  function onSubmit(values: z.infer<typeof createCategorySchema>) {
    mutate(values, {
      onSuccess() {
        form.reset();
        closeAllModals();
      },
    });
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Alert>
          Preencha todos os campos obrigatórios{" "}
          <span style={{ color: "var(--mantine-color-red-5)" }}>*</span>
        </Alert>
        <Stack>
          <CheckboxCard
            label="Disponível para submissão"
            description="Informe se a categoria estará imediatamente disponível nos formulários"
            key={form.key(`isActive`)}
            {...form.getInputProps(`isActive`, { type: "checkbox" })}
          />
          <TextInput
            withAsterisk
            placeholder="Insira o título da categoria"
            variant="filled"
            label="Título"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />
          <Textarea
            withAsterisk
            placeholder="Insira a descrição"
            variant="filled"
            label="Descrição"
            minRows={4}
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
        </Stack>
        <Group justify="right">
          <Button
            size="xs"
            type="button"
            variant="default"
            onClick={() => closeAllModals()}
          >
            Fechar
          </Button>
          <Button loading={isPending} size="xs" type="submit">
            Registrar
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
