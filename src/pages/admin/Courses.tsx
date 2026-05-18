import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Star, Users, Clock, DollarSign, BookOpen } from 'lucide-react';
import { AdminCourse } from '../../types/admin';
import { courses as coursesData, teachers } from '../../data/coursesData';
import { useNotification } from '../../components/admin/Notification';
import Notification from '../../components/admin/Notification';
import DataDialog from '../../components/admin/DataDialog';

const subjectOptions = [
  { value: 'math', label: '数学' },
  { value: 'english', label: '英语' },
  { value: 'physics', label: '物理' },
  { value: 'chemistry', label: '化学' },
  { value: 'chinese', label: '语文' },
  { value: 'biology', label: '生物' },
  { value: 'history', label: '历史' },
  { value: 'geography', label: '地理' },
  { value: 'comprehensive', label: '综合' },
];

const gradeOptions = [
  { value: '高一', label: '高一', level: 10 },
  { value: '高二', label: '高二', level: 11 },
  { value: '高三', label: '高三', level: 12 },
];

export default function Courses() {
  const { notifications, showNotification, hideNotification } = useNotification();
  const [items, setItems] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminCourse | null>(null);
  const [formData, setFormData] = useState<Partial<AdminCourse>>({
    title: '',
    subtitle: '',
    subject: 'math',
    subject_name: '数学',
    grade: '高三',
    grade_level: 12,
    duration: '48小时',
    total_hours: 48,
    lesson_count: 32,
    price: 0,
    original_price: 0,
    is_discount: false,
    discount_rate: undefined,
    discount_end_date: undefined,
    description: '',
    objectives: [],
    syllabus: [],
    teacher_id: '',
    teacher_name: '',
    enrollment_count: 0,
    rating: 0,
    review_count: 0,
    is_hot: false,
    is_new: false,
    is_featured: false,
    tags: [],
    thumbnail_url: '',
    gradient: 'from-blue-500 to-cyan-500',
    start_date: undefined,
    is_active: true,
    sort_order: 0,
  });

  useEffect(() => {
    const adminCourses: AdminCourse[] = coursesData.map(course => ({
      id: course.id,
      title: course.title,
      subtitle: course.subtitle,
      subject: course.subject,
      subject_name: course.subjectName,
      grade: course.grade,
      grade_level: course.gradeLevel,
      duration: course.duration,
      total_hours: course.totalHours,
      lesson_count: course.lessonCount,
      price: course.price,
      original_price: course.originalPrice,
      is_discount: course.isDiscount,
      discount_rate: course.discountRate,
      discount_end_date: course.discountEndDate,
      description: course.description,
      objectives: course.objectives,
      syllabus: course.syllabus,
      teacher_id: course.teacher.id,
      teacher_name: course.teacher.name,
      enrollment_count: course.enrollmentCount,
      rating: course.rating,
      review_count: course.reviewCount,
      is_hot: course.isHot,
      is_new: course.isNew,
      is_featured: course.isFeatured,
      tags: course.tags,
      thumbnail_url: course.thumbnailUrl,
      gradient: course.gradient,
      start_date: course.startDate,
      is_active: true,
      sort_order: 0,
      created_at: new Date().toISOString(),
    }));
    setItems(adminCourses);
    setLoading(false);
  }, []);

  const handleOpenDialog = (item?: AdminCourse) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        subtitle: '',
        subject: 'math',
        subject_name: '数学',
        grade: '高三',
        grade_level: 12,
        duration: '48小时',
        total_hours: 48,
        lesson_count: 32,
        price: 0,
        original_price: 0,
        is_discount: false,
        description: '',
        objectives: [],
        syllabus: [],
        teacher_id: '',
        teacher_name: '',
        enrollment_count: 0,
        rating: 0,
        review_count: 0,
        is_hot: false,
        is_new: false,
        is_featured: false,
        tags: [],
        thumbnail_url: '',
        gradient: 'from-blue-500 to-cyan-500',
        is_active: true,
        sort_order: 0,
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
      setItems((prev) => prev.map((i) => (i.id === editingItem.id ? { ...i, ...formData } as AdminCourse : i)));
      showNotification('更新成功', 'success');
    } else {
      const newItem: AdminCourse = {
        id: `course_${Date.now()}`,
        ...formData,
        created_at: new Date().toISOString(),
      } as AdminCourse;
      setItems((prev) => [newItem, ...prev]);
      showNotification('创建成功', 'success');
    }

    setDialogOpen(false);
  };

  const handleDelete = async (item: AdminCourse) => {
    if (!confirm(`确定删除 "${item.title}"？`)) return;

    setItems((prev) => prev.filter((i) => i.id !== item.id));
    showNotification('删除成功', 'success');
  };

  const handleToggle = async (item: AdminCourse, field: string, value: boolean) => {
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, [field]: value } : i)));
  };

  const filteredItems = items.filter((item) => {
    const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.subtitle?.toLowerCase().includes(search.toLowerCase());
    const matchSubject = !subjectFilter || item.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  return (
    <div>
      <Notification notifications={notifications} onClose={hideNotification} />

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'rgb(15 23 42)' }}>
            课程管理
          </h2>
          <button className="admin-btn admin-btn-primary" onClick={() => handleOpenDialog()}>
            <Plus size={16} />
            新增课程
          </button>
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
              placeholder="搜索标题或副标题..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input"
              style={{ paddingLeft: '40px' }}
            />
          </div>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="admin-input admin-select"
            style={{ width: 'auto', minWidth: '150px' }}
          >
            <option value="">全部学科</option>
            {subjectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="admin-loading">加载中...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>课程</th>
                  <th style={{ width: '100px' }}>学科</th>
                  <th style={{ width: '100px' }}>价格</th>
                  <th style={{ width: '70px' }}>热门</th>
                  <th style={{ width: '70px' }}>新品</th>
                  <th style={{ width: '70px' }}>启用</th>
                  <th style={{ width: '100px' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '8px',
                            background: `linear-gradient(135deg, ${item.gradient.replace('from-', '').replace('to-', '')})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <BookOpen size={24} style={{ color: 'white' }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: '500', color: 'rgb(15 23 42)' }}>{item.title}</div>
                          <div
                            style={{
                              fontSize: '12px',
                              color: 'rgb(100 116 139)',
                              marginTop: '4px',
                            }}
                          >
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-primary">
                        {item.subject_name}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: '600', color: 'rgb(15 23 42)' }}>¥{item.price}</div>
                      {item.is_discount && item.original_price > item.price && (
                        <div style={{ fontSize: '12px', color: 'rgb(148 163 184)', textDecoration: 'line-through' }}>
                          ¥{item.original_price}
                        </div>
                      )}
                    </td>
                    <td>
                      <div
                        className={`admin-switch ${item.is_hot ? 'active' : ''}`}
                        onClick={() => handleToggle(item, 'is_hot', !item.is_hot)}
                      />
                    </td>
                    <td>
                      <div
                        className={`admin-switch ${item.is_new ? 'active' : ''}`}
                        onClick={() => handleToggle(item, 'is_new', !item.is_new)}
                      />
                    </td>
                    <td>
                      <div
                        className={`admin-switch ${item.is_active !== false ? 'active' : ''}`}
                        onClick={() => handleToggle(item, 'is_active', !item.is_active)}
                      />
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
                {search || subjectFilter ? '没有找到匹配的课程' : '暂无数据'}
              </div>
            )}
          </div>
        )}
      </div>

      <DataDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={editingItem ? '编辑课程' : '新增课程'}
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
          <label className="admin-label admin-label-required">课程标题</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="admin-input"
            placeholder="请输入课程标题"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">课程副标题</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="admin-input"
            placeholder="请输入课程副标题"
          />
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">学科</label>
            <select
              value={formData.subject}
              onChange={(e) => {
                const selected = subjectOptions.find(opt => opt.value === e.target.value);
                setFormData({ ...formData, subject: e.target.value, subject_name: selected?.label || e.target.value });
              }}
              className="admin-input admin-select"
            >
              {subjectOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">年级</label>
            <select
              value={formData.grade}
              onChange={(e) => {
                const selected = gradeOptions.find(opt => opt.label === e.target.value);
                setFormData({ ...formData, grade: e.target.value, grade_level: selected?.level || 12 });
              }}
              className="admin-input admin-select"
            >
              {gradeOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">价格</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
              className="admin-input"
              placeholder="0"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">原价</label>
            <input
              type="number"
              value={formData.original_price}
              onChange={(e) => setFormData({ ...formData, original_price: parseInt(e.target.value) || 0 })}
              className="admin-input"
              placeholder="0"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">课程描述</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="admin-input admin-textarea"
            placeholder="请输入课程描述"
            rows={4}
          />
        </div>

        <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              className={`admin-switch ${formData.is_discount ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, is_discount: !formData.is_discount })}
            />
            <span style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>打折</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              className={`admin-switch ${formData.is_hot ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, is_hot: !formData.is_hot })}
            />
            <span style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>热门</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              className={`admin-switch ${formData.is_new ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, is_new: !formData.is_new })}
            />
            <span style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>新品</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              className={`admin-switch ${formData.is_featured ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, is_featured: !formData.is_featured })}
            />
            <span style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>推荐</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              className={`admin-switch ${formData.is_active ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
            />
            <span style={{ fontSize: '14px', color: 'rgb(51 65 85)' }}>启用</span>
          </div>
        </div>
      </DataDialog>
    </div>
  );
}
