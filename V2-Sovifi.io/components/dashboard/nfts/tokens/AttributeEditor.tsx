'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface Attribute {
  name: string;
  value: string;
  rarity: number;
}

interface AttributeEditorProps {
  attributes: Attribute[];
  onChange: (attributes: Attribute[]) => void;
}

export function AttributeEditor({ attributes, onChange }: AttributeEditorProps) {
  const [newAttribute, setNewAttribute] = useState<Attribute>({
    name: '',
    value: '',
    rarity: 50,
  });

  const addAttribute = () => {
    if (newAttribute.name && newAttribute.value) {
      onChange([...attributes, newAttribute]);
      setNewAttribute({ name: '', value: '', rarity: 50 });
    }
  };

  const removeAttribute = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    onChange(newAttributes);
  };

  const updateAttribute = (index: number, updates: Partial<Attribute>) => {
    const newAttributes = attributes.map((attr, i) =>
      i === index ? { ...attr, ...updates } : attr
    );
    onChange(newAttributes);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {attributes.map((attr, index) => (
          <Card key={index} className="p-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{attr.name}</h4>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAttribute(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Value</Label>
                <Input
                  value={attr.value}
                  onChange={(e) =>
                    updateAttribute(index, { value: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Rarity ({attr.rarity}%)</Label>
                <Slider
                  value={[attr.rarity]}
                  onValueChange={([value]) =>
                    updateAttribute(index, { rarity: value })
                  }
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <h4 className="font-medium">Add New Attribute</h4>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={newAttribute.name}
                onChange={(e) =>
                  setNewAttribute({ ...newAttribute, name: e.target.value })
                }
                placeholder="e.g., Background"
              />
            </div>
            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                value={newAttribute.value}
                onChange={(e) =>
                  setNewAttribute({ ...newAttribute, value: e.target.value })
                }
                placeholder="e.g., Blue"
              />
            </div>
            <div className="space-y-2">
              <Label>Rarity ({newAttribute.rarity}%)</Label>
              <Slider
                value={[newAttribute.rarity]}
                onValueChange={([value]) =>
                  setNewAttribute({ ...newAttribute, rarity: value })
                }
                min={0}
                max={100}
                step={1}
              />
            </div>
            <Button onClick={addAttribute} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Attribute
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}