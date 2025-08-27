
import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Layout/AppSidebar';
import { TopNavbar } from '@/components/Layout/TopNavbar';
import { PostCard } from '@/components/Feed/PostCard';
import { CommunityPanel } from '@/components/Community/CommunityPanel';
import { AIAssistantButton } from '@/components/AI/AIAssistantButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, PlusCircle, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockPosts = [
  {
    author: {
      name: 'Dr. Emily Watson',
      avatar: '/placeholder-avatar.jpg',
      title: 'Computer Science Professor',
      institution: 'Stanford University'
    },
    content: 'Excited to share our latest research on neural network optimization! Our team has achieved a 40% improvement in training efficiency. Looking forward to presenting at NeurIPS 2024. 🧠✨',
    timestamp: '2 hours ago',
    likes: 124,
    comments: 18,
    shares: 7
  },
  {
    author: {
      name: 'Alex Chen',
      avatar: '/placeholder-avatar.jpg',
      title: 'Computer Science Student',
      institution: 'MIT'
    },
    content: 'Just completed my first full-stack project using React and Node.js! Building a collaborative study platform for students. Thanks to everyone who provided feedback during development. Open source repo coming soon! 🚀',
    image: '/placeholder-project.jpg',
    timestamp: '4 hours ago',
    likes: 89,
    comments: 23,
    shares: 12
  },
  {
    author: {
      name: 'Dr. Maria Rodriguez',
      avatar: '/placeholder-avatar.jpg',
      title: 'Data Science Researcher',
      institution: 'UC Berkeley'
    },
    content: 'Hosting a virtual workshop on "Introduction to Machine Learning" next Friday at 2 PM PST. Perfect for beginners! We\'ll cover basic algorithms and hands-on Python exercises. Registration link in comments. 📊',
    timestamp: '6 hours ago',
    likes: 156,
    comments: 45,
    shares: 28
  }
];

const Index = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Colleges');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopNavbar />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Create Post & Filters */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Create Post Card */}
                  <Card className="card-shadow">
                    <CardContent className="p-4">
                      <Button variant="outline" className="w-full justify-start gap-3 h-12">
                        <PlusCircle className="h-5 w-5 text-primary" />
                        Share something...
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Filter */}
                  <Card className="card-shadow">
                    <CardContent className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            <span className="flex items-center gap-2">
                              <Filter className="h-4 w-4" />
                              {selectedFilter}
                            </span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                          <DropdownMenuItem onClick={() => setSelectedFilter('All Colleges')}>
                            All Colleges
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedFilter('My University')}>
                            My University
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedFilter('Computer Science')}>
                            Computer Science
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedFilter('Engineering')}>
                            Engineering
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardContent>
                  </Card>

                  {/* Communities Panel */}
                  <CommunityPanel />
                </div>

                {/* Center Column - Feed */}
                <div className="lg:col-span-2 space-y-6">
                  {mockPosts.map((post, index) => (
                    <PostCard key={index} {...post} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* AI Assistant */}
        <AIAssistantButton />
      </div>
    </SidebarProvider>
  );
};

export default Index;
