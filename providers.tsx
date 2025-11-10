"use client";

import { MantineProvider } from "@mantine/core";
import React, { ReactNode } from "react";
import { ModalsProvider } from "@mantine/modals";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "dayjs/locale/pt";
import { cssVariableResolver } from "./theme/cssVariablesResolver";
import { theme } from "./theme/theme";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <MantineProvider
          cssVariablesResolver={cssVariableResolver}
          theme={theme}
        >
          <ModalsProvider>
            <DatesProvider settings={{ locale: "pt" }}>
              <Notifications position="top-center" />
              {children}
            </DatesProvider>
          </ModalsProvider>
        </MantineProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
