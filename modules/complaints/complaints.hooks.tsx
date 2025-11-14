import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createComplaint,
  findComplaintById,
  findManyComplaints,
  updateComplaint,
} from "./complaints.service";
import z from "zod";
import { filterComplaintSchema } from "./complaints.schema";
import { notificationType, notify } from "@/utils/notify.util";

const useFindOneComplaint = (id: string) => {
  return useQuery({
    queryKey: ["complaints", id],
    queryFn: () => findComplaintById(id),
    enabled: !!id,
  });
};

const useFindManyComplaints = (
  filter?: z.infer<typeof filterComplaintSchema>
) => {
  return useQuery({
    queryKey: ["complaints"],
    queryFn: () => findManyComplaints(filter),
  });
};

const useCreateComplaint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComplaint,
    onSuccess: (data) => {
      if (data.success) {
        notify({
          type: notificationType.info,
          message: "Reclamação submetida com sucesso",
        });
        queryClient.invalidateQueries({ queryKey: ["complaints"] });
      } else {
        notify({ message: data.error, type: notificationType.error });
      }
    },
  });
};

const useUpdateComplaint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComplaint,
    onSuccess: (data) => {
      if (data.success) {
        notify({
          type: notificationType.info,
          message: "Reclamação actualizada",
        });
        queryClient.invalidateQueries({ queryKey: ["complaints"] });
      } else {
        const message = data.error;
        notify({ message, type: notificationType.error });
      }
    },
  });
};

export {
  useCreateComplaint,
  useFindManyComplaints,
  useFindOneComplaint,
  useUpdateComplaint,
};
