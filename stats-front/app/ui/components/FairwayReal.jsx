export default function FairwayReal({ children }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "420px",     // responsive
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Imagen original, sin deformación */}
      <img
        src="/fairway.png"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          filter: "brightness(0.82)", // leve oscurecimiento tipo TrackMan
        }}
      />

      {/* Capa de trazado */}
      <svg
        viewBox="0 0 1200 2000"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {children}
      </svg>
    </div>
  );
}
