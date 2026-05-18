import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface DataDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}

export default function DataDialog({
  open,
  onClose,
  title,
  children,
  footer,
  width = '600px',
}: DataDialogProps) {
  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="admin-dialog-overlay" onClick={handleOverlayClick}>
      <div className="admin-dialog" style={{ maxWidth: width }} onClick={(e) => e.stopPropagation()}>
        <div className="admin-dialog-header">
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: 'rgb(100 116 139)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'rgb(248 250 252)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'none')}
          >
            <X size={20} />
          </button>
        </div>

        <div className="admin-dialog-body">{children}</div>

        {footer && <div className="admin-dialog-footer">{footer}</div>}
      </div>
    </div>
  );
}
