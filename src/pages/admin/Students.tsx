import { useState } from 'react';
import { Plus, Edit2, Trash2, User, GraduationCap } from 'lucide-react';
import { Student as AdminStudent } from '../../types/admin';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';

const sampleStudents: AdminStudent[] = [
  { id: '1', name: '张同学', school: '衡水中学', university: '北京大学', major: '计算机', subject: '数学', score_increase: '+40分', description: '从班级中游逆袭到年级前十', status: 'published', is_active: true },
  { id: '2', name: '李同学', school: '人大附中', university: '清华大学', major: '电子工程', subject: '物理', score_increase: '+35分', description: '物理竞赛金牌得主', status: 'published', is_active: true },
];

export default function StudentsAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<AdminStudent[]>(sampleStudents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminStudent | null>(null);
  const [formData, setFormData] = useState<Partial<AdminStudent>>({
    name: '', school: '', university: '', major: '', subject: '', score_increase: '', description: '', status: 'published', is_active: true,
  });

  const handleOpenDialog = (item?: AdminStudent) => {
    if (item) { setEditingItem(item); setFormData(item); }
    else { setEditingItem(null); setFormData({ name: '', school: '', university: '', major: '', subject: '', score_increase: '', description: '', status: 'published', is_active: true }); }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name) { showNotification('请填写学员姓名', 'error'); return; }
    if (editingItem) {
      setItems(prev => prev.map(i => i.id === editingItem.id ? { ...i, ...formData } as AdminStudent : i));
      showNotification('更新成功', 'success');
    } else {
      const newItem: AdminStudent = { id: `student_${Date.now()}`, ...formData } as AdminStudent;
      setItems(prev => [newItem, ...prev]);
      showNotification('创建成功', 'success');
    }
    setDialogOpen(false);
  };

  const handleDelete = (item: AdminStudent) => {
    if (!confirm(`确定删除"${item.name}"的案例吗？`)) return;
    setItems(prev => prev.filter(i => i.id !== item.id));
    showNotification('删除成功', 'success');
  };

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>学员案例</h2>
          <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}><Plus size={16} />新增案例</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr><th>学员</th><th style={{ width: '40%' }}>简介</th><th>状态</th><th>操作</th></tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgb(59 130 246)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <GraduationCap size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', color: 'rgb(15 23 42)' }}>{item.name}</div>
                        <div style={{ fontSize: '12px', color: 'rgb(100 116 139)' }}>{item.school} → {item.university}</div>
                      </div>
                    </div>
                  </td>
                  <td><div style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>{item.description.slice(0, 60)}{item.description.length > 60 ? '...' : ''}</div></td>
                  <td>
                    <span style={{
                      padding: '4px 12px', borderRadius: '9999px', fontSize: '12px',
                      backgroundColor: item.is_active ? 'rgb(22 184 166)' : 'rgb(156 163 175)', color: 'white'
                    }}>{item.is_active ? '启用' : '禁用'}</span>
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
        title={editingItem ? '编辑案例' : '新增案例'}
        width="700px"
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>取消</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>保存</button>
          </>
        }
      >
        <div className="admin-form-group"><label className="admin-label">学员姓名</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="admin-input" placeholder="请输入姓名" /></div>
        <div className="admin-grid-2">
          <div className="admin-form-group"><label className="admin-label">高中学校</label><input type="text" value={formData.school} onChange={(e) => setFormData({ ...formData, school: e.target.value })} className="admin-input" placeholder="例如：衡水中学" /></div>
          <div className="admin-form-group"><label className="admin-label">录取大学</label><input type="text" value={formData.university} onChange={(e) => setFormData({ ...formData, university: e.target.value })} className="admin-input" placeholder="例如：北京大学" /></div>
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group"><label className="admin-label">专业</label><input type="text" value={formData.major} onChange={(e) => setFormData({ ...formData, major: e.target.value })} className="admin-input" placeholder="例如：计算机" /></div>
          <div className="admin-form-group"><label className="admin-label">提升科目</label><input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="admin-input" placeholder="例如：数学" /></div>
        </div>
        <div className="admin-form-group"><label className="admin-label">提分</label><input type="text" value={formData.score_increase} onChange={(e) => setFormData({ ...formData, score_increase: e.target.value })} className="admin-input" placeholder="例如：+40分" /></div>
        <div className="admin-form-group"><label className="admin-label">案例描述</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="admin-input admin-textarea" rows={4} placeholder="请输入案例描述" /></div>
      </DataDialog>
    </div>
  );
}
