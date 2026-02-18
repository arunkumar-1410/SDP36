import { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import type { HealthResource } from '@/types';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export const ManageResources = () => {
  const { resources, addResource, updateResource, deleteResource } = useHealth();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<HealthResource>>({
    title: '',
    description: '',
    category: 'mental-health',
    content: '',
    author: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateResource(editingId, formData);
      setEditingId(null);
    } else {
      const newResource: HealthResource = {
        id: Date.now().toString(),
        title: formData.title || '',
        description: formData.description || '',
        category: formData.category as HealthResource['category'],
        content: formData.content || '',
        author: formData.author || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addResource(newResource);
    }

    setFormData({
      title: '',
      description: '',
      category: 'mental-health',
      content: '',
      author: '',
    });
    setShowForm(false);
  };

  const handleEdit = (resource: HealthResource) => {
    setFormData(resource);
    setEditingId(resource.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      category: 'mental-health',
      content: '',
      author: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Manage Resources</h1>
            <p className="text-gray-500 mt-2">Create, edit, and manage health and wellness resources</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200 shadow-sm"
          >
            <Plus size={18} />
            <span>Add Resource</span>
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? 'Edit Resource' : 'Create New Resource'}
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author || ''}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category || 'mental-health'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="mental-health">Mental Health</option>
                  <option value="fitness">Fitness</option>
                  <option value="nutrition">Nutrition</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                <textarea
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200"
                >
                  {editingId ? 'Update Resource' : 'Create Resource'}
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

        {/* Resources List */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Author</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource) => (
                  <tr key={resource.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-800">{resource.title}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        resource.category === 'mental-health' ? 'bg-purple-100 text-purple-800' :
                        resource.category === 'fitness' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {resource.category.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{resource.author}</td>
                    <td className="px-6 py-4 text-gray-700">{new Date(resource.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(resource)}
                          className="text-primary-600 hover:text-primary-800 transition-colors duration-200"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteResource(resource.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
