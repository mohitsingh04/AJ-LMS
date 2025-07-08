import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    email: 'super@admin.com',
    name: 'Super Admin',
    role: 'superadmin',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    email: 'admin@school.com',
    name: 'John Smith',
    role: 'admin',
    tenantId: 'tenant1',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    plan: 'Pro',
    subscriptionStatus: 'active',
    profileImage: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    email: 'agent@leads.com',
    name: 'Sarah Johnson',
    role: 'agent',
    tenantId: 'tenant1',
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z',
    referralCode: 'AG001',
    profileImage: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    email: 'counselor@school.com',
    name: 'Michael Brown',
    role: 'counselor',
    tenantId: 'tenant1',
    isActive: true,
    createdAt: '2024-02-15T00:00:00Z',
    profileImage: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const getCurrentTenant = () => {
    // In a real app, this would parse the subdomain
    return user?.tenantId || null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, getCurrentTenant }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};