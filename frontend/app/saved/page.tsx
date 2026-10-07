"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Bookmark, ArrowRight, Trash2, Download, Clock } from "lucide-react";

export default function SavedAnalysesPage() {
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      title: "Arabian Sea Deep Temperature Slicing",
      query: "Compare Arabian Sea temperature below 500m from 2020 to 2025.",
      date: "13 Sep 2026",
      observations: 1120,
      floats: 84
    },
    {
      id: 2,
      title: "Bay of Bengal Salinity Gradient",
      query: "Show salinity distribution in Bay of Bengal upper 200m.",
      date: "12 Sep 2026",
      observations: 940,
      floats: 62
    }
  ]);

  const handleDelete = (id: number) => {
    setSavedItems(savedItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        <div className="border-b border-[#E2D9C8] pb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-[#537C70] tracking-widest uppercase block">
              RESEARCH WORKSPACE
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#252824]">
              Saved Ocean Analyses
            </h1>
          </div>
        </div>

        <div className="space-y-4">
          {savedItems.length === 0 ? (
            <div className="editorial-paper rounded-lg p-8 text-center text-xs text-[#5A5D57]">
              No saved analyses yet. Save analyses from the Ask FLOATX workspace.
            </div>
          ) : (
            savedItems.map((item) => (
              <div key={item.id} className="editorial-paper rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-card">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-serif font-bold text-base text-[#252824]">{item.title}</span>
                    <span className="text-[10px] text-[#879C87] flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.date}</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#5A5D57] font-mono">"{item.query}"</p>
                  <p className="text-[10px] text-[#537C70] font-semibold">
                    {item.observations.toLocaleString()} observations · {item.floats} floats
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <Link
                    href={`/ask?q=${encodeURIComponent(item.query)}`}
                    className="bg-[#252824] hover:bg-[#537C70] text-[#F5F1E8] text-xs font-semibold px-3 py-1.5 rounded transition-colors flex items-center space-x-1"
                  >
                    <span>Reopen</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded hover:bg-[#E8E0D0] text-[#5A5D57] hover:text-[#B86F57] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}
