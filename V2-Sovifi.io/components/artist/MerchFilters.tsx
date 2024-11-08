'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Search, SlidersHorizontal, Shirt, Disc, Tag, Nfc } from 'lucide-react';
import { useState } from 'react';

export default function MerchFilters() {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search merchandise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-2">
              <div className="space-y-4">
                <div>
                  <Label>Price Range ($)</Label>
                  <div className="pt-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={200}
                      step={10}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="space-y-2">
                  <Label>Category</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Shirt className="h-4 w-4" />
                      Apparel
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Disc className="h-4 w-4" />
                      Vinyl
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Tag className="h-4 w-4" />
                      Limited
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Nfc className="h-4 w-4" />
                      NFC
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm">
          New Arrivals
        </Button>
        <Button variant="outline" size="sm">
          Price: Low to High
        </Button>
        <Button variant="outline" size="sm">
          Price: High to Low
        </Button>
        <Button variant="outline" size="sm">
          Best Sellers
        </Button>
      </div>
    </div>
  );
}