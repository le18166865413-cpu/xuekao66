import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, BookOpen, GraduationCap, Lightbulb, Compass, Calendar } from 'lucide-react';
import { QuickEntry } from '../../types/admin';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';
import {
  getQuickEntries,
  updateQuickEntry,
  createQuickEntry,
  deleteQuickEntry,
} from '../../utils/quickEntriesData';

const iconOptions = [
  { value: 'book', label: '书本' },
  { value: 'graduation', label: '毕业帽' },
  { value: 'lightbulb', label: '灯泡' },
  { value: 'compass', label: '指南针' },
  { value: 'calendar', label: '日历' },
];

export default function QuickEntriesAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<QuickEntry[]>(getQuickEntries());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<QuickEntry | null>(null);
  const [formData, setFormData] = useState<Partial<QuickEntry>>({
    title: '',
    icon: 'book',
    link: '',
    description: '',
    is_active: true,
    sort_order: items.length,
  });

  useEffect(() => {
    setItems(getQuickEntries());
  }, []);

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'book': return <BookOpen className="w-5 h-5" />;
      case 'graduation': return <GraduationCap className="w-5 h-5" />;
      case 'lightbulb': return <Lightbulb className="w-5 h-5" />;
      case 'compass': return <Compass className="w-5 h-5" />;
      case 'calendar': return <Calendar className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const handleOpenDialog = (item?: QuickEntry) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        icon: 'book',
        link: '',
        description: '',
        is_active: true,
        sort_order: items.length,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.link) {
      showNotification('请填写完整信息', 'error');
      return;
    }
    if (editingItem) {
      updateQuickEntry(editingItem.id, formData);
      showNotification('更新成功', 'success');
    } else {
      createQuickEntry(formData as Omit<QuickEntry, 'id'>);
      showNotification('创建成功', 'success');
    }
    setItems(getQuickEntries());
    setDialogOpen(false);
  };

  const handleDelete = (item: QuickEntry) => {
    if (!confirm(`确定删除"${item.title}"吗？`)) return;
    deleteQuickEntry(item.id);
    setItems(getQuickEntries());
    showNotification('删除成功', 'success');
  };

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>快速入口</h2>
          <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
            <Plus size={16} />新增入口
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>入口</th>
                <th style={{ width: '35%' }}>链接</th>
                <th>排序</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px', height: '40px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white'
                      }}>
                        {getIconComponent(item.icon)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', color: 'rgb(15 23 42)' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: 'rgb(100 116 184)' }}>{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ fontSize: '14px', color: 'rgb(59 130 246)' }}>{item.link}</span></td>
                  <td><span style={{ fontSize: '14px', color: 'rgb(100 116 184)' }}>{item.sort_order}</span></td>
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
        title={editingItem ? '编辑入口' : '新增入口'}
        width="500px"
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>取消</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>保存</button>
          </>
        }
      >
        <div className="admin-form-group">
          <label className="admin-label">入口标题</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="admin-input"
            placeholder="请输入标题"
          />
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">图标</label>
            <select
              className="admin-input"
              value={formData.icon || 'book'}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            >
              {iconOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">排序</label>
            <input
              type="number"
              value={formData.sort_order || 0}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              className="admin-input"
              placeholder="排序值"
            />
          </div>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">链接地址</label>
          <input
            type="text"
            value={formData.link || ''}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="admin-input"
            placeholder="例如 /courses 或 https://..."
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">描述（可选）</label>
          <input
            type="text"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="admin-input"
            placeholder="简短描述"
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
