
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

interface ElectionMapProps {
  className?: string;
}

const ElectionMap = ({ className }: ElectionMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Simulating map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
          {!isMapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-6 w-6 border-t-2 border-primary rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Loading map...</p>
              </div>
            </div>
          )}
          {isMapLoaded && (
            <div className="absolute inset-0 p-4">
              <div className="h-full w-full flex items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  Interactive election map would be displayed here. <br />
                  (Requires leaflet.js integration)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default ElectionMap;
