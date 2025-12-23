"use client";

import { AdminLayout } from "@/components/admin-layout";
import { useRequireRole } from "@/hooks/useRequireRole";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useRequireRole('gym_owner');

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <AdminLayout userName={user.name}>{children}</AdminLayout>;
}   