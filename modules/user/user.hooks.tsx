import { useQuery } from "@tanstack/react-query";
import { findUserById, findManyUsers } from "./user.service";
import z from "zod";
import { filterUserSchema } from "./user.schema";

const useFindOneUser = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => findUserById(id),
    enabled: !!id,
  });
};

const useFindManyUsers = (filter?: z.infer<typeof filterUserSchema>) => {
  return useQuery({
    queryKey: ["users", filter],
    queryFn: () => findManyUsers(filter),
  });
};

const useSelectUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => findManyUsers(),
    select: (response) => {
      return response.data.result.map((value) => {
        return { value: value.id, label: value.email };
      });
    },
  });
};

export { useFindManyUsers, useFindOneUser, useSelectUsers };
