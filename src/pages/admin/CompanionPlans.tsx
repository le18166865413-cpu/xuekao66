import { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Sparkles } from 'lucide-react';
import { CompanionPlan } from '../../types/admin';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';

const mockPlans: CompanionPlan[] = [
  {
    id: '1',
    name: '基础伴学',
    price: 299,
    duration: '1个月',
    features: ['在线课程', '题库练习', '学习报告'],
    is_active: true,
    sort_order: 1,
  },
  {
    id: '2',
    name: '标准伴学',
    price: 699,
    duration: '3个月',
    features: ['在线课程', '题库练习', '学习报告', '1v1答疑'],
    is_active: true,
    sort_order: 2,
  },
  {
    id: '3',
    name: '尊享伴学',
    price: 1499,
    duration: '6个月',
    features: ['全部课程', '题库VIP', '学习规划', '专属老师', '志愿填报指导'],
    is_active: true,
    sort_order: 3,
  },
];

export default function CompanionPlansAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<CompanionPlan[]>(mockPlans);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CompanionPlan | null>(null);
  const [formData, setFormData] = useState<Partial<CompanionPlan>>({
    name: '',
    price: 0,
    duration: '1个月',
    features: [],
    is_active: true,
    sort_order: 0,
  });
  const [featureInput, setFeatureInput] = useState('');

  const handleOpenDialog = (item?: CompanionPlan) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        price: 0,
        duration: '1个月',
        features: [],
        is_active: true,
        sort_order: items.length + 1,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      showNotification('请填写完整信息', 'error');
      return;
    }
    if (editingItem) {
      setItems(prev => prev.map(i => i.id === editingItem.id ? { ...i, ...formData } as CompanionPlan : i));
      showNotification('更新成功', 'success');
    } else {
      const newItem: CompanionPlan = {
        id: `plan_${Date.now()}`,
        ...formData
      } as CompanionPlan;
      setItems(prev => [newItem, ...prev]);
      showNotification('创建成功', 'success');
    }
    setDialogOpen(false);
  };

  const handleDelete = (item: CompanionPlan) => {
    if (!confirm(`确定删除套餐"${item.name}"吗？`)) return;
    setItems(prev => prev.filter(i => i.id !== item.id));
    showNotification('删除成功', 'success');
  };

  const handleAddFeature = () => {
    if (featureInput.trim() && !(formData.features || []).includes(featureInput.trim())) {
      setFormData({ ...formData, features: [...(formData.features || []), featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (featureToRemove: string) => {
    setFormData({ ...formData, features: (formData.features || []).filter(f => f !== featureToRemove) });
  };

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>伴学套餐</h2>
          <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
            <Plus size={16} />新增套餐
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>套餐</th>
                <th style={{ width: '35%' }}>包含功能</th>
                <th>价格</th>
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
                        background: 'linear-gradient(135deg, #ec4899, #db2777)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white'
                      }}>
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', color: 'rgb(15 23 42)' }}>{item.name}</div>
                        <div style={{ fontSize: '12px', color: 'rgb(100 116 184)' }}>{item.duration}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {(item.features || []).slice(0, 4).map(feature => (
                        <span key={feature} style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', backgroundColor: 'rgb(221 221 221)', color: 'rgb(71 85 105)' }}>
                          {feature}
                        </span>
                      ))}
                      {(item.features || []).length > 4 && (
                        <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', backgroundColor: 'rgb(241 245 249)', color: 'rgb(100 116 184)' }}>
                          +{(item.features || []).length - 4}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '18px', fontWeight: '700', color: 'rgb(59 130 246)' }}>¥{item.price}</span>
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
        title={editingItem ? '编辑套餐' : '新增套餐'}
        width="600px"
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>取消</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>保存</button>
          </>
        }
      >
        <div className="admin-form-group">
          <label className="admin-label">套餐名称</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="admin-input"
            placeholder="例如 基础伴学"
          />
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">价格（元）</label>
            <input
              type="number"
              value={formData.price || 0}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
              className="admin-input"
              placeholder="299"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">有效期</label>
            <select
              className="admin-input"
              value={formData.duration || '1个月'}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            >
              <option>1个月</option>
              <option>3个月</option>
              <option>6个月</option>
              <option>12个月</option>
            </select>
          </div>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">套餐功能</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            {(formData.features || []).map(feature => (
              <span key={feature} style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '6px 12px', borderRadius: '8px', fontSize: '13px',
                backgroundColor: 'rgb(241 245 249)', color: 'rgb(51 65 85)', border: '1px solid rgb(221 221 221)'
              }}>
                <CheckCircle2 size={14} style={{ color: 'rgb(16 185 129)' }} />
                {feature}
                <button onClick={() => handleRemoveFeature(feature)} style={{ cursor: 'pointer', border: 0, background: 0, color: 'rgb(100 116 184)' }}>×</button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddFeature()}
              className="admin-input"
              placeholder="输入功能后按回车添加"
              style={{ flex: 1 }}
            />
            <button className="admin-btn admin-btn-secondary" onClick={handleAddFeature}>添加</button>
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
