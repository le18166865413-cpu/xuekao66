import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  hashPassword,
  verifyPassword,
  setSession,
  getSession,
  clearSession,
  getUsers,
  saveUser,
  findUserByEmail,
  generateUserId
} from '../utils/auth';

interface AuthContextType {
  user: { 
    id: string; 
    email: string; 
    name: string; 
    role: 'admin' | 'company' | 'paid' | 'student' | 'parent';
    region?: string;
    school?: string;
    studentPhone?: string;
    parentPhone?: string;
    subjects?: string[];
    score?: number;
    childName?: string;
    childRegion?: string;
    childSchool?: string;
    childPhone?: string;
    childSubjects?: string[];
    childScore?: number;
  } | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCompany: boolean;
  isStaff: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (email: string, name: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email: string; name: string; role: 'admin' | 'company' | 'paid' | 'student' | 'parent' } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session) {
      const users = getUsers();
      const userData = users.find(u => u.id === session.userId);
      if (userData) {
        // 强制设置管理员角色
        const userRole = (userData.email === 'wuhe@xuekao.com' || userData.email === 'teacher@xuekao.com') 
          ? (userData.email === 'wuhe@xuekao.com' ? 'admin' : 'company')
          : (userData.role || 'student');
        
        setUser({ 
          id: userData.id, 
          email: userData.email, 
          name: userData.name,
          role: userRole,
          region: (userData as any).region,
          school: (userData as any).school,
          studentPhone: (userData as any).studentPhone,
          parentPhone: (userData as any).parentPhone,
          subjects: (userData as any).subjects,
          score: (userData as any).score,
          childName: (userData as any).childName,
          childRegion: (userData as any).childRegion,
          childSchool: (userData as any).childSchool,
          childPhone: (userData as any).childPhone,
          childSubjects: (userData as any).childSubjects,
          childScore: (userData as any).childScore
        });
      }
    }
    setLoading(false);
  }, []);

  const register = async (email: string, name: string, password: string): Promise<{ success: boolean; message: string }> => {
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return { success: false, message: '该邮箱已被注册' };
    }

    const passwordHash = await hashPassword(password);
    const newUser = {
      id: generateUserId(),
      email,
      name,
      passwordHash,
      createdAt: Date.now(),
      verified: true // 演示环境自动验证
    };

    saveUser(newUser);
    setSession(newUser.id, newUser.email);
    setUser({ 
      id: newUser.id, 
      email: newUser.email, 
      name: newUser.name,
      role: 'student',
      region: (newUser as any).region,
      school: (newUser as any).school,
      studentPhone: (newUser as any).studentPhone,
      parentPhone: (newUser as any).parentPhone,
      subjects: (newUser as any).subjects,
      score: (newUser as any).score
    });

    return { success: true, message: '注册成功' };
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    const userData = findUserByEmail(email);
    if (!userData) {
      return { success: false, message: '用户不存在' };
    }

    const isPasswordValid = await verifyPassword(password, userData.passwordHash);
    if (!isPasswordValid) {
      return { success: false, message: '密码错误' };
    }

    // 强制设置管理员角色
    const userRole = (email === 'wuhe@xuekao.com' || email === 'teacher@xuekao.com') 
      ? (email === 'wuhe@xuekao.com' ? 'admin' : 'company')
      : (userData.role || 'student');

    setSession(userData.id, userData.email);
    setUser({ 
      id: userData.id, 
      email: userData.email, 
      name: userData.name,
      role: userRole,
      region: (userData as any).region,
      school: (userData as any).school,
      studentPhone: (userData as any).studentPhone,
      parentPhone: (userData as any).parentPhone,
      subjects: (userData as any).subjects,
      score: (userData as any).score,
      childName: (userData as any).childName,
      childRegion: (userData as any).childRegion,
      childSchool: (userData as any).childSchool,
      childPhone: (userData as any).childPhone,
      childSubjects: (userData as any).childSubjects,
      childScore: (userData as any).childScore
    });

    return { success: true, message: '登录成功' };
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isCompany: user?.role === 'company',
        isStaff: user?.role === 'admin' || user?.role === 'company',
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
