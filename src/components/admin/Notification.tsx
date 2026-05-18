import { useState, useCallback, useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface NotificationItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

let notificationId = 0;

export function useNotification() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const showNotification = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) => {
      const id = `notification_${++notificationId}`;
      const notification: NotificationItem = { id, message, type, duration };

      setNotifications((prev) => [...prev, notification]);

      if (duration > 0) {
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, duration);
      }

      return id;
    },
    []
  );

  const hideNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return {
    notifications,
    showNotification,
    hideNotification,
  };
}

interface NotificationProps {
  notifications: NotificationItem[];
  onClose: (id: string) => void;
}

export default function Notification({ notifications, onClose }: NotificationProps) {
  if (notifications.length === 0) return null;

  const icons = {
    success: <CheckCircle size={18} />,
    error: <XCircle size={18} />,
    info: <Info size={18} />,
  };

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 2000 }}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`admin-notification admin-notification-${notification.type}`}
        >
          {icons[notification.type]}
          <span>{notification.message}</span>
          <button
            onClick={() => onClose(notification.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              padding: '4px',
              marginLeft: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
