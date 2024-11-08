import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ConnectWallet } from "@thirdweb-dev/react";
import { client } from "@/lib/thirdweb/client";

interface ConnectWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConnectWalletDialog({ open, onOpenChange }: ConnectWalletDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Connect Your Wallet</DialogTitle>
        <DialogDescription>
          Choose your preferred wallet to connect to the platform.
        </DialogDescription>
        <div className="flex justify-center py-6">
          <ConnectWallet 
            client={client}
            theme="dark"
            btnTitle="Connect Wallet"
            modalSize="wide"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}