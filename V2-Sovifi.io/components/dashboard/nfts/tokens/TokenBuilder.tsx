'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AttributeEditor } from './AttributeEditor';
import { TokenGrid } from './TokenGrid';
import { Upload, Play, Save } from 'lucide-react';

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

const DEMO_TOKENS: Token[] = [
  {
    id: '1',
    name: 'Club Member #001',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400',
    attributes: [
      { name: 'Background', value: 'Blue', rarity: 16.5 },
      { name: 'Head', value: 'Classic', rarity: 20 },
    ],
  },
  {
    id: '2',
    name: 'Club Member #002',
    image: 'https://images.unsplash.com/photo-1614680376408-12b0a9e3c3b8?w=400',
    attributes: [
      { name: 'Background', value: 'Pink', rarity: 16.5 },
      { name: 'Head', value: 'Rare', rarity: 10 },
    ],
  },
];

export function TokenBuilder() {
  const [tokens, setTokens] = useState<Token[]>(DEMO_TOKENS);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const handleEdit = (token: Token) => {
    setSelectedToken(token);
  };

  const handleDelete = (tokenId: string) => {
    setTokens(tokens.filter((t) => t.id !== tokenId));
  };

  const handleAttributeChange = (attributes: Token['attributes']) => {
    if (selectedToken) {
      const updatedTokens = tokens.map((t) =>
        t.id === selectedToken.id ? { ...t, attributes } : t
      );
      setTokens(updatedTokens);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Token Builder</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage your NFT collection
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import Assets
          </Button>
          <Button variant="outline" className="gap-2">
            <Play className="h-4 w-4" />
            Simulate Mint
          </Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Collection
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="tokens" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="attributes">Attributes</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="tokens">
            <TokenGrid
              tokens={tokens}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="attributes">
            {selectedToken ? (
              <AttributeEditor
                attributes={selectedToken.attributes}
                onChange={handleAttributeChange}
              />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Select a token to edit its attributes
              </div>
            )}
          </TabsContent>

          <TabsContent value="preview">
            <div className="text-center py-12 text-muted-foreground">
              Preview functionality coming soon
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}