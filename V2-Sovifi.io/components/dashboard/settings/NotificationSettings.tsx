'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Fan Activity</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about new followers and interactions
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sales Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for new purchases
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Community Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Stay informed about community discussions
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive tips and suggestions for promotion
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email digests of important updates
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <Button variant="outline" className="w-full gap-2">
            <Bell className="h-4 w-4" />
            Test Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}