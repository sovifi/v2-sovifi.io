'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BasicDetailsStep } from './steps/BasicDetailsStep';
import { RoyaltySettingsStep } from './steps/RoyaltySettingsStep';
import { ClaimConditionsStep } from './steps/ClaimConditionsStep';
import { AllowlistStep } from './steps/AllowlistStep';
import { ReviewStep } from './steps/ReviewStep';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const STEPS = [
  'basic-details',
  'royalty-settings',
  'claim-conditions',
  'allowlist',
  'review'
] as const;

type Step = typeof STEPS[number];

export function DeploymentSteps() {
  const [currentStep, setCurrentStep] = useState<Step>('basic-details');
  const [deploymentData, setDeploymentData] = useState({
    basicDetails: {
      name: '',
      symbol: '',
      description: '',
      maxSupply: 0,
    },
    royaltySettings: {
      artistAddress: '',
    },
    claimConditions: [],
    allowlist: {
      addresses: [] as string[],
    },
  });

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

  return (
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
            onUpdate={(data) => updateDeploymentData('claimConditions', data)}
          />
        </TabsContent>

        <TabsContent value="allowlist">
          <AllowlistStep
            data={deploymentData.allowlist}
            onUpdate={(data) => updateDeploymentData('allowlist', data)}
          />
        </TabsContent>

        <TabsContent value="review">
          <ReviewStep deploymentData={deploymentData} />
        </TabsContent>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={goToPreviousStep}
            disabled={isFirstStep}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous Step
          </Button>
          <Button
            onClick={goToNextStep}
            disabled={isLastStep}
            className="gap-2"
          >
            Next Step
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Tabs>
    </Card>
  );
}