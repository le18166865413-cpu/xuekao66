import { useState } from 'react';
import { Plus, Edit2, Trash2, Wheat } from 'lucide-react';
import { Partner } from '../../types/admin';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';

const realPartners: Partner[] = [
  { name: '清华大学', gradient: 'from-purple-500 to-indigo-500', id: 1, is_active: true },
  { name: '北京大学', gradient: 'from-red-500 to-pink-500', id: 2, is_active: true },
  { name: '复旦大学', gradient: 'from-blue-500 to-cyan-500', id: 3, is_active: true },
  { name: '浙江大学', gradient: 'from-emerald-500 to-teal-500', id: 4, is_active: true },
  { name: '南京大学', gradient: 'from-violet-500 to-purple-500', id: 5, is_active: true },
  { name: '武汉大学', gradient: 'from-orange-500 to-amber-500', id: 6, is_active: true },
  { name: '中山大学', gradient: 'from-sky-500 to-blue-500', id: 7, is_active: true },
  { name: '四川大学', gradient: 'from-rose-500 to-pink-500', id: 8, is_active: true },
  { name: '上海交大', gradient: 'from-cyan-500 to-blue-500', id: 9, is_active: true },
  { name: '中国科大', gradient: 'from-lime-500 to-emerald-500', id: 10, is_active: true },
  { name: '同济大学', gradient: 'from-amber-500 to-yellow-500', id: 11, is_active: true },
  { name: '西安交大', gradient: 'from-red-500 to-orange-500', id: 12, is_active: true },
  { name: '哈工大', gradient: 'from-blue-500 to-indigo-500', id: 13, is_active: true },
  { name: '北航', gradient: 'from-sky-500 to-cyan-500', id: 14, is_active: true },
  { name: '南开大学', gradient: 'from-violet-500 to-purple-500', id: 15, is_active: true },
  { name: '厦大', gradient: 'from-teal-500 to-emerald-500', id: 16, is_active: true },
  { name: '中大', gradient: 'from-emerald-500 to-teal-500', id: 17, is_active: true },
  { name: '吉大', gradient: 'from-lime-500 to-green-500', id: 18, is_active: true },
  { name: '山东大学', gradient: 'from-orange-500 to-red-500', id: 19, is_active: true },
  { name: '湖南大学', gradient: 'from-red-500 to-rose-500', id: 20, is_active: true },
  { name: '华东师范', gradient: 'from-blue-500 to-violet-500', id: 21, is_active: true },
];

const gradients = [
  'from-purple-500 to-indigo-500',
  'from-red-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-violet-500 to-purple-500',
  'from-orange-500 to-amber-500',
  'from-sky-500 to-blue-500',
  'from-rose-500 to-pink-500',
  'from-cyan-500 to-blue-500',
  'from-lime-500 to-emerald-500',
  'from-amber-500 to-yellow-500',
  'from-red-500 to-orange-500',
  'from-teal-500 to-emerald-500',
  'from-lime-500 to-green-500',
  'from-orange-500 to-red-500',
  'from-red-500 to-rose-500',
  'from-blue-500 to-violet-500',
];

export default function PartnersAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<Partner[]>(realPartners);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partner | null>(null);
  const [formData, setFormData] = useState<Partial<Partner>>({
    name: '',
    gradient: 'from-purple-500 to-indigo-500',
    is_active: true,
  });

  const handleOpenDialog = (item?: Partner) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        gradient: 'from-purple-500 to-indigo-500',
        is_active: true,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name) {
      showNotification('请填写名称', 'error');
      return;
    }

    if (editingItem) {
      setItems(prev => prev.map(i => (i.id === editingItem.id ? { ...i, ...formData } : i)));
      showNotification('更新成功', 'success');
    } else {
      const newItem: Partner = {
        id: Date.now(),
        ...formData,
      } as Partner;
      setItems(prev => [newItem, ...prev]);
      showNotification('创建成功', 'success');
    }
    setDialogOpen(false);
  };

  const handleDelete = (item: Partner) => {
    if (!confirm(`确定删除"${item.name}"吗？`)) return;
    setItems(prev => prev.filter(i => i.id !== item.id));
    showNotification('删除成功', 'success');
  };

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>合作院校</h2>
          <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
            <Plus size={16} />
            新增院校
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {items.map(item => (
            <div key={item.id} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}>
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                display: 'flex',
                gap: '4px',
              }}>
                <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleOpenDialog(item)}>
                  <Edit2 size={14} />
                </button>
                <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item)}>
                  <Trash2 size={14} />
                </button>
              </div>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: (() => {
                  const g = item.gradient || 'from-purple-500 to-indigo-500';
                  const parts = g.split(' ');
                  const from = (parts[0] || 'from-purple-500').replace('from-', '#').replace('blue-', '#3b82f6').replace('purple-', '#8b5cf6').replace('red-', '#ef4444').replace('pink-', '#ec4899').replace('emerald-', '#10b981').replace('teal-', '#06b6d4').replace('violet-', '#7c3aed').replace('orange-', '#f97316').replace('amber-', '#f59e0b').replace('sky-', '#0ea5e9').replace('lime-', '#84cc16').replace('yellow-', '#eab308').replace('green-', '#22c55e').replace('cyan-', '#22d3ee');
                  const to = (parts[2] || 'to-indigo-500').replace('to-', '#').replace('indigo-', '#6366f1').replace('pink-', '#ec4899').replace('cyan-', '#06b6d4').replace('blue-', '#3b82f6').replace('yellow-', '#eab308').replace('green-', '#22c55e').replace('orange-', '#f97316').replace('rose-', '#f43f5e').replace('teal-', '#0ea5e9').replace('violet-', '#7c3aed').replace('red-', '#ef4444');
                  return `linear-gradient(135deg, ${from}, ${to})`;
                })(),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Wheat size={28} color="white" />
              </div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(15 23 42)', textAlign: 'center' }}>{item.name}</div>
              <div style={{ marginTop: 'auto' }}>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  backgroundColor: item.is_active ? 'rgb(22 184 166)' : 'rgb(156 163 175)',
                  color: 'white',
                }}>
                  {item.is_active ? '启用' : '禁用'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DataDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={editingItem ? '编辑院校' : '新增院校'}
        width="500px"
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>取消</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>保存</button>
          </>
        }
      >
        <div className="admin-form-group">
          <label className="admin-label">院校名称</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="admin-input"
            placeholder="例如：清华大学"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">渐变色</label>
          <select
            value={formData.gradient || 'from-purple-500 to-indigo-500'}
            onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
            className="admin-input admin-select"
          >
            {gradients.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '36px',
            height: '20px',
            borderRadius: '9999px',
            backgroundColor: formData.is_active ? 'rgb(22 184 166)' : 'rgb(226 232 240)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '2px',
            transition: '0.2s',
          }} onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}>
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: 'white',
              transform: formData.is_active ? 'translateX(16px)' : 'translateX(0)',
              transition: '0.2s',
            }} />
          </div>
          <span style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>启用</span>
        </div>
      </DataDialog>
    </div>
  );
}
