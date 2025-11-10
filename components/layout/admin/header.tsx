import { ActionIcon, Avatar } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import React from "react";

export interface HeaderProps {
  openDrawer: () => void;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ openDrawer, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        style={{ backgroundColor: "var(--mantine-color-primary-filled)" }}
        className="flex items-center justify-between text-white h-full px-sm"
      >
        <div className="flex items-center gap-4">
          <ActionIcon variant="white" onClick={openDrawer}>
            <IconMenu2 size={22} />
          </ActionIcon>
          <div className="font-bold">SiGeR</div>
        </div>
        <div>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
            radius="xl"
            size="sm"
          />
        </div>
      </div>
    );
  },
);

Header.displayName = "Header";

export { Header };
