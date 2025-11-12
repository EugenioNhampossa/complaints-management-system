"use client";

import { CheckboxCard } from "@/components/ui/checkboxCard";
import {
  useDeleteCategory,
  useUpdateCategory,
} from "@/modules/category/category.hooks";
import {
  categoryResponseSchema,
  updateCategorySchema,
} from "@/modules/category/category.schema";
import {
  Button,
  Stack,
  Group,
  Textarea,
  TextInput,
  Alert,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { zod4Resolver } from "mantine-form-zod-resolver";
import React, { useEffect } from "react";
import { z } from "zod";

export function UpdateCategoryForm({
  category,
}: {
  category: z.infer<typeof categoryResponseSchema>;
}) {
  const form = useForm<z.infer<typeof updateCategorySchema>>({
    validate: zod4Resolver(updateCategorySchema),
    mode: "uncontrolled",
    validateInputOnChange: true,
  });

  useEffect(() => {
    if (category) {
      form.initialize(category);
    }
  }, [category]);

  const { mutate, isPending } = useUpdateCategory();
  const { mutate: remove } = useDeleteCategory();

  function onSubmit(values: z.infer<typeof updateCategorySchema>) {
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
        <Group justify="space-between">
          <Button
            size="xs"
            type="button"
            variant="light"
            color="red"
            onClick={() =>
              openConfirmModal({
                title: "Atenção",
                children: (
                  <Text className="text-sm">
                    Deseja apagar a categoria? Todos os dados sobre a categoria
                    serão perdidos.
                  </Text>
                ),
                onConfirm: () => {
                  remove(category.id);
                  closeAllModals();
                },
                confirmProps: {
                  children: "Sim",
                  color: "red",
                  size: "xs",
                },
                cancelProps: {
                  children: "Fechar",
                  variant: "default",
                  size: "xs",
                },
              })
            }
          >
            Apagar
          </Button>
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
        </Group>
      </Stack>
    </form>
  );
}
