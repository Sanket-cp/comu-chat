
import { useState } from "react";
import { Shield, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import EmergencyServices from "@/components/EmergencyServices";

const SafetyButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-200 hover:scale-105"
        aria-label="Safety Features"
      >
        <Shield className="h-6 w-6" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" /> 
              Safety & Emergency Services
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="emergency" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="emergency">Emergency Services</TabsTrigger>
              <TabsTrigger value="safety-tips">Safety Tips</TabsTrigger>
            </TabsList>
            
            <TabsContent value="emergency" className="space-y-4">
              <EmergencyServices />
            </TabsContent>
            
            <TabsContent value="safety-tips" className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium text-lg">Personal Safety Tips</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Share your location with trusted contacts when traveling</li>
                  <li>Use the emergency SOS feature on your phone if available</li>
                  <li>Travel in groups when possible, especially at night</li>
                  <li>Keep emergency contacts easily accessible</li>
                  <li>Trust your instincts - if something feels wrong, seek help</li>
                </ul>
                
                <h3 className="font-medium text-lg mt-4">Online Safety Tips</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Don't share personal information with strangers</li>
                  <li>Block and report suspicious or harassing accounts</li>
                  <li>Use strong passwords and two-factor authentication</li>
                  <li>Be cautious about meeting online contacts in person</li>
                  <li>Regularly check privacy settings on all your accounts</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SafetyButton;
