import { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export const ManagePrograms = () => {
  const { programs, addProgram, updateProgram, deleteProgram } = useHealth();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    schedule: '',
    instructor: '',
    participants: 0,
    maxParticipants: 30,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      updateProgram(editingId, formData);
      setEditingId(null);
    } else {
      const newProgram = {
        id: Date.now().toString(),
        title: formData.title || '',
        description: formData.description || '',
        category: formData.category || '',
        duration: formData.duration || '',
        schedule: formData.schedule || '',
        instructor: formData.instructor || '',
        participants: formData.participants || 0,
        maxParticipants: formData.maxParticipants || 30,
      };
      addProgram(newProgram);
    }

    setFormData({
      title: '',
      description: '',
      category: '',
      duration: '',
      schedule: '',
      instructor: '',
      participants: 0,
      maxParticipants: 30,
    });
    setShowForm(false);
  };

  const handleEdit = (program) => {
    setFormData(program);
    setEditingId(program.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      duration: '',
      schedule: '',
      instructor: '',
      participants: 0,
      maxParticipants: 30,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Programs</h1>
            <p className="text-gray-400 text-sm mt-1">Keep your wellness programs up to date</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200 shadow-sm"
          >
            <Plus size={18} />
            <span>Add Program</span>
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? 'Edit Program' : 'Create New Program'}
              </h2>
              <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Instructor</label>
                  <input
                    type="text"
                    value={formData.instructor || ''}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Fitness, Mental Health"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., 6 weeks, 8 weeks"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Schedule</label>
                <input
                  type="text"
                  value={formData.schedule || ''}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Monday & Wednesday, 5:00 PM"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Participants</label>
                  <input
                    type="number"
                    value={formData.participants || 0}
                    onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Max Participants</label>
                  <input
                    type="number"
                    value={formData.maxParticipants || 30}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    min="1"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200"
                >
                  {editingId ? 'Update Program' : 'Create Program'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Programs List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{program.title}</h3>
                  <p className="text-sm text-gray-500">{program.instructor}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(program)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteProgram(program.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{program.description}</p>

              <div className="flex flex-col gap-1.5 text-sm text-gray-600 mb-4">
                <p><span className="font-semibold">Category:</span> {program.category}</p>
                <p><span className="font-semibold">Duration:</span> {program.duration}</p>
                <p><span className="font-semibold">Schedule:</span> {program.schedule}</p>
                <p><span className="font-semibold">Participants:</span> {program.participants}/{program.maxParticipants}</p>
              </div>

              <div className="bg-gray-100 rounded h-2">
                <div
                  className="bg-primary-500 h-2 rounded"
                  style={{ width: `${(program.participants / program.maxParticipants) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
