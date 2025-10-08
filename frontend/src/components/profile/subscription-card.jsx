import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link } from "react-router";
const PLANS = ["Basic", "Pro", "Premium"];
import { NotepadText } from "lucide-react";

export function SubscriptionCard() {
  const [profile, updateNested] = useState({
    subscription: {
      status: "Lifetime",
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

  const statusColor = "outline";
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
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between ">
        <div className=" flex-col space-y-3">
          <div className="flex items-center gap-x-2">
            <span className="text-sm">Status:</span>
            <Badge variant={statusColor} className="capitalize">
              {profile.subscription.status}
            </Badge>
          </div>
          <p className="text-sm">
          Course :</p>
        </div>
      </div>

      <div
        className="  w-full h-max flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Choose plan"
      >
   <NotepadText/> 
   <span>{ }</span>       
             </div>

      <p className="text-xs text-muted-foreground">
        Upgrade or downgrade anytime. Changes take effect immediately.
      </p>
    </div>
  );
}
