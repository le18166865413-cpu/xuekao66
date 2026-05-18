import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, BarChart2, RotateCcw } from 'lucide-react';
import { StatItem } from '../../types/admin';
import { getStats, updateStat, createStat, deleteStat, resetStats } from '../../utils/statsData';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';

export default function StatsAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<StatItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StatItem | null>(null);
  const [formData, setFormData] = useState<Partial<StatItem>>({
    value: 0, suffix: '', label: '', icon: 'Users', gradient: 'from-blue-500 to-cyan-500', description: '', is_active: true, sort_order: 0,
  });

  const icons = ['Users', 'BookOpen', 'Target', 'Heart', 'Award', 'Sparkles', 'Trophy', 'CheckCircle', 'BarChart2'];
  const gradients = [
    'from-blue-500 to-cyan-500', 'from-violet-500 to-purple-500', 'from-orange-500 to-pink-500', 'from-emerald-500 to-teal-500',
    'from-amber-500 to-orange-500', 'from-fuchsia-500 to-pink-500', 'from-cyan-500 to-blue-500', 'from-rose-500 to-red-500',
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setItems(getStats());
  };

  const handleOpenDialog = (item?: StatItem) => {
    if (item) { setEditingItem(item); setFormData(item); }
    else {
      setEditingItem(null); setFormData({
        value: 0, suffix: '', label: '', icon: 'Users', gradient: 'from-blue-500 to-cyan-500', description: '', is_active: true, sort_order: items.length,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.label) { showNotification('请填写标签', 'error'); return; }
    if (editingItem) {
      const success = updateStat(editingItem.id, formData);
      if (success) {
        showNotification('更新成功', 'success');
        loadData();
      }
    } else {
      createStat(formData as Omit<StatItem, 'id'>);
      showNotification('创建成功', 'success');
      loadData();
    }
    setDialogOpen(false);
  };

  const handleDelete = (item: StatItem) => {
    if (!confirm(`确定删除统计项"${item.label}"吗？`)) return;
    deleteStat(item.id);
    loadData();
    showNotification('删除成功', 'success');
  };

  const handleReset = () => {
    if (confirm('确定要重置所有统计为默认状态吗？')) {
      resetStats();
      loadData();
      showNotification('已重置为默认状态', 'success');
    }
  };

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 4px 0', color: 'rgb(15 23 42)' }}>数据统计管理</h2>
            <p style={{ fontSize: '13px', color: 'rgb(100 116 139)', margin: 0 }}>管理首页展示的数据统计卡片</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-secondary" onClick={handleReset}><RotateCcw size={16} />重置默认</button>
            <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
              <Plus size={16} />新增统计
            </button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {items.map(item => {
            const g = item.gradient || 'from-blue-500 to-cyan-500';
            const parts = g.split(' ');
            const fromColor = (parts[0] || '').replace('from-', '#');
            const toColor = (parts[2] || '').replace('to-', '#');
            return (
            <div key={item.id} className="admin-card" style={{ border: '1px solid #e5e7eb', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '0', left: '0', right: '0', height: '4px', background: `linear-gradient(90deg, ${fromColor}, ${toColor})` }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${fromColor}, ${toColor})` }}>
                  <BarChart2 size={24} color="white" />
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleOpenDialog(item)}><Edit2 size={14} /></button>
                  <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item)}><Trash2 size={14} /></button>
                </div>
              </div>
              <div style={{ fontSize: '36px', fontWeight: '800', background: `linear-gradient(90deg, ${fromColor}, ${toColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                {item.value.toLocaleString()}{item.suffix}
              </div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(15 23 42)', marginBottom: '6px' }}>{item.label}</div>
              <div style={{ fontSize: '13px', color: 'rgb(107 114 128)' }}>{item.description}</div>
              <div style={{ marginTop: '12px' }}>
                <span style={{
                  padding: '4px 12px', borderRadius: '9999px', fontSize: '12px',
                  backgroundColor: item.is_active ? 'rgb(22 184 166)' : 'rgb(156 163 175)', color: 'white',
                }}>{item.is_active ? '启用' : '禁用'}</span>
              </div>
            </div>
          );})}
        </div>
      </div>

      <DataDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={editingItem ? '编辑统计' : '新增统计'}
        width="600px"
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>取消</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>保存</button>
          </>
        }
      >
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">数值 *</label>
            <input type="number" value={formData.value || 0} onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) })} className="admin-input" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">后缀</label>
            <input type="text" value={formData.suffix || ''} onChange={(e) => setFormData({ ...formData, suffix: e.target.value })} className="admin-input" placeholder="例如：+、%、K" />
          </div>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">标签 *</label>
          <input type="text" value={formData.label || ''} onChange={(e) => setFormData({ ...formData, label: e.target.value })} className="admin-input" placeholder="例如：累计学员" />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">描述</label>
          <textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="admin-input admin-textarea" rows={2} placeholder="简短描述" />
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">图标</label>
            <select value={formData.icon || 'Users'} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="admin-input">
              {icons.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">渐变色</label>
            <select value={formData.gradient || 'from-blue-500 to-cyan-500'} onChange={(e) => setFormData({ ...formData, gradient: e.target.value })} className="admin-input">
              {gradients.map((g, i) => <option key={i} value={g}>{g}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px', height: '20px', borderRadius: '9999px',
              backgroundColor: formData.is_active ? 'rgb(22 184 166)' : 'rgb(156 163 175)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px', transition: '0.2s',
            }} onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}>
              <div style={{
                width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white',
                transform: formData.is_active ? 'translateX(16px)' : 'translateX(0)', transition: '0.2s',
              }} />
            </div>
            <span style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>启用</span>
          </div>
          <div className="admin-form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label className="admin-label">排序</label>
            <input type="number" value={formData.sort_order || 0} onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })} className="admin-input" />
          </div>
        </div>
      </DataDialog>
    </div>
  );
}
