"use client";

import {
  UnstyledButton,
  Avatar,
  UnstyledButtonProps,
  Group,
  Text,
} from "@mantine/core";
import React from "react";
import { useSession } from "next-auth/react";

const AvatarButton = React.forwardRef<HTMLButtonElement, UnstyledButtonProps>(
  (props, ref) => {
    const { data } = useSession();
    return (
      <UnstyledButton ref={ref} {...props} className="py-1 hover:bg-stone-100 rounded-md transition-colors">
        <Group>
          <Avatar
            name={data?.user.name}
            size="sm"
            variant="filled"
            color="initials"
            alt={data?.user.name}
          />
          <div>
            <Text size="sm">{data?.user.name}</Text>
            <Text size="xs" c="dimmed">
              {data?.user.email}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    );
  }
);

AvatarButton.displayName = "AvatarButton";

export { AvatarButton };
