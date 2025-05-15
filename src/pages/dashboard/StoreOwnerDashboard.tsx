import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import { sampleStores, calculateAverageRating } from '../../data/sampleData';
import Rating from '../../components/common/Rating';
import { Star, TrendingUp, User } from 'lucide-react';

const StoreOwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Find store owned by current user
  const ownedStore = sampleStores.find(store => store.ownerId === user?.id);
  
  // If no store is found
  if (!ownedStore) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Store Owner Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.name}!
          </p>
        </div>
        
        <Card>
          <CardBody>
            <div className="text-center py-8">
              <p className="text-lg text-gray-700">You don't have a store assigned to your account yet.</p>
              <p className="text-sm text-gray-500 mt-2">Please contact the system administrator to assign a store to your account.</p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  // Calculate average rating
  const averageRating = calculateAverageRating(ownedStore.ratings);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Store Owner Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {user?.name}! Here's an overview of your store's performance.
        </p>
      </div>
      
      <Card className="bg-white">
        <CardBody>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{ownedStore.name}</h2>
              <p className="text-gray-500">{ownedStore.address}</p>
              <p className="text-sm text-gray-500">{ownedStore.email}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-lg">
                <Star className="h-5 w-5 text-amber-400 fill-amber-400 mr-2" />
                <span className="text-lg font-semibold">{averageRating}</span>
                <span className="text-gray-500 ml-1">/ 5.0</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary bg-opacity-10 border-l-4 border-primary">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary bg-opacity-20 mr-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-secondary bg-opacity-10 border-l-4 border-secondary">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-secondary bg-opacity-20 mr-4">
                <User className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Reviewers</p>
                <p className="text-2xl font-bold text-gray-900">{ownedStore.ratings.length}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-accent bg-opacity-10 border-l-4 border-accent">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-accent bg-opacity-20 mr-4">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">5-Star Ratings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {ownedStore.ratings.filter(r => r.rating === 5).length}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Customer Ratings</h2>
        </CardHeader>
        <CardBody>
          {ownedStore.ratings.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No ratings yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {ownedStore.ratings.map((rating, index) => {
                const reviewer = sampleStores
                  .flatMap(s => s.ratings)
                  .find(r => r.userId === rating.userId);
                
                return (
                  <div key={index} className="flex items-start border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center text-white">
                        {rating.userId.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-900">
                          {rating.userId === 'admin-1' 
                            ? 'System Administrator' 
                            : 'John Regular User'}
                        </p>
                        <p className="text-sm text-gray-500">{rating.date}</p>
                      </div>
                      <div className="mt-1">
                        <Rating value={rating.rating} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default StoreOwnerDashboard;