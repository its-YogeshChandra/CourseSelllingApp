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
  const [courseName, setCourseName] = useState("javascript mastery ");
  const [isSubscribed, setisSubscribed] = useState(true);
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
          <p className="text-sm">Course :</p>
        </div>
      </div>

      <div
        className="  w-full h-max border rounded-xl shadow-sm p-2 flex flex-wrap items-center justify-evenly gap-3 "
        role="group"
        aria-label="Choose plan"
      >
        <span className="uppercase py-1 px-2 text-gray-800 shadow-sm flex gap-x-2 ">
          <NotepadText size={18} />
          {courseName}
        </span>
        <Button variant="outline">View</Button>
      </div>

      <Button variant="ghost" className="border" asChild>
        <Link href="/courses">Find more courses</Link>
      </Button>
    </div>
  );
}
