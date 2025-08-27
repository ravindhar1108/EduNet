
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Layout/AppSidebar';
import { TopNavbar } from '@/components/Layout/TopNavbar';
import { ProfileCard } from '@/components/Profile/ProfileCard';
import { AIAssistantButton } from '@/components/AI/AIAssistantButton';

const Profile = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopNavbar />
          
          <main className="flex-1 p-6">
            <ProfileCard />
          </main>
        </div>

        <AIAssistantButton />
      </div>
    </SidebarProvider>
  );
};

export default Profile;
