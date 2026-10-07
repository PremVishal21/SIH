"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface TimeSeriesChartProps {
  data: any[];
  variable?: string;
  height?: number;
}

export default function TimeSeriesChart({
  data,
  variable = "temperature",
  height = 300,
}: TimeSeriesChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`w-full h-[${height}px] flex items-center justify-center text-xs text-[#5A5D57]`}>
        No temporal trend data available.
      </div>
    );
  }

  const isTemp = variable === "temperature";
  const color = isTemp ? "#B86F57" : "#537C70";
  const unit = isTemp ? "°C" : "PSU";
  const valCol = isTemp ? "temperature" : "salinity";

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={color} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2D9C8" />
          <XAxis dataKey="year" stroke="#5A5D57" fontSize={11} />
          <YAxis stroke="#5A5D57" fontSize={11} unit={` ${unit}`} domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FBF9F3",
              borderColor: color,
              borderRadius: "4px",
              fontSize: "12px",
              color: "#252824"
            }}
            formatter={(val: any) => [`${val} ${unit}`, "Average Measurement"]}
            labelFormatter={(label: any) => `Year: ${label}`}
          />
          <Area
            type="monotone"
            dataKey={valCol}
            stroke={color}
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorArea)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
