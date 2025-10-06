import React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export function AccountForm() {
  const { profile, updateNested } = useProfile();
  const { toast } = useToast();

  const [name, setName] = useState(profile.user.name);
  const [email, setEmail] = useState(profile.user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  async function onSaveProfile(e) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    updateNested("user", { name, email });
    setSaving(false);
    toast({
      title: "Profile updated",
      description: "Your account details have been saved.",
    });
  }

  async function onChangePassword(e) {
    e.preventDefault();
    if (newPassword.length < 8 || newPassword !== confirmPassword) {
      toast({
        title: "Check your password",
        description: "Passwords must match and be at least 8 characters.",
        variant: "destructive",
      });
      return;
    }
    setChangingPassword(true);
    await new Promise((r) => setTimeout(r, 600));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setChangingPassword(false);
    toast({
      title: "Password changed",
      description: "Your password was updated successfully.",
    });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSaveProfile} className="grid grid-cols-1 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            autoComplete="name"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit" disabled={saving} aria-busy={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>

      <Separator />

      <form
        onSubmit={onChangePassword}
        className="grid grid-cols-1 gap-4"
        aria-labelledby="change-password"
      >
        <h3 id="change-password" className="text-sm font-medium">
          Change password
        </h3>
        <div className="grid gap-2">
          <Label htmlFor="current-password">Current password</Label>
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="new-password">New password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              autoComplete="new-password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Button
            type="submit"
            variant="outline"
            disabled={changingPassword}
            aria-busy={changingPassword}
          >
            {changingPassword ? "Updating..." : "Update password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
