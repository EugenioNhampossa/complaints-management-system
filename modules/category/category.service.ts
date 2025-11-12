"use server";

import z from "zod";
import { createCategorySchema, filterCategorySchema } from "./category.schema";
import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createCategory(
  dto: z.infer<typeof createCategorySchema>
) {
  try {
    const category = await prisma.category.create({
      data: dto,
    });

    return { success: true, data: category };
  } catch (error) {
    console.error("Error creating category:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { success: false, error: "A categoria já existe" };
    }
    return { success: false, error: "Falha ao criar a categoria" };
  }
}

export async function findManyCategorys(
  filter: z.infer<typeof filterCategorySchema>
) {
  try {
    const [result, meta] = await prisma.category
      .paginate({
        where: {
          deletedAt: null,
          title: {
            contains: filter.title,
            mode: "insensitive",
          },
          isActive: filter.isActive,
        },
      })
      .withPages({ limit: filter.limit, page: filter.page });

    return { success: true, data: { result, meta } };
  } catch (error) {
    console.error("Error finding categories:", error);
    return {
      success: false,
      error: "Falha ao buscar as categorias",
      data: { result: [], meta: null },
    };
  }
}

export async function findCategoryById(id: string) {
  try {
    if (!id || typeof id !== "string") {
      return { success: false, error: "ID de categoria inválido" };
    }

    const category = await prisma.category.findUnique({
      where: {
        deletedAt: null,
        id,
      },
    });

    if (!category) {
      return { success: false, error: "Categoria não encontrada" };
    }

    return { success: true, data: category };
  } catch (error) {
    console.error("Error finding category by ID:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      return { success: false, error: "Formato de ID inválido" };
    }

    return { success: false, error: "Falha ao buscar a categoria" };
  }
}


export async function updateCategory(
  id: string,
  dto: Partial<z.infer<typeof createCategorySchema>>
) {
  try {
    if (!id || typeof id !== "string") {
      return { success: false, error: "ID de categoria inválido" };
    }

    const existing = await prisma.category.findUnique({
      where: { id },
    });

    if (!existing || existing.deletedAt) {
      return { success: false, error: "Categoria não encontrada" };
    }

    const updated = await prisma.category.update({
      where: { id },
      data: dto,
    });

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating category:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error: "Já existe uma categoria com esses dados",
      };
    }

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      return { success: false, error: "Formato de ID inválido" };
    }

    return { success: false, error: "Falha ao atualizar a categoria" };
  }
}