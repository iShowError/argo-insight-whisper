import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Waves, Github, Twitter, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-muted/30 to-background border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        
        {/* Main footer content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-ocean">
                <Waves className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">ARGO Data System</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Democratizing access to global ocean data through AI-powered natural language interfaces 
              and intelligent visualization.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Data Explorer
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                AI Chat Interface
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                API Access
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                ARGO Program
                <ExternalLink className="w-3 h-3 inline ml-1" />
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Research Papers
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Tutorials
              </a>
            </div>
          </div>

          {/* Data sources */}
          <div>
            <h4 className="font-semibold mb-4">Data Sources</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Global ARGO Database
                <ExternalLink className="w-3 h-3 inline ml-1" />
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                GDAC Centers
                <ExternalLink className="w-3 h-3 inline ml-1" />
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Quality Control
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Data Policy
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 ARGO Data System. Built for the global oceanographic research community.
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Data Usage</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;