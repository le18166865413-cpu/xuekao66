import { Wrench } from 'lucide-react';

interface AdminPlaceholderProps {
  title: string;
  description?: string;
}

export default function AdminPlaceholder({
  title,
  description = '此功能正在开发中，敬请期待',
}: AdminPlaceholderProps) {
  return (
    <div className="admin-card">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgb(59 130 246 / 0.1), rgb(37 99 235 / 0.2))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <Wrench size={40} style={{ color: 'rgb(59 130 246)' }} />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 12px 0', color: 'rgb(15 23 42)' }}>
          {title}
        </h2>
        <p style={{ margin: 0, color: 'rgb(100 116 139)', fontSize: '16px' }}>
          {description}
        </p>
      </div>
    </div>
  );
}
