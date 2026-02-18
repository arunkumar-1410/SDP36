
import { useHealth } from '@/context/HealthContext';
import { ServiceCard } from '@/components/ServiceCard';

export const SupportPage = () => {
  const { getServices } = useHealth();
  const services = getServices();

  const emergencyServices = [
    {
      title: 'Mental Health Crisis',
      contact: '1-800-HELP-NOW (1-800-435-7669)',
      icon: '🆘',
    },
    {
      title: 'Campus Emergency',
      contact: 'Campus Security: ext. 5555',
      icon: '📞',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Support Services</h1>
          <p className="text-lg text-gray-500">Access professional help and resources when you need them most</p>
        </div>

        {/* Emergency Banner */}
        <div className="mb-12 p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
          <h2 className="text-2xl font-bold text-red-700 mb-4">⚠️ In Crisis? Get Help Now</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {emergencyServices.map((service, index) => (
              <div key={index} className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
                <p className="font-semibold text-red-800">{service.title}</p>
                <p className="text-lg font-bold text-red-600 mt-2">{service.contact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Available Services</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Additional Resources */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Can We Help?</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Counseling Services</h3>
              <ul className="flex flex-col gap-2.5 text-gray-600">
                <li>✓ Individual counseling sessions</li>
                <li>✓ Crisis intervention</li>
                <li>✓ Peer support groups</li>
                <li>✓ Referral services</li>
                <li>✓ Psychiatric services</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Wellness Resources</h3>
              <ul className="flex flex-col gap-2.5 text-gray-600">
                <li>✓ Mental health education</li>
                <li>✓ Stress management workshops</li>
                <li>✓ Nutrition consultations</li>
                <li>✓ Fitness programs</li>
                <li>✓ Wellness coaching</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Are counseling services confidential?</h3>
              <p className="text-gray-500 leading-relaxed">
                Yes, all counseling services are strictly confidential. Information is only shared with your consent unless there's a safety concern.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Do I need insurance to access services?</h3>
              <p className="text-gray-500 leading-relaxed">
                No, all students have access to university health services regardless of insurance status. Services are covered by student health fees.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">How do I schedule an appointment?</h3>
              <p className="text-gray-500 leading-relaxed">
                You can call our main office, visit in person during office hours, or use our online booking system. Crisis services are available 24/7.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Is there a cost for wellness programs?</h3>
              <p className="text-gray-500 leading-relaxed">
                No, all wellness programs are free for enrolled students. Registration may be required to manage class sizes.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
