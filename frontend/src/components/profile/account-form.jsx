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
import { useParams } from "react-router";
export function AccountForm() {
  const [isEditable, setIsEditable] = useState(false);
  const [ispasswordEditable, setisPasswordEditable] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [dataPresent, setDataPresent] = useState(false);

  const { userId } = useParams();
  const userid = userId.replace(":", "");
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      username: username,
      name: fullName,
      email: email,
    },
  });

  //calling backend api for data
  useEffect(() => {
    const dataFetcher = async () => {
      const data = await authService.findUserHandler(userid);
      if (data) {
        const neededAttribute = ["email", "username", "fullname"];
        for (const key in data.data) {
          if (neededAttribute.includes(key)) {
            setValue(`${key}`, data.data[key]);

            setDataPresent(true);
          }
        }
      }
    };
    dataFetcher();
  }, [userId]);

  const onSubmit = async (values) => {
    let payload = [];
    // loop the values and extract the data
    for (const key in values) {
      if (key !== watch(`${key}`)) {
        const userId = userid;
        const operation = key;
        const newData = values[key];

        //populate the payload
        payload.push(userId, operation, newData);
      }
    }
    const data = await authService.updateProfileInfo(payload);
    if (data.success == true) {
      setIsEditable((prev) => !prev);
    }
  };

  if (dataPresent === true) {
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
              render={({ field }) => <Input {...field} id="username" />}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Controller
              name="name"
              control={control}
              disabled={!isEditable}
              render={({ field }) => <Input {...field} id="name" />}
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
                <Input {...field} id="email" type="email" />
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
}
