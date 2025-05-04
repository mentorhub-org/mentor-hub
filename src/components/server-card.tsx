import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface ServerCardProps {
  server: {
    id: string;
    name: string;
    description: string;
    members: number;
    topics: string[];
    imageUrl: string;
  };
}

export default function ServerCard({ server }: ServerCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="h-40 overflow-hidden">
        <img 
          src={server.imageUrl} 
          alt={server.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{server.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Users size={16} />
          <span>{server.members} members</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-500 mb-4">{server.description}</p>
        <div className="flex flex-wrap gap-2">
          {server.topics.map((topic) => (
            <Badge key={topic} variant="secondary">{topic}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Join Server</Button>
      </CardFooter>
    </Card>
  );
}