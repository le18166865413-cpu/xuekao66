import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Trophy, Award, Target, Users, Star, RotateCcw } from 'lucide-react';
import { Achievement } from '../../types/admin';
import { getAchievements, updateAchievement, createAchievement, deleteAchievement, resetAchievements } from '../../utils/achievementsData';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';

export default function AchievementsAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<Achievement[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const [formData, setFormData] = useState<Partial<Achievement>>({
    title: '',
    description: '',
    date: '',
    location: '',
    image: '',
    icon: 'trophy',
    category: '喜报',
    highlight: false,
    is_active: true,
    sort_order: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setItems(getAchievements());
  };

  const handleOpenDialog = (item?: Achievement) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        location: '',
        image: '',
        icon: 'trophy',
        category: '喜报',
        highlight: false,
        is_active: true,
        sort_order: items.length + 1,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      showNotification('请填写完整信息', 'error');
      return;
    }
    if (editingItem) {
      const success = updateAchievement(editingItem.id, formData);
      if (success) {
        showNotification('更新成功', 'success');
        loadData();
      }
    } else {
      createAchievement(formData as Omit<Achievement, 'id'>);
      showNotification('创建成功', 'success');
      loadData();
    }
    setDialogOpen(false);
  };

  const handleDelete = (item: Achievement) => {
    if (!confirm(`确定删除"${item.title}"吗？`)) return;
    deleteAchievement(item.id);
    loadData();
    showNotification('删除成功', 'success');
  };

  const handleReset = () => {
    if (confirm('确定要重置所有动态为默认状态吗？')) {
      resetAchievements();
      loadData();
      showNotification('已重置为默认状态', 'success');
    }
  };

  const handleToggleHighlight = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      updateAchievement(id, { highlight: !item.highlight });
      loadData();
    }
  };

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'trophy': return <Trophy className="w-5 h-5" />;
      case 'award': return <Award className="w-5 h-5" />;
      case 'target': return <Target className="w-5 h-5" />;
      case 'users': return <Users className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 4px 0', color: 'rgb(15 23 42)' }}>学考合一动态</h2>
            <p style={{ fontSize: '13px', color: 'rgb(100 116 139)', margin: 0 }}>管理首页展示的动态内容</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-secondary" onClick={handleReset}>
              <RotateCcw size={16} />重置默认
            </button>
            <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
              <Plus size={16} />新增动态
            </button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>标题</th>
                <th style={{ width: '25%' }}>分类</th>
                <th>日期</th>
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
                        width: '40px', height: '40px', 
                        borderRadius: '8px', 
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white'
                      }}>
                        {getIconComponent(item.icon)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', color: 'rgb(15 23 42)' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: 'rgb(100 116 184)' }}>
                          {item.description.slice(0, 50)}{item.description.length > 50 ? '...' : ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', backgroundColor: 'rgb(221 221 221)' }}>{item.category}</span></td>
                  <td><span style={{ fontSize: '14px', color: 'rgb(100 116 184)' }}>{item.date}</span></td>
                  <td>
                    <div style={{
                      width: '36px', height: '20px', borderRadius: '9999px',
                      backgroundColor: item.highlight ? 'rgb(34 197 94)' : 'rgb(226 232 240)',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px', transition: '0.2s'
                    }} onClick={() => handleToggleHighlight(item.id)}>
                      <div style={{
                        width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white',
                        transform: item.highlight ? 'translateX(16px)' : 'translateX(0)', transition: '0.2s'
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
        title={editingItem ? '编辑动态' : '新增动态'}
        width="600px"
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>取消</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>保存</button>
          </>
        }
      >
        <div className="admin-form-group">
          <label className="admin-label">标题</label>
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
            <label className="admin-label">分类</label>
            <select
              className="admin-input"
              value={formData.category || '喜报'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option>喜报</option>
              <option>产品更新</option>
              <option>校企合作</option>
              <option>学员故事</option>
              <option>品牌活动</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">图标</label>
            <select
              className="admin-input"
              value={formData.icon || 'trophy'}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value as any })}
            >
              <option value="trophy">奖杯</option>
              <option value="award">奖章</option>
              <option value="target">目标</option>
              <option value="users">用户</option>
            </select>
          </div>
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">日期</label>
            <input
              type="date"
              value={formData.date || ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="admin-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">地点（可选）</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="admin-input"
              placeholder="请输入地点"
            />
          </div>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">图片 URL（可选）</label>
          <input
            type="text"
            value={formData.image || ''}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="admin-input"
            placeholder="请输入图片链接"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">描述</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="admin-input admin-textarea"
            rows={4}
            placeholder="请输入描述"
          />
        </div>
        <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px', height: '20px', borderRadius: '9999px',
              backgroundColor: (formData.highlight ? 'rgb(34 197 94)' : 'rgb(226 232 240)'),
              cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px', transition: '0.2s'
            }} onClick={() => setFormData({ ...formData, highlight: !formData.highlight })}>
              <div style={{
                width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white',
                transform: formData.highlight ? 'translateX(16px)' : 'translateX(0)', transition: '0.2s'
              }} />
            </div>
            <span style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>重点推荐</span>
          </div>
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
