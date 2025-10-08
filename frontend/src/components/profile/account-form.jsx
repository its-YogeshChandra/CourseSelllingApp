import React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import authService from "../../services/auth";
import { PasswordSection } from "../subCompnents/updatePasswordsection";
export function AccountForm() {
  const [isEditable, setIsEditable] = useState(false);
  const [ispasswordEditable, setisPasswordEditable] = useState(false);

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

  const onSubmit = async (data) => {
    console.log(data);
    const response = await authService.updateProfileInfo(data);
    if (response.success == true) {
      setIsEditable((prev) => !prev);
    }
  };

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
