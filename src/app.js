const express = require("express");
const usersRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use("/", usersRoutes);
app.use("/", authRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err.code === "23505") {
    // Unique violation error code for PostgreSQL
    return res.status(409).json({ error: "email already registered" });
  }

  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;