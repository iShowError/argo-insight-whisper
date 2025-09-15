import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Waves, Database, Brain, MapPin, TrendingUp, Zap } from "lucide-react";
import heroImage from "@/assets/hero-ocean.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-deep/90 via-primary/80 to-accent/70" />
      </div>

      {/* Floating elements for animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-accent/30 rounded-full blur-sm animate-float" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-primary-light/40 rounded-full blur-sm animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-accent/50 rounded-full blur-sm animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-primary-light/30 rounded-full blur-sm animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen">
          
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0">
            <Badge variant="outline" className="mb-6 border-primary-light/30 text-primary-light bg-primary-light/10 backdrop-blur-sm">
              <Zap className="w-3 h-3 mr-1" />
              AI-Powered Ocean Data
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              ARGO Float
              <span className="block bg-gradient-to-r from-accent via-primary-light to-accent bg-clip-text text-transparent animate-pulse-gentle">
                Data System
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-primary-light/90 mb-8 max-w-2xl leading-relaxed">
              Democratizing access to global ocean data through AI-powered natural language querying 
              and intelligent visualization of ARGO float measurements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                <Brain className="w-5 h-5 mr-2" />
                Start Exploring
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-light/30 text-primary-light hover:bg-primary-light/10 backdrop-blur-sm">
                <Database className="w-5 h-5 mr-2" />
                View Data
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">3,800+</div>
                <div className="text-sm text-primary-light/80">Active Floats</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">2M+</div>
                <div className="text-sm text-primary-light/80">Profiles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">Global</div>
                <div className="text-sm text-primary-light/80">Coverage</div>
              </div>
            </div>
          </div>

          {/* Right content - Feature cards */}
          <div className="flex-1 max-w-lg">
            <div className="grid gap-6">
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary-light/20 hover:shadow-ocean transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-ocean">
                    <Brain className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">AI Chat Interface</h3>
                    <p className="text-muted-foreground">Query ocean data using natural language. Ask complex questions about temperature, salinity, and marine conditions.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary-light/20 hover:shadow-ocean transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-depth">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Interactive Mapping</h3>
                    <p className="text-muted-foreground">Explore float locations, trajectories, and real-time oceanographic data on dynamic global maps.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary-light/20 hover:shadow-ocean transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-surface">
                    <TrendingUp className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Advanced Analytics</h3>
                    <p className="text-muted-foreground">Generate insights from millions of oceanographic measurements with AI-powered analysis and visualization.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave animation */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-full wave-motion"
          style={{ animationDelay: '0.5s' }}
        >
          <path 
            d="M0,20 C300,50 600,0 900,30 C1000,40 1100,20 1200,30 L1200,120 L0,120 Z" 
            fill="hsl(var(--background))"
            opacity="0.8"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;