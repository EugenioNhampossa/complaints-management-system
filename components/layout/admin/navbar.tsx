import {
  Badge,
  Box,
  BoxProps,
  NavLink,
  Group,
  ActionIcon,
  Image,
  Loader,
  Divider,
  Text,
} from "@mantine/core";
import React from "react";
import classes from "@/styles/navbar.module.css";
import {
  IconBell,
  IconHelp,
  IconSettings,
  IconChartPie2,
  IconSpeakerphone,
  IconUsers,
  IconCategory,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { UserMenu } from "./userMenu";
import Link from "next/link";

export const NAVLINKS = [
  {
    link: "/admin",
    key: "dashboard",
    label: "Dashboard",
    icon: IconChartPie2,
  },
  {
    link: "/admin/complaints",
    key: "complaints",
    label: "Reclamações",
    icon: IconSpeakerphone,
  },
  {
    link: "/admin/categories",
    key: "category",
    label: "Categorias",
    icon: IconCategory,
  },
  {
    link: "/admin/users",
    key: "users",
    label: "Utilizadores",
    icon: IconUsers,
  },
];

export interface NavbarProps extends BoxProps {
  closeDrawer: () => void;
}

const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  ({ closeDrawer, ...props }, ref) => {
    const pathname = usePathname();

    const links = NAVLINKS.map((item) => (
      <NavLink
        className={classes.link}
        data-active={
          pathname.includes(item.key) ||
          (pathname == "/admin" && item.key == "dashboard") ||
          undefined
        }
        onClick={closeDrawer}
        component={Link}
        href={item.link}
        key={item.label}
        label={item.label}
        leftSection={<item.icon size={17} />}
      />
    ));

    return (
      <Box {...props} ref={ref}>
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Box className={classes.header}>
              <div className="pb-xs rounded-xs">
                <Image
                  src="/logo-full.svg"
                  alt="Logo"
                  className="h-[40px] w-fit object-contain"
                />
              </div>
            </Box>
            <Box className="mt-md xs:h-[45vh] ">
              {links}
              <Text className="text-xs mb-xs px-2 mt-md text-stone-600">
                OUTROS
              </Text>
              <NavLink
                className={`${classes.link}`}
                href="/admin/notifications"
                onClick={closeDrawer}
                component={Link}
                data-active={pathname.includes("notifications") || undefined}
                label="Notificações"
                leftSection={<IconBell size={17} />}
                rightSection={
                  <Badge color="red" size="xs" circle>
                    1
                  </Badge>
                }
              />
              <NavLink
                className={classes.link}
                href="#"
                onClick={closeDrawer}
                component={Link}
                data-active={pathname.includes("help") || undefined}
                label="Ajuda"
                leftSection={<IconHelp size={17} />}
              />
              <NavLink
                className={classes.link}
                href="#"
                onClick={closeDrawer}
                component={Link}
                data-active={pathname.includes("settings") || undefined}
                label="Definições"
                leftSection={<IconSettings size={17} />}
              />
            </Box>
          </div>
          <Divider />
          <div className={classes.footer}>
            <UserMenu />
          </div>
        </nav>
      </Box>
    );
  }
);

Navbar.displayName = "Navbar";

export { Navbar };
