import { baseResponseSchema } from "@/common/schemas/baseResponse.schema";
import {
  OffsetPaginationRequestSchema,
  OffsetPaginationResponseSchema,
} from "@/common/schemas/offsetPagination.schema";
import z from "zod";

const personalInfoSchema = z.object({
  id: z.string(),
  firstName: z
    .string("Primeiro nome inválido")
    .min(1, "O primeiro nome é obrigatório"),
  lastName: z
    .string("Último nome inválido")
    .min(1, "O último nome é obrigatório"),
  phone: z.string("Telefone inválido").min(1, "O telefone é obrigatório"),
  idNumber: z
    .string("Nr de BI inválido")
    .min(1, "O número de identificação é obrigatório"),
});

const createPersonalInfoSchema = personalInfoSchema.omit({ id: true });
const updatePersonalInfoSchema = personalInfoSchema;
const filterPersonalInfoSchema = OffsetPaginationRequestSchema.extend(
  personalInfoSchema.omit({ id: true }).partial().shape
);
const personalInfoResponseSchema = personalInfoSchema.extend(
  baseResponseSchema.shape
);

const personalInfoPaginationResponseSchema = OffsetPaginationResponseSchema(
  personalInfoResponseSchema
);

export {
  personalInfoSchema,
  createPersonalInfoSchema,
  updatePersonalInfoSchema,
  filterPersonalInfoSchema,
  personalInfoPaginationResponseSchema,
  personalInfoResponseSchema,
};
