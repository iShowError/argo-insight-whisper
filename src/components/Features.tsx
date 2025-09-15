import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Database, 
  MapPin, 
  TrendingUp, 
  Zap, 
  Globe, 
  Search, 
  BarChart3,
  Waves,
  MessageSquare,
  Download,
  Shield
} from "lucide-react";
import researchVessel from "@/assets/research-vessel.jpg";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Querying",
      description: "Ask complex questions about ocean data using natural language. Our AI understands oceanographic terminology and context.",
      gradient: "bg-gradient-ocean",
      highlights: ["Natural Language Processing", "Domain-Specific AI", "Contextual Understanding"]
    },
    {
      icon: Database,
      title: "Comprehensive Data Access",
      description: "Access millions of ARGO float profiles with temperature, salinity, and biogeochemical measurements from global oceans.",
      gradient: "bg-gradient-depth",
      highlights: ["2M+ Profiles", "Real-time Updates", "Quality Controlled"]
    },
    {
      icon: MapPin,
      title: "Interactive Mapping",
      description: "Explore float locations, trajectories, and oceanographic data on dynamic, interactive global maps with advanced filtering.",
      gradient: "bg-gradient-surface",
      highlights: ["Global Coverage", "Real-time Tracking", "Advanced Filters"]
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Generate insights from oceanographic data with AI-powered analysis, anomaly detection, and predictive modeling.",
      gradient: "bg-gradient-ocean",
      highlights: ["Pattern Recognition", "Anomaly Detection", "Trend Analysis"]
    },
    {
      icon: Search,
      title: "Smart Data Discovery",
      description: "Find relevant data quickly with semantic search that understands scientific queries and oceanographic relationships.",
      gradient: "bg-gradient-depth",
      highlights: ["Semantic Search", "Smart Filtering", "Context Aware"]
    },
    {
      icon: BarChart3,
      title: "Rich Visualizations",
      description: "Create publication-ready visualizations including T-S diagrams, depth profiles, and comparative analysis charts.",
      gradient: "bg-gradient-surface",
      highlights: ["T-S Diagrams", "Profile Plots", "Export Ready"]
    }
  ];

  const capabilities = [
    { icon: Globe, text: "Global Ocean Coverage", stat: "99.2%" },
    { icon: Waves, text: "Real-time Data Streams", stat: "24/7" },
    { icon: MessageSquare, text: "AI Response Time", stat: "<2s" },
    { icon: Download, text: "Data Export Formats", stat: "5+" },
    { icon: Shield, text: "Data Quality Control", stat: "100%" },
    { icon: Zap, text: "Query Performance", stat: "Ultra Fast" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-secondary/20">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Zap className="w-3 h-3 mr-1" />
            System Capabilities
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Revolutionizing Ocean
            <span className="block bg-gradient-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent">
              Data Access
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform democratizes access to global oceanographic data, 
            making complex scientific datasets accessible through natural language interactions.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-ocean transition-all duration-500 group border-primary/10 hover:border-primary/30"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Capabilities showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Image side */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-ocean rounded-2xl transform rotate-3 opacity-20" />
            <img 
              src={researchVessel} 
              alt="Oceanographic research vessel deploying ARGO floats"
              className="relative rounded-2xl shadow-depth w-full h-auto object-cover"
            />
            <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3">
              <Badge variant="secondary" className="text-xs">
                <Waves className="w-3 h-3 mr-1" />
                Live Data Stream
              </Badge>
            </div>
          </div>

          {/* Capabilities side */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3">
                <Database className="w-3 h-3 mr-1" />
                System Performance
              </Badge>
              <h3 className="text-3xl font-bold mb-4">
                Built for Scientific Excellence
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our platform is designed to handle the complexity and scale of global oceanographic data, 
                providing researchers and scientists with unprecedented access to ARGO float measurements.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {capabilities.map((capability, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 hover:bg-card transition-colors duration-300"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <capability.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{capability.text}</div>
                    <div className="text-xs text-primary font-semibold">{capability.stat}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Card className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-gradient-ocean">
                    <Brain className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">AI-Enhanced Research</div>
                    <div className="text-sm text-muted-foreground">
                      Accelerate discovery with intelligent data exploration and analysis
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;