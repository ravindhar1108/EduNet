
import { useState } from 'react';
import { MessageCircle, Bot, X, Send, Sparkles, PenTool, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', content: 'Hi! I\'m your AI assistant. How can I help you today?' },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages(prev => [...prev, 
        { type: 'user', content: message },
        { type: 'ai', content: 'Thanks for your message! I\'m here to help with your academic and professional growth.' }
      ]);
      setMessage('');
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {/* AI Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] animate-scale-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                AI Assistant
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="generate">Generate</TabsTrigger>
                  <TabsTrigger value="improve">Improve</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chat" className="space-y-4">
                  <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3">
                    {chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg ${
                            msg.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask me anything..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="generate" className="space-y-4">
                  <div className="grid gap-4">
                    <Button variant="outline" className="flex items-center gap-2 justify-start h-auto p-4">
                      <PenTool className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <div className="font-medium">Generate Post</div>
                        <div className="text-sm text-muted-foreground">Create engaging social media content</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 justify-start h-auto p-4">
                      <FileText className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <div className="font-medium">Build Profile</div>
                        <div className="text-sm text-muted-foreground">Enhance your professional profile</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 justify-start h-auto p-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <div className="font-medium">Create Resume</div>
                        <div className="text-sm text-muted-foreground">Generate a professional resume</div>
                      </div>
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="improve" className="space-y-4">
                  <Textarea
                    placeholder="Paste your content here to improve it..."
                    className="min-h-32"
                  />
                  <Button className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Improve with AI
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
