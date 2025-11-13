import z from "zod";
import { authSchema } from "./auth.schema";
import prisma from "@/lib/prisma";

export async function login(data: z.infer<typeof authSchema>) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      return { success: false, error: "Credenciais inválidas" };
    }
    return { success: true, data: user };
  } catch (error) {
    console.error("User login error:", error);

    return { success: false, error: "Falha durante o login" };
  }
}
