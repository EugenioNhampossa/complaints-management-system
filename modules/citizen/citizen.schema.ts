import {
  createPersonalInfoSchema,
  updatePersonalInfoSchema,
} from "@/common/schemas/personalInfo.schema";
import z from "zod";
import {
  createUserSchemaWithPassConfirmation,
  updateUserSchema,
} from "../user/user.schema";

const citizenSchema = z
  .object({
    id: z.string(),
  })
  .extend(createPersonalInfoSchema.shape)
  .extend(createUserSchemaWithPassConfirmation.shape);

const createCitizenSchema = citizenSchema.omit({ id: true });

const updateCitizenSchema = z.object({
  id: z.string(),
  personalInfo: updatePersonalInfoSchema,
  user: updateUserSchema,
});

export { citizenSchema, createCitizenSchema, updateCitizenSchema };
