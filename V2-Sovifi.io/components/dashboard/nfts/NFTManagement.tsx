'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNFTContract } from '@/hooks/useNFTContract';
import { NFTGrid } from './NFTGrid';
import { CreateNFTDialog } from './CreateNFTDialog';
import { ContractOverview } from './ContractOverview';
import { DeploymentWizard } from './deployment/DeploymentWizard';
import { Loader2, Plus } from 'lucide-react';

export function NFTManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { contract, isLoading, error } = useNFTContract();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!contract) {
    return <DeploymentWizard />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">NFT Management</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage your NFT collection
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create NFT
        </Button>
      </div>

      <Tabs defaultValue="collection" className="space-y-6">
        <TabsList>
          <TabsTrigger value="collection">Collection</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="collection">
          <Card className="p-6">
            <ContractOverview />
            <div className="mt-6">
              <NFTGrid />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Collection Analytics</h3>
              {/* Add analytics components here */}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Collection Settings</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Royalty Percentage</Label>
                  <Input type="number" placeholder="5.0" />
                  <p className="text-sm text-muted-foreground">
                    Percentage of secondary sales you'll receive as royalties
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label>Trading Enabled</Label>
                  <div className="flex items-center space-x-2">
                    <Input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm">Allow NFTs to be traded on the marketplace</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateNFTDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}