// This file contains sample data for development and testing
// In a real application, this would come from a database

export const sampleUsers = [
  {
    id: 'admin-1',
    name: 'System Administrator',
    email: 'admin@example.com',
    password: 'Admin@123',
    role: 'admin',
    address: '123 Admin Street, Admin City',
  },
  {
    id: 'user-1',
    name: 'John Regular User',
    email: 'user@example.com',
    password: 'User@123',
    role: 'user',
    address: '456 User Avenue, User Town',
  },
  {
    id: 'store-1',
    name: 'Store Owner',
    email: 'store@example.com',
    password: 'Store@123',
    role: 'store_owner',
    address: '789 Store Boulevard, Store City',
    storeId: '1',
  },
];

export const sampleStores = [
  {
    id: '1',
    name: 'Grocery Mart',
    email: 'contact@grocerymart.com',
    address: '123 Market Street, New York, NY',
    ownerId: 'store-1',
    ratings: [
      { userId: 'user-1', rating: 4, date: '2023-08-15' },
      { userId: 'admin-1', rating: 5, date: '2023-09-20' },
    ],
  },
  {
    id: '2',
    name: 'Tech Haven',
    email: 'info@techhaven.com',
    address: '456 Electronics Avenue, San Francisco, CA',
    ownerId: null, // Doesn't have an owner yet
    ratings: [
      { userId: 'user-1', rating: 3, date: '2023-07-10' },
    ],
  },
  {
    id: '3',
    name: 'Fashion Boutique',
    email: 'service@fashionboutique.com',
    address: '789 Style Street, Miami, FL',
    ownerId: null,
    ratings: [],
  },
  {
    id: '4',
    name: 'Home Improvement Center',
    email: 'help@homeimprovementcenter.com',
    address: '101 Builder Lane, Chicago, IL',
    ownerId: null,
    ratings: [
      { userId: 'user-1', rating: 5, date: '2023-10-05' },
    ],
  },
  {
    id: '5',
    name: 'Pets Paradise',
    email: 'care@petsparadise.com',
    address: '202 Animal Avenue, Seattle, WA',
    ownerId: null,
    ratings: [
      { userId: 'admin-1', rating: 4, date: '2023-09-12' },
    ],
  },
];

// Helper function to calculate the average rating for a store
export const calculateAverageRating = (ratings: any[]) => {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
  return (sum / ratings.length).toFixed(1);
};

// Helper function to get store statistics for dashboard
export const getStatistics = () => {
  return {
    totalUsers: sampleUsers.length,
    totalStores: sampleStores.length,
    totalRatings: sampleStores.reduce((acc, store) => acc + store.ratings.length, 0),
  };
};