'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface Token {
  id: string;
  name: string;
  image: string;
  attributes: {
    name: string;
    value: string;
    rarity: number;
  }[];
}

interface TokenGridProps {
  tokens: Token[];
  onEdit: (token: Token) => void;
  onDelete: (tokenId: string) => void;
}

export function TokenGrid({ tokens, onEdit, onDelete }: TokenGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {tokens.map((token) => (
        <Card key={token.id} className="overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={token.image}
              alt={token.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium truncate">{token.name}</h3>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(token)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(token.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {token.attributes.map((attr, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {attr.value} ({attr.rarity}%)
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}