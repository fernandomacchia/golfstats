"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function BallFlightCurve({ records }) {
  if (!records || !records.length) return null;

  const data = records.map((r, i) => ({
    index: i + 1,
    carry: Number(r["CARRY YD"]) || 0,
    apex: Number(r["ALTURA YD"]) || 0,
  }));

  const maxCarry = Math.max(...data.map((d) => d.carry));
  const maxApex = Math.max(...data.map((d) => d.apex));

  return (
    <div style={{ width: "100%", height: 450, marginTop: 40 }}>
      <h3 style={{ marginBottom: 10, fontSize: 20 }}>
        Curva de vuelo — Estilo TrackMan
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

          <XAxis
            dataKey="index"
            label={{
              value: "Golpe",
              position: "bottom",
              offset: 0,
            }}
            tick={{ fontSize: 12 }}
          />

          <YAxis
            domain={[0, Math.max(maxCarry, maxApex) + 10]}
            tick={{ fontSize: 12 }}
            label={{
              value: "Distancia / Altura (yd)",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="carry"
            stroke="#128c7e"
            strokeWidth={3}
            dot={{ r: 5, fill: "#075e54", stroke: "#fff", strokeWidth: 2 }}
            name="Carry (yd)"
          />

          <Line
            type="monotone"
            dataKey="apex"
            stroke="#ff8c00"
            strokeWidth={3}
            dot={{ r: 5, fill: "#c56e00", stroke: "#fff", strokeWidth: 2 }}
            name="Apex Height (yd)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
