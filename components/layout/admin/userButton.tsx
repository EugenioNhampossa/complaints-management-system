import { Text, Avatar, NavLink, NavLinkProps, Group } from "@mantine/core";
import React from "react";
import { IconDots } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

export type UserButtonProps = NavLinkProps;

const UserButton = React.forwardRef<HTMLAnchorElement, UserButtonProps>(
  (props, ref) => {
    const { data, status } = useSession();

    if (status === "loading") {
      return (
        <Group>
          <div className="h-[30px] w-[30px] rounded-full bg-stone-200 animate-pulse" />
          <div className="h-[20px] grow bg-stone-200 animate-pulse rounded-xs" />
        </Group>
      );
    }

    return (
      <NavLink
        {...props}
        ref={ref}
        style={{ marginBottom: "0px" }}
        className="rounded-md"
        leftSection={<Avatar radius="xl" variant="filled" />}
        label={
          <div>
            <Text size="xs" fw={400}>
              {data?.user.name}
            </Text>
            <Text size="xs" c="dimmed" fw={400}>
              {data?.user.email}
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
