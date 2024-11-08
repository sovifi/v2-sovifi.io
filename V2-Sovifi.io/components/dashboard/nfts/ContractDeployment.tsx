'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContractDeployment } from '@/hooks/useContractDeployment';
import { Loader2, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ContractDeployment() {
  const { deployContract, verifyContract, isDeploying, deploymentStatus } = useContractDeployment();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    maxSupply: '',
    royaltyBps: '500', // 5% default
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await deployContract(
      formData.name,
      formData.symbol,
      parseInt(formData.maxSupply),
      parseInt(formData.royaltyBps)
    );
  };

  const handleVerify = () => {
    if (deploymentStatus?.contractAddress) {
      verifyContract(deploymentStatus.contractAddress);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deploy NFT Contract</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Collection Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="My NFT Collection"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                value={formData.symbol}
                onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value }))}
                placeholder="NFT"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="maxSupply">Maximum Supply</Label>
              <Input
                id="maxSupply"
                type="number"
                value={formData.maxSupply}
                onChange={(e) => setFormData(prev => ({ ...prev, maxSupply: e.target.value }))}
                placeholder="10000"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="royaltyBps">Royalty Percentage</Label>
              <Input
                id="royaltyBps"
                type="number"
                value={formData.royaltyBps}
                onChange={(e) => setFormData(prev => ({ ...prev, royaltyBps: e.target.value }))}
                placeholder="500 (5%)"
              />
              <p className="text-sm text-muted-foreground">
                Enter basis points (100 = 1%). Default is 500 (5%)
              </p>
            </div>
          </div>

          {deploymentStatus && (
            <div className="rounded-lg border p-4 mt-4">
              <h3 className="font-medium mb-2">Deployment Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Contract Address:</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {deploymentStatus.contractAddress}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(deploymentStatus.explorerUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Verification Status:</span>
                  <Badge variant={
                    deploymentStatus.verificationStatus === 'verified' ? 'default' :
                    deploymentStatus.verificationStatus === 'failed' ? 'destructive' :
                    'secondary'
                  }>
                    {deploymentStatus.verificationStatus === 'verified' && (
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                    )}
                    {deploymentStatus.verificationStatus === 'failed' && (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    {deploymentStatus.verificationStatus}
                  </Badge>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleVerify}
                  className="w-full mt-4"
                >
                  Verify Contract on Etherscan
                </Button>
              </div>
            </div>
          )}

          <Button type="submit" disabled={isDeploying} className="w-full">
            {isDeploying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deploying...
              </>
            ) : (
              'Deploy Contract'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}