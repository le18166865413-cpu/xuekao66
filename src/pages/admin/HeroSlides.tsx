import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Monitor } from 'lucide-react';
import { HeroSlide } from '../../types/admin';
import { 
  getHeroSlides, 
  updateHeroSlide, 
  createHeroSlide, 
  deleteHeroSlide,
  resetHeroSlides
} from '../../utils/heroSlides';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';
import ImageUploader from '../../components/admin/ImageUploader';

export default function HeroSlidesAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<HeroSlide[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState<Partial<HeroSlide>>({
    badgeText: '',
    titlePart1: '',
    titlePart2: '',
    subtitle: '',
    features: [],
    ctaPrimary: '',
    ctaSecondary: '',
    gradient: 'from-blue-50 via-white to-violet-50/50',
    imageUrl: '',
    is_active: true,
    sort_order: 0,
    floatCard1_title: '',
    floatCard1_desc: '',
    floatCard1_icon: 'Brain',
    floatCard1_gradient: 'from-blue-500 to-violet-500',
    floatCard2_value: '',
    floatCard2_label: '',
    floatCard3_value: '',
    floatCard3_label: '',
    floatCard3_gradient: 'from-emerald-500 to-teal-500',
    floatCard4_value: '',
    floatCard4_label: '',
    floatCard4_gradient: 'from-amber-500 to-orange-500',
  });
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = () => {
    setItems(getHeroSlides());
  };

  const handleOpenDialog = (item?: HeroSlide) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        badgeText: '',
        titlePart1: '',
        titlePart2: '',
        subtitle: '',
        features: [],
        ctaPrimary: '',
        ctaSecondary: '',
        gradient: 'from-blue-50 via-white to-violet-50/50',
        imageUrl: '',
        is_active: true,
        sort_order: items.length,
        floatCard1_title: '',
        floatCard1_desc: '',
        floatCard1_icon: 'Brain',
        floatCard1_gradient: 'from-blue-500 to-violet-500',
        floatCard2_value: '',
        floatCard2_label: '',
        floatCard3_value: '',
        floatCard3_label: '',
        floatCard3_gradient: 'from-emerald-500 to-teal-500',
        floatCard4_value: '',
        floatCard4_label: '',
        floatCard4_gradient: 'from-amber-500 to-orange-500',
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.titlePart1 || !formData.titlePart2) {
      showNotification('请填写标题', 'error');
      return;
    }
    if (editingItem) {
      updateHeroSlide(editingItem.id, formData);
      showNotification('更新成功', 'success');
    } else {
      createHeroSlide(formData as Omit<HeroSlide, 'id'>);
      showNotification('创建成功', 'success');
    }
    loadSlides();
    setDialogOpen(false);
  };

  const handleDelete = (item: HeroSlide) => {
    if (!confirm(`确定删除轮播图"${item.titlePart1} ${item.titlePart2}"吗？`)) return;
    deleteHeroSlide(item.id);
    loadSlides();
    showNotification('删除成功', 'success');
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features?.includes(newFeature.trim())) {
      setFormData({ ...formData, features: [...(formData.features || []), newFeature.trim()] });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (f: string) => {
    setFormData({ ...formData, features: (formData.features || []).filter(x => x !== f) });
  };

  const handleReset = () => {
    if (confirm('确定要重置所有轮播图为默认状态吗？此操作不可撤销。')) {
      resetHeroSlides();
      loadSlides();
      showNotification('已重置为默认状态', 'success');
    }
  };

  const gradients = [
    'from-blue-50 via-white to-violet-50/50',
    'from-emerald-50 via-white to-teal-50/50',
    'from-amber-50 via-white to-orange-50/50',
    'from-fuchsia-50 via-white to-pink-50/50',
  ];

  const icons = ['Brain', 'BookOpen', 'Users', 'Target', 'Award', 'Trophy', 'Sparkles', 'CheckCircle'];
  const iconGradients = [
    'from-blue-500 to-violet-500',
    'from-emerald-500 to-teal-500',
    'from-amber-500 to-orange-500',
    'from-fuchsia-500 to-pink-500',
    'from-cyan-500 to-blue-500',
    'from-rose-500 to-red-500',
  ];

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 4px 0', color: 'rgb(15 23 42)' }}>
              Hero轮播图管理
            </h2>
            <p style={{ fontSize: '13px', color: 'rgb(100 116 139)', margin: 0 }}>
              管理首页Hero轮播图内容，数据将实时同步到前台
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-secondary" onClick={handleReset}>
              重置默认
            </button>
            <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
              <Plus size={16} />
              新增轮播图
            </button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
          {items.map(item => (
            <div key={item.id} className="admin-card" style={{ border: '1px solid #e5e7eb' }}>
              <div style={{ position: 'relative', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
                <img src={item.imageUrl} alt={item.titlePart1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '4px' }}>
                  <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleOpenDialog(item)}>
                    <Edit2 size={14} />
                  </button>
                  <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item)}>
                    <Trash2 size={14} />
                  </button>
                </div>
                <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
                  <span style={{
                    padding: '4px 12px', borderRadius: '9999px', fontSize: '12px',
                    backgroundColor: item.is_active ? 'rgb(22 184 166)' : 'rgb(156 163 175)', color: 'white',
                  }}>{item.is_active ? '启用' : '禁用'}</span>
                </div>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0' }}>
                {item.titlePart1} <span style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{item.titlePart2}</span>
              </h3>
              <p style={{ fontSize: '13px', color: 'rgb(107 114 128)', margin: '0 0 8px 0', display: '-webkit-box', WebkitLineClamp: 2, overflow: 'hidden' }}>{item.subtitle}</p>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {(item.features || []).slice(0, 3).map((f, i) => (
                  <span key={i} style={{ padding: '2px 8px', borderRadius: '9999px', fontSize: '11px', backgroundColor: 'rgb(239 246 255)', color: 'rgb(59 130 246)' }}>{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <DataDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={editingItem ? '编辑轮播图' : '新增轮播图'}
        width="900px"
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>取消</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>保存</button>
          </>
        }
      >
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">标题第一部分 *</label>
            <input type="text" value={formData.titlePart1 || ''} onChange={(e) => setFormData({ ...formData, titlePart1: e.target.value })} className="admin-input" placeholder="例如：专注提分" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">标题第二部分 *</label>
            <input type="text" value={formData.titlePart2 || ''} onChange={(e) => setFormData({ ...formData, titlePart2: e.target.value })} className="admin-input" placeholder="例如：成就未来" />
          </div>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Badge 文字</label>
          <input type="text" value={formData.badgeText || ''} onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })} className="admin-input" placeholder="例如：做有温度的教育" />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">副标题</label>
          <textarea value={formData.subtitle || ''} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className="admin-input admin-textarea" rows={3} placeholder="描述文字" />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">特色标签</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            {(formData.features || []).map((f, i) => (
              <span key={i} style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '4px 10px', borderRadius: '9999px', fontSize: '13px',
                backgroundColor: 'rgb(239 246 255)', color: 'rgb(59 130 246)',
              }}>
                {f}
                <button style={{ border: 0, background: 0, cursor: 'pointer', color: 'rgb(148 163 184)' }} onClick={() => handleRemoveFeature(f)}>×</button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text" value={newFeature} onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddFeature()} className="admin-input"
              placeholder="输入特色标签后按回车" style={{ flex: 1 }}
            />
            <button className="admin-btn admin-btn-secondary" onClick={handleAddFeature}>添加</button>
          </div>
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">主按钮文字</label>
            <input type="text" value={formData.ctaPrimary || ''} onChange={(e) => setFormData({ ...formData, ctaPrimary: e.target.value })} className="admin-input" placeholder="例如：开始探索" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">副按钮文字</label>
            <input type="text" value={formData.ctaSecondary || ''} onChange={(e) => setFormData({ ...formData, ctaSecondary: e.target.value })} className="admin-input" placeholder="例如：免费测评" />
          </div>
        </div>
        <ImageUploader
          label="背景图片"
          value={formData.imageUrl || ''}
          onChange={(url) => setFormData({ ...formData, imageUrl: url })}
        />
        <div className="admin-form-group">
          <label className="admin-label">渐变背景</label>
          <select value={formData.gradient || 'from-blue-50 via-white to-violet-50/50'} onChange={(e) => setFormData({ ...formData, gradient: e.target.value })} className="admin-input">
            {gradients.map((g, i) => <option key={i} value={g}>{g}</option>)}
          </select>
        </div>

        <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '16px', paddingTop: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>浮动卡片设置</h3>
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">卡片1 - 标题</label>
              <input type="text" value={formData.floatCard1_title || ''} onChange={(e) => setFormData({ ...formData, floatCard1_title: e.target.value })} className="admin-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">卡片1 - 描述</label>
              <input type="text" value={formData.floatCard1_desc || ''} onChange={(e) => setFormData({ ...formData, floatCard1_desc: e.target.value })} className="admin-input" />
            </div>
          </div>
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">卡片1 - 图标</label>
              <select value={formData.floatCard1_icon || 'Brain'} onChange={(e) => setFormData({ ...formData, floatCard1_icon: e.target.value })} className="admin-input">
                {icons.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">卡片1 - 渐变</label>
              <select value={formData.floatCard1_gradient || 'from-blue-500 to-violet-500'} onChange={(e) => setFormData({ ...formData, floatCard1_gradient: e.target.value })} className="admin-input">
                {iconGradients.map((g, i) => <option key={i} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">卡片2 - 数值</label>
              <input type="text" value={formData.floatCard2_value || ''} onChange={(e) => setFormData({ ...formData, floatCard2_value: e.target.value })} className="admin-input" placeholder="例如：+2,580" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">卡片2 - 标签</label>
              <input type="text" value={formData.floatCard2_label || ''} onChange={(e) => setFormData({ ...formData, floatCard2_label: e.target.value })} className="admin-input" placeholder="例如：本周新学员" />
            </div>
          </div>
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">卡片3 - 数值</label>
              <input type="text" value={formData.floatCard3_value || ''} onChange={(e) => setFormData({ ...formData, floatCard3_value: e.target.value })} className="admin-input" placeholder="例如：+86分" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">卡片3 - 标签</label>
              <input type="text" value={formData.floatCard3_label || ''} onChange={(e) => setFormData({ ...formData, floatCard3_label: e.target.value })} className="admin-input" placeholder="例如：平均提分" />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">卡片3 - 渐变</label>
            <select value={formData.floatCard3_gradient || 'from-emerald-500 to-teal-500'} onChange={(e) => setFormData({ ...formData, floatCard3_gradient: e.target.value })} className="admin-input">
              {iconGradients.map((g, i) => <option key={i} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">卡片4 - 数值</label>
              <input type="text" value={formData.floatCard4_value || ''} onChange={(e) => setFormData({ ...formData, floatCard4_value: e.target.value })} className="admin-input" placeholder="例如：98%" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">卡片4 - 标签</label>
              <input type="text" value={formData.floatCard4_label || ''} onChange={(e) => setFormData({ ...formData, floatCard4_label: e.target.value })} className="admin-input" placeholder="例如：用户好评率" />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">卡片4 - 渐变</label>
            <select value={formData.floatCard4_gradient || 'from-amber-500 to-orange-500'} onChange={(e) => setFormData({ ...formData, floatCard4_gradient: e.target.value })} className="admin-input">
              {iconGradients.map((g, i) => <option key={i} value={g}>{g}</option>)}
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
