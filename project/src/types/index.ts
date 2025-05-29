// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Bus related types
export interface Bus {
  _id: string;
  busNumber: string;
  busName: string;
  busType: 'AC' | 'Non-AC' | 'Sleeper' | 'Semi-Sleeper';
  totalSeats: number;
  amenities: string[];
}

export interface Route {
  _id: string;
  bus: Bus;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  fare: number;
  availableSeats: number[];
  totalSeats: number;
  isActive: boolean;
}

// Passenger details
export interface Passenger {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  seatNumber: number;
}

// Booking related types
export interface Booking {
  _id: string;
  user: string;
  route: Route;
  seats: number[];
  totalAmount: number;
  paymentStatus: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
  paymentId?: string;
  bookingStatus: 'Confirmed' | 'Cancelled' | 'Pending';
  bookingDate: string;
  passengerDetails: Passenger[];
}

// Search related types
export interface SearchParams {
  source: string;
  destination: string;
  date: string;
}