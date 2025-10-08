import React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { PasswordSection } from "../subCompnents/updatePasswordsection";
export function AccountForm() {
  const { profile, updateNested } = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [ispasswordEditable, setisPasswordEditable] = useState(false);
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

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      name: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setIsEditable((prev) => !prev);
  };

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <div className="grid gap-2">
          <Label htmlFor="name">Username</Label>
          <Controller
            name="username"
            control={control}
            disabled={!isEditable}
            rules={{ required: "username can't be empty" }}
            render={({ field }) => (
              <Input {...field} id="username" placeholder="username" />
            )}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Controller
            name="name"
            control={control}
            disabled={!isEditable}
            rules={{ required: " full name can't be empty" }}
            render={({ field }) => (
              <Input {...field} id="name" placeholder="Your full name" />
            )}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Controller
            name="email"
            control={control}
            disabled={!isEditable}
            rules={{ required: " email name can't be empty" }}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="youremail@gmail.com"
              />
            )}
          />
        </div>

        <div className="flex items-center justify-end gap-x-2">
          <div className="flex items-center justify-end">
            {isEditable ? (
              <Button
                type="button"
                onClick={() => {
                  setIsEditable((prev) => {
                    return !prev;
                  });
                }}
              >
                Cancel
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => {
                  setIsEditable((prev) => {
                    return !prev;
                  });
                }}
              >
                Edit
              </Button>
            )}
          </div>
          <div className="flex items-center justify-end gap-x-2">
            {isEditable ? <Button type="submit">Save Changes</Button> : null}
          </div>
        </div>
      </form>

      <Separator />
      <PasswordSection />
    </div>
  );
}
