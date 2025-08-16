const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Generic API client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const searchParams = params ? new URLSearchParams(params).toString() : '';
    const url = searchParams ? `${endpoint}?${searchParams}` : endpoint;
    
    return this.request<T>(url, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Create API client instance
const apiClient = new ApiClient(API_BASE_URL);



// Contact API functions
export const contactApi = {
  // Submit contact form
  submitContact: async (contactData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone?: string;
    company?: string;
    projectType?: string;
    budget?: string;
    timeline?: string;
    source?: string;
  }) => {
    return apiClient.post<{
      success: boolean;
      message: string;
      data: {
        id: string;
        submittedAt: string;
      };
    }>('/contact', contactData);
  },
};

// Analytics API functions
export const analyticsApi = {
  // Track single event
  trackEvent: async (eventData: {
    event: string;
    category: string;
    action: string;
    label?: string;
    value?: number;
    page: string;
    pageTitle?: string;
    sessionId?: string;
    userId?: string;
  }) => {
    return apiClient.post<{
      success: boolean;
      message: string;
      data: {
        id: string;
        timestamp: string;
      };
    }>('/analytics/track', eventData);
  },

  // Track multiple events
  trackBatch: async (events: Array<{
    event: string;
    category: string;
    action: string;
    label?: string;
    value?: number;
    page: string;
    pageTitle?: string;
    sessionId?: string;
    userId?: string;
  }>) => {
    return apiClient.post<{
      success: boolean;
      message: string;
    }>('/analytics/batch', { events });
  },
};

// Types (matching backend models)

export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  source: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes?: string;
  ipAddress: string;
  userAgent: string;
  replied: boolean;
  repliedAt?: string;
  formattedDate: string;
  timeAgo: string;
  createdAt: string;
  updatedAt: string;
}

// Error handling utility
export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

// Utility function to handle API errors
export const handleApiError = (error: any): string => {
  // Always return a generic message to the user; avoid leaking server internals
  console.error('[Contact API Error]', error);
  return 'Something went wrong. Please try again later.';
};

export default apiClient;
