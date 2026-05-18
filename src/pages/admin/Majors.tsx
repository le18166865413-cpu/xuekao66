import { useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen, Award, TrendingUp } from 'lucide-react';
import { Major } from '../../types/admin';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';

const mockMajors: Major[] = [
  {
    id: '1',
    name: '计算机科学与技术',
    code: '080901',
    category: '工学',
    degree: '本科',
    duration: 4,
    requirements: '物理、数学基础扎实',
    employment: '互联网、软件、人工智能',
    salary: '15k-40k',
    is_hot: true,
    is_active: true,
  },
  {
    id: '2',
    name: '临床医学',
    code: '100201',
    category: '医学',
    degree: '本科',
    duration: 5,
    requirements: '生物、化学基础',
    employment: '医院、科研机构',
    salary: '12k-50k',
    is_hot: true,
    is_active: true,
  },
  {
    id: '3',
    name: '金融学',
    code: '020301',
    category: '经济学',
    degree: '本科',
    duration: 4,
    requirements: '数学、英语',
    employment: '银行、证券、基金',
    salary: '10k-35k',
    is_hot: false,
    is_active: true,
  },
];

export default function MajorsAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<Major[]>(mockMajors);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Major | null>(null);
  const [formData, setFormData] = useState<Partial<Major>>({
    name: '',
    code: '',
    category: '工学',
    degree: '本科',
    duration: 4,
    requirements: '',
    employment: '',
    salary: '',
    is_hot: false,
    is_active: true,
  });

  const handleOpenDialog = (item?: Major) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        code: '',
        category: '工学',
        degree: '本科',
        duration: 4,
        requirements: '',
        employment: '',
        salary: '',
        is_hot: false,
        is_active: true,
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
      setItems(prev => prev.map(i => i.id === editingItem.id ? { ...i, ...formData } as Major : i));
      showNotification('更新成功', 'success');
    } else {
      const newItem: Major = {
        id: `major_${Date.now()}`,
        ...formData
      } as Major;
      setItems(prev => [newItem, ...prev]);
      showNotification('创建成功', 'success');
    }
    setDialogOpen(false);
  };

  const handleDelete = (item: Major) => {
    if (!confirm(`确定删除"${item.name}"吗？`)) return;
    setItems(prev => prev.filter(i => i.id !== item.id));
    showNotification('删除成功', 'success');
  };

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>专业管理</h2>
          <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
            <Plus size={16} />新增专业
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>专业</th>
                <th style={{ width: '20%' }}>类别</th>
                <th>薪资</th>
                <th>热门</th>
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
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white'
                      }}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', color: 'rgb(15 23 42)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {item.name}
                          {item.is_hot && <span style={{
                            display: 'flex', alignItems: 'center', gap: '2px',
                            padding: '2px 6px', borderRadius: '4px',
                            backgroundColor: 'rgb(254 243 199)', fontSize: '11px', color: 'rgb(180 83 9)'
                          }}><TrendingUp size={10} />热门</span>}
                        </div>
                        <div style={{ fontSize: '12px', color: 'rgb(100 116 184)' }}>代码: {item.code}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: 'rgb(51 65 85)' }}>{item.category}</div>
                      <div style={{ fontSize: '12px', color: 'rgb(100 116 184)' }}>{item.degree} · {item.duration}年</div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: 'rgb(16 185 129)' }}>{item.salary}</span>
                  </td>
                  <td>
                    <div style={{
                      width: '36px', height: '20px', borderRadius: '9999px',
                      backgroundColor: item.is_hot ? 'rgb(249 115 22)' : 'rgb(226 232 240)',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px', transition: '0.2s'
                    }} onClick={() => {
                      setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_hot: !i.is_hot } : i));
                    }}>
                      <div style={{
                        width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white',
                        transform: item.is_hot ? 'translateX(16px)' : 'translateX(0)', transition: '0.2s'
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
        title={editingItem ? '编辑专业' : '新增专业'}
        width="650px"
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>取消</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>保存</button>
          </>
        }
      >
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">专业名称 *</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="admin-input"
              placeholder="请输入专业名称"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">专业代码 *</label>
            <input
              type="text"
              value={formData.code || ''}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="admin-input"
              placeholder="例如 080901"
            />
          </div>
        </div>
        <div className="admin-grid-3">
          <div className="admin-form-group">
            <label className="admin-label">学科类别</label>
            <select
              className="admin-input"
              value={formData.category || '工学'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option>工学</option>
              <option>理学</option>
              <option>医学</option>
              <option>经济学</option>
              <option>管理学</option>
              <option>法学</option>
              <option>文学</option>
              <option>艺术学</option>
              <option>农学</option>
              <option>哲学</option>
              <option>历史学</option>
              <option>教育学</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">学位层次</label>
            <select
              className="admin-input"
              value={formData.degree || '本科'}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            >
              <option>本科</option>
              <option>专科</option>
              <option>硕士</option>
              <option>博士</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">学制（年）</label>
            <input
              type="number"
              value={formData.duration || 4}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="admin-input"
              placeholder="4"
            />
          </div>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">选科要求</label>
          <input
            type="text"
            value={formData.requirements || ''}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            className="admin-input"
            placeholder="例如 物理、化学必选"
          />
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">就业方向</label>
            <input
              type="text"
              value={formData.employment || ''}
              onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
              className="admin-input"
              placeholder="例如 互联网、软件"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">薪资范围</label>
            <input
              type="text"
              value={formData.salary || ''}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="admin-input"
              placeholder="例如 15k-40k"
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px', height: '20px', borderRadius: '9999px',
              backgroundColor: (formData.is_hot ? 'rgb(249 115 22)' : 'rgb(226 232 240)'),
              cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px', transition: '0.2s'
            }} onClick={() => setFormData({ ...formData, is_hot: !formData.is_hot })}>
              <div style={{
                width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white',
                transform: formData.is_hot ? 'translateX(16px)' : 'translateX(0)', transition: '0.2s'
              }} />
            </div>
            <span style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>热门专业</span>
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
