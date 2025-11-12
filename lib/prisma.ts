import { PrismaClient } from "@/prisma/generated/prisma/client";
import { pagination } from "prisma-extension-pagination";

export const DEFAULT_PAGE_SIZE = 30;

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma.$extends(
  pagination({
    pages: {
      limit: DEFAULT_PAGE_SIZE,
      includePageCount: true,
    },
    cursor: {
      limit: DEFAULT_PAGE_SIZE,
      getCursor({ id }) {
        return id;
      },
      parseCursor(cursor) {
        return {
          id: cursor,
        };
      },
    },
  })
);
