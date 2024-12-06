import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { apiService } from "@/lib/api-service";

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const isAdmin = await apiService.checkAdminStatus();
        setIsAdmin(isAdmin);
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, [user]);

  return { isAdmin, loading };
}
