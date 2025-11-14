import { complaintAddressSchema } from "@/common/schemas/address.schema";
import { baseResponseSchema } from "@/common/schemas/baseResponse.schema";
import {
  OffsetPaginationRequestSchema,
  OffsetPaginationResponseSchema,
} from "@/common/schemas/offsetPagination.schema";
import { ComplaintPriority, ComplaintStatus } from "@/prisma/generated/prisma";
import z from "zod";

const complaintSchema = z
  .object({
    id: z.string(),
    citizenId: z.string(),
    categoryId: z
      .string("Categoria inválida")
      .min(1, "Seleccione a categoria da reclamação"),
    title: z
      .string("Título inválido")
      .min(5, "O título deve ter no mínimo 5 caracteres")
      .max(100, "O título deve ter no máximo 100 caracteres"),
    description: z
      .string("Descrição inválida")
      .min(10, "A descrição deve ter no mínimo 10 caracteres")
      .max(1000, "A descrição deve ter no máximo 1000 caracteres"),
  })
  .extend(complaintAddressSchema.shape);

const createComplaintSchema = complaintSchema.omit({ id: true });
const updateComplaintSchema = complaintSchema.pick({ id: true }).extend({
  status: z.enum(ComplaintStatus, "Estado inválido").optional(),
  priority: z.enum(ComplaintPriority, "Prioridade inválida").optional(),
});
const filterComplaintSchema = OffsetPaginationRequestSchema.extend({
  status: z.enum(ComplaintStatus).optional(),
  priority: z.enum(ComplaintPriority).optional(),
})
  .extend(complaintSchema.omit({ id: true, description: true }).partial().shape)
  .partial();
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
