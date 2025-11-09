import { Button, Group, Image, Paper, rem } from "@mantine/core";
import Link from "next/link";
import { MobileMenu } from "./mobileMenu";

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
  return (
    <Paper mb={rem("40px")} className="container mx-auto px-4 mt-3 shadow-none">
      <nav className="w-full flex items-center justify-between py-4">
        <Image
          src="/logo-full.svg"
          alt="Logo"
          className="h-[40px] w-fit object-contain"
        />
        <Group gap={rem("42px")} visibleFrom="sm">
          {NavLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="no-underline py-1 px-3 rounded-md hover:text-primary-600 transition-colors"
            >
              <span
                className={link.key == "home" ? "text-primary-600" : undefined}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </Group>
        <Group visibleFrom="lg">
          <Button variant="outline">Registre-se</Button>
          <Button>Entrar</Button>
        </Group>
        <MobileMenu />
      </nav>
    </Paper>
  );
}
