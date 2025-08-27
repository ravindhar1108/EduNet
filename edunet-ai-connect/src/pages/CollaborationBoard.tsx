import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Layout/AppSidebar';
import { TopNavbar } from '@/components/Layout/TopNavbar';
import { CollaborationBoard } from '@/components/Collaboration/CollaborationBoard';
import { AIAssistantButton } from '@/components/AI/AIAssistantButton';

const CollaborationBoardPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopNavbar />
          
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">Collaboration Board</h1>
                <p className="text-muted-foreground mt-1">Find and join exciting projects or create your own team</p>
              </div>
              <CollaborationBoard />
            </div>
          </main>
        </div>

        <AIAssistantButton />
      </div>
    </SidebarProvider>
  );
};

export default CollaborationBoardPage; 