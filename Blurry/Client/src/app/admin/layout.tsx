"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import AdminSectionNav from "@/components/AdminSectionNav";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (user.role !== "admin") {
      router.replace("/user/dashboard");
    }
  }, [isLoading, router, user]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Verificando acceso...</div>;
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <>
      <AdminSectionNav />
      {children}
    </>
  );
}
