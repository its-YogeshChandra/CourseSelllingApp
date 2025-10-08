import React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { EyeOff, Eye } from "lucide-react";

export function PasswordSection() {
  const [isPasswordEditable, setisPasswordEditable] = useState(false);
  const [showPassword, setShowPassword] = useState("password");
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      currentPassword: "random user one",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onChangePassword = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onChangePassword)}
      className="grid grid-cols-1 gap-4"
      aria-labelledby="change-password"
    >
      <h3 id="change-password" className="text-sm font-medium">
        Change password
      </h3>

      <div className="grid gap-2">
        <Label htmlFor="current-password">Current password</Label>
        <div className="w-full h-auto flex gap-x-3">
          <Controller
            name="currentPassword"
            control={control}
            disabled={true}
            rules={{ required: " current Password can't be empty" }}
            render={({ field }) => (
              <Input
                {...field}
                id="currentpassword"
                type={showPassword}
                autoComplete="current-password"
              />
            )}
          />
          {showPassword == "password" ? (
            <button
              onClick={() => {
                setShowPassword("text");
              }}
            >
              <EyeOff className="pt-1.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                setShowPassword("password");
              }}
            >
              <Eye className="pt-1.5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="new-password">New password</Label>
          <Controller
            name="newPassword"
            control={control}
            disabled={!isPasswordEditable}
            rules={{ required: " new password can't be empty" }}
            render={({ field }) => (
              <Input
                {...field}
                id="new-password"
                type="password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
            )}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm new password</Label>
          <Controller
            name="confirmPassword"
            control={control}
            disabled={!isPasswordEditable}
            rules={{ required: "confirm-password can't be empty" }}
            render={({ field }) => (
              <Input
                {...field}
                id="confirm-password"
                type="password"
                placeholder="Re-enter new password"
                autoComplete="new-password"
              />
            )}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-x-2">
        {isPasswordEditable ? (
          <Button
            type="button"
            onClick={() => {
              setisPasswordEditable((prev) => !prev);
            }}
          >
            Cancel
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => {
              setisPasswordEditable((prev) => !prev);
            }}
          >
            Edit
          </Button>
        )}

        {isPasswordEditable ? (
          <Button type="submit">Update Password</Button>
        ) : null}
      </div>
    </form>
  );
}
