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
import { ErrorResponse } from "@/common/types/errorResponse.type";

const useFindOneCategory = (id: string) => {
  return useQuery({
    queryKey: ["categoies", id],
    queryFn: () => findCategoryById(id),
    enabled: !!id,
  });
};

const useFindManyCategories = (
  filter?: z.infer<typeof filterCategorySchema>
) => {
  return useQuery({
    queryKey: ["categoies"],
    queryFn: () => findManyCategories(filter),
  });
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      notify({
        type: notificationType.info,
        message: "Especialidade apagada",
      });
      queryClient.invalidateQueries({ queryKey: ["categoies"] });
    },
    onError: (response: ErrorResponse) => {
      notify({
        message: response.error,
        type: notificationType.error,
      });
    },
  });
};

const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      notify({
        type: notificationType.info,
        message: "Categoria registrada",
      });
      queryClient.invalidateQueries({ queryKey: ["categoies"] });
    },
    onError: (response: ErrorResponse) => {
      notify({ message: response.error, type: notificationType.error });
    },
  });
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      notify({
        type: notificationType.info,
        message: "Categoria actualizada",
      });
      queryClient.invalidateQueries({ queryKey: ["categoies"] });
    },
    onError: (response: ErrorResponse) => {
      const message = response.error;
      notify({ message, type: notificationType.error });
    },
  });
};

const useSelectCategories = () => {
  return useQuery({
    queryKey: ["categoies"],
    queryFn: () => findManyCategories(),
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
