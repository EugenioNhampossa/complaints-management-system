import { baseResponseSchema } from "@/common/schemas/baseResponse.schema";
import {
  OffsetPaginationRequestSchema,
  OffsetPaginationResponseSchema,
} from "@/common/schemas/offsetPagination.schema";
import { $Enums } from "@/prisma/generated/prisma/client";
import z from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "O nome de usuário é obrigatório"),
  email: z.email("Email inválido").min(1, "o email é obrigatório"),
  password: z.string().min(4, "A senha deve ter no mínimo 6 caracteres"),
  type: z.enum($Enums.UserType, "Tipo de usuário inválido"),
});

const createUserSchema = userSchema.omit({ id: true });
const updateUserSchema = userSchema;
const filterUserSchema = OffsetPaginationRequestSchema.extend(
  userSchema.omit({ id: true, password: true }).partial().shape
);
const userResponseSchema = userSchema.extend(baseResponseSchema.shape);

const userPaginationResponseSchema =
  OffsetPaginationResponseSchema(userResponseSchema);

export {
  userSchema,
  createUserSchema,
  updateUserSchema,
  filterUserSchema,
  userPaginationResponseSchema,
  userResponseSchema,
};
