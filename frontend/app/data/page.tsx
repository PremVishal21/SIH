"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PresentationMode from "@/components/PresentationMode";
import { Download, Filter, Search, Database, FileSpreadsheet, RefreshCw } from "lucide-react";

export default function DataExplorerPage() {
  const [region, setRegion] = useState("All");
  const [variable, setVariable] = useState("temperature");
  const [minDepth, setMinDepth] = useState(0);
  const [maxDepth, setMaxDepth] = useState(2000);
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, [region, variable, minDepth, maxDepth]);

  const fetchData = () => {
    setLoading(true);
    fetch(`http://localhost:8000/api/observations?region=${encodeURIComponent(region)}&variable=${variable}&min_depth=${minDepth}&max_depth=${maxDepth}&limit=200`)
      .then((res) => res.json())
      .then((data) => {
        if (data.records) setRecords(data.records);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Data load error:", err);
        setRecords(generateMockObservations());
        setLoading(false);
      });
  };

  const handleExportCSV = () => {
    if (records.length === 0) return;
    const headers = ["observation_id", "float_id", "timestamp", "region", "latitude", "longitude", "depth", "pressure", "temperature", "salinity"];
    const rows = records.map((r) => headers.map((h) => r[h]).join(","));
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `FLOATX_ARGO_Observations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col font-sans">
      <Navbar onStartDemo={() => setShowDemoModal(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2D9C8] pb-3 gap-3">
          <div>
            <span className="text-[10px] font-semibold text-[#537C70] tracking-widest uppercase block">
              TABULAR INSPECTOR
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#252824]">
              ARGO Data Explorer
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-1.5 bg-[#537C70] hover:bg-[#43655B] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="editorial-paper rounded-lg p-4 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          
          <div>
            <label className="block text-[#879C87] uppercase font-semibold text-[10px] mb-1">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-[#F5F1E8] border border-[#E2D9C8] rounded px-2.5 py-1.5 text-[#252824] focus:outline-none"
            >
              <option value="All">All Regions</option>
              <option value="Arabian Sea">Arabian Sea</option>
              <option value="Bay of Bengal">Bay of Bengal</option>
              <option value="Indian Coast">Indian Coast</option>
            </select>
          </div>

          <div>
            <label className="block text-[#879C87] uppercase font-semibold text-[10px] mb-1">Variable</label>
            <select
              value={variable}
              onChange={(e) => setVariable(e.target.value)}
              className="w-full bg-[#F5F1E8] border border-[#E2D9C8] rounded px-2.5 py-1.5 text-[#252824] focus:outline-none"
            >
              <option value="temperature">Temperature (°C)</option>
              <option value="salinity">Salinity (PSU)</option>
            </select>
          </div>

          <div>
            <label className="block text-[#879C87] uppercase font-semibold text-[10px] mb-1">Min Depth (m)</label>
            <input
              type="number"
              value={minDepth}
              onChange={(e) => setMinDepth(Number(e.target.value))}
              className="w-full bg-[#F5F1E8] border border-[#E2D9C8] rounded px-2.5 py-1.5 text-[#252824] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#879C87] uppercase font-semibold text-[10px] mb-1">Max Depth (m)</label>
            <input
              type="number"
              value={maxDepth}
              onChange={(e) => setMaxDepth(Number(e.target.value))}
              className="w-full bg-[#F5F1E8] border border-[#E2D9C8] rounded px-2.5 py-1.5 text-[#252824] focus:outline-none"
            />
          </div>

        </div>

        {/* Data Table */}
        <div className="editorial-paper rounded-lg overflow-hidden shadow-editorial">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#252824]">
              <thead className="bg-[#E8E0D0] text-[#5A5D57] font-semibold border-b border-[#E2D9C8] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Float ID</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Region</th>
                  <th className="p-3">Latitude / Longitude</th>
                  <th className="p-3">Depth (m)</th>
                  <th className="p-3">Pressure (dbar)</th>
                  <th className="p-3">Temperature (°C)</th>
                  <th className="p-3">Salinity (PSU)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D9C8]">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-[#5A5D57]">
                      Loading physical observation records...
                    </td>
                  </tr>
                ) : records.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-[#5A5D57]">
                      No observations matching selected filters.
                    </td>
                  </tr>
                ) : (
                  records.map((r, idx) => (
                    <tr key={idx} className="hover:bg-[#F5F1E8] transition-colors">
                      <td className="p-3 font-mono font-bold text-[#537C70]">{r.float_id}</td>
                      <td className="p-3 text-[#5A5D57]">{r.timestamp ? r.timestamp.split(" ")[0] : "2024-06-12"}</td>
                      <td className="p-3 font-medium">{r.region}</td>
                      <td className="p-3 text-[#5A5D57]">{r.latitude}° N, {r.longitude}° E</td>
                      <td className="p-3 font-semibold">{r.depth}m</td>
                      <td className="p-3 text-[#5A5D57]">{r.pressure}</td>
                      <td className="p-3 font-semibold text-[#B86F57]">{r.temperature}°C</td>
                      <td className="p-3 font-semibold text-[#537C70]">{r.salinity} PSU</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {showDemoModal && (
        <PresentationMode
          onClose={() => setShowDemoModal(false)}
          onRunQuery={(q) => window.location.href = `/ask?q=${encodeURIComponent(q)}`}
        />
      )}
    </div>
  );
}

function generateMockObservations() {
  return [
    { float_id: "WMO-2902456", timestamp: "2025-06-12 10:30", region: "Arabian Sea", latitude: 15.2, longitude: 72.5, depth: 10, pressure: 10.1, temperature: 28.5, salinity: 36.2 },
    { float_id: "WMO-2902456", timestamp: "2025-06-12 10:30", region: "Arabian Sea", latitude: 15.2, longitude: 72.5, depth: 100, pressure: 100.5, temperature: 22.1, salinity: 35.8 },
    { float_id: "WMO-2903112", timestamp: "2025-06-11 14:15", region: "Bay of Bengal", latitude: 12.8, longitude: 85.3, depth: 10, pressure: 10.1, temperature: 29.2, salinity: 33.4 },
    { float_id: "WMO-2903112", timestamp: "2025-06-11 14:15", region: "Bay of Bengal", latitude: 12.8, longitude: 85.3, depth: 500, pressure: 502.5, temperature: 10.8, salinity: 35.1 },
  ];
}
