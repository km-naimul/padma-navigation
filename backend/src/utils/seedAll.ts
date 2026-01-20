import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import User from '../models/User';
import Launch from '../models/Launch';
import Route from '../models/Route';
import Ghat from '../models/Ghat';
import Management from '../models/Management';
import Policy from '../models/Policy';

dotenv.config();

const seedAll = async (): Promise<void> => {
  try {
    await connectDatabase();
    console.log('Starting database seeding...\n');

    // Seed Admin User
    const existingAdmin = await User.findOne({ email: 'admin@padmanavigation.com' });
    if (!existingAdmin) {
      await User.create({
        username: 'admin',
        email: 'admin@padmanavigation.com',
        password: 'admin123',
        role: 'superadmin',
      });
      console.log('✓ Admin user created');
    } else {
      console.log('✓ Admin user already exists');
    }

    // Seed Ghats (must be seeded first as they're referenced by routes)
    const ghatsData = [
      {
        name: 'Sadarghat Terminal',
        location: 'Dhaka',
        address: 'Sadarghat, Old Dhaka',
        coordinates: { lat: 23.7104, lng: 90.4074 },
        facilities: ['Parking', 'Waiting Area', 'Ticket Counter', 'Restaurant'],
      },
      {
        name: 'Chandpur Ghat',
        location: 'Chandpur',
        address: 'Chandpur Launch Terminal',
        coordinates: { lat: 23.2228, lng: 90.6506 },
        facilities: ['Parking', 'Waiting Area', 'Ticket Counter'],
      },
      {
        name: 'Elisha Ghat',
        location: 'Bhola',
        address: 'Elisha Launch Terminal',
        facilities: ['Parking', 'Ticket Counter'],
      },
      {
        name: 'Patuakhali Terminal',
        location: 'Patuakhali',
        address: 'Patuakhali Launch Terminal',
        facilities: ['Parking', 'Waiting Area', 'Ticket Counter'],
      },
      {
        name: 'Wise Ghat Terminal',
        location: 'Dhaka',
        address: 'Wise Ghat, Old Dhaka',
        facilities: ['Parking', 'Waiting Area', 'Ticket Counter', 'Restaurant'],
      },
      {
        name: 'Chormontaj Ghat',
        location: 'Bhola',
        address: 'Chormontaj Launch Terminal',
        facilities: ['Waiting Area'],
      },
      {
        name: 'Khepupara Ghat',
        location: 'Patuakhali',
        address: 'Khepupara Launch Terminal',
        facilities: ['Parking', 'Ticket Counter'],
      },
    ];

    const createdGhats: mongoose.Types.ObjectId[] = [];
    for (const ghatData of ghatsData) {
      const existingGhat = await Ghat.findOne({ name: ghatData.name });
      if (!existingGhat) {
        const ghat = await Ghat.create(ghatData);
        createdGhats.push(ghat._id);
        console.log(`✓ Created ghat: ${ghatData.name}`);
      } else {
        createdGhats.push(existingGhat._id);
        console.log(`✓ Ghat already exists: ${ghatData.name}`);
      }
    }

    // Seed Launches
    const launchesData = [
      {
        name: 'M. V. Pubali-12',
        capacity: 600,
        facilities: ['AC', 'Coffee House', 'Intercom', 'Tv', 'VIP Room'],
        contactNumber: '01752-822996',
        alternateContact: '01977-116926',
        status: 'active' as const,
        imageUrl: '/pubali12.png',
        description: 'Comfortable journey with premium facilities. Well-maintained launch for your convenience.',
        routeIds: [], // Will be updated after routes are created
      },
      {
        name: 'M. V. Pubali-9',
        capacity: 350,
        facilities: ['Tv', 'Canteen'],
        contactNumber: '01703-559788',
        status: 'active' as const,
        imageUrl: '/pubali9.png',
        description: "It's a long journey where you can enjoy the beauty of nature.",
        routeIds: [],
      },
      {
        name: 'M. V. Pubali-6',
        capacity: 400,
        facilities: ['AC', 'Tv', 'Canteen'],
        contactNumber: '01731-833285',
        status: 'active' as const,
        imageUrl: '/pubali6.png',
        description: 'Premium experience for your journey. Go on a trip to Kuakata Sea Beach on this launch.',
        routeIds: [],
      },
      {
        name: 'M. V. Pubali-5',
        capacity: 450,
        facilities: ['AC', 'Tv', 'Canteen', 'VIP Room'],
        contactNumber: '01749-379838',
        alternateContact: '01787-052777',
        status: 'active' as const,
        imageUrl: '/pubali5.png',
        description: 'Comfortable journey with premium facilities. Well-maintained launch for your convenience.',
        routeIds: [],
      },
    ];

    const createdLaunches: mongoose.Types.ObjectId[] = [];
    for (const launchData of launchesData) {
      const existingLaunch = await Launch.findOne({ name: launchData.name });
      if (!existingLaunch) {
        const launch = await Launch.create(launchData);
        createdLaunches.push(launch._id);
        console.log(`✓ Created launch: ${launchData.name}`);
      } else {
        createdLaunches.push(existingLaunch._id);
        console.log(`✓ Launch already exists: ${launchData.name}`);
      }
    }

    // Seed Routes with proper schedules
    // Pubali-12 routes (index 0)
    const routesData = [
      {
        name: 'Dhaka to Patuakhali',
        launchIds: [createdLaunches[0]], // Pubali-12
        schedules: [
          {
            launchId: createdLaunches[0],
            departureTime: '20:00',
            arrivalTime: '06:00',
            daysOfWeek: ['Daily'],
            ghatIds: [createdGhats[0], createdGhats[1], createdGhats[2], createdGhats[3], createdGhats[4], createdGhats[6]], // 6 stops
          },
        ],
        distance: '271 km',
        estimatedDuration: '10-12 hours',
      },
      {
        name: 'Patuakhali to Dhaka',
        launchIds: [createdLaunches[0]], // Pubali-12
        schedules: [
          {
            launchId: createdLaunches[0],
            departureTime: '18:00',
            arrivalTime: '04:00',
            daysOfWeek: ['Daily'],
            ghatIds: [createdGhats[0], createdGhats[1], createdGhats[2], createdGhats[3], createdGhats[4], createdGhats[6]], // 6 stops
          },
        ],
        distance: '271 km',
        estimatedDuration: '10-12 hours',
      },
      // Pubali-9 routes (index 1)
      {
        name: 'Dhaka to Chormontaj',
        launchIds: [createdLaunches[1]], // Pubali-9
        schedules: [
          {
            launchId: createdLaunches[1],
            departureTime: '19:00',
            arrivalTime: '09:00',
            daysOfWeek: ['Daily'],
            ghatIds: [createdGhats[0], createdGhats[1], createdGhats[2], createdGhats[3], createdGhats[4], createdGhats[5], createdGhats[6], createdGhats[0]], // 8 stops (repeating first for return)
          },
        ],
        distance: '315 km',
        estimatedDuration: '12-14 hours',
      },
      {
        name: 'Chormontaj to Dhaka',
        launchIds: [createdLaunches[1]], // Pubali-9
        schedules: [
          {
            launchId: createdLaunches[1],
            departureTime: '17:00',
            arrivalTime: '07:00',
            daysOfWeek: ['Daily'],
            ghatIds: [createdGhats[0], createdGhats[1], createdGhats[2], createdGhats[3], createdGhats[4], createdGhats[5], createdGhats[6], createdGhats[0]], // 8 stops
          },
        ],
        distance: '315 km',
        estimatedDuration: '12-14 hours',
      },
      // Pubali-6 routes (index 2)
      {
        name: 'Dhaka to Khepupara',
        launchIds: [createdLaunches[2]], // Pubali-6
        schedules: [
          {
            launchId: createdLaunches[2],
            departureTime: '18:30',
            arrivalTime: '08:30',
            daysOfWeek: ['Daily'],
            ghatIds: [createdGhats[0], createdGhats[1], createdGhats[2], createdGhats[3], createdGhats[4], createdGhats[6], createdGhats[0]], // 7 stops
          },
        ],
        distance: '290 km',
        estimatedDuration: '12-14 hours',
      },
      {
        name: 'Khepupara to Dhaka',
        launchIds: [createdLaunches[2]], // Pubali-6
        schedules: [
          {
            launchId: createdLaunches[2],
            departureTime: '16:30',
            arrivalTime: '06:30',
            daysOfWeek: ['Daily'],
            ghatIds: [createdGhats[0], createdGhats[1], createdGhats[2], createdGhats[3], createdGhats[4], createdGhats[6], createdGhats[0]], // 7 stops
          },
        ],
        distance: '290 km',
        estimatedDuration: '12-14 hours',
      },
      // Pubali-5 routes (index 3)
      {
        name: 'Dhaka to Elisha',
        launchIds: [createdLaunches[3]], // Pubali-5
        schedules: [
          {
            launchId: createdLaunches[3],
            departureTime: '07:00',
            arrivalTime: '12:00',
            daysOfWeek: ['Daily'],
            ghatIds: [createdGhats[0], createdGhats[2]], // 2 stops
          },
        ],
        distance: '180 km',
        estimatedDuration: '5-6 hours',
      },
      {
        name: 'Elisha to Dhaka',
        launchIds: [createdLaunches[3]], // Pubali-5
        schedules: [
          {
            launchId: createdLaunches[3],
            departureTime: '13:00',
            arrivalTime: '18:00',
            daysOfWeek: ['Daily'],
            ghatIds: [createdGhats[0], createdGhats[2]], // 2 stops
          },
        ],
        distance: '180 km',
        estimatedDuration: '5-6 hours',
      },
    ];

    const createdRoutes: mongoose.Types.ObjectId[] = [];
    for (const routeData of routesData) {
      const existingRoute = await Route.findOne({ name: routeData.name });
      if (!existingRoute) {
        const route = await Route.create(routeData);
        createdRoutes.push(route._id);
        console.log(`✓ Created route: ${routeData.name}`);
      } else {
        createdRoutes.push(existingRoute._id);
        console.log(`✓ Route already exists: ${routeData.name}`);
      }
    }

    // Update launches with routeIds
    // Pubali-12: routes 0, 1
    await Launch.findByIdAndUpdate(createdLaunches[0], {
      routeIds: [createdRoutes[0], createdRoutes[1]],
    });
    // Pubali-9: routes 2, 3
    await Launch.findByIdAndUpdate(createdLaunches[1], {
      routeIds: [createdRoutes[2], createdRoutes[3]],
    });
    // Pubali-6: routes 4, 5
    await Launch.findByIdAndUpdate(createdLaunches[2], {
      routeIds: [createdRoutes[4], createdRoutes[5]],
    });
    // Pubali-5: routes 6, 7
    await Launch.findByIdAndUpdate(createdLaunches[3], {
      routeIds: [createdRoutes[6], createdRoutes[7]],
    });
    console.log('✓ Updated launches with route references');

    // Seed Management Members
    const managementData = [
      {
        name: 'Ali Asgor',
        position: 'Chief Executive Officer',
        description: 'Visionary leader with extensive experience in maritime operations and strategic growth.',
        order: 1,
      },
      {
        name: 'Babul Ahmed',
        position: 'Operations Director',
        description: 'Ensuring seamless daily operations and efficient fleet management.',
        order: 2,
      },
      {
        name: 'Md Khalek',
        position: 'Operations Director',
        description: 'Driving operational excellence and optimizing service delivery.',
        order: 3,
      },
      {
        name: 'Md Akbar',
        position: 'Managing Director',
        description: 'Overseeing key business functions and fostering strategic partnerships.',
        order: 4,
      },
      {
        name: 'Md Nadim',
        position: 'Managing Director',
        description: 'Responsible for business development and market expansion.',
        order: 5,
      },
      {
        name: 'K M Nazrul Islam',
        position: 'Managing Director',
        description: 'Guiding the company\'s long-term vision and growth initiatives.',
        order: 6,
      },
      {
        name: 'Md Hossain',
        position: 'Safety & Compliance Director',
        description: 'Upholding the highest safety standards and regulatory compliance.',
        order: 7,
      },
      {
        name: 'Hafeez Islam',
        position: 'Customer Relations Manager',
        description: 'Dedicated to ensuring exceptional customer satisfaction and loyalty.',
        order: 8,
      },
    ];

    for (const memberData of managementData) {
      const existingMember = await Management.findOne({ name: memberData.name, position: memberData.position });
      if (!existingMember) {
        await Management.create(memberData);
        console.log(`✓ Created management member: ${memberData.name}`);
      } else {
        console.log(`✓ Management member already exists: ${memberData.name}`);
      }
    }

    // Seed Policies
    const policiesData = [
      {
        title: 'Safety Guidelines',
        content: 'Passengers must follow all safety instructions provided by the crew. Life jackets are available for all passengers. Smoking is strictly prohibited on board.',
        category: 'Safety',
        order: 1,
      },
      {
        title: 'Refund Policy',
        content: 'Refunds are available if cancellation is made at least 24 hours before departure. Cancellation fees may apply. Please contact our booking office for refund requests.',
        category: 'Refund',
        order: 2,
      },
      {
        title: 'Terms of Service',
        content: 'By booking a journey with Padma Navigation Co., passengers agree to abide by all terms and conditions. The company reserves the right to refuse service to anyone who violates these terms.',
        category: 'Terms',
        order: 3,
      },
    ];

    for (const policyData of policiesData) {
      const existingPolicy = await Policy.findOne({ title: policyData.title });
      if (!existingPolicy) {
        await Policy.create(policyData);
        console.log(`✓ Created policy: ${policyData.title}`);
      } else {
        console.log(`✓ Policy already exists: ${policyData.title}`);
      }
    }

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nSummary:');
    console.log(`- Ghats: ${createdGhats.length} (preserved existing)`);
    console.log(`- Launches: ${createdLaunches.length} (preserved existing)`);
    console.log(`- Routes: ${createdRoutes.length} (preserved existing)`);
    console.log('- Management members: 8 (preserved existing)');
    console.log('- Policies: 3 (preserved existing)');
    console.log('\nAll existing data has been preserved. Only missing data was added.');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
