"use client";

import React, { useEffect, useState } from "react";
import { X, Download, Thermometer, Droplets, Compass, Clock, MapPin } from "lucide-react";
import DepthProfileChart from "../charts/DepthProfileChart";

interface FloatProfileDrawerProps {
  floatId: string | null;
  onClose: () => void;
}

export default function FloatProfileDrawer({ floatId, onClose }: FloatProfileDrawerProps) {
  const [floatData, setFloatData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!floatId) return;
    setLoading(true);

    fetch(`http://localhost:8000/api/floats/${floatId}`)
      .then((res) => res.json())
      .then((data) => {
        setFloatData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Float detail error:", err);
        // Fallback demo data
        setFloatData({
          float_id: floatId,
          platform_number: floatId.replace("WMO-", ""),
          region: "Arabian Sea",
          latitude: 15.2,
          longitude: 72.5,
          last_update: "2025-06-12 10:30:00",
          status: "ACTIVE",
          institution: "INCOIS / MoES (India)",
          profiles: generateFallbackProfile()
        });
        setLoading(false);
      });
  }, [floatId]);

  if (!floatId) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-[600] w-full sm:w-[480px] bg-[#FBF9F3] border-l border-[#E2D9C8] shadow-2xl flex flex-col transition-all">
      
      {/* Header */}
      <div className="p-4 border-b border-[#E2D9C8] flex items-center justify-between bg-[#F5F1E8]">
        <div>
          <span className="text-[10px] uppercase font-semibold text-[#537C70] tracking-widest block">
            PROFILING FLOAT PROFILE
          </span>
          <h3 className="font-serif text-lg font-bold text-[#252824]">{floatId}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-[#E8E0D0] text-[#5A5D57] hover:text-[#252824] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-xs text-[#5A5D57]">
          Loading float CTD sensor measurements...
        </div>
      ) : floatData ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Metadata Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="editorial-card p-3 rounded">
              <div className="flex items-center space-x-1.5 text-xs text-[#879C87] mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#537C70]" />
                <span>LOCATION</span>
              </div>
              <p className="text-sm font-semibold text-[#252824]">
                {floatData.latitude}° N, {floatData.longitude}° E
              </p>
              <p className="text-[10px] text-[#5A5D57]">{floatData.region}</p>
            </div>

            <div className="editorial-card p-3 rounded">
              <div className="flex items-center space-x-1.5 text-xs text-[#879C87] mb-1">
                <Clock className="w-3.5 h-3.5 text-[#537C70]" />
                <span>LAST CYCLE</span>
              </div>
              <p className="text-sm font-semibold text-[#252824]">
                {floatData.last_update ? floatData.last_update.split(" ")[0] : "2025-06-12"}
              </p>
              <p className="text-[10px] text-[#537C70] font-medium">{floatData.institution}</p>
            </div>
          </div>

          {/* Depth vs Temperature Chart */}
          <div className="editorial-paper p-4 rounded">
            <div className="flex items-center justify-between mb-3 border-b border-[#E2D9C8] pb-2">
              <span className="font-serif font-bold text-sm text-[#252824] flex items-center space-x-1.5">
                <Thermometer className="w-4 h-4 text-[#B86F57]" />
                <span>Temperature vs Depth Profile</span>
              </span>
              <span className="text-[10px] text-[#5A5D57]">0 - 2000dbar</span>
            </div>
            <DepthProfileChart data={floatData.profiles || []} variable="temperature" height={280} />
          </div>

          {/* Depth vs Salinity Chart */}
          <div className="editorial-paper p-4 rounded">
            <div className="flex items-center justify-between mb-3 border-b border-[#E2D9C8] pb-2">
              <span className="font-serif font-bold text-sm text-[#252824] flex items-center space-x-1.5">
                <Droplets className="w-4 h-4 text-[#537C70]" />
                <span>Salinity vs Depth Profile</span>
              </span>
              <span className="text-[10px] text-[#5A5D57]">0 - 2000dbar</span>
            </div>
            <DepthProfileChart data={floatData.profiles || []} variable="salinity" height={280} />
          </div>

        </div>
      ) : null}

      {/* Footer Export */}
      <div className="p-3 border-t border-[#E2D9C8] bg-[#F5F1E8] flex justify-end">
        <button
          onClick={() => alert(`Exporting ARGO float profile data for ${floatId}...`)}
          className="flex items-center space-x-1.5 text-xs font-semibold text-[#252824] bg-[#E8E0D0] hover:bg-[#D5CBBA] px-3 py-1.5 rounded transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Float NetCDF / CSV</span>
        </button>
      </div>
    </div>
  );
}

function generateFallbackProfile() {
  const depths = [0, 10, 25, 50, 75, 100, 150, 200, 300, 400, 500, 750, 1000, 1500, 2000];
  return depths.map((depth) => {
    let temp = 28.5 * Math.exp(-depth / 220.0) + 2.5;
    let sal = 35.8 - (35.8 - 34.6) * (depth / 2000);
    return { depth, temperature: parseFloat(temp.toFixed(2)), salinity: parseFloat(sal.toFixed(2)) };
  });
}
