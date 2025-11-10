"use client";

import { AdminShell } from "@/components/layout/admin/adminShell";
import React from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
