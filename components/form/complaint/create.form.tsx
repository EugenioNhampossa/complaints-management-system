import { LocationPicker } from "@/components/map/LocationPicker";
import {
  Alert,
  Box,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
  Text,
  Textarea,
  Group,
  Button,
} from "@mantine/core";

export function CreateComplaintForm() {
  return (
    <Stack>
      <Alert>
        Preencha todos os campos obrigatórios{" "}
        <span style={{ color: "var(--mantine-color-red-5)" }}>*</span>
      </Alert>
      <TextInput
        placeholder="Digite o título da reclamação"
        label="Título da reclamação"
        variant="filled"
      />
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        <Select
          label="Categoria"
          placeholder="Seleccione a categoria"
          variant="filled"
        />
        <Select
          label="Provincia"
          placeholder="Seleccione a provincia"
          variant="filled"
        />
        <Select
          label="Distrito"
          placeholder="Seleccione o distrito"
          variant="filled"
        />
        <TextInput
          label="Bairro"
          placeholder="Digite o nome do bairro"
          variant="filled"
        />
      </SimpleGrid>
      <div>
        <Text>Seleccione a localização</Text>
        <Text className="text-sm text-stone-600 mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
          architecto! Inventore.
        </Text>
        <div className="h-[400px] rounded-md">
          <LocationPicker setLocation={() => {}} setDescription={() => {}} />
        </div>
      </div>
      <Textarea
        rows={4}
        placeholder="Insira uma breve descrição da situação..."
        label="Descrição da reclamação"
        variant="filled"
      />
      <Group justify="right">
        <Button variant="light" color="red">
          Cancelar
        </Button>
        <Button type="submit">Submeter Reclamação</Button>
      </Group>
    </Stack>
  );
}
