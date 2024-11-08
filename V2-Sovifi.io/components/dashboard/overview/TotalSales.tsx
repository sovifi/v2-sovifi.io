'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function TotalSales() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">SALES</CardTitle>
        <Select defaultValue="nft">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nft">NFT</SelectItem>
            <SelectItem value="merch">Merch</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-bold">$125,319</h2>
            <span className="text-sm font-medium text-green-500">+55%</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Compared to previous period
          </p>
        </div>
      </CardContent>
    </Card>
  );
}