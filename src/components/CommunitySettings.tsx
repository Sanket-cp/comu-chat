
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Community {
  id: number;
  name: string;
  icon: string;
  description: string;
  tags: string[];
  memberCount: number;
  createdAt: string;
  creator: string;
  rules: string[];
}

interface CommunitySettingsProps {
  community: Community;
}

const CommunitySettings = ({ community }: CommunitySettingsProps) => {
  const { toast } = useToast();

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "Your community settings have been updated successfully!",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <form onSubmit={handleSaveSettings}>
            <CardHeader>
              <CardTitle>Community Settings</CardTitle>
              <CardDescription>
                Manage your community's basic information and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Community Name</Label>
                <Input id="name" defaultValue={community.name} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="icon">Community Icon</Label>
                <Input id="icon" defaultValue={community.icon} />
                <p className="text-sm text-muted-foreground">
                  Enter an emoji to represent your community
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  rows={4}
                  defaultValue={community.description}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rules">Community Rules</Label>
                <Textarea 
                  id="rules" 
                  rows={6}
                  defaultValue={community.rules.join("\n")}
                />
                <p className="text-sm text-muted-foreground">
                  Each line will be treated as a separate rule
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="bg-community-purple hover:bg-community-darkPurple"
              >
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Community Visibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Public Community</h4>
                <p className="text-sm text-muted-foreground">
                  Anyone can view and join
                </p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete a community, there is no going back.
            </p>
            <Button variant="destructive" size="sm">
              Delete Community
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunitySettings;
