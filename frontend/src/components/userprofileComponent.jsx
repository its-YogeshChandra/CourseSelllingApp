"use client";

import { useState } from "react";
import {
  LogOut,
  User,
  CreditCard,
  Eye,
  EyeOff,
  Phone,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import authService from "../services/auth.js";
import { useEffect } from "react";

function SubscriptionsSection() {
  const [selectedPlan, setSelectedPlan] = useState("premium");

  const plans = [
    {
      id: "basic",
      name: "Basic Access",
      price: "$19",
      period: "/month",
      features: [
        "Access to 50+ courses",
        "Standard video quality",
        "Community forum access",
        "Mobile app access",
        "Course completion certificates",
      ],
      popular: false,
    },
    {
      id: "premium",
      name: "Premium Learning",
      price: "$39",
      period: "/month",
      features: [
        "Access to 200+ courses",
        "HD video quality",
        "Priority support",
        "Downloadable resources",
        "Live Q&A sessions",
        "Career guidance",
        "Project reviews",
      ],
      popular: true,
    },
    {
      id: "pro",
      name: "Pro Mastery",
      price: "$79",
      period: "/month",
      features: [
        "Access to all 500+ courses",
        "4K video quality",
        "1-on-1 mentoring sessions",
        "Exclusive masterclasses",
        "Industry certifications",
        "Job placement assistance",
        "Lifetime access to completed courses",
      ],
      popular: false,
    },
  ];

  const courseHistory = [
    {
      date: "Dec 15, 2024",
      course: "Advanced React Development",
      amount: "$0.00",
      status: "Included",
      type: "Premium Plan",
    },
    {
      date: "Dec 1, 2024",
      course: "Premium Learning Plan",
      amount: "$39.00",
      status: "Paid",
      type: "Subscription",
    },
    {
      date: "Nov 20, 2024",
      course: "JavaScript Fundamentals",
      amount: "$0.00",
      status: "Included",
      type: "Premium Plan",
    },
    {
      date: "Nov 1, 2024",
      course: "Premium Learning Plan",
      amount: "$39.00",
      status: "Paid",
      type: "Subscription",
    },
    {
      date: "Oct 15, 2024",
      course: "Python for Beginners",
      amount: "$29.99",
      status: "Paid",
      type: "Individual Course",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">
          Learning Subscriptions
        </h1>
        <p className="text-slate-600">
          Manage your learning plan, access courses, and track your educational
          journey.
        </p>
      </div>

      {/* Current Plan */}
      <Card className="shadow-lg shadow-blue-100/50 border-blue-100/50 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-800">
            Current Learning Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-800">
                Premium Learning
              </h3>
              <p className="text-slate-600">
                $39.00 per month • Next billing: Jan 1, 2025
              </p>
              <p className="text-sm text-blue-600">
                Access to 200+ courses with HD quality
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                Upgrade Plan
              </Button>
              <Button
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                Cancel Subscription
              </Button>
            </div>
          </div>

          {/* Learning Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
            <div className="text-center p-4 bg-blue-50/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-slate-600">Courses Completed</div>
            </div>
            <div className="text-center p-4 bg-green-50/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-slate-600">Hours Learned</div>
            </div>
            <div className="text-center p-4 bg-purple-50/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">18</div>
              <div className="text-sm text-slate-600">Certificates Earned</div>
            </div>
            <div className="text-center p-4 bg-orange-50/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">92%</div>
              <div className="text-sm text-slate-600">Completion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card className="shadow-lg shadow-blue-100/50 border-blue-100/50 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-800">Learning Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-6 rounded-xl border-2 transition-all duration-200 ${
                  plan.popular
                    ? "border-blue-300 bg-blue-50/50 shadow-lg"
                    : "border-slate-200 bg-white hover:border-blue-200"
                } ${
                  selectedPlan === plan.id
                    ? "ring-2 ring-blue-400 ring-offset-2"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-slate-800">
                    {plan.name}
                  </h3>
                  <div className="space-y-1">
                    <span className="text-3xl font-bold text-slate-800">
                      {plan.price}
                    </span>
                    <span className="text-slate-600">{plan.period}</span>
                  </div>

                  <ul className="space-y-2 text-sm text-slate-600 text-left">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      selectedPlan === plan.id
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {selectedPlan === plan.id ? "Current Plan" : "Select Plan"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Course Access & History */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Course Access */}
        <Card className="shadow-lg shadow-blue-100/50 border-blue-100/50 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">
              Recent Course Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">JS</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">
                    Advanced JavaScript Concepts
                  </h4>
                  <p className="text-sm text-slate-600">
                    Progress: 75% • 2 hours remaining
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Continue
                </Button>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50/50 rounded-lg">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">PY</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">
                    Python Data Science
                  </h4>
                  <p className="text-sm text-slate-600">
                    Progress: 100% • Completed
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  Review
                </Button>
              </div>

              <div className="flex items-center gap-4 p-4 bg-purple-50/50 rounded-lg">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">UI</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">
                    UI/UX Design Fundamentals
                  </h4>
                  <p className="text-sm text-slate-600">
                    Progress: 45% • 8 hours remaining
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  Continue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purchase History */}
        <Card className="shadow-lg shadow-blue-100/50 border-blue-100/50 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">Purchase History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 p-4 bg-slate-50/50 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="font-medium text-slate-800">
                        {item.course}
                      </div>
                      <div className="text-sm text-slate-600">
                        {item.date} • {item.type}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-slate-800">
                        {item.amount}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Included"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                View All Purchases
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default function UserComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
  });
  const [activeSection, setActiveSection] = useState("profile");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const navigationItems = [
    {
      title: "User Profile",
      icon: User,
      isActive: activeSection === "profile",
      onClick: () => setActiveSection("profile"),
    },
    {
      title: "Subscriptions",
      icon: CreditCard,
      isActive: activeSection === "subscriptions",
      onClick: () => setActiveSection("subscriptions"),
    },
  ];

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data
    const datafunction = async () => {
      const userdata = await authService.findUserHandler();
      if (userdata && userdata.data.success) {
        setUserData(userdata.data);
      }
    };
    datafunction();
  }, []);
  if (userData !== null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 font-inter">
        {/* Background decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Clouds */}
          <div className="absolute top-10 left-10 w-20 h-12 bg-blue-100/30 rounded-full blur-sm"></div>
          <div className="absolute top-20 right-20 w-16 h-8 bg-blue-100/20 rounded-full blur-sm"></div>
          <div className="absolute top-40 left-1/4 w-24 h-14 bg-slate-100/40 rounded-full blur-sm"></div>

          {/* Whale illustration at bottom */}
          <div className="absolute bottom-10 right-10 w-32 h-20 opacity-10">
            <svg viewBox="0 0 100 60" className="w-full h-full fill-blue-300">
              <ellipse cx="30" cy="40" rx="25" ry="15" />
              <ellipse cx="60" cy="35" rx="35" ry="20" />
              <path d="M20 35 Q15 30 10 35 Q15 40 20 35" />
              <circle cx="45" cy="30" r="2" fill="blue" />
              <path d="M70 20 Q75 15 80 20 Q85 15 90 20 Q85 25 80 20 Q75 25 70 20" />
            </svg>
          </div>
        </div>

        <SidebarProvider>
          <Sidebar className="border-r border-blue-100/50 bg-white/80 backdrop-blur-sm">
            <SidebarHeader className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800">Profile</h2>
                  <p className="text-sm text-slate-500">Manage account</p>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent className="px-4">
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.isActive}
                      onClick={item.onClick}
                      className="w-full justify-start gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-blue-50 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700 data-[active=true]:shadow-sm cursor-pointer"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="p-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full justify-start gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="flex-1">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-blue-100/50 bg-white/80 backdrop-blur-sm px-6">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-slate-800">
                  {activeSection === "profile"
                    ? "User Profile"
                    : "Learning Dashboard"}
                </h1>
              </div>
            </header>

            <main className="flex-1 p-6 lg:p-8 space-y-8">
              {activeSection === "profile" ? (
                <>
                  {/* Header */}
                  <div className="space-y-2">
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">
                      User profile
                    </h1>
                    <p className="text-slate-600">
                      Manage your details, view your tier status and change your
                      password.
                    </p>
                  </div>

                  {/* User Info Card */}
                  <Card className="shadow-lg shadow-blue-100/50 border-blue-100/50 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Avatar className="w-16 h-16 ring-4 ring-blue-100">
                          <AvatarImage
                            src="/placeholder.svg?height=64&width=64"
                            alt="User avatar"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white text-xl font-semibold">
                            JD
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold text-slate-800">
                            John Doe
                          </h3>
                          <p className="text-slate-600">+1 (555) 123-4567</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-8 lg:grid-cols-2">
                    {/* General Information */}
                    <Card className="shadow-lg shadow-blue-100/50 border-blue-100/50 bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-slate-800">
                          General Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label
                              htmlFor="firstName"
                              className="text-slate-700 font-medium"
                            >
                              First name
                            </Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) =>
                                handleInputChange("firstName", e.target.value)
                              }
                              className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="lastName"
                              className="text-slate-700 font-medium"
                            >
                              Last name
                            </Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                              }
                              className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                            />
                          </div>
                        </div>
                        <Button
                          disabled
                          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500"
                        >
                          Update
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Security */}
                    <Card className="shadow-lg shadow-blue-100/50 border-blue-100/50 bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-slate-800">
                          Security
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium">
                              Email
                            </Label>
                            <Input
                              value="john.doe@example.com"
                              disabled
                              className="bg-slate-50 text-slate-600"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium">
                              Password
                            </Label>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                value="••••••••••••"
                                disabled
                                className="bg-slate-50 text-slate-600 pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4 text-slate-400" />
                                ) : (
                                  <Eye className="w-4 h-4 text-slate-400" />
                                )}
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium">
                              Phone number
                            </Label>
                            <Input
                              value="+1 (555) 123-4567"
                              disabled
                              className="bg-slate-50 text-slate-600"
                            />
                          </div>
                        </div>

                        <Separator className="bg-slate-200" />

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            variant="outline"
                            className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                          >
                            <Lock className="w-4 h-4 mr-2" />
                            Change password
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Change phone number
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                <SubscriptionsSection />
              )}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    );
  }
}
