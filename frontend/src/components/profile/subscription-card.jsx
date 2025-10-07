import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link } from "react-router";
const PLANS = ["Basic", "Pro", "Premium"];

export function SubscriptionCard() {
  const [ profile, updateNested ] = useState({
    subscription: {
      status: "active",
    },
  });
  const [loadingPlan, setLoadingPlan] = useState(PLANS);

  // const statusColor = useMemo(() => {
  //   switch (profile.subscription.status) {
  //     case "active":
  //     case "trialing":
  //       return "outline";
  //     case "past_due":
  //       return "destructive";
  //     case "canceled":
  //     case "expired":
  //       return "secondary";
  //     default:
  //       return "outline";
  //   }
  // }, [profile.subscription]);

  const statusColor = "outline"
  async function changePlan(nextPlan) {
    setLoadingPlan(nextPlan);
    await new Promise((r) => setTimeout(r, 600));
    updateNested("subscription", { plan: nextPlan });
    setLoadingPlan(null);
    toast({
      title: "Plan updated",
      description: `Your subscription is now ${nextPlan}.`,
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge variant={statusColor} className="capitalize">
              {profile.subscription.status}
            </Badge>
          </div>
          <p className="text-sm">
            Current plan:{" "}
            <span className="font-medium">{profile.subscription.plan}</span>
          </p>
          {profile.subscription.renewalDate && (
            <p className="text-sm text-muted-foreground">
              Renews on{" "}
              {new Date(profile.subscription.renewalDate).toLocaleDateString()}
            </p>
          )}
        </div>
        <Link
          href="#payment-methods"
          className="text-sm underline underline-offset-4 text-foreground/80"
        >
          Manage payment methods
        </Link>
      </div>

      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Choose plan"
      >
        {PLANS.map((plan) => (
          <Button
            key={plan}
            size="sm"
            variant={profile.subscription.plan === plan ? "default" : "outline"}
            onClick={() => changePlan(plan)}
            disabled={loadingPlan !== null}
            aria-pressed={profile.subscription.plan === plan}
            aria-busy={loadingPlan === plan}
          >
            {loadingPlan === plan ? "Updating..." : plan}
          </Button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Upgrade or downgrade anytime. Changes take effect immediately.
      </p>
    </div>
  );
}
