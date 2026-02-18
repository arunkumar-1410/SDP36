
import { Link } from 'react-router-dom';
import { Heart, Brain, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react';

export const HomePage = () => {
  const features = [
    {
      icon: Brain,
      title: 'Mental Health Support',
      description: 'Access counseling, meditation guides, and stress management resources',
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
    {
      icon: Zap,
      title: 'Fitness Programs',
      description: 'Join group classes and home workout programs tailored to your level',
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
    {
      icon: Heart,
      title: 'Nutrition Advice',
      description: 'Learn balanced eating habits and get personalized nutrition guidance',
      color: 'text-rose-500',
      bg: 'bg-rose-50',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with peers in wellness programs and support groups',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
  ];

  const benefits = [
    'Free access to all wellness resources',
    'Expert-led programs and workshops',
    '24/7 mental health support services',
    'Track your wellness progress',
    'Join supportive communities',
    'Confidential and private',
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl font-extrabold mb-6 leading-tight">
                Your Wellness Journey Starts Here
              </h1>
              <p className="text-xl text-white/80 mb-10 leading-relaxed">
                Access mental health support, fitness programs, and nutrition advice in one unified platform designed for student success.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/resources"
                  className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-50 transition-colors duration-200 shadow-lg shadow-black/10"
                >
                  <span>Explore Resources</span>
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/programs"
                  className="border-2 border-white/60 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-200"
                >
                  View Programs
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="w-72 h-72 bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20">
                <Heart size={100} className="text-white/90" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Comprehensive wellness services designed to support every aspect of your health.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-5`}>
                  <feature.icon className={feature.color} size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-10">Why Choose HealthWell?</h2>
              <div className="flex flex-col gap-5">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={22} />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-secondary-100 rounded-3xl p-14 flex items-center justify-center">
              <div className="text-center">
                <Users size={72} className="text-primary-500 mb-5 mx-auto" />
                <p className="text-xl font-bold text-gray-900">Join hundreds of students</p>
                <p className="text-gray-500 mt-1">on their wellness journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4">Ready to Improve Your Well-being?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Start exploring our resources, join wellness programs, and connect with support today.
          </p>
          <Link
            to="/resources"
            className="inline-block bg-white text-primary-600 px-10 py-4 rounded-xl font-bold hover:bg-primary-50 transition-colors duration-200 shadow-lg shadow-black/10"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">HW</span>
                </div>
                <span className="font-bold text-white text-lg">HealthWell</span>
              </div>
              <p className="text-sm leading-relaxed">Student wellness platform for health and well-being.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Health Articles</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Support Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Wellness Tips</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Crisis Hotline: 1-800-HELP-NOW</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">counseling@university.edu</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Available 24/7</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 HealthWell. All rights reserved. | Your wellness is our priority.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
