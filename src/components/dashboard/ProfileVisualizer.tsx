import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ReferenceLine
} from 'recharts';
import { Thermometer, Droplets, TrendingDown, Download, ArrowLeftRight } from 'lucide-react';

interface ProfileData {
  pressure: number;
  depth: number;
  temperature: number;
  salinity: number;
  oxygen?: number;
  chlorophyll?: number;
  qc_flag: number;
}

interface Profile {
  id: string;
  float_id: string;
  cycle_number: number;
  date: string;
  latitude: number;
  longitude: number;
  data: ProfileData[];
}

const ProfileVisualizer = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [comparisonProfile, setComparisonProfile] = useState<string>('');
  const [viewMode, setViewMode] = useState<'single' | 'comparison'>('single');

  // Mock profile data
  useEffect(() => {
    const generateProfileData = (baseTemp: number, baseSalinity: number): ProfileData[] => {
      const data: ProfileData[] = [];
      for (let i = 0; i <= 100; i++) {
        const pressure = i * 20; // 0 to 2000 dbar
        const depth = pressure * 1.01; // Approximate depth conversion
        
        // Realistic temperature and salinity profiles
        const tempDecay = Math.exp(-depth / 1000);
        const temperature = baseTemp * tempDecay + (2 + Math.random() * 2);
        const salinity = baseSalinity + (depth / 2000) * 0.5 + Math.random() * 0.2 - 0.1;
        
        data.push({
          pressure,
          depth,
          temperature: Math.round(temperature * 100) / 100,
          salinity: Math.round(salinity * 100) / 100,
          oxygen: depth < 1000 ? 200 + Math.random() * 50 : 150 + Math.random() * 30,
          chlorophyll: depth < 200 ? Math.random() * 2 : Math.random() * 0.1,
          qc_flag: Math.random() > 0.95 ? 4 : 1 // Mostly good quality
        });
      }
      return data;
    };

    const mockProfiles: Profile[] = [
      {
        id: '1',
        float_id: '1901393',
        cycle_number: 247,
        date: '2024-01-15',
        latitude: 45.2,
        longitude: -30.5,
        data: generateProfileData(20, 35.0)
      },
      {
        id: '2',
        float_id: '1901394',
        cycle_number: 189,
        date: '2024-01-14',
        latitude: 35.7,
        longitude: -25.3,
        data: generateProfileData(22, 36.1)
      },
      {
        id: '3',
        float_id: '1901395',
        cycle_number: 156,
        date: '2024-01-10',
        latitude: 25.1,
        longitude: -40.8,
        data: generateProfileData(25, 35.8)
      }
    ];

    setProfiles(mockProfiles);
    setSelectedProfile(mockProfiles[0].id);
  }, []);

  const selectedProfileData = profiles.find(p => p.id === selectedProfile);
  const comparisonProfileData = profiles.find(p => p.id === comparisonProfile);

  const createTSData = (profile: Profile) => {
    return profile.data.map(d => ({
      temperature: d.temperature,
      salinity: d.salinity,
      depth: d.depth,
      qc: d.qc_flag
    }));
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold">Profile Analysis</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'single' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('single')}
              >
                Single Profile
              </Button>
              <Button
                variant={viewMode === 'comparison' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('comparison')}
              >
                <ArrowLeftRight className="w-4 h-4 mr-1" />
                Compare
              </Button>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export Data
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={selectedProfile} onValueChange={setSelectedProfile}>
            <SelectTrigger>
              <SelectValue placeholder="Select primary profile" />
            </SelectTrigger>
            <SelectContent>
              {profiles.map(profile => (
                <SelectItem key={profile.id} value={profile.id}>
                  Float {profile.float_id} - Cycle {profile.cycle_number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {viewMode === 'comparison' && (
            <Select value={comparisonProfile} onValueChange={setComparisonProfile}>
              <SelectTrigger>
                <SelectValue placeholder="Select comparison profile" />
              </SelectTrigger>
              <SelectContent>
                {profiles.filter(p => p.id !== selectedProfile).map(profile => (
                  <SelectItem key={profile.id} value={profile.id}>
                    Float {profile.float_id} - Cycle {profile.cycle_number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {selectedProfileData && (
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                {selectedProfileData.date}
              </Badge>
              <Badge variant="secondary">
                {selectedProfileData.data.length} measurements
              </Badge>
            </div>
          )}
        </div>
      </Card>

      {/* Visualizations */}
      <Tabs defaultValue="depth-profiles" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="depth-profiles">Depth Profiles</TabsTrigger>
          <TabsTrigger value="ts-diagram">T-S Diagram</TabsTrigger>
          <TabsTrigger value="multi-param">Multi-Parameter</TabsTrigger>
          <TabsTrigger value="quality">Quality Control</TabsTrigger>
        </TabsList>

        <TabsContent value="depth-profiles" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temperature Profile */}
            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Thermometer className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">Temperature Profile</h4>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={selectedProfileData?.data || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="temperature" 
                    label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    dataKey="depth"
                    domain={['dataMax', 'dataMin']}
                    label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`${value}°C`, 'Temperature']}
                    labelFormatter={(label) => `Depth: ${label}m`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                  {viewMode === 'comparison' && comparisonProfileData && (
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      data={comparisonProfileData.data}
                      stroke="hsl(var(--accent))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Salinity Profile */}
            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Droplets className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">Salinity Profile</h4>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={selectedProfileData?.data || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="salinity" 
                    label={{ value: 'Salinity (PSU)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    dataKey="depth"
                    domain={['dataMax', 'dataMin']}
                    label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`${value} PSU`, 'Salinity']}
                    labelFormatter={(label) => `Depth: ${label}m`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="salinity" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    dot={false}
                  />
                  {viewMode === 'comparison' && comparisonProfileData && (
                    <Line 
                      type="monotone" 
                      dataKey="salinity" 
                      data={comparisonProfileData.data}
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ts-diagram">
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingDown className="w-4 h-4 text-primary" />
              <h4 className="font-semibold">Temperature-Salinity Diagram</h4>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number"
                  dataKey="salinity"
                  domain={['dataMin - 0.1', 'dataMax + 0.1']}
                  label={{ value: 'Salinity (PSU)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  type="number"
                  dataKey="temperature"
                  domain={['dataMin - 1', 'dataMax + 1']}
                  label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value, name, props) => [
                    name === 'temperature' ? `${value}°C` : `${value} PSU`,
                    name === 'temperature' ? 'Temperature' : 'Salinity'
                  ]}
                />
                <Legend />
                {selectedProfileData && (
                  <Scatter 
                    name="Primary Profile"
                    data={createTSData(selectedProfileData)} 
                    fill="hsl(var(--primary))"
                  />
                )}
                {viewMode === 'comparison' && comparisonProfileData && (
                  <Scatter 
                    name="Comparison Profile"
                    data={createTSData(comparisonProfileData)} 
                    fill="hsl(var(--accent))"
                  />
                )}
              </ScatterChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="multi-param">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-4">
              <h4 className="font-semibold mb-4">Oxygen Profile</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={selectedProfileData?.data || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="oxygen" label={{ value: 'Oxygen (μmol/kg)', position: 'insideBottom', offset: -5 }} />
                  <YAxis 
                    dataKey="depth" 
                    domain={['dataMax', 'dataMin']}
                    label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="oxygen" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-4">Chlorophyll Profile</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={selectedProfileData?.data || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="chlorophyll" label={{ value: 'Chl-a (mg/m³)', position: 'insideBottom', offset: -5 }} />
                  <YAxis 
                    dataKey="depth" 
                    domain={['dataMax', 200]}
                    label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="chlorophyll" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality">
          <Card className="p-4">
            <h4 className="font-semibold mb-4">Quality Control Assessment</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedProfileData?.data.filter(d => d.qc_flag === 1).length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Good Quality</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {selectedProfileData?.data.filter(d => d.qc_flag === 2).length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Probably Good</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {selectedProfileData?.data.filter(d => d.qc_flag === 3).length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Correctable</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {selectedProfileData?.data.filter(d => d.qc_flag === 4).length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Bad Quality</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileVisualizer;