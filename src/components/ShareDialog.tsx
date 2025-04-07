
import { useState } from "react";
import { Copy, Facebook, Link, Twitter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  communityName: string;
  communityId: number;
}

const ShareDialog = ({ isOpen, onClose, communityName, communityId }: ShareDialogProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/community/${communityId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Share link has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToSocial = (platform: string) => {
    let url = "";
    const text = `Check out the ${communityName} community on ComuChat!`;
    
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        break;
    }
    
    if (url) window.open(url, "_blank");
    toast({
      title: `Shared to ${platform}!`,
      description: `Opening ${platform} to share this community`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Community</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input
            readOnly
            value={shareUrl}
            className="flex-1"
          />
          <Button size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={() => shareToSocial("twitter")} variant="outline" size="icon" className="rounded-full">
            <Twitter className="h-5 w-5 text-blue-400" />
          </Button>
          <Button onClick={() => shareToSocial("facebook")} variant="outline" size="icon" className="rounded-full">
            <Facebook className="h-5 w-5 text-blue-600" />
          </Button>
          <Button onClick={handleCopy} variant="outline" size="icon" className="rounded-full">
            <Link className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
