import React, { useState } from 'react';
import { Filter, Download, Eye, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import { format } from 'date-fns';

// Placeholder bookings data
const bookingsData = [
  { 
    id: '1', 
    user: {
      id: 'u1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    route: {
      source: 'New York',
      destination: 'Boston',
      departureTime: '2025-06-15T10:00:00',
      bus: {
        busNumber: 'BUS001',
        busName: 'Express Voyager'
      }
    },
    seats: [12, 13],
    totalAmount: 110,
    paymentStatus: 'Completed',
    bookingStatus: 'Confirmed',
    bookingDate: '2025-06-10T14:23:45'
  },
  { 
    id: '2', 
    user: {
      id: 'u2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    route: {
      source: 'Chicago',
      destination: 'Detroit',
      departureTime: '2025-06-16T08:30:00',
      bus: {
        busNumber: 'BUS002',
        busName: 'City Hopper'
      }
    },
    seats: [5],
    totalAmount: 45,
    paymentStatus: 'Completed',
    bookingStatus: 'Confirmed',
    bookingDate: '2025-06-12T09:15:22'
  },
  { 
    id: '3', 
    user: {
      id: 'u3',
      name: 'Robert Johnson',
      email: 'robert@example.com'
    },
    route: {
      source: 'Los Angeles',
      destination: 'San Francisco',
      departureTime: '2025-06-16T22:00:00',
      bus: {
        busNumber: 'BUS003',
        busName: 'Night Cruiser'
      }
    },
    seats: [8, 9],
    totalAmount: 130,
    paymentStatus: 'Pending',
    bookingStatus: 'Pending',
    bookingDate: '2025-06-14T18:45:10'
  },
  { 
    id: '4', 
    user: {
      id: 'u4',
      name: 'Emily Davis',
      email: 'emily@example.com'
    },
    route: {
      source: 'Miami',
      destination: 'Orlando',
      departureTime: '2025-06-17T09:00:00',
      bus: {
        busNumber: 'BUS004',
        busName: 'Metro Connect'
      }
    },
    seats: [22],
    totalAmount: 40,
    paymentStatus: 'Completed',
    bookingStatus: 'Cancelled',
    bookingDate: '2025-06-10T11:30:00'
  },
  { 
    id: '5', 
    user: {
      id: 'u5',
      name: 'Michael Wilson',
      email: 'michael@example.com'
    },
    route: {
      source: 'Seattle',
      destination: 'Portland',
      departureTime: '2025-06-17T11:30:00',
      bus: {
        busNumber: 'BUS005',
        busName: 'Luxury Liner'
      }
    },
    seats: [15, 16, 17],
    totalAmount: 150,
    paymentStatus: 'Failed',
    bookingStatus: 'Cancelled',
    bookingDate: '2025-06-13T15:20:30'
  }
];

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState(bookingsData);
  const [filteredStatus, setFilteredStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewBookingId, setViewBookingId] = useState<string | null>(null);
  
  // Filter bookings based on status and search term
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = 
      filteredStatus === 'all' || 
      booking.bookingStatus.toLowerCase() === filteredStatus.toLowerCase();
    
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.route.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.route.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.route.bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };
  
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };
  
  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'Cancelled':
        return <XCircle size={16} className="text-red-500" />;
      case 'Pending':
        return <AlertCircle size={16} className="text-amber-500" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Confirmed':
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleViewBooking = (id: string) => {
    setViewBookingId(id);
  };
  
  const viewedBooking = viewBookingId ? bookings.find(b => b.id === viewBookingId) : null;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Bookings</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">Filter:</span>
              <select
                className="border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filteredStatus}
                onChange={(e) => setFilteredStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-primary-600">{booking.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-800">{booking.user.name}</div>
                    <div className="text-sm text-gray-500">{booking.user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-800">
                      {booking.route.source} to {booking.route.destination}
                    </div>
                    <div className="text-sm text-gray-600">
                      {booking.route.bus.busNumber} - {booking.route.bus.busName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(booking.route.departureTime)}, {formatTime(booking.route.departureTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {formatDateTime(booking.bookingDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-800">${booking.totalAmount}</div>
                    <div className="text-xs text-gray-500">
                      {booking.seats.length} {booking.seats.length === 1 ? 'seat' : 'seats'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(booking.bookingStatus)}`}>
                        {getStatusIcon(booking.bookingStatus)}
                        <span className="ml-1">{booking.bookingStatus}</span>
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(booking.paymentStatus)}`}>
                        Payment: {booking.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button 
                        className="text-primary-600 hover:text-primary-800"
                        onClick={() => handleViewBooking(booking.id)}
                      >
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No bookings found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* View Booking Modal */}
      {viewBookingId && viewedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Booking Details</h3>
              <button
                onClick={() => setViewBookingId(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-3">Booking Information</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking ID:</span>
                      <span className="font-medium">{viewedBooking.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking Date:</span>
                      <span>{formatDateTime(viewedBooking.bookingDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking Status:</span>
                      <span className={`font-medium ${
                        viewedBooking.bookingStatus === 'Confirmed' ? 'text-green-600' :
                        viewedBooking.bookingStatus === 'Cancelled' ? 'text-red-600' :
                        'text-amber-600'
                      }`}>
                        {viewedBooking.bookingStatus}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status:</span>
                      <span className={`font-medium ${
                        viewedBooking.paymentStatus === 'Completed' ? 'text-green-600' :
                        viewedBooking.paymentStatus === 'Failed' ? 'text-red-600' :
                        viewedBooking.paymentStatus === 'Refunded' ? 'text-blue-600' :
                        'text-amber-600'
                      }`}>
                        {viewedBooking.paymentStatus}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-bold">${viewedBooking.totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seats:</span>
                      <span>{viewedBooking.seats.join(', ')}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Customer Information</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span>{viewedBooking.user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span>{viewedBooking.user.email}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-3">Journey Details</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bus:</span>
                      <span>{viewedBooking.route.bus.busNumber} - {viewedBooking.route.bus.busName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">From:</span>
                      <span>{viewedBooking.route.source}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">To:</span>
                      <span>{viewedBooking.route.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span>{formatDate(viewedBooking.route.departureTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span>{formatTime(viewedBooking.route.departureTime)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button
                      variant="outline"
                      fullWidth
                    >
                      <Download size={16} className="mr-2" />
                      Download Booking Details
                    </Button>
                    
                    {viewedBooking.bookingStatus === 'Pending' && (
                      <>
                        <Button
                          variant="primary"
                          fullWidth
                        >
                          <CheckCircle size={16} className="mr-2" />
                          Confirm Booking
                        </Button>
                        
                        <Button
                          variant="danger"
                          fullWidth
                        >
                          <XCircle size={16} className="mr-2" />
                          Cancel Booking
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;