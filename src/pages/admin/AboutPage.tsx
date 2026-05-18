import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Briefcase } from 'lucide-react';
import { Milestone, TeamMember, Value, CompanyInfo } from '../../types/admin';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';
import {
  getCompanyInfo,
  updateCompanyInfo,
  getMilestones,
  getMilestone,
  updateMilestone,
  createMilestone,
  deleteMilestone,
  getTeam,
  getTeamMember,
  updateTeamMember,
  createTeamMember,
  deleteTeamMember,
  getValues,
  getValue,
  updateValue,
  createValue,
  deleteValue,
} from '../../utils/aboutData';

export default function AboutPageAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [activeTab, setActiveTab] = useState<'company' | 'milestones' | 'team' | 'values'>('company');
  
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(getCompanyInfo());
  const [milestones, setMilestones] = useState<Milestone[]>(getMilestones());
  const [team, setTeam] = useState<TeamMember[]>(getTeam());
  const [values, setValues] = useState<Value[]>(getValues());

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const gradients = [
    'from-blue-500 to-cyan-500', 'from-violet-500 to-purple-500', 'from-emerald-500 to-teal-500',
    'from-amber-500 to-orange-500', 'from-rose-500 to-red-500', 'from-fuchsia-500 to-pink-500',
  ];

  const handleOpenDialog = (item?: any) => {
    if (item) {
      setCurrentItem(item);
      setFormData({ ...item });
    } else {
      setCurrentItem(null);
      const defaultSortOrder = activeTab === 'milestones' 
        ? milestones.length 
        : activeTab === 'team' 
          ? team.length 
          : values.length;
      setFormData({
        is_active: true,
        sort_order: defaultSortOrder,
        gradient: gradients[0],
      });
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (activeTab === 'company') {
      updateCompanyInfo(formData);
      setCompanyInfo(getCompanyInfo());
      showNotification('公司信息已更新', 'success');
    } else if (activeTab === 'milestones') {
      if (currentItem) {
        updateMilestone(currentItem.id, formData);
        showNotification('里程碑已更新', 'success');
      } else {
        createMilestone(formData);
        showNotification('里程碑已创建', 'success');
      }
      setMilestones(getMilestones());
    } else if (activeTab === 'team') {
      if (currentItem) {
        updateTeamMember(currentItem.id, formData);
        showNotification('团队成员已更新', 'success');
      } else {
        createTeamMember(formData);
        showNotification('团队成员已创建', 'success');
      }
      setTeam(getTeam());
    } else if (activeTab === 'values') {
      if (currentItem) {
        updateValue(currentItem.id, formData);
        showNotification('价值观已更新', 'success');
      } else {
        createValue(formData);
        showNotification('价值观已创建', 'success');
      }
      setValues(getValues());
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('确定要删除吗？')) return;
    
    if (activeTab === 'milestones') {
      deleteMilestone(id);
      setMilestones(getMilestones());
      showNotification('里程碑已删除', 'success');
    } else if (activeTab === 'team') {
      deleteTeamMember(id);
      setTeam(getTeam());
      showNotification('团队成员已删除', 'success');
    } else if (activeTab === 'values') {
      deleteValue(id);
      setValues(getValues());
      showNotification('价值观已删除', 'success');
    }
  };

  const renderCompanyTab = () => (
    <div className="admin-card">
      <div className="admin-card-header">
        <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>公司信息</h2>
        <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog(companyInfo)}>
          <Edit2 size={16} /> 编辑信息
        </button>
      </div>
      <div className="admin-form-group">
        <label className="admin-label">Hero 标题</label>
        <p style={{ fontSize: '14px', color: 'rgb(51 65 85)', margin: 0 }}>{companyInfo.hero_title}</p>
      </div>
      <div className="admin-form-group">
        <label className="admin-label">Hero 副标题</label>
        <p style={{ fontSize: '14px', color: 'rgb(51 65 85)', margin: 0 }}>{companyInfo.hero_subtitle}</p>
      </div>
      <div className="admin-form-group">
        <label className="admin-label">公司简介标题</label>
        <p style={{ fontSize: '14px', color: 'rgb(51 65 85)', margin: 0 }}>{companyInfo.about_title}</p>
      </div>
      <div className="admin-form-group">
        <label className="admin-label">公司简介 1</label>
        <p style={{ fontSize: '14px', color: 'rgb(51 65 85)', margin: 0 }}>{companyInfo.about_desc1}</p>
      </div>
      <div className="admin-form-group">
        <label className="admin-label">公司简介 2</label>
        <p style={{ fontSize: '14px', color: 'rgb(51 65 85)', margin: 0 }}>{companyInfo.about_desc2}</p>
      </div>
      <div className="admin-grid-3">
        <div className="admin-form-group">
          <label className="admin-label">联系电话</label>
          <p style={{ fontSize: '14px', color: 'rgb(51 65 85)', margin: 0 }}>{companyInfo.phone}</p>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">联系邮箱</label>
          <p style={{ fontSize: '14px', color: 'rgb(51 65 85)', margin: 0 }}>{companyInfo.email}</p>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">公司地址</label>
          <p style={{ fontSize: '14px', color: 'rgb(51 65 85)', margin: 0 }}>{companyInfo.address}</p>
        </div>
      </div>
    </div>
  );

  const renderMilestonesTab = () => (
    <div className="admin-card">
      <div className="admin-card-header">
        <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>发展历程</h2>
        <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
          <Plus size={16} /> 新增
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '16px' }}>
        {milestones.map(item => (
          <div key={item.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
              <div style={{ fontSize: '32px', marginRight: '12px' }}>{item.icon}</div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleOpenDialog(item)}>
                  <Edit2 size={14} />
                </button>
                <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', background: `linear-gradient(90deg, ${item.gradient.split(' ')[0].replace('from-', '#')}, ${item.gradient.split(' ')[2].replace('to-', '#')})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {item.year}
            </div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(15 23 42)', marginBottom: '4px' }}>{item.title}</div>
            <div style={{ fontSize: '13px', color: 'rgb(107 114 128)' }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTeamTab = () => (
    <div className="admin-card">
      <div className="admin-card-header">
        <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>核心团队</h2>
        <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
          <Plus size={16} /> 新增
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '16px' }}>
        {team.map(item => (
          <div key={item.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
              <img src={item.avatar} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '4px' }}>
                <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleOpenDialog(item)}>
                  <Edit2 size={14} />
                </button>
                <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: 'rgb(15 23 42)', marginBottom: '4px' }}>{item.name}</div>
              <div style={{ fontSize: '13px', background: `linear-gradient(90deg, ${item.gradient.split(' ')[0].replace('from-', '#')}, ${item.gradient.split(' ')[2].replace('to-', '#')})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '600', marginBottom: '8px' }}>
                {item.role}
              </div>
              <div style={{ fontSize: '13px', color: 'rgb(107 114 128)' }}>{item.bio}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderValuesTab = () => (
    <div className="admin-card">
      <div className="admin-card-header">
        <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>核心价值观</h2>
        <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
          <Plus size={16} /> 新增
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '16px' }}>
        {values.map(item => (
          <div key={item.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px', gap: '4px' }}>
              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleOpenDialog(item)}>
                <Edit2 size={14} />
              </button>
              <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item.id)}>
                <Trash2 size={14} />
              </button>
            </div>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `linear-gradient(135deg, ${item.gradient.split(' ')[0].replace('from-', '#')}, ${item.gradient.split(' ')[2].replace('to-', '#')})`, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <span style={{ fontSize: '32px' }}>
                {item.icon === 'Heart' ? '❤️' : item.icon === 'Star' ? '⭐' : item.icon === 'BookOpen' ? '📚' : '🤝'}
              </span>
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'rgb(15 23 42)', marginBottom: '8px' }}>{item.title}</div>
            <div style={{ fontSize: '13px', color: 'rgb(107 114 128)' }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDialogContent = () => {
    if (activeTab === 'company') {
      return (
        <>
          <div className="admin-form-group">
            <label className="admin-label">Hero 标题</label>
            <input 
              type="text" 
              className="admin-input" 
              value={formData.hero_title || ''} 
              onChange={e => setFormData({ ...formData, hero_title: e.target.value })} 
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Hero 副标题</label>
            <textarea 
              className="admin-input admin-textarea" 
              value={formData.hero_subtitle || ''} 
              onChange={e => setFormData({ ...formData, hero_subtitle: e.target.value })} 
            />
          </div>
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">公司简介标题</label>
              <input 
                type="text" 
                className="admin-input" 
                value={formData.about_title || ''} 
                onChange={e => setFormData({ ...formData, about_title: e.target.value })} 
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">公司图片</label>
              <input 
                type="text" 
                className="admin-input" 
                value={formData.about_image || ''} 
                onChange={e => setFormData({ ...formData, about_image: e.target.value })} 
              />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">公司简介 1</label>
            <textarea 
              className="admin-input admin-textarea" 
              value={formData.about_desc1 || ''} 
              onChange={e => setFormData({ ...formData, about_desc1: e.target.value })} 
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">公司简介 2</label>
            <textarea 
              className="admin-input admin-textarea" 
              value={formData.about_desc2 || ''} 
              onChange={e => setFormData({ ...formData, about_desc2: e.target.value })} 
            />
          </div>
          <div className="admin-grid-3">
            <div className="admin-form-group">
              <label className="admin-label">联系电话</label>
              <input 
                type="text" 
                className="admin-input" 
                value={formData.phone || ''} 
                onChange={e => setFormData({ ...formData, phone: e.target.value })} 
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">联系邮箱</label>
              <input 
                type="text" 
                className="admin-input" 
                value={formData.email || ''} 
                onChange={e => setFormData({ ...formData, email: e.target.value })} 
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">公司地址</label>
              <input 
                type="text" 
                className="admin-input" 
                value={formData.address || ''} 
                onChange={e => setFormData({ ...formData, address: e.target.value })} 
              />
            </div>
          </div>
        </>
      );
    } else if (activeTab === 'milestones') {
      return (
        <>
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">年份</label>
              <input 
                type="text" 
                className="admin-input" 
                value={formData.year || ''} 
                onChange={e => setFormData({ ...formData, year: e.target.value })} 
                placeholder="例如: 2024"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">图标</label>
              <input 
                type="text" 
                className="admin-input" 
                value={formData.icon || ''} 
                onChange={e => setFormData({ ...formData, icon: e.target.value })} 
                placeholder="例如: 🎯"
              />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">标题</label>
            <input 
              type="text" 
              className="admin-input" 
              value={formData.title || ''} 
              onChange={e => setFormData({ ...formData, title: e.target.value })} 
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">描述</label>
            <textarea 
              className="admin-input admin-textarea" 
              value={formData.desc || ''} 
              onChange={e => setFormData({ ...formData, desc: e.target.value })} 
            />
          </div>
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">渐变配色</label>
              <select 
                className="admin-input" 
                value={formData.gradient || gradients[0]} 
                onChange={e => setFormData({ ...formData, gradient: e.target.value })}
              >
                {gradients.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">排序</label>
              <input 
                type="number" 
                className="admin-input" 
                value={formData.sort_order || 0} 
                onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })} 
              />
            </div>
          </div>
          <div className="admin-form-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '36px', height: '20px', borderRadius: '9999px',
                backgroundColor: formData.is_active ? 'rgb(59 130 246)' : 'rgb(226 232 240)',
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
        </>
      );
    } else if (activeTab === 'team') {
      return (
        <>
          <div className="admin-form-group">
            <label className="admin-label">姓名</label>
            <input 
              type="text" 
              className="admin-input" 
              value={formData.name || ''} 
              onChange={e => setFormData({ ...formData, name: e.target.value })} 
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">职位</label>
            <input 
              type="text" 
              className="admin-input" 
              value={formData.role || ''} 
              onChange={e => setFormData({ ...formData, role: e.target.value })} 
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">头像 URL</label>
            <input 
              type="text" 
              className="admin-input" 
              value={formData.avatar || ''} 
              onChange={e => setFormData({ ...formData, avatar: e.target.value })} 
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">简介</label>
            <textarea 
              className="admin-input admin-textarea" 
              value={formData.bio || ''} 
              onChange={e => setFormData({ ...formData, bio: e.target.value })} 
            />
          </div>
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">渐变配色</label>
              <select 
                className="admin-input" 
                value={formData.gradient || gradients[0]} 
                onChange={e => setFormData({ ...formData, gradient: e.target.value })}
              >
                {gradients.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">排序</label>
              <input 
                type="number" 
                className="admin-input" 
                value={formData.sort_order || 0} 
                onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })} 
              />
            </div>
          </div>
          <div className="admin-form-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '36px', height: '20px', borderRadius: '9999px',
                backgroundColor: formData.is_active ? 'rgb(59 130 246)' : 'rgb(226 232 240)',
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
        </>
      );
    } else if (activeTab === 'values') {
      return (
        <>
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">图标</label>
              <select 
                className="admin-input" 
                value={formData.icon || 'Heart'} 
                onChange={e => setFormData({ ...formData, icon: e.target.value })}
              >
                <option value="Heart">❤️ 用心</option>
                <option value="Star">⭐ 卓越</option>
                <option value="BookOpen">📚 学习</option>
                <option value="Users">🤝 合作</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">渐变配色</label>
              <select 
                className="admin-input" 
                value={formData.gradient || gradients[0]} 
                onChange={e => setFormData({ ...formData, gradient: e.target.value })}
              >
                {gradients.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">标题</label>
            <input 
              type="text" 
              className="admin-input" 
              value={formData.title || ''} 
              onChange={e => setFormData({ ...formData, title: e.target.value })} 
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">描述</label>
            <textarea 
              className="admin-input admin-textarea" 
              value={formData.desc || ''} 
              onChange={e => setFormData({ ...formData, desc: e.target.value })} 
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">排序</label>
            <input 
              type="number" 
              className="admin-input" 
              value={formData.sort_order || 0} 
              onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })} 
            />
          </div>
          <div className="admin-form-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '36px', height: '20px', borderRadius: '9999px',
                backgroundColor: formData.is_active ? 'rgb(59 130 246)' : 'rgb(226 232 240)',
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
        </>
      );
    }
    return null;
  };

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { id: 'company', label: '公司信息' },
          { id: 'milestones', label: '发展历程' },
          { id: 'team', label: '核心团队' },
          { id: 'values', label: '核心价值观' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === tab.id ? 'linear-gradient(90deg, rgb(59 130 246), rgb(139 92 246))' : 'white',
              color: activeTab === tab.id ? 'white' : 'rgb(51 65 85)',
              boxShadow: activeTab === tab.id ? '0 4px 12px rgba(59,130,246,0.3)' : '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'company' && renderCompanyTab()}
      {activeTab === 'milestones' && renderMilestonesTab()}
      {activeTab === 'team' && renderTeamTab()}
      {activeTab === 'values' && renderValuesTab()}

      <DataDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={activeTab === 'company' ? '编辑公司信息' : (currentItem ? '编辑' : '新增')}
        footer={
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>取消</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSave}>保存</button>
          </div>
        }
      >
        {renderDialogContent()}
      </DataDialog>
    </div>
  );
}
