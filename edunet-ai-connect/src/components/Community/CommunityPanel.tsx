
import { useState } from 'react';
import { Users, Plus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const communities = [
  { name: 'AI & Machine Learning', members: 12500, joined: true, trending: true },
  { name: 'Web Development', members: 8300, joined: false, trending: false },
  { name: 'Data Science Hub', members: 9800, joined: true, trending: true },
  { name: 'Cybersecurity', members: 6200, joined: false, trending: false },
  { name: 'Mobile Development', members: 7100, joined: false, trending: false },
];

export function CommunityPanel() {
  const [joinedCommunities, setJoinedCommunities] = useState(
    communities.reduce((acc, community) => {
      acc[community.name] = community.joined;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleJoinToggle = (communityName: string) => {
    setJoinedCommunities(prev => ({
      ...prev,
      [communityName]: !prev[communityName]
    }));
  };

  return (
    <Card className="card-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5 text-primary" />
          My Communities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {communities.map((community) => (
          <div key={community.name} className="flex items-center justify-between group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm text-foreground truncate">
                  {community.name}
                </h4>
                {community.trending && (
                  <TrendingUp className="h-3 w-3 text-primary flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {community.members.toLocaleString()} members
              </p>
            </div>
            
            <Button
              variant={joinedCommunities[community.name] ? "secondary" : "outline"}
              size="sm"
              className="ml-3 text-xs h-7 px-3"
              onClick={() => handleJoinToggle(community.name)}
            >
              {joinedCommunities[community.name] ? 'Joined' : 'Join'}
            </Button>
          </div>
        ))}
        
        <div className="pt-4 border-t border-border/50">
          <Button variant="ghost" size="sm" className="w-full text-primary hover:text-primary">
            <Plus className="h-4 w-4 mr-2" />
            Discover more communities
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
