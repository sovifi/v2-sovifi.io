'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface User {
  id: string;
  username: string;
  email: string;
  isArtist: boolean;
  profileImage?: string;
  walletAddress?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, username: string, isArtist: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('sovifi_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('sovifi_user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Demo user data
      const demoUser = {
        id: '1',
        email,
        username: email.split('@')[0],
        isArtist: true,
        profileImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
      };

      setUser(demoUser);
      localStorage.setItem('sovifi_user', JSON.stringify(demoUser));
      
      toast.success('Signed in successfully');
      router.push(demoUser.isArtist ? '/dashboard' : '/profile');
    } catch (error) {
      toast.error('Failed to sign in');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      localStorage.removeItem('sovifi_user');
      toast.success('Signed out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to sign out');
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string, isArtist: boolean) => {
    try {
      setIsLoading(true);
      
      const newUser = {
        id: Math.random().toString(),
        email,
        username,
        isArtist,
        profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      };
      
      setUser(newUser);
      localStorage.setItem('sovifi_user', JSON.stringify(newUser));
      
      toast.success('Account created successfully');
      router.push(isArtist ? '/dashboard' : '/profile');
    } catch (error) {
      toast.error('Failed to create account');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}