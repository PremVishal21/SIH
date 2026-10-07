"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { BarChart2, TrendingUp, Thermometer, Droplets, ArrowRight } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        <div className="border-b border-[#E2D9C8] pb-3">
          <span className="text-[10px] font-semibold text-[#537C70] tracking-widest uppercase block">
            SCIENTIFIC INTELLIGENCE
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#252824]">
            Oceanographic Insights Summary
          </h1>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="editorial-paper rounded-lg p-4 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-[#879C87] block">ACTIVE FLOATS</span>
            <p className="font-serif font-bold text-2xl text-[#252824]">1,200</p>
            <p className="text-[10px] text-[#537C70]">INCOIS & Global Array</p>
          </div>

          <div className="editorial-paper rounded-lg p-4 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-[#879C87] block">OBSERVATIONS</span>
            <p className="font-serif font-bold text-2xl text-[#252824]">1.4M</p>
            <p className="text-[10px] text-[#537C70]">CTD Profiles 2020-2026</p>
          </div>

          <div className="editorial-paper rounded-lg p-4 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-[#879C87] block">ARABIAN SEA TEMP</span>
            <p className="font-serif font-bold text-2xl text-[#B86F57]">28.5°C</p>
            <p className="text-[10px] text-[#5A5D57]">Surface Mean</p>
          </div>

          <div className="editorial-paper rounded-lg p-4 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-[#879C87] block">BAY OF BENGAL SALINITY</span>
            <p className="font-serif font-bold text-2xl text-[#537C70]">33.4 PSU</p>
            <p className="text-[10px] text-[#5A5D57]">River Runoff Gradient</p>
          </div>
        </div>

        {/* Key Findings List */}
        <div className="editorial-paper rounded-lg p-6 space-y-4">
          <h2 className="font-serif font-bold text-lg text-[#252824] border-b border-[#E2D9C8] pb-2">
            Key Oceanographic Findings
          </h2>

          <div className="space-y-4 text-xs text-[#5A5D57]">
            <div className="border-l-2 border-l-[#B86F57] pl-3 space-y-1">
              <span className="font-bold text-[#252824] block">1. Thermocline Boundary Compression</span>
              <p>
                Observations across 2020-2025 indicate the main thermocline boundary in the Central Arabian Sea resides between 50m and 180m depth, with a temperature drop rate of 0.12°C per meter.
              </p>
            </div>

            <div className="border-l-2 border-l-[#537C70] pl-3 space-y-1">
              <span className="font-bold text-[#252824] block">2. Bay of Bengal Freshwater Stratification</span>
              <p>
                Heavy discharge from the Ganga-Brahmaputra river system creates a strong low-salinity surface layer (&lt;33.5 PSU), forming a barrier layer that prevents vertical thermal exchange.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/ask"
              className="inline-flex items-center space-x-1.5 bg-[#252824] text-[#F5F1E8] text-xs font-semibold px-4 py-2 rounded hover:bg-[#537C70] transition-colors"
            >
              <span>Ask FLOATX Detailed Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
