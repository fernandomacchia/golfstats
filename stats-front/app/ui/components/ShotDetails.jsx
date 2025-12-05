"use client";

import metricNames from "../utils/metricNames";
import { referenceValues } from "../utils/referenceValues";
import Tooltip from "../components/Tooltip";
import { metricDescriptions } from "../utils/metricDescriptions";

export default function ShotDetails({
  shot,
  groups,
  advanced,
  handicapCategory,
}) {
  if (!shot) return null;

  const getName = (key) => metricNames[key] || key;

  const categoryColors = {
    Profesional: "#9b59b6",
    "Hcp Bajo": "#27ae60",
    "Hcp Medio": "#f1c40f",
    "Hcp Alto": "#c0392b",
  };

  const getCategoryForValue = (metricKey, value) => {
    const ranges = referenceValues[metricKey];
    if (!ranges) return null;

    const order = ["Profesional", "Hcp Bajo", "Hcp Medio", "Hcp Alto"];
    for (const cat of order) {
      const r = ranges[cat];
      if (!r) continue;
      if (value >= r.min && value <= r.max) return cat;
    }
    return null;
  };

  return (
    <div style={{ marginTop: 30, marginBottom: 40 }}>

      <h3
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#fff",
          marginBottom: 15,
        }}
      >
        Golpe seleccionado
      </h3>

      {Object.entries(groups).map(([groupKey, group]) => {
        const groupMetrics = [
          ...group.items.map((i) => i.key),
          ...(advanced[groupKey] || []),
        ];

        return (
          <div key={groupKey} style={{ marginBottom: 30 }}>

            <h4
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#fff",
                marginBottom: 10,
                borderBottom: "1px solid #444",
                paddingBottom: 4,
              }}
            >
              {group.title}
            </h4>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                marginTop: 10,
              }}
            >
              {groupMetrics.map((metricKey) => {
                const value = shot[metricKey];
                if (value === undefined || value === null) return null;

                const detectedCategory = getCategoryForValue(metricKey, value);
                const ref = referenceValues[metricKey]?.[handicapCategory];

                return (
                  <div
                    key={metricKey}
                    style={{
                      background: "#f7f7f7",
                      borderRadius: 12,
                      padding: "14px 18px",
                      minWidth: 160,
                      flex: "0 0 calc(25% - 16px)",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.12)",
                    }}
                  >
                    {/* Nombre + Tooltip */}
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#333",
                        marginBottom: 8,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      {getName(metricKey)}

                      <Tooltip>
                        <strong>{getName(metricKey)}</strong>
                        <br /><br />
                        {metricDescriptions[metricKey] || "Sin descripción disponible."}
                        <br /><br />
                        {detectedCategory && (
                          <>
                            Categoría detectada:{" "}
                            <strong>{detectedCategory}</strong>
                            <br />
                            Rango:{" "}
                            <strong>
                              {referenceValues[metricKey][detectedCategory].min} –{" "}
                              {referenceValues[metricKey][detectedCategory].max}
                            </strong>
                          </>
                        )}
                      </Tooltip>
                    </div>

                    {/* Valor */}
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: categoryColors[detectedCategory] || "#333",
                        marginBottom: 6,
                      }}
                    >
                      {value}
                    </div>

                    {/* Ref */}
                    {ref && (
                      <div
                        style={{
                          fontSize: 12,
                          color: "#555",
                          borderTop: "1px solid #ccc",
                          paddingTop: 6,
                        }}
                      >
                        Ref ({handicapCategory}):{" "}
                        <strong>
                          {ref.min} – {ref.max}
                        </strong>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        );
      })}
    </div>
  );
}
