import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const demoLogins = [
    { email: 'admin@university.edu', role: 'Admin' },
    { email: 'student@university.edu', role: 'Student' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
              <span className="text-white font-bold text-2xl">HW</span>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-2">HealthWell</h1>
          <p className="text-center text-gray-500 mb-8">Student Wellness Platform</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50"
                  placeholder="you@university.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 shadow-lg shadow-primary-500/20"
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>

          <div className="border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-500 mb-4 text-center font-semibold">Demo Accounts</p>
            <div className="flex flex-col gap-2.5">
              {demoLogins.map((demo) => (
                <button
                  key={demo.email}
                  onClick={() => {
                    setEmail(demo.email);
                    setPassword('demo');
                  }}
                  className="w-full text-left p-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-primary-200 transition-colors duration-200 text-sm"
                >
                  <p className="font-semibold text-gray-800">{demo.role}</p>
                  <p className="text-gray-500 mt-0.5">{demo.email}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
