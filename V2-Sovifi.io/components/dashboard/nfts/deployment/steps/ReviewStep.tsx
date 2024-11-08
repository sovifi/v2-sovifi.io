'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { deployNFTContract, setClaimConditions } from '@/lib/contracts/deployContract';
import { Check, Loader2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface ReviewStepProps {
  data: {
    basicDetails: {
      name: string;
      symbol: string;
      description: string;
      maxSupply: number;
    };
    royaltySettings: {
      artistAddress: string;
      artistRoyalty: number;
      platformRoyalty: number;
    };
    claimConditions: Array<{
      type: string;
      name: string;
      startTime: Date;
      maxClaimableSupply: number;
      maxClaimablePerWallet: number;
      price: string;
      currency: string;
    }>;
    allowlist: {
      addresses: string[];
    };
  };
}

export function ReviewStep({ data }: ReviewStepProps) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStep, setDeploymentStep] = useState<string | null>(null);
  const [deploymentResult, setDeploymentResult] = useState<{
    contractAddress?: string;
    explorerUrl?: string;
    verificationStatus?: 'pending' | 'verified' | 'failed';
  } | null>(null);

  const handleDeploy = async () => {
    if (!data?.basicDetails?.name || !data?.royaltySettings?.artistAddress) {
      toast.error('Missing required deployment data');
      return;
    }

    setIsDeploying(true);
    setDeploymentStep('Deploying contract...');

    try {
      // Deploy the contract
      const result = await deployNFTContract(
        data.basicDetails.name,
        data.basicDetails.symbol,
        data.basicDetails.maxSupply,
        data.royaltySettings.artistAddress
      );

      if (!result.success || !result.contractAddress) {
        throw new Error(result.error || 'Failed to deploy contract');
      }

      setDeploymentResult({
        contractAddress: result.contractAddress,
        explorerUrl: result.explorerUrl,
        verificationStatus: 'pending'
      });

      setDeploymentStep('Setting claim conditions...');

      // Set claim conditions if any are defined
      if (data.claimConditions.length > 0) {
        await setClaimConditions(result.contractAddress, data.claimConditions);
      }

      toast.success('Contract deployed successfully!', {
        description: `Contract Address: ${result.contractAddress}`,
      });

      setDeploymentStep(null);
      setIsDeploying(false);

    } catch (error) {
      console.error('Deployment failed:', error);
      toast.error('Failed to deploy contract');
      setIsDeploying(false);
      setDeploymentStep(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Review & Deploy</h3>
        <p className="text-sm text-muted-foreground">
          Review your settings before deploying the contract
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-4">
          <h4 className="font-medium mb-4">Basic Details</h4>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label>Name</Label>
              <span>{data.basicDetails.name}</span>
            </div>
            <div className="flex justify-between">
              <Label>Symbol</Label>
              <span>{data.basicDetails.symbol}</span>
            </div>
            <div className="flex justify-between">
              <Label>Max Supply</Label>
              <span>{data.basicDetails.maxSupply}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-4">Royalties & Revenue</h4>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label>Artist Wallet</Label>
              <span className="font-mono">{data.royaltySettings.artistAddress}</span>
            </div>
            <div className="flex justify-between">
              <Label>Artist Royalty</Label>
              <span>{data.royaltySettings.artistRoyalty}%</span>
            </div>
            <div className="flex justify-between">
              <Label>Platform Fee</Label>
              <span>{data.royaltySettings.platformRoyalty}%</span>
            </div>
          </div>
        </Card>

        {data.claimConditions.length > 0 && (
          <Card className="p-4">
            <h4 className="font-medium mb-4">Claim Phases</h4>
            <div className="space-y-4">
              {data.claimConditions.map((phase, index) => (
                <div key={index} className="p-2 rounded bg-muted">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{phase.name}</span>
                    <Badge variant="secondary">{phase.type}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Price: {phase.price} {phase.currency}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {data.allowlist.addresses.length > 0 && (
          <Card className="p-4">
            <h4 className="font-medium mb-4">Allowlist</h4>
            <div className="text-sm text-muted-foreground">
              {data.allowlist.addresses.length} addresses configured
            </div>
          </Card>
        )}

        {deploymentResult && (
          <Card className="p-4">
            <h4 className="font-medium mb-4">Deployment Status</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Contract Address</Label>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {deploymentResult.contractAddress}
                  </code>
                  {deploymentResult.explorerUrl && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(deploymentResult.explorerUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Verification Status</Label>
                <Badge variant={
                  deploymentResult.verificationStatus === 'verified' ? 'default' :
                  deploymentResult.verificationStatus === 'failed' ? 'destructive' :
                  'secondary'
                }>
                  {deploymentResult.verificationStatus === 'verified' && (
                    <Check className="h-3 w-3 mr-1" />
                  )}
                  {deploymentResult.verificationStatus}
                </Badge>
              </div>
            </div>
          </Card>
        )}

        <Button 
          onClick={handleDeploy} 
          disabled={isDeploying}
          className="w-full"
        >
          {isDeploying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {deploymentStep || 'Deploying...'}
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Deploy Contract
            </>
          )}
        </Button>
      </div>
    </div>
  );
}