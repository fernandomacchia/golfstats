// stats-front/app/ui/utils/metricDescriptions.js

export const metricDescriptions = {
  "VELOCIDAD MPH": `
Velocidad de la pelota inmediatamente después del impacto.
Es la métrica que más influye en la distancia total.
Depende de la eficiencia del impacto (Smash Factor) y de la
velocidad del palo.
Pro: 155–175 mph | Amateur: 125–155 mph.
  `,

  "VELOCIDAD PALO MPH": `
Velocidad del palo justo antes del impacto.
Define el potencial máximo de distancia.
El jugador debe aumentarla sin perder control ni consistencia.
Pro: 110–120 mph | Amateur: 85–110 mph.
  `,

  "SMASH FACTOR": `
Relación entre velocidad de pelota y velocidad del palo.
Mide cuánta energía se transfiere en el impacto.
1.50 = impacto perfecto (driver). Valores bajos indican impacto
descentrado o pérdida de eficiencia.
  `,

  "LANZAMIENTO GRADO": `
Ángulo inicial de salida de la pelota. Depende del loft dinámico,
del ángulo de ataque y del contacto.
Ángulos altos generan más altura y control; ángulos bajos generan
vuelo penetrante y menos spin.
  `,

  "ATRAS RPM": `
Backspin: rotación hacia atrás que controla altura, vuelo y capacidad
de frenar la pelota. Demasiado spin reduce distancia; muy poco spin
genera vuelo plano y exceso de roll.
  `,

  "LATERAL RPM": `
Sidespin: rotación lateral que define la curva del tiro.
Positivo → fade. Negativo → draw.
Valores altos indican tiros curvos o descontrolados.
  `,

  "CARRY YD": `
Distancia en el aire antes de tocar el suelo.
Es clave para elegir palo, superar bunkers y atacar greens.
La métrica más importante de consistencia real.
  `,

  "ROLL YD": `
Distancia que rueda la pelota luego de aterrizar.
Depende del ángulo de descenso, del backspin y de la firmeza del suelo.
  `,

  "TOTAL YD": `
Carry + Roll.
Es la distancia total del tiro. Útil para fitting y cálculos de promedio.
  `,

  "FUERA DE LINEA YD": `
Medición lateral del desvío respecto a la línea objetivo.
Indica precisión. Valores bajos = mayor control y tiros rectos.
  `,
};
