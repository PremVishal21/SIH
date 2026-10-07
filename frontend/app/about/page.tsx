"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { ShieldCheck, Database, Layers, Cpu, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        <div className="border-b border-[#E2D9C8] pb-3">
          <span className="text-[10px] font-semibold text-[#537C70] tracking-widest uppercase block">
            TECHNICAL SPECIFICATIONS
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#252824]">
            About FLOATX Engine
          </h1>
          <p className="text-xs text-[#5A5D57] mt-1">
            Smart India Hackathon — SIH25040 · Ministry of Earth Sciences (MoES)
          </p>
        </div>

        <div className="editorial-paper rounded-lg p-6 space-y-4 text-xs leading-relaxed text-[#252824]">
          <h2 className="font-serif font-bold text-base text-[#252824] border-b border-[#E2D9C8] pb-1">
            Product Philosophy
          </h2>
          <p>
            FLOATX is an agentic ocean intelligence platform designed to democratize ARGO oceanographic data discovery. Following the principle <strong>ASK → DISCOVER → QUERY → ANALYZE → VISUALIZE → EXPLAIN → VERIFY</strong>, every AI answer is grounded in deterministic Python/PostGIS computations over physical CTD measurements.
          </p>

          <h2 className="font-serif font-bold text-base text-[#252824] border-b border-[#E2D9C8] pb-1 pt-2">
            Multi-Agent Architecture
          </h2>
          <ul className="list-disc list-inside space-y-1 text-[#5A5D57]">
            <li><strong>Intent & Query Planner Agent:</strong> Extracts spatial, temporal, depth, and variable constraints from natural language into a validated JSON schema.</li>
            <li><strong>Data Discovery Agent:</strong> Executes spatial/temporal indexing across 1,000+ profiling floats.</li>
            <li><strong>Analysis Agent:</strong> Performs deterministic calculations (means, depth profiles, anomalies, thermocline gradients).</li>
            <li><strong>Visualization Agent:</strong> Automatically selects appropriate cartographic maps, vertical depth profiles, or time-series curves.</li>
            <li><strong>Explanation & Provenance Agent:</strong> Synthesizes grounded scientific insights and generates data quality confidence metrics.</li>
          </ul>

          <h2 className="font-serif font-bold text-base text-[#252824] border-b border-[#E2D9C8] pb-1 pt-2">
            Design & Visual Identity
          </h2>
          <p className="text-[#5A5D57]">
            Crafted with a Warm Editorial Scientific palette (Warm Ivory `#F5F1E8`, Deep Charcoal `#252824`, Muted Sea Green `#537C70`), DM Serif Display typography, and subdued cartographic mapping inspired by oceanographic research institutes and nautical charts.
          </p>
        </div>

      </main>
    </div>
  );
}
