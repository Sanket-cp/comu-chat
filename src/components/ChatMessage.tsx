
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  sender: string;
  timestamp: string;
  isCurrentUser?: boolean;
  avatar?: string;
  isAI?: boolean;
}

const ChatMessage = ({ message, sender, timestamp, isCurrentUser = false, avatar, isAI = false }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4 animate-fade-in",
      isCurrentUser ? "justify-end" : "justify-start"
    )}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-community-purple/30">
          <AvatarImage src={avatar} />
          <AvatarFallback className={cn(
            "text-white",
            isAI ? "bg-gradient-to-br from-blue-400 to-blue-600" : "bg-gradient-to-br from-community-purple to-community-darkPurple"
          )}>
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
          "py-2 px-3 rounded-lg shadow-sm",
          isCurrentUser 
            ? "bg-gradient-to-r from-community-purple to-community-darkPurple text-white" 
            : isAI 
              ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border border-blue-200 dark:border-blue-700" 
              : "bg-muted border dark:border-gray-700"
        )}>
          <p className="text-sm">{message}</p>
        </div>
        
        {isCurrentUser && (
          <span className="text-xs text-muted-foreground mt-1">{timestamp}</span>
        )}
      </div>
      
      {isCurrentUser && (
        <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-community-purple/30">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-gradient-to-br from-community-purple to-community-darkPurple text-white">
            {sender.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
