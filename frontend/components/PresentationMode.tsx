"use client";

import React, { useState } from "react";
import { X, Play, CheckCircle2, ArrowRight, ShieldCheck, Database } from "lucide-react";

interface PresentationModeProps {
  onClose: () => void;
  onRunQuery: (q: string) => void;
}

export default function PresentationMode({ onClose, onRunQuery }: PresentationModeProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const demoSteps = [
    {
      step: 1,
      title: "Step 1: Benchmark Oceanographic Comparison",
      query: "Compare the temperature of the Arabian Sea and Bay of Bengal from 2020 to 2025, and show me how it changes with depth.",
      explanation: "Tests regional intent parsing, spatial bounding box lookup, depth profile aggregation, and dual-curve visualization."
    },
    {
      step: 2,
      title: "Step 2: Contextual Follow-up Slicing",
      query: "Now only show observations below 500 meters.",
      explanation: "Tests multi-turn context memory. Preserves Arabian Sea vs Bay of Bengal comparison while shifting depth filters to 500m-2000m."
    },
    {
      step: 3,
      title: "Step 3: Coastal Float Search & Proximity",
      query: "Find active ARGO floats near the Indian coast within 200 km of Mumbai.",
      explanation: "Tests geospatial proximity calculations and live float profile inspection drawer."
    }
  ];

  const activeDemo = demoSteps[currentStep - 1];

  return (
    <div className="fixed inset-0 z-[700] bg-[#252824]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-[#FBF9F3] border border-[#537C70] rounded-lg shadow-2xl p-6 relative space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#537C70] tracking-widest block">
              SIH25040 · MINISTRY OF EARTH SCIENCES
            </span>
            <h3 className="font-serif text-xl font-bold text-[#252824]">
              30-Second Hackathon Judge Demo Workflow
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#E8E0D0] text-[#5A5D57] hover:text-[#252824] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#5A5D57]">
          <span>DEMO SEQUENCE {currentStep} OF 3</span>
          <div className="flex space-x-1">
            {demoSteps.map((d) => (
              <div
                key={d.step}
                className={`w-8 h-1.5 rounded-full ${
                  d.step === currentStep ? "bg-[#537C70]" : "bg-[#E2D9C8]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Active Demo Card */}
        <div className="editorial-card p-4 rounded-lg space-y-3">
          <h4 className="font-serif font-bold text-sm text-[#252824]">
            {activeDemo.title}
          </h4>

          <div className="bg-[#252824] text-[#F5F1E8] p-3 rounded text-xs font-mono">
            "{activeDemo.query}"
          </div>

          <p className="text-xs text-[#5A5D57]">
            {activeDemo.explanation}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E2D9C8]">
          <button
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="text-xs font-medium text-[#5A5D57] hover:text-[#252824] disabled:opacity-30"
          >
            Previous Step
          </button>

          <button
            onClick={() => {
              onRunQuery(activeDemo.query);
              onClose();
            }}
            className="flex items-center space-x-1.5 bg-[#537C70] hover:bg-[#43655B] text-white text-xs font-semibold px-4 py-2 rounded shadow transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Execute Prompt #{currentStep} Now</span>
          </button>

          {currentStep < 3 && (
            <button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="text-xs font-medium text-[#537C70] hover:underline flex items-center space-x-1"
            >
              <span>Next Demo Step</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
