"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import OceanMap from "@/components/map/OceanMap";
import FloatProfileDrawer from "@/components/map/FloatProfileDrawer";
import PresentationMode from "@/components/PresentationMode";
import { Filter, Search, Compass, RefreshCw } from "lucide-react";

export default function OceanMapPage() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [floats, setFloats] = useState<any[]>([]);
  const [inspectedFloatId, setInspectedFloatId] = useState<string | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/floats?region=${encodeURIComponent(selectedRegion)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.floats) setFloats(data.floats);
      })
      .catch((err) => console.error("Float load error:", err));
  }, [selectedRegion]);

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col font-sans">
      <Navbar onStartDemo={() => setShowDemoModal(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-4">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2D9C8] pb-3 gap-3">
          <div>
            <span className="text-[10px] font-semibold text-[#537C70] tracking-widest uppercase block">
              GEOSPATIAL CARTOGRAPHY
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#252824]">
              ARGO Ocean Map Explorer
            </h1>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="text-[#879C87] font-semibold uppercase text-[10px]">Region:</span>
            {["All", "Arabian Sea", "Bay of Bengal", "Indian Coast"].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded transition-colors ${
                  selectedRegion === reg
                    ? "bg-[#252824] text-[#F5F1E8] font-semibold"
                    : "bg-[#E8E0D0] text-[#252824] hover:bg-[#D5CBBA]"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Map Frame */}
        <div className="editorial-paper rounded-lg p-3 shadow-editorial">
          <OceanMap
            mapPoints={floats}
            selectedRegion={selectedRegion}
            onSelectFloat={(fid) => setInspectedFloatId(fid)}
            height="h-[calc(100vh-220px)]"
          />
        </div>

      </main>

      {/* Float Profile Drawer */}
      <FloatProfileDrawer
        floatId={inspectedFloatId}
        onClose={() => setInspectedFloatId(null)}
      />

      {showDemoModal && (
        <PresentationMode
          onClose={() => setShowDemoModal(false)}
          onRunQuery={(q) => window.location.href = `/ask?q=${encodeURIComponent(q)}`}
        />
      )}
    </div>
  );
}
