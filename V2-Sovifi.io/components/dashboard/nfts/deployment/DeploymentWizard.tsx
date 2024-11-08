'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BasicDetailsStep } from './steps/BasicDetailsStep';
import { RoyaltySettingsStep } from './steps/RoyaltySettingsStep';
import { ClaimConditionsStep } from './steps/ClaimConditionsStep';
import { AllowlistStep } from './steps/AllowlistStep';
import { ReviewStep } from './steps/ReviewStep';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useThirdwebClient } from '@/hooks/useThirdwebClient';
import { toast } from 'sonner';

const STEPS = [
  'basic-details',
  'royalty-settings',
  'claim-conditions',
  'allowlist',
  'review'
] as const;

type Step = typeof STEPS[number];

export interface ClaimPhase {
  type: 'PUBLIC' | 'PUBLIC_WITH_ALLOWLIST' | 'ALLOWLIST_ONLY' | 'ONLY_OWNER';
  name: string;
  startTime: Date;
  maxClaimableSupply: number | 'unlimited';
  maxClaimablePerWallet: number | 'unlimited';
  price: string;
  currency: string;
  allowlist?: string[];
}

const initialDeploymentData = {
  basicDetails: {
    name: '',
    symbol: '',
    description: '',
    maxSupply: 0,
  },
  royaltySettings: {
    artistAddress: '',
    artistRoyalty: 7.5,
    platformRoyalty: 3.0,
  },
  claimConditions: [] as ClaimPhase[],
  allowlist: {
    addresses: [] as string[],
  },
};

export function DeploymentWizard() {
  const [currentStep, setCurrentStep] = useState<Step>('basic-details');
  const [isLoading, setIsLoading] = useState(false);
  const { client, error: clientError } = useThirdwebClient();
  const [deploymentData, setDeploymentData] = useState(initialDeploymentData);

  useEffect(() => {
    if (clientError) {
      toast.error('Failed to initialize Thirdweb client', {
        description: 'Please check your connection and try again',
      });
    }
  }, [clientError]);

  const currentStepIndex = STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const goToNextStep = () => {
    if (!isLastStep) {
      setCurrentStep(STEPS[currentStepIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep(STEPS[currentStepIndex - 1]);
    }
  };

  const updateDeploymentData = (step: keyof typeof deploymentData, data: any) => {
    setDeploymentData(prev => ({
      ...prev,
      [step]: { ...prev[step], ...data }
    }));
  };

  if (!client) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Deploy NFT Contract</h2>
        <div className="text-sm text-muted-foreground">
          Step {currentStepIndex + 1} of {STEPS.length}
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        {STEPS.map((step, index) => (
          <div
            key={step}
            className={`flex-1 h-2 rounded-full ${
              index <= currentStepIndex ? 'bg-primary' : 'bg-secondary'
            }`}
          />
        ))}
      </div>

      <Card className="p-6">
        <Tabs value={currentStep} className="space-y-6">
          <TabsList className="grid grid-cols-5 gap-4">
            <TabsTrigger value="basic-details">1. Basic Details</TabsTrigger>
            <TabsTrigger value="royalty-settings">2. Royalties</TabsTrigger>
            <TabsTrigger value="claim-conditions">3. Claim Phases</TabsTrigger>
            <TabsTrigger value="allowlist">4. Allowlist</TabsTrigger>
            <TabsTrigger value="review">5. Review</TabsTrigger>
          </TabsList>

          <TabsContent value="basic-details">
            <BasicDetailsStep
              data={deploymentData.basicDetails}
              onUpdate={(data) => updateDeploymentData('basicDetails', data)}
            />
          </TabsContent>

          <TabsContent value="royalty-settings">
            <RoyaltySettingsStep
              data={deploymentData.royaltySettings}
              onUpdate={(data) => updateDeploymentData('royaltySettings', data)}
            />
          </TabsContent>

          <TabsContent value="claim-conditions">
            <ClaimConditionsStep
              data={deploymentData.claimConditions}
              onUpdate={(phases) => updateDeploymentData('claimConditions', phases)}
            />
          </TabsContent>

          <TabsContent value="allowlist">
            <AllowlistStep
              data={deploymentData.allowlist}
              onUpdate={(data) => updateDeploymentData('allowlist', data)}
            />
          </TabsContent>

          <TabsContent value="review">
            <ReviewStep data={deploymentData} />
          </TabsContent>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              disabled={isFirstStep || isLoading}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={goToNextStep}
              disabled={isLastStep || isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}