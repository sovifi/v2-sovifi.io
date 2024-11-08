'use client';

import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileEditor from '@/components/dashboard/profile/ProfileEditor';
import CreatorClubSettings from '@/components/dashboard/profile/CreatorClubSettings';
import NFTCollectionManager from '@/components/dashboard/profile/NFTCollectionManager';
import MerchManager from '@/components/dashboard/profile/MerchManager';
import { Globe, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ProfileDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Public Profile</h1>
          <p className="text-muted-foreground">
            Manage your public-facing artist profile and Creator Club
          </p>
        </div>
        <Button asChild>
          <Link href={`/artist/${user?.id}`} target="_blank" className="gap-2">
            <Globe className="h-4 w-4" />
            View Public Profile
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Card>
        <Tabs defaultValue="profile" className="p-6">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="creator-club">Creator Club</TabsTrigger>
            <TabsTrigger value="nfts">NFTs</TabsTrigger>
            <TabsTrigger value="merch">Merch</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileEditor />
          </TabsContent>

          <TabsContent value="creator-club">
            <CreatorClubSettings />
          </TabsContent>

          <TabsContent value="nfts">
            <NFTCollectionManager />
          </TabsContent>

          <TabsContent value="merch">
            <MerchManager />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}