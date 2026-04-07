
import { Link } from 'react-router-dom';
import { Heart, Brain, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react';

export const HomePage = () => {
  const features = [
    {
      icon: Brain,
      title: 'Mental Health',
      description: 'Talk to someone, try guided meditation, or learn how to handle stress better.',
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
    {
      icon: Zap,
      title: 'Stay Active',
      description: 'Group classes, solo workouts, or just a run around campus — find what works for you.',
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
    {
      icon: Heart,
      title: 'Eat Well',
      description: 'Practical nutrition tips that actually work on a student budget.',
      color: 'text-rose-500',
      bg: 'bg-rose-50',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'You\'re not in this alone. Join peer groups and meet people who get it.',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
  ];

  const benefits = [
    'Everything is free for students',
    'Programs run by actual professionals',
    'Mental health support available around the clock',
    'Track how you\'re doing over time',
    'Find your people in wellness groups',
    'Your data stays private, always',
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-600 via-blue-600 to-violet-600 text-white py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight tracking-tight">
                Take care of yourself.<br />
                <span className="text-white/70">We'll help.</span>
              </h1>
              <p className="text-lg text-white/75 mb-8 leading-relaxed max-w-lg">
                Mental health resources, fitness programs, nutrition guidance — all in one place, built for students like you.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/resources"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
                >
                  Browse Resources
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/programs"
                  className="border border-white/40 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors text-sm"
                >
                  See Programs
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/15">
                <Heart size={80} className="text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-20 bg-gray-50/80">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">What you'll find here</h2>
            <p className="text-gray-500 max-w-lg">Resources and programs to help you feel better, one step at a time.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className={`w-11 h-11 ${feature.bg} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className={feature.color} size={22} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1.5">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why HealthWell */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Why students use HealthWell</h2>
              <div className="flex flex-col gap-4">
                {benefits.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-sky-50 to-violet-50 rounded-2xl p-12 flex items-center justify-center">
              <div className="text-center">
                <Users size={60} className="text-sky-500 mb-4 mx-auto" />
                <p className="text-lg font-bold text-gray-800">Hundreds of students</p>
                <p className="text-gray-400 text-sm mt-1">are already on their wellness journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-sky-600 to-violet-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Explore resources, sign up for programs, or just see what's out there. No pressure.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/resources"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
            >
              Explore Now
            </Link>
            <Link
              to="/signup"
              className="border border-white/40 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors text-sm"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">HW</span>
                </div>
                <span className="font-semibold text-white">HealthWell</span>
              </div>
              <p className="text-sm leading-relaxed">Helping students take better care of themselves, one day at a time.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3 text-sm">Resources</h4>
              <ul className="flex flex-col gap-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Health Articles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Wellness Tips</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3 text-sm">Quick Links</h4>
              <ul className="flex flex-col gap-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3 text-sm">Need Help?</h4>
              <ul className="flex flex-col gap-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Crisis Line: 1-800-HELP-NOW</a></li>
                <li><a href="#" className="hover:text-white transition-colors">counseling@university.edu</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Available 24/7</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
            <p>&copy; 2026 HealthWell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
