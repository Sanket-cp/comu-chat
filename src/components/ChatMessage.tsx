
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  sender: string;
  timestamp: string;
  isCurrentUser?: boolean;
  avatar?: string;
}

const ChatMessage = ({ message, sender, timestamp, isCurrentUser = false, avatar }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isCurrentUser ? "justify-end" : "justify-start"
    )}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-community-darkPurple text-white">
            {sender.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "flex flex-col max-w-[80%]",
        isCurrentUser && "items-end"
      )}>
        {!isCurrentUser && (
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{sender}</span>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
        )}
        
        <div className={cn(
          "py-2 px-3 rounded-lg",
          isCurrentUser 
            ? "bg-community-purple text-white" 
            : "bg-muted"
        )}>
          <p className="text-sm">{message}</p>
        </div>
        
        {isCurrentUser && (
          <span className="text-xs text-muted-foreground mt-1">{timestamp}</span>
        )}
      </div>
      
      {isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-community-purple text-white">
            {sender.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
