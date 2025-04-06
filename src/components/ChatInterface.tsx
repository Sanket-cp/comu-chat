
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Smile } from "lucide-react";
import ChatMessage from "./ChatMessage";

interface Message {
  id: number;
  message: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface ChatInterfaceProps {
  communityId: number;
  communityName: string;
}

const ChatInterface = ({ communityId, communityName }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      message: `Welcome to the ${communityName} community chat!`,
      sender: "CommunityBot",
      timestamp: "Just now",
      isCurrentUser: false,
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
      sender: "You",
      timestamp: "Just now",
      isCurrentUser: true,
    },
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
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
      const message: Message = {
        id: messages.length + 1,
        message: newMessage,
        sender: "You",
        timestamp: "Just now",
        isCurrentUser: true,
      };
      
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.message}
              sender={msg.sender}
              timestamp={msg.timestamp}
              isCurrentUser={msg.isCurrentUser}
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
            placeholder="Type a message..."
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
