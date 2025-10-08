import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
export function Preferences() {
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 rounded-md border p-3">
        <div>
          <Label htmlFor="email-updates" className="font-medium">
            Email updates
          </Label>
          <p className="text-sm text-muted-foreground">
            Receive product updates and billing notices.
          </p>
        </div>
        <Switch
          id="email-updates"
          checked={emailUpdates}
          onCheckedChange={() => setEmailUpdates((prev) => !prev)}
          aria-label="Toggle email updates"
        />
      </div>
    </div>
  );
}
