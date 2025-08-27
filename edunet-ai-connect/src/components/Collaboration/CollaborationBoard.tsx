
import { useState } from 'react';
import { Users, Clock, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const projects = [
  {
    id: 1,
    title: 'AI-Powered Study Assistant',
    type: 'Looking for Team',
    skills: ['React', 'Node.js', 'Machine Learning'],
    teamSize: '3-4 members',
    deadline: '2 weeks',
    location: 'Remote',
    description: 'Building an intelligent study companion that helps students organize and optimize their learning.',
    author: 'Sarah Chen',
    university: 'MIT'
  },
  {
    id: 2,
    title: 'Sustainable Campus Initiative',
    type: 'Open to Join',
    skills: ['Environmental Science', 'Data Analysis', 'Project Management'],
    teamSize: '2-3 members',
    deadline: '1 month',
    location: 'Stanford University',
    description: 'Research project analyzing campus carbon footprint and proposing sustainable solutions.',
    author: 'Mike Rodriguez',
    university: 'Stanford'
  },
  {
    id: 3,
    title: 'Blockchain Voting System',
    type: 'Looking for Team',
    skills: ['Blockchain', 'Smart Contracts', 'Security'],
    teamSize: '4-5 members',
    deadline: '3 weeks',
    location: 'Hybrid',
    description: 'Developing a secure, transparent voting system using blockchain technology.',
    author: 'Alex Kim',
    university: 'UC Berkeley'
  }
];

export function CollaborationBoard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'looking') return matchesSearch && project.type === 'Looking for Team';
    if (activeTab === 'joining') return matchesSearch && project.type === 'Open to Join';
    
    return matchesSearch;
  });

  return (
    <Card className="card-shadow bg-white rounded-xl shadow-lg p-0">
      <CardHeader className="pb-2 border-b border-border bg-gradient-to-r from-blue-50 to-white rounded-t-xl">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5 text-primary" />
          Collaboration Board
        </CardTitle>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-2 rounded-md border border-border focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex w-full mb-4 rounded-t-lg overflow-hidden border-b border-border bg-gray-50">
            <TabsTrigger value="all" className={`flex-1 text-xs py-2 px-0 rounded-none ${activeTab==='all' ? 'bg-white font-semibold border-b-2 border-primary' : 'hover:bg-gray-100'}`}>All Projects</TabsTrigger>
            <TabsTrigger value="looking" className={`flex-1 text-xs py-2 px-0 rounded-none ${activeTab==='looking' ? 'bg-white font-semibold border-b-2 border-primary' : 'hover:bg-gray-100'}`}>Looking for Team</TabsTrigger>
            <TabsTrigger value="joining" className={`flex-1 text-xs py-2 px-0 rounded-none ${activeTab==='joining' ? 'bg-white font-semibold border-b-2 border-primary' : 'hover:bg-gray-100'}`}>Open to Join</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-5 mt-0">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="border border-border hover:shadow-lg transition-shadow rounded-lg">
                <CardContent className="p-5">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base truncate mb-1">{project.title}</h3>
                        <Badge 
                          variant={project.type === 'Looking for Team' ? 'default' : 'secondary'}
                          className="text-xs mb-2 px-2 py-0.5"
                        >
                          {project.type}
                        </Badge>
                      </div>
                      <Button 
                        size="sm"
                        variant={project.type === 'Looking for Team' ? 'default' : 'outline'}
                        className="text-xs px-4 py-1 h-8 mt-1 shadow-sm"
                      >
                        {project.type === 'Looking for Team' ? 'Apply' : 'Join'}
                      </Button>
                    </div>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs px-2 py-0.5">
                          {skill}
                        </Badge>
                      ))}
                      {project.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5">
                          +{project.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-6 text-xs text-muted-foreground mt-2">
                      <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          <span>{project.teamSize}</span>
                        </div>
                      <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{project.deadline}</span>
                        </div>
                      <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                        <span className="truncate max-w-[100px]">{project.location}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs border-t pt-2 mt-2 flex items-center gap-1">
                      <span className="font-medium">{project.author}</span>
                      <span className="text-muted-foreground">• {project.university}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No projects found matching your search.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
