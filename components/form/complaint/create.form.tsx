import { LocationPicker } from "@/components/map/LocationPicker";
import { useSelectCategories } from "@/modules/category/category.hooks";
import { useGetCitizenByUserId } from "@/modules/citizen/citizen.hooks";
import { useCreateComplaint } from "@/modules/complaints/complaints.hooks";
import { createComplaintSchema } from "@/modules/complaints/complaints.schema";
import {
  getDistrictsByProvince,
  getProvinceOptions,
} from "@/utils/mozambique-locations";
import {
  Alert,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
  Text,
  Textarea,
  Group,
  Button,
  Divider,
  InputLabel,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";
import z from "zod";

export function CreateComplaintForm() {
  const { status, data } = useSession();

  const form = useForm<z.infer<typeof createComplaintSchema>>({
    validate: zod4Resolver(createComplaintSchema),
    mode: "uncontrolled",
    validateInputOnChange: true,
  });

  const { mutate, isPending, isSuccess } = useCreateComplaint();
  const { data: categories, isLoading } = useSelectCategories({
    isActive: true,
  });
  const citizen = useGetCitizenByUserId(data?.user.id || "");

  useEffect(() => {
    const citizenId = citizen.data?.data?.id;
    if (citizenId) {
      form.setFieldValue("citizenId", citizenId);
    }
  }, [citizen.data]);

  const provinceOptions = useMemo(() => getProvinceOptions(), []);

  const districtOptions = useMemo(() => {
    const selectedProvince = form.getValues().province;
    if (!selectedProvince) return [];
    return getDistrictsByProvince(selectedProvince);
  }, [form.getValues().province]);

  function onSubmit(values: z.infer<typeof createComplaintSchema>) {
    mutate(values, {
      onSuccess() {
        form.reset();
        closeAllModals();
      },
    });
  }

  if (isSuccess) {
    return (
      <Alert color="green">
        Reclamação submetida com sucesso! Obrigado por contribuir para a
        melhoria da nossa comunidade.
      </Alert>
    );
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        {status === "unauthenticated" ? (
          <Alert color="red">
            <div className="flex w-full flex-wrap gap-4 items-center justify-between">
              <div>Deve estar autenticado para submeter uma reclamação</div>
              <Group>
                <Button variant="subtle">Login</Button>
                <Divider orientation="vertical" />
                <Button variant="outline">Registre-se</Button>
              </Group>
            </div>
          </Alert>
        ) : (
          <Alert>
            Preencha todos os campos obrigatórios{" "}
            <span style={{ color: "var(--mantine-color-red-5)" }}>*</span>
          </Alert>
        )}
        <TextInput
          withAsterisk
          placeholder="Digite o título da reclamação"
          label="Título da reclamação"
          variant="filled"
          disabled={isPending}
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
          <Select
            withAsterisk
            label="Categoria"
            placeholder="Seleccione a categoria"
            variant="filled"
            data={categories}
            disabled={isPending}
            rightSection={isLoading && <Loader size={18} />}
            key={form.key("categoryId")}
            {...form.getInputProps("categoryId")}
          />
          <Select
            withAsterisk
            label="Província"
            placeholder="Seleccione a província"
            variant="filled"
            data={provinceOptions}
            disabled={isPending}
            searchable
            key={form.key("province")}
            {...form.getInputProps("province")}
            onChange={(value: any) => {
              form.setFieldValue("province", value);
              form.setFieldValue("district", "");
            }}
          />
          <Select
            withAsterisk
            label="Distrito"
            placeholder="Seleccione o distrito"
            variant="filled"
            data={districtOptions}
            disabled={isPending || !form.getValues().province}
            searchable
            key={form.key("district")}
            {...form.getInputProps("district")}
          />
          <TextInput
            label="Bairro"
            placeholder="Digite o nome do bairro"
            variant="filled"
            disabled={isPending}
            key={form.key("neighborhood")}
            {...form.getInputProps("neighborhood")}
          />
        </SimpleGrid>
        <div>
          <InputLabel required>Seleccione a localização</InputLabel>
          <Text className="text-sm text-stone-600 mb-2">
            Clique no mapa para marcar a localização exacta da reclamação.
          </Text>
          {(form.errors.latitude || form.errors.longitude) && (
            <Alert color="red" className="mb-2">
              {form.errors.latitude || form.errors.longitude}
            </Alert>
          )}
          <div className="h-[400px] rounded-md">
            <LocationPicker
              setLocation={(location) => {
                form.setFieldValue("latitude", location.latitude);
                form.setFieldValue("longitude", location.longitude);
              }}
              setDescription={() => {}}
            />
          </div>
        </div>
        <Textarea
          rows={4}
          withAsterisk
          placeholder="Insira uma breve descrição da situação..."
          label="Descrição da reclamação"
          variant="filled"
          disabled={isPending}
          key={form.key("description")}
          {...form.getInputProps("description")}
        />
        <Group justify="right">
          <Button
            variant="light"
            color="red"
            disabled={isPending}
            onClick={() => {
              form.reset();
              closeAllModals();
            }}
          >
            Cancelar
          </Button>
          <Button type="submit" loading={isPending}>
            Submeter Reclamação
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
