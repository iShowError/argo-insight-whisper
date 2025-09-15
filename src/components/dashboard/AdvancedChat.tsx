import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  MicOff, 
  Paperclip, 
  ThumbsUp, 
  ThumbsDown,
  Copy,
  Download,
  BarChart3,
  MapPin,
  Thermometer,
  Lightbulb
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  attachments?: string[];
  suggestions?: string[];
  data?: any;
  rating?: 'up' | 'down';
}

interface QuerySuggestion {
  category: string;
  icon: any;
  queries: string[];
}

const AdvancedChat = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message: "Hello! I'm your ARGO oceanographic data assistant. I can help you explore global ocean data, analyze temperature and salinity profiles, find specific measurements, and generate visualizations. What would you like to know about the ocean today?",
      timestamp: new Date(),
      suggestions: [
        "Show me temperature profiles in the North Atlantic",
        "Find floats with high salinity measurements",
        "Compare winter vs summer temperatures",
        "What's the deepest measurement available?"
      ]
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const querySuggestions: QuerySuggestion[] = [
    {
      category: "Spatial Queries",
      icon: MapPin,
      queries: [
        "Show floats in the Mediterranean Sea",
        "Find data near coordinates 45°N, 30°W",
        "What's the temperature distribution in the Pacific?",
        "Show me Arctic Ocean measurements"
      ]
    },
    {
      category: "Parameter Analysis",
      icon: Thermometer,
      queries: [
        "Find profiles with temperature anomalies",
        "Show salinity gradients with depth",
        "Compare oxygen levels across regions",
        "What are the chlorophyll concentrations?"
      ]
    },
    {
      category: "Data Visualization",
      icon: BarChart3,
      queries: [
        "Create a T-S diagram for this region",
        "Plot temperature vs depth profiles",
        "Show seasonal temperature variations",
        "Generate a comparison chart"
      ]
    }
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    
    setIsLoading(true);
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: chatMessage,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setChatMessage('');

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate intelligent response based on query
    const botResponse = generateBotResponse(chatMessage);
    setChatHistory(prev => [...prev, botResponse]);
    setIsLoading(false);
  };

  const generateBotResponse = (query: string): ChatMessage => {
    const lowerQuery = query.toLowerCase();
    
    let response = '';
    let suggestions: string[] = [];
    let data = null;

    if (lowerQuery.includes('temperature') || lowerQuery.includes('thermal')) {
      response = "I found 2,847 temperature profiles matching your criteria. The average surface temperature is 18.5°C, with a standard deviation of 4.2°C. The deepest measurements reach 2,000m depth, showing typical thermocline structure with rapid temperature decrease in the upper 200m.";
      suggestions = [
        "Show me the temperature profile visualization",
        "Compare with historical averages",
        "Find temperature anomalies",
        "Export this temperature data"
      ];
      data = { type: 'temperature_analysis', profiles: 2847, avgTemp: 18.5 };
    } else if (lowerQuery.includes('salinity')) {
      response = "Found 1,956 salinity profiles in your specified region. Salinity ranges from 34.1 to 37.2 PSU, with mean values of 35.6 PSU. Notable halocline features are present between 50-150m depth, indicating water mass boundaries.";
      suggestions = [
        "Create a salinity depth profile",
        "Show T-S diagram",
        "Identify water masses",
        "Compare regional salinity patterns"
      ];
      data = { type: 'salinity_analysis', profiles: 1956, avgSalinity: 35.6 };
    } else if (lowerQuery.includes('float') || lowerQuery.includes('location')) {
      response = "Located 247 active ARGO floats in the specified region. The floats have collected 15,623 profiles over the past 2 years. Coverage includes depths from surface to 2,000m with 10-day sampling intervals.";
      suggestions = [
        "Show float locations on map",
        "Display float trajectories",
        "Check float data quality",
        "Find nearby measurements"
      ];
      data = { type: 'float_search', floats: 247, profiles: 15623 };
    } else if (lowerQuery.includes('oxygen') || lowerQuery.includes('bgc')) {
      response = "Biogeochemical ARGO data shows oxygen concentrations ranging from 180-280 μmol/kg in surface waters, decreasing to 40-120 μmol/kg in intermediate waters. Oxygen minimum zones are clearly defined between 200-800m depth.";
      suggestions = [
        "Plot oxygen vs depth profile",
        "Show oxygen minimum zones",
        "Compare with chlorophyll data",
        "Analyze seasonal oxygen trends"
      ];
      data = { type: 'bgc_analysis', parameter: 'oxygen' };
    } else {
      response = "I can help you explore ARGO oceanographic data in many ways. You can ask about specific parameters (temperature, salinity, oxygen), geographic regions, time periods, or request data visualizations. What specific aspect of ocean data interests you?";
      suggestions = [
        "Show me a global overview",
        "Find data in a specific region",
        "Analyze temperature trends",
        "Create a custom visualization"
      ];
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      message: response,
      timestamp: new Date(),
      suggestions,
      data
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setChatMessage(suggestion);
  };

  const rateMessage = (messageId: string, rating: 'up' | 'down') => {
    setChatHistory(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, rating } : msg
      )
    );
  };

  const copyMessage = (message: string) => {
    navigator.clipboard.writeText(message);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording implementation would go here
  };

  return (
    <div className="flex flex-col h-full">
      {/* Quick Start Suggestions */}
      <div className="mb-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Quick Start</span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {querySuggestions.map((category, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center space-x-2 mb-2">
                <category.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{category.category}</span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {category.queries.slice(0, 2).map((query, queryIndex) => (
                  <Button
                    key={queryIndex}
                    variant="ghost"
                    size="sm"
                    className="justify-start text-xs h-7"
                    onClick={() => handleSuggestionClick(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/30 rounded-lg border min-h-[300px]">
        {chatHistory.map((chat) => (
          <div key={chat.id} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-3 max-w-[85%] ${chat.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`p-2 rounded-full flex-shrink-0 ${chat.type === 'user' ? 'bg-primary' : 'bg-accent'}`}>
                {chat.type === 'user' ? 
                  <User className="w-4 h-4 text-primary-foreground" /> : 
                  <Bot className="w-4 h-4 text-accent-foreground" />
                }
              </div>

              {/* Message Content */}
              <div className={`space-y-2 ${chat.type === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`p-3 rounded-lg max-w-full ${
                  chat.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card border'
                }`}>
                  <p className="text-sm leading-relaxed">{chat.message}</p>
                  
                  {/* Timestamp */}
                  <div className={`text-xs mt-2 opacity-70 ${chat.type === 'user' ? 'text-right' : 'text-left'}`}>
                    {chat.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                {/* Bot message features */}
                {chat.type === 'bot' && (
                  <div className="space-y-2 w-full">
                    {/* Data Preview */}
                    {chat.data && (
                      <Card className="p-3 bg-accent/10">
                        <div className="text-xs text-muted-foreground mb-1">Data Summary</div>
                        <div className="text-sm">
                          {chat.data.type === 'temperature_analysis' && (
                            <div className="flex justify-between">
                              <span>Profiles: {chat.data.profiles}</span>
                              <span>Avg Temp: {chat.data.avgTemp}°C</span>
                            </div>
                          )}
                          {chat.data.type === 'salinity_analysis' && (
                            <div className="flex justify-between">
                              <span>Profiles: {chat.data.profiles}</span>
                              <span>Avg Salinity: {chat.data.avgSalinity} PSU</span>
                            </div>
                          )}
                          {chat.data.type === 'float_search' && (
                            <div className="flex justify-between">
                              <span>Floats: {chat.data.floats}</span>
                              <span>Profiles: {chat.data.profiles}</span>
                            </div>
                          )}
                        </div>
                      </Card>
                    )}

                    {/* Suggestions */}
                    {chat.suggestions && chat.suggestions.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Suggested follow-ups:</div>
                        <div className="flex flex-wrap gap-2">
                          {chat.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-7"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Message Actions */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => rateMessage(chat.id, 'up')}
                        className={`h-7 ${chat.rating === 'up' ? 'text-green-600' : ''}`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => rateMessage(chat.id, 'down')}
                        className={`h-7 ${chat.rating === 'down' ? 'text-red-600' : ''}`}
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyMessage(chat.message)}
                        className="h-7"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      {chat.data && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-accent">
                <Bot className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="bg-card border p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="space-y-2">
        <div className="flex space-x-2">
          <Textarea
            placeholder="Ask about ARGO ocean data... (e.g., 'Show temperature profiles in the North Atlantic')"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
            className="flex-1 min-h-[44px] max-h-32 resize-none"
          />
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={handleSendMessage} 
              disabled={!chatMessage.trim() || isLoading}
              className="h-11"
            >
              <Send className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={toggleRecording}
              className={`h-11 ${isRecording ? 'text-red-500' : ''}`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>{chatHistory.length} messages</span>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        accept=".nc,.csv,.txt"
      />
    </div>
  );
};

export default AdvancedChat;