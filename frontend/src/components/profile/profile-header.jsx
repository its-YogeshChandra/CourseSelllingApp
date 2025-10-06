import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function ProfileHeader() {
  const [profile , setProfile] = useState()
  const initials = profile.user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="flex flex-col items-start justify-between gap-4 rounded-lg bg-card p-4 text-card-foreground md:flex-row md:items-center md:p-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 md:h-16 md:w-16">
          <AvatarImage
            src={profile.user.avatarUrl || undefined}
            alt={`${profile.user.name}'s profile picture`}
          />
          <AvatarFallback className="font-medium">{initials}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-xl font-semibold leading-tight text-pretty md:text-2xl">
            {profile.user.name}
          </h1>
          <p className="text-sm text-muted-foreground">{profile.user.email}</p>
          <div className="mt-1">
            <Badge
              variant="outline"
              className="capitalize"
              aria-label={`Subscription status: ${profile.subscription.status}`}
            >
              {profile.subscription.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <Link href="#help" aria-label="Get help or support">
          <Button variant="secondary">Help</Button>
        </Link>
        <Button variant="ghost" aria-label="Logout">
          Logout
        </Button>
      </div>
    </header>
  );
}
