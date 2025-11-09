import Link from "next/link";
import { NavLinks } from "./header";
import { Image } from "@mantine/core";

export function Footer() {
  return (
    <footer className="bg-primary">
      <div className="container mx-auto px-4  py-6 md:py-8 text-white ">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/logo-white.svg"
              alt="Logo"
              className="h-[40px] w-fit object-contain"
            />
          </Link>
          <ul className="flex gap-4 flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 dark:text-gray-400">
            {NavLinks.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            SiGeR
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
