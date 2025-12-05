"use client";

import { useState, useEffect } from "react";
import ShotDispersionChart from "../../ui/components/ShotDispersionChart";
import BallFlightCurve from "../../ui/components/BallFlightCurve";

export default function GraficosPage() {
  const [analysis, setAnalysis] = useState(null);
  const [selectedChart, setSelectedChart] = useState("dispersion");

  // Cargar datos analizados desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lastAnalysis");
    if (saved) {
      setAnalysis(JSON.parse(saved));
    }
  }, []);

  if (!analysis) {
    return (
      <main style={{ padding: 40, textAlign: "center" }}>
        <h2>No hay datos cargados</h2>
        <p>Primero analizá una sesión en /stats</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40, maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        Selección de gráficos
      </h1>

      {/* BOTONES DE SELECCIÓN */}
      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        <button
          onClick={() => setSelectedChart("dispersion")}
          style={{
            padding: "14px 24px",
            fontSize: 18,
            borderRadius: 8,
            cursor: "pointer",
            background: selectedChart === "dispersion" ? "#128c7e" : "#e0e0e0",
            color: selectedChart === "dispersion" ? "white" : "black",
          }}
        >
          Dispersión
        </button>

        <button
          onClick={() => setSelectedChart("flight")}
          style={{
            padding: "14px 24px",
            fontSize: 18,
            borderRadius: 8,
            cursor: "pointer",
            background: selectedChart === "flight" ? "#128c7e" : "#e0e0e0",
            color: selectedChart === "flight" ? "white" : "black",
          }}
        >
          Curva de vuelo
        </button>
      </div>

      {/* CONTENIDO DEL GRÁFICO */}
      <div style={{ marginTop: 40 }}>
        {selectedChart === "dispersion" && (
          <ShotDispersionChart records={analysis.rows} />
        )}

        {selectedChart === "flight" && (
          <BallFlightCurve records={analysis.rows} />
        )}
      </div>
    </main>
  );
}
