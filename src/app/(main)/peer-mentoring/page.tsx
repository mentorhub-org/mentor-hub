"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ServerCard from "@/components/server-card";

// Mock data for server cards
const initialServers = [
  {
    id: "1",
    name: "JavaScript Mentors",
    description: "A community for JavaScript developers to learn and grow together.",
    members: 128,
    topics: ["JavaScript", "React", "Node.js"],
    imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Python Enthusiasts",
    description: "Share your Python knowledge and get help with your projects.",
    members: 95,
    topics: ["Python", "Django", "Data Science"],
    imageUrl: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?q=80&w=2074&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "UI/UX Design Hub",
    description: "Connect with designers and improve your UI/UX skills.",
    members: 76,
    topics: ["UI Design", "UX Research", "Figma"],
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Mobile Dev Mentors",
    description: "Mobile app development mentoring and collaboration.",
    members: 64,
    topics: ["React Native", "Flutter", "Swift"],
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop"
  },
];

export default function PeerMentoring() {
  const [servers, setServers] = useState(initialServers);
  const [newServer, setNewServer] = useState({
    name: "",
    description: "",
    topics: "",
    imageUrl: ""
  });

  const handleCreateServer = () => {
    const topicsArray = newServer.topics.split(",").map(topic => topic.trim());
    
    const server = {
      id: (servers.length + 1).toString(),
      name: newServer.name,
      description: newServer.description,
      members: 1,
      topics: topicsArray,
      imageUrl: newServer.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
    };
    
    setServers([...servers, server]);
    setNewServer({
      name: "",
      description: "",
      topics: "",
      imageUrl: ""
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Peer Mentoring Servers</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle size={18} />
              Create Server
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new server</DialogTitle>
              <DialogDescription>
                Fill in the details to create your mentoring server.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newServer.name}
                  onChange={(e) => setNewServer({...newServer, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newServer.description}
                  onChange={(e) => setNewServer({...newServer, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topics" className="text-right">
                  Topics
                </Label>
                <Input
                  id="topics"
                  placeholder="JavaScript, React, Node.js"
                  value={newServer.topics}
                  onChange={(e) => setNewServer({...newServer, topics: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image"
                  placeholder="https://example.com/image.jpg"
                  value={newServer.imageUrl}
                  onChange={(e) => setNewServer({...newServer, imageUrl: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleCreateServer}>Create Server</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {servers.map((server) => (
          <ServerCard key={server.id} server={server} />
        ))}
      </div>
    </div>
  );
}