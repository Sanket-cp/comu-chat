
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Smile, Video, Bot, HelpCircle, BrainCircuit, MessageSquare, ChevronDown } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

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
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // AI Suggestions for quick replies
  const aiSuggestions = [
    "Tell me more about this community",
    "What events are coming up?",
    "How can I contribute to this community?",
    "Who are the moderators?",
    "What are the community guidelines?"
  ];
  
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
        setIsTyping(true);
        
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
          setIsTyping(false);
        }, 1500);
      }
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    const message: Message = {
      id: messages.length + 1,
      message: suggestion,
      sender: user?.name || "You",
      timestamp: "Just now",
      isCurrentUser: true,
    };
    
    setMessages([...messages, message]);
    
    // AI response to suggestion
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        message: generateAIResponse(suggestion),
        sender: "AI Assistant",
        timestamp: "Just now",
        isCurrentUser: false,
        isAI: true
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsTyping(false);
    }, 1500);
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
      message: "Hello! I'm the AI Assistant for this community. How can I help you today? You can ask me about community features, events, or how to connect with other members.",
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
      return "To join a community, navigate to the community page and click the 'Join Community' button at the top. You'll get access to all community features once you're a member!";
    } else if (userMessage.toLowerCase().includes("post")) {
      return "You can create a post by navigating to the Posts tab and using the text field at the top of the feed. Add images, links, or format your text to make your post stand out!";
    } else if (userMessage.toLowerCase().includes("payment") || userMessage.toLowerCase().includes("vip")) {
      return "For information about VIP plans and payment options, please check the Membership tab in your profile settings. VIP members get exclusive content and features!";
    } else if (userMessage.toLowerCase().includes("search")) {
      return "You can search for communities or posts using the search bar at the top of the page. Try typing keywords related to your interests to find the perfect communities for you.";
    } else if (userMessage.toLowerCase().includes("events") || userMessage.toLowerCase().includes("coming up")) {
      return `The ${communityName} community has several upcoming events: 1) Weekly discussion this Friday at 7PM, 2) Virtual meetup on Saturday at 3PM, and 3) New member orientation on Monday at 6PM.`;
    } else if (userMessage.toLowerCase().includes("tell me more") || userMessage.toLowerCase().includes("about this community")) {
      return `${communityName} is a vibrant community focused on connecting people with similar interests. Members can share posts, participate in discussions, join events, and build meaningful connections. The community was founded in 2023 and has grown to over 5,000 members worldwide.`;
    } else if (userMessage.toLowerCase().includes("contribute") || userMessage.toLowerCase().includes("help")) {
      return `You can contribute to the ${communityName} community in many ways! Share your expertise through posts, comment on others' content, participate in events, or even apply to become a moderator if you're particularly active.`;
    } else if (userMessage.toLowerCase().includes("moderator") || userMessage.toLowerCase().includes("admin")) {
      return `The current moderators of ${communityName} are Sarah Johnson, Michael Lee, and Emma Rodriguez. They help maintain community guidelines and ensure a positive environment for all members.`;
    } else if (userMessage.toLowerCase().includes("guidelines") || userMessage.toLowerCase().includes("rules")) {
      return `${communityName} community guidelines include: 1) Respect all members, 2) No hate speech or harassment, 3) Stay on topic in discussions, 4) Do not share personal information, and 5) No promotional content without permission.`;
    } else if (userMessage.toLowerCase().includes("security") || userMessage.toLowerCase().includes("privacy")) {
      return "We take your security seriously. Your data is encrypted and we never share your personal information with third parties. You can manage privacy settings in your profile.";
    } else {
      return "I'm here to help with any questions about using ComuChat. Feel free to ask about specific features like joining communities, creating posts, safety features, or VIP membership!";
    }
  };
  
  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden border shadow-md">
      <div className="bg-gradient-to-r from-white to-community-softGray dark:from-gray-800 dark:to-gray-900 border-b px-4 py-2 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800 dark:text-white flex items-center">
          <MessageSquare className="h-4 w-4 mr-2 text-community-purple" />
          {communityName} Chat
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={askAIAssistant}
            className="flex items-center border-community-purple/30 hover:bg-community-purple/10 transition-all"
          >
            <BrainCircuit className="h-4 w-4 mr-1 text-community-purple" />
            <span className="hidden sm:inline">AI Assistant</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={startVideoCall}
            className="flex items-center border-community-purple/30 hover:bg-community-purple/10 transition-all"
          >
            <Video className="h-4 w-4 mr-1 text-community-purple" />
            <span className="hidden sm:inline">Video Call</span>
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4 bg-white/50 dark:bg-gray-900/50" ref={scrollAreaRef}>
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
          
          {isTyping && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
              <BrainCircuit className="h-4 w-4 text-community-purple animate-pulse" />
              <span>AI Assistant is typing...</span>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="border-t p-3 bg-white dark:bg-gray-900">
        <div className="flex flex-wrap gap-2 mb-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs flex items-center gap-1 h-7 bg-community-lightPurple/20 border-community-purple/20 text-community-darkPurple dark:text-community-purple hover:bg-community-lightPurple/30"
              >
                AI Suggestions
                <ChevronDown className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-2">
              <div className="space-y-1">
                {aiSuggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="p-2 hover:bg-community-lightPurple/20 rounded-md cursor-pointer text-sm flex items-center gap-2"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <BrainCircuit className="h-3 w-3 text-community-purple" />
                    {suggestion}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Badge 
            variant="outline" 
            className="text-xs bg-community-lightBlue/20 border-community-lightBlue/30 text-blue-700 dark:text-blue-300 hover:bg-community-lightBlue/30 cursor-pointer"
            onClick={() => setNewMessage(prev => prev + " @AI ")}
          >
            @AI
          </Badge>
        </div>
        
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <Smile className="h-5 w-5" />
          </Button>
          
          <Input
            className="flex-grow bg-muted/50 border-muted focus-visible:ring-community-purple"
            placeholder="Type a message... (use @AI for assistance)"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          
          <Button
            type="submit"
            className="flex-shrink-0 bg-gradient-to-r from-community-purple to-community-darkPurple hover:from-community-darkPurple hover:to-community-purple transition-all duration-300 shadow-md hover:shadow-lg"
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
