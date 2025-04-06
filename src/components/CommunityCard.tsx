
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

interface CommunityCardProps {
  id: number;
  name: string;
  icon: string;
  description: string;
  memberCount: number;
  tags: string[];
}

const CommunityCard = ({ id, name, icon, description, memberCount, tags }: CommunityCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="text-3xl">{icon}</div>
            <CardTitle>{name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="line-clamp-3">{description}</CardDescription>
        <div className="flex items-center mt-4 text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          <span>{memberCount} members</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-community-softGray text-gray-700">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link to={`/community/${id}`} className="w-full">
          <Button variant="outline" className="w-full">Join Community</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
