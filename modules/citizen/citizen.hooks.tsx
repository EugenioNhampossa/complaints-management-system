import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCitizen,
  deleteCitizen,
  findCitizenById,
  updateCitizen,
  findManyCitizens,
} from "./citizen.service";
import z from "zod";
import { notificationType, notify } from "@/utils/notify.util";
import { filterPersonalInfoSchema } from "@/common/schemas/personalInfo.schema";

const useFindOneCitizen = (id: string) => {
  return useQuery({
    queryKey: ["citizens", id],
    queryFn: () => findCitizenById(id),
    enabled: !!id,
  });
};

const useFindManyCitizens = (
  filter?: z.infer<typeof filterPersonalInfoSchema>
) => {
  return useQuery({
    queryKey: ["citizens"],
    queryFn: () => findManyCitizens(filter),
  });
};

const useDeleteCitizen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCitizen,
    onSuccess: (data) => {
      if (data.success) {
        notify({
          type: notificationType.info,
          message: "Dados do cidadão apagados",
        });
        queryClient.invalidateQueries({ queryKey: ["citizens"] });
      } else {
        notify({
          message: data.error,
          type: notificationType.error,
        });
      }
    },
  });
};

const useCreateCitizen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCitizen,
    onSuccess: (data) => {
      if (data.success) {
        notify({
          type: notificationType.info,
          message: "Cidaão registrado",
        });
        queryClient.invalidateQueries({ queryKey: ["citizens"] });
      } else {
        notify({ message: data.error, type: notificationType.error });
      }
    },
  });
};

const useUpdateCitizen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCitizen,
    onSuccess: (data) => {
      if (data.success) {
        notify({
          type: notificationType.info,
          message: "Dados do cidadão actualizados",
        });
        queryClient.invalidateQueries({ queryKey: ["citizens"] });
      } else {
        const message = data.error;
        notify({ message, type: notificationType.error });
      }
    },
  });
};

const useSelectCitizens = () => {
  return useQuery({
    queryKey: ["citizens"],
    queryFn: () => findManyCitizens(),
    select: (response) => {
      return response.data.result.map((value) => {
        return {
          value: value.id,
          label: `${value.personalInfo.firstName} ${value.personalInfo.lastName}`,
        };
      });
    },
  });
};

export {
  useCreateCitizen,
  useFindManyCitizens,
  useFindOneCitizen,
  useSelectCitizens,
  useUpdateCitizen,
  useDeleteCitizen,
};
