'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Ticket } from 'lucide-react';

interface UpcomingEventsProps {
  artistId: string;
}

const EVENTS = [
  {
    id: '1',
    title: 'Summer Music Festival',
    date: '2024-07-15',
    time: '8:00 PM',
    location: 'Central Park, New York',
    ticketsLeft: 245,
    type: 'Live Performance',
  },
  {
    id: '2',
    title: 'Virtual Meet & Greet',
    date: '2024-06-30',
    time: '7:00 PM',
    location: 'Online',
    ticketsLeft: 100,
    type: 'Virtual Event',
  },
  {
    id: '3',
    title: 'Album Launch Party',
    date: '2024-08-05',
    time: '9:00 PM',
    location: 'The Venue, Los Angeles',
    ticketsLeft: 150,
    type: 'Special Event',
  },
];

export default function UpcomingEvents({ artistId }: UpcomingEventsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-lg border bg-card space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {event.type}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Get Tickets
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4" />
                  <span>{event.ticketsLeft} tickets left</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>VIP Access Available</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}