"use client";

import { useState } from "react";

import GroupMetrics from "../ui/components/GroupMetrics";
import ShotDetails from "../ui/components/ShotDetails";
import AdvancedSelector from "../ui/components/AdvancedSelector";
import CoachPanel from "../ui/components/CoachPanel";

const API_BASE_URL = "http://localhost:3001";

const getHandicapCategory = (hcp, isPro) => {
  if (isPro) return "Profesional";

  const value = parseFloat(hcp);
  if (isNaN(value)) return null;

  if (value <= 7.9) return "Hcp Bajo";
  if (value <= 17.9) return "Hcp Medio";
  return "Hcp Alto";
};

export default function StatsPage() {
  const [alumno, setAlumno] = useState("");
  const [palo, setPalo] = useState("");
  const [fecha, setFecha] = useState("");
  const [file, setFile] = useState(null);

  const [isPro, setIsPro] = useState(false);
  const [handicap, setHandicap] = useState("");
  const [handicapCategory, setHandicapCategory] = useState(null);

  const [analysis, setAnalysis] = useState(null);
  const [selectedShot, setSelectedShot] = useState(null);

  const [advanced, setAdvanced] = useState({
    vuelo: [],
    pelota: [],
    palo: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const palosDisponibles = [
    "Driver", "3W", "5W",
    "3H", "4H", "5H",
    "Hierro 3", "Hierro 4", "Hierro 5", "Hierro 6",
    "Hierro 7", "Hierro 8", "Hierro 9", "PW", "GW",
    "SW", "LW"
  ];

  const groups = {
    vuelo: {
      title: "Vuelo",
      items: [
        { key: "TOTAL YD", label: "Total (YD)" },
        { key: "CARRY YD", label: "Carry (YD)" },
        { key: "ROLL YD", label: "Roll (YD)" },
        { key: "FUERA DE LINEA YD", label: "Línea (YD)" },
      ],
    },
    pelota: {
      title: "Pelota",
      items: [
        { key: "VELOCIDAD MPH", label: "Velocidad (MPH)" },
        { key: "LANZAMIENTO GRADO", label: "Lanzamiento (°)" },
        { key: "ATRAS RPM", label: "Backspin (RPM)" },
        { key: "LATERAL RPM", label: "Sidespin (RPM)" },
      ],
    },
    palo: {
      title: "Palo",
      items: [
        { key: "VELOCIDAD PALO MPH", label: "Velocidad palo (MPH)" },
        { key: "SMASH FACTOR", label: "Smash Factor" },
      ],
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Por favor subí un archivo CSV.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append("alumno", alumno);
      formData.append("palo", palo);
      formData.append("fecha", fecha);
      formData.append("isPro", isPro ? "true" : "false");
      formData.append("handicap", handicap);
      formData.append("handicapCategory", handicapCategory);
      formData.append("file", file);

      const res = await fetch(`${API_BASE_URL}/stats`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al obtener análisis");

      const data = await res.json();
      setAnalysis(data);
      setSelectedShot(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const shot =
    selectedShot !== null && analysis
      ? analysis.rows[selectedShot]
      : null;

  return (
    <main style={{ padding: 32, maxWidth: 1500, margin: "0 auto" }}>
      <h1
        style={{
          fontSize: 34,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
          color: "#075e54",
        }}
      >
        Golf Metrics por @clasesdegolf
      </h1>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{
          padding: 24,
          background: "#fff",
          borderRadius: 12,
          marginBottom: 28,
          border: "1px solid #ddd",
        }}
      >
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <select
            value={isPro ? "pro" : "no"}
            onChange={(e) => {
              const v = e.target.value === "pro";
              setIsPro(v);
              setHandicapCategory(getHandicapCategory(handicap, v));
            }}
            style={{ width: 140, padding: 10 }}
          >
            <option value="no">Aficionado</option>
            <option value="pro">Profesional</option>
          </select>

          {!isPro && (
            <input
              type="number"
              step="0.1"
              value={handicap}
              onChange={(e) => {
                const v = e.target.value;
                setHandicap(v);
                setHandicapCategory(getHandicapCategory(v, false));
              }}
              placeholder="Handicap"
              style={{ width: 120, padding: 10 }}
            />
          )}

          <input
            type="text"
            value={alumno}
            onChange={(e) => setAlumno(e.target.value)}
            placeholder="Alumno"
            style={{ flex: 1, padding: 10 }}
          />

          <select
            value={palo}
            onChange={(e) => setPalo(e.target.value)}
            style={{ flex: 1, padding: 10 }}
          >
            <option value="">Elija un palo</option>
            {palosDisponibles.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={{ padding: 10 }}
          />
        </div>

        {handicapCategory && (
          <p style={{ marginTop: -10, marginBottom: 16, fontSize: 14 }}>
            Categoría detectada: <strong>{handicapCategory}</strong>
          </p>
        )}

        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{ marginBottom: 16 }}
        />

        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 20px",
            background: "#128c7e",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Procesando..." : "Analizar sesión"}
        </button>
      </form>

      {analysis && (
        <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 14 }}>
              Promedio de {analysis.totalShots} golpes ejecutados
            </h2>

            <p>
              <strong>Alumno:</strong> {analysis.alumno} <br />
              <strong>Palo:</strong> {analysis.palo} <br />
              <strong>Fecha:</strong> {analysis.fecha} <br />
              <strong>Golpes:</strong> {analysis.totalShots} <br />
              <strong>Handicap:</strong>{" "}
              {isPro ? "Profesional" : `${handicap} (${handicapCategory})`}
            </p>

            <GroupMetrics
              title=""
              groups={groups}
              metrics={analysis.metrics}
              advanced={advanced}
              handicapCategory={handicapCategory}
            />

            <div style={{ marginTop: 30, marginBottom: 20 }}>
              <label style={{ marginRight: 12, fontWeight: "bold" }}>
                Elegir golpe:
              </label>
              <select
                value={selectedShot ?? ""}
                onChange={(e) =>
                  setSelectedShot(
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
                style={{ padding: 8 }}
              >
                <option value="">Todos</option>
                {analysis.rows.map((r, i) => (
                  <option key={i} value={i}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {shot && <ShotDetails shot={shot} groups={groups} advanced={advanced} />}

            <AdvancedSelector
              metrics={analysis.metrics}
              advanced={advanced}
              setAdvanced={setAdvanced}
            />
          </div>

          {/* PANEL DEL COACH */}
          <CoachPanel analysis={analysis} handicapCategory={handicapCategory} />
        </div>
      )}
    </main>
  );
}
