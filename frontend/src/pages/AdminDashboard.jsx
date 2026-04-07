import { useEffect, useState } from 'react';
import apiClient from '../api/client';
import { Users, Layout, FileText, TrendingUp, Bookmark, Calendar, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const [sRes, uRes] = await Promise.all([
                apiClient.get('/api/admin/stats'),
                apiClient.get('/api/admin/users')
            ]);
            setStats(sRes.data);
            setUsers(uRes.data);
        } catch (err) {
            console.error('Admin data fetch error', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Admin Control Center</h1>
                    <p className="text-slate-500 font-medium">Platform-wide statistics and user management</p>
                </div>

                {/* Stats Section */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <StatCard icon={Users} label="Total Users" value={stats?.totalUsers} color="bg-blue-500" />
                    <StatCard icon={Layout} label="Total Programs" value={stats?.totalPrograms} color="bg-indigo-500" />
                    <StatCard icon={FileText} label="Total Resources" value={stats?.totalResources} color="bg-emerald-500" />
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                     <BestPerformer 
                        label="Most Enrolled Program" 
                        title={stats?.mostEnrolledProgram?.title} 
                        count={stats?.mostEnrolledProgram?.enrollmentCount} 
                        suffix="Enrollments"
                        icon={TrendingUp}
                        color="text-indigo-600"
                        bg="bg-indigo-50"
                     />
                     <BestPerformer 
                        label="Most Accessed Resource" 
                        title={stats?.mostAccessedResource?.title} 
                        count={stats?.mostAccessedResource?.accessCount} 
                        suffix="Views"
                        icon={Bookmark}
                        color="text-emerald-600"
                        bg="bg-emerald-50"
                     />
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                        <h2 className="text-xl font-black text-slate-900">User Management</h2>
                        <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-xs font-black uppercase tracking-widest">
                            {users?.length} Registered
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Name</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Role</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Programs</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Resources</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {users.map(u => (
                                    <tr key={u.id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-8 py-5 font-bold text-slate-900">{u.name}</td>
                                        <td className="px-8 py-5 text-sm text-slate-500">{u.email}</td>
                                        <td className="px-8 py-5">
                                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                                u.role === 'admin' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                                            }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-center font-bold text-slate-700">{u.totalEnrolled}</td>
                                        <td className="px-8 py-5 text-center font-bold text-slate-700">{u.totalResourcesAccessed}</td>
                                        <td className="px-8 py-5 text-right">
                                            <button 
                                                onClick={() => setSelectedUser(u)}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-100 active:scale-95"
                                            >
                                                <Eye size={14} /> View History
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* History Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-4xl max-h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">{selectedUser.name}'s Journey</h2>
                                    <p className="text-sm text-slate-400 font-medium">{selectedUser.email}</p>
                                </div>
                                <button onClick={() => setSelectedUser(null)} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all">
                                    <X size={24} />
                                </button>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-8 grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                        <Calendar size={16} className="text-indigo-500" /> Enrolled Programs
                                    </h4>
                                    <div className="space-y-3">
                                        {selectedUser.enrolledPrograms.length > 0 ? (
                                            selectedUser.enrolledPrograms.map((p, i) => (
                                                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                    <p className="font-bold text-slate-900 text-sm">{p.title}</p>
                                                    <p className="text-[10px] text-slate-400 font-black mt-1 uppercase">Enrolled: {new Date(p.enrolledAt).toLocaleDateString()}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-slate-400 italic">No programs enrolled.</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                        <Bookmark size={16} className="text-emerald-500" /> Resource Access
                                    </h4>
                                    <div className="space-y-3">
                                        {selectedUser.resourceHistory.length > 0 ? (
                                            selectedUser.resourceHistory.map((h, i) => (
                                                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                    <p className="font-bold text-slate-900 text-sm">{h.title}</p>
                                                    <p className="text-[10px] text-slate-400 font-black mt-1 uppercase">Accessed: {new Date(h.accessedAt).toLocaleDateString()}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-slate-400 italic">No resource history.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
        <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-3xl font-black text-slate-900">{value}</p>
        </div>
    </div>
);

const BestPerformer = ({ label, title, count, suffix, icon: Icon, color, bg }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</span>
            <div className={`p-2 ${bg} ${color} rounded-xl`}>
                <Icon size={20} />
            </div>
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2 truncate">{title || 'N/A'}</h3>
        <p className="text-slate-500 font-bold text-sm">
            <span className={color}>{count || 0}</span> {suffix}
        </p>
    </div>
);
