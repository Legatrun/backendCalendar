const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection, sequelize } = require("./database/config");
const path = require("path");

const app = express();

const allowedOrigins = [
  "http://localhost:3000", // Para desarrollo
  // Tu dominio de CloudFront, siempre con HTTPS
  "https://de2jp277vqlbw.cloudfront.net",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

dbConnection();

sequelize.sync().then(() => {
  console.log("Tables created");
});

// CORS
app.use(cors(corsOptions));

app.use(express.static("public"));

// Lectura y Parseo del body

app.use(express.json());

//Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
