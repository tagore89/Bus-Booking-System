import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Users, Calendar, CreditCard, TrendingUp } from 'lucide-react';
import Button from '../../components/common/Button';

// Placeholder dashboard data
const dashboardData = {
  stats: {
    totalBookings: 248,
    activeRoutes: 32,
    totalBuses: 18,
    totalUsers: 356,
    revenue: 12450
  },
  recentBookings: [
    { id: 'BK12345', user: 'John Doe', route: 'New York to Boston', date: '2025-06-15', amount: 55 },
    { id: 'BK12346', user: 'Jane Smith', route: 'Chicago to Detroit', date: '2025-06-16', amount: 45 },
    { id: 'BK12347', user: 'Robert Johnson', route: 'Los Angeles to San Francisco', date: '2025-06-16', amount: 65 },
    { id: 'BK12348', user: 'Emily Davis', route: 'Miami to Orlando', date: '2025-06-17', amount: 40 },
    { id: 'BK12349', user: 'Michael Wilson', route: 'Seattle to Portland', date: '2025-06-17', amount: 50 }
  ]
};

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
              <Bus size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Buses</p>
              <h3 className="text-2xl font-bold">{dashboardData.stats.totalBuses}</h3>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/admin/buses')}
            >
              Manage Buses
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Routes</p>
              <h3 className="text-2xl font-bold">{dashboardData.stats.activeRoutes}</h3>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/admin/routes')}
            >
              Manage Routes
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent-100 text-accent-600 mr-4">
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <h3 className="text-2xl font-bold">{dashboardData.stats.totalBookings}</h3>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/admin/bookings')}
            >
              View Bookings
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">${dashboardData.stats.revenue}</h3>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {}}
            >
              View Reports
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Route
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardData.recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary-600">
                        {booking.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                        {booking.user}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {booking.route}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                        ${booking.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/admin/bookings')}
              >
                View All Bookings
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Statistics</h3>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-md mb-4">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold">{dashboardData.stats.totalUsers}</h3>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">New Users (This Month)</span>
                  <span className="text-sm font-medium text-gray-800">42</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">Active Users</span>
                  <span className="text-sm font-medium text-gray-800">248</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">Inactive Users</span>
                  <span className="text-sm font-medium text-gray-800">108</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-3">Top User Locations</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">New York</span>
                  <span className="font-medium">86</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Los Angeles</span>
                  <span className="font-medium">74</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Chicago</span>
                  <span className="font-medium">52</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Miami</span>
                  <span className="font-medium">38</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;