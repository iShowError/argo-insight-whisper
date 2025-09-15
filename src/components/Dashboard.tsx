import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Globe,
  TrendingUp,
  Brain
} from "lucide-react";
import InteractiveMap from "./dashboard/InteractiveMap";
import ProfileVisualizer from "./dashboard/ProfileVisualizer";
import AdvancedChat from "./dashboard/AdvancedChat";
import DataAnalytics from "./dashboard/DataAnalytics";

const Dashboard = () => {

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
          
          {/* Advanced Chat Interface */}
          <Card className="lg:col-span-1 p-6 shadow-ocean">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-ocean">
                <Brain className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">AI Research Assistant</h3>
            </div>
            
            <div className="h-[600px]">
              <AdvancedChat />
            </div>
          </Card>

          {/* Main Visualization Area */}
          <Card className="lg:col-span-2 p-6 shadow-depth">
            <Tabs defaultValue="map" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
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
                  <span>Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center space-x-1">
                  <Brain className="w-4 h-4" />
                  <span>AI Insights</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="map" className="space-y-4 mt-6">
                <InteractiveMap />
              </TabsContent>
              
              <TabsContent value="profiles" className="space-y-4 mt-6">
                <ProfileVisualizer />
              </TabsContent>
              
              <TabsContent value="analysis" className="space-y-4 mt-6">
                <DataAnalytics />
              </TabsContent>

              <TabsContent value="ai" className="space-y-4 mt-6">
                <div className="h-96 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg border-2 border-dashed border-accent/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="p-4 rounded-full bg-gradient-surface mx-auto w-fit">
                      <Brain className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">AI-Powered Research Assistant</h4>
                      <p className="text-muted-foreground">Advanced pattern recognition and oceanographic insights</p>
                      <div className="flex justify-center space-x-2 mt-3">
                        <Badge>Anomaly Detection</Badge>
                        <Badge>Trend Analysis</Badge>
                        <Badge>Seasonal Patterns</Badge>
                        <Badge>Predictive Modeling</Badge>
                      </div>
                      <div className="mt-4 text-sm text-muted-foreground">
                        Coming soon: Advanced AI analysis tools for deeper oceanographic insights
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