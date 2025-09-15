import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Thermometer, Droplets, Filter, Download } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ARGOFloat {
  id: string;
  platform_number: string;
  latitude: number;
  longitude: number;
  last_update: string;
  status: 'active' | 'inactive';
  profiles_count: number;
  trajectory?: [number, number][];
  temperature?: number;
  salinity?: number;
  depth?: number;
}

const InteractiveMap = () => {
  const [floats, setFloats] = useState<ARGOFloat[]>([]);
  const [filteredFloats, setFilteredFloats] = useState<ARGOFloat[]>([]);
  const [selectedFloat, setSelectedFloat] = useState<ARGOFloat | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    minProfiles: '',
    region: 'all'
  });

  // Mock ARGO float data
  useEffect(() => {
    const mockFloats: ARGOFloat[] = [
      {
        id: '1',
        platform_number: '1901393',
        latitude: 45.2,
        longitude: -30.5,
        last_update: '2024-01-15',
        status: 'active',
        profiles_count: 247,
        temperature: 15.8,
        salinity: 35.2,
        depth: 2000,
        trajectory: [
          [45.2, -30.5],
          [45.1, -30.6],
          [44.9, -30.8],
          [44.8, -31.0]
        ]
      },
      {
        id: '2',
        platform_number: '1901394',
        latitude: 35.7,
        longitude: -25.3,
        last_update: '2024-01-14',
        status: 'active',
        profiles_count: 189,
        temperature: 18.5,
        salinity: 36.1,
        depth: 1800,
        trajectory: [
          [35.7, -25.3],
          [35.6, -25.4],
          [35.5, -25.6]
        ]
      },
      {
        id: '3',
        platform_number: '1901395',
        latitude: 25.1,
        longitude: -40.8,
        last_update: '2024-01-10',
        status: 'inactive',
        profiles_count: 156,
        temperature: 22.1,
        salinity: 35.8,
        depth: 1500
      },
      {
        id: '4',
        platform_number: '1901396',
        latitude: 55.3,
        longitude: -15.2,
        last_update: '2024-01-16',
        status: 'active',
        profiles_count: 312,
        temperature: 12.4,
        salinity: 34.9,
        depth: 2200
      }
    ];
    setFloats(mockFloats);
    setFilteredFloats(mockFloats);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = floats;
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(f => f.status === filters.status);
    }
    
    if (filters.minProfiles) {
      filtered = filtered.filter(f => f.profiles_count >= parseInt(filters.minProfiles));
    }

    setFilteredFloats(filtered);
  }, [filters, floats]);

  const createCustomIcon = (status: string) => {
    const color = status === 'active' ? '#10b981' : '#ef4444';
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      className: 'custom-marker',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-4 h-4 text-primary" />
          <span className="font-medium">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({...prev, status: value}))}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            placeholder="Min profiles"
            type="number"
            value={filters.minProfiles}
            onChange={(e) => setFilters(prev => ({...prev, minProfiles: e.target.value}))}
          />
          
          <Select value={filters.region} onValueChange={(value) => setFilters(prev => ({...prev, region: value}))}>
            <SelectTrigger>
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="atlantic">North Atlantic</SelectItem>
              <SelectItem value="pacific">Pacific</SelectItem>
              <SelectItem value="arctic">Arctic</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </Button>
        </div>
      </Card>

      {/* Map */}
      <Card className="p-4">
        <div className="h-96 rounded-lg overflow-hidden">
          <MapContainer
            center={[40.0, -30.0]}
            zoom={3}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {filteredFloats.map((float) => (
              <div key={float.id}>
                <Marker
                  position={[float.latitude, float.longitude]}
                  icon={createCustomIcon(float.status)}
                  eventHandlers={{
                    click: () => setSelectedFloat(float)
                  }}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <div className="font-semibold mb-2">Float {float.platform_number}</div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <Badge variant={float.status === 'active' ? 'default' : 'secondary'}>
                            {float.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Profiles:</span>
                          <span>{float.profiles_count}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Update:</span>
                          <span>{float.last_update}</span>
                        </div>
                        {float.temperature && (
                          <div className="flex justify-between">
                            <span className="flex items-center">
                              <Thermometer className="w-3 h-3 mr-1" />
                              Temp:
                            </span>
                            <span>{float.temperature}°C</span>
                          </div>
                        )}
                        {float.salinity && (
                          <div className="flex justify-between">
                            <span className="flex items-center">
                              <Droplets className="w-3 h-3 mr-1" />
                              Salinity:
                            </span>
                            <span>{float.salinity} PSU</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
                
                {/* Trajectory */}
                {float.trajectory && float.trajectory.length > 1 && (
                  <Polyline
                    positions={float.trajectory}
                    color={float.status === 'active' ? '#10b981' : '#ef4444'}
                    weight={2}
                    opacity={0.7}
                  />
                )}
              </div>
            ))}
          </MapContainer>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{filteredFloats.length}</div>
          <div className="text-sm text-muted-foreground">Displayed Floats</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {filteredFloats.filter(f => f.status === 'active').length}
          </div>
          <div className="text-sm text-muted-foreground">Active Floats</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {filteredFloats.reduce((sum, f) => sum + f.profiles_count, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Profiles</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {Math.round(filteredFloats.reduce((sum, f) => sum + (f.temperature || 0), 0) / filteredFloats.length * 10) / 10}°C
          </div>
          <div className="text-sm text-muted-foreground">Avg Temperature</div>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;