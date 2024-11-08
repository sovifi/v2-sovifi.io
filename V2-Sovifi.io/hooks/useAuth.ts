'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWeb3 } from '@/context/Web3Context';
import { useSupabase } from './useSupabase';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  email: string;
  isArtist: boolean;
  profileImage?: string;
  walletAddress?: string;
  bio?: string;
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
  const { address } = useWeb3();
  const router = useRouter();
  const { data: dbUser, insert: createUser } = useSupabase('users');

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('sovifi_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (address && parsedUser) {
          const updatedUser = { ...parsedUser, walletAddress: address };
          setUser(updatedUser);
          localStorage.setItem('sovifi_user', JSON.stringify(updatedUser));
        } else {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('sovifi_user');
      }
    }
    setIsLoading(false);
  }, [address]);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Check if user exists in Supabase
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (!existingUser) {
        throw new Error('User not found');
      }

      // For demo, we'll use the existing user data
      const demoUser = {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
        isArtist: existingUser.is_artist,
        profileImage: existingUser.profile_image || 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
        walletAddress: address || existingUser.wallet_address,
        bio: existingUser.bio,
      };

      setUser(demoUser);
      localStorage.setItem('sovifi_user', JSON.stringify(demoUser));
      
      toast.success('Signed in successfully');
      router.push(demoUser.isArtist ? '/dashboard' : '/profile');
    } catch (error) {
      console.error('Sign in error:', error);
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
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string, isArtist: boolean) => {
    try {
      setIsLoading(true);

      // Create user in Supabase
      const newUser = await createUser({
        email,
        username,
        is_artist: isArtist,
        wallet_address: address || null,
        profile_image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      });

      if (isArtist) {
        // Create artist profile
        await supabase.from('artist_profiles').insert({
          user_id: newUser.id,
          genres: [],
          total_sales: '0',
          fan_count: 0,
        });
      }

      const userObj = {
        id: newUser.id,
        email,
        username,
        isArtist,
        walletAddress: address,
        profileImage: newUser.profile_image,
      };

      setUser(userObj);
      localStorage.setItem('sovifi_user', JSON.stringify(userObj));
      
      toast.success('Account created successfully');
      router.push(isArtist ? '/dashboard' : '/profile');
    } catch (error) {
      console.error('Sign up error:', error);
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