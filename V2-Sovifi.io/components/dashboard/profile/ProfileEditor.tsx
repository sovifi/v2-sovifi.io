'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Loader2, ExternalLink } from 'lucide-react';

export default function ProfileEditor() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Implement profile update logic
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleViewProfile = () => {
    router.push(`/artist/${user?.id || '1'}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button type="button" variant="outline" className="gap-2">
              <Camera className="h-4 w-4" />
              Change Profile Photo
            </Button>
            <Button type="button" variant="outline" className="gap-2">
              <Camera className="h-4 w-4" />
              Change Cover Photo
            </Button>
          </div>
        </div>
        <Button variant="outline" onClick={handleViewProfile} className="gap-2">
          View Public Profile
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="artistName">Artist Name</Label>
          <Input id="artistName" defaultValue="SoundScape" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            defaultValue="Electronic music producer and visual artist exploring new soundscapes"
            rows={4}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="genres">Genres</Label>
          <Input id="genres" defaultValue="Electronic, Ambient, Experimental" />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Verified Artist</Label>
            <p className="text-sm text-muted-foreground">
              Display verification badge on your profile
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Changes
      </Button>
    </form>
  );
}