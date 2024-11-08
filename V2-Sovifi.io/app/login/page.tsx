'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, User } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface FormData {
  email: string;
  password: string;
}

const initialFormData: FormData = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent, type: 'artist' | 'fan') => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await signIn(formData.email, formData.password);
    } catch (error) {
      // Error is already handled in AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container relative min-h-[calc(100vh-4rem)] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Music className="mr-2 h-6 w-6" />
          Sovifi
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Connect with your fans, manage your content, and grow your music career with Web3 technology.
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card className="p-6">
            <div className="flex flex-col space-y-2 text-center mb-6">
              <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>
            <Tabs defaultValue="artist" className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="artist">Artist</TabsTrigger>
                <TabsTrigger value="fan">Fan</TabsTrigger>
              </TabsList>
              <TabsContent value="artist">
                <form onSubmit={(e) => handleSubmit(e, 'artist')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="artist-email">Email</Label>
                    <Input
                      id="artist-email"
                      name="email"
                      type="email"
                      placeholder="artist@demo.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="artist-password">Password</Label>
                    <Input
                      id="artist-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="fan">
                <form onSubmit={(e) => handleSubmit(e, 'fan')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fan-email">Email</Label>
                    <Input
                      id="fan-email"
                      name="email"
                      type="email"
                      placeholder="fan@demo.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fan-password">Password</Label>
                    <Input
                      id="fan-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            <div className="text-center text-sm text-muted-foreground">
              <Link href="/forgot-password" className="hover:text-primary">
                Forgot password?
              </Link>
            </div>
          </Card>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/signup" className="hover:text-primary underline underline-offset-4">
              Don&apos;t have an account? Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}