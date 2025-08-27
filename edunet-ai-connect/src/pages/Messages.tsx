
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Layout/AppSidebar';
import { TopNavbar } from '@/components/Layout/TopNavbar';
import { MessageInterface } from '@/components/Messages/MessageInterface';

const Messages = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopNavbar />
          <MessageInterface />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Messages;
