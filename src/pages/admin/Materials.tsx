import { useState } from 'react';
import { Plus, Edit2, Trash2, FileText } from 'lucide-react';
import { Material as AdminMaterial } from '../../types/admin';
import { materials } from '../../data/materialsData';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';
import ImageUploader from '../../components/admin/ImageUploader';

export default function MaterialsAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<AdminMaterial[]>(materials.map(m => ({
    id: m.id,
    title: m.title,
    description: m.description,
    category: m.categoryName || m.typeName,
    file_url: m.downloadUrl,
    is_active: true,
    download_count: m.downloadCount || 0,
    created_at: m.uploadDate
  })) as AdminMaterial[]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminMaterial | null>(null);
  const [formData, setFormData] = useState<Partial<AdminMaterial>>({
    title: '', description: '', category: '真题', file_url: '', is_active: true, download_count: 0, created_at: new Date().toISOString()
  });

  const handleOpenDialog = (item?: AdminMaterial) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        category: '真题',
        file_url: '',
        is_active: true,
        download_count: 0,
        created_at: new Date().toISOString()
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title) {
      showNotification('请输入标题', 'error');
      return;
    }
    if (editingItem) {
      const updated = items.map(i => {
        if (i.id === editingItem.id) {
          return { ...i, ...formData };
        }
        return i;
      });
      setItems(updated as AdminMaterial[]);
      showNotification('更新成功', 'success');
    } else {
      const newItem: AdminMaterial = {
        id: `material_${Date.now()}`,
        title: formData.title || '',
        description: formData.description || '',
        category: formData.category || '真题',
        file_url: formData.file_url || '',
        is_active: true,
        download_count: 0,
        created_at: new Date().toISOString()
      };
      setItems([newItem, ...items]);
      showNotification('创建成功', 'success');
    }
    setDialogOpen(false);
  };

  const handleDelete = (item: AdminMaterial) => {
    if (!confirm(`确定删除 "${item.title}"？`)) return;
    setItems(items.filter(i => i.id !== item.id));
    showNotification('删除成功', 'success');
  };

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>资料管理</h2>
          <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
            <Plus size={16} />新增资料
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>资料</th>
                <th style={{ width: '40%' }}>分类</th>
                <th>下载量</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgb(59 130 246)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <FileText size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', color: 'rgb(15 23 42)' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: 'rgb(100 116 184)' }}>{item.description ? item.description.substring(0, 50) : ''}...</div>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', backgroundColor: 'rgb(221 221 221)' }}>{item.category}</span></td>
                  <td><span style={{ fontSize: '14px', color: 'rgb(100 116 184)' }}>{item.download_count}</span></td>
                  <td>
                    <span style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', backgroundColor: item.is_active ? 'rgb(22 184 166)' : 'rgb(156 163 175)', color: 'white' }}>{item.is_active ? '启用' : '禁用'}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleOpenDialog(item)}><Edit2 size={14} /></button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item)}><Trash2 size={14} /></button>
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
        title={editingItem ? '编辑资料' : '新增资料'}
        width="700px"
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>取消</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>保存</button>
          </>
        }
      >
        <div className="admin-form-group">
          <label className="admin-label">标题</label>
          <input type="text" className="admin-input" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="请输入标题" />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">分类</label>
          <select className="admin-input" value={formData.category || '真题'} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            <option>真题</option>
            <option>模拟</option>
            <option>笔记</option>
            <option>讲义</option>
            <option>其他</option>
          </select>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">预览图片</label>
          <ImageUploader
            label="预览图片"
            value={formData.preview_image || ''}
            onChange={(url) => setFormData({ ...formData, preview_image: url })}
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">文件链接</label>
          <input type="text" className="admin-input" value={formData.file_url || ''} onChange={(e) => setFormData({ ...formData, file_url: e.target.value })} placeholder="请输入文件下载链接" />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">描述</label>
          <textarea className="admin-input admin-textarea" rows={4} value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="请输入描述" />
        </div>
      </DataDialog>
    </div>
  );
}
