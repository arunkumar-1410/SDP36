import type { ReactNode } from 'react';
import type { SupportService } from '@/types';
import { Phone, MessageSquare, Headphones, FileText, Clock, Mail } from 'lucide-react';

interface ServiceCardProps {
  service: SupportService;
}

const serviceIcons: Record<string, ReactNode> = {
  hotline: <Phone size={28} />,
  counseling: <Headphones size={28} />,
  chat: <MessageSquare size={28} />,
  resource: <FileText size={28} />,
};

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group">
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 flex items-center justify-center">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-500 group-hover:scale-105 transition-transform duration-300">
          {serviceIcons[service.type] || <Phone size={28} />}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-gray-900 mb-1.5">{service.name}</h3>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">{service.description}</p>

        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4">
          <div className="flex items-start gap-3">
            <Mail size={15} className="text-primary-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-gray-600">Contact</p>
              <p className="text-sm text-gray-500">{service.contact}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock size={15} className="text-primary-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-gray-600">Availability</p>
              <p className="text-sm text-gray-500">{service.availability}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
