import express from "express";
import dotenv from "dotenv";

import repoRoutes from "./routes/repoRoutes.js";
import commitRoutes from "./routes/commitRoutes.js";
import totalRoutes from "./routes/totalRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running... ");
});

app.use("/api/repos", repoRoutes);
app.use("/api/commits", commitRoutes);
app.use("/api/total", totalRoutes);

const port = 5002;

const clientSecret = "302e1d28a01e25bb376b3ac44f44aa4811351769";
const clientId = "e39b31efd6354f791078";

app.listen(port, console.log(`Server running on port ${port}`));
