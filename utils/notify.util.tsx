import { Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { ReactNode } from "react";

export enum notificationType {
  error,
  warning,
  info,
}

export const notify = ({
  type,
  message,
}: {
  type?: notificationType;
  message: ReactNode;
}) => {
  switch (type) {
    case notificationType.error:
      showNotification({
        color: "red",
        autoClose: false,
        title: (
          <Title c="red" order={6}>
            Erro!
          </Title>
        ),
        message,
      });
      break;
    case notificationType.info:
      showNotification({
        message,
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
