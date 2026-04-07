import { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import { useAuth } from '@/context/AuthContext';
import { Search, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { CardSkeleton } from '@/components/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';

export const ResourcesPage = () => {
  const { resources, loading, logResourceAccess } = useHealth();
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { value: 'mental-health', label: 'Mental Health' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'nutrition', label: 'Nutrition' },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleResourceClick = async (resourceId) => {
    if (isAuthenticated) {
      await logResourceAccess(resourceId);
    }
    // Logic to open resource (e.g. navigate to detail or open link)
    console.log('Accessed resource:', resourceId);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            Wellness Library
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg"
          >
            Explore our curated collection of articles, guides, and professional advice.
          </motion.p>
        </div>

        {/* Search and Filter Controls */}
        <div className="glass p-6 rounded-[2.5rem] mb-12 flex flex-col lg:flex-row gap-6 items-center shadow-lg shadow-blue-100">
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-4 top-4 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search library..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/5 bg-slate-50 transition-all font-medium"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => <CardSkeleton key={n} />)}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredResources.length > 0 ? (
              <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {filteredResources.map((resource, i) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={resource.id}
                    onClick={() => handleResourceClick(resource.id)}
                    className="card-modern group p-0 cursor-pointer overflow-hidden"
                  >
                    <div className="h-48 bg-slate-100 relative">
                       <img 
                          src={`https://images.unsplash.com/photo-${resource.category === 'fitness' ? '1517836357463-d25dfeac3438' : '1506126613408-eca07ce6826c'}?auto=format&fit=crop&q=80&w=600`}
                          alt="preview"
                          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                       />
                       <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-blue-600">
                             {resource.category || 'General'}
                          </span>
                       </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4 text-xs font-bold text-slate-400">
                         <Clock size={14} />
                         <span>{new Date(resource.createdAt || new Date()).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                        {resource.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                        Read Full Article <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No matching resources</h3>
                <p className="text-slate-500">Try broadening your search.</p>
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
