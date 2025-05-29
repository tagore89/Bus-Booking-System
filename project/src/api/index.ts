import axios from 'axios';

const API_URL = 'https://bus-booking-system-backend-178v.onrender.com';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

// Bus API
export const busAPI = {
  getAllBuses: () => api.get('/buses'),
  getBusById: (id: string) => api.get(`/buses/${id}`),
  getBusRoutes: (id: string) => api.get(`/buses/${id}/routes`),
  searchBuses: (params: any) => api.get('/buses/search', { params }),
  addBus: (busData: any) => api.post('/buses', busData),
  updateBus: (id: string, busData: any) => api.put(`/buses/${id}`, busData),
  deleteBus: (id: string) => api.delete(`/buses/${id}`),
  addRoute: (busId: string, routeData: any) => api.post(`/buses/${busId}/routes`, routeData),
};

// Booking API
export const bookingAPI = {
  getMyBookings: () => api.get('/bookings/my-bookings'),
  getBookingById: (id: string) => api.get(`/bookings/${id}`),
  createBooking: (bookingData: any) => api.post('/bookings', bookingData),
  cancelBooking: (id: string) => api.patch(`/bookings/${id}/cancel`),
  getAllBookings: (page = 1, limit = 10) => api.get('/bookings', { params: { page, limit } }),
};

// Payment API
export const paymentAPI = {
  createPaymentIntent: (bookingId: string) => api.post('/payments/create-payment-intent', { bookingId }),
  confirmPayment: (bookingId: string, paymentId: string) => api.post('/payments/confirm', { bookingId, paymentId }),
};

export default api;
