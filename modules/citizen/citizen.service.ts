"use server";

import z from "zod";
import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createCitizenSchema, updateCitizenSchema } from "./citizen.schema";
import { createUser } from "../user/user.service";
import { filterPersonalInfoSchema } from "@/common/schemas/personalInfo.schema";

export async function createCitizen(dto: z.infer<typeof createCitizenSchema>) {
  const user = await createUser({
    email: dto.email,
    type: dto.type,
    password: dto.password,
  });

  if (!user.success) {
    return { success: false, error: user.error };
  }

  try {
    if (user.data?.id) {
      let response;
      const data = {
        data: {
          user: {
            connect: { id: user.data.id },
          },
          personalInfo: {
            create: {
              firstName: dto.firstName,
              idNumber: dto.idNumber,
              lastName: dto.lastName,
              phone: dto.phone,
            },
          },
        },
      };
      if (dto.type === "CITIZEN") {
        response = await prisma.citizen.create(data);
      } else {
        response = await prisma.employee.create(data);
      }

      return { success: true, data: response };
    } else {
      return { success: false, error: "Falha ao criar cidadão" };
    }
  } catch (error) {
    console.error("Error creating citizen:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error: "Já existe um cidadão com o nr de BI inserido",
      };
    }
    return { success: false, error: "Falha ao criar cidadão" };
  }
}

export async function findCitizenByUserId(userId: string) {
  try {
    if (!userId || typeof userId !== "string") {
      return { success: false, error: "ID de utilizador inválido" };
    }

    const citizen = await prisma.citizen.findUnique({
      where: {
        deletedAt: null,
        userId,
      },
    });

    if (!citizen) {
      return { success: false, error: "Dados do cidadão não encontrados" };
    }

    return { success: true, data: citizen };
  } catch (error) {
    console.error("Error finding citizen by user ID:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      return { success: false, error: "Formato de ID inválido" };
    }

    return { success: false, error: "Falha ao buscar os dados do cidadão" };
  }
}

export async function findManyCitizens(
  filter?: z.infer<typeof filterPersonalInfoSchema>
) {
  try {
    const [result, meta] = await prisma.citizen
      .paginate({
        where: {
          deletedAt: null,
          personalInfo: {
            firstName: {
              contains: filter?.firstName,
            },
            lastName: {
              contains: filter?.lastName,
            },
            idNumber: filter?.idNumber,
          },
        },
        include: {
          personalInfo: true,
        },
      })
      .withPages({ limit: filter?.limit, page: filter?.page });

    return { success: true, data: { result, meta } };
  } catch (error) {
    console.error("Error finding citizens:", error);
    return {
      success: false,
      error: "Falha ao buscar dados do cidadão",
      data: { result: [], meta: null },
    };
  }
}

export async function findCitizenById(id: string) {
  try {
    if (!id || typeof id !== "string") {
      return { success: false, error: "ID inválido" };
    }

    const citizen = await prisma.citizen.findUnique({
      where: {
        deletedAt: null,
        id,
      },
      include: {
        personalInfo: true,
        user: true,
      },
    });

    if (!citizen) {
      return { success: false, error: "Dados do cidadão não encontrados" };
    }

    return { success: true, data: citizen };
  } catch (error) {
    console.error("Error finding citizen by ID:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      return { success: false, error: "Formato de ID inválido" };
    }

    return { success: false, error: "Falha ao buscar os dados do cidadão" };
  }
}

export async function updateCitizen(dto: z.infer<typeof updateCitizenSchema>) {
  try {
    if (!dto.id || typeof dto.id !== "string") {
      return { success: false, error: "ID inválido" };
    }

    const existing = await prisma.citizen.findUnique({
      where: { id: dto.id },
    });

    if (!existing || existing.deletedAt) {
      return { success: false, error: "Dados do cidadão não encontrados" };
    }

    const updated = await prisma.citizen.update({
      where: { id: dto.id },
      data: {
        personalInfo: {
          update: dto.personalInfo,
        },
        user: {
          update: dto.user,
        },
      },
    });

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating citizen:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error: "Já existe um cidadão com esse nr de BI",
      };
    }

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      return { success: false, error: "Formato de ID inválido" };
    }

    return { success: false, error: "Falha ao actualizar dados do cidadão" };
  }
}

export async function deleteCitizen(id: string) {
  try {
    if (!id || typeof id !== "string") {
      return { success: false, error: "ID inválido" };
    }

    const existing = await prisma.citizen.findUnique({
      where: { id },
    });

    if (!existing || existing.deletedAt) {
      return { success: false, error: "Dados do cidadão não encontrados" };
    }

    const updated = await prisma.citizen.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error deleting citizen:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      return { success: false, error: "Formato de ID inválido" };
    }

    return { success: false, error: "Falha ao apagar dados do cidadão" };
  }
}
