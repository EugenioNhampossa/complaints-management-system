import { Avatar, Badge, Button, Group, Menu } from "@mantine/core";
import { DataTableColumn } from "mantine-datatable";
import {
  IconFileDescription,
  IconMapPin,
  IconMapPin2,
} from "@tabler/icons-react";
import Link from "next/link";
import { memo } from "react";
import dayjs from "dayjs";
import { ComplaintPriority, ComplaintStatus } from "@/prisma/generated/prisma";
import {
  getComplaintStatusColor,
  getComplaintStatusText,
} from "@/utils/getUserTypeText";

type ComplaintResponse = {
  status: ComplaintStatus;
  priority: ComplaintPriority | null;
  id: string;
  title: string;
  citizen: {
    personalInfo: {
      id: string;
      firstName: string;
      lastName: string;
    };
  } & {
    id: string;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    personalInfoId: string;
  };
  category: {
    id: string;
    title: string;
    description: string;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
  };
  address: {
    id: string;
    district: string;
    province: string;
    neighborhood: string | null;
    latitude: number;
    longitude: number;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
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

export const ComplaintsColumns: DataTableColumn<ComplaintResponse>[] = [
  {
    title: "Título",
    accessor: "title",
    render({ title }) {
      return <div className="text-nowrap text-primary">{title}</div>;
    },
  },
  {
    title: "Cidadão",
    accessor: "citizen.personalInfo.id",
    render({ citizen }) {
      return (
        <Group gap="xs" wrap="nowrap">
          <Avatar size="sm" color="initials" />
          <div className="text-nowrap">{`${citizen.personalInfo.firstName} ${citizen.personalInfo.lastName}`}</div>
        </Group>
      );
    },
  },
  {
    title: "Categoria",
    accessor: "category.title",
    render({ category }) {
      return <div className="text-nowrap">{category.title}</div>;
    },
  },
  {
    accessor: "status",
    title: "Estado",
    cellsStyle: () => ({ minWidth: "100px" }),
    render({ status }) {
      return (
        <Badge size="sm" className={getComplaintStatusColor(status)}>
          {getComplaintStatusText(status)}
        </Badge>
      );
    },
  },
  {
    title: "Endereço",
    accessor: "address",
    render(record) {
      return (
        <Group gap={5} className="flex-nowrap text-nowrap">
          <IconMapPin size={16} />
          <div>{`${record.address.province}, ${record.address.district}`}</div>
        </Group>
      );
    },
  },
  {
    accessor: "createdAt",
    title: "Data de Registo",
    render({ createdAt }) {
      return (
        <div className="text-nowrap">
          {dayjs(createdAt).format("DD MMM YYYY - HH:mm")}
        </div>
      );
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
