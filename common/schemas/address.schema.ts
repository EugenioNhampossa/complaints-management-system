import { baseResponseSchema } from "@/common/schemas/baseResponse.schema";
import {
  OffsetPaginationRequestSchema,
  OffsetPaginationResponseSchema,
} from "@/common/schemas/offsetPagination.schema";
import z from "zod";

const complaintAddressSchema = z.object({
  id: z.string(),
  district: z.string("Distrito inválido").min(1, "O distrito é obrigatório"),
  province: z.string("Província inválida").min(1, "A província é obrigatória"),
  neighborhood: z.string("Bairro inválido").optional().nullable(),
  latitude: z
    .number("Latitude inválida")
    .min(-90, "A latitude deve estar entre -90 e 90")
    .max(90, "A latitude deve estar entre -90 e 90"),
  longitude: z
    .number("Longitude inválida")
    .min(-180, "A longitude deve estar entre -180 e 180")
    .max(180, "A longitude deve estar entre -180 e 180"),
});

const createComplaintAddressSchema = complaintAddressSchema.omit({ id: true });
const updateComplaintAddressSchema = complaintAddressSchema;
const filterComplaintAddressSchema = OffsetPaginationRequestSchema.extend(
  complaintAddressSchema.omit({ id: true }).partial().shape
);
const complaintAddressResponseSchema = complaintAddressSchema.extend(
  baseResponseSchema.shape
);

const complaintAddressPaginationResponseSchema = OffsetPaginationResponseSchema(
  complaintAddressResponseSchema
);

export {
  complaintAddressSchema,
  createComplaintAddressSchema,
  updateComplaintAddressSchema,
  filterComplaintAddressSchema,
  complaintAddressPaginationResponseSchema,
  complaintAddressResponseSchema,
};
