"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { FirebaseError } from "firebase/app";

export default function Onboarding() {
  const [option, setOption] = useState<"create" | "import" | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (option === "create") {
        // TODO: Implement API call to generate key
        const generatedApiKey = "generated-api-key-" + Date.now();
        await setDoc(doc(db, "companies", user.uid), {
          companyName,
          apiKey: generatedApiKey,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
      } else if (option === "import") {
        // TODO: Implement API validation call
        const isValid = true; // Placeholder for API key validation
        if (isValid) {
          await setDoc(doc(db, "companies", user.uid), {
            companyName: "Imported Company", // You might want to fetch this from the API
            apiKey,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          });
        } else {
          throw new Error("Invalid API key");
        }
      }
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "permission-denied":
            setError("You don't have permission to perform this action.");
            break;
          default:
            setError("Failed to complete onboarding. Please try again.");
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Onboarding error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Onboarding
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-destructive mb-4">{error}</p>}
          {!option ? (
            <div className="space-y-4">
              <Button
                onClick={() => setOption("create")}
                className="w-full"
                variant="default"
              >
                Create Company
              </Button>
              <Button
                onClick={() => setOption("import")}
                className="w-full"
                variant="outline"
              >
                Import Company
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {option === "create" ? (
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    required
                  />
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Submit"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
