export default function MetricCard({ label, value, units }) {
  return (
    <div
      style={{
        background: "#111",
        padding: "18px 20px",
        borderRadius: "12px",
        border: "1px solid #1f1f1f",
        width: "100%",
        minWidth: "130px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      }}
    >
      {/* Etiqueta de la métrica */}
      <div
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "#999",
          marginBottom: "6px",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </div>

      {/* Valor */}
      <div
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#00ff7f", // Verde tipo TrackMan / WhatsApp
        }}
      >
        {value !== null && value !== undefined ? value : "-"}
      </div>

      {/* Unidades */}
      {units && (
        <div
          style={{
            fontSize: "12px",
            color: "#aaa",
            marginTop: "4px",
          }}
        >
          {units}
        </div>
      )}
    </div>
  );
}
