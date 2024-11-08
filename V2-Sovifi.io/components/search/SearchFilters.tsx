'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export default function SearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 100]);

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Filters</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="type">
            <AccordionTrigger>Type</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="artists" />
                <Label htmlFor="artists">Artists</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="nfts" />
                <Label htmlFor="nfts">NFTs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="collections" />
                <Label htmlFor="collections">Collections</Label>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="music" />
                <Label htmlFor="music">Music</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="artwork" />
                <Label htmlFor="artwork">Artwork</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tickets" />
                <Label htmlFor="tickets">Event Tickets</Label>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100}
                step={1}
              />
              <div className="flex justify-between text-sm">
                <span>{priceRange[0]} ETH</span>
                <span>{priceRange[1]} ETH</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  );
}