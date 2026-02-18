export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface HealthResource {
  id: string;
  title: string;
  description: string;
  category: 'mental-health' | 'fitness' | 'nutrition';
  content: string;
  image?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface WellnessProgram {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  schedule: string;
  participants: number;
  maxParticipants: number;
  instructor: string;
  image?: string;
}

export interface SupportService {
  id: string;
  name: string;
  description: string;
  type: 'hotline' | 'counseling' | 'chat' | 'resource';
  contact: string;
  availability: string;
}

export interface UsageMetric {
  resourceId: string;
  resourceTitle: string;
  views: number;
  engagements: number;
  category: string;
}

export interface ProgramEnrollment {
  userId: string;
  programId: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'dropped';
}
