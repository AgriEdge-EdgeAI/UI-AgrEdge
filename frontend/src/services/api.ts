// API Service for Azure Functions Backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7071/api';

export interface SignupData {
  full_name: string;
  farm_name: string;
  location: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiResponse {
  message?: string;
  error?: string;
  status?: number;
}

export const api = {
  // Signup - Register a new user
  signup: async (userData: SignupData): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/UserAuth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth_type: 'signup',
          full_name: userData.full_name,
          farm_name: userData.farm_name,
          location: userData.location,
          email: userData.email,
          phone_number: userData.phone_number,
          password: userData.password,
        }),
      });
      
      const data = await response.json();
      return { ...data, status: response.status };
    } catch (error) {
      console.error('Signup error:', error);
      return { error: 'Network error. Please check your connection.', status: 0 };
    }
  },

  // Login - Authenticate existing user
  login: async (credentials: LoginData): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/UserAuth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth_type: 'login',
          email: credentials.email,
          password: credentials.password,
        }),
      });
      
      const data = await response.json();
      return { ...data, status: response.status };
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'Network error. Please check your connection.', status: 0 };
    }
  },
};
