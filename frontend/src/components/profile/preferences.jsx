import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function Preferences() {
  const { profile, updateNested } = useState()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 rounded-md border p-3">
        <div>
          <Label htmlFor="email-updates" className="font-medium">
            Email updates
          </Label>
          <p className="text-sm text-muted-foreground">Receive product updates and billing notices.</p>
        </div>
        <Switch
          id="email-updates"
          checked={profile.preferences.emailUpdates}
          onCheckedChange={(v) => updateNested("preferences", { emailUpdates: v })}
          aria-label="Toggle email updates"
        />
      </div>
    </div>
  )
}
