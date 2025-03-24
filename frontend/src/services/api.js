import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API endpoints
export const searchProviders = async (query) => {
  try {
    const response = await api.get('/providers/', {
      params: { search: query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching providers:', error);
    throw error;
  }
};

export const searchAssets = async (query) => {
  try {
    const response = await api.get('/assets/', {
      params: { search: query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching assets:', error);
    throw error;
  }
};

export const getFacilities = async () => {
  try {
    const response = await api.get('/facilities/');
    return response.data;
  } catch (error) {
    console.error('Error fetching facilities:', error);
    throw error;
  }
};

export const findAppointmentSlots = async (filters) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await api.get(`/appointment-slots/?${queryString}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointment slots with:', filters.toString());
    throw error;
  }
};

export default api; 