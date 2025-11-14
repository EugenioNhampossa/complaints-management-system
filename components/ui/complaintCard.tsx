import { ComplaintResponse } from "@/modules/complaints/complaints.columns";
import {
  getComplaintStatusColor,
  getComplaintStatusText,
} from "@/utils/getComplaintStatusText";
import {
  Avatar,
  Badge,
  Group,
  Paper,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import dayjs from "dayjs";
import Link from "next/link";

export type ComplaintCardProps = {
  href?: string;
  onClick?: () => void;
  complaint: ComplaintResponse;
};

export function ComplaintCard({
  complaint,
  href = "#",
  onClick,
}: ComplaintCardProps) {
  return (
    <UnstyledButton
      onClick={onClick}
      component={Link}
      href={href}
      className="rounded-md"
    >
      <Paper
        p="sm"
        className="shadow-none cusrsor-pointer bg-stone-50 hover:bg-stone-700/8 transition-colors duration-200"
      >
        <Stack gap="xs">
          <Group gap="xs">
            <Avatar />
            <div>
              <Text className="text-sm">{`${complaint.citizen.personalInfo.firstName} ${complaint.citizen.personalInfo.lastName}`}</Text>
              <Text className="text-xs text-stone-500">
                {dayjs(complaint.createdAt).format("DD/MM/YYYY")}
              </Text>
            </div>
          </Group>
          <Text className="font-semibold text-sm">{complaint.title}</Text>
          <Text c="dimmed" className="text-sm line-clamp-3 h-[60px]">
            {complaint.description}
          </Text>
          <Group justify="space-between" align="center">
            <Group gap="2px">
              <IconMapPin size={16} />
              <Text className="text-xs ">{`${complaint.address.province}, ${complaint.address.district}`}</Text>
            </Group>
            <Badge
              size="sm"
              className={getComplaintStatusColor(complaint.status)}
            >
              {getComplaintStatusText(complaint.status)}
            </Badge>
          </Group>
        </Stack>
      </Paper>
    </UnstyledButton>
  );
}
