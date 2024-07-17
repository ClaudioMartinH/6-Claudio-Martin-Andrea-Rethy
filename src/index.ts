import express from "express";
import playersRoutes from "./routes/player.routes.js";
import gamesRoutes from "./routes/games.routes.js";

const app = express();
const PORT = 3000;
app.use(express.json());

app.use("/api", playersRoutes);
app.use("/api", gamesRoutes);

app.listen(PORT, () => {
  console.log("Server listening on localhost:3000");
});