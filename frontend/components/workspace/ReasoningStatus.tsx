"use client";

import React from "react";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

interface ReasoningStep {
  step: number;
  title: string;
  status: string;
  detail?: string;
}

interface ReasoningStatusProps {
  steps: ReasoningStep[];
  isAnalyzing?: boolean;
}

export default function ReasoningStatus({ steps, isAnalyzing }: ReasoningStatusProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="editorial-paper rounded p-3 mb-4 text-xs">
      <div className="flex items-center space-x-1.5 font-semibold text-[#537C70] mb-2 uppercase tracking-wider text-[10px]">
        <Sparkles className="w-3.5 h-3.5" />
        <span>AGENTIC REASONING PIPELINE</span>
      </div>

      <div className="space-y-1.5">
        {steps.map((s) => (
          <div key={s.step} className="flex items-start space-x-2 text-[#252824]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#537C70] mt-0.5 shrink-0" />
            <div>
              <span className="font-medium text-[#252824]">{s.title}</span>
              {s.detail && (
                <span className="text-[#5A5D57] ml-2 text-[11px] block sm:inline">
                  {s.detail}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
