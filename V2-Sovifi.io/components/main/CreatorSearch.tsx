'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Music2 } from 'lucide-react';
import type { Artist } from '@/types';

const SAMPLE_ARTISTS: Artist[] = [
  {
    id: '1',
    username: 'SoundScape',
    email: 'soundscape@example.com',
    isArtist: true,
    profileImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=60',
    genres: ['Electronic', 'Ambient'],
  },
  {
    id: '2',
    username: 'BeatMaster',
    email: 'beatmaster@example.com',
    isArtist: true,
    profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60',
    genres: ['Hip-Hop', 'Beats'],
  },
  {
    id: '3',
    username: 'VocalVibe',
    email: 'vocalvibe@example.com',
    isArtist: true,
    profileImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60',
    genres: ['Pop', 'R&B'],
  },
];

export default function CreatorSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Artist[]>(SAMPLE_ARTISTS);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Filter artists based on search query
    const filtered = SAMPLE_ARTISTS.filter((artist) =>
      artist.username.toLowerCase().includes(query.toLowerCase()) ||
      artist.genres?.some((genre) =>
        genre.toLowerCase().includes(query.toLowerCase())
      )
    );
    setResults(filtered);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Discover Creators
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Search by name or genre..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1"
          />
          <Button variant="secondary">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {results.map((artist) => (
            <div
              key={artist.id}
              className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={artist.profileImage} />
                <AvatarFallback>
                  <Music2 className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{artist.username}</h3>
                <p className="text-sm text-muted-foreground">
                  {artist.genres?.join(', ')}
                </p>
              </div>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}