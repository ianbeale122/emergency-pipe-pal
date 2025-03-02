
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Image, Send, PaperclipIcon, XCircle } from "lucide-react";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
}

const LiveChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! How can I help you with your plumbing needs today?',
      sender: 'system',
      timestamp: new Date(),
    }
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File is too large. Please select a file smaller than 10MB.");
        return;
      }
      
      setSelectedFile(file);
      
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Reset the input to allow selecting the same file again
      event.target.value = '';
    }
  };

  // Clear selected file
  const clearSelectedFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Handle message submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() && !selectedFile) return;
    
    // Create a new user message
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    // Add media if a file is selected
    if (selectedFile) {
      const fileType = selectedFile.type.startsWith('image/') ? 'image' : 'video';
      newMessage.media = {
        type: fileType,
        url: previewUrl || '',
      };
    }
    
    // Add the message to the chat
    setMessages([...messages, newMessage]);
    
    // Clear the inputs
    setMessage("");
    clearSelectedFile();
    
    // Auto-reply after a delay
    setTimeout(() => {
      const systemReply: ChatMessage = {
        id: Date.now().toString(),
        text: "Thank you for your message. Our plumbing team will review it and get back to you shortly.",
        sender: 'system',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, systemReply]);
      scrollToBottom();
    }, 1000);
  };

  // Trigger file selection dialog
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 animate-fade-up">Live Chat Support</h1>
          <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-up">
            <div 
              ref={chatContainerRef}
              className="h-96 mb-4 border rounded-md p-4 overflow-y-auto"
            >
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center">Start chatting with our support team.</p>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`mb-3 ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block max-w-[85%] px-4 py-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {msg.media && (
                        <div className="mb-2">
                          {msg.media.type === 'image' ? (
                            <img 
                              src={msg.media.url} 
                              alt="User uploaded" 
                              className="max-w-full rounded-md"
                            />
                          ) : (
                            <video 
                              src={msg.media.url} 
                              controls 
                              className="max-w-full rounded-md"
                            />
                          )}
                        </div>
                      )}
                      {msg.text && <p>{msg.text}</p>}
                      <span 
                        className={`text-xs mt-1 block ${
                          msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {selectedFile && (
              <Card className="p-2 mb-2 relative">
                <div className="flex items-center">
                  {previewUrl && selectedFile?.type.startsWith('image/') ? (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="h-16 w-auto object-contain mr-2"
                    />
                  ) : (
                    <video 
                      src={previewUrl || undefined}
                      className="h-16 w-auto object-contain mr-2"
                    />
                  )}
                  <div className="flex-1 truncate">
                    {selectedFile.name}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearSelectedFile}
                    className="ml-2"
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={triggerFileInput}
                >
                  <PaperclipIcon className="h-4 w-4" />
                </Button>
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*"
                className="hidden"
              />
              
              <p className="text-xs text-gray-500 mt-1">
                You can attach images or videos (max 10MB) to help us diagnose your plumbing issue.
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveChat;
