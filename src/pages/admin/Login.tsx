import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Lock, User, AlertCircle } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.error || '登录失败');
      }
    } catch {
      setError('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgb(15 23 42), rgb(30 41 59))',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, rgb(59 130 246), rgb(37 99 235))',
              borderRadius: '16px',
              marginBottom: '16px',
            }}
          >
            <Book size={32} style={{ color: 'white' }} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: 'rgb(15 23 42)', margin: '0 0 4px 0' }}>
            学考合一
          </h1>
          <p style={{ fontSize: '14px', color: 'rgb(100 116 139)', margin: 0 }}>
            后台管理系统
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-label">用户名</label>
            <div style={{ position: 'relative' }}>
              <User
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgb(100 116 139)',
                }}
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="admin-input"
                style={{ paddingLeft: '40px' }}
                placeholder="请输入用户名"
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">密码</label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgb(100 116 139)',
                }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                style={{ paddingLeft: '40px' }}
                placeholder="请输入密码"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                background: 'rgb(254 242 242)',
                color: 'rgb(220 38 38)',
                borderRadius: '6px',
                marginBottom: '16px',
                fontSize: '14px',
              }}
            >
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={loading}
            style={{ width: '100%', padding: '12px', fontSize: '16px' }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    border: '2px solid white',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }}
                />
                登录中...
              </>
            ) : (
              '登录'
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: '24px',
            padding: '12px',
            background: 'rgb(248 250 252)',
            borderRadius: '6px',
            fontSize: '12px',
            color: 'rgb(100 116 139)',
          }}
        >
          <strong>测试账号：</strong> wuhe / 123456
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
