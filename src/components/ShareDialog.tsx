
import { useState } from "react";
import { Copy, Facebook, Link, Twitter, Share, Instagram, Linkedin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  communityName: string;
  communityId: number;
  isPost?: boolean;
}

const ShareDialog = ({ isOpen, onClose, communityName, communityId, isPost = false }: ShareDialogProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const shareUrl = isPost 
    ? `${window.location.origin}/post/${communityId}` 
    : `${window.location.origin}/community/${communityId}`;

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
    const text = isPost 
      ? `Check out this post by ${communityName.replace('Post by ', '')} on ComuChat!`
      : `Check out the ${communityName} community on ComuChat!`;
    
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(text)}`;
        break;
      case "instagram":
        // Instagram doesn't have a direct sharing API, this would usually open Instagram app
        toast({
          title: "Instagram sharing",
          description: "Opening Instagram to share content",
        });
        break;
      default:
        break;
    }
    
    if (url) window.open(url, "_blank");
    toast({
      title: `Shared to ${platform}!`,
      description: `Opening ${platform} to share this ${isPost ? 'post' : 'community'}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-community-purple/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Share className="h-5 w-5 text-community-purple" />
            {isPost ? 'Share Post' : 'Share Community'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input
            readOnly
            value={shareUrl}
            className="flex-1 border-community-purple/30 focus-visible:ring-community-purple/50"
          />
          <Button 
            size="sm" 
            onClick={handleCopy} 
            className="bg-community-purple hover:bg-community-darkPurple transition-all duration-300"
          >
            <Copy className="h-4 w-4 mr-2" />
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <Button 
            onClick={() => shareToSocial("twitter")} 
            variant="outline" 
            size="icon" 
            className="rounded-full border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
          >
            <Twitter className="h-5 w-5 text-blue-400" />
          </Button>
          <Button 
            onClick={() => shareToSocial("facebook")} 
            variant="outline" 
            size="icon" 
            className="rounded-full border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300"
          >
            <Facebook className="h-5 w-5 text-blue-600" />
          </Button>
          <Button 
            onClick={() => shareToSocial("linkedin")} 
            variant="outline" 
            size="icon" 
            className="rounded-full border-blue-700 hover:bg-blue-50 hover:text-blue-800 transition-all duration-300"
          >
            <Linkedin className="h-5 w-5 text-blue-700" />
          </Button>
          <Button 
            onClick={() => shareToSocial("instagram")} 
            variant="outline" 
            size="icon" 
            className="rounded-full border-pink-600 hover:bg-pink-50 hover:text-pink-700 transition-all duration-300"
          >
            <Instagram className="h-5 w-5 text-pink-600" />
          </Button>
          <Button 
            onClick={handleCopy} 
            variant="outline" 
            size="icon" 
            className="rounded-full border-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all duration-300"
          >
            <Link className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
