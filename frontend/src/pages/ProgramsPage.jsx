import { useState, useEffect } from 'react';
import { useHealth } from '@/context/HealthContext';
import { useAuth } from '@/context/AuthContext';
import { Search, Calendar, User, ArrowRight, Bookmark, CheckCircle2 } from 'lucide-react';
import { CardSkeleton } from '@/components/Skeleton';
import { motion } from 'framer-motion';
import apiClient from '../api/client';

export const ProgramsPage = () => {
  const { programs, loading, enrollInProgram } = useHealth();
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [enrolledIds, setEnrolledIds] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserEnrollments();
    }
  }, [isAuthenticated]);

  const fetchUserEnrollments = async () => {
    try {
      const res = await apiClient.get('/api/user/dashboard');
      const ids = res.data.enrolledPrograms.map(p => p.id);
      setEnrolledIds(ids);
    } catch (err) {
      console.error('Error fetching enrollments', err);
    }
  };

  const filteredPrograms = programs.filter((program) =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = async (programId) => {
    if (!isAuthenticated) {
      alert('Please log in to enroll');
      return;
    }
    try {
      await enrollInProgram(programId);
      setEnrolledIds([...enrolledIds, programId]);
    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Health & Wellness Programs</h1>
            <p className="text-slate-500 text-lg max-w-xl">
              Professional-led sessions designed to help you balance your body and mind during your studies.
            </p>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search for meditation, yoga, nutrition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 bg-white transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Programs Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => <CardSkeleton key={n} />)}
          </div>
        ) : filteredPrograms.length > 0 ? (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program, i) => {
              const isEnrolled = enrolledIds.includes(program.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={program.id}
                  className="card-modern group"
                >
                  <div className="relative h-48 bg-slate-200 overflow-hidden">
                    <img 
                        src={`https://images.unsplash.com/photo-${i % 2 === 0 ? '1544367567-0f2fcb009e0b' : '1506126613408-eca07ce6826c'}?auto=format&fit=crop&q=80&w=600`} 
                        alt="program" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 z-20">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-xs font-bold text-slate-800 shadow-sm uppercase tracking-wider">
                          {program.category || 'Wellness'}
                        </span>
                      </div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{program.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">{program.description}</p>
                    
                    <div className="flex flex-col gap-3 mb-8">
                       <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                          <Calendar size={14} className="text-blue-500" />
                          <span>{program.duration || 'Flexible Timeline'}</span>
                       </div>
                       <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                          <User size={14} className="text-purple-500" />
                          <span>{program.instructor || 'Certified Coach'}</span>
                       </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                       <button 
                          onClick={() => handleEnroll(program.id)}
                          disabled={isEnrolled}
                          className={`flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl transition-all active:scale-95 ${
                            isEnrolled 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 italic' 
                            : 'bg-slate-900 text-white hover:bg-blue-600'
                          }`}
                        >
                          {isEnrolled ? (
                            <><CheckCircle2 size={14} /> Enrolled ✓</>
                          ) : (
                            <>Enroll Now <ArrowRight size={14} /></>
                          )}
                       </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-2">No programs match your search</h3>
            <p className="text-slate-500 max-w-xs mx-auto">Try different keywords or browse our standard categories above.</p>
          </div>
        )}
      </div>
    </div>
  );
};
