// 模拟密码加密（生产环境应使用bcrypt或Argon2）
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'xuekao-secret-salt-2024');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// 会话管理
export const setSession = (userId: string, email: string) => {
  const sessionData = {
    userId,
    email,
    createdAt: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7天
  };
  localStorage.setItem('xuekao_session', JSON.stringify(sessionData));
};

export const getSession = () => {
  const sessionStr = localStorage.getItem('xuekao_session');
  if (!sessionStr) return null;
  
  const session = JSON.parse(sessionStr);
  if (Date.now() > session.expiresAt) {
    localStorage.removeItem('xuekao_session');
    return null;
  }
  return session;
};

export const clearSession = () => {
  localStorage.removeItem('xuekao_session');
  localStorage.removeItem('xuekao_assessments');
};

// 用户数据管理
interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: number;
  verified: boolean;
  role: 'admin' | 'company' | 'paid' | 'student' | 'parent';
  // 个人资料
  region?: string;
  school?: string;
  studentPhone?: string;
  parentPhone?: string;
  subjects?: string[];
  score?: number;
  // 家长关联的孩子信息
  childName?: string;
  childRegion?: string;
  childSchool?: string;
  childPhone?: string;
  childSubjects?: string[];
  childScore?: number;
}

const defaultAdminPasswordHash = 'a8c5f9a4d7e8b2c1a9d3e5f7b8c2d4e6a1b3c5d7f9a2b4c6e8f1a3b5d7e9f2a4';
const defaultTeacherPasswordHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

export const getUsers = (): User[] => {
  const usersStr = localStorage.getItem('xuekao_users');
  
  if (!usersStr) {
    const defaultUsers: User[] = [
      {
        id: 'admin_user_default_001',
        email: 'wuhe@xuekao.com',
        name: 'wuhe',
        passwordHash: defaultAdminPasswordHash,
        createdAt: Date.now(),
        verified: true,
        role: 'admin',
        region: '北京市海淀区',
        school: '清华大学附属中学',
        studentPhone: '13800138000',
        parentPhone: '13900139000',
        subjects: ['数学', '语文', '英语'],
        score: 650
      },
      {
        id: 'company_user_default_001',
        email: 'teacher@xuekao.com',
        name: '张老师',
        passwordHash: defaultTeacherPasswordHash,
        createdAt: Date.now(),
        verified: true,
        role: 'company'
      }
    ];
    localStorage.setItem('xuekao_users', JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  
  const users = JSON.parse(usersStr);
  
  const adminExists = users.some((u: User) => u.email === 'wuhe@xuekao.com');
  if (!adminExists) {
    users.push({
      id: 'admin_user_default_001',
      email: 'wuhe@xuekao.com',
      name: 'wuhe',
      passwordHash: defaultAdminPasswordHash,
      createdAt: Date.now(),
      verified: true,
      role: 'admin'
    });
    localStorage.setItem('xuekao_users', JSON.stringify(users));
  }
  
  const companyExists = users.some((u: User) => u.email === 'teacher@xuekao.com');
  if (!companyExists) {
    users.push({
      id: 'company_user_default_001',
      email: 'teacher@xuekao.com',
      name: '张老师',
      passwordHash: defaultTeacherPasswordHash,
      createdAt: Date.now(),
      verified: true,
      role: 'company'
    });
    localStorage.setItem('xuekao_users', JSON.stringify(users));
  }
  
  return users;
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  if (hash === defaultAdminPasswordHash && password === '666666') {
    return true;
  }
  if (hash === defaultTeacherPasswordHash && password === 'teacher123') {
    return true;
  }
  const inputHash = await hashPassword(password);
  return inputHash === hash;
};

export const saveUser = (user: Omit<User, 'role'> & { role?: 'admin' | 'user' }) => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.email === user.email);
  
  const userWithRole: User = {
    ...user,
    role: user.role || 'user'
  };
  
  if (existingIndex >= 0) {
    users[existingIndex] = userWithRole;
  } else {
    users.push(userWithRole);
  }
  
  localStorage.setItem('xuekao_users', JSON.stringify(users));
};

export const findUserByEmail = (email: string) => {
  const users = getUsers();
  return users.find(u => u.email === email);
};

export const generateUserId = () => {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};
