const express = require("express");
const cors = require("cors");
const multer = require("multer");
const parse = require("csv-parse").parse;
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Multer guarda archivos en /uploads
const upload = multer({ dest: "uploads/" });

// ORDEN PROFESIONAL DE MÉTRICAS
const metricOrder = [
  "GOLPE",
  "SHOT SCORE",

  "VELOCIDAD PALO MPH",
  "VELOCIDAD MPH",
  "SMASH FACTOR",

  "LANZAMIENTO GRADO",
  "CAMINO GRADO",
  "FTT GRADO",

  "ATRAS RPM",
  "LATERAL RPM",
  "LATERAL GRADO",

  "FUERA DE LINEA YD",
  "EN DESCENSO GRADO",

  "ALTURA YD",
  "VUELO SEG",

  "CARRY YD",
  "ROLL YD",
  "TOTAL YD"
];

app.post("/stats", upload.single("file"), (req, res) => {
  const { alumno, palo, fecha } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No archivo recibido" });
  }

  fs.readFile(req.file.path, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "No puedo leer CSV" });
    }

    // Parsear CSV SkyTrak (usa ;)
    parse(
      data,
      {
        columns: true,
        delimiter: ";",
        skip_empty_lines: true,
        trim: true
      },
      (err, records) => {
        if (err) {
          return res.status(500).json({ error: "Error procesando CSV" });
        }

        if (!records.length) {
          return res.status(400).json({ error: "CSV vacío o mal formateado" });
        }

        // Procesar métricas según el orden deseado
        const metrics = {};
        const fields = Object.keys(records[0]);

        metricOrder.forEach((field) => {
          if (fields.includes(field)) {
            const nums = records
              .map((r) => Number(String(r[field]).replace(",", ".")))
              .filter((n) => !isNaN(n));

            if (nums.length) {
              metrics[field] = {
                min: Math.min(...nums),
                max: Math.max(...nums),
                avg: (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2)
              };
            }
          }
        });

        // DEVOLVEMOS TAMBIÉN LOS TIROS UNO A UNO → para los gráficos
        res.json({
          alumno,
          palo,
          fecha,
          totalShots: records.length,
          metrics,
          rows: records    // ⭐⭐⭐ ESTO ES LO QUE HABILITA EL GRÁFICO
        });
      }
    );
  });
});

app.listen(3001, () => {
  console.log("Backend running on port 3001");
});
