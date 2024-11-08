'use client';

import { useState } from 'react';
import { StoreOverview } from '@/components/dashboard/store/StoreOverview';
import { ShopifyConnect } from '@/components/dashboard/store/ShopifyConnect';
import { ProductManagement } from '@/components/dashboard/store/ProductManagement';
import { RecentOrders } from '@/components/dashboard/store/RecentOrders';
import { InventoryAlerts } from '@/components/dashboard/store/InventoryAlerts';

export default function StoreDashboardPage() {
  const [isShopifyConnected, setIsShopifyConnected] = useState(false);

  return (
    <div className="space-y-8 p-8">
      {!isShopifyConnected ? (
        <ShopifyConnect onConnect={() => setIsShopifyConnected(true)} />
      ) : (
        <>
          <h1 className="text-3xl font-bold">Store Dashboard</h1>
          <StoreOverview />
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
            <ProductManagement />
            <div className="space-y-8">
              <RecentOrders />
              <InventoryAlerts />
            </div>
          </div>
        </>
      )}
    </div>
  );
}