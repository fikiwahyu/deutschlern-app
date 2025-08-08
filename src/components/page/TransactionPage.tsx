import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription } from "../ui/alert";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  Shield,
  Star,
} from "lucide-react";
import { toast } from "sonner";

export function TransactionPage() {
  const [currentPlan, setCurrentPlan] = useState("pro");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      billing: "month",
      features: [
        "100 Flashcards",
        "5 Practice Sessions",
        "Basic Analytics",
        "Community Support",
      ],
      current: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 19,
      billing: "month",
      features: [
        "Unlimited Flashcards",
        "Unlimited Practice",
        "Advanced Analytics",
        "AI Simulations",
        "Priority Support",
        "Offline Access",
      ],
      current: true,
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 99,
      billing: "month",
      features: [
        "Everything in Pro",
        "Team Management",
        "Custom Content",
        "API Access",
        "White Label",
        "Dedicated Support",
      ],
      current: false,
    },
  ];

  const transactions = [
    {
      id: "TXN-001",
      date: "2024-12-15",
      description: "Pro Plan - Monthly",
      amount: 19.0,
      status: "completed",
      method: "Visa •••• 4242",
    },
    {
      id: "TXN-002",
      date: "2024-11-15",
      description: "Pro Plan - Monthly",
      amount: 19.0,
      status: "completed",
      method: "Visa •••• 4242",
    },
    {
      id: "TXN-003",
      date: "2024-10-15",
      description: "Pro Plan - Monthly",
      amount: 19.0,
      status: "completed",
      method: "Visa •••• 4242",
    },
    {
      id: "TXN-004",
      date: "2024-09-15",
      description: "Pro Plan - Monthly",
      amount: 19.0,
      status: "failed",
      method: "Visa •••• 4242",
    },
  ];

  const handleUpgrade = (planId: string) => {
    toast.success(`Upgraded to ${planId} plan!`);
  };

  const handleDownloadInvoice = (transactionId: string) => {
    toast.success("Invoice downloaded!");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Billing & Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing information
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download All Invoices
        </Button>
      </div>

      <Tabs defaultValue="subscription" className="w-full">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Current Plan
              </CardTitle>
              <CardDescription>
                You are currently on the Pro plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h3 className="text-lg">Pro Plan</h3>
                  <p className="text-muted-foreground">Monthly billing</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl">$19</div>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Next billing: Jan 15, 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />
                  <span>Visa •••• 4242</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Cancel Subscription</Button>
                <Button variant="outline">Change Plan</Button>
              </div>
            </CardContent>
          </Card>

          {/* Plan Options */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${plan.current ? "border-primary" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                {plan.current && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-3 right-4"
                  >
                    Current Plan
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {plan.name}
                    {plan.current && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </CardTitle>
                  <div className="text-3xl">
                    ${plan.price}
                    <span className="text-lg text-muted-foreground">
                      /{plan.billing}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.current ? "outline" : "default"}
                    disabled={plan.current}
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    {plan.current
                      ? "Current Plan"
                      : plan.price === 0
                      ? "Downgrade"
                      : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View and download your past invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(transaction.status)}
                      <div>
                        <h4 className="text-sm">{transaction.description}</h4>
                        <p className="text-xs text-muted-foreground">
                          {transaction.date} • {transaction.method}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm">
                          ${transaction.amount.toFixed(2)}
                        </div>
                        <Badge
                          className={getStatusColor(transaction.status)}
                          variant="secondary"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadInvoice(transaction.id)}
                        disabled={transaction.status !== "completed"}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Invoice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs">
                    VISA
                  </div>
                  <div>
                    <h4 className="text-sm">•••• •••• •••• 4242</h4>
                    <p className="text-xs text-muted-foreground">
                      Expires 12/26
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Default</Badge>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    Remove
                  </Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your payment information is encrypted and secure. We use
              industry-standard security measures to protect your data.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}
