'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SlidersHorizontal } from 'lucide-react';

export default function MarketplaceFilters() {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Price Range
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Filter by price</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value="all">
            <DropdownMenuRadioItem value="all">All Prices</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="under-1">Under 1 ETH</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="1-5">1-5 ETH</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="over-5">Over 5 ETH</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Recently Added
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value="recent">
            <DropdownMenuRadioItem value="recent">Recently Added</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price-low">Price: Low to High</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price-high">Price: High to Low</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="popular">Most Popular</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="sm">
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        More Filters
      </Button>
    </div>
  );
}