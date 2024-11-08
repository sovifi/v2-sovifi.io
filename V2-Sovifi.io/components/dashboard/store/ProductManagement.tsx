'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Package,
  Nfc,
  Edit,
  Trash2,
  Upload,
  Image as ImageIcon,
  RefreshCw,
  Store,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  hasNFC: boolean;
  inStock: boolean;
  shopifyId?: string;
  syncStatus?: 'synced' | 'pending' | 'error';
  inventory?: {
    available: number;
    total: number;
    lowStock: boolean;
  };
}

interface ShopifyProduct {
  id: string;
  title: string;
  price: string;
  image: string;
  variants: {
    id: string;
    sku: string;
    inventory_quantity: number;
  }[];
}

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: 'Limited Edition T-Shirt',
      price: '$49.99',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      hasNFC: true,
      inStock: true,
      shopifyId: 'gid://shopify/Product/1234567890',
      syncStatus: 'synced',
      inventory: {
        available: 45,
        total: 100,
        lowStock: false,
      },
    },
  ]);

  const [isNewProductDialogOpen, setIsNewProductDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Mock Shopify products for import
  const [shopifyProducts] = useState<ShopifyProduct[]>([
    {
      id: 'shopify_1',
      title: 'Tour T-Shirt 2024',
      price: '$29.99',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      variants: [
        { id: 'v1', sku: 'TOUR-TS-001', inventory_quantity: 100 },
      ],
    },
    {
      id: 'shopify_2',
      title: 'Concert Hoodie',
      price: '$59.99',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      variants: [
        { id: 'v2', sku: 'TOUR-HD-001', inventory_quantity: 75 },
      ],
    },
  ]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const syncWithShopify = async () => {
    setIsSyncing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Products synchronized with Shopify');
    setIsSyncing(false);
  };

  const importShopifyProduct = (product: ShopifyProduct) => {
    const newProduct: Product = {
      id: Math.random().toString(),
      title: product.title,
      price: product.price,
      image: product.image,
      hasNFC: false,
      inStock: product.variants[0].inventory_quantity > 0,
      shopifyId: product.id,
      syncStatus: 'synced',
      inventory: {
        available: product.variants[0].inventory_quantity,
        total: product.variants[0].inventory_quantity,
        lowStock: product.variants[0].inventory_quantity < 10,
      },
    };

    setProducts([...products, newProduct]);
    toast.success(`Imported ${product.title}`);
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Products</h2>
            <p className="text-sm text-muted-foreground">
              Manage your store products and NFT-enabled merchandise
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={syncWithShopify}
              disabled={isSyncing}
            >
              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              Sync with Shopify
            </Button>
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Store className="h-4 w-4" />
                  Import from Shopify
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import Shopify Products</DialogTitle>
                  <DialogDescription>
                    Select products to import from your Shopify store
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {shopifyProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-4 p-4 rounded-lg border"
                      >
                        <div className="relative h-16 w-16 rounded overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{product.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-medium">{product.price}</span>
                            <Badge variant="outline">
                              {product.variants[0].inventory_quantity} in stock
                            </Badge>
                          </div>
                        </div>
                        <Button
                          onClick={() => importShopifyProduct(product)}
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Import
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <Dialog open={isNewProductDialogOpen} onOpenChange={setIsNewProductDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Create a new product and sync with Shopify
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="details">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    <TabsTrigger value="nft">NFT Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details">
                    <div className="grid gap-6">
                      <div 
                        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                          isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        {selectedImage ? (
                          <div className="relative aspect-square w-full max-w-[200px] mx-auto">
                            <img
                              src={selectedImage}
                              alt="Product preview"
                              className="rounded-lg object-cover w-full h-full"
                            />
                            <Button
                              variant="secondary"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => setSelectedImage(null)}
                            >
                              Change
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <Label
                              htmlFor="image-upload"
                              className="block text-sm font-medium mb-2"
                            >
                              Drag and drop an image, or click to upload
                            </Label>
                            <p className="text-xs text-muted-foreground mb-4">
                              PNG, JPG up to 5MB
                            </p>
                            <Button variant="secondary" className="gap-2">
                              <Upload className="h-4 w-4" />
                              Upload Image
                              <input
                                id="image-upload"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageUpload(file);
                                }}
                              />
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="title">Product Title</Label>
                        <Input id="title" placeholder="Enter product title" />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Enter product description" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="price">Price</Label>
                          <Input id="price" placeholder="$0.00" type="number" step="0.01" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="sku">SKU</Label>
                          <Input id="sku" placeholder="Enter SKU" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="inventory">
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="quantity">Initial Quantity</Label>
                        <Input id="quantity" type="number" min="0" placeholder="0" />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="lowStock">Low Stock Alert</Label>
                        <Input id="lowStock" type="number" min="0" placeholder="10" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Track Inventory</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable inventory tracking in Shopify
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="nft">
                    <div className="grid gap-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>NFC-Enabled</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable NFC verification for this product
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="nftContract">NFT Contract</Label>
                        <Input id="nftContract" placeholder="Enter contract address" />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="nftBenefits">NFT Benefits</Label>
                        <Textarea
                          id="nftBenefits"
                          placeholder="Describe the benefits of owning this NFT-enabled product"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={() => setIsNewProductDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Create & Sync</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 rounded-lg border"
              >
                <div className="relative h-16 w-16 rounded overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{product.title}</h3>
                    {product.hasNFC && (
                      <Badge variant="secondary" className="gap-1">
                        <Nfc className="h-3 w-3" />
                        NFC
                      </Badge>
                    )}
                    {product.inventory?.lowStock && (
                      <Badge variant="destructive" className="gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Low Stock
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium">{product.price}</span>
                    {product.shopifyId && (
                      <Badge variant="outline" className="text-xs gap-1">
                        <Store className="h-3 w-3" />
                        Synced
                      </Badge>
                    )}
                    {product.inventory && (
                      <span className="text-sm text-muted-foreground">
                        {product.inventory.available} in stock
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}