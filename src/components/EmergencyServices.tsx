
import { useState } from "react";
import { Ambulance, Police, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

type Coordinates = {
  latitude: number;
  longitude: number;
} | null;

type EmergencyPlace = {
  name: string;
  address: string;
  distance: string;
  phone?: string;
};

const EmergencyServices = () => {
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<EmergencyPlace[]>([]);
  const [nearbyPoliceStations, setNearbyPoliceStations] = useState<EmergencyPlace[]>([]);

  const getUserLocation = () => {
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserLocation(coordinates);
          
          // In a real app, we would call APIs to get nearby hospitals and police stations
          // For demo purposes, we'll simulate a response after a short delay
          setTimeout(() => {
            simulateNearbyPlaces();
            setLoading(false);
          }, 1500);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to get your location. Please enable location services.");
          setLoading(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  const simulateNearbyPlaces = () => {
    // Simulated data for demonstration
    setNearbyHospitals([
      {
        name: "City General Hospital",
        address: "123 Health Ave, 1.2 miles away",
        distance: "1.2 miles",
        phone: "555-123-4567"
      },
      {
        name: "Community Medical Center",
        address: "456 Care Blvd, 2.3 miles away",
        distance: "2.3 miles",
        phone: "555-987-6543"
      },
      {
        name: "Urgent Care Clinic",
        address: "789 Emergency Rd, 3.1 miles away",
        distance: "3.1 miles",
        phone: "555-456-7890"
      }
    ]);

    setNearbyPoliceStations([
      {
        name: "Downtown Police Station",
        address: "101 Safety St, 0.8 miles away",
        distance: "0.8 miles",
        phone: "555-911-0000"
      },
      {
        name: "West District Police",
        address: "202 Security Ave, 1.7 miles away",
        distance: "1.7 miles",
        phone: "555-911-1111"
      }
    ]);
  };

  const sendEmergencySOS = () => {
    toast.success("Emergency SOS sent! Help is on the way.", {
      description: "Your location has been shared with emergency services.",
      duration: 5000
    });
  };

  const openDirections = (place: EmergencyPlace) => {
    if (!userLocation) return;
    
    toast.info(`Opening directions to ${place.name}`, {
      description: "This would open your maps app in a real application."
    });
    
    // In a real app, this would open maps with directions
    // window.open(`https://maps.google.com?q=${place.name}`, '_blank');
  };

  return (
    <div className="space-y-4">
      {!userLocation ? (
        <div className="text-center py-4">
          <p className="mb-4">To find nearby emergency services, we need your location</p>
          <Button 
            onClick={getUserLocation} 
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Location...
              </>
            ) : (
              <>
                <MapPin className="mr-2 h-4 w-4" />
                Find Nearby Services
              </>
            )}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Your location has been found</h3>
            <Button 
              onClick={sendEmergencySOS}
              variant="destructive"
              className="animate-pulse"
            >
              Send Emergency SOS
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Ambulance className="h-5 w-5 text-red-500" />
                <h3 className="font-medium">Nearby Hospitals</h3>
              </div>
              <div className="grid gap-3">
                {nearbyHospitals.map((hospital, index) => (
                  <Card key={index} className="hover:border-red-200 transition-colors">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{hospital.name}</h4>
                          <p className="text-sm text-muted-foreground">{hospital.address}</p>
                          {hospital.phone && (
                            <p className="text-sm mt-1">📞 {hospital.phone}</p>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8" 
                          onClick={() => openDirections(hospital)}
                        >
                          Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Police className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Nearby Police Stations</h3>
              </div>
              <div className="grid gap-3">
                {nearbyPoliceStations.map((station, index) => (
                  <Card key={index} className="hover:border-blue-200 transition-colors">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{station.name}</h4>
                          <p className="text-sm text-muted-foreground">{station.address}</p>
                          {station.phone && (
                            <p className="text-sm mt-1">📞 {station.phone}</p>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8" 
                          onClick={() => openDirections(station)}
                        >
                          Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmergencyServices;
