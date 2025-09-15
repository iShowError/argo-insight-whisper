import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Brain, 
  Activity,
  Download,
  Calendar,
  Globe,
  Thermometer,
  Droplets
} from 'lucide-react';

interface AnalyticsData {
  temporal: any[];
  spatial: any[];
  anomalies: any[];
  patterns: any[];
  statistics: any;
}

const DataAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('1year');
  const [analysisType, setAnalysisType] = useState('comprehensive');
  const [selectedRegion, setSelectedRegion] = useState('global');

  useEffect(() => {
    // Generate mock analytics data
    const generateAnalyticsData = (): AnalyticsData => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      const temporal = months.map(month => ({
        month,
        temperature: 15 + Math.random() * 10,
        salinity: 34.5 + Math.random() * 2,
        profiles: Math.floor(800 + Math.random() * 400),
        anomaly_score: Math.random() * 100
      }));

      const spatial = [
        { region: 'North Atlantic', temperature: 12.5, salinity: 35.1, profiles: 2847, quality: 98.2 },
        { region: 'Pacific', temperature: 18.3, salinity: 34.8, profiles: 4521, quality: 97.8 },
        { region: 'Indian Ocean', temperature: 21.7, salinity: 35.3, profiles: 1963, quality: 96.9 },
        { region: 'Southern Ocean', temperature: 8.2, salinity: 34.6, profiles: 1247, quality: 99.1 },
        { region: 'Arctic', temperature: 1.8, salinity: 32.9, profiles: 456, quality: 95.3 },
        { region: 'Mediterranean', temperature: 19.8, salinity: 38.5, profiles: 789, quality: 98.7 }
      ];

      const anomalies = [
        { 
          id: 'A001', 
          type: 'Temperature Spike', 
          severity: 'High', 
          location: 'North Atlantic', 
          value: '+3.2°C',
          confidence: 94,
          date: '2024-01-12'
        },
        { 
          id: 'A002', 
          type: 'Salinity Drop', 
          severity: 'Medium', 
          location: 'Pacific', 
          value: '-1.8 PSU',
          confidence: 87,
          date: '2024-01-08'
        },
        { 
          id: 'A003', 
          type: 'Deep Water Change', 
          severity: 'Low', 
          location: 'Southern Ocean', 
          value: '+0.9°C',
          confidence: 76,
          date: '2024-01-15'
        }
      ];

      const patterns = [
        { 
          pattern: 'Seasonal Thermocline', 
          strength: 92, 
          frequency: 'Annual',
          regions: ['North Atlantic', 'Pacific'],
          description: 'Strong seasonal thermocline development'
        },
        { 
          pattern: 'El Niño Signal', 
          strength: 78, 
          frequency: 'Irregular',
          regions: ['Tropical Pacific'],
          description: 'Weak El Niño conditions detected'
        },
        { 
          pattern: 'Arctic Warming', 
          strength: 85, 
          frequency: 'Decadal',
          regions: ['Arctic Ocean'],
          description: 'Continued Arctic ocean warming trend'
        }
      ];

      const statistics = {
        total_profiles: 12847,
        active_floats: 3847,
        data_quality: 97.8,
        temporal_coverage: 2.3,
        spatial_coverage: 89.2,
        latest_update: '2024-01-16T14:30:00Z'
      };

      return { temporal, spatial, anomalies, patterns, statistics };
    };

    setAnalyticsData(generateAnalyticsData());
  }, [timeRange, analysisType, selectedRegion]);

  const severityColors = {
    'High': '#ef4444',
    'Medium': '#f59e0b',
    'Low': '#10b981'
  };

  const regionColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  if (!analyticsData) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">AI-Powered Analytics</h3>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
              <SelectItem value="5years">Last 5 Years</SelectItem>
            </SelectContent>
          </Select>

          <Select value={analysisType} onValueChange={setAnalysisType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comprehensive">Comprehensive</SelectItem>
              <SelectItem value="thermal">Thermal Analysis</SelectItem>
              <SelectItem value="salinity">Salinity Focus</SelectItem>
              <SelectItem value="anomaly">Anomaly Detection</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="atlantic">Atlantic</SelectItem>
              <SelectItem value="pacific">Pacific</SelectItem>
              <SelectItem value="indian">Indian Ocean</SelectItem>
              <SelectItem value="arctic">Arctic</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-green-500" />
            <span className="text-sm">Real-time Analysis</span>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{analyticsData.statistics.total_profiles.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Profiles</div>
          <div className="flex items-center justify-center mt-1">
            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
            <span className="text-xs text-green-500">+12%</span>
          </div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{analyticsData.statistics.active_floats}</div>
          <div className="text-sm text-muted-foreground">Active Floats</div>
          <div className="flex items-center justify-center mt-1">
            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
            <span className="text-xs text-green-500">+5%</span>
          </div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{analyticsData.statistics.data_quality}%</div>
          <div className="text-sm text-muted-foreground">Data Quality</div>
          <div className="flex items-center justify-center mt-1">
            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
            <span className="text-xs text-green-500">+0.3%</span>
          </div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{analyticsData.statistics.spatial_coverage}%</div>
          <div className="text-sm text-muted-foreground">Ocean Coverage</div>
          <div className="flex items-center justify-center mt-1">
            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
            <span className="text-xs text-green-500">+1.2%</span>
          </div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-red-500">{analyticsData.anomalies.length}</div>
          <div className="text-sm text-muted-foreground">Active Alerts</div>
          <div className="flex items-center justify-center mt-1">
            <AlertTriangle className="w-3 h-3 text-red-500 mr-1" />
            <span className="text-xs text-red-500">+2</span>
          </div>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="temporal" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="temporal">Temporal Trends</TabsTrigger>
          <TabsTrigger value="spatial">Spatial Analysis</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="patterns">Pattern Recognition</TabsTrigger>
        </TabsList>

        <TabsContent value="temporal" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Thermometer className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">Temperature Trends</h4>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.temporal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Temperature (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Droplets className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">Salinity Patterns</h4>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.temporal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="salinity" 
                    stroke="hsl(var(--accent))" 
                    fill="hsl(var(--accent))"
                    fillOpacity={0.3}
                    name="Salinity (PSU)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-4">Profile Collection Rate</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.temporal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="profiles" 
                    fill="hsl(var(--primary))"
                    name="Profiles Collected"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-4">Anomaly Detection Score</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.temporal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="anomaly_score" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Anomaly Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="spatial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-4">
              <h4 className="font-semibold mb-4">Regional Temperature Distribution</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.spatial} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="region" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="temperature" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-4">Profile Distribution by Region</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.spatial}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ region, percent }) => `${region}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="profiles"
                  >
                    {analyticsData.spatial.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={regionColors[index % regionColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4 lg:col-span-2">
              <h4 className="font-semibold mb-4">Regional Data Quality Matrix</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Region</th>
                      <th className="text-right p-2">Temperature (°C)</th>
                      <th className="text-right p-2">Salinity (PSU)</th>
                      <th className="text-right p-2">Profiles</th>
                      <th className="text-right p-2">Quality (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.spatial.map((region, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{region.region}</td>
                        <td className="p-2 text-right">{region.temperature.toFixed(1)}</td>
                        <td className="p-2 text-right">{region.salinity.toFixed(1)}</td>
                        <td className="p-2 text-right">{region.profiles.toLocaleString()}</td>
                        <td className="p-2 text-right">
                          <Badge variant={region.quality > 97 ? 'default' : region.quality > 95 ? 'secondary' : 'destructive'}>
                            {region.quality}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="anomalies">
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h4 className="font-semibold">Active Anomalies</h4>
                <Badge variant="destructive">{analyticsData.anomalies.length}</Badge>
              </div>
              
              <div className="space-y-3">
                {analyticsData.anomalies.map((anomaly, index) => (
                  <Card key={index} className="p-4 border-l-4" style={{ borderLeftColor: severityColors[anomaly.severity as keyof typeof severityColors] }}>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{anomaly.type}</span>
                          <Badge 
                            variant={anomaly.severity === 'High' ? 'destructive' : anomaly.severity === 'Medium' ? 'secondary' : 'default'}
                          >
                            {anomaly.severity}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Globe className="w-3 h-3" />
                            <span>{anomaly.location}</span>
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{anomaly.date}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{anomaly.value}</div>
                        <div className="text-xs text-muted-foreground">
                          {anomaly.confidence}% confidence
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-4">
              <h4 className="font-semibold mb-4">Detected Patterns</h4>
              <div className="space-y-4">
                {analyticsData.patterns.map((pattern, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{pattern.pattern}</span>
                      <Badge>{pattern.strength}%</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${pattern.strength}%` }}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>Frequency: {pattern.frequency}</div>
                      <div>Regions: {pattern.regions.join(', ')}</div>
                      <div className="mt-1">{pattern.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-4">Pattern Strength Analysis</h4>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={analyticsData.patterns}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="pattern" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={0} domain={[0, 100]} />
                  <Radar
                    name="Pattern Strength"
                    dataKey="strength"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataAnalytics;