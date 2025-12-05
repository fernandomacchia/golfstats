"use client";

export default function AdvancedSelector({ metrics, advanced, setAdvanced }) {

  // ✔ METRICS por categoría
  const categorias = {
    vuelo: [
      "TOTAL YD",
      "CARRY YD",
      "ROLL YD",
      "FUERA DE LINEA YD",
      "ALTURA YD",
      "VUELO SEG",
      "EN DESCENSO GRADO",
    ],
    pelota: [
      "VELOCIDAD MPH",
      "LANZAMIENTO GRADO",
      "ATRAS RPM",
      "LATERAL RPM",
      "LATERAL GRADO",
      "SHOT SCORE",
    ],
    palo: [
      "VELOCIDAD PALO MPH",
      "SMASH FACTOR",
      "CAMINO GRADO",
      "FTT GRADO",
    ],
  };

  // ✔ añade métrica
  const handleAdd = (group, value) => {
    if (!value) return;
    if (!advanced[group].includes(value)) {
      setAdvanced({
        ...advanced,
        [group]: [...advanced[group], value],
      });
    }
  };

  // ✔ elimina métrica
  const handleRemove = (group, metric) => {
    setAdvanced({
      ...advanced,
      [group]: advanced[group].filter((m) => m !== metric),
    });
  };

  return (
    <div style={{ marginTop: 40 }}>
      <h3 style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Métricas avanzadas
      </h3>

      {/* ✔ LOS 3 SELECTORES EN UNA FILA */}
      <div
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        {["vuelo", "pelota", "palo"].map((group) => (
          <div key={group} style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 6,
                fontSize: 14,
                color: "#075e54",
              }}
            >
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </div>

            {/* SELECTOR → solo métricas del grupo */}
            <select
              onChange={(e) => handleAdd(group, e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            >
              <option value="">Agregar métrica…</option>
              {categorias[group]
                .filter((m) => metrics[m])
                .map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
            </select>

            {/* ✔ CHIPS verdes + ❌ elegante */}
            <div
              style={{
                marginTop: 8,
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              {advanced[group].map((m) => (
                <div
                  key={m}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "#128c7e",
                    padding: "4px 8px",
                    borderRadius: 20,
                    color: "#fff",
                    fontSize: 12,
                  }}
                >
                  {m}

                  {/* ❌ redondita elegante */}
                  <span
                    onClick={() => handleRemove(group, m)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.8)",
                      color: "#128c7e",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: 11,
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
