import { baseResponseSchema } from "@/common/schemas/baseResponse.schema";
import {
  OffsetPaginationRequestSchema,
  OffsetPaginationResponseSchema,
} from "@/common/schemas/offsetPagination.schema";
import z from "zod";

const categorySchema = z.object({
  id: z.string(),
  title: z.string().min(1, "O título da categoria é obrigatório"),
  description: z.string().min(1, "A descrição da categoria é obrigatória"),
  isActive: z.boolean(),
});

const createCategorySchema = categorySchema.omit({ id: true });
const updateCategorySchema = categorySchema;
const filterCategorySchema = OffsetPaginationRequestSchema.extend(
  categorySchema.omit({ id: true, description: true }).partial().shape
);
const categoryResponseSchema = categorySchema.extend(baseResponseSchema.shape);

const categoryPaginationResponseSchema = OffsetPaginationResponseSchema(
  categoryResponseSchema
);

export {
  categorySchema,
  createCategorySchema,
  updateCategorySchema,
  filterCategorySchema,
  categoryPaginationResponseSchema,
  categoryResponseSchema,
};
