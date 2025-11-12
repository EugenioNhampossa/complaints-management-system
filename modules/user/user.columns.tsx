import { Avatar, Badge, Button, Group, Menu } from "@mantine/core";
import { DataTableColumn } from "mantine-datatable";
import { IconFileDescription } from "@tabler/icons-react";
import Link from "next/link";
import { memo } from "react";
import { UserType } from "@/prisma/generated/prisma";
import { getUserTypeColor, getUserTypeText } from "@/utils/getUserTypeText";
import dayjs from "dayjs";

type personalInfo = {
  firstName: string;
  lastName: string;
  phone: string;
};

type UserResponse = {
  id: string;
  email: string;
  type: UserType;
  createdAt: Date;
  citizen: {
    personalInfo: personalInfo;
  } | null;
  employee: {
    personalInfo: personalInfo;
  } | null;
};

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

export const UsersColumns: DataTableColumn<UserResponse>[] = [
  {
    title: "Nome",
    accessor: "citizen",
    render(record) {
      let obj: "citizen" | "employee" = "citizen";
      if (record.type === "EMPLOYEE") {
        obj = "employee";
      }
      return (
        <Group gap="xs" wrap="nowrap">
          <Avatar size="sm" color="initials" />
          <div className="text-nowrap">{`${record[obj]?.personalInfo?.firstName} ${record[obj]?.personalInfo?.lastName}`}</div>
        </Group>
      );
    },
  },
  {
    title: "Função",
    accessor: "type",
    render({ type }) {
      return (
        <Badge size="sm" className={getUserTypeColor(type)}>
          {getUserTypeText(type)}
        </Badge>
      );
    },
  },
  {
    title: "Email",
    accessor: "email",
  },
  {
    title: "Telefone",
    accessor: "phone",
    render(record) {
      let obj: "citizen" | "employee" = "citizen";
      if (record.type === "EMPLOYEE") {
        obj = "employee";
      }
      return record[obj]?.personalInfo?.phone;
    },
  },
  {
    accessor: "createdAt",
    title: "Data de Registo",
    render({ createdAt }) {
      return dayjs(createdAt).format("DD MMM YYYY - HH:mm");
    },
  },
  {
    accessor: "actions",
    title: "Acções",
    width: "180px",
    render({ id }) {
      return <DetailsMenu id={id} />;
    },
  },
];
