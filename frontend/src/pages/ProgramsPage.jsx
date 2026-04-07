import { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import { useAuth } from '@/context/AuthContext';
import { ProgramCard } from '@/components/ProgramCard';
import { Search } from 'lucide-react';

export const ProgramsPage = () => {
  const { programs, enrollments, enrollProgram } = useHealth();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrograms = programs.filter((program) =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = (programId) => {
    if (user) {
      enrollProgram(user.id, programId);
      alert('Successfully enrolled in the program!');
    }
  };

  const isEnrolled = (programId) => {
    return enrollments.some(
      (e) => e.userId === user?.id && e.programId === programId && e.status === 'active'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Programs</h1>
          <p className="text-gray-400">Find something that fits your schedule and interests</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Info Box */}
        {user?.role === 'student' && (
          <div className="mb-8 p-3.5 bg-sky-50 border border-sky-100 rounded-lg">
            <p className="text-sky-600 text-sm">
              Heads up — you can enroll directly from here. Spots fill up fast for popular ones.
            </p>
          </div>
        )}

        {/* Programs Grid */}
        {filteredPrograms.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onEnroll={user?.role === 'student' ? () => handleEnroll(program.id) : undefined}
                isEnrolled={isEnrolled(program.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No programs found matching your search.</p>
          </div>
        )}

        {/* Quick stats */}
        <div className="mt-14 grid sm:grid-cols-3 gap-6 bg-gray-100 p-8 rounded-xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 mb-0.5">{programs.length}+</div>
            <p className="text-gray-500 text-sm">Active programs</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 mb-0.5">100+</div>
            <p className="text-gray-500 text-sm">Students enrolled</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 mb-0.5">4+</div>
            <p className="text-gray-500 text-sm">Categories</p>
          </div>
        </div>
      </div>
    </div>
  );
};
