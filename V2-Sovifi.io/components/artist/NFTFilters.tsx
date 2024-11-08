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
import { Search, SlidersHorizontal, Music2, Image as ImageIcon, Ticket } from 'lucide-react';
import { useState } from 'react';

export default function NFTFilters() {
  const [priceRange, setPriceRange] = useState([0, 5]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search NFTs..."
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
                  <Label>Price Range (ETH)</Label>
                  <div className="pt-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={5}
                      step={0.1}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{priceRange[0]} ETH</span>
                      <span>{priceRange[1]} ETH</span>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="space-y-2">
                  <Label>Type</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Music2 className="h-4 w-4" />
                      Music
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Art
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Ticket className="h-4 w-4" />
                      Tickets
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
          Recently Added
        </Button>
        <Button variant="outline" size="sm">
          Price: Low to High
        </Button>
        <Button variant="outline" size="sm">
          Price: High to Low
        </Button>
        <Button variant="outline" size="sm">
          Most Popular
        </Button>
      </div>
    </div>
  );
}