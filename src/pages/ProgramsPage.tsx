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

  const handleEnroll = (programId: string) => {
    if (user) {
      enrollProgram(user.id, programId);
      alert('Successfully enrolled in the program!');
    }
  };

  const isEnrolled = (programId: string) => {
    return enrollments.some(
      (e) => e.userId === user?.id && e.programId === programId && e.status === 'active'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Wellness Programs</h1>
          <p className="text-lg text-gray-500">Join expert-led programs designed for student wellness and growth</p>
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
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-blue-700 text-sm">
              💡 <strong>Tip:</strong> Enroll in programs to join your peers and track your wellness progress!
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

        {/* Additional Info */}
        <div className="mt-16 grid sm:grid-cols-3 gap-8 bg-gradient-to-r from-primary-50 to-secondary-50 p-10 rounded-2xl">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-primary-600 mb-1">{programs.length}+</div>
            <p className="text-gray-800 font-semibold">Active Programs</p>
            <p className="text-gray-500 text-sm">Available for enrollment</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-secondary-600 mb-1">100+</div>
            <p className="text-gray-800 font-semibold">Active Members</p>
            <p className="text-gray-500 text-sm">Across all programs</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-primary-600 mb-1">4+</div>
            <p className="text-gray-800 font-semibold">Program Categories</p>
            <p className="text-gray-500 text-sm">From fitness to mental health</p>
          </div>
        </div>
      </div>
    </div>
  );
};
