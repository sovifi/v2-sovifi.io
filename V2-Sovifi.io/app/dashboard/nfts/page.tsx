'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DeploymentWizard } from '@/components/dashboard/nfts/deployment/DeploymentWizard';
import { ContractOverview } from '@/components/dashboard/nfts/ContractOverview';

export default function NFTsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">NFT Management</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deploy">Deploy New</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <ContractOverview />
          </Card>
        </TabsContent>

        <TabsContent value="deploy">
          <DeploymentWizard />
        </TabsContent>
      </Tabs>
    </div>
  );
}