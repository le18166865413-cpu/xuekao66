import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminSession } from '../types/admin';

interface AdminContextType {
  session: AdminSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkPermission: (permission: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminAccount {
  username: string;
  password: string;
  name: string;
  role: AdminSession['role'];
  permissions: string[];
}

const ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    username: 'wuhe',
    password: '123456',
    name: '管理员',
    role: 'super_admin',
    permissions: ['full_access'],
  },
];

const SESSION_KEY = 'admin_session';
const SESSION_EXPIRY = 7 * 24 * 60 * 60 * 1000;

export function AdminProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AdminSession;
        const now = Date.now();
        if (now - parsed.loginTime < SESSION_EXPIRY) {
          setSession(parsed);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const account = ADMIN_ACCOUNTS.find(
      (acc) => acc.username === username && acc.password === password
    );

    if (!account) {
      return { success: false, error: '用户名或密码错误' };
    }

    const newSession: AdminSession = {
      adminId: `admin_${Date.now()}`,
      username: account.username,
      name: account.name,
      role: account.role,
      permissions: account.permissions,
      loginTime: Date.now(),
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    setSession(newSession);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  const checkPermission = (permission: string): boolean => {
    if (!session) return false;
    if (session.role === 'super_admin') return true;
    return session.permissions.includes(permission);
  };

  return (
    <AdminContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        isLoading,
        login,
        logout,
        checkPermission,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextType {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

export function useAdminAuth(requireAuth: boolean = true) {
  const { session, isAuthenticated, isLoading, logout, checkPermission } = useAdmin();

  const check = (permission: string) => checkPermission(permission);

  return {
    session,
    isAuthenticated,
    isLoading,
    logout,
    checkPermission: check,
  };
}
