'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNFTContract } from '@/hooks/useNFTContract';
import { toast } from 'sonner';
import { Loader2, Upload, Music2, Image as ImageIcon } from 'lucide-react';

interface CreateNFTDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateNFTDialog({ open, onOpenChange }: CreateNFTDialogProps) {
  const { mintNFT, isLoading } = useNFTContract();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'image' as 'image' | 'music',
    price: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    try {
      await mintNFT({
        ...formData,
        image: selectedFile,
      });
      toast.success('NFT created successfully');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to create NFT');
      console.error('Mint error:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New NFT</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>NFT Type</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={formData.type === 'image' ? 'default' : 'outline'}
                  className="flex-1 gap-2"
                  onClick={() => setFormData({ ...formData, type: 'image' })}
                >
                  <ImageIcon className="h-4 w-4" />
                  Image
                </Button>
                <Button
                  type="button"
                  variant={formData.type === 'music' ? 'default' : 'outline'}
                  className="flex-1 gap-2"
                  onClick={() => setFormData({ ...formData, type: 'music' })}
                >
                  <Music2 className="h-4 w-4" />
                  Music
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter NFT name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter NFT description"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Price (ETH)</Label>
              <Input
                type="number"
                step="0.000001"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.1"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Upload {formData.type === 'music' ? 'Audio' : 'Image'}</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept={formData.type === 'music' ? 'audio/*' : 'image/*'}
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {selectedFile ? selectedFile.name : `Click to upload ${formData.type}`}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create NFT'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}