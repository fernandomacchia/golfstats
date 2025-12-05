"use client";

export default function CoachPanel({ analysis, handicapCategory }) {
  if (!analysis) return null;

  const avg = analysis.metrics;

  // Valores promediados con seguridad
  const smash = Number(avg["SMASH FACTOR"]?.avg ?? 0);
  const launch = Number(avg["LANZAMIENTO GRADO"]?.avg ?? 0);
  const backspin = Number(avg["ATRAS RPM"]?.avg ?? 0);
  const offline = Number(avg["FUERA DE LINEA YD"]?.avg ?? 0);

  // ---------------------------------------------
  // RECOMENDACIONES PERSONALIZADAS (ESTILO C + D)
  // ---------------------------------------------

  // === SMASH FACTOR ===
  let smashText = "";
  if (smash < 1.40) {
    smashText =
      "Tu cuerpo genera buena energía pero parte se pierde en el impacto. Vamos a buscar un contacto más centrado para que toda la potencia llegue a la pelota.";
  } else if (smash < 1.46) {
    smashText =
      "Estás muy cerca de una excelente eficiencia. Pequeños ajustes en la estabilidad de manos pueden darte un salto de calidad inmediato.";
  } else {
    smashText = "Impacto sólido y eficiente. Excelente transferencia de energía.";
  }

  let smashAction =
    smash < 1.46
      ? "• Enfocarnos en impacto centrado.\n• Estabilidad de muñecas.\n• Control de la cara al impacto."
      : "• Mantener rutina.\n• Buscar consistencia del impacto.";

  // === LAUNCH ANGLE ===
  let launchText = "";
  if (launch < 10) {
    launchText =
      "El vuelo sale comprimido. Adelantando un poco la pelota y liberando la cara vas a ganar carry sin esfuerzo.";
  } else if (launch > 16) {
    launchText =
      "Lanzás muy alto y perdés distancia. Un impacto más firme y con menos loft dinámico va a darte un vuelo más penetrante.";
  } else {
    launchText = "Excelente lanzamiento: vuelo estable y eficiente.";
  }

  let launchAction =
    launch < 10
      ? "• Adelantar levemente la pelota.\n• Liberar más la cara.\n• Evitar exceso de shaft lean."
      : launch > 16
      ? "• Reducir loft dinámico.\n• Estabilizar la mano izquierda.\n• Impacto más plano."
      : "• Mantener mecánica actual.";

  // === BACKSPIN ===
  let spinText = "";
  if (backspin > 3500) {
    spinText =
      "Estás generando más spin del ideal y eso te roba distancia. Con un impacto más plano y menos loft dinámico vas a ganar metros.";
  } else if (backspin < 2200) {
    spinText =
      "El spin está bajo y puede dificultar el control del vuelo. Busquemos una entrega más estable del palo.";
  } else {
    spinText = "Buen nivel de spin: equilibrio entre distancia y control.";
  }

  let spinAction =
    backspin > 3500
      ? "• Reducir loft dinámico.\n• Mejorar control de la muñeca izquierda.\n• Buscar impacto más neutro."
      : backspin < 2200
      ? "• Elevar ligeramente el launch.\n• Menos forward shaft lean.\n• Controlar punto de impacto."
      : "• Mantener entrega del palo.";

  // === PRECISIÓN ===
  let precText = "";
  if (Math.abs(offline) > 20) {
    precText =
      "Tenés potencia pero la dirección se está escapando. Ajustando la alineación y la cara al impacto vas a controlar mucho mejor el vuelo.";
  } else if (Math.abs(offline) > 10) {
    precText =
      "Buena base de dirección. Con un poco más de control de la cara los tiros se agrupan enseguida.";
  } else {
    precText = "Muy buen control direccional. Mantené esta estructura.";
  }

  let precAction =
    Math.abs(offline) > 20
      ? "• Trabajar relación cara-path.\n• Ejercicios de alineación visual.\n• Controlar cara al impacto."
      : Math.abs(offline) > 10
      ? "• Focalizar ruta del palo.\n• Microajustes de alineación."
      : "• Repetir rutina actual.";

  // ---------------------------------------------
  // PLAN DE ACCIÓN GENERAL (ESTILO B)
  // ---------------------------------------------
  const planDeAccion = `
1) Mejorar impacto centrado para aumentar eficiencia.
2) Optimizar loft dinámico para controlar spin y lanzamiento.
3) Ajustar alineación y cara del palo para ganar precisión.
`;

  // ---------------------------------------------
  // RENDER DEL PANEL
  // ---------------------------------------------
  return (
    <div
      style={{
        width: 360,
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        border: "1px solid #ddd",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 20,
        color: "#222",
        height: "fit-content",
        fontSize: 14,
        lineHeight: "1.4",
      }}
    >
      <h2
        style={{
          marginBottom: 10,
          fontSize: 16,
          fontWeight: "bold",
          color: "#075e54",
        }}
      >
        Análisis del Coach
      </h2>

      <p style={{ marginBottom: 20, opacity: 0.8 }}>
        Basado en tus promedios y tu categoría: <strong>{handicapCategory}</strong>.
      </p>

      {/* SMASH */}
      <div style={{ marginBottom: 20 }}>
        <strong>Eficiencia (Smash): {smash.toFixed(2)}</strong>
        <div>{smashText}</div>
        <pre style={{ fontSize: 13, marginTop: 6, whiteSpace: "pre-wrap", opacity: 0.9 }}>
          {smashAction}
        </pre>
      </div>

      {/* LAUNCH */}
      <div style={{ marginBottom: 20 }}>
        <strong>Lanzamiento: {launch.toFixed(1)}°</strong>
        <div>{launchText}</div>
        <pre style={{ fontSize: 13, marginTop: 6, whiteSpace: "pre-wrap", opacity: 0.9 }}>
          {launchAction}
        </pre>
      </div>

      {/* SPIN */}
      <div style={{ marginBottom: 20 }}>
        <strong>Backspin: {backspin.toFixed(0)} rpm</strong>
        <div>{spinText}</div>
        <pre style={{ fontSize: 13, marginTop: 6, whiteSpace: "pre-wrap", opacity: 0.9 }}>
          {spinAction}
        </pre>
      </div>

      {/* PRECISIÓN */}
      <div style={{ marginBottom: 20 }}>
        <strong>Precisión: {offline.toFixed(1)} yd</strong>
        <div>{precText}</div>
        <pre style={{ fontSize: 13, marginTop: 6, whiteSpace: "pre-wrap", opacity: 0.9 }}>
          {precAction}
        </pre>
      </div>

      {/* PLAN DE ACCIÓN */}
      <div style={{ marginTop: 25 }}>
        <strong style={{ fontSize: 15 }}>Plan de acción</strong>
        <pre style={{ fontSize: 13, whiteSpace: "pre-wrap", marginTop: 6 }}>
          {planDeAccion}
        </pre>
      </div>
    </div>
  );
}
