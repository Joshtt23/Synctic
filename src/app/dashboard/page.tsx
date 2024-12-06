"use client";

import { useEffect, useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Company } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const { user, loading } = useRequireAuth();
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (user) {
        const docRef = doc(db, "companies", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCompany(docSnap.data() as Company);
        }
        else {
          console.log("No such document!");
          setCompany("None" as unknown as Company);
        }
      }
    };

    fetchCompanyData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to your Dashboard, {user.displayName || user.email}
        </h1>
        {company && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Company Name: {company.companyName}</p>
              <p>API Key: {company.apiKey}</p>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Features</CardTitle>
          </CardHeader>
          <CardContent>
            <p>More features coming soon...</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
