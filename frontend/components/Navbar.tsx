"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Waves, Search, Bookmark, HelpCircle, Layers, Play, Database, CheckCircle2 } from "lucide-react";

interface NavbarProps {
  onStartDemo?: () => void;
}

export default function Navbar({ onStartDemo }: NavbarProps) {
  const pathname = usePathname();
  const [isLiveData, setIsLiveData] = useState(true);

  const navLinks = [
    { name: "Explore", href: "/" },
    { name: "Ask FLOATX", href: "/ask" },
    { name: "Ocean Map", href: "/map" },
    { name: "Data", href: "/data" },
    { name: "Insights", href: "/insights" },
    { name: "Saved", href: "/saved" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F3]/90 backdrop-blur-md border-b border-[#E2D9C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded bg-[#252824] text-[#F5F1E8] flex items-center justify-center font-serif text-lg font-bold group-hover:bg-[#537C70] transition-colors">
              F
            </div>
            <div>
              <span className="font-serif text-xl tracking-tight font-bold text-[#252824]">
                FLOATX
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-widest text-[#537C70] font-semibold">
                MoES · SIH25040
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#E8E0D0] text-[#252824] font-semibold"
                      : "text-[#5A5D57] hover:text-[#252824] hover:bg-[#F5F1E8]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Tools & Mode Switcher */}
        <div className="flex items-center space-x-3">
          
          {/* Hackathon Demo Mode Trigger */}
          {onStartDemo && (
            <button
              onClick={onStartDemo}
              className="flex items-center space-x-1.5 bg-[#B86F57] hover:bg-[#A05C46] text-white text-xs font-semibold px-3 py-1.5 rounded shadow-sm transition-all"
              title="Launch 30-Second Hackathon Judge Demo Flow"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Judge Demo Mode</span>
            </button>
          )}

          {/* Live vs Demo Dataset Mode Badge Toggle */}
          <button
            onClick={() => setIsLiveData(!isLiveData)}
            className={`flex items-center space-x-1.5 text-xs font-medium px-2.5 py-1 rounded border transition-all ${
              isLiveData
                ? "bg-[#537C70]/10 text-[#537C70] border-[#537C70]/30"
                : "bg-[#C49A55]/10 text-[#C49A55] border-[#C49A55]/30"
            }`}
            title="Toggle between Live ARGO Ingestion and Demo Cache"
          >
            <Database className="w-3 h-3" />
            <span>{isLiveData ? "LIVE ARGO DATA" : "DEMO DATA"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
