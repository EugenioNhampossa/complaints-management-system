import { Badge, Button, Menu, Skeleton } from "@mantine/core";
import { DataTableColumn } from "mantine-datatable";
import { z } from "zod";
import { IconFileDescription } from "@tabler/icons-react";
import Link from "next/link";
import { memo } from "react";
import dayjs from "dayjs";


const DetailsMenu = memo(({ id }: { id: string }) => {
  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <Button size="xs" variant="default">
          Opções
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          href={`/complaints/${id}`}
          leftSection={<IconFileDescription size={14} />}
        >
          Detalhes
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});

DetailsMenu.displayName = "DetailsMenu";

// const User = memo(({ userId }: { userId: string }) => {
//   const { data, isLoading } = useGetUserById(userId);
//   if (isLoading) {
//     return <Skeleton className="h-[20px] w-[150px]" />;
//   }

//   return data?.body.username;
// });

// User.displayName = "User";

export const ComplaintsColumns: DataTableColumn<Notification>[] = [
  {
    title: "Título",
    accessor: "title",
  },
  {
    title: "Usuário",
    accessor: "userId",
  },
  {
    title: "Canal",
    accessor: "channel",
  },
  {
    accessor: "status",
    title: "Estado",
    titleStyle: {
      minWidth: "140px",
    },
  },
  {
    accessor: "createdAt",
    title: "Data de Registo",
   
  },
  {
    accessor: "actions",
    title: "Acções",
    width: "180px",
    
  },
];
