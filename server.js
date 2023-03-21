import express from "express";
import cors from "cors";
import movies from "./api/movies.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});
app.use("/api/v1/movies", movies);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
