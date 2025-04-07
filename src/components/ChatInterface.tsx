
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Smile, Video, Bot, HelpCircle } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: number;
  message: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
  isAI?: boolean;
}

interface ChatInterfaceProps {
  communityId: number;
  communityName: string;
}

const ChatInterface = ({ communityId, communityName }: ChatInterfaceProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      message: `Welcome to the ${communityName} community chat!`,
      sender: "CommunityBot",
      timestamp: "Just now",
      isCurrentUser: false,
      isAI: true
    },
    {
      id: 2,
      message: "Hey everyone! I'm excited to join this community!",
      sender: "Alex Turner",
      timestamp: "2 minutes ago",
      isCurrentUser: false,
    },
    {
      id: 3,
      message: "Welcome Alex! Great to have you here.",
      sender: "Jamie Wilson",
      timestamp: "1 minute ago",
      isCurrentUser: false,
    },
    {
      id: 4,
      message: "Thanks for the warm welcome!",
      sender: user?.name || "You",
      timestamp: "Just now",
      isCurrentUser: true,
    },
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      // Check if user is asking AI assistant for help
      const isAskingForHelp = newMessage.toLowerCase().includes("@ai") || 
                              newMessage.toLowerCase().includes("assistant") ||
                              newMessage.toLowerCase().includes("help me");
      
      const message: Message = {
        id: messages.length + 1,
        message: newMessage,
        sender: user?.name || "You",
        timestamp: "Just now",
        isCurrentUser: true,
      };
      
      setMessages([...messages, message]);
      setNewMessage("");
      
      // If asking for help, have AI respond
      if (isAskingForHelp) {
        setTimeout(() => {
          const aiResponse: Message = {
            id: messages.length + 2,
            message: generateAIResponse(newMessage),
            sender: "AI Assistant",
            timestamp: "Just now",
            isCurrentUser: false,
            isAI: true
          };
          setMessages(prevMessages => [...prevMessages, aiResponse]);
        }, 1000);
      }
    }
  };
  
  const startVideoCall = () => {
    toast({
      title: "Video call feature",
      description: "Starting a video call in this community...",
    });
  };
  
  const askAIAssistant = () => {
    const aiMessage: Message = {
      id: messages.length + 1,
      message: "Hello! I'm the AI Assistant for this community. How can I help you today?",
      sender: "AI Assistant",
      timestamp: "Just now",
      isCurrentUser: false,
      isAI: true
    };
    
    setMessages([...messages, aiMessage]);
  };
  
  const generateAIResponse = (userMessage: string): string => {
    if (userMessage.toLowerCase().includes("safety") || userMessage.toLowerCase().includes("emergency")) {
      return "If you're experiencing an emergency, please use the Safety button in the bottom right corner of the screen to access emergency services.";
    } else if (userMessage.toLowerCase().includes("join")) {
      return "To join a community, navigate to the community page and click the 'Join Community' button at the top.";
    } else if (userMessage.toLowerCase().includes("post")) {
      return "You can create a post by navigating to the Posts tab and using the text field at the top of the feed.";
    } else if (userMessage.toLowerCase().includes("payment") || userMessage.toLowerCase().includes("vip")) {
      return "For information about VIP plans and payment options, please check the Membership tab in your profile settings.";
    } else if (userMessage.toLowerCase().includes("search")) {
      return "You can search for communities or posts using the search bar at the top of the page. Try typing keywords related to your interests.";
    } else if (userMessage.toLowerCase().includes("security") || userMessage.toLowerCase().includes("privacy")) {
      return "We take your security seriously. Your data is encrypted and we never share your personal information with third parties. You can manage privacy settings in your profile.";
    } else {
      return "I'm here to help with any questions about using ComuChat. Feel free to ask about specific features like joining communities, creating posts, safety features, or VIP membership!";
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white dark:bg-gray-800 border-b px-4 py-2 flex justify-between items-center">
        <h2 className="font-semibold">{communityName} Chat</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={askAIAssistant}
            className="flex items-center"
          >
            <Bot className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">AI Assistant</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={startVideoCall}
            className="flex items-center"
          >
            <Video className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Video Call</span>
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.message}
              sender={msg.sender}
              timestamp={msg.timestamp}
              isCurrentUser={msg.isCurrentUser}
              isAI={msg.isAI}
            />
          ))}
        </div>
      </ScrollArea>
      
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
          >
            <Smile className="h-5 w-5" />
          </Button>
          
          <Input
            className="flex-grow"
            placeholder="Type a message... (use @AI for assistance)"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          
          <Button
            type="submit"
            className="flex-shrink-0 bg-community-purple hover:bg-community-darkPurple"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
