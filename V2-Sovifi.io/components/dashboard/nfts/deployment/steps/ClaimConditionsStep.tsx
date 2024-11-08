'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Plus, X, ChevronDown, ChevronUp, Info } from 'lucide-react';
import type { ClaimPhase } from '../DeploymentWizard';

interface ClaimConditionsStepProps {
  data: ClaimPhase[];
  onUpdate: (phases: ClaimPhase[]) => void;
}

const PHASE_TYPES = [
  {
    value: 'PUBLIC',
    label: 'Public',
    description: 'Allow any wallet to claim this drop during this claim phase.',
  },
  {
    value: 'PUBLIC_WITH_ALLOWLIST',
    label: 'Public (With Allowlist)',
    description: 'Public minting with special privileges for allowlisted wallets.',
  },
  {
    value: 'ALLOWLIST_ONLY',
    label: 'Allowlist Only',
    description: 'Only wallet addresses in the allowlist can claim.',
  },
  {
    value: 'ONLY_OWNER',
    label: 'Only Owner',
    description: 'Exclusive minting rights for the contract owner.',
  },
] as const;

const initialPhase: ClaimPhase = {
  type: 'PUBLIC',
  name: 'Phase 1',
  startTime: new Date(),
  maxClaimableSupply: 'unlimited',
  maxClaimablePerWallet: 1,
  price: '0.1',
  currency: 'ETH',
};

export function ClaimConditionsStep({ data, onUpdate }: ClaimConditionsStepProps) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const [phases, setPhases] = useState<ClaimPhase[]>(data || []);

  useEffect(() => {
    // Initialize with at least one phase if empty
    if (!phases.length) {
      setPhases([initialPhase]);
      onUpdate([initialPhase]);
    }
  }, []);

  const addPhase = () => {
    const newPhase: ClaimPhase = {
      ...initialPhase,
      name: `Phase ${phases.length + 1}`,
    };
    const updatedPhases = [...phases, newPhase];
    setPhases(updatedPhases);
    onUpdate(updatedPhases);
    setExpandedPhase(phases.length);
  };

  const removePhase = (index: number) => {
    const updatedPhases = phases.filter((_, i) => i !== index);
    setPhases(updatedPhases);
    onUpdate(updatedPhases);
    if (expandedPhase === index) {
      setExpandedPhase(null);
    }
  };

  const updatePhase = (index: number, updates: Partial<ClaimPhase>) => {
    const updatedPhases = phases.map((phase, i) => 
      i === index ? { ...phase, ...updates } : phase
    );
    setPhases(updatedPhases);
    onUpdate(updatedPhases);
  };

  const togglePhase = (index: number) => {
    setExpandedPhase(expandedPhase === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Claim Phases</h3>
          <p className="text-sm text-muted-foreground">
            Configure how and when your NFTs can be minted
          </p>
        </div>
        <Button onClick={addPhase} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Phase
        </Button>
      </div>

      <div className="space-y-4">
        {phases.map((phase, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePhase(index)}
                >
                  {expandedPhase === index ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                <div>
                  <h4 className="font-medium">{phase.name}</h4>
                  <Badge variant="secondary">{phase.type}</Badge>
                </div>
              </div>
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePhase(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {expandedPhase === index && (
              <div className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Phase Type</Label>
                    <select
                      value={phase.type}
                      onChange={(e) => updatePhase(index, { 
                        type: e.target.value as ClaimPhase['type']
                      })}
                      className="w-full p-2 rounded-md border bg-background"
                    >
                      {PHASE_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-muted-foreground">
                      {PHASE_TYPES.find(t => t.value === phase.type)?.description}
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label>Start Time</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(phase.startTime, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={phase.startTime}
                          onSelect={(date) => date && updatePhase(index, { startTime: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid gap-2">
                    <Label>Max Supply for Phase</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={phase.maxClaimableSupply === 'unlimited' ? '' : phase.maxClaimableSupply}
                        onChange={(e) => updatePhase(index, { 
                          maxClaimableSupply: e.target.value ? parseInt(e.target.value) : 'unlimited'
                        })}
                        disabled={phase.maxClaimableSupply === 'unlimited'}
                        placeholder="0"
                      />
                      <Button
                        variant="outline"
                        onClick={() => updatePhase(index, {
                          maxClaimableSupply: phase.maxClaimableSupply === 'unlimited' ? 0 : 'unlimited'
                        })}
                      >
                        {phase.maxClaimableSupply === 'unlimited' ? 'Set Limit' : 'Unlimited'}
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Max Per Wallet</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={phase.maxClaimablePerWallet === 'unlimited' ? '' : phase.maxClaimablePerWallet}
                        onChange={(e) => updatePhase(index, { 
                          maxClaimablePerWallet: e.target.value ? parseInt(e.target.value) : 'unlimited'
                        })}
                        disabled={phase.maxClaimablePerWallet === 'unlimited'}
                        placeholder="1"
                      />
                      <Button
                        variant="outline"
                        onClick={() => updatePhase(index, {
                          maxClaimablePerWallet: phase.maxClaimablePerWallet === 'unlimited' ? 1 : 'unlimited'
                        })}
                      >
                        {phase.maxClaimablePerWallet === 'unlimited' ? 'Set Limit' : 'Unlimited'}
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Price</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        step="0.000001"
                        value={phase.price}
                        onChange={(e) => updatePhase(index, { price: e.target.value })}
                        placeholder="0.1"
                      />
                      <select
                        value={phase.currency}
                        onChange={(e) => updatePhase(index, { currency: e.target.value })}
                        className="w-[180px] p-2 rounded-md border bg-background"
                      >
                        <option value="ETH">ETH (Sepolia)</option>
                      </select>
                    </div>
                  </div>

                  {(phase.type === 'PUBLIC_WITH_ALLOWLIST' || phase.type === 'ALLOWLIST_ONLY') && (
                    <div className="grid gap-2">
                      <Label>Allowlist Addresses</Label>
                      <textarea
                        className="w-full p-2 rounded-md border bg-background min-h-[100px]"
                        placeholder="Enter addresses, one per line"
                        value={phase.allowlist?.join('\n') || ''}
                        onChange={(e) => updatePhase(index, { 
                          allowlist: e.target.value.split('\n').filter(Boolean)
                        })}
                      />
                      <p className="text-sm text-muted-foreground">
                        {phase.allowlist?.length || 0} addresses added
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}