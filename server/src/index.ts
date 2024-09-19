import express from "express";
import playersRoutes from "./routes/player.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import rankingsRoutes from "./routes/rankings.routes.js";
import loginRoutes from "./routes/login.routes.js";
import authMiddlewareJWT from "./middleware/authMiddleware.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api", loginRoutes);
app.use("/api", authMiddlewareJWT, playersRoutes);
app.use("/api", authMiddlewareJWT, gamesRoutes);
app.use("/api", authMiddlewareJWT, rankingsRoutes);

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server listening on localhost:${PORT}`);
});
