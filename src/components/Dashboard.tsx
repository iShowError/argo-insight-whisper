import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  MessageSquare, 
  BarChart3, 
  Waves, 
  Thermometer, 
  Droplets,
  Search,
  Send,
  Bot,
  User,
  Globe,
  TrendingUp
} from "lucide-react";

const Dashboard = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      message: "Hello! I'm your oceanographic data assistant. Ask me anything about ARGO float data, ocean temperatures, salinity levels, or marine conditions.",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      type: "user" as const,
      message: chatMessage,
      timestamp: new Date()
    };
    
    // Simulate AI response
    const botResponse = {
      type: "bot" as const,
      message: "I found 247 ARGO profiles in the Pacific Ocean with temperatures between 15-20°C at depths of 100-500m. The data shows seasonal warming patterns consistent with El Niño conditions. Would you like me to generate a visualization?",
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage, botResponse]);
    setChatMessage("");
  };

  return (
    <section id="dashboard" className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <BarChart3 className="w-3 h-3 mr-1" />
            Interactive Dashboard
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Explore Ocean Data</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interact with global ARGO float data through AI-powered chat, interactive maps, and real-time visualizations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Chat Interface */}
          <Card className="lg:col-span-1 p-6 shadow-ocean">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-ocean">
                <MessageSquare className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">AI Chat Assistant</h3>
            </div>
            
            <div className="h-80 overflow-y-auto mb-4 space-y-4 border rounded-lg p-4 bg-muted/30">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-[80%] ${chat.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${chat.type === 'user' ? 'bg-primary' : 'bg-accent'}`}>
                      {chat.type === 'user' ? 
                        <User className="w-3 h-3 text-primary-foreground" /> : 
                        <Bot className="w-3 h-3 text-accent-foreground" />
                      }
                    </div>
                    <div className={`p-3 rounded-lg ${chat.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>
                      <p className="text-sm">{chat.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about ocean data..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} variant="ocean" size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Main Visualization Area */}
          <Card className="lg:col-span-2 p-6 shadow-depth">
            <Tabs defaultValue="map" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="map" className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span>Global Map</span>
                </TabsTrigger>
                <TabsTrigger value="profiles" className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Profiles</span>
                </TabsTrigger>
                <TabsTrigger value="analysis" className="flex items-center space-x-1">
                  <BarChart3 className="w-4 h-4" />
                  <span>Analysis</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="map" className="space-y-4">
                <div className="h-96 bg-gradient-to-br from-primary-light/10 to-accent/10 rounded-lg border-2 border-dashed border-primary/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="p-4 rounded-full bg-gradient-ocean mx-auto w-fit">
                      <MapPin className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Interactive Ocean Map</h4>
                      <p className="text-muted-foreground">3,800+ ARGO floats worldwide</p>
                      <Badge variant="secondary" className="mt-2">
                        Real-time Data
                      </Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="profiles" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-44 bg-gradient-depth rounded-lg p-4 text-primary-foreground">
                    <div className="flex items-center space-x-2 mb-3">
                      <Thermometer className="w-5 h-5" />
                      <span className="font-semibold">Temperature Profile</span>
                    </div>
                    <div className="h-24 bg-primary-foreground/20 rounded border-2 border-dashed border-primary-foreground/40 flex items-center justify-center">
                      <span className="text-sm">T-S Diagram Visualization</span>
                    </div>
                  </div>
                  <div className="h-44 bg-gradient-surface rounded-lg p-4 text-accent-foreground">
                    <div className="flex items-center space-x-2 mb-3">
                      <Droplets className="w-5 h-5" />
                      <span className="font-semibold">Salinity Levels</span>
                    </div>
                    <div className="h-24 bg-accent-foreground/20 rounded border-2 border-dashed border-accent-foreground/40 flex items-center justify-center">
                      <span className="text-sm">Depth Profile Chart</span>
                    </div>
                  </div>
                </div>
                <div className="h-44 bg-gradient-ocean rounded-lg p-4 text-primary-foreground">
                  <div className="flex items-center space-x-2 mb-3">
                    <Waves className="w-5 h-5" />
                    <span className="font-semibold">Multi-Parameter Analysis</span>
                  </div>
                  <div className="h-24 bg-primary-foreground/20 rounded border-2 border-dashed border-primary-foreground/40 flex items-center justify-center">
                    <span className="text-sm">Comparative Profile Analysis</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analysis" className="space-y-4">
                <div className="h-96 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg border-2 border-dashed border-accent/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="p-4 rounded-full bg-gradient-surface mx-auto w-fit">
                      <BarChart3 className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">AI-Powered Analytics</h4>
                      <p className="text-muted-foreground">Advanced pattern recognition and insights</p>
                      <div className="flex justify-center space-x-2 mt-3">
                        <Badge>Anomaly Detection</Badge>
                        <Badge>Trend Analysis</Badge>
                        <Badge>Seasonal Patterns</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <Card className="p-4 text-center hover:shadow-data transition-all duration-300">
            <div className="text-2xl font-bold text-primary mb-1">3,847</div>
            <div className="text-sm text-muted-foreground">Active Floats</div>
          </Card>
          <Card className="p-4 text-center hover:shadow-data transition-all duration-300">
            <div className="text-2xl font-bold text-accent mb-1">2.1M</div>
            <div className="text-sm text-muted-foreground">Total Profiles</div>
          </Card>
          <Card className="p-4 text-center hover:shadow-data transition-all duration-300">
            <div className="text-2xl font-bold text-primary-deep mb-1">67</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </Card>
          <Card className="p-4 text-center hover:shadow-data transition-all duration-300">
            <div className="text-2xl font-bold text-accent mb-1">99.2%</div>
            <div className="text-sm text-muted-foreground">Ocean Coverage</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;