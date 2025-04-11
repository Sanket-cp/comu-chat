
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, ShieldCheck, Star, Trophy, CreditCard, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe (use your publishable key from Stripe dashboard)
const stripePromise = loadStripe("pk_test_51OvJwzDnc7RYKiVn5J19sFcvdUDGxcxbcA3KTwsExCYYn1c9r9ULr4Mzrm1WrWujJ91Cqh2YXrtrR2tZYPpcFOXl001I3zqKdY");

const MembershipPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentPlanToUpgrade, setCurrentPlanToUpgrade] = useState('');
  const [currentPriceToUpgrade, setCurrentPriceToUpgrade] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  // Simulate usage percentage - in a real app this would come from your backend
  const usagePercentage = parseInt(localStorage.getItem("usagePercentage") || "0");

  const handleSubscribe = (plan: string, price: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to subscribe to a plan",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentPlanToUpgrade(plan);
    setCurrentPriceToUpgrade(price);
    setShowConfirmDialog(true);
  };
  
  const confirmSubscription = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to continue with payment",
        variant: "destructive"
      });
      return;
    }

    setIsProcessingPayment(true);

    try {
      // In a real application with Supabase integration, you would call your checkout endpoint:
      // const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      //   body: { plan: currentPlanToUpgrade, priceId: getPriceId(currentPlanToUpgrade) }
      // });

      // For this demo, we'll simulate a successful redirect to Stripe
      // Normally, you'd redirect to the checkout URL returned from your backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Failed to load Stripe");

      // For demo purposes, redirect to a simulated Stripe checkout success page
      toast({
        title: "Redirecting to payment",
        description: `Setting up your ${currentPlanToUpgrade} plan checkout...`,
      });

      // In a real implementation with Supabase+Stripe, you would:
      // 1. Redirect to the Stripe session URL
      // 2. Handle success/cancel URLs in your app

      // Since we're simulating, show success after delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      handlePaymentSuccess();
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Payment successful!",
      description: `You are now subscribed to the ${currentPlanToUpgrade} plan!`,
    });
    setSelectedPlan(currentPlanToUpgrade);
    setShowConfirmDialog(false);
    
    // Reset usage counter after upgrading
    localStorage.setItem("usagePercentage", "0");
  };

  // In a real app, this would map to your Stripe price IDs
  const getPriceId = (plan: string) => {
    switch (plan) {
      case 'Premium': return 'price_premium_monthly';
      case 'Ultimate': return 'price_ultimate_monthly';
      default: return '';
    }
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
      {isAuthenticated && selectedPlan !== 'Premium' && selectedPlan !== 'Ultimate' && (
        <div className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold flex items-center">
              <ShieldCheck className="mr-2 h-5 w-5 text-community-purple" />
              Your Current Usage
            </h2>
            <Badge variant="outline" className="px-3 py-1">Basic Plan</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Free Plan Usage</span>
              <span className="font-medium">{usagePercentage}%</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {usagePercentage > 70 
                ? "You're approaching your free plan limit. Upgrade now to avoid interruptions." 
                : "Enjoy your free plan. Upgrade anytime to unlock more features."}
            </p>
          </div>
        </div>
      )}

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Upgrade Your ComuChat Experience</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the plan that's right for you and unlock premium features to enhance your community experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <Card className={`border ${selectedPlan === 'Basic' ? 'border-community-purple ring-2 ring-community-purple' : 'hover:shadow-lg transition-shadow duration-300'}`}>
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
        <Card className={`border ${selectedPlan === 'Premium' ? 'border-community-purple ring-2 ring-community-purple' : 'hover:shadow-lg transition-shadow duration-300'} ${usagePercentage > 70 ? 'shadow-xl scale-105 border-community-purple/50' : ''}`}>
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
        <Card className={`border ${selectedPlan === 'Ultimate' ? 'border-community-purple ring-2 ring-community-purple' : 'hover:shadow-lg transition-shadow duration-300'}`}>
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
      
      {/* Confirmation Dialog with payment details */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Subscription</DialogTitle>
            <DialogDescription>
              You're subscribing to the {currentPlanToUpgrade} plan for {currentPriceToUpgrade} per month.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <h4 className="font-medium mb-2 flex items-center">
              <Trophy className="h-4 w-4 text-community-purple mr-2" />
              Benefits you'll receive:
            </h4>
            <ul className="space-y-1 text-sm">
              {currentPlanToUpgrade === 'Premium' && features.premium.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" /> {feature}
                </li>
              ))}
              {currentPlanToUpgrade === 'Ultimate' && features.ultimate.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" /> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4 border border-gray-100 dark:border-gray-700">
            <h4 className="font-medium mb-2 flex items-center text-sm">
              <CreditCard className="h-4 w-4 text-community-purple mr-2" />
              Payment Information
            </h4>
            <p className="text-sm text-muted-foreground">
              You'll be securely redirected to Stripe to complete your payment. Your payment information is encrypted and never stored on our servers.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)} disabled={isProcessingPayment}>
              Cancel
            </Button>
            <Button 
              onClick={confirmSubscription}
              disabled={isProcessingPayment}
              className="bg-community-purple hover:bg-community-darkPurple"
            >
              {isProcessingPayment ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Payment
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MembershipPage;
