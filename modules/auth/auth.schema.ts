import z from "zod";

const authSchema = z.object({
  email: z.email("Email inválido").min(1, "o email é obrigatório"),
  password: z
    .string("Senha inválida")
    .min(4, "A senha deve ter no mínimo 6 caracteres"),
});

export { authSchema };
