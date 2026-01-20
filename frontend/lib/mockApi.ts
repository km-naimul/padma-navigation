import { mockLaunches, mockRoutes, mockGhats, mockBookings, mockManagement, mockPolicies } from './mockData';
import { Launch, Route, Ghat, Booking, Management, Policy, ApiResponse } from './types';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory storage for mock launches (to simulate API state changes)
let mockLaunchesData = [...mockLaunches];

export const mockLaunchesApi = {
  getAll: async (params?: { status?: string; facility?: string }): Promise<{ data: ApiResponse<Launch[]> }> => {
    await delay(300);
    let launches = [...mockLaunchesData];

    if (params?.status) {
      launches = launches.filter((l) => l.status === params.status);
    }

    if (params?.facility) {
      launches = launches.filter((l) => l.facilities.includes(params.facility!));
    }

    return {
      data: {
        status: 'success',
        count: launches.length,
        data: launches,
      },
    };
  },

  getById: async (id: string): Promise<{ data: ApiResponse<Launch> }> => {
    await delay(200);
    const launch = mockLaunchesData.find((l) => l._id === id);
    if (!launch) {
      throw new Error('Launch not found');
    }
    return {
      data: {
        status: 'success',
        data: launch,
      },
    };
  },

  create: async (data: Partial<Launch>): Promise<{ data: ApiResponse<Launch> }> => {
    await delay(300);
    const newLaunch: Launch = {
      _id: `launch-${Date.now()}`,
      name: data.name || 'New Launch',
      routeIds: data.routeIds || [],
      capacity: data.capacity || 0,
      facilities: data.facilities || [],
      contactNumber: data.contactNumber || '',
      alternateContact: data.alternateContact,
      status: data.status || 'active',
      imageUrl: data.imageUrl,
      description: data.description,
      ...data,
    } as Launch;
    mockLaunchesData.push(newLaunch);
    return {
      data: {
        status: 'success',
        data: newLaunch,
      },
    };
  },

  update: async (id: string, data: Partial<Launch>): Promise<{ data: ApiResponse<Launch> }> => {
    await delay(300);
    const index = mockLaunchesData.findIndex((l) => l._id === id);
    if (index === -1) {
      throw new Error('Launch not found');
    }
    mockLaunchesData[index] = { ...mockLaunchesData[index], ...data };
    return {
      data: {
        status: 'success',
        data: mockLaunchesData[index],
      },
    };
  },

  delete: async (id: string): Promise<{ data: ApiResponse<null> }> => {
    await delay(300);
    const index = mockLaunchesData.findIndex((l) => l._id === id);
    if (index === -1) {
      throw new Error('Launch not found');
    }
    mockLaunchesData.splice(index, 1);
    return {
      data: {
        status: 'success',
        data: null,
      },
    };
  },

  uploadImage: async (id: string, file: File): Promise<{ data: ApiResponse<{ imageUrl: string }> }> => {
    await delay(500);
    const index = mockLaunchesData.findIndex((l) => l._id === id);
    if (index === -1) {
      throw new Error('Launch not found');
    }
    // Simulate image upload - in real scenario, this would upload to a server
    const imageUrl = `/uploads/images/${file.name}`;
    mockLaunchesData[index].imageUrl = imageUrl;
    return {
      data: {
        status: 'success',
        data: { imageUrl },
      },
    };
  },
};

// In-memory storage for mock routes (to simulate API state changes)
let mockRoutesData = [...mockRoutes];

export const mockRoutesApi = {
  getAll: async (): Promise<{ data: ApiResponse<Route[]> }> => {
    await delay(300);
    return {
      data: {
        status: 'success',
        count: mockRoutesData.length,
        data: mockRoutesData,
      },
    };
  },

  getById: async (id: string): Promise<{ data: ApiResponse<Route> }> => {
    await delay(200);
    const route = mockRoutesData.find((r) => r._id === id);
    if (!route) {
      throw new Error('Route not found');
    }
    return {
      data: {
        status: 'success',
        data: route,
      },
    };
  },

  create: async (data: Partial<Route>): Promise<{ data: ApiResponse<Route> }> => {
    await delay(300);
    const newRoute: Route = {
      _id: `route-${Date.now()}`,
      name: data.name || 'New Route',
      launchIds: data.launchIds || [],
      schedules: data.schedules || [],
      distance: data.distance,
      estimatedDuration: data.estimatedDuration,
      ...data,
    } as Route;
    mockRoutesData.push(newRoute);
    return {
      data: {
        status: 'success',
        data: newRoute,
      },
    };
  },

  update: async (id: string, data: Partial<Route>): Promise<{ data: ApiResponse<Route> }> => {
    await delay(300);
    const index = mockRoutesData.findIndex((r) => r._id === id);
    if (index === -1) {
      throw new Error('Route not found');
    }
    mockRoutesData[index] = { ...mockRoutesData[index], ...data };
    return {
      data: {
        status: 'success',
        data: mockRoutesData[index],
      },
    };
  },

  delete: async (id: string): Promise<{ data: ApiResponse<null> }> => {
    await delay(300);
    const index = mockRoutesData.findIndex((r) => r._id === id);
    if (index === -1) {
      throw new Error('Route not found');
    }
    mockRoutesData.splice(index, 1);
    return {
      data: {
        status: 'success',
        data: null,
      },
    };
  },
};

// In-memory storage for mock ghats (to simulate API state changes)
let mockGhatsData = [...mockGhats];

export const mockGhatsApi = {
  getAll: async (params?: { location?: string }): Promise<{ data: ApiResponse<Ghat[]> }> => {
    await delay(300);
    let ghats = [...mockGhatsData];

    if (params?.location) {
      ghats = ghats.filter((g) =>
        g.location.toLowerCase().includes(params.location!.toLowerCase())
      );
    }

    return {
      data: {
        status: 'success',
        count: ghats.length,
        data: ghats,
      },
    };
  },

  getById: async (id: string): Promise<{ data: ApiResponse<Ghat> }> => {
    await delay(200);
    const ghat = mockGhatsData.find((g) => g._id === id);
    if (!ghat) {
      throw new Error('Ghat not found');
    }
    return {
      data: {
        status: 'success',
        data: ghat,
      },
    };
  },

  create: async (data: Partial<Ghat>): Promise<{ data: ApiResponse<Ghat> }> => {
    await delay(300);
    const newGhat: Ghat = {
      _id: `ghat-${Date.now()}`,
      name: data.name || 'New Ghat',
      location: data.location || '',
      address: data.address,
      coordinates: data.coordinates,
      facilities: data.facilities || [],
      ...data,
    } as Ghat;
    mockGhatsData.push(newGhat);
    return {
      data: {
        status: 'success',
        data: newGhat,
      },
    };
  },

  update: async (id: string, data: Partial<Ghat>): Promise<{ data: ApiResponse<Ghat> }> => {
    await delay(300);
    const index = mockGhatsData.findIndex((g) => g._id === id);
    if (index === -1) {
      throw new Error('Ghat not found');
    }
    mockGhatsData[index] = { ...mockGhatsData[index], ...data };
    return {
      data: {
        status: 'success',
        data: mockGhatsData[index],
      },
    };
  },

  delete: async (id: string): Promise<{ data: ApiResponse<null> }> => {
    await delay(300);
    const index = mockGhatsData.findIndex((g) => g._id === id);
    if (index === -1) {
      throw new Error('Ghat not found');
    }
    mockGhatsData.splice(index, 1);
    return {
      data: {
        status: 'success',
        data: null,
      },
    };
  },
};

// In-memory storage for mock data (to simulate API state changes)
let mockBookingsData = [...mockBookings];
let mockManagementData = [...mockManagement];
let mockPoliciesData = [...mockPolicies];

export const mockBookingsApi = {
  getAll: async (): Promise<{ data: ApiResponse<Booking[]> }> => {
    await delay(300);
    return {
      data: {
        status: 'success',
        count: mockBookingsData.length,
        data: mockBookingsData,
      },
    };
  },

  getById: async (id: string): Promise<{ data: ApiResponse<Booking> }> => {
    await delay(200);
    const booking = mockBookingsData.find((b) => b._id === id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return {
      data: {
        status: 'success',
        data: booking,
      },
    };
  },

  create: async (data: Partial<Booking>): Promise<{ data: ApiResponse<Booking> }> => {
    await delay(300);
    const newBooking: Booking = {
      _id: `${Date.now()}`,
      title: data.title || '',
      description: data.description || '',
      contactInfo: data.contactInfo,
      instructions: data.instructions || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockBookingsData.push(newBooking);
    return {
      data: {
        status: 'success',
        data: newBooking,
      },
    };
  },

  update: async (id: string, data: Partial<Booking>): Promise<{ data: ApiResponse<Booking> }> => {
    await delay(300);
    const index = mockBookingsData.findIndex((b) => b._id === id);
    if (index === -1) {
      throw new Error('Booking not found');
    }
    mockBookingsData[index] = {
      ...mockBookingsData[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return {
      data: {
        status: 'success',
        data: mockBookingsData[index],
      },
    };
  },

  delete: async (id: string): Promise<{ data: ApiResponse<null> }> => {
    await delay(300);
    const index = mockBookingsData.findIndex((b) => b._id === id);
    if (index === -1) {
      throw new Error('Booking not found');
    }
    mockBookingsData.splice(index, 1);
    return {
      data: {
        status: 'success',
        data: null,
      },
    };
  },
};

export const mockManagementApi = {
  getAll: async (): Promise<{ data: ApiResponse<Management[]> }> => {
    await delay(300);
    return {
      data: {
        status: 'success',
        count: mockManagementData.length,
        data: mockManagementData.sort((a, b) => (a.order || 0) - (b.order || 0)),
      },
    };
  },

  getById: async (id: string): Promise<{ data: ApiResponse<Management> }> => {
    await delay(200);
    const member = mockManagementData.find((m) => m._id === id);
    if (!member) {
      throw new Error('Management member not found');
    }
    return {
      data: {
        status: 'success',
        data: member,
      },
    };
  },

  create: async (data: Partial<Management>): Promise<{ data: ApiResponse<Management> }> => {
    await delay(300);
    const newMember: Management = {
      _id: `${Date.now()}`,
      name: data.name || '',
      position: data.position || '',
      description: data.description || '',
      order: data.order || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockManagementData.push(newMember);
    return {
      data: {
        status: 'success',
        data: newMember,
      },
    };
  },

  update: async (id: string, data: Partial<Management>): Promise<{ data: ApiResponse<Management> }> => {
    await delay(300);
    const index = mockManagementData.findIndex((m) => m._id === id);
    if (index === -1) {
      throw new Error('Management member not found');
    }
    mockManagementData[index] = {
      ...mockManagementData[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return {
      data: {
        status: 'success',
        data: mockManagementData[index],
      },
    };
  },

  delete: async (id: string): Promise<{ data: ApiResponse<null> }> => {
    await delay(300);
    const index = mockManagementData.findIndex((m) => m._id === id);
    if (index === -1) {
      throw new Error('Management member not found');
    }
    mockManagementData.splice(index, 1);
    return {
      data: {
        status: 'success',
        data: null,
      },
    };
  },
};

export const mockPoliciesApi = {
  getAll: async (): Promise<{ data: ApiResponse<Policy[]> }> => {
    await delay(300);
    return {
      data: {
        status: 'success',
        count: mockPoliciesData.length,
        data: mockPoliciesData.sort((a, b) => (a.order || 0) - (b.order || 0)),
      },
    };
  },

  getById: async (id: string): Promise<{ data: ApiResponse<Policy> }> => {
    await delay(200);
    const policy = mockPoliciesData.find((p) => p._id === id);
    if (!policy) {
      throw new Error('Policy not found');
    }
    return {
      data: {
        status: 'success',
        data: policy,
      },
    };
  },

  create: async (data: Partial<Policy>): Promise<{ data: ApiResponse<Policy> }> => {
    await delay(300);
    const newPolicy: Policy = {
      _id: `${Date.now()}`,
      title: data.title || '',
      content: data.content || '',
      category: data.category || 'General',
      order: data.order || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockPoliciesData.push(newPolicy);
    return {
      data: {
        status: 'success',
        data: newPolicy,
      },
    };
  },

  update: async (id: string, data: Partial<Policy>): Promise<{ data: ApiResponse<Policy> }> => {
    await delay(300);
    const index = mockPoliciesData.findIndex((p) => p._id === id);
    if (index === -1) {
      throw new Error('Policy not found');
    }
    mockPoliciesData[index] = {
      ...mockPoliciesData[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return {
      data: {
        status: 'success',
        data: mockPoliciesData[index],
      },
    };
  },

  delete: async (id: string): Promise<{ data: ApiResponse<null> }> => {
    await delay(300);
    const index = mockPoliciesData.findIndex((p) => p._id === id);
    if (index === -1) {
      throw new Error('Policy not found');
    }
    mockPoliciesData.splice(index, 1);
    return {
      data: {
        status: 'success',
        data: null,
      },
    };
  },
};
