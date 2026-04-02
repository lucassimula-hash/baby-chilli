"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="ml-0 md:ml-[var(--sidebar-width)] bg-[var(--backgrounds-base)]">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <div className="min-h-[calc(100vh-var(--header-height))] bg-[var(--backgrounds-base)]">
          <div className="mx-auto max-w-3xl bg-[var(--backgrounds-base)] px-6 py-10 md:px-10">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
