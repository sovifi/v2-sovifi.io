import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Ticket,
  Gift,
  Music,
  Crown,
  MessageCircle,
  ShoppingBag,
  Star,
  Sparkles,
} from 'lucide-react';

const utilities = [
  {
    icon: Crown,
    title: 'IP Rights',
    description: 'Create merchandise and build your brand with your NFT',
  },
  {
    icon: Ticket,
    title: 'Priority Access',
    description: 'First access to concert tickets and skip the line at venues',
  },
  {
    icon: Gift,
    title: 'Exclusive Perks',
    description: 'Special merchandise drops and virtual goods',
  },
  {
    icon: MessageCircle,
    title: 'Community Access',
    description: 'Private Discord channels and direct artist interaction',
  },
  {
    icon: Music,
    title: 'Metaverse Access',
    description: 'Special access to Web3 and metaverse experiences',
  },
  {
    icon: ShoppingBag,
    title: 'Merchandise',
    description: 'Early access to limited edition merch drops',
  },
];

const rarities = [
  {
    title: 'Care Package',
    description: 'Receive 2 exclusive care packages annually with unique collectibles',
    icon: Gift,
  },
  {
    title: 'Meet & Greet',
    description: 'Unlimited lifetime access to meet & greet events',
    icon: Users,
  },
  {
    title: 'Free Tickets',
    description: 'Access to 2 free tickets to any shows for life',
    icon: Ticket,
  },
  {
    title: 'Ultra Rare',
    description: '30 special NFTs with unique perks like dinner with the band',
    icon: Star,
  },
];

export default function ClubPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=2000"
          alt="Club Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            SoundScape Club
          </h1>
        </div>
      </div>

      {/* Welcome Section */}
      <section className="container mx-auto py-16 px-4">
        <Card className="p-8 space-y-6">
          <h2 className="text-3xl font-bold">Welcome to SoundScape Club</h2>
          <p className="text-lg text-muted-foreground">
            SoundScape Club is a next generation fan club and community built around SoundScape and owned by YOU. Join us now to enjoy early ticket access, skip the line perks, exclusive merch, IP rights, meet n' greet raffles, private events attended by the band and much more. SoundScape Club is set apart from every other fan club on the planet with its revolutionary use of blockchain technology. What this means is that once you obtain your SoundScape Club NFT, you are in for life! If you ever decide to leave, you can transfer it to another fan or simply sell it. Lets get started and welcome to the club!
          </p>
          <Button size="lg" className="gap-2">
            <Sparkles className="h-5 w-5" />
            Purchase Club NFT
          </Button>
        </Card>
      </section>

      {/* Utility Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Club Utility</h2>
          <p className="text-lg text-muted-foreground mb-8">
            There are many benefits to owning a membership into SoundScape Club. First and foremost, you own the IP rights to your specific NFT. What this means is we encourage you to make merchandise, start bands, brands and businesses with your NFT. Get creative and fly your flag. Also, all memberships will include Metaverse access, Web3 sneak peeks, first dibs on concert tickets, giveaways, airdrops IRL and virtually, no lines into SoundScape concerts (when applicable), discord authentication and much more.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {utilities.map((utility, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <utility.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{utility.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {utility.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Button size="lg" className="gap-2">
            <Sparkles className="h-5 w-5" />
            Purchase Club NFT
          </Button>
        </div>
      </section>

      {/* Community Section */}
      <section className="container mx-auto py-16 px-4">
        <Card className="p-8 space-y-6">
          <h2 className="text-3xl font-bold">Join Our Community</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
              <p className="text-lg text-muted-foreground">
                Connect with fellow fans in our exclusive Discord community. Engage in real-time conversations, participate in exclusive events, and get direct access to the band. Our Discord server is the central hub for all club activities, announcements, and special opportunities.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <span>Real-time chat with other fans</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Private channels with the band</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  <span>Exclusive giveaways and contests</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <Image
                src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800"
                alt="Discord Community"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
          <Button size="lg" className="gap-2">
            <Sparkles className="h-5 w-5" />
            Purchase Club NFT
          </Button>
        </Card>
      </section>

      {/* Rarities Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Rarities</h2>
          <p className="text-lg text-muted-foreground mb-8 uppercase">
            Scattered amongst the NFTs there are some very special ones out there that come with rare perks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {rarities.map((rarity, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <rarity.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{rarity.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {rarity.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Button size="lg" className="gap-2">
            <Sparkles className="h-5 w-5" />
            Purchase Club NFT
          </Button>
        </div>
      </section>
    </div>
  );
}