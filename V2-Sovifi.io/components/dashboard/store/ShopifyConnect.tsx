'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingBag, ArrowRight, Store, Box, Truck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ShopifyConnectProps {
  onConnect: () => void;
}

// Test credentials
const TEST_STORES = [
  'demo-store.myshopify.com',
  'test-merch.myshopify.com',
  'sovifi-demo.myshopify.com'
];

export function ShopifyConnect({ onConnect }: ShopifyConnectProps) {
  const [storeUrl, setStoreUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);

    // Simulate API connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (TEST_STORES.includes(storeUrl)) {
      toast.success('Successfully connected to Shopify store!');
      onConnect();
    } else {
      toast.error('Please use one of the test store URLs: demo-store.myshopify.com, test-merch.myshopify.com, or sovifi-demo.myshopify.com');
    }

    setIsConnecting(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center space-y-4 mb-8">
        <ShoppingBag className="h-12 w-12 mx-auto text-primary" />
        <h1 className="text-3xl font-bold">Connect Your Shopify Store</h1>
        <p className="text-muted-foreground">
          Integrate your Shopify store with Sovifi to manage your merchandise and NFT-enabled products in one place.
        </p>
        <p className="text-sm text-muted-foreground bg-muted p-2 rounded-lg">
          For testing, use: <code className="bg-background px-1 py-0.5 rounded">demo-store.myshopify.com</code>
        </p>
      </div>

      <Card className="p-6 mb-8">
        <div className="space-y-4">
          <Label htmlFor="store-url">Shopify Store URL</Label>
          <div className="flex gap-4">
            <Input 
              id="store-url" 
              placeholder="your-store.myshopify.com"
              className="flex-1"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
            />
            <Button 
              onClick={handleConnect} 
              className="gap-2"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  Connect Store
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <Store className="h-8 w-8 text-primary mb-4" />
          <h3 className="font-semibold mb-2">Unified Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage your physical and digital merchandise from a single dashboard
          </p>
        </Card>

        <Card className="p-6">
          <Box className="h-8 w-8 text-primary mb-4" />
          <h3 className="font-semibold mb-2">NFT-Enabled Products</h3>
          <p className="text-sm text-muted-foreground">
            Create products with exclusive NFT benefits and digital collectibles
          </p>
        </Card>

        <Card className="p-6">
          <Truck className="h-8 w-8 text-primary mb-4" />
          <h3 className="font-semibold mb-2">Automated Fulfillment</h3>
          <p className="text-sm text-muted-foreground">
            Seamlessly fulfill orders with Shopify's powerful shipping tools
          </p>
        </Card>
      </div>
    </div>
  );
}