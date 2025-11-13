import { Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import React, { ReactNode } from "react";

export enum notificationType {
  error,
  warning,
  info,
}

export const notify = ({
  type,
  message,
  title,
}: {
  type?: notificationType;
  title?: string;
  message: ReactNode;
}) => {
  switch (type) {
    case notificationType.error:
      showNotification({
        color: "red",
        autoClose: false,
        title: title || "Erro!",
        message,
        icon: <IconCircleX />,
      });
      break;
    case notificationType.info:
      showNotification({
        title: title,
        message,
        icon: <IconCircleCheck />,
      });
      break;
    case notificationType.warning:
      showNotification({
        color: "orange",
        title: (
          <Title c="orange" order={6}>
            Atenção!
          </Title>
        ),
        message,
      });
      break;
    default:
      showNotification({
        message,
      });
      break;
  }
};
