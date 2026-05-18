import { useState } from 'react';
import { Plus, Edit2, Trash2, Building2, Globe, MapPin, Star } from 'lucide-react';
import { University } from '../../types/admin';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';

const mockUniversities: University[] = [
  {
    id: '1',
    name: '北京大学',
    code: 'PKU',
    category: '综合',
    level: '985/211/双一流',
    location: '北京',
    province: '北京',
    city: '北京市',
    website: 'https://www.pku.edu.cn',
    tags: ['985', '211', '双一流', '综合类'],
    is_active: true,
    sort_order: 1,
  },
  {
    id: '2',
    name: '清华大学',
    code: 'THU',
    category: '理工',
    level: '985/211/双一流',
    location: '北京',
    province: '北京',
    city: '北京市',
    website: 'https://www.tsinghua.edu.cn',
    tags: ['985', '211', '双一流', '理工类'],
    is_active: true,
    sort_order: 2,
  },
  {
    id: '3',
    name: '复旦大学',
    code: 'FDU',
    category: '综合',
    level: '985/211/双一流',
    location: '上海',
    province: '上海',
    city: '上海市',
    website: 'https://www.fudan.edu.cn',
    tags: ['985', '211', '双一流', '综合类'],
    is_active: true,
    sort_order: 3,
  },
];

export default function UniversitiesAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<University[]>(mockUniversities);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<University | null>(null);
  const [formData, setFormData] = useState<Partial<University>>({
    name: '',
    code: '',
    category: '综合',
    level: '本科',
    location: '',
    province: '',
    city: '',
    website: '',
    logo: '',
    tags: [],
    is_active: true,
    sort_order: 0,
  });
  const [tagInput, setTagInput] = useState('');

  const handleOpenDialog = (item?: University) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        code: '',
        category: '综合',
        level: '本科',
        location: '',
        province: '',
        city: '',
        website: '',
        logo: '',
        tags: [],
        is_active: true,
        sort_order: items.length + 1,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.code) {
      showNotification('请填写必填信息', 'error');
      return;
    }
    if (editingItem) {
      setItems(prev => prev.map(i => i.id === editingItem.id ? { ...i, ...formData } as University : i));
      showNotification('更新成功', 'success');
    } else {
      const newItem: University = {
        id: `university_${Date.now()}`,
        ...formData
      } as University;
      setItems(prev => [newItem, ...prev]);
      showNotification('创建成功', 'success');
    }
    setDialogOpen(false);
  };

  const handleDelete = (item: University) => {
    if (!confirm(`确定删除"${item.name}"吗？`)) return;
    setItems(prev => prev.filter(i => i.id !== item.id));
    showNotification('删除成功', 'success');
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !(formData.tags || []).includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...(formData.tags || []), tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: (formData.tags || []).filter(tag => tag !== tagToRemove) });
  };

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>院校管理</h2>
          <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
            <Plus size={16} />新增院校
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>院校</th>
                <th style={{ width: '20%' }}>类别</th>
                <th>地点</th>
                <th>标签</th>
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
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white'
                      }}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', color: 'rgb(15 23 42)' }}>{item.name}</div>
                        <div style={{ fontSize: '12px', color: 'rgb(100 116 184)' }}>代码: {item.code}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: 'rgb(51 65 85)' }}>{item.category}</div>
                      <div style={{ fontSize: '12px', color: 'rgb(100 116 184)' }}>{item.level}</div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'rgb(100 116 184)' }}>
                      <MapPin className="w-3 h-3" />
                      {item.location || item.city}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {(item.tags || []).slice(0, 3).map(tag => (
                        <span key={tag} style={{ padding: '2px 8px', borderRadius: '9999px', fontSize: '11px', backgroundColor: 'rgb(221 221 221)', color: 'rgb(71 85 105)' }}>
                          {tag}
                        </span>
                      ))}
                      {(item.tags || []).length > 3 && (
                        <span style={{ padding: '2px 8px', borderRadius: '9999px', fontSize: '11px', backgroundColor: 'rgb(241 245 249)', color: 'rgb(100 116 184)' }}>
                          +{(item.tags || []).length - 3}
                        </span>
                      )}
                    </div>
                  </td>
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
        title={editingItem ? '编辑院校' : '新增院校'}
        width="700px"
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>取消</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>保存</button>
          </>
        }
      >
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">院校名称 *</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="admin-input"
              placeholder="请输入院校名称"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">院校代码 *</label>
            <input
              type="text"
              value={formData.code || ''}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="admin-input"
              placeholder="例如 PKU"
            />
          </div>
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">类别</label>
            <select
              className="admin-input"
              value={formData.category || '综合'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option>综合</option>
              <option>理工</option>
              <option>财经</option>
              <option>政法</option>
              <option>师范</option>
              <option>医药</option>
              <option>艺术</option>
              <option>农林</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">层次</label>
            <select
              className="admin-input"
              value={formData.level || '本科'}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            >
              <option>本科</option>
              <option>专科</option>
              <option>985/211/双一流</option>
              <option>211/双一流</option>
              <option>双一流</option>
            </select>
          </div>
        </div>
        <div className="admin-grid-3">
          <div className="admin-form-group">
            <label className="admin-label">省份</label>
            <input
              type="text"
              value={formData.province || ''}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              className="admin-input"
              placeholder="例如 北京"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">城市</label>
            <input
              type="text"
              value={formData.city || ''}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="admin-input"
              placeholder="例如 北京市"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">地点（显示用）</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="admin-input"
              placeholder="例如 北京"
            />
          </div>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">官网地址</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={formData.website || ''}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="admin-input"
              placeholder="https://..."
              style={{ flex: 1 }}
            />
            {formData.website && (
              <button className="admin-btn admin-btn-secondary" style={{ padding: '0 16px' }} onClick={() => window.open(formData.website, '_blank')}>
                <Globe size={16} />
              </button>
            )}
          </div>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">标签</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {(formData.tags || []).map(tag => (
              <span key={tag} style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '4px 12px', borderRadius: '9999px', fontSize: '12px',
                backgroundColor: 'rgb(241 245 249)', color: 'rgb(51 65 85)'
              }}>
                {tag}
                <button onClick={() => handleRemoveTag(tag)} style={{ cursor: 'pointer', border: 0, background: 0, color: 'rgb(100 116 184)' }}>×</button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              className="admin-input"
              placeholder="输入标签后按回车添加"
              style={{ flex: 1 }}
            />
            <button className="admin-btn admin-btn-secondary" onClick={handleAddTag}>添加</button>
          </div>
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
