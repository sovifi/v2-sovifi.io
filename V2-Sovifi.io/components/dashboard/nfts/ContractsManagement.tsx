'use client';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContractDeployment } from './ContractDeployment';
import { ContractOverview } from './ContractOverview';

export function ContractsManagement() {
  return (
    <Card>
      <Tabs defaultValue="overview" className="p-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deploy">Deploy New</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ContractOverview />
        </TabsContent>

        <TabsContent value="deploy">
          <ContractDeployment />
        </TabsContent>
      </Tabs>
    </Card>
  );
}