import { baseResponseSchema } from "@/common/schemas/baseResponse.schema";
import {
  OffsetPaginationRequestSchema,
  OffsetPaginationResponseSchema,
} from "@/common/schemas/offsetPagination.schema";
import { $Enums } from "@/prisma/generated/prisma/client";
import z from "zod";

const userSchema = z.object({
  id: z.string(),
  email: z.email("Email inválido").min(1, "o email é obrigatório"),
  password: z
    .string("Senha inválida")
    .min(4, "A senha deve ter no mínimo 6 caracteres"),
  type: z.enum($Enums.UserType, "Tipo de usuário inválido").optional(),
});

const createUserSchema = userSchema.omit({ id: true });

const createUserSchemaWithPassConfirmation = createUserSchema
  .extend({
    confirmPassword: z
      .string("Confirmação inválida")
      .min(4, "A confirmação de senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const updateUserSchema = userSchema.omit({ password: true });
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
  createUserSchemaWithPassConfirmation,
  userResponseSchema,
};
