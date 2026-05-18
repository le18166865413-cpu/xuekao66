import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Grid3X3, RotateCcw } from 'lucide-react';
import { Feature } from '../../types/admin';
import { getFeatures, updateFeature, createFeature, deleteFeature, resetFeatures } from '../../utils/featuresData';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';

export default function FeaturesAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<Feature[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Feature | null>(null);
  const [formData, setFormData] = useState<Partial<Feature>>({
    icon: 'BookOpen', title: '', desc: '', link: '#', gradient: 'from-blue-500 to-cyan-500', highlight: '', is_active: true, sort_order: 0,
  });

  const icons = ['BookOpen', 'Brain', 'Users', 'FileText', 'BarChart3', 'Shield', 'Compass', 'Lightbulb', 'Award', 'Target'];
  const gradients = [
    'from-blue-500 to-cyan-500', 'from-violet-500 to-purple-500', 'from-orange-500 to-amber-500', 'from-emerald-500 to-teal-500',
    'from-indigo-500 to-blue-500', 'from-slate-600 to-slate-800', 'from-rose-500 to-pink-500', 'from-yellow-500 to-orange-500',
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setItems(getFeatures());
  };

  const handleOpenDialog = (item?: Feature) => {
    if (item) { 
      setEditingItem(item); 
      setFormData(item); 
    } else {
      setEditingItem(null); 
      setFormData({
        icon: 'BookOpen', title: '', desc: '', link: '#', gradient: 'from-blue-500 to-cyan-500', highlight: '', is_active: true, sort_order: items.length,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title) { 
      showNotification('请填写标题', 'error'); 
      return; 
    }
    if (editingItem) {
      const success = updateFeature(editingItem.id, formData);
      if (success) {
        showNotification('更新成功', 'success');
        loadData();
      } else {
        showNotification('更新失败', 'error');
      }
    } else {
      createFeature(formData as Omit<Feature, 'id'>);
      showNotification('创建成功', 'success');
      loadData();
    }
    setDialogOpen(false);
  };

  const handleDelete = (item: Feature) => {
    if (!confirm(`确定删除服务"${item.title}"吗？`)) return;
    deleteFeature(item.id);
    loadData();
    showNotification('删除成功', 'success');
  };

  const handleReset = () => {
    if (confirm('确定要重置所有服务为默认状态吗？此操作不可撤销。')) {
      resetFeatures();
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
            <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 4px 0', color: 'rgb(15 23 42)' }}>核心服务管理</h2>
            <p style={{ fontSize: '13px', color: 'rgb(100 116 139)', margin: 0 }}>管理首页展示的核心服务模块</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-secondary" onClick={handleReset}>
              <RotateCcw size={16} />重置默认
            </button>
            <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
              <Plus size={16} />新增服务
            </button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {items.map(item => (
            <div key={item.id} className="admin-card" style={{ border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `linear-gradient(135deg, ${(item.gradient || 'from-blue-500 to-cyan-500').split(' ')[0]?.replace('from-', '#') || '#3b82f6'}, ${(item.gradient || 'from-blue-500 to-cyan-500').split(' ')[2]?.replace('to-', '#') || '#06b6d4'})`,
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}>
                  <Grid3X3 size={28} color="white" />
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleOpenDialog(item)}><Edit2 size={14} /></button>
                  <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item)}><Trash2 size={14} /></button>
                </div>
              </div>
              {item.highlight && (
                <div style={{ marginBottom: '8px' }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: '9999px', fontSize: '12px',
                    background: `linear-gradient(90deg, ${(item.gradient || 'from-blue-500 to-cyan-500').split(' ')[0]?.replace('from-', '#') || '#3b82f6'}, ${(item.gradient || 'from-blue-500 to-cyan-500').split(' ')[2]?.replace('to-', '#') || '#06b6d4'})`, color: 'white', fontWeight: '600',
                  }}>{item.highlight}</span>
                </div>
              )}
              <div style={{ fontSize: '18px', fontWeight: '700', color: 'rgb(15 23 42)', marginBottom: '6px' }}>{item.title}</div>
              <div style={{ fontSize: '13px', color: 'rgb(107 114 128)', lineHeight: '1.5' }}>{item.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                <span style={{ fontSize: '13px', color: 'rgb(148 163 184)' }}>了解更多 →</span>
                <span style={{
                  padding: '4px 12px', borderRadius: '9999px', fontSize: '12px',
                  backgroundColor: item.is_active ? 'rgb(22 184 166)' : 'rgb(156 163 175)', color: 'white',
                }}>{item.is_active ? '启用' : '禁用'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DataDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={editingItem ? '编辑服务' : '新增服务'}
        width="600px"
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>取消</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>保存</button>
          </>
        }
      >
        <div className="admin-form-group">
          <label className="admin-label">标题 *</label>
          <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="admin-input" placeholder="例如：课程中心" />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">描述</label>
          <textarea value={formData.desc || ''} onChange={(e) => setFormData({ ...formData, desc: e.target.value })} className="admin-input admin-textarea" rows={3} placeholder="服务详细描述" />
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">链接</label>
            <input type="text" value={formData.link || '#'} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="admin-input" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">高亮标签</label>
            <input type="text" value={formData.highlight || ''} onChange={(e) => setFormData({ ...formData, highlight: e.target.value })} className="admin-input" placeholder="例如：1000+精品课程" />
          </div>
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">图标</label>
            <select value={formData.icon || 'BookOpen'} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="admin-input">
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
            <input type="number" value={formData.sort_order || 0} onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })} className="admin-input" />
          </div>
        </div>
      </DataDialog>
    </div>
  );
}
