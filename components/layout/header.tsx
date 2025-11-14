"use client";

import { Button, Group, Image, Paper, rem } from "@mantine/core";
import Link from "next/link";
import { MobileMenu } from "./mobileMenu";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { PublicUserMenu } from "./publicUserMenu";

export const NavLinks = [
  {
    label: "Página inicial",
    href: "/",
    key: "home",
  },
  {
    label: "Reclamações",
    href: "/complaints",
    key: "complaints",
  },
  {
    label: "Sobre nós",
    href: "/about",
    key: "about",
  },
  {
    label: "Ajuda",
    href: "/help",
    key: "help",
  },
];

export function Header() {
  const pathname = usePathname();
  const { status, data } = useSession();

  function highlight(key: string) {
    if (pathname.includes(key)) {
      return "text-primary-600";
    } else if (pathname === "/" && key === "home") {
      return "text-primary-600";
    }
    return undefined;
  }

  return (
    <Paper mb={rem("20px")} className="container mx-auto px-4 mt-3 shadow-none">
      <nav className="w-full flex items-center justify-between py-4">
        <Link href="/">
          <Image
            src="/logo-full.svg"
            alt="Logo"
            className="h-[40px] w-fit object-contain"
          />
        </Link>
        <Group gap={rem("42px")} visibleFrom="sm">
          {NavLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="text-sm no-underline py-1 px-3 rounded-md hover:text-primary-600 transition-colors"
            >
              <span className={highlight(link.key)}>{link.label}</span>
            </Link>
          ))}
        </Group>
        <Group>
          {status === "unauthenticated" && (
            <Group justify="end" visibleFrom="lg">
              <Button variant="outline" component={Link} href="/auth/register">
                Registre-se
              </Button>
              <Button component={Link} href="/auth/login">
                Entrar
              </Button>
            </Group>
          )}
          {status === "authenticated" && data?.user && (
            <Group justify="end" visibleFrom="lg">
              {data.user.type === "ADMIN" && (
                <Button
                  variant="subtle"
                  component={Link}
                  href="/admin"
                  size="md"
                  target="_blank"
                >
                  Dashboard
                </Button>
              )}
              {status === "authenticated" && <PublicUserMenu />}
            </Group>
          )}
          <MobileMenu />
        </Group>
      </nav>
    </Paper>
  );
}
