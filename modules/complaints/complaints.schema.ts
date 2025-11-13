import { baseResponseSchema } from "@/common/schemas/baseResponse.schema";
import {
  OffsetPaginationRequestSchema,
  OffsetPaginationResponseSchema,
} from "@/common/schemas/offsetPagination.schema";
import z from "zod";

const complaintSchema = z.object({
  id: z.string(),
  citizenId: z.string(),
  categoryId: z
    .string("Categoria inválida")
    .min(1, "Seleccione a categoria da reclamação"),
});

const createComplaintSchema = complaintSchema.omit({ id: true });
const updateComplaintSchema = complaintSchema;
const filterComplaintSchema = OffsetPaginationRequestSchema.extend(
  complaintSchema.omit({ id: true, description: true }).partial().shape
);
const complaintResponseSchema = complaintSchema.extend(
  baseResponseSchema.shape
);

const complaintPaginationResponseSchema = OffsetPaginationResponseSchema(
  complaintResponseSchema
);

export {
  complaintSchema,
  createComplaintSchema,
  updateComplaintSchema,
  filterComplaintSchema,
  complaintPaginationResponseSchema,
  complaintResponseSchema,
};
