"use client";

import { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_BASE_URL = "http://localhost:3001";

// -------------------------------------------------------
// TARJETA (CARD) ESTILO WHATSAPP
// -------------------------------------------------------
const MetricCard = ({ label, value, units }) => (
  <div
    style={{
      background: "#1a1a1a",
      padding: 18,
      borderRadius: 12,
      minWidth: 140,
      margin: 8,
      border: "1px solid #333",
      textAlign: "center",
      flex: "1 1 22%", // ⭐⭐⭐ CUATRO CARDS POR FILA
    }}
  >
    <div style={{ fontSize: 14, color: "#bbb" }}>{label}</div>
    <div
      style={{
        fontSize: 34,
        fontWeight: "bold",
        color: "#25D366", // ⭐ VERDE WHATSAPP
      }}
    >
      {value}
    </div>
    {units && <div style={{ fontSize: 12, color: "#777" }}>{units}</div>}
  </div>
);

// -------------------------------------------------------
// GRÁFICO CARRY VS TOTAL
// -------------------------------------------------------
const CarryVsTotalChart = ({ rows }) => {
  if (!rows) return null;

  const data = rows
    .map((r) => ({
      carry: Number(r["CARRY YD"]?.replace(",", ".")),
      total: Number(r["TOTAL YD"]?.replace(",", ".")),
    }))
    .filter((d) => !isNaN(d.carry) && !isNaN(d.total));

  if (!data.length) return null;

  return (
    <div style={{ width: "100%", height: 350, marginTop: 40 }}>
      <h2 style={{ color: "#25D366" }}>Dispersión: Carry vs Total</h2>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid stroke="#333" />
          <XAxis
            type="number"
            dataKey="carry"
            unit=" yd"
            tick={{ fill: "#ccc" }}
            stroke="#ccc"
          />
          <YAxis
            type="number"
            dataKey="total"
            unit=" yd"
            tick={{ fill: "#ccc" }}
            stroke="#ccc"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #444",
              color: "white",
            }}
          />
          <Scatter data={data} fill="#25D366" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

// -------------------------------------------------------
// COMPONENTE PRINCIPAL
// -------------------------------------------------------
export default function StatsPage() {
  const [alumno, setAlumno] = useState("");
  const [palo, setPalo] = useState("");
  const [fecha, setFecha] = useState("");
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedShot, setSelectedShot] = useState(-1);

  // ---------------------------
  // DATOS AVANZADOS SELECCIONADOS
  // ---------------------------
  const [selectedAdvanced, setSelectedAdvanced] = useState({
    "ALTURA YD": false,
    "VUELO SEG": false,
    "FTT GRADO": false,
    "CAMINO GRADO": false,
    "LATERAL GRADO": false,
  });

  const toggleAdvanced = (key) => {
    setSelectedAdvanced((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // ------------------------------------------------------
  // GRUPOS DE MÉTRICAS
  // ------------------------------------------------------
  const GROUPS = {
    vuelo: {
      label: "Vuelo",
      keys: {
        "TOTAL YD": ["Total", "yd"],
        "CARRY YD": ["Carry", "yd"],
        "ROLL YD": ["Roll", "yd"],
        "FUERA DE LINEA YD": ["Línea", "yd"],
      },
      advanced: {
        "ALTURA YD": ["Altura", "yd"],
        "VUELO SEG": ["Vuelo", "s"],
      },
    },
    pelota: {
      label: "Pelota",
      keys: {
        "VELOCIDAD MPH": ["Velocidad bola", "mph"],
        "LANZAMIENTO GRADO": ["Ángulo lanzamiento", "°"],
        "ATRAS RPM": ["Backspin", "rpm"],
        "LATERAL RPM": ["Sidespin", "rpm"],
      },
      advanced: {
        "FTT GRADO": ["FTT", "°"],
        "LATERAL GRADO": ["Lateral °", "°"],
      },
    },
    palo: {
      label: "Palo",
      keys: {
        "VELOCIDAD PALO MPH": ["Velocidad palo", "mph"],
        "SMASH FACTOR": ["Smash", ""],
      },
      advanced: {
        "CAMINO GRADO": ["Camino", "°"],
      },
    },
  };

  // ------------------------------------------------------
  // SUBMIT
  // ------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Por favor subí un archivo CSV.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);
    setSelectedShot(-1);

    try {
      const formData = new FormData();
      formData.append("alumno", alumno);
      formData.append("palo", palo);
      formData.append("fecha", fecha);
      formData.append("file", file);

      const res = await fetch(`${API_BASE_URL}/stats`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error procesando datos");

      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------
  // FUNCIONES DE RENDER
  // ------------------------------------------------------
  const renderGroup = (groupKey) => {
    const g = GROUPS[groupKey];

    return (
      <div style={{ marginTop: 25 }}>
        <h3 style={{ color: "#25D366", marginBottom: 10 }}>{g.label}</h3>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* MÉTRICAS PRINCIPALES */}
          {Object.entries(g.keys).map(([key, [label, unit]]) => {
            const m = analysis.metrics[key];
            if (!m) return null;
            return <MetricCard key={key} label={label} value={m.avg} units={unit} />;
          })}

          {/* MÉTRICAS AVANZADAS SI ESTAN SELECCIONADAS */}
          {Object.entries(g.advanced).map(([key, [label, unit]]) => {
            if (!selectedAdvanced[key]) return null;
            const m = analysis.metrics[key];
            if (!m) return null;
            return <MetricCard key={key} label={label} value={m.avg} units={unit} />;
          })}
        </div>
      </div>
    );
  };

  const renderSelectedShot = () => {
    if (!analysis || selectedShot < 0) return null;

    const shot = analysis.rows[selectedShot];

    return (
      <div
        style={{
          background: "#111",
          padding: 20,
          borderRadius: 12,
          border: "1px solid #333",
          marginTop: 40,
        }}
      >
        <h2 style={{ color: "#25D366" }}>Tiro {selectedShot + 1}</h2>

        {Object.entries(GROUPS).map(([groupKey, group]) => (
          <div key={groupKey} style={{ marginTop: 20 }}>
            <h3 style={{ color: "#25D366" }}>{group.label}</h3>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {/* Principales */}
              {Object.entries(group.keys).map(([key, [label, unit]]) => {
                const value = shot[key];
                if (!value) return null;
                return <MetricCard key={key} label={label} value={value} units={unit} />;
              })}

              {/* Avanzados seleccionados */}
              {Object.entries(group.advanced).map(([key, [label, unit]]) => {
                if (!selectedAdvanced[key]) return null;
                const value = shot[key];
                if (!value) return null;
                return <MetricCard key={key} label={label} value={value} units={unit} />;
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ------------------------------------------------------
  // UI PRINCIPAL
  // ------------------------------------------------------
  return (
    <main
      style={{
        padding: 32,
        backgroundColor: "#0d0d0d",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <h1 style={{ color: "#25D366", fontSize: 32, marginBottom: 20 }}>
        Golf Metrics por @clasesdegolf
      </h1>

      {/* -----------------------------------------------------
         FORM
      ----------------------------------------------------- */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#1a1a1a",
          padding: 24,
          borderRadius: 12,
          border: "1px solid #333",
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          {/* Alumno */}
          <input
            type="text"
            value={alumno}
            onChange={(e) => setAlumno(e.target.value)}
            placeholder="Alumno"
            style={{
              flex: 1,
              padding: 10,
              background: "#000",
              color: "white",
              border: "1px solid #444",
            }}
          />

          {/* Palos */}
          <select
            value={palo}
            onChange={(e) => setPalo(e.target.value)}
            style={{
              flex: 1,
              padding: 10,
              background: "#000",
              color: "white",
              border: "1px solid #444",
            }}
          >
            <option value="">Elegir palo...</option>
            <option value="Driver">Driver</option>
            <option value="Madera 3">Madera 3</option>
            <option value="Madera 5">Madera 5</option>
            <option value="Híbrido">Híbrido</option>
            <option value="Hierro 4">Hierro 4</option>
            <option value="Hierro 5">Hierro 5</option>
            <option value="Hierro 6">Hierro 6</option>
            <option value="Hierro 7">Hierro 7</option>
            <option value="Hierro 8">Hierro 8</option>
            <option value="Hierro 9">Hierro 9</option>
            <option value="Pitch">Pitch</option>
            <option value="Gap Wedge">Gap Wedge</option>
            <option value="Sand Wedge">Sand Wedge</option>
            <option value="Lob Wedge">Lob Wedge</option>
            <option value="Putter">Putter</option>
          </select>

          {/* FECHA — 100% DATEPICKER REAL EN CHROME */}
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={{
              padding: 10,
              background: "#000",
              color: "white",
              border: "1px solid #444",
            }}
          />
        </div>

        {/* UPLOAD */}
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{ marginBottom: 16 }}
        />

        {error && (
          <div style={{ color: "#ff4d4d", marginBottom: 10 }}>{error}</div>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#555" : "#25D366",
            color: "#000",
            padding: "10px 16px",
            border: "none",
            borderRadius: 6,
            cursor: loading ? "default" : "pointer",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {loading ? "Procesando..." : "Analizar sesión"}
        </button>
      </form>

      {/* -----------------------------------------------------
         RESULTADOS
      ----------------------------------------------------- */}
      {analysis && (
        <div
          style={{
            background: "#1a1a1a",
            padding: 24,
            borderRadius: 12,
            border: "1px solid #333",
          }}
        >
          <h2 style={{ color: "#25D366", marginBottom: 14 }}>Resultados</h2>

          <p>
            <strong>Alumno:</strong> {analysis.alumno} <br />
            <strong>Palo:</strong> {analysis.palo} <br />
            <strong>Fecha:</strong> {analysis.fecha} <br />
            <strong>Tiros:</strong> {analysis.totalShots}
          </p>

          {/* CHECKBOXES DE DATOS AVANZADOS */}
          <h3 style={{ color: "#25D366", marginTop: 25 }}>
            Datos avanzados a mostrar:
          </h3>

          {Object.entries(selectedAdvanced).map(([key, value]) => (
            <label key={key} style={{ display: "block", marginTop: 8 }}>
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleAdvanced(key)}
                style={{ marginRight: 8 }}
              />
              {key}
            </label>
          ))}

          {/* GRUPOS PRINCIPALES */}
          {renderGroup("vuelo")}
          {renderGroup("pelota")}
          {renderGroup("palo")}

          {/* SELECTOR TIRO */}
          <div style={{ marginTop: 30 }}>
            <label style={{ marginRight: 10 }}>Elegir tiro:</label>
            <select
              value={selectedShot}
              onChange={(e) => setSelectedShot(Number(e.target.value))}
              style={{
                padding: 8,
                background: "#000",
                color: "white",
                border: "1px solid #444",
                borderRadius: 6,
              }}
            >
              <option value={-1}>Ver promedios generales</option>
              {analysis.rows.map((_, i) => (
                <option key={i} value={i}>
                  Tiro {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* TIRO INDIVIDUAL */}
          {renderSelectedShot()}

          {/* GRAFICO */}
          {analysis.rows && <CarryVsTotalChart rows={analysis.rows} />}
        </div>
      )}
    </main>
  );
}
