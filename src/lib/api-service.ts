import axios, { AxiosInstance } from "axios";
import { auth } from "./firebase";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "/api",
    });

    this.api.interceptors.request.use(async (config) => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async checkAdminStatus(): Promise<boolean> {
    try {
      const response = await this.api.get<{ isAdmin: boolean }>("/check-admin");
      return response.data.isAdmin;
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  }

  async updateEmail(newEmail: string): Promise<void> {
    const user = auth.currentUser;
    if (user) {
      await updateEmail(user, newEmail);
    } else {
      throw new Error("No user is currently signed in");
    }
  }

  async updatePassword(newPassword: string): Promise<void> {
    const user = auth.currentUser;
    if (user) {
      await updatePassword(user, newPassword);
    } else {
      throw new Error("No user is currently signed in");
    }
  }

  async updateProfile(data: {
    displayName?: string;
    photoURL?: string;
  }): Promise<void> {
    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, data);
    } else {
      throw new Error("No user is currently signed in");
    }
  }

  async regenerateApiKey(): Promise<string> {
    try {
      const response = await this.api.post<{ apiKey: string }>(
        "/regenerate-api-key"
      );
      return response.data.apiKey;
    } catch (error) {
      console.error("Error regenerating API key:", error);
      throw error;
    }
  }

  async updateCompanyName(newName: string): Promise<void> {
    try {
      await this.api.post("/update-company-name", { name: newName });
    } catch (error) {
      console.error("Error updating company name:", error);
      throw error;
    }
  }

  // Placeholder for subscription management
  async updateSubscription(plan: "free" | "pro"): Promise<void> {
    try {
      await this.api.post("/update-subscription", { plan });
    } catch (error) {
      console.error("Error updating subscription:", error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
