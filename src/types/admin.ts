import { ReactNode } from 'react';

export interface AdminSession {
  adminId: string;
  username: string;
  name: string;
  role: 'super_admin' | 'teacher' | 'supervisor' | 'sales' | 'auditor';
  permissions: string[];
  loginTime: number;
}

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  name: string;
  role: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  width?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tag: string;
  read_time: string;
  image: string;
  is_hot: boolean;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at?: string;
}

export interface Partner {
  name: string;
  gradient: string;
  id?: string | number;
  is_active?: boolean;
  sort_order?: number;
}

export interface Testimonial {
  id: number | string;
  name: string;
  school: string;
  content: string;
  subject: string;
  rating: number;
  gradient: string;
  avatar: string;
  background_image?: string;
  score?: string;
  is_active?: boolean;
  sort_order?: number;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  avatar: string;
  background_image?: string;
  bio: string;
  specialties: string[];
  experience: string;
  courseCount: number;
  studentCount: number;
  rating: number;
  graduateSchool?: string;
  major?: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

export interface Student {
  id: string;
  name: string;
  school?: string;
  university?: string;
  major?: string;
  subject?: string;
  score_increase?: string;
  description?: string;
  avatar?: string;
  background_image?: string;
  status: 'published' | 'pending' | 'draft';
  is_active: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
  location?: string;
  image?: string;
  icon: 'trophy' | 'award' | 'target' | 'users';
  category: string;
  highlight: boolean;
  is_active: boolean;
  sort_order: number;
}

export interface QuickEntry {
  id: string;
  title: string;
  icon: string;
  link: string;
  description?: string;
  is_active: boolean;
  sort_order: number;
}

export interface University {
  id: string;
  name: string;
  code: string;
  category?: string;
  level?: string;
  location?: string;
  province?: string;
  city?: string;
  website?: string;
  logo?: string;
  tags?: string[];
  is_active: boolean;
  sort_order: number;
}

export interface Major {
  id: string;
  name: string;
  code: string;
  category?: string;
  degree?: string;
  duration?: number;
  requirements?: string;
  employment?: string;
  salary?: string;
  is_hot: boolean;
  is_active: boolean;
}

export interface CompanionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  is_active: boolean;
  sort_order: number;
}

export interface PartnerProgram {
  id: string;
  title: string;
  description: string;
  commission?: string;
  requirements?: string[];
  is_active: boolean;
}

export interface OemCase {
  id: string;
  partner_name: string;
  description: string;
  image?: string;
  link?: string;
  is_active: boolean;
  sort_order: number;
}

export interface StudyRoom {
  id: string;
  room_name: string;
  room_code: string;
  location: string;
  capacity?: number;
  facilities?: string[];
  opening_hours?: string;
  contact_person?: string;
  contact_phone?: string;
  contact_email?: string;
  features?: string[];
  is_featured: boolean;
}

export interface Message {
  id: string;
  name: string;
  phone: string;
  email?: string;
  content: string;
  is_read: boolean;
  replied_content?: string;
  created_at: string;
}

export interface AppDownload {
  id: string;
  platform: 'ios' | 'android' | 'windows' | 'mac';
  version?: string;
  download_url: string;
  qr_code?: string;
  is_active: boolean;
}

export interface SystemConfig {
  id: string;
  key: string;
  value: string;
  category: 'system' | 'ui' | 'api' | 'contact' | 'seo' | 'other';
  description?: string;
  data_type: 'string' | 'number' | 'boolean' | 'json';
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface CourseLesson {
  id: string;
  order: number;
  title: string;
  duration: string;
  description: string;
  is_free?: boolean;
}

export interface AdminCourse {
  id: string;
  title: string;
  subtitle: string;
  subject: 'math' | 'english' | 'physics' | 'chemistry' | 'chinese' | 'biology' | 'history' | 'geography' | 'comprehensive';
  subject_name: string;
  grade: string;
  grade_level: number;
  duration: string;
  total_hours: number;
  lesson_count: number;
  price: number;
  original_price: number;
  is_discount: boolean;
  discount_rate?: number;
  discount_end_date?: string;
  description: string;
  objectives: string[];
  syllabus: CourseLesson[];
  teacher_id: string;
  teacher_name: string;
  enrollment_count: number;
  rating: number;
  review_count: number;
  is_hot: boolean;
  is_new: boolean;
  is_featured: boolean;
  tags: string[];
  thumbnail_url?: string;
  gradient: string;
  start_date?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at?: string;
}

export interface AdminMaterial {
  id: string;
  title: string;
  category: 'math' | 'english' | 'physics' | 'chemistry' | 'chinese' | 'history' | 'geography' | 'biology';
  category_name: string;
  type: 'exam' | 'notes' | 'formula' | 'guide' | 'tool';
  type_name: string;
  description: string;
  file_size: string;
  download_count: number;
  view_count: number;
  rating: number;
  rating_count: number;
  is_hot: boolean;
  is_new: boolean;
  upload_date: string;
  author: string;
  tags: string[];
  gradient: string;
  preview_image?: string;
  download_url?: string;
  file_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at?: string;
}

export interface HeroSlide {
  id: string;
  badgeText: string;
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
  subtitle2?: string;
  features: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  gradient: string;
  imageUrl: string;
  is_active: boolean;
  sort_order: number;
  floatCard1_title: string;
  floatCard1_desc: string;
  floatCard1_icon: string;
  floatCard1_gradient: string;
  floatCard2_value: string;
  floatCard2_label: string;
  floatCard3_value: string;
  floatCard3_label: string;
  floatCard3_gradient: string;
  floatCard4_value: string;
  floatCard4_label: string;
  floatCard4_gradient: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
  gradient: string;
  description: string;
  is_active: boolean;
  sort_order: number;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  desc: string;
  link: string;
  gradient: string;
  highlight?: string;
  is_active: boolean;
  sort_order: number;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  desc: string;
  icon: string;
  gradient: string;
  is_active: boolean;
  sort_order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  gradient: string;
  is_active: boolean;
  sort_order: number;
}

export interface Value {
  id: string;
  icon: string;
  title: string;
  desc: string;
  gradient: string;
  is_active: boolean;
  sort_order: number;
}

export interface CompanyInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  email2?: string;
  website?: string;
  wechat?: string;
  qq?: string;
  weibo?: string;
  is_active: boolean;
}

export interface AppFeature {
  id: string;
  icon: string;
  title: string;
  desc: string;
  gradient: string;
  is_active: boolean;
  sort_order: number;
}

export interface AppDownloadInfo {
  id: string;
  platform: string;
  platform_name: string;
  download_url: string;
  qr_code?: string;
  is_active: boolean;
  sort_order: number;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  desc: string;
  icon: string;
  gradient: string;
  is_active: boolean;
  sort_order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  gradient: string;
  is_active: boolean;
  sort_order: number;
}

export interface Value {
  id: string;
  icon: string;
  title: string;
  desc: string;
  gradient: string;
  is_active: boolean;
  sort_order: number;
}

export interface CompanyInfo {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  about_title: string;
  about_desc1: string;
  about_desc2: string;
  about_image: string;
  phone: string;
  email: string;
  address: string;
}

export interface ExamPaper {
  id: string;
  userId: string;
  subject: string;
  title: string;
  description?: string;
  examDate: string;
  totalScore: number;
  userScore: number;
  images: string[];
  createdAt: number;
  updatedAt: number;
}

export interface ExamPaperAnalysis {
  id: string;
  paperId: string;
  overallScore: number;
  overallPercentage: number;
  knowledgePoints: {
    [key: string]: {
      name: string;
      totalQuestions: number;
      correctCount: number;
      score: number;
      mastery: 'excellent' | 'good' | 'medium' | 'needs_improvement';
    };
  };
  chapters: {
    [key: string]: {
      name: string;
      totalQuestions: number;
      correctCount: number;
      score: number;
    };
  };
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  createdAt: number;
}

export interface QuestionItem {
  id: string;
  questionNumber: string;
  knowledgePoint: string;
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
  score: number;
  userScore: number;
  isCorrect: boolean;
  userAnswer?: string;
  correctAnswer?: string;
  analysis?: string;
}
