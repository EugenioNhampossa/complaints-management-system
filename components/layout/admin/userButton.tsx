import { Text, Avatar, NavLink, NavLinkProps, Group } from "@mantine/core";
import React from "react";
import { IconDots } from "@tabler/icons-react";

export type UserButtonProps = NavLinkProps;

const UserButton = React.forwardRef<HTMLAnchorElement, UserButtonProps>(
  (props, ref) => {
    return (
      <NavLink
        {...props}
        ref={ref}
        style={{ marginBottom: "0px" }}
        className="rounded-md"
        leftSection={<Avatar radius="xl" variant="filled" />}
        label={
          <div>
            <Text size="xs"  fw={400}>
              Eugénio Nhampossa
            </Text>
            <Text size="xs" c="dimmed" fw={400}>
              {"Administrator"}
            </Text>
          </div>
        }
        rightSection={<IconDots size={17} />}
      />
    );
  }
);

UserButton.displayName = "UserButton";

export { UserButton };
