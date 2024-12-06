"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAdmin } from "@/hooks/useAdmin";

export default function AdminPage() {
  const { isAdmin, loading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/");
    }
  }, [isAdmin, loading, router]);

  if (loading || !isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Welcome to the admin dashboard. This page is only accessible to
            authorized administrators.
          </p>
          {/* Add more admin-specific content here */}
        </CardContent>
      </Card>
    </div>
  );
}
