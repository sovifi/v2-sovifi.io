'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useContractRead } from '@/hooks/useContractRead';
import { useWallet } from '@/hooks/useWallet';
import { Loader2, Wallet, AlertCircle } from 'lucide-react';

interface Contract {
  name: string;
  address: string;
  blockchain: string;
  revealed: boolean;
}

const contracts: Contract[] = [
  {
    name: 'Clubhouse',
    address: '0xe1JL_b40612',
    blockchain: 'Ethereum',
    revealed: false,
  },
];

export function ContractOverview() {
  const { ownedNFTs, totalSupply, isLoading: contractLoading, error: contractError } = useContractRead(contracts[0].address);
  const { address, balance, isLoading: walletLoading, error: walletError } = useWallet();

  if (contractLoading || walletLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (contractError || walletError) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {contractError?.message || walletError?.message || 'Failed to load data. Please try again.'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Wallet Balance</h3>
          <div className="flex items-center gap-2 mt-2">
            <Wallet className="h-4 w-4 text-primary" />
            <p className="text-2xl font-bold">
              {balance ? `${balance.displayValue} ${balance.symbol}` : '0'}
            </p>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Total Supply</h3>
          <p className="text-2xl font-bold mt-2">{totalSupply}</p>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Owned NFTs</h3>
          <p className="text-2xl font-bold mt-2">{ownedNFTs.length}</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Contract Status</h3>
          <div className="mt-2">
            <Badge variant="secondary">Active</Badge>
          </div>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Blockchain</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow key={contract.address}>
                <TableCell className="font-medium">{contract.name}</TableCell>
                <TableCell className="font-mono">{contract.address}</TableCell>
                <TableCell>{contract.blockchain}</TableCell>
                <TableCell>
                  <Badge variant={contract.revealed ? 'default' : 'secondary'}>
                    {contract.revealed ? 'Revealed' : 'Hidden'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}