import { useHealth } from '@/context/HealthContext';
import { BarChart3, TrendingUp, Users, FileText } from 'lucide-react';

const ChartBar = ({ label, value, maxValue }) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-semibold text-gray-700">{label}</span>
        <span className="text-gray-600">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export const AdminDashboard = () => {
  const { resources, programs, getMetrics } = useHealth();

  const allMetrics = getMetrics();
  
  // Calculate statistics
  const totalResources = resources.length;
  const totalPrograms = programs.length;
  const totalViews = allMetrics.reduce((sum, m) => sum + m.views, 0);
  const totalParticipants = programs.reduce((sum, p) => sum + p.participants, 0);

  // Get top resources
  const topResources = allMetrics
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // Category breakdown
  const categoryStats = {
    'mental-health': resources.filter(r => r.category === 'mental-health').length,
    'fitness': resources.filter(r => r.category === 'fitness').length,
    'nutrition': resources.filter(r => r.category === 'nutrition').length,
  };

  const stats = [
    { label: 'Total Resources', value: totalResources, icon: FileText, color: 'bg-blue-500' },
    { label: 'Active Programs', value: totalPrograms, icon: Users, color: 'bg-green-500' },
    { label: 'Total Views', value: totalViews, icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Program Participants', value: totalParticipants, icon: BarChart3, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
          <p className="text-gray-400 text-sm">Overview of platform activity and usage</p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 font-semibold text-sm">{stat.label}</h3>
                <div className={`${stat.color} p-2.5 rounded-xl`}>
                  <stat.icon size={18} className="text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resources by Category */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Resources by Category</h2>
            <div className="flex flex-col gap-4">
              <ChartBar label="Mental Health" value={categoryStats['mental-health']} maxValue={5} />
              <ChartBar label="Fitness" value={categoryStats['fitness']} maxValue={5} />
              <ChartBar label="Nutrition" value={categoryStats['nutrition']} maxValue={5} />
            </div>
          </div>

          {/* Top Resources */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Top Resources</h2>
            {topResources.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Resource</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topResources.map((resource, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-800">{resource.resourceTitle}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${
                            resource.category === 'mental-health' ? 'bg-purple-100 text-purple-800' :
                            resource.category === 'fitness' ? 'bg-green-100 text-green-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {resource.category.replace('-', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-800">{resource.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No metrics data available yet.</p>
            )}
          </div>
        </div>

        {/* Programs Overview */}
        <div className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Programs Overview</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.slice(0, 3).map((program) => (
              <div key={program.id} className="p-5 border border-gray-100 rounded-xl bg-gray-50">
                <h3 className="font-bold text-gray-900 mb-2">{program.title}</h3>
                <div className="flex flex-col gap-1.5 text-sm text-gray-500">
                  <p>Participants: <span className="font-semibold text-gray-800">{program.participants}/{program.maxParticipants}</span></p>
                  <p>Instructor: <span className="font-semibold text-gray-800">{program.instructor}</span></p>
                  <p>Schedule: <span className="font-semibold text-gray-800">{program.schedule}</span></p>
                </div>
                <div className="mt-3 bg-gray-100 rounded h-2">
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
    </div>
  );
};
