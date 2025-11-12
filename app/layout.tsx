"use client";

import "mantine-datatable/styles.layer.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/notifications/styles.css";
import "@/styles/global.css";
import "dayjs/locale/pt";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Roboto } from "next/font/google";
import { Providers } from "@/providers";

const geist = Roboto({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body >
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
