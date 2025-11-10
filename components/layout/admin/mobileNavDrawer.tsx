import { Drawer, DrawerProps } from "@mantine/core";
import React from "react";
import { Navbar } from "./navbar";

export interface MobileNavDrawerProps extends DrawerProps {
  opened: boolean;
  onClose: () => void;
  close: () => void;
}

const MobileNavDrawer = React.forwardRef<HTMLDivElement, MobileNavDrawerProps>(
  ({ opened, onClose, close, ...props }, ref) => {
    return (
      <Drawer
        {...props}
        ref={ref}
        opened={opened}
        onClose={onClose}
        withCloseButton={false}
        padding="0px"
        size="220px"
        shadow="none"
        overlayProps={{ opacity: "0" }}
      >
        <Navbar closeDrawer={close} />
      </Drawer>
    );
  },
);

MobileNavDrawer.displayName = "MobileNavDrawer";

export { MobileNavDrawer };
