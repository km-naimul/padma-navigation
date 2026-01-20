'use client';

import { Users, Award, Briefcase, Building2, Target, Heart } from 'lucide-react';

export default function ManagementPage() {
  const managementTeam = [
    {
      name: 'Ali Asgor',
      position: 'Chief Executive Officer',
      description: 'Leading Padma Navigation Co. with strategic vision and extensive maritime expertise.',
      icon: Briefcase,
    },
    {
      name: 'Babul Ahmed',
      position: 'Operations Director',
      description: 'Expert in fleet management and ensuring smooth daily operations.',
      icon: Building2,
    },
    {
      name: 'Md Khalek',
      position: 'Operations Director',
      description: 'Dedicated to optimizing operational efficiency and service delivery.',
      icon: Building2,
    },
    {
      name: 'Md Akbar',
      position: 'Managing Director',
      description: 'Overseeing key business operations and strategic initiatives.',
      icon: Users,
    },
    {
      name: 'Md Nadim',
      position: 'Managing Director',
      description: 'Managing critical business functions and organizational development.',
      icon: Users,
    },
    {
      name: 'K M Nazrul Islam',
      position: 'Managing Director',
      description: 'Leading strategic planning and business growth initiatives.',
      icon: Users,
    },
    {
      name: 'Md Hossain',
      position: 'Safety & Compliance Director',
      description: 'Dedicated to maintaining the highest safety standards across all operations.',
      icon: Award,
    },
    {
      name: 'Hafeez Islam',
      position: 'Customer Relations Manager',
      description: 'Ensuring exceptional customer service and satisfaction.',
      icon: Heart,
    },
  ];

  const values = [
    {
      title: 'Safety First',
      description: 'We prioritize the safety and security of all our passengers above everything else.',
      icon: Award,
    },
    {
      title: 'Customer Focus',
      description: 'Your comfort and satisfaction are at the heart of everything we do.',
      icon: Heart,
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in service quality and operational efficiency.',
      icon: Target,
    },
    {
      title: 'Innovation',
      description: 'Continuously improving our services with modern technology and practices.',
      icon: Building2,
    },
  ];

  return (
    <div className="bg-[#f5f1e8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold mb-4 text-[#0a1929] tracking-tight">
            Our Management
          </h1>
          <p className="text-[#0a1929]/60 text-lg max-w-2xl mx-auto">
            Meet the experienced team leading Padma Navigation Co. towards excellence
          </p>
        </div>

        {/* Management Team */}
        <section className="mb-20">
          <h2 className="text-3xl font-display font-bold mb-8 text-[#0a1929] text-center">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {managementTeam.map((member, index) => {
              const Icon = member.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#e8e0d1]/20"
                >
                  <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-10 w-10 text-[#0a1929]" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2 text-[#0a1929]">
                    {member.name}
                  </h3>
                  <p className="text-[#d4af37] font-semibold mb-4">{member.position}</p>
                  <p className="text-[#0a1929]/70 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Company Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-display font-bold mb-8 text-[#0a1929] text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#e8e0d1]/20"
                >
                  <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941d] rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-[#0a1929]" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-[#0a1929]">
                    {value.title}
                  </h3>
                  <p className="text-[#0a1929]/70 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Company Overview */}
        <section className="bg-white rounded-xl shadow-lg p-12 border border-[#e8e0d1]/20">
          <h2 className="text-3xl font-display font-bold mb-6 text-[#0a1929] text-center">
            About Our Company
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-[#0a1929]/70 leading-relaxed">
            <p className="text-lg">
              Padma Navigation Co. has been a trusted name in the launch transportation industry for
              decades. Under the leadership of our experienced management team, we have built a
              reputation for safety, reliability, and exceptional customer service.
            </p>
            <p>
              Our management team brings together decades of combined experience in maritime
              operations, business management, and customer service. We are committed to maintaining
              the highest standards in all aspects of our operations, from fleet maintenance to
              passenger safety.
            </p>
            <p>
              With a focus on continuous improvement and innovation, our leadership team ensures that
              Padma Navigation Co. remains at the forefront of the industry, providing modern,
              comfortable, and safe transportation services to our valued customers.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
