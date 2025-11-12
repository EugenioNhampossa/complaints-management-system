import { UserType } from "@/prisma/generated/prisma/enums";

export type UserTypeString = keyof typeof UserType;

export const getUserTypeColor = (status: UserTypeString) => {
  switch (status.toUpperCase()) {
    case "CITIZEN":
      return "bg-green-50 text-green-700 border-green-200";
    case "EMPLOYEE":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "ADMIN":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export const getUserTypeText = (status: UserTypeString | "ALL") => {
  switch (status.toUpperCase()) {
    case "ALL":
      return "Todos";
    case "CITIZEN":
      return "Cidadão";
    case "EMPLOYEE":
      return "Funcionário";
    case "ADMIN":
      return "Administrador";
    default:
      return status;
  }
};
