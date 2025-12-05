"use client";

import FairwayReal from "./FairwayReal";

export default function ShotDispersionChart({ records }) {
  if (!records || records.length === 0) return null;

  // ===============================
  //   ESCALAS DEFINITIVAS
  // ===============================

  const teeY = 2000;
  const centerX = 600;

  const scaleY = 6.3;   // tu escala final
  const scaleX = 15;    // mantiene relación lateral

  // Yardas para las líneas horizontales
  const yardMarkers = [50, 100, 150, 200, 250, 300];

  return (
    <div style={{ width: "100%", marginTop: 30 }}>
      <FairwayReal>
        {/* ======================================
            LÍNEA CENTRAL (VERTICAL)
        ======================================= */}

        <line
          x1={centerX}
          y1={teeY}
          x2={centerX}
          y2={0}
          stroke="white"
          strokeWidth="4"
          strokeDasharray="20 20"
          opacity="0.55"
        />

        {/* ======================================
            LÍNEAS HORIZONTALES DE DISTANCIA
        ======================================= */}

        {yardMarkers.map((yd) => {
          const y = teeY - yd * scaleY;

          return (
            <g key={yd}>
              {/* Línea horizontal */}
              <line
                x1={100}
                y1={y}
                x2={1100}
                y2={y}
                stroke="white"
                strokeWidth="3"
                strokeDasharray="12 14"
                opacity="0.45"
              />

              {/* Caja semitransparente estilo TrackMan */}
              <rect
                x={80}
                y={y - 32}
                width={150}
                height={50}
                rx={10}
                fill="rgba(0,0,0,0.45)"  // fondo oscuro pro
              />

              {/* Texto encima de la caja */}
              <text
                x={155}               // centrado horizontal dentro de la caja
                y={y + 5}             // centrado vertical
                fill="white"
                fontSize="32"
                fontWeight="bold"
                textAnchor="middle"
                style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {yd} yd
              </text>
            </g>
          );
        })}




        {/* ======================================
            PUNTOS DE LOS TIROS
        ======================================= */}

        {records.map((r, i) => {
          const offline = r["FUERA DE LINEA YD"];
          const carry = r["CARRY YD"];

          // Conversión a coordenadas reales
          const x = centerX + offline * scaleX;
          const y = teeY - carry * scaleY;

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={20}
              fill="#22c55e"
              stroke="#ffffff"
              strokeWidth={4}
              opacity={0.9}
            />
          );
        })}
      </FairwayReal>
    </div>
  );
}
