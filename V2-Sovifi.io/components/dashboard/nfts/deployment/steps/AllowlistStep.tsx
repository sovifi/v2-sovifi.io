'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Check } from 'lucide-react';

interface AllowlistData {
  addresses: string[];
  merkleRoot: string;
}

interface AllowlistStepProps {
  data: AllowlistData;
  onUpdate: (data: AllowlistData) => void;
}

export function AllowlistStep({ data, onUpdate }: AllowlistStepProps) {
  const [isValidating, setIsValidating] = useState(false);

  const handleAddresses = (value: string) => {
    const addresses = value.split('\n')
      .map(addr => addr.trim())
      .filter(addr => addr.length > 0);
    
    onUpdate({
      ...data,
      addresses,
      merkleRoot: '', // Will be generated on deployment
    });
  };

  const validateAddresses = () => {
    setIsValidating(true);
    // Simulate address validation
    setTimeout(() => {
      setIsValidating(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Allowlist Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Add wallet addresses for allowlist phases
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Wallet Addresses</Label>
          <Textarea
            value={data.addresses.join('\n')}
            onChange={(e) => handleAddresses(e.target.value)}
            placeholder="Enter wallet addresses, one per line"
            rows={10}
          />
          <p className="text-sm text-muted-foreground">
            {data.addresses.length} addresses added
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.txt,.csv';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const text = e.target?.result as string;
                    handleAddresses(text);
                  };
                  reader.readAsText(file);
                }
              };
              input.click();
            }}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Import from File
          </Button>

          <Button
            variant="outline"
            onClick={validateAddresses}
            disabled={isValidating || data.addresses.length === 0}
            className="gap-2"
          >
            {isValidating ? (
              <>
                <span className="animate-spin">⌛</span>
                Validating...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Validate Addresses
              </>
            )}
          </Button>
        </div>

        {data.addresses.length > 0 && (
          <div className="mt-4">
            <Label>Preview</Label>
            <div className="mt-2 p-4 rounded-lg border bg-muted max-h-[200px] overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {data.addresses.map((address, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    {address.slice(0, 6)}...{address.slice(-4)}
                    <button
                      onClick={() => {
                        const newAddresses = [...data.addresses];
                        newAddresses.splice(index, 1);
                        onUpdate({
                          ...data,
                          addresses: newAddresses,
                          merkleRoot: '',
                        });
                      }}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}