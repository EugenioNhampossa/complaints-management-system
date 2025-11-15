import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  findCategoryById,
  findManyCategories,
  updateCategory,
} from "./category.service";
import z from "zod";
import { filterCategorySchema } from "./category.schema";
import { notificationType, notify } from "@/utils/notify.util";

const useFindOneCategory = (id: string) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => findCategoryById(id),
    enabled: !!id,
  });
};

const useFindManyCategories = (
  filter?: z.infer<typeof filterCategorySchema>
) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => findManyCategories(filter),
  });
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      if (data.success) {
        notify({
          type: notificationType.info,
          message: "Especialidade apagada",
        });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      } else {
        notify({
          message: data.error,
          type: notificationType.error,
        });
      }
    },
  });
};

const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      if (data.success) {
        notify({
          type: notificationType.info,
          message: "Categoria registrada",
        });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      } else {
        notify({ message: data.error, type: notificationType.error });
      }
    },
  });
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (data) => {
      if (data.success) {
        notify({
          type: notificationType.info,
          message: "Categoria actualizada",
        });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      } else {
        const message = data.error;
        notify({ message, type: notificationType.error });
      }
    },
  });
};

const useSelectCategories = (filter?: z.infer<typeof filterCategorySchema>) => {
  return useQuery({
    queryKey: ["categories", filter],
    queryFn: () => findManyCategories(filter),
    select: (response) => {
      return response.data.result.map((value) => {
        return { value: value.id, label: value.title };
      });
    },
  });
};

export {
  useCreateCategory,
  useFindManyCategories,
  useFindOneCategory,
  useSelectCategories,
  useUpdateCategory,
  useDeleteCategory,
};
