
import { useEffect } from "react";

const PrivacyPage = () => {
  useEffect(() => {
    document.title = "Privacy Policy | ComuChat";
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4">
            At ComuChat, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our platform.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you:
          </p>
          <ul className="list-disc pl-8 my-4">
            <li>Create an account</li>
            <li>Complete your profile</li>
            <li>Post content</li>
            <li>Communicate with other users</li>
            <li>Contact our support team</li>
          </ul>
          <p>
            This information may include your name, email address, username, profile picture, 
            and any other information you choose to provide.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-8 my-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Create and manage your account</li>
            <li>Connect you with communities and other users</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Send you technical notices, updates, security alerts, and support messages</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing of Information</h2>
          <p>
            We may share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-8 my-4">
            <li>With other users of the platform in accordance with your privacy settings</li>
            <li>With vendors, consultants, and other service providers who need access to such information to provide services to us</li>
            <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process</li>
            <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of ComuChat or others</li>
            <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, 
            disclosure, alteration, and destruction. However, no security system is impenetrable, and we cannot guarantee the 
            security of our systems or your information.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Choices</h2>
          <p>
            You can access and update certain information about you from within your account settings. 
            You can also request that we delete your account and personal information by contacting us.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to this Policy</h2>
          <p>
            We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising 
            the date at the bottom of the policy and, in some cases, we may provide you with additional notice.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@comuchat.com.
          </p>
          
          <div className="mt-8 text-sm text-muted-foreground">
            Last updated: April 11, 2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
