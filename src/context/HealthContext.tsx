import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { HealthResource, WellnessProgram, SupportService, UsageMetric, ProgramEnrollment } from '@/types';

interface HealthContextType {
  resources: HealthResource[];
  programs: WellnessProgram[];
  services: SupportService[];
  metrics: UsageMetric[];
  enrollments: ProgramEnrollment[];
  
  // Resource management
  addResource: (resource: HealthResource) => void;
  updateResource: (id: string, resource: Partial<HealthResource>) => void;
  deleteResource: (id: string) => void;
  
  // Program management
  addProgram: (program: WellnessProgram) => void;
  updateProgram: (id: string, program: Partial<WellnessProgram>) => void;
  deleteProgram: (id: string) => void;
  enrollProgram: (userId: string, programId: string) => void;
  
  // Services
  getServices: () => SupportService[];
  
  // Metrics
  getMetrics: () => UsageMetric[];
  recordView: (resourceId: string, resourceTitle: string) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

// Mock data
const mockResources: HealthResource[] = [
  {
    id: '1',
    title: 'Managing Stress in College',
    description: 'Learn effective techniques to manage stress during your academic journey',
    category: 'mental-health',
    content: 'Stress management is crucial for student well-being...',
    author: 'Dr. Sarah Johnson',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Introduction to Meditation',
    description: 'Start your meditation journey with basic techniques',
    category: 'mental-health',
    content: 'Meditation has been proven to reduce anxiety...',
    author: 'Prof. Michael Chen',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Nutrition Basics for Students',
    description: 'Balanced diet guide for optimal health and energy',
    category: 'nutrition',
    content: 'Good nutrition is the foundation of health...',
    author: 'Dr. Emily Davis',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Home Workout Guide',
    description: 'Easy exercises you can do in your dorm room',
    category: 'fitness',
    content: 'You don\'t need a gym to stay fit...',
    author: 'Coach James Wilson',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockPrograms: WellnessProgram[] = [
  {
    id: 'p1',
    title: 'Yoga for Beginners',
    description: 'A 6-week beginner-friendly yoga program',
    category: 'fitness',
    duration: '6 weeks',
    schedule: 'Monday & Wednesday, 5:00 PM',
    participants: 24,
    maxParticipants: 30,
    instructor: 'Emma Thompson',
  },
  {
    id: 'p2',
    title: 'Mindfulness Workshop',
    description: 'Learn mindfulness techniques for daily life',
    category: 'mental-health',
    duration: '4 weeks',
    schedule: 'Tuesday & Thursday, 6:30 PM',
    participants: 18,
    maxParticipants: 25,
    instructor: 'Dr. Alex Kumar',
  },
  {
    id: 'p3',
    title: 'Running Club',
    description: 'Weekly group running sessions for all levels',
    category: 'fitness',
    duration: 'Ongoing',
    schedule: 'Saturday, 7:00 AM',
    participants: 35,
    maxParticipants: 50,
    instructor: 'Coach Marcus',
  },
];

const mockServices: SupportService[] = [
  {
    id: 's1',
    name: 'Mental Health Counseling',
    description: '24/7 confidential counseling services for students',
    type: 'counseling',
    contact: 'counseling@university.edu | ext. 1234',
    availability: 'Monday-Friday 9AM-5PM, Emergency line 24/7',
  },
  {
    id: 's2',
    name: 'Crisis Hotline',
    description: 'Immediate support during mental health crises',
    type: 'hotline',
    contact: '1-800-HELP-NOW (1-800-435-7669)',
    availability: '24/7',
  },
  {
    id: 's3',
    name: 'Wellness Chat',
    description: 'Anonymous chat with wellness professionals',
    type: 'chat',
    contact: 'wellness.chat@university.edu',
    availability: 'Daily 10AM-10PM',
  },
  {
    id: 's4',
    name: 'Health Resources Library',
    description: 'Comprehensive collection of health articles and guides',
    type: 'resource',
    contact: 'healthlibrary.university.edu',
    availability: 'Always available online',
  },
];

export const HealthProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<HealthResource[]>(mockResources);
  const [programs, setPrograms] = useState<WellnessProgram[]>(mockPrograms);
  const [metrics, setMetrics] = useState<UsageMetric[]>([]);
  const [enrollments, setEnrollments] = useState<ProgramEnrollment[]>([]);

  const addResource = (resource: HealthResource) => {
    setResources([...resources, resource]);
  };

  const updateResource = (id: string, updates: Partial<HealthResource>) => {
    setResources(resources.map(r => r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r));
  };

  const deleteResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
  };

  const addProgram = (program: WellnessProgram) => {
    setPrograms([...programs, program]);
  };

  const updateProgram = (id: string, updates: Partial<WellnessProgram>) => {
    setPrograms(programs.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProgram = (id: string) => {
    setPrograms(programs.filter(p => p.id !== id));
  };

  const enrollProgram = (userId: string, programId: string) => {
    const enrollment: ProgramEnrollment = {
      userId,
      programId,
      enrolledAt: new Date().toISOString(),
      status: 'active',
    };
    setEnrollments([...enrollments, enrollment]);
    
    // Update participant count
    setPrograms(programs.map(p => 
      p.id === programId 
        ? { ...p, participants: p.participants + 1 }
        : p
    ));
  };

  const getServices = () => mockServices;

  const getMetrics = () => metrics;

  const recordView = (resourceId: string, resourceTitle: string) => {
    setMetrics(prev => {
      const existing = prev.find(m => m.resourceId === resourceId);
      if (existing) {
        return prev.map(m =>
          m.resourceId === resourceId
            ? { ...m, views: m.views + 1 }
            : m
        );
      }
      const resource = resources.find(r => r.id === resourceId);
      return [...prev, {
        resourceId,
        resourceTitle,
        views: 1,
        engagements: 0,
        category: resource?.category || 'other',
      }];
    });
  };

  return (
    <HealthContext.Provider
      value={{
        resources,
        programs,
        services: mockServices,
        metrics,
        enrollments,
        addResource,
        updateResource,
        deleteResource,
        addProgram,
        updateProgram,
        deleteProgram,
        enrollProgram,
        getServices,
        getMetrics,
        recordView,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within HealthProvider');
  }
  return context;
};
