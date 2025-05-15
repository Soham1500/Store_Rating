// This is a simulated auth service since we don't have a real backend yet
// In a real application, these functions would make API calls to the backend

import { sampleUsers } from '../data/sampleData';

// Simulated token storage
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

// Helper to simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loginUser = async (email: string, password: string) => {
  await delay(800); // Simulate network delay
  
  const user = sampleUsers.find(u => u.email === email);
  
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }
  
  // Store auth data in localStorage to persist across page refreshes
  const { password: _, ...userWithoutPassword } = user;
  const token = `mock-token-${Date.now()}`;
  
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));
  
  return userWithoutPassword;
};

export const registerUser = async (userData: any) => {
  await delay(800); // Simulate network delay
  
  // Check if email already exists
  if (sampleUsers.some(u => u.email === userData.email)) {
    throw new Error('Email already exists');
  }
  
  // In a real app, this would send the data to the server
  // For demo purposes, we'll just simulate a successful registration
  const newUser = {
    id: `user-${Date.now()}`,
    name: userData.name,
    email: userData.email,
    role: 'user', // Default role for new registrations
    address: userData.address,
  };
  
  const token = `mock-token-${Date.now()}`;
  
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  
  return newUser;
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = async () => {
  await delay(300); // Simulate a quick check
  
  const userData = localStorage.getItem(USER_KEY);
  if (!userData) return null;
  
  return JSON.parse(userData);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isTokenValid = async () => {
  await delay(300);
  return !!localStorage.getItem(TOKEN_KEY);
};

export const updateUserPassword = async (currentPassword: string, newPassword: string) => {
  await delay(800);
  
  // In a real app, this would validate the current password and update it
  // For demo purposes, just simulate success
  return { success: true, message: 'Password updated successfully' };
};