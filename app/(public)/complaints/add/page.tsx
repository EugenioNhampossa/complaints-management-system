"use client";

import { CreateComplaintForm } from "@/components/form/complaint/create.form";
import { Footer } from "@/components/layout/footer";
import {
  Paper,
  Title,
  Text,
  rem,
  Stack,
  SimpleGrid,
  Image,
} from "@mantine/core";

export default function ComplaintsPage() {
  return (
    <div>
      <div className="container mx-auto p-4 mb-md rounded-md">
        <Stack gap={rem("20px")}>
          <Paper className="shadow-none bg-primary p-4 md:p-12 flex flex-col items-center justify-center mb-6 text-white">
            <SimpleGrid cols={{ sm: 1, md: 2 }}>
              <div className="h-full flex flex-col  justify-center">
                <Title className="">Formulário de Reclamações</Title>
                <Text className="text-sm text-stone-50 md:text-base max-w-lg mt-6 max-md:px-2">
                  Utilize o formulário abaixo para submeter suas reclamações de
                  forma rápida e eficiente. Estamos aqui para ouvir você e
                  melhorar nossos serviços com base no seu feedback.
                </Text>
              </div>
              <Image
                className="bg-cover max-h-[300px] rounded-md"
                src="/men-on-cell.jpg"
              />
            </SimpleGrid>
          </Paper>
          <CreateComplaintForm />
        </Stack>
      </div>
      <Footer />
    </div>
  );
}
