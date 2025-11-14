"use server";

import z from "zod";
import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  createComplaintSchema,
  filterComplaintSchema,
  updateComplaintSchema,
} from "./complaints.schema";

export async function createComplaint(
  dto: z.infer<typeof createComplaintSchema>
) {
  try {
    const complaint = await prisma.$transaction(async (tx) => {
      const address = await tx.complaintAddress.create({
        data: {
          district: dto.district,
          province: dto.province,
          neighborhood: dto.neighborhood,
          latitude: dto.latitude,
          longitude: dto.longitude,
        },
      });

      return await tx.complaint.create({
        data: {
          title: dto.title,
          description: dto.description,
          citizenId: dto.citizenId,
          categoryId: dto.categoryId,
          addressId: address.id,
        },
      });
    });

    return { success: true, data: complaint };
  } catch (error) {
    console.error("Error creating complaint:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { success: false, error: "A reclamação já existe" };
    }
    return { success: false, error: "Falha ao criar a reclamação" };
  }
}

export async function findManyComplaints(
  filter?: z.infer<typeof filterComplaintSchema>
) {
  try {
    const [result, meta] = await prisma.complaint
      .paginate({
        where: {
          deletedAt: null,
          title: {
            contains: filter?.title,
            mode: "insensitive",
          },
          status: filter?.status,
          categoryId: filter?.categoryId,
          citizenId: filter?.citizenId,
          priority: filter?.priority,
        },
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          address: true,
          category: true,
          createdAt: true,
          citizen: {
            include: {
              personalInfo: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      })
      .withPages({ limit: filter?.limit, page: filter?.page });

    return { success: true, data: { result, meta } };
  } catch (error) {
    console.error("Error finding complaints:", error);
    return {
      success: false,
      error: "Falha ao buscar as reclamações",
      data: { result: [], meta: null },
    };
  }
}

export async function findComplaintById(id: string) {
  try {
    if (!id || typeof id !== "string") {
      return { success: false, error: "ID de reclamação inválido" };
    }

    const complaint = await prisma.complaint.findUnique({
      where: {
        deletedAt: null,
        id,
      },
    });

    if (!complaint) {
      return { success: false, error: "Reclamação não encontrada" };
    }

    return { success: true, data: complaint };
  } catch (error) {
    console.error("Error finding complaint by ID:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      return { success: false, error: "Formato de ID inválido" };
    }

    return { success: false, error: "Falha ao buscar a reclamação" };
  }
}

export async function updateComplaint(
  dto: z.infer<typeof updateComplaintSchema>
) {
  try {
    if (!dto.id || typeof dto.id !== "string") {
      return { success: false, error: "ID de reclamação inválido" };
    }

    const existing = await prisma.complaint.findUnique({
      where: { id: dto.id },
    });

    if (!existing || existing.deletedAt) {
      return { success: false, error: "Reclamação não encontrada" };
    }

    const updated = await prisma.complaint.update({
      where: { id: dto.id },
      data: dto,
    });

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating complaint:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error: "Já existe uma reclamação com esses dados",
      };
    }

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      return { success: false, error: "Formato de ID inválido" };
    }

    return { success: false, error: "Falha ao atualizar a reclamação" };
  }
}

export async function deleteComplaint(id: string) {
  try {
    if (!id || typeof id !== "string") {
      return { success: false, error: "ID de reclamação inválido" };
    }

    const existing = await prisma.complaint.findUnique({
      where: { id },
    });

    if (!existing || existing.deletedAt) {
      return { success: false, error: "Reclamação não encontrada" };
    }

    const updated = await prisma.complaint.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error deleting complaint:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      return { success: false, error: "Formato de ID inválido" };
    }

    return { success: false, error: "Falha ao apagar a reclamação" };
  }
}
