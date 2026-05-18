import { useState } from 'react';
import { Plus, Edit2, Trash2, Smartphone, Apple, Globe } from 'lucide-react';
import { AppDownload } from '../../types/admin';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';

const mockDownloads: AppDownload[] = [
  {
    id: '1',
    platform: 'ios',
    version: '1.2.3',
    download_url: 'https://apps.apple.com/cn/app/xuekaoheyi',
    qr_code: '',
    is_active: true,
  },
  {
    id: '2',
    platform: 'android',
    version: '1.2.2',
    download_url: 'https://xxx.com/app.apk',
    qr_code: '',
    is_active: true,
  },
  {
    id: '3',
    platform: 'windows',
    version: '1.0.0',
    download_url: 'https://xxx.com/app.exe',
    qr_code: '',
    is_active: false,
  },
];

export default function AppDownloadsAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<AppDownload[]>(mockDownloads);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AppDownload | null>(null);
  const [formData, setFormData] = useState<Partial<AppDownload>>({
    platform: 'ios',
    version: '',
    download_url: '',
    qr_code: '',
    is_active: true,
  });

  const handleOpenDialog = (item?: AppDownload) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        platform: 'ios',
        version: '',
        download_url: '',
        qr_code: '',
        is_active: true,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.download_url) {
      showNotification('请填写下载链接', 'error');
      return;
    }
    if (editingItem) {
      setItems(prev => prev.map(i => i.id === editingItem.id ? { ...i, ...formData } as AppDownload : i));
      showNotification('更新成功', 'success');
    } else {
      const newItem: AppDownload = {
        id: `app_download_${Date.now()}`,
        ...formData
      } as AppDownload;
      setItems(prev => [newItem, ...prev]);
      showNotification('创建成功', 'success');
    }
    setDialogOpen(false);
  };

  const handleDelete = (item: AppDownload) => {
    if (!confirm(`确定删除该平台下载吗？`)) return;
    setItems(prev => prev.filter(i => i.id !== item.id));
    showNotification('删除成功', 'success');
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'ios': return <Apple className="w-6 h-6" />;
      case 'android': return <Smartphone className="w-6 h-6" />;
      case 'windows': return <Globe className="w-6 h-6" />;
      case 'mac': return <Apple className="w-6 h-6" />;
      default: return <Smartphone className="w-6 h-6" />;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'ios': return 'iOS';
      case 'android': return 'Android';
      case 'windows': return 'Windows';
      case 'mac': return 'macOS';
      default: return platform;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'ios': return 'from-gray-800 to-gray-600';
      case 'android': return 'from-green-500 to-green-700';
      case 'windows': return 'from-blue-500 to-blue-700';
      case 'mac': return 'from-gray-700 to-gray-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>APP下载管理</h2>
          <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
            <Plus size={16} />新增平台
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>平台</th>
                <th style={{ width: '40%' }}>下载链接</th>
                <th>版本</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px', height: '40px',
                        borderRadius: '8px',
                        background: item.platform === 'ios' ? 'linear-gradient(135deg, #1f2937, #374151)' :
                          item.platform === 'android' ? 'linear-gradient(135deg, #22c55e, #16a34a)' :
                          'linear-gradient(135deg, #3b82f6, #2563eb)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white'
                      }}>
                        {getPlatformIcon(item.platform)}
                      </div>
                      <div style={{ fontWeight: '500', color: 'rgb(15 23 42)' }}>{getPlatformName(item.platform)}</div>
                    </div>
                  </td>
                  <td>
                    {item.download_url && (
                      <a href={item.download_url} target="_blank" rel="noopener noreferrer" style={{
                        fontSize: '13px', color: 'rgb(59 130 246)', wordBreak: 'break-all'
                      }}>
                        {item.download_url}
                      </a>
                    )}
                  </td>
                  <td><span style={{ fontSize: '14px', color: 'rgb(100 116 184)' }}>{item.version}</span></td>
                  <td>
                    <span style={{
                      padding: '4px 12px', borderRadius: '9999px', fontSize: '12px',
                      backgroundColor: item.is_active ? 'rgb(22 184 166)' : 'rgb(156 163 175)', color: 'white'
                    }}>{item.is_active ? '启用' : '禁用'}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleOpenDialog(item)}>
                        <Edit2 size={14} />
                      </button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DataDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={editingItem ? '编辑平台' : '新增平台'}
        width="550px"
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>取消</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>保存</button>
          </>
        }
      >
        <div className="admin-form-group">
          <label className="admin-label">平台</label>
          <select
            className="admin-input"
            value={formData.platform || 'ios'}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
          >
            <option value="ios">iOS</option>
            <option value="android">Android</option>
            <option value="windows">Windows</option>
            <option value="mac">macOS</option>
          </select>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">版本号</label>
          <input
            type="text"
            value={formData.version || ''}
            onChange={(e) => setFormData({ ...formData, version: e.target.value })}
            className="admin-input"
            placeholder="例如 1.0.0"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">下载链接</label>
          <input
            type="text"
            value={formData.download_url || ''}
            onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
            className="admin-input"
            placeholder="https://..."
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">二维码图片（可选）</label>
          <input
            type="text"
            value={formData.qr_code || ''}
            onChange={(e) => setFormData({ ...formData, qr_code: e.target.value })}
            className="admin-input"
            placeholder="图片URL"
          />
        </div>
        <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px', height: '20px', borderRadius: '9999px',
              backgroundColor: (formData.is_active ? 'rgb(59 130 246)' : 'rgb(226 232 240)'),
              cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px', transition: '0.2s'
            }} onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}>
              <div style={{
                width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white',
                transform: formData.is_active ? 'translateX(16px)' : 'translateX(0)', transition: '0.2s'
              }} />
            </div>
            <span style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>启用</span>
          </div>
        </div>
      </DataDialog>
    </div>
  );
}
