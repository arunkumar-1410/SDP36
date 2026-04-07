import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError('Please fill in both fields to continue.');
        return;
      }

      await login(email, password);
      navigate('/');
    } catch (_err) {
      setError('Hmm, that didn\'t work. Double-check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const demoLogins = [
    { email: 'admin@university.edu', role: 'Admin', hint: 'Full dashboard access' },
    { email: 'student@university.edu', role: 'Student', hint: 'Browse & enroll in programs' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-7 sm:p-8">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-violet-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">HW</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">Welcome back</h1>
          <p className="text-center text-gray-400 text-sm mb-7">Log in to your HealthWell account</p>

          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-300" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-gray-50 text-sm"
                  placeholder="you@university.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-300" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-gray-50 text-sm"
                  placeholder="Your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-300 hover:text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-500 to-violet-500 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 mt-1 text-sm"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mb-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-sky-500 font-medium hover:underline">
              Sign up
            </Link>
          </p>

          <div className="border-t border-gray-100 pt-5">
            <p className="text-xs text-gray-400 mb-3 text-center uppercase tracking-wide">Try a demo account</p>
            <div className="flex flex-col gap-2">
              {demoLogins.map((demo) => (
                <button
                  key={demo.email}
                  onClick={() => {
                    setEmail(demo.email);
                    setPassword('demo');
                  }}
                  className="w-full text-left p-3 border border-gray-100 rounded-lg hover:bg-gray-50 hover:border-sky-200 transition-colors text-sm group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{demo.role}</span>
                    <span className="text-xs text-gray-300 group-hover:text-sky-400">{demo.hint}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">{demo.email}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
