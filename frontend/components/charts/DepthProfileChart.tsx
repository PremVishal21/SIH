"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface DepthProfileChartProps {
  data: any[];
  variable?: "temperature" | "salinity";
  height?: number;
}

export default function DepthProfileChart({
  data,
  variable = "temperature",
  height = 320,
}: DepthProfileChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`w-full h-[${height}px] flex items-center justify-center text-xs text-[#5A5D57]`}>
        No depth profile data available.
      </div>
    );
  }

  const isTemp = variable === "temperature";
  const strokeColor = isTemp ? "#B86F57" : "#537C70";
  const unit = isTemp ? "°C" : "PSU";

  // Recharts: Invert Y-axis so 0m depth is at top and 2000m is at bottom
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E2D9C8" />
          
          {/* Inverted Y Axis for Depth */}
          <YAxis
            dataKey="depth"
            reversed
            unit="m"
            stroke="#5A5D57"
            fontSize={11}
            tickLine={false}
            label={{ value: "Depth (m)", angle: -90, position: "insideLeft", fontSize: 11, fill: "#5A5D57" }}
          />

          {/* X Axis for Temperature or Salinity */}
          <XAxis
            dataKey={variable}
            unit={` ${unit}`}
            stroke="#5A5D57"
            fontSize={11}
            tickLine={false}
            domain={["dataMin - 0.5", "dataMax + 0.5"]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#FBF9F3",
              borderColor: strokeColor,
              borderRadius: "4px",
              fontSize: "12px",
              color: "#252824"
            }}
            formatter={(value: any) => [`${value} ${unit}`, variable.toUpperCase()]}
            labelFormatter={(label: any) => `Depth: ${label} meters`}
          />

          <Line
            type="monotone"
            dataKey={variable}
            stroke={strokeColor}
            strokeWidth={2.5}
            dot={{ r: 3, fill: strokeColor }}
            activeDot={{ r: 5 }}
            name={isTemp ? "Temperature (°C)" : "Salinity (PSU)"}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
