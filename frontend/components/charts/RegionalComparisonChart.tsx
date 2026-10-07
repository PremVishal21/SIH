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

interface RegionalComparisonChartProps {
  regionAData: any[];
  regionBData: any[];
  regionAName?: string;
  regionBName?: string;
  variable?: string;
  height?: number;
}

export default function RegionalComparisonChart({
  regionAData,
  regionBData,
  regionAName = "Arabian Sea",
  regionBName = "Bay of Bengal",
  variable = "temperature",
  height = 340,
}: RegionalComparisonChartProps) {
  // Merge depth profiles by depth level
  const depthMap: { [depth: number]: any } = {};

  const valKey = variable === "salinity" ? "salinity" : "temperature";

  (regionAData || []).forEach((item) => {
    depthMap[item.depth] = { depth: item.depth, [regionAName]: item[valKey] };
  });

  (regionBData || []).forEach((item) => {
    if (!depthMap[item.depth]) {
      depthMap[item.depth] = { depth: item.depth };
    }
    depthMap[item.depth][regionBName] = item[valKey];
  });

  const mergedData = Object.values(depthMap).sort((a, b) => a.depth - b.depth);
  const unit = variable === "salinity" ? "PSU" : "°C";

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mergedData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2D9C8" />
          <YAxis
            dataKey="depth"
            reversed
            unit="m"
            stroke="#5A5D57"
            fontSize={11}
            label={{ value: "Depth (m)", angle: -90, position: "insideLeft", fontSize: 11, fill: "#5A5D57" }}
          />
          <XAxis
            unit={` ${unit}`}
            stroke="#5A5D57"
            fontSize={11}
            domain={["dataMin - 0.5", "dataMax + 0.5"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FBF9F3",
              borderColor: "#E2D9C8",
              borderRadius: "4px",
              fontSize: "12px",
              color: "#252824"
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
          <Line
            type="monotone"
            dataKey={regionAName}
            stroke="#B86F57"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            name={`${regionAName} (${unit})`}
          />
          <Line
            type="monotone"
            dataKey={regionBName}
            stroke="#537C70"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            name={`${regionBName} (${unit})`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
