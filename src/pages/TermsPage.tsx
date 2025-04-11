
import { useEffect } from "react";

const TermsPage = () => {
  useEffect(() => {
    document.title = "Terms of Service | ComuChat";
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4">
            Welcome to ComuChat! These Terms of Service ("Terms") govern your use of our platform. 
            By accessing or using ComuChat, you agree to be bound by these Terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the ComuChat platform, you agree to be bound by these Terms of Service. 
            If you do not agree to all the terms and conditions, you may not access or use our services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will provide notice of significant changes 
            by posting the updated Terms on our platform. Your continued use of ComuChat after such modifications 
            constitutes your acceptance of the revised Terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Registration</h2>
          <p>
            To access certain features of ComuChat, you may need to register for an account. You agree to provide 
            accurate, current, and complete information during the registration process and to update such information 
            to keep it accurate, current, and complete.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Conduct</h2>
          <p>
            You agree not to use ComuChat to:
          </p>
          <ul className="list-disc pl-8 my-4">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Post illegal, harmful, or objectionable content</li>
            <li>Harass, abuse, or harm another person</li>
            <li>Impersonate or misrepresent your affiliation with any person or entity</li>
            <li>Engage in any activity that interferes with or disrupts ComuChat</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Content</h2>
          <p>
            You are solely responsible for the content you post on ComuChat. We reserve the right to remove 
            any content that violates these Terms or that we find objectionable for any reason.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Privacy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, 
            use, and disclose information about you.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to ComuChat at our sole discretion, 
            without notice, for conduct that we believe violates these Terms or is harmful to other users, us, 
            or third parties, or for any other reason.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Disclaimers</h2>
          <p>
            ComuChat is provided "as is" without warranties of any kind, either express or implied. We do not warrant 
            that ComuChat will be uninterrupted or error-free.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Limitation of Liability</h2>
          <p>
            In no event shall ComuChat be liable for any indirect, incidental, special, consequential, or punitive damages, 
            or any loss of profits or revenues.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@comuchat.com.
          </p>
          
          <div className="mt-8 text-sm text-muted-foreground">
            Last updated: April 11, 2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
