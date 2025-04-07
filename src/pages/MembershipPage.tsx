
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MembershipPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribe = (plan: string, price: string) => {
    // Here you would redirect to a payment processor like Stripe
    toast({
      title: "Processing payment",
      description: `Redirecting to payment for ${plan} plan (${price})`,
    });
    
    // Simulate successful payment after 2 seconds
    setTimeout(() => {
      toast({
        title: "Payment successful!",
        description: `You are now subscribed to the ${plan} plan!`,
      });
      setSelectedPlan(plan);
    }, 2000);
  };

  const features = {
    basic: [
      "Join up to 5 communities",
      "Standard community features",
      "Basic chat functionality",
    ],
    premium: [
      "Join unlimited communities",
      "Priority support",
      "HD video calls",
      "No ads experience",
      "Custom profile themes",
    ],
    ultimate: [
      "All Premium features",
      "Create up to 10 communities",
      "VIP badge on profile",
      "Priority community recommendations",
      "Early access to new features",
      "Unlimited cloud storage",
    ],
  };

  return (
    <div className="container max-w-7xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Upgrade Your ComuChat Experience</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the plan that's right for you and unlock premium features to enhance your community experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <Card className={`border ${selectedPlan === 'Basic' ? 'border-community-purple ring-2 ring-community-purple' : ''}`}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Basic
              <Badge variant="outline">Free</Badge>
            </CardTitle>
            <CardDescription>For casual community members</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2">
              {features.basic.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className={`w-full ${selectedPlan === 'Basic' ? 'bg-gray-400' : 'bg-community-purple hover:bg-community-darkPurple'}`}
              onClick={() => setSelectedPlan('Basic')}
              disabled={selectedPlan === 'Basic'}
            >
              {selectedPlan === 'Basic' ? 'Current Plan' : 'Select Plan'}
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className={`border ${selectedPlan === 'Premium' ? 'border-community-purple ring-2 ring-community-purple' : ''}`}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Premium
              <Badge className="bg-community-purple">Popular</Badge>
            </CardTitle>
            <CardDescription>For active community members</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              <span className="text-3xl font-bold">$9.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2">
              {features.premium.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className={`w-full ${selectedPlan === 'Premium' ? 'bg-gray-400' : 'bg-community-purple hover:bg-community-darkPurple'}`}
              onClick={() => handleSubscribe('Premium', '$9.99')}
              disabled={selectedPlan === 'Premium'}
            >
              {selectedPlan === 'Premium' ? 'Current Plan' : 'Subscribe'}
            </Button>
          </CardFooter>
        </Card>

        {/* Ultimate Plan */}
        <Card className={`border ${selectedPlan === 'Ultimate' ? 'border-community-purple ring-2 ring-community-purple' : ''}`}>
          <CardHeader className="relative">
            <div className="absolute -top-4 -right-4">
              <Badge className="bg-yellow-500 text-white px-3 py-1 flex items-center">
                <Crown className="h-3 w-3 mr-1" /> VIP
              </Badge>
            </div>
            <CardTitle>Ultimate</CardTitle>
            <CardDescription>For community leaders and creators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              <span className="text-3xl font-bold">$19.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2">
              {features.ultimate.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className={`w-full ${selectedPlan === 'Ultimate' ? 'bg-gray-400' : 'bg-community-purple hover:bg-community-darkPurple'}`}
              onClick={() => handleSubscribe('Ultimate', '$19.99')}
              disabled={selectedPlan === 'Ultimate'}
            >
              {selectedPlan === 'Ultimate' ? 'Current Plan' : 'Subscribe'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto grid gap-6">
          <div className="text-left">
            <h3 className="font-medium text-lg mb-2">Can I cancel my subscription anytime?</h3>
            <p className="text-gray-600">Yes, you can cancel your subscription at any time. Your benefits will continue until the end of your billing cycle.</p>
          </div>
          <div className="text-left">
            <h3 className="font-medium text-lg mb-2">How do payments work?</h3>
            <p className="text-gray-600">We use secure payment processing. Your payment information is encrypted and never stored on our servers.</p>
          </div>
          <div className="text-left">
            <h3 className="font-medium text-lg mb-2">Can I upgrade or downgrade my plan?</h3>
            <p className="text-gray-600">Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate will apply at the next billing cycle.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
