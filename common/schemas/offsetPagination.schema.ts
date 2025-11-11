import { z } from "zod";

export const OffsetPaginationRequestSchema = z.object({
  page: z.int().positive().optional(),
  limit: z.int().positive().optional(),
});

export const OffsetPaginationResponseMetaSchema = z.object({
  isFirstPage: z.boolean(),
  isLastPage: z.boolean(),
  currentPage: z.number().int().positive(),
  previousPage: z.number().int().positive().nullable(),
  nextPage: z.number().int().positive().nullable(),
  pageCount: z.number().int().positive(),
  totalCount: z.number().int().nonnegative(),
});

export const OffsetPaginationResponseSchema = <T extends z.ZodTypeAny>(
  schema: T
) =>
  z.object({
    result: z.array(schema),
    meta: OffsetPaginationResponseMetaSchema,
  });

export type OffsetPaginationResponseMeta = z.infer<
  typeof OffsetPaginationResponseMetaSchema
>;

export type OffsetPaginationResponse<T> = {
  result: T[];
  meta: OffsetPaginationResponseMeta;
};
