
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface ElectionMapProps {
  className?: string;
}

const ElectionMap = ({ className }: ElectionMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [showTokenInput, setShowTokenInput] = useState(true);

  // This simulates state election results data
  const stateResults = [
    { state: "Andhra Pradesh", winner: "PartyB", coordinates: [83.2184, 17.6868] },
    { state: "Arunachal Pradesh", winner: "PartyA", coordinates: [94.7278, 27.0844] },
    { state: "Assam", winner: "PartyA", coordinates: [92.9376, 26.2006] },
    { state: "Bihar", winner: "PartyA", coordinates: [85.3131, 25.0961] },
    { state: "Delhi", winner: "PartyC", coordinates: [77.1025, 28.7041] },
    { state: "Gujarat", winner: "PartyA", coordinates: [71.1924, 22.2587] },
    { state: "Karnataka", winner: "PartyB", coordinates: [75.7139, 15.3173] },
    { state: "Kerala", winner: "PartyD", coordinates: [76.2711, 10.8505] },
    { state: "Maharashtra", winner: "PartyA", coordinates: [75.7139, 19.7515] },
    { state: "Tamil Nadu", winner: "PartyD", coordinates: [78.6569, 11.1271] },
    { state: "Telangana", winner: "PartyB", coordinates: [79.0193, 17.1231] },
    { state: "West Bengal", winner: "PartyC", coordinates: [87.8550, 22.9868] },
  ];

  const getPartyColor = (party: string) => {
    const colors: Record<string, string> = {
      PartyA: "#4361ee",
      PartyB: "#ef476f",
      PartyC: "#06d6a0",
      PartyD: "#ffd166",
      Others: "#8d99ae",
    };
    return colors[party] || "#8d99ae";
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken) {
      setShowTokenInput(false);
      initializeMap();
    }
  };

  const initializeMap = () => {
    if (!mapContainerRef.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [83, 23], // Center on India
      zoom: 3.5,
      minZoom: 3,
      maxZoom: 7
    });

    map.current.on('load', () => {
      setIsMapLoaded(true);
      
      // Add markers for each state with election results
      stateResults.forEach(state => {
        const color = getPartyColor(state.winner);
        
        // Create marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'custom-marker';
        markerEl.style.width = '24px';
        markerEl.style.height = '24px';
        markerEl.style.borderRadius = '50%';
        markerEl.style.backgroundColor = color;
        markerEl.style.border = '2px solid white';
        markerEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        
        // Add popup
        const popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setHTML(`
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold;">${state.state}</h3>
              <p style="margin: 0; display: flex; align-items: center;">
                <span style="width: 10px; height: 10px; background-color: ${color}; border-radius: 50%; display: inline-block; margin-right: 6px;"></span>
                Winner: ${state.winner}
              </p>
            </div>
          `);

        // Add marker with popup
        new mapboxgl.Marker(markerEl)
          .setLngLat(state.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Cleanup
    return () => {
      map.current?.remove();
    };
  };

  return (
    <GlassCard
      className={className}
      animateOnScroll={false}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="aspect-[16/9] w-full relative rounded-lg overflow-hidden">
        <div ref={mapContainerRef} className="absolute inset-0 bg-muted/30">
          {showTokenInput ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <p className="text-center text-muted-foreground mb-4">
                To view the interactive election map, please enter your Mapbox access token:
              </p>
              <form onSubmit={handleTokenSubmit} className="w-full max-w-md space-y-2">
                <input
                  type="text"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  placeholder="Enter your Mapbox access token"
                  className="w-full px-3 py-2 border border-border rounded-md"
                />
                <p className="text-xs text-muted-foreground">
                  Get a token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a> (it's free)
                </p>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Load Map
                </button>
              </form>
            </div>
          ) : !isMapLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-6 w-6 border-t-2 border-primary rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Loading map...</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </GlassCard>
  );
};

export default ElectionMap;
