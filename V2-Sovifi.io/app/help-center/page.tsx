import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { HelpCircle, Book, MessageCircle, FileText } from 'lucide-react';

export default function HelpCenterPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers to common questions and learn how to use our platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <Book className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="mb-2">Getting Started</CardTitle>
            <p className="text-sm text-muted-foreground">
              Learn the basics of using our platform
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <FileText className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="mb-2">Guides</CardTitle>
            <p className="text-sm text-muted-foreground">
              Detailed tutorials and how-to articles
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <HelpCircle className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="mb-2">FAQs</CardTitle>
            <p className="text-sm text-muted-foreground">
              Answers to common questions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <MessageCircle className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="mb-2">Support</CardTitle>
            <p className="text-sm text-muted-foreground">
              Get help from our team
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="wallet">Wallet & Transactions</TabsTrigger>
          <TabsTrigger value="nft">NFTs & Collections</TabsTrigger>
          <TabsTrigger value="account">Account & Security</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is-sovifi">
                  <AccordionTrigger>What is Sovifi?</AccordionTrigger>
                  <AccordionContent>
                    Sovifi is a Web3 music platform that connects artists with fans through NFTs and digital collectibles. Artists can create and sell unique digital assets while fans can support their favorite creators directly.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-to-start">
                  <AccordionTrigger>How do I get started?</AccordionTrigger>
                  <AccordionContent>
                    To get started, connect your Web3 wallet and create an account. You can then browse the marketplace, follow artists, and start collecting NFTs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="supported-wallets">
                  <AccordionTrigger>Which wallets are supported?</AccordionTrigger>
                  <AccordionContent>
                    We support major Web3 wallets including MetaMask, WalletConnect, and Coinbase Wallet. More wallet integrations are coming soon.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="connect-wallet">
                  <AccordionTrigger>How do I connect my wallet?</AccordionTrigger>
                  <AccordionContent>
                    Click the &quot;Connect Wallet&quot; button in the top right corner and select your preferred wallet. Follow the prompts to complete the connection.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="transaction-fees">
                  <AccordionTrigger>What are the transaction fees?</AccordionTrigger>
                  <AccordionContent>
                    Transaction fees vary depending on network conditions. We display all fees before you confirm any transaction.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nft" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="buy-nft">
                  <AccordionTrigger>How do I buy an NFT?</AccordionTrigger>
                  <AccordionContent>
                    Browse the marketplace, select an NFT you like, and click &quot;Buy Now&quot; or place a bid. Make sure your wallet is connected and has sufficient funds.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="create-nft">
                  <AccordionTrigger>Can I create my own NFTs?</AccordionTrigger>
                  <AccordionContent>
                    Yes, verified artists can create and mint their own NFTs. Apply for artist verification through your profile settings.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="account-security">
                  <AccordionTrigger>How secure is my account?</AccordionTrigger>
                  <AccordionContent>
                    We use industry-standard security measures and never store private keys. Enable two-factor authentication for additional security.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="verify-artist">
                  <AccordionTrigger>How do I get verified as an artist?</AccordionTrigger>
                  <AccordionContent>
                    Submit an artist verification request through your profile settings. We&apos;ll review your application and respond within 48 hours.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-6">
        <CardHeader>
          <CardTitle>Still need help?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-center text-muted-foreground">
            Our support team is available 24/7 to help you with any questions or issues.
          </p>
          <Button className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}