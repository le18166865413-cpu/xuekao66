import { useState } from 'react';
import { Plus, Edit2, Trash2, Star, User } from 'lucide-react';
import { Testimonial } from '../../types/admin';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';
import ImageUploader from '../../components/admin/ImageUploader';

const realTestimonials: Testimonial[] = [
  { id: 1, name: '张同学', school: '北京大学', content: '学考合一的课程让我从班级中游逆袭到年级前十，数学单科提升了40分。系统的学习方法和名师的指导让我找到了学习的方向。AI评测精准定位我的薄弱环节，真的太神奇了！', subject: '高考数学冲刺班', rating: 5, gradient: 'from-blue-500 to-cyan-500', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', score: '+40分', is_active: true },
  { id: 2, name: '李同学', school: '清华大学', content: '知识评测系统精准定位我的薄弱环节，针对性学习让效率翻倍。最终成功考入理想院校，感谢学考合一的专业服务。这里有名师、有方法、有坚持，强烈推荐！', subject: 'AI智能测评', rating: 5, gradient: 'from-violet-500 to-purple-500', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', score: '考入清华', is_active: true },
  { id: 3, name: '王同学', school: '复旦大学', content: '名师一对一辅导，英语从90分提升到135分。老师不仅传授知识，更教会了我学习的方法和思维方式。升学规划功能帮我找到了最适合的院校，真的很专业！', subject: '英语一对一辅导', rating: 5, gradient: 'from-orange-500 to-pink-500', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', score: '+45分', is_active: true },
  { id: 4, name: '陈同学', school: '浙江大学', content: '物理学渣到物理竞赛金牌，只用了半年时间！学考合一的老师真的很专业，不仅讲课生动有趣，还教会了我很多解题技巧。强烈推荐给学弟学妹们！', subject: '物理竞赛辅导', rating: 5, gradient: 'from-emerald-500 to-teal-500', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', score: '竞赛金牌', is_active: true },
  { id: 5, name: '刘同学', school: '上海交通大学', content: '免费资料库真的太实用了！历年高考真题、学霸笔记、模拟试卷应有尽有。化学从C提升到A，感谢学考合一提供的优质资源。', subject: '免费资料', rating: 5, gradient: 'from-amber-500 to-orange-500', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop', score: 'C→A', is_active: true },
  { id: 6, name: '赵同学', school: '南京大学', content: '每天的学习任务打卡让我养成了良好的学习习惯。升学规划功能根据我的兴趣和能力，推荐了最适合的专业方向。现在已经成为年级前十的学霸了！', subject: '升学规划', rating: 5, gradient: 'from-rose-500 to-red-500', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop', score: '年级前十', is_active: true },
  { id: 7, name: '孙同学', school: '武汉大学', content: '语文一直是我的弱项，学考合一的老师耐心指导，教会了我很多阅读理解的技巧。高考语文考了128分，是我从来没想过的成绩！', subject: '语文专项辅导', rating: 5, gradient: 'from-blue-500 to-violet-500', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop', score: '+35分', is_active: true },
  { id: 8, name: '周同学', school: '中山大学', content: '历史知识点太多太杂，自己复习完全抓不住重点。学考合一的历史课程帮我梳理了完整的时间线，高考历史拿了95分！', subject: '历史串讲', rating: 5, gradient: 'from-teal-500 to-cyan-500', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop', score: '+30分', is_active: true },
  { id: 9, name: '吴同学', school: '四川大学', content: '政治时事热点更新太快，自己根本跟不上。学考合一的老师每周都会整理最新的时政要点，让我高考政治拿了满分！', subject: '政治时政', rating: 5, gradient: 'from-indigo-500 to-blue-500', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', score: '满分', is_active: true },
  { id: 10, name: '郑同学', school: '中国科大', content: '生物遗传题一直是我的噩梦，学考合一的老师用生动的案例帮我理解抽象概念。现在做遗传题又快又准，生物成绩提升了一大截！', subject: '生物专项', rating: 5, gradient: 'from-emerald-500 to-teal-500', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop', score: '+38分', is_active: true },
];

const gradients = [
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-purple-500',
  'from-orange-500 to-pink-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-red-500',
  'from-blue-500 to-violet-500',
  'from-teal-500 to-cyan-500',
  'from-indigo-500 to-blue-500',
  'from-pink-500 to-rose-500',
];

export default function TestimonialsAdmin() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<Testimonial[]>(realTestimonials);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    school: '',
    content: '',
    subject: '',
    rating: 5,
    gradient: 'from-blue-500 to-cyan-500',
    avatar: '',
    background_image: '',
    score: '',
    is_active: true,
  });

  const handleOpenDialog = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        school: '',
        content: '',
        subject: '',
        rating: 5,
        gradient: 'from-blue-500 to-cyan-500',
        avatar: '',
        background_image: '',
        score: '',
        is_active: true,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.content) {
      showNotification('请填写姓名和评价内容', 'error');
      return;
    }

    if (editingItem) {
      setItems(prev => prev.map(i => (i.id === editingItem.id ? { ...i, ...formData } : i)));
      showNotification('更新成功', 'success');
    } else {
      const newItem: Testimonial = {
        id: Date.now(),
        ...formData,
      } as Testimonial;
      setItems(prev => [newItem, ...prev]);
      showNotification('创建成功', 'success');
    }
    setDialogOpen(false);
  };

  const handleDelete = (item: Testimonial) => {
    if (!confirm(`确定删除"${item.name}"的评价吗？`)) return;
    setItems(prev => prev.filter(i => i.id !== item.id));
    showNotification('删除成功', 'success');
  };

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />
      
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>学员评价</h2>
          <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
            <Plus size={16} />
            新增评价
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>学员</th>
                <th style={{ width: '40%' }}>评价内容</th>
                <th>评分</th>
                <th>提分</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                        <img src={item.avatar} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', color: 'rgb(15 23 42)' }}>{item.name}</div>
                        <div style={{ fontSize: '12px', color: 'rgb(100 116 139)' }}>{item.school}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>
                      {item.content.slice(0, 80)}{item.content.length > 80 ? '...' : ''}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star
                          key={i}
                          size={16}
                          style={{
                            color: i <= item.rating ? 'rgb(251 191 36)' : 'rgb(209 213 219)',
                            fill: i <= item.rating ? 'rgb(251 191 36)' : 'none',
                          }}
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    {item.score && (
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                        color: 'white',
                        fontWeight: '600',
                      }}>
                        {item.score}
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      backgroundColor: item.is_active ? 'rgb(22 184 166)' : 'rgb(156 163 175)',
                      color: 'white',
                    }}>
                      {item.is_active ? '启用' : '禁用'}
                    </span>
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
        title={editingItem ? '编辑评价' : '新增评价'}
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
            <label className="admin-label">学员姓名</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="admin-input"
              placeholder="请输入姓名"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">录取院校</label>
            <input
              type="text"
              value={formData.school || ''}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="admin-input"
              placeholder="例如：北京大学"
            />
          </div>
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">课程</label>
            <input
              type="text"
              value={formData.subject || ''}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="admin-input"
              placeholder="例如：高考数学冲刺班"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">提分/成绩</label>
            <input
              type="text"
              value={formData.score || ''}
              onChange={(e) => setFormData({ ...formData, score: e.target.value })}
              className="admin-input"
              placeholder="例如：+40分"
            />
          </div>
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">评分</label>
            <select
              value={formData.rating || 5}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="admin-input admin-select"
            >
              {[5, 4, 3, 2, 1].map(i => <option key={i} value={i}>{i}星</option>)}
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">渐变色</label>
            <select
              value={formData.gradient || 'from-blue-500 to-cyan-500'}
              onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
              className="admin-input admin-select"
            >
              {gradients.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
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
          <label className="admin-label">评价内容</label>
          <textarea
            value={formData.content || ''}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="admin-input admin-textarea"
            rows={5}
            placeholder="请输入评价内容"
          />
        </div>
      </DataDialog>
    </div>
  );
}
