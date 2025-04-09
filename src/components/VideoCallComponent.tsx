
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface VideoCallComponentProps {
  communityId: number;
  communityName: string;
}

const VideoCallComponent = ({ communityId, communityName }: VideoCallComponentProps) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // This would normally connect to a video API
    if (isCallActive) {
      // Mock adding participants
      const mockParticipants = ["Alex Turner", "Jamie Oliver", "Maria Rodriguez"];
      setParticipants([user?.name || "You", ...mockParticipants]);
      
      toast({
        title: "Video call started",
        description: `You've joined the ${communityName} video call`,
      });
    }
  }, [isCallActive, communityName, toast, user]);

  const startCall = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to start a video call",
        variant: "destructive"
      });
      return;
    }
    
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    setParticipants([]);
    
    toast({
      title: "Call ended",
      description: "You've left the video call",
    });
  };

  const toggleMic = () => {
    setIsMicMuted(!isMicMuted);
    toast({
      title: isMicMuted ? "Microphone unmuted" : "Microphone muted",
      description: isMicMuted ? "Others can now hear you" : "Others can't hear you",
    });
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    toast({
      title: isVideoOff ? "Camera turned on" : "Camera turned off",
      description: isVideoOff ? "Others can now see you" : "Others can't see you",
    });
  };

  if (!isAuthenticated) {
    return (
      <Card className="border rounded-lg overflow-hidden">
        <CardHeader className="text-center pb-2">
          <CardTitle>Join Video Call</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Video className="h-16 w-16 text-community-purple mb-4" />
          <p className="text-center text-gray-600 mb-6 max-w-md">
            Please login to join video calls with other community members.
          </p>
          <Button className="bg-community-purple hover:bg-community-darkPurple" asChild>
            <Link to="/login">Login to Join</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{isCallActive ? "Active Video Call" : "Start Video Call"}</CardTitle>
        {isCallActive && (
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{participants.length} participants</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {!isCallActive ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Video className="h-16 w-16 text-community-purple mb-4" />
            <h2 className="text-xl font-bold mb-2">Start a Video Call</h2>
            <p className="text-center text-gray-600 mb-6 max-w-md">
              Connect face-to-face with other community members through video calls.
            </p>
            <Button 
              className="bg-community-purple hover:bg-community-darkPurple"
              onClick={startCall}
            >
              Start Group Call
            </Button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 mb-4">
              {participants.map((participant, index) => (
                <div key={index} className="aspect-video bg-gray-800 rounded-md relative overflow-hidden">
                  {index === 0 && isVideoOff ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-community-purple text-white text-xl">
                          {user?.name ? user.name.substring(0, 2).toUpperCase() : "GU"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                      {/* This would be a real video stream in a production app */}
                      {index === 0 ? (
                        <div className="text-center text-white">
                          <div className="text-lg font-medium">You</div>
                          <div className="text-xs text-gray-400">{isMicMuted ? "Muted" : "Unmuted"}</div>
                        </div>
                      ) : (
                        <Avatar className="h-20 w-20">
                          <AvatarFallback className="bg-community-purple text-white text-xl">
                            {participant.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                    {index === 0 ? "You" : participant}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full h-12 w-12 ${isMicMuted ? 'bg-red-100 hover:bg-red-200' : ''}`}
                onClick={toggleMic}
              >
                {isMicMuted ? <MicOff className="h-5 w-5 text-red-500" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Button 
                variant="outline"
                size="icon" 
                className={`rounded-full h-12 w-12 ${isVideoOff ? 'bg-red-100 hover:bg-red-200' : ''}`}
                onClick={toggleVideo}
              >
                {isVideoOff ? <VideoOff className="h-5 w-5 text-red-500" /> : <Video className="h-5 w-5" />}
              </Button>
              <Button 
                variant="destructive" 
                size="icon" 
                className="rounded-full h-12 w-12"
                onClick={endCall}
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCallComponent;
