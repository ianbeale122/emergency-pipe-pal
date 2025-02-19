
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const LiveChat = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add chat functionality here
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 animate-fade-up">Live Chat Support</h1>
          <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-up">
            <div className="h-96 mb-4 border rounded-md p-4 overflow-y-auto">
              <p className="text-gray-500 text-center">Chat support coming soon...</p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveChat;
