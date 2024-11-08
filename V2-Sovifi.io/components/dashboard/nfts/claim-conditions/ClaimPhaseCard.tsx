import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { PHASE_TYPES, type ClaimPhase, type PhaseType } from './types';

interface ClaimPhaseCardProps {
  phase: ClaimPhase;
  index: number;
  onUpdate: (index: number, updates: Partial<ClaimPhase>) => void;
  onRemove: (index: number) => void;
  isRemovable: boolean;
}

export function ClaimPhaseCard({
  phase,
  index,
  onUpdate,
  onRemove,
  isRemovable,
}: ClaimPhaseCardProps) {
  const handleUnlimitedToggle = (field: 'maxClaimableSupply' | 'maxClaimablePerWallet') => {
    const currentValue = phase[field];
    const newValue = currentValue === 'unlimited' ? 0 : 'unlimited';
    onUpdate(index, { [field]: newValue });
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">Phase {index + 1}</h4>
            {isRemovable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(index)}
              >
                Remove
              </Button>
            )}
          </div>
          <Button variant="ghost" size="sm">
            Collapse
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>Phase Type</Label>
            <Select
              value={phase.type}
              onValueChange={(value: PhaseType) => 
                onUpdate(index, { type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select phase type" />
              </SelectTrigger>
              <SelectContent>
                {PHASE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex flex-col">
                      <span>{type.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {type.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              value={phase.name}
              onChange={(e) => onUpdate(index, { name: e.target.value })}
              placeholder={`${PHASE_TYPES.find(t => t.value === phase.type)?.label} phase`}
            />
            <p className="text-sm text-muted-foreground">
              This does not affect how your claim phase functions and is for organizational purposes only.
            </p>
          </div>

          <div className="grid gap-2">
            <Label>When will this phase start?</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {format(phase.startDate, "MM/dd/yyyy HH:mm")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={phase.startDate}
                  onSelect={(date) => date && onUpdate(index, { startDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <p className="text-sm text-muted-foreground">
              This time is in your local timezone.
            </p>
          </div>

          <div className="grid gap-2">
            <Label>How many NFTs will you drop in this phase?</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={phase.maxClaimableSupply === 'unlimited' ? '' : phase.maxClaimableSupply}
                onChange={(e) => onUpdate(index, { maxClaimableSupply: parseInt(e.target.value) || 0 })}
                placeholder="0"
                disabled={phase.maxClaimableSupply === 'unlimited'}
              />
              <Button
                variant="outline"
                onClick={() => handleUnlimitedToggle('maxClaimableSupply')}
              >
                {phase.maxClaimableSupply === 'unlimited' ? 'Set Limit' : 'Unlimited'}
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>How many NFTs can be claimed per wallet?</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={phase.maxClaimablePerWallet === 'unlimited' ? '' : phase.maxClaimablePerWallet}
                onChange={(e) => onUpdate(index, { maxClaimablePerWallet: parseInt(e.target.value) || 0 })}
                placeholder="0"
                disabled={phase.maxClaimablePerWallet === 'unlimited'}
              />
              <Button
                variant="outline"
                onClick={() => handleUnlimitedToggle('maxClaimablePerWallet')}
              >
                {phase.maxClaimablePerWallet === 'unlimited' ? 'Set Limit' : 'Unlimited'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              This value applies for all wallets. Limits are set per wallets and not per user, sophisticated actors could get around wallet restrictions.
            </p>
          </div>

          <div className="grid gap-2">
            <Label>How much do you want to charge to claim each NFT?</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                step="0.000001"
                value={phase.price}
                onChange={(e) => onUpdate(index, { price: e.target.value })}
                placeholder="0"
              />
              <Select
                value={phase.currency}
                onValueChange={(value) => onUpdate(index, { currency: value })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ETH">ETH (Sepolia Ether)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(phase.type === 'PUBLIC_WITH_ALLOWLIST' || phase.type === 'ALLOWLIST_ONLY') && (
            <div className="grid gap-2">
              <Label>
                {phase.type === 'PUBLIC_WITH_ALLOWLIST' ? 'Add Override Snapshot' : 'Add Allowlist'}
              </Label>
              <Button variant="outline" className="gap-2">
                Edit Claimer Snapshot
              </Button>
              <p className="text-sm text-muted-foreground">
                {phase.type === 'PUBLIC_WITH_ALLOWLIST' ? (
                  <>
                    Anyone can claim based on the rules defined in this phase.
                    <br />
                    Wallets in the snapshot can claim with special rules defined in the snapshot.
                  </>
                ) : (
                  'Only wallets on the allowlist can claim.'
                )}
              </p>
            </div>
          )}

          {phase.type === 'ONLY_OWNER' && (
            <div className="grid gap-2">
              <Label>Creator address</Label>
              <Input
                value={phase.creatorAddress}
                disabled
                className="font-mono"
              />
              <p className="text-sm text-muted-foreground">
                This wallet address will be able to indefinitely claim. To use a different address, please connect a different wallet.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}