"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { apiService } from "@/lib/api-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

// Define error type
interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || "");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [subscription, setSubscription] = useState<"free" | "pro">("free");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  const handleUpdateEmail = async () => {
    try {
      await apiService.updateEmail(newEmail);
      toast({ title: "Email updated successfully" });
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to update email",
        description: apiError.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    try {
      await apiService.updatePassword(newPassword);
      toast({ title: "Password updated successfully" });
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to update password",
        description: apiError.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await apiService.updateProfile({ displayName: newDisplayName });
      if (profilePicture) {
        // Implement profile picture upload logic here
        console.log("Profile picture to upload:", profilePicture);
      }
      toast({ title: "Profile updated successfully" });
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to update profile",
        description: apiError.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleRegenerateApiKey = async () => {
    try {
      const newApiKey = await apiService.regenerateApiKey();
      toast({
        title: "API key regenerated",
        description: `New key: ${newApiKey}`,
      });
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to regenerate API key",
        description: apiError.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCompanyName = async () => {
    try {
      await apiService.updateCompanyName(newCompanyName);
      toast({ title: "Company name updated successfully" });
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to update company name",
        description: apiError.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleUpdateSubscription = async () => {
    try {
      await apiService.updateSubscription(subscription);
      toast({ title: `Subscription updated to ${subscription} plan` });
    } catch (error) {
      const apiError = error as ApiError;
      toast({
        title: "Failed to update subscription",
        description: apiError.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        // Implement account deletion logic here
        toast({ title: "Account deleted successfully" });
        router.push("/");
      } catch (error) {
        const apiError = error as ApiError;
        toast({
          title: "Failed to delete account",
          description: apiError.message || "An error occurred",
          variant: "destructive",
        });
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto mt-8 px-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="New email"
            />
            <Button onClick={handleUpdateEmail}>Update Email</Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
            />
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
            <Button onClick={handleUpdatePassword}>Update Password</Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
              placeholder="Display name"
            />
            <Label htmlFor="profilePicture">Profile Picture</Label>
            <Input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProfilePicture(e.target.files ? e.target.files[0] : null)
              }
            />
            <Button onClick={handleUpdateProfile}>Update Profile</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
              placeholder="New company name"
            />
            <Button onClick={handleUpdateCompanyName}>
              Update Company Name
            </Button>
          </div>
          <div>
            <Button onClick={handleRegenerateApiKey}>Regenerate API Key</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="subscription">Current Plan: {subscription}</Label>
            <select
              id="subscription"
              value={subscription}
              onChange={(e) =>
                setSubscription(e.target.value as "free" | "pro")
              }
              className="w-full p-2 border rounded"
            >
              <option value="free">Free</option>
              <option value="pro">Pro</option>
            </select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdateSubscription}>
            Update Subscription
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleDeleteAccount} variant="destructive">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
