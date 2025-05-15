import React, { useState } from 'react';
import { sampleStores, calculateAverageRating } from '../../data/sampleData';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import Rating from '../../components/common/Rating';
import Button from '../../components/ui/Button';
import FormInput from '../../components/forms/FormInput';
import { Search, ArrowUpDown } from 'lucide-react';

interface StoreData {
  id: string;
  name: string;
  email: string;
  address: string;
  ownerId: string | null;
  ratings: Array<{
    userId: string;
    rating: number;
    date: string;
  }>;
  averageRating: number;
  userRating: number | null;
}

const StoresList: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'name' | 'address' | 'rating'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);
  const [ratingValue, setRatingValue] = useState(0);
  
  // Process stores data
  const processedStores: StoreData[] = sampleStores.map(store => {
    const userRating = store.ratings.find(r => r.userId === user?.id)?.rating || null;
    const averageRating = parseFloat(calculateAverageRating(store.ratings));
    
    return {
      ...store,
      averageRating,
      userRating,
    };
  });
  
  // Filter stores based on search term
  const filteredStores = processedStores.filter(store => {
    return (
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Sort stores
  const sortedStores = [...filteredStores].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'address') {
      comparison = a.address.localeCompare(b.address);
    } else if (sortField === 'rating') {
      comparison = a.averageRating - b.averageRating;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  const handleSort = (field: 'name' | 'address' | 'rating') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const openRatingModal = (store: StoreData) => {
    setSelectedStore(store);
    setRatingValue(store.userRating || 0);
    setShowRatingModal(true);
  };
  
  const submitRating = () => {
    // In a real app, this would call an API to submit the rating
    // For demo purposes, we'll just show a success message
    setShowRatingModal(false);
    alert(`Rating of ${ratingValue} stars submitted for ${selectedStore?.name}`);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Stores</h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse and rate stores on our platform
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <FormInput
            type="text"
            placeholder="Search stores..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {user?.role === 'admin' && (
          <Button variant="primary">
            Add New Store
          </Button>
        )}
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    <span>Store Name</span>
                    {sortField === 'name' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('address')}
                >
                  <div className="flex items-center">
                    <span>Address</span>
                    {sortField === 'address' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('rating')}
                >
                  <div className="flex items-center">
                    <span>Overall Rating</span>
                    {sortField === 'rating' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Your Rating
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedStores.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    No stores found
                  </td>
                </tr>
              ) : (
                sortedStores.map((store) => (
                  <tr key={store.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{store.name}</div>
                      <div className="text-sm text-gray-500">{store.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{store.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Rating value={store.averageRating} />
                        <span className="ml-2 text-sm text-gray-700">{store.averageRating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {store.userRating ? (
                        <div className="flex items-center">
                          <Rating value={store.userRating} />
                          <span className="ml-2 text-sm text-gray-700">{store.userRating}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Not rated</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant={store.userRating ? 'secondary' : 'primary'}
                        size="sm"
                        onClick={() => openRatingModal(store)}
                      >
                        {store.userRating ? 'Update Rating' : 'Rate Store'}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Rating Modal */}
      {showRatingModal && selectedStore && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowRatingModal(false)}></div>
          <div className="bg-white rounded-lg p-6 w-full max-w-md z-10">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Rate {selectedStore.name}
            </h3>
            <div className="mb-6 flex flex-col items-center">
              <Rating
                value={ratingValue}
                size="lg"
                editable
                onChange={(rating) => setRatingValue(rating)}
              />
              <p className="mt-2 text-gray-500 text-sm">
                Select 1-5 stars to rate this store
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowRatingModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={submitRating}
                disabled={ratingValue === 0}
              >
                Submit Rating
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoresList;