import express from "express";
import playersRoutes from "./routes/player.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import rankingsRoutes from "./routes/rankings.routes.js";
import loginRoutes from "./routes/login.routes.js";
// import authMiddlewareJWT from "./middleware/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// habrá que agregar la seguridad a todas las rutas [ app.use("/api, authMiddelwareJWT, playerRoutes) y asi con todas"]
app.use("/api", playersRoutes);
app.use("/api", gamesRoutes);
app.use("/api", rankingsRoutes);

app.use("/api", loginRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
});
