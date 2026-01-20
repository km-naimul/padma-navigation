import { mockLaunches, mockRoutes, mockGhats, mockBookings, mockManagement, mockPolicies } from './mockData';
import { Launch, Route, Ghat, Booking, Management, Policy, ApiResponse } from './types';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockLaunchesApi = {
  getAll: async (params?: { status?: string; facility?: string }): Promise<{ data: ApiResponse<Launch[]> }> => {
    await delay(300);
    let launches = [...mockLaunches];

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
    const launch = mockLaunches.find((l) => l._id === id);
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
};

export const mockRoutesApi = {
  getAll: async (): Promise<{ data: ApiResponse<Route[]> }> => {
    await delay(300);
    return {
      data: {
        status: 'success',
        count: mockRoutes.length,
        data: mockRoutes,
      },
    };
  },

  getById: async (id: string): Promise<{ data: ApiResponse<Route> }> => {
    await delay(200);
    const route = mockRoutes.find((r) => r._id === id);
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
};

export const mockGhatsApi = {
  getAll: async (params?: { location?: string }): Promise<{ data: ApiResponse<Ghat[]> }> => {
    await delay(300);
    let ghats = [...mockGhats];

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
    const ghat = mockGhats.find((g) => g._id === id);
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
