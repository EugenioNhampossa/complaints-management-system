"use server";

import z from "zod";
import { createUserSchema, filterUserSchema } from "./user.schema";
import prisma from "@/lib/prisma";
import { encrypt } from "@/utils/hash.util";

export async function createUser(dto: z.infer<typeof createUserSchema>) {
  const hash = await encrypt(dto.password);
  const user = await prisma.user.create({
    data: {
      ...dto,
      password: hash,
    },
  });

  return user;
}

export async function findManyUsers(filter: z.infer<typeof filterUserSchema>) {
  const [result, meta] = await prisma.user
    .paginate({
      where: {
        deletedAt: null,
        type: filter.type,
        name: {
          contains: filter.name,
          mode: "insensitive",
        },
        email: {
          contains: filter.email,
          mode: "insensitive",
        },
      },
    })
    .withPages({ limit: filter.limit, page: filter.page });

  return { result, meta };
}

export async function findUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      deletedAt: null,
      id,
    },
  });

  return user;
}
