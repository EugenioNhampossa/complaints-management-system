"use server";

import z from "zod";
import { createUserSchema, filterUserSchema } from "./user.schema";
import prisma from "@/lib/prisma";
import { encrypt } from "@/utils/hash.util";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createUser(dto: z.infer<typeof createUserSchema>) {
  try {
    const hash = await encrypt(dto.password);
    const user = await prisma.user.create({
      data: {
        ...dto,
        password: hash,
      },
    });

    return { success: true, data: user };
  } catch (error) {
    console.error("Error creating user:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error: "Já existe um utilizador com o email fornecido",
      };
    }

    return { success: false, error: "Falha ao criar o utilizador" };
  }
}

export async function updateUser(
  id: string,
  dto: Partial<z.infer<typeof createUserSchema>>
) {
  try {
    if (!id || typeof id !== "string") {
      return { success: false, error: "ID de utilizador inválido" };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        deletedAt: null,
        id,
      },
    });

    if (!existingUser) {
      return { success: false, error: "Utilizador não encontrado" };
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        type: dto.type,
      },
    });

    return { success: true, data: user };
  } catch (error) {
    console.error("Error updating user:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { success: false, error: "Email já está em uso" };
    }

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      return { success: false, error: "Formato de ID inválido" };
    }

    return { success: false, error: "Falha ao atualizar o utilizador" };
  }
}

export async function findManyUsers(filter: z.infer<typeof filterUserSchema>) {
  try {
    const [result, meta] = await prisma.user
      .paginate({
        where: {
          deletedAt: null,
          type: filter.type,
          email: {
            contains: filter.email,
            mode: "insensitive",
          },
        },
      })
      .withPages({ limit: filter.limit, page: filter.page });

    return { success: true, data: { result, meta } };
  } catch (error) {
    console.error("Error finding users:", error);
    return {
      success: false,
      error: "Falha ao buscar os utilizadores",
      data: { result: [], meta: null },
    };
  }
}

export async function findUserById(id: string) {
  try {
    if (!id || typeof id !== "string") {
      return { success: false, error: "ID de utilizador inválido" };
    }

    const user = await prisma.user.findUnique({
      where: {
        deletedAt: null,
        id,
      },
    });

    if (!user) {
      return { success: false, error: "Utilizador não encontrado" };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error("Error finding user by ID:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      return { success: false, error: "Formato de ID inválido" };
    }

    return { success: false, error: "Falha ao buscar o utilizador" };
  }
}
