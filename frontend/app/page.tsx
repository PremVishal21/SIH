"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import OceanMap from "@/components/map/OceanMap";
import PresentationMode from "@/components/PresentationMode";
import { Search, Sparkles, ArrowRight, Compass, ShieldCheck, Database, Layers, BarChart2 } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [inputQuery, setInputQuery] = useState("");
  const [showDemoModal, setShowDemoModal] = useState(false);

  const suggestedQuestions = [
    "Compare Arabian Sea and Bay of Bengal temperatures from 2020 to 2025.",
    "Show salinity profiles below 500 meters.",
    "Find active ARGO profiling floats near the Indian coastline.",
    "Where are the warmest waters in the Equatorial Indian Ocean?",
    "How has ocean thermocline depth shifted since 2020?"
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    router.push(`/ask?q=${encodeURIComponent(inputQuery)}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col font-sans">
      <Navbar onStartDemo={() => setShowDemoModal(true)} />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-12 text-center space-y-6">
        
        <div className="inline-flex items-center space-x-2 bg-[#E8E0D0] text-[#537C70] border border-[#D5CBBA] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Agentic Ocean Intelligence Platform · SIH25040</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#252824] tracking-tight leading-tight">
          Ask the ocean a question.
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#5A5D57] leading-relaxed">
          FLOATX turns complex ARGO oceanographic measurements into grounded, verifiable evidence. Explore temperature, salinity, depth, and spatial patterns using natural language.
        </p>

        {/* Hero Natural Language Input Form */}
        <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto relative pt-4">
          <div className="relative flex items-center shadow-editorial rounded-lg border border-[#E2D9C8] bg-[#FBF9F3] overflow-hidden focus-within:border-[#537C70] transition-colors">
            <Search className="w-5 h-5 text-[#879C87] ml-4 shrink-0" />
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="e.g. Compare temperature in the Arabian Sea and Bay of Bengal from 2020 to 2025..."
              className="w-full bg-transparent px-4 py-4 text-sm sm:text-base text-[#252824] focus:outline-none placeholder-[#879C87]"
            />
            <button
              type="submit"
              className="bg-[#252824] hover:bg-[#537C70] text-[#F5F1E8] text-xs font-semibold px-6 py-4 transition-colors flex items-center space-x-2 shrink-0"
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Suggested Triggers */}
        <div className="max-w-3xl mx-auto pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-[#879C87] font-semibold uppercase text-[10px]">Suggested:</span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => router.push(`/ask?q=${encodeURIComponent(q)}`)}
              className="bg-[#E8E0D0]/80 hover:bg-[#E8E0D0] text-[#252824] px-3 py-1 rounded text-xs transition-colors border border-[#D5CBBA]"
            >
              {q}
            </button>
          ))}
        </div>

      </section>

      {/* Ocean Map Live Exploration Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-3">
          <div>
            <span className="text-[10px] font-semibold text-[#537C70] tracking-widest uppercase block">
              LIVE ARGO EXPLORATION
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#252824]">
              Active Profiling Floats Map
            </h2>
          </div>
          <Link
            href="/map"
            className="text-xs font-semibold text-[#537C70] hover:underline flex items-center space-x-1"
          >
            <span>Open Full Ocean Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <OceanMap height="h-[460px]" />
      </section>

      {/* Featured Ocean Insights Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full space-y-6">
        <div className="border-b border-[#E2D9C8] pb-3">
          <span className="text-[10px] font-semibold text-[#537C70] tracking-widest uppercase block">
            SCIENTIFIC INTELLIGENCE
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#252824]">
            Featured Ocean Insights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="editorial-paper rounded-lg p-5 space-y-3 shadow-card hover:border-[#537C70] transition-colors">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B86F57]">
              THERMODYNAMICS
            </span>
            <h3 className="font-serif font-bold text-lg text-[#252824]">
              Arabian Sea vs Bay of Bengal Thermal Divergence
            </h3>
            <p className="text-xs text-[#5A5D57] leading-relaxed">
              The Arabian Sea exhibits higher surface salinity (36.2 PSU) due to evaporation, whereas river runoff keeps the Bay of Bengal lower (33.4 PSU), influencing tropical thermal mixing.
            </p>
            <Link
              href="/ask?q=Compare%20Arabian%20Sea%20and%20Bay%20of%20Bengal"
              className="inline-flex items-center space-x-1 text-xs font-semibold text-[#537C70] hover:underline pt-2"
            >
              <span>Explore Comparison</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="editorial-paper rounded-lg p-5 space-y-3 shadow-card hover:border-[#537C70] transition-colors">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#537C70]">
              VERTICAL PROFILES
            </span>
            <h3 className="font-serif font-bold text-lg text-[#252824]">
              Thermocline Gradient Below 500 meters
            </h3>
            <p className="text-xs text-[#5A5D57] leading-relaxed">
              Upper-ocean temperatures drop rapidly from ~28°C at the surface to ~10°C at 500m depth, settling into cold, stable deep water masses below 1,000m.
            </p>
            <Link
              href="/ask?q=Show%20temperature%20below%20500%20meters"
              className="inline-flex items-center space-x-1 text-xs font-semibold text-[#537C70] hover:underline pt-2"
            >
              <span>Inspect Depth Profile</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="editorial-paper rounded-lg p-5 space-y-3 shadow-card hover:border-[#537C70] transition-colors">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C49A55]">
              PROXIMITY & COASTAL
            </span>
            <h3 className="font-serif font-bold text-lg text-[#252824]">
              Western Ghats & Mumbai Coastal Array
            </h3>
            <p className="text-xs text-[#5A5D57] leading-relaxed">
              Over 100 active INCOIS floats monitor monsoon runoff, upwelling velocity, and shelf currents within 200 km of the Indian coastline.
            </p>
            <Link
              href="/ask?q=Find%20floats%20near%20Mumbai"
              className="inline-flex items-center space-x-1 text-xs font-semibold text-[#537C70] hover:underline pt-2"
            >
              <span>View Coastal Floats</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E2D9C8] bg-[#FBF9F3] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5A5D57]">
          <div>
            <span className="font-serif font-bold text-[#252824] text-sm">FLOATX</span>
            <span className="ml-2">Agentic Ocean Intelligence Platform</span>
          </div>
          <p className="mt-2 sm:mt-0">
            Developed for <strong>Smart India Hackathon — SIH25040</strong> · Ministry of Earth Sciences (MoES)
          </p>
        </div>
      </footer>

      {/* Demo Modal */}
      {showDemoModal && (
        <PresentationMode
          onClose={() => setShowDemoModal(false)}
          onRunQuery={(q) => router.push(`/ask?q=${encodeURIComponent(q)}`)}
        />
      )}
    </div>
  );
}
