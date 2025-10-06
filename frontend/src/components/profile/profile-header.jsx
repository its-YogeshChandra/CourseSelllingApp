import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function ProfileHeader() {
  const [profile, setProfile] = useState({
    name: "random",
    avatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subscription: {
      status: "purchased",
    },
  });

  return (
    <header className="flex flex-col items-start justify-between gap-4 rounded-lg bg-card p-4 text-card-foreground md:flex-row md:items-center md:p-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 md:h-16 md:w-16">
          <AvatarImage
            src={profile.avatarUrl || undefined}
            alt={`${profile.name}'s profile picture`}
          />
          <AvatarFallback className="font-medium"> Random </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-xl font-semibold leading-tight text-pretty md:text-2xl">
            {profile.name}
          </h1>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
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
