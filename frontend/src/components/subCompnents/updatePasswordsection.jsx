import React from "react";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { EyeOff, Eye, NotepadText } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export function PasswordSection() {
  const [isPasswordEditable, setisPasswordEditable] = useState(false);
  const [showPassword, setShowPassword] = useState("password");
  const [password, setPassword] = useState("value");
  const [samePasswordError, setSamePasswordError] = useState({
    isError: false,
    message: "",
  });
  const [newPasswordError, setnewPasswordError] = useState({
    isError: false,
    message: "",
  });
  const [currentPasswordError, setcurrentPasswordError] = useState({
    isError: false,
    message: "",
  });

  const [confirmPasswordError, setconfirmPasswordError] = useState({
    isError: false,
    message: "",
  });

  const regexCheck = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,20}$"
  );

  const schema = z
    .object({
      currentPassword: z
        .string()
        .min(1, { message: "currentPassword can't be empty" }),
      newPassword: z
        .string()
        .regex(
          regexCheck,
          "Password must contain at least one uppercase, one lowercase, one number and one special character"
        ),
      confirmPassword: z.string().min(1,
      {message: "confirm password can't be empty"}),
    })
    .refine((val) => val.newPassword === val.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (errors.confirmPassword) {
      console.log("error is present")
      console.log(`error is ${errors.confirmPassword.message}`)
      setconfirmPasswordError((prev) => ({
        ...prev,
        isError: !prev.isError,
        message: errors.confirmPassword.message,
      }));

      // setTimeout(
      //   setconfirmPasswordError((prev) => ({
      //     ...prev,
      //     isError: !prev.isError,
      //     message: "",
      //   })),
      //   10000
      // );
    }
    if (errors.currentPassword) {
      setnewPasswordError();
    }
    if (errors.newPassword) {
    }
  }, [errors.currentPassword, errors.confirmPassword, errors.newPassword]);
  
  console.log(confirmPasswordError.message)

  const onCancelChange = () => {
    const keys = ["currentPassword", "newPassword", "confirmPassword"];
    keys.map((key) => setValue(`${key}`, ""));
    setisPasswordEditable((prev) => !prev);
  };
  const onChangePassword = (data) => {
    if (errors) console.log(data);
    setisPasswordEditable((prev) => !prev);
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
            disabled={!isPasswordEditable}
            render={({ field }) => (
              <Input
                {...field}
                id="current-password"
                type="password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
            )}
          />

          {/* {showPassword == "password" ? (
            <button
              type="button"
              onClick={() => {
                setShowPassword("text");
              }}
            >
              <EyeOff className="pt-1.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setShowPassword("password");
              }}
            >
              <Eye className="pt-1.5" />
            </button>
          )} */}
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="new-password">New password</Label>
          <Controller
            name="newPassword"
            control={control}
            disabled={!isPasswordEditable}
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
          {errors?.newPassword && <p> {errors.newPassword.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm new password</Label>
          <Controller
            name="confirmPassword"
            control={control}
            disabled={!isPasswordEditable}
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
         {errors?.confirmPassword && <p>{errors.confirmPassword.message}</p> }
        </div>
      </div>

      <div className="flex items-center justify-end gap-x-2">
        {isPasswordEditable ? (
          <Button
            type="button"
            onClick={() => {
              onCancelChange();
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
