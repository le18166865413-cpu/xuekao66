import { useState } from 'react';
import { Plus, Edit2, Trash2, User, Star } from 'lucide-react';
import { Teacher } from '../../types/admin';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';
import ImageUploader from '../../components/admin/ImageUploader';
import { teachers as frontTeachers } from '../../data/coursesData';

const mockTeachers: Teacher[] = frontTeachers.map(t => ({
  ...t,
  is_featured: true,
  is_active: true,
  sort_order: 0
}));

export default function TeachersAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<Teacher[]>(mockTeachers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState<Partial<Teacher>>({
    name: '',
    title: '',
    avatar: '',
    background_image: '',
    bio: '',
    specialties: [],
    experience: '',
    courseCount: 0,
    studentCount: 0,
    rating: 5.0,
    graduateSchool: '',
    major: '',
    is_featured: false,
    is_active: true,
    sort_order: 0,
  });

  const [newSpecialty, setNewSpecialty] = useState('');

  const handleOpenDialog = (item?: Teacher) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        title: '',
        avatar: '',
        background_image: '',
        bio: '',
        specialties: [],
        experience: '',
        courseCount: 0,
        studentCount: 0,
        rating: 5.0,
        graduateSchool: '',
        major: '',
        is_featured: false,
        is_active: true,
        sort_order: items.length,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.title) {
      showNotification('请填写教师姓名和职称', 'error');
      return;
    }
    if (editingItem) {
      setItems(prev => prev.map(i => i.id === editingItem.id ? { ...i, ...formData } as Teacher : i));
      showNotification('更新成功', 'success');
    } else {
      const newItem: Teacher = {
        id: `tea-${Date.now()}`,
        ...formData
      } as Teacher;
      setItems(prev => [newItem, ...prev]);
      showNotification('创建成功', 'success');
    }
    setDialogOpen(false);
  };

  const handleDelete = (item: Teacher) => {
    if (!confirm(`确定删除教师"${item.name}"吗？`)) return;
    setItems(prev => prev.filter(i => i.id !== item.id));
    showNotification('删除成功', 'success');
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties?.includes(newSpecialty.trim())) {
      setFormData({ ...formData, specialties: [...(formData.specialties || []), newSpecialty.trim()] });
      setNewSpecialty('');
    }
  };

  const handleRemoveSpecialty = (s: string) => {
    setFormData({ ...formData, specialties: (formData.specialties || []).filter(x => x !== s) });
  };

  const renderStars = (rating: number) => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map(s => (
          <Star
            key={s}
            size={14}
            fill={s <= rating ? '#fbbf24' : 'none'}
            color={s <= rating ? '#fbbf24' : '#d1d5db'}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>师资管理</h2>
          <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
            <Plus size={16} />新增教师
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>教师</th>
                <th style={{ width: '30%' }}>专长</th>
                <th>学员数</th>
                <th>评分</th>
                <th>推荐</th>
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
                        width: '48px', height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontSize: '18px', fontWeight: '600'
                      }}>
                        <User size={24} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: 'rgb(15 23 42)' }}>{item.name}</div>
                        <div style={{ fontSize: '12px', color: 'rgb(100 116 139)' }}>{item.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {(item.specialties || []).slice(0, 2).map(s => (
                        <span key={s} style={{ padding: '2px 8px', borderRadius: '9999px', fontSize: '11px', backgroundColor: 'rgb(239 246 255)', color: 'rgb(59 130 246)' }}>
                          {s}
                        </span>
                      ))}
                      {(item.specialties || []).length > 2 && (
                        <span style={{ fontSize: '12px', color: 'rgb(148 163 184)' }}>+{(item.specialties || []).length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: 'rgb(51 65 85)' }}>
                      {item.studentCount?.toLocaleString()}
                    </span>
                  </td>
                  <td>{renderStars(item.rating)}</td>
                  <td>
                    <div style={{
                      width: '36px', height: '20px', borderRadius: '9999px',
                      backgroundColor: item.is_featured ? 'rgb(34 197 94)' : 'rgb(226 232 240)',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px', transition: '0.2s'
                    }} onClick={() => {
                      setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_featured: !i.is_featured } : i));
                    }}>
                      <div style={{
                        width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white',
                        transform: item.is_featured ? 'translateX(16px)' : 'translateX(0)', transition: '0.2s'
                      }} />
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
        title={editingItem ? '编辑教师' : '新增教师'}
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
            <label className="admin-label">教师姓名 *</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="admin-input"
              placeholder="请输入姓名"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">职称 *</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="admin-input"
              placeholder="例如：数学特级教师"
            />
          </div>
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">毕业院校</label>
            <input
              type="text"
              value={formData.graduateSchool || ''}
              onChange={(e) => setFormData({ ...formData, graduateSchool: e.target.value })}
              className="admin-input"
              placeholder="例如：北京大学"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">专业</label>
            <input
              type="text"
              value={formData.major || ''}
              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              className="admin-input"
              placeholder="例如：数学"
            />
          </div>
        </div>
        <div className="admin-grid-3">
          <div className="admin-form-group">
            <label className="admin-label">教学经验</label>
            <input
              type="text"
              value={formData.experience || ''}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="admin-input"
              placeholder="例如：20年"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">课程数</label>
            <input
              type="number"
              value={formData.courseCount || 0}
              onChange={(e) => setFormData({ ...formData, courseCount: parseInt(e.target.value) })}
              className="admin-input"
              placeholder="例如：12"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">学员数</label>
            <input
              type="number"
              value={formData.studentCount || 0}
              onChange={(e) => setFormData({ ...formData, studentCount: parseInt(e.target.value) })}
              className="admin-input"
              placeholder="例如：58600"
            />
          </div>
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">评分 (0-5)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating || 5.0}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              className="admin-input"
            />
          </div>
        </div>
        <ImageUploader
          label="头像"
          value={formData.avatar || ''}
          onChange={(url) => setFormData({ ...formData, avatar: url })}
        />
        <ImageUploader
          label="背景图片"
          value={formData.background_image || ''}
          onChange={(url) => setFormData({ ...formData, background_image: url })}
        />
        <div className="admin-form-group">
          <label className="admin-label">专业特长</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            {(formData.specialties || []).map(s => (
              <span key={s} style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '4px 10px', borderRadius: '9999px', fontSize: '13px',
                backgroundColor: 'rgb(239 246 255)', color: 'rgb(59 130 246)'
              }}>
                {s}
                <button style={{ border: 0, background: 0, cursor: 'pointer', color: 'rgb(148 163 184)' }} onClick={() => handleRemoveSpecialty(s)}>×</button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSpecialty()}
              className="admin-input"
              placeholder="输入专长后按回车添加"
              style={{ flex: 1 }}
            />
            <button className="admin-btn admin-btn-secondary" onClick={handleAddSpecialty}>添加</button>
          </div>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">个人简介</label>
          <textarea
            value={formData.bio || ''}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="admin-input admin-textarea"
            rows={4}
            placeholder="请输入教师简介"
          />
        </div>
        <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px', height: '20px', borderRadius: '9999px',
              backgroundColor: formData.is_featured ? 'rgb(34 197 94)' : 'rgb(226 232 240)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px', transition: '0.2s'
            }} onClick={() => setFormData({ ...formData, is_featured: !formData.is_featured })}>
              <div style={{
                width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white',
                transform: formData.is_featured ? 'translateX(16px)' : 'translateX(0)', transition: '0.2s'
              }} />
            </div>
            <span style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>首页推荐</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px', height: '20px', borderRadius: '9999px',
              backgroundColor: formData.is_active ? 'rgb(22 184 166)' : 'rgb(156 163 175)',
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
