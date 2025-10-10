import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileHeader } from "@/components/profile/profile-header";
import { AccountForm } from "@/components/profile/account-form";
import { SubscriptionCard } from "@/components/profile/subscription-card";
import { PaymentMethods } from "@/components/profile/payment-methods";
import { Preferences } from "@/components/profile/preferences";
import authService from "../services/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../components/customComp/loaderAnimation";

export default function TestingProfile() {
  const { userId } = useParams();
  const userid = userId.replace(":", "");
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const dataLoader = async () => {
      const data = await authService.findUserHandler(userid);
      //update the sate using the data
      if (data.success == true) {
        const values = data.data;
        setUserData(values);
        
      }
    };
    dataLoader();
  }, []);
 if(!userData){
  return <Loader />
 } else{
  return (
    <main className="min-h-dvh mt-4 md:mt-8 sm:mt-10 max-sm:mt-10 font-inter">
      <section className="container mx-auto px-4 py-6 md:py-10">
        <div className="space-y-6">
          <Suspense>
            <ProfileHeader />
          </Suspense>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <Card className="md:col-span-7">
              <CardHeader>
                <CardTitle className="text-balance">Account</CardTitle>
              </CardHeader>
              <CardContent>
                <AccountForm />
              </CardContent>
            </Card>

            <div className="flex flex-col gap-6 md:col-span-5">
              <Card>
                <CardHeader>
                  <CardTitle className="text-balance">Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <SubscriptionCard />
                </CardContent>
              </Card>

              <Card id="payment-methods">
                <CardHeader>
                  <CardTitle className="text-balance">
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentMethods />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-balance">Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Preferences />
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />
          <p className="text-sm text-muted-foreground">
            Your data updates instantly and the layout remains stable during
            changes.
          </p>
        </div>
      </section>
    </main>
  );
}
}
