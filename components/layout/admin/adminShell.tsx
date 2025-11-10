import { AppShell, AppShellProps } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { Header } from "./header";
import { MobileNavDrawer } from "./mobileNavDrawer";

export interface AdminShellProps extends AppShellProps {
  children: React.ReactNode;
}

const AdminShell = React.forwardRef<HTMLDivElement, AdminShellProps>(
  ({ children, ...props }, ref) => {
    const [opened, { open, close }] = useDisclosure(false);
    const matches = useMediaQuery("(min-width: 48em)");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    return (
      <AppShell
        ref={ref}
        {...props}
        navbar={{
          width: 250,
          breakpoint: "sm",
          collapsed: { mobile: true },
        }}
        header={{
          height: matches ? 0 : 50,
        }}
        layout="alt"
      >
        <AppShell.Header hiddenFrom="sm">
          <Header openDrawer={open} />
        </AppShell.Header>
        <AppShell.Navbar>
          <Navbar closeDrawer={close} />
        </AppShell.Navbar>
        <div>
          <AppShell.Main>
            <MobileNavDrawer close={close} opened={opened} onClose={close} />
            {mounted && children}
          </AppShell.Main>
        </div>
      </AppShell>
    );
  },
);

AdminShell.displayName = "AdminShell";

export { AdminShell };
