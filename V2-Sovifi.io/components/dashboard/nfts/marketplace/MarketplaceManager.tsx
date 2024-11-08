'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActiveListings } from './ActiveListings';
import { SalesHistory } from './SalesHistory';
import { ListingSettings } from './ListingSettings';
import { useNFTContract } from '@/hooks/useNFTContract';

export function MarketplaceManager() {
  const { contract } = useNFTContract();

  return (
    <Card className="p-6">
      <Tabs defaultValue="listings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="listings">Active Listings</TabsTrigger>
          <TabsTrigger value="history">Sales History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="listings">
          <ActiveListings />
        </TabsContent>

        <TabsContent value="history">
          <SalesHistory />
        </TabsContent>

        <TabsContent value="settings">
          <ListingSettings />
        </TabsContent>
      </Tabs>
    </Card>
  );
}