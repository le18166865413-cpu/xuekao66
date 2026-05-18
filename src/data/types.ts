// 高考资讯类型定义
export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  summary: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
  viewCount: number;
  isHot: boolean;
  isFeatured: boolean;
  gradient: string;
}

// 免费资料类型定义
export interface Material {
  id: string;
  title: string;
  category: 'math' | 'english' | 'physics' | 'chemistry' | 'chinese' | 'history' | 'geography' | 'biology';
  categoryName: string;
  type: 'exam' | 'notes' | 'formula' | 'guide' | 'tool';
  typeName: string;
  description: string;
  fileSize: string;
  downloadCount: number;
  viewCount: number;
  rating: number;
  ratingCount: number;
  isHot: boolean;
  isNew: boolean;
  uploadDate: string;
  author: string;
  tags: string[];
  gradient: string;
  previewImage?: string;
  downloadUrl?: string;
}

// 课程类型定义
export interface Course {
  id: string;
  title: string;
  subtitle: string;
  subject: 'math' | 'english' | 'physics' | 'chemistry' | 'chinese' | 'biology' | 'history' | 'geography' | 'comprehensive';
  subjectName: string;
  grade: string;
  gradeLevel: number;
  duration: string;
  totalHours: number;
  lessonCount: number;
  price: number;
  originalPrice: number;
  isDiscount: boolean;
  discountRate?: number;
  discountEndDate?: string;
  description: string;
  objectives: string[];
  syllabus: CourseLesson[];
  teacher: Teacher;
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
  isHot: boolean;
  isNew: boolean;
  isFeatured: boolean;
  tags: string[];
  thumbnailUrl?: string;
  gradient: string;
  startDate?: string;
}

export interface CourseLesson {
  id: string;
  order: number;
  title: string;
  duration: string;
  description: string;
  isFree?: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  specialties: string[];
  experience: string;
  courseCount: number;
  studentCount: number;
  rating: number;
  graduateSchool?: string;
  major?: string;
}

// 分数线数据类型
export interface ScoreLine {
  id: string;
  year: number;
  province: string;
  provinceName: string;
  subjectType: 'science' | 'arts' | 'comprehensive';
  subjectTypeName: string;
  batch: string;
  batchName: string;
  score: number;
  lastYearScore: number;
  change: number;
}

// 考试时间安排类型
export interface ExamSchedule {
  id: string;
  year: number;
  province: string;
  provinceName: string;
  stages: ExamStage[];
}

export interface ExamStage {
  id: string;
  name: string;
  date: string;
  description: string;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  subject: string;
  startTime: string;
  endTime: string;
}
