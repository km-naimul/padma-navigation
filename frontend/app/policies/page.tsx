'use client';

import { Shield, FileText, Clock, Users, AlertCircle, CheckCircle } from 'lucide-react';

export default function PoliciesPage() {
  const policies = [
    {
      title: 'Safety Policy',
      icon: Shield,
      description:
        'We are committed to maintaining the highest safety standards. All our launches undergo regular safety inspections and our crew members are trained in emergency procedures.',
      points: [
        'Regular safety inspections and maintenance',
        'Certified and trained crew members',
        'Emergency response protocols',
        'Life-saving equipment on all launches',
        'Compliance with maritime safety regulations',
      ],
    },
    {
      title: 'Cancellation & Refund Policy',
      icon: FileText,
      description:
        'We understand that plans can change. Our cancellation and refund policy is designed to be fair and transparent.',
      points: [
        'Cancellations made 24 hours before departure: Full refund',
        'Cancellations made 12-24 hours before: 50% refund',
        'Cancellations made less than 12 hours before: No refund',
        'Refunds processed within 5-7 business days',
        'Contact our booking office for cancellations',
      ],
    },
    {
      title: 'Schedule & Punctuality Policy',
      icon: Clock,
      description:
        'We strive to maintain punctual schedules. However, weather conditions and other factors beyond our control may affect departure times.',
      points: [
        'Launches depart according to published schedules',
        'Passengers should arrive 30 minutes before departure',
        'Delays due to weather will be communicated promptly',
        'No refunds for missed departures',
        'Schedule changes will be notified in advance when possible',
      ],
    },
    {
      title: 'Passenger Rights & Responsibilities',
      icon: Users,
      description:
        'We respect passenger rights and expect passengers to follow safety guidelines and regulations.',
      points: [
        'Right to safe and comfortable travel',
        'Right to information about routes and schedules',
        'Responsibility to follow crew instructions',
        'Responsibility to maintain cleanliness',
        'Prohibited items: Weapons, illegal substances, hazardous materials',
      ],
    },
    {
      title: 'Luggage Policy',
      icon: FileText,
      description:
        'To ensure comfort and safety for all passengers, we have guidelines for luggage and personal belongings.',
      points: [
        'Each passenger allowed one piece of luggage (max 20kg)',
        'Additional luggage may incur extra charges',
        'Valuables should be kept with passengers',
        'Company not responsible for lost or damaged luggage',
        'Large items must be declared at booking',
      ],
    },
    {
      title: 'Terms & Conditions',
      icon: AlertCircle,
      description:
        'By booking with Padma Navigation Co., passengers agree to our terms and conditions.',
      points: [
        'Valid ID required for booking and travel',
        'Children under 5 travel free (one per adult)',
        'Pets allowed with prior approval and additional fee',
        'Company reserves right to refuse service',
        'All disputes subject to local jurisdiction',
      ],
    },
  ];

  return (
    <div className="bg-[#f5f1e8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold mb-4 text-[#0a1929] tracking-tight">
            Policies & Terms
          </h1>
          <p className="text-[#0a1929]/60 text-lg max-w-2xl mx-auto">
            Important information about our services, policies, and terms of use
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {policies.map((policy, index) => {
            const Icon = policy.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-[#e8e0d1]/20"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-xl p-4 flex-shrink-0">
                    <Icon className="h-8 w-8 text-[#0a1929]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold mb-2 text-[#0a1929]">
                      {policy.title}
                    </h2>
                    <p className="text-[#0a1929]/70 leading-relaxed mb-4">
                      {policy.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {policy.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                      <span className="text-[#0a1929]/70 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-br from-[#d4af37]/10 to-[#d4af37]/5 rounded-xl p-8 border border-[#d4af37]/20">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-8 w-8 text-[#d4af37] flex-shrink-0" />
            <div>
              <h3 className="text-xl font-display font-bold mb-3 text-[#0a1929]">
                Important Notice
              </h3>
              <p className="text-[#0a1929]/70 leading-relaxed mb-4">
                These policies are subject to change without prior notice. We recommend reviewing
                this page periodically for updates. For specific questions or clarifications about
                our policies, please contact our customer service team.
              </p>
              <p className="text-[#0a1929]/70 leading-relaxed">
                <strong className="text-[#0a1929]">Last Updated:</strong> {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-[#e8e0d1]/20 text-center">
          <h3 className="text-2xl font-display font-bold mb-4 text-[#0a1929]">
            Questions About Our Policies?
          </h3>
          <p className="text-[#0a1929]/70 mb-6">
            If you have any questions or need clarification about our policies, please don't
            hesitate to contact us.
          </p>
          <a
            href="/booking"
            className="inline-block bg-[#d4af37] text-[#0a1929] px-8 py-3 rounded-lg font-semibold hover:bg-[#b8941d] hover:shadow-lg transition-all duration-300 tracking-wide"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
