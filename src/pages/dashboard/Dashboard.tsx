import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import { getStatistics } from '../../data/sampleData';
import { Store, Users, Star } from 'lucide-react';
import Rating from '../../components/common/Rating';

// Import store owner specific components
import StoreOwnerDashboard from './StoreOwnerDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const stats = getStatistics();
  
  // Show different dashboard based on user role
  if (user?.role === 'store_owner') {
    return <StoreOwnerDashboard />;
  }
  
  // Admin and normal users see the main dashboard
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {user?.name}! Here's an overview of the platform.
        </p>
      </div>
      
      {user?.role === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary-light to-primary">
            <CardBody className="flex items-center text-white">
              <div className="p-3 rounded-full bg-white bg-opacity-30 mr-4">
                <Store className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-white text-opacity-80">Total Stores</p>
                <p className="text-3xl font-bold">{stats.totalStores}</p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-gradient-to-br from-secondary-light to-secondary">
            <CardBody className="flex items-center text-white">
              <div className="p-3 rounded-full bg-white bg-opacity-30 mr-4">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-white text-opacity-80">Total Users</p>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent-light to-accent">
            <CardBody className="flex items-center text-white">
              <div className="p-3 rounded-full bg-white bg-opacity-30 mr-4">
                <Star className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-white text-opacity-80">Total Ratings</p>
                <p className="text-3xl font-bold">{stats.totalRatings}</p>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Top Rated Stores</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">Grocery Mart</p>
                  <p className="text-sm text-gray-500">123 Market Street, New York, NY</p>
                </div>
                <div className="flex items-center">
                  <Rating value={4.5} />
                  <span className="ml-2 text-sm font-medium text-gray-700">4.5</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">Home Improvement Center</p>
                  <p className="text-sm text-gray-500">101 Builder Lane, Chicago, IL</p>
                </div>
                <div className="flex items-center">
                  <Rating value={5} />
                  <span className="ml-2 text-sm font-medium text-gray-700">5.0</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">Pets Paradise</p>
                  <p className="text-sm text-gray-500">202 Animal Avenue, Seattle, WA</p>
                </div>
                <div className="flex items-center">
                  <Rating value={4} />
                  <span className="ml-2 text-sm font-medium text-gray-700">4.0</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center text-white">
                    JR
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">John Regular User rated <span className="text-primary">Home Improvement Center</span></p>
                  <p className="text-xs text-gray-500">2023-10-05</p>
                  <div className="mt-1">
                    <Rating value={5} size="sm" />
                  </div>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full bg-secondary-light flex items-center justify-center text-white">
                    SA
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">System Administrator rated <span className="text-primary">Pets Paradise</span></p>
                  <p className="text-xs text-gray-500">2023-09-12</p>
                  <div className="mt-1">
                    <Rating value={4} size="sm" />
                  </div>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full bg-accent-light flex items-center justify-center text-white">
                    SA
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">System Administrator rated <span className="text-primary">Grocery Mart</span></p>
                  <p className="text-xs text-gray-500">2023-09-20</p>
                  <div className="mt-1">
                    <Rating value={5} size="sm" />
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;