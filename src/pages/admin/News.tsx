import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Sparkles } from 'lucide-react';
import { newsArticles } from '../../data';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';

const categories = [
  '考试时间',
  '政策解读',
  '分数线',
  '志愿填报',
  '学习方法',
  '院校资讯',
  '备考指南'
];

const categoryMap: { [key: string]: string } = {
  'exam-schedule': '考试时间',
  'policy': '政策解读',
  'score-line': '分数线',
  'volunteer-guide': '志愿填报',
  'study-tips': '学习方法',
  'college-info': '院校资讯',
  'exam-guide': '备考指南'
};

const gradients = [
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-purple-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-red-500',
  'from-indigo-500 to-blue-500',
  'from-pink-500 to-rose-500',
  'from-teal-500 to-emerald-500'
];

interface FormData {
  title: string;
  summary: string;
  content: string;
  category: string;
  categoryName: string;
  tags: string[];
  readTime: string;
  author: string;
  date: string;
  viewCount: number;
  isHot: boolean;
  isFeatured: boolean;
  gradient: string;
}

export default function News() {
  const [items, setItems] = useState(newsArticles);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    summary: '',
    content: '',
    category: 'policy',
    categoryName: '政策解读',
    tags: [],
    readTime: '5分钟',
    author: '',
    date: new Date().toISOString().split('T')[0],
    viewCount: 0,
    isHot: false,
    isFeatured: false,
    gradient: 'from-blue-500 to-cyan-500',
  });
  const [newTagInput, setNewTagInput] = useState('');
  const { notifications, showNotification, hideNotification } = useNotification();

  const handleOpenDialog = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        summary: item.summary || '',
        content: item.content || '',
        category: item.category || '',
        categoryName: item.categoryName || '',
        tags: item.tags || [],
        readTime: item.readTime || '5分钟',
        author: item.author || '',
        date: item.date || '',
        viewCount: item.viewCount || 0,
        isHot: item.isHot || false,
        isFeatured: item.isFeatured || false,
        gradient: item.gradient || 'from-blue-500 to-cyan-500',
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        summary: '',
        content: '',
        category: 'policy',
        categoryName: '政策解读',
        tags: [],
        readTime: '5分钟',
        author: '',
        date: new Date().toISOString().split('T')[0],
        viewCount: 0,
        isHot: false,
        isFeatured: false,
        gradient: 'from-blue-500 to-cyan-500',
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      showNotification('请填写标题', 'error');
      return;
    }

    if (editingItem) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === editingItem.id
            ? {
                ...i,
                ...formData,
              }
            : i
        )
      );
      showNotification('更新成功', 'success');
    } else {
      const newItem = {
        id: `news-${Date.now()}`,
        ...formData,
      };
      setItems((prev) => [newItem, ...prev]);
      showNotification('创建成功', 'success');
    }

    setDialogOpen(false);
  };

  const handleDelete = (item: any) => {
    if (!confirm(`确定删除 "${item.title}"？`)) return;
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    showNotification('删除成功', 'success');
  };

  const handleAddTag = () => {
    if (newTagInput.trim() && !formData.tags.includes(newTagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTagInput.trim()] });
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const filteredItems = items.filter((item) => {
    const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !categoryFilter || categoryMap[item.category] === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>
            资讯管理
          </h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="admin-btn admin-btn-secondary" onClick={() => showNotification('AI生成功能待接入', 'info')}>
              <Sparkles size={16} />
              AI生成
            </button>
            <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
              <Plus size={16} />
              新增资讯
            </button>
          </div>
        </div>

        <div className="admin-filters">
          <div className="admin-search">
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgb(100 116 139)',
                zIndex: 1,
              }}
            />
            <input
              type="text"
              placeholder="搜索标题..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input"
              style={{ paddingLeft: '40px' }}
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="admin-input admin-select"
            style={{ width: 'auto', minWidth: '150px' }}
          >
            <option value="">全部分类</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '35%' }}>标题</th>
                <th style={{ width: '100px' }}>分类</th>
                <th style={{ width: '100px' }}>阅读量</th>
                <th style={{ width: '70px' }}>热门</th>
                <th style={{ width: '70px' }}>精选</th>
                <th style={{ width: '100px' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: '500', color: 'rgb(15 23 42)' }}>{item.title}</div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'rgb(100 116 139)',
                        marginTop: '4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.summary?.slice(0, 60)}
                      {item.summary?.length > 60 ? '...' : ''}
                    </div>
                  </td>
                  <td>
                    <span className="admin-badge admin-badge-success">
                      {item.categoryName || '-'}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>
                      {item.viewCount?.toLocaleString() || '0'}
                    </span>
                  </td>
                  <td>
                    <div
                      style={{
                        width: '36px',
                        height: '20px',
                        borderRadius: '9999px',
                        backgroundColor: item.isHot ? 'rgb(34 197 94)' : 'rgb(226 232 240)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '2px',
                        transition: '0.2s',
                      }}
                      onClick={() => setItems(prev => prev.map(i => i.id === item.id ? { ...i, isHot: !i.isHot } : i))}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        transform: item.isHot ? 'translateX(16px)' : 'translateX(0)',
                        transition: '0.2s',
                      }} />
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        width: '36px',
                        height: '20px',
                        borderRadius: '9999px',
                        backgroundColor: item.isFeatured ? 'rgb(34 197 94)' : 'rgb(226 232 240)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '2px',
                        transition: '0.2s',
                      }}
                      onClick={() => setItems(prev => prev.map(i => i.id === item.id ? { ...i, isFeatured: !i.isFeatured } : i))}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        transform: item.isFeatured ? 'translateX(16px)' : 'translateX(0)',
                        transition: '0.2s',
                      }} />
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        onClick={() => handleOpenDialog(item)}
                        title="编辑"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => handleDelete(item)}
                        title="删除"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredItems.length === 0 && (
            <div className="admin-empty">
              {search || categoryFilter ? '没有找到匹配的资讯' : '暂无数据'}
            </div>
          )}
        </div>
      </div>

      <DataDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={editingItem ? '编辑资讯' : '新增资讯'}
        width="700px"
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setDialogOpen(false)}>
              取消
            </button>
            <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>
              保存
            </button>
          </>
        }
      >
        <div className="admin-form-group">
          <label className="admin-label admin-label-required">标题</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="admin-input"
            placeholder="请输入资讯标题"
          />
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">分类</label>
            <select
              value={formData.categoryName}
              onChange={(e) => {
                const name = e.target.value;
                let key = 'policy';
                for (let [k, v] of Object.entries(categoryMap)) {
                  if (v === name) {
                    key = k;
                    break;
                  }
                }
                setFormData({ ...formData, category: key, categoryName: name });
              }}
              className="admin-input admin-select"
            >
              <option value="">请选择</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">作者</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="admin-input"
              placeholder="请输入作者"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">标签</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            {formData.tags.map(tag => (
              <span key={tag} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '13px',
                backgroundColor: 'rgb(239 246 255)',
                color: 'rgb(59 130 246)'
              }}>
                {tag}
                <button onClick={() => handleRemoveTag(tag)} style={{ border: 0, background: 0, cursor: 'pointer' }}>×</button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              className="admin-input"
              placeholder="输入标签名，按回车添加"
              style={{ flex: 1 }}
            />
            <button className="admin-btn admin-btn-secondary" onClick={handleAddTag}>添加</button>
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">摘要</label>
          <textarea
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            className="admin-input admin-textarea"
            placeholder="请输入资讯摘要"
            rows={3}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">内容</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="admin-input admin-textarea"
            placeholder="请输入资讯正文内容"
            rows={6}
            style={{ minHeight: '150px' }}
          />
        </div>

        <div className="admin-grid-3">
          <div className="admin-form-group">
            <label className="admin-label">阅读时间</label>
            <input
              type="text"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              className="admin-input"
              placeholder="如: 5分钟"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">发布日期</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">阅读量</label>
            <input
              type="number"
              value={formData.viewCount}
              onChange={(e) => setFormData({ ...formData, viewCount: parseInt(e.target.value) || 0 })}
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">渐变色</label>
            <select
              value={formData.gradient}
              onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
              className="admin-input admin-select"
            >
              {gradients.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '36px',
                height: '20px',
                borderRadius: '9999px',
                backgroundColor: formData.isHot ? 'rgb(34 197 94)' : 'rgb(226 232 240)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
                transition: '0.2s',
              }}
              onClick={() => setFormData({ ...formData, isHot: !formData.isHot })}
            >
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: 'white',
                transform: formData.isHot ? 'translateX(16px)' : 'translateX(0)',
                transition: '0.2s',
              }} />
            </div>
            <span style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>热门</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '36px',
                height: '20px',
                borderRadius: '9999px',
                backgroundColor: formData.isFeatured ? 'rgb(34 197 94)' : 'rgb(226 232 240)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
                transition: '0.2s',
              }}
              onClick={() => setFormData({ ...formData, isFeatured: !formData.isFeatured })}
            >
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: 'white',
                transform: formData.isFeatured ? 'translateX(16px)' : 'translateX(0)',
                transition: '0.2s',
              }} />
            </div>
            <span style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>精选</span>
          </div>
        </div>
      </DataDialog>
    </div>
  );
}
