import express from "express";
import playersRoutes from "./routes/player.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import rankingsRoutes from "./routes/rankings.routes.js";
import loginRoutes from "./routes/login.routes.js";
import authMiddlewareJWT from "./middleware/authMiddleware.js";
import dotenv from "dotenv";
const cors = require("cors");

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    // credentials: true
  })
);

app.options("*", cors());

const PORT = process.env.PORT || 3000;
app.use(express.json());

// a login no se le añade protección porque es donde generamos el token
app.use("/api", loginRoutes);
// una vez añadida la seguridad hay que manejar en cada llamada que se incluya el token generado
app.use("/api", authMiddlewareJWT, playersRoutes);
app.use("/api", authMiddlewareJWT, gamesRoutes);
app.use("/api", authMiddlewareJWT, rankingsRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
});
