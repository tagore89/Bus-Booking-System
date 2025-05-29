import React, { useState } from 'react';
import { Pencil, Trash, Plus, Filter, Calendar } from 'lucide-react';
import Button from '../../components/common/Button';
import { format } from 'date-fns';

// Placeholder routes data
const routesData = [
  { 
    id: '1', 
    busId: '1',
    busNumber: 'BUS001',
    busName: 'Express Voyager',
    busType: 'AC',
    source: 'New York',
    destination: 'Boston',
    departureTime: '2025-06-15T10:00:00',
    arrivalTime: '2025-06-15T14:30:00',
    fare: 55,
    availableSeats: 32,
    totalSeats: 36,
    isActive: true
  },
  { 
    id: '2', 
    busId: '2',
    busNumber: 'BUS002',
    busName: 'City Hopper',
    busType: 'Non-AC',
    source: 'Chicago',
    destination: 'Detroit',
    departureTime: '2025-06-16T08:30:00',
    arrivalTime: '2025-06-16T13:00:00',
    fare: 45,
    availableSeats: 45,
    totalSeats: 48,
    isActive: true
  },
  { 
    id: '3', 
    busId: '3',
    busNumber: 'BUS003',
    busName: 'Night Cruiser',
    busType: 'Sleeper',
    source: 'Los Angeles',
    destination: 'San Francisco',
    departureTime: '2025-06-16T22:00:00',
    arrivalTime: '2025-06-17T06:00:00',
    fare: 65,
    availableSeats: 26,
    totalSeats: 28,
    isActive: true
  },
  { 
    id: '4', 
    busId: '4',
    busNumber: 'BUS004',
    busName: 'Metro Connect',
    busType: 'AC',
    source: 'Miami',
    destination: 'Orlando',
    departureTime: '2025-06-17T09:00:00',
    arrivalTime: '2025-06-17T13:00:00',
    fare: 40,
    availableSeats: 38,
    totalSeats: 40,
    isActive: true
  },
  { 
    id: '5', 
    busId: '5',
    busNumber: 'BUS005',
    busName: 'Luxury Liner',
    busType: 'AC',
    source: 'Seattle',
    destination: 'Portland',
    departureTime: '2025-06-17T11:30:00',
    arrivalTime: '2025-06-17T15:00:00',
    fare: 50,
    availableSeats: 30,
    totalSeats: 32,
    isActive: false
  }
];

const RoutesPage: React.FC = () => {
  const [routes, setRoutes] = useState(routesData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter routes based on status and search term
  const filteredRoutes = routes.filter(route => {
    const matchesStatus = 
      filteredStatus === 'all' || 
      (filteredStatus === 'active' ? route.isActive : !route.isActive);
    
    const matchesSearch = 
      route.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.busName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  const handleAddRoute = () => {
    // In a real application, this would save to the API
    setShowAddForm(false);
  };
  
  const handleDeleteRoute = (id: string) => {
    // In a real application, this would call the API
    if (window.confirm('Are you sure you want to delete this route?')) {
      setRoutes(routes.filter(route => route.id !== id));
    }
  };
  
  const handleToggleStatus = (id: string) => {
    // In a real application, this would call the API
    setRoutes(routes.map(route => 
      route.id === id ? { ...route, isActive: !route.isActive } : route
    ));
  };
  
  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Routes</h2>
        
        <Button 
          onClick={() => setShowAddForm(true)}
          variant="primary"
        >
          <Plus size={16} className="mr-1" />
          Add New Route
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search routes..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bus Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fare
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seats
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
              {filteredRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-primary-600">{route.busNumber}</div>
                    <div className="text-sm text-gray-800">{route.busName}</div>
                    <div className="text-xs text-gray-500">{route.busType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-800">{route.source}</div>
                    <div className="text-sm text-gray-600">to</div>
                    <div className="text-sm text-gray-800">{route.destination}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={14} className="mr-1" />
                      {formatDateTime(route.departureTime)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">to</div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={14} className="mr-1" />
                      {formatDateTime(route.arrivalTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-gray-800">${route.fare}</div>
                    <div className="text-xs text-gray-500">per seat</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">Available: {route.availableSeats}</div>
                    <div className="text-sm text-gray-600">Total: {route.totalSeats}</div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-primary-500 h-1.5 rounded-full"
                        style={{ width: `${(route.availableSeats / route.totalSeats) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(route.id)}
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        route.isActive 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {route.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Pencil size={16} />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteRoute(route.id)}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredRoutes.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No routes found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredRoutes.length} of {routes.length} routes
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
      
      {/* Add Route Modal - In a real app, this would be a proper modal component */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Route</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Bus
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select a bus</option>
                  <option value="1">BUS001 - Express Voyager (AC)</option>
                  <option value="2">BUS002 - City Hopper (Non-AC)</option>
                  <option value="3">BUS003 - Night Cruiser (Sleeper)</option>
                  <option value="4">BUS004 - Metro Connect (AC)</option>
                  <option value="5">BUS005 - Luxury Liner (AC)</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter source city"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter destination city"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departure Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Arrival Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fare per Seat ($)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="1"
                  step="0.01"
                  placeholder="Enter fare amount"
                />
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Set route as active
                  </span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary"
                  onClick={handleAddRoute}
                >
                  Add Route
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutesPage;