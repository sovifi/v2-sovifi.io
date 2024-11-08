'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Camera, Loader2 } from 'lucide-react';

export function ProfileSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Implement profile update logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="gap-2">
              <Camera className="h-4 w-4" />
              Change Photo
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
                defaultValue="Electronic music producer and visual artist exploring new soundscapes."
                rows={4}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" type="url" defaultValue="https://soundscape.com" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="genres">Genres</Label>
              <Input id="genres" defaultValue="Electronic, Ambient, Experimental" />
            </div>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}