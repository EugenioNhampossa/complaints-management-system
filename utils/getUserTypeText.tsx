import { ComplaintStatus } from "@/prisma/generated/prisma/enums";

export type ComplaintStatusString = keyof typeof ComplaintStatus;

export const getComplaintStatusColor = (status: ComplaintStatusString) => {
  switch (status.toUpperCase()) {
    case "PENDING":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "IN_PROGRESS":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "COMPLETED":
      return "bg-green-50 text-green-700 border-green-200";
    case "CANCELLED":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export const getComplaintStatusText = (
  status: ComplaintStatusString | "ALL"
) => {
  switch (status.toUpperCase()) {
    case "ALL":
      return "Todos";
    case "PENDING":
      return "Pendente";
    case "IN_PROGRESS":
      return "Em Progresso";
    case "COMPLETED":
      return "Concluída";
    case "CANCELLED":
      return "Cancelada";
    default:
      return status;
  }
};
