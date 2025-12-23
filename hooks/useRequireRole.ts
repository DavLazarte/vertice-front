'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
  role_name: string;
}

export function useRequireRole(allowedRole: string) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.getUser();

      // Verificar que el usuario tenga el rol permitido
      const userRole = response.user.role_name;
      if (userRole !== allowedRole) {
        router.push("/login");
        return;
      }

      setUser(response.user);
    } catch (error) {
      console.error("No autenticado:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return { user, loading };
}