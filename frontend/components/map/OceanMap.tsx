"use client";

import React, { useEffect, useState } from "react";
import { Compass, Eye, Filter, RefreshCw, ChevronRight } from "lucide-react";

interface FloatMarker {
  float_id: string;
  latitude: number;
  longitude: number;
  region: string;
  data_mode?: string;
}

interface OceanMapProps {
  mapPoints?: FloatMarker[];
  selectedRegion?: string;
  onSelectFloat?: (float_id: string) => void;
  height?: string;
}

export default function OceanMap({
  mapPoints = [],
  selectedRegion = "All",
  onSelectFloat,
  height = "h-[450px]"
}: OceanMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [activeFloat, setActiveFloat] = useState<FloatMarker | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Default fallback markers if mapPoints empty
  const defaultPoints: FloatMarker[] = [
    { float_id: "WMO-2902456", latitude: 15.2, longitude: 72.5, region: "Arabian Sea", data_mode: "REALTIME" },
    { float_id: "WMO-2902488", latitude: 18.4, longitude: 68.1, region: "Arabian Sea", data_mode: "REALTIME" },
    { float_id: "WMO-2903112", latitude: 12.8, longitude: 85.3, region: "Bay of Bengal", data_mode: "REALTIME" },
    { float_id: "WMO-2903190", latitude: 16.1, longitude: 88.7, region: "Bay of Bengal", data_mode: "REALTIME" },
    { float_id: "WMO-5904821", latitude: -2.4, longitude: 75.8, region: "Equatorial Indian Ocean", data_mode: "DELAYED" },
    { float_id: "WMO-2901990", latitude: 17.1, longitude: 71.8, region: "Indian Coast (Mumbai)", data_mode: "REALTIME" }
  ];

  const pointsToRender = mapPoints.length > 0 ? mapPoints : defaultPoints;

  return (
    <div className={`relative w-full ${height} rounded border border-[#E2D9C8] overflow-hidden bg-[#E5E0D5]`}>
      
      {/* Top Cartographic Info Bar */}
      <div className="absolute top-3 left-3 z-[400] bg-[#FBF9F3]/95 backdrop-blur border border-[#E2D9C8] rounded px-3 py-1.5 shadow-card flex items-center space-x-3 text-xs text-[#252824]">
        <div className="flex items-center space-x-1 font-semibold">
          <Compass className="w-3.5 h-3.5 text-[#537C70]" />
          <span>INDIAN OCEAN ARGO CARTOGRAPHY</span>
        </div>
        <span className="text-[#E2D9C8]">|</span>
        <span className="text-[#5A5D57]">{pointsToRender.length} Floats Active</span>
      </div>

      {/* Dynamic Leaflet Map Container */}
      {isClient ? (
        <MapComponent points={pointsToRender} onSelectFloat={(f) => {
          setActiveFloat(f);
          if (onSelectFloat) onSelectFloat(f.float_id);
        }} />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-xs text-[#5A5D57]">
          Loading oceanographic cartography...
        </div>
      )}

      {/* Active Float Inspection Card */}
      {activeFloat && (
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:w-80 z-[400] bg-[#FBF9F3] border border-[#537C70] rounded-lg p-3 shadow-editorial">
          <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-1.5 mb-2">
            <span className="font-serif font-bold text-sm text-[#252824]">{activeFloat.float_id}</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[#537C70]/10 text-[#537C70]">
              {activeFloat.data_mode || "ACTIVE"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-[#5A5D57] mb-2">
            <div>
              <span className="block text-[10px] uppercase text-[#879C87]">Region</span>
              <span className="font-medium text-[#252824]">{activeFloat.region}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-[#879C87]">Coordinates</span>
              <span className="font-medium text-[#252824]">{activeFloat.latitude}° N, {activeFloat.longitude}° E</span>
            </div>
          </div>
          <button
            onClick={() => onSelectFloat && onSelectFloat(activeFloat.float_id)}
            className="w-full text-center bg-[#252824] hover:bg-[#537C70] text-[#F5F1E8] text-xs font-medium py-1.5 rounded transition-colors flex items-center justify-center space-x-1"
          >
            <span>Inspect Vertical Profile</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

// Sub-component for client-only Leaflet rendering
function MapComponent({ points, onSelectFloat }: { points: FloatMarker[]; onSelectFloat: (f: FloatMarker) => void }) {
  useEffect(() => {
    const L = require("leaflet");
    
    // Initialize Map centered over Arabian Sea / Bay of Bengal
    const map = L.map("leaflet-map-canvas", {
      center: [14.0, 78.0],
      zoom: 5,
      zoomControl: false,
    });

    L.control.zoom({ position: "topright" }).addTo(map);

    // Warm Editorial Cartographic Tile Layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      maxZoom: 18,
      subdomains: "abcd",
      attribution: "&copy; OpenStreetMap &copy; CARTO &copy; ARGO MoES",
    }).addTo(map);

    // Custom Icon Definition
    const floatIcon = L.divIcon({
      className: "custom-argo-marker",
      html: `<div style="background-color: #537C70; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #FBF9F3; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });

    // Render Markers
    points.forEach((p) => {
      const marker = L.marker([p.latitude, p.longitude], { icon: floatIcon }).addTo(map);
      marker.on("click", () => onSelectFloat(p));
    });

    return () => {
      map.remove();
    };
  }, [points]);

  return <div id="leaflet-map-canvas" className="w-full h-full z-0" />;
}
