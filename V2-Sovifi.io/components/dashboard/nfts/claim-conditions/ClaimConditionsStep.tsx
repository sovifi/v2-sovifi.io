import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ClaimPhaseCard } from './ClaimPhaseCard';
import { PHASE_TYPES } from './types';
import type { ClaimPhase } from './types';
import { Plus, Info } from 'lucide-react';

interface ClaimConditionsStepProps {
  phases: ClaimPhase[];
  onAddPhase: () => void;
  onUpdatePhase: (index: number, updates: Partial<ClaimPhase>) => void;
  onRemovePhase: (index: number) => void;
}

const PHASE_EXAMPLES = {
  PUBLIC: {
    title: "Public Sale",
    description: "Open minting for everyone at a fixed price.",
    example: "Example: Main public sale at 0.1 ETH per NFT with no restrictions."
  },
  PUBLIC_WITH_ALLOWLIST: {
    title: "Public Sale with Allowlist Benefits",
    description: "Public minting with special privileges for allowlisted wallets.",
    example: "Example: Public mint at 0.1 ETH, but allowlisted wallets can mint at 0.08 ETH or get to mint more NFTs per wallet."
  },
  ALLOWLIST_ONLY: {
    title: "Exclusive Allowlist",
    description: "Restricted minting only for pre-approved wallets.",
    example: "Example: Early access phase for Discord members or contest winners at a special price."
  },
  ONLY_OWNER: {
    title: "Owner-Only Minting",
    description: "Exclusive minting rights for the contract owner.",
    example: "Example: Reserve NFTs for giveaways or future promotions that only you can mint."
  }
};

export function ClaimConditionsStep({
  phases,
  onAddPhase,
  onUpdatePhase,
  onRemovePhase,
}: ClaimConditionsStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Claim Phases</h3>
          <p className="text-sm text-muted-foreground">
            Configure how and when your NFTs can be minted
          </p>
        </div>
        <Button onClick={onAddPhase} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Phase
        </Button>
      </div>

      {phases.length === 0 ? (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <Info className="h-8 w-8 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h4 className="font-medium">No Claim Phases Yet</h4>
              <p className="text-sm text-muted-foreground">
                Add your first claim phase to configure how your NFTs can be minted
              </p>
            </div>
            <Button onClick={onAddPhase} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Phase
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Phase Type Guide */}
          <Card className="p-6 bg-muted/50">
            <h4 className="font-medium mb-4">Available Phase Types</h4>
            <div className="grid gap-4 md:grid-cols-2">
              {PHASE_TYPES.map((type) => (
                <Card key={type.value} className="p-4 bg-background">
                  <h5 className="font-medium mb-2">{PHASE_EXAMPLES[type.value].title}</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    {PHASE_EXAMPLES[type.value].description}
                  </p>
                  <p className="text-xs text-primary italic">
                    {PHASE_EXAMPLES[type.value].example}
                  </p>
                </Card>
              ))}
            </div>
          </Card>

          {/* Active Phases */}
          <div className="space-y-4">
            <h4 className="font-medium">Active Phases ({phases.length})</h4>
            <div className="space-y-4">
              {phases.map((phase, index) => (
                <ClaimPhaseCard
                  key={index}
                  phase={phase}
                  index={index}
                  onUpdate={onUpdatePhase}
                  onRemove={onRemovePhase}
                  isRemovable={index > 0}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}