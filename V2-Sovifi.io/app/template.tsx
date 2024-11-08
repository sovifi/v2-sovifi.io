'use client';

import { Web3Provider } from '@/context/Web3Context';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const [mounted, setMounted] = useState(false);
  const { isLoading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration issues
  if (!mounted || isLoading) {
    return null;
  }

  return (
    <Web3Provider>
      <div className="min-h-screen flex flex-col bg-[#111111]">
        <div className="fixed inset-0 bg-gradient-to-b from-black/10 via-black/50 to-[#111111] pointer-events-none" />
        <Header />
        <main className="flex-1 relative">
          {children}
        </main>
        <Footer />
      </div>
    </Web3Provider>
  );
}