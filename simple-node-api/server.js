// server.js
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", node: process.version, time: new Date().toISOString() });
});

// Echo query string: /echo?msg=hello
app.get("/echo", (req, res) => {
  res.json({ msg: req.query.msg ?? null });
});

// Sum numbers: { "a": 1, "b": 2 }
app.post("/sum", (req, res) => {
  const { a, b } = req.body || {};
  const na = Number(a), nb = Number(b);
  if (Number.isNaN(na) || Number.isNaN(nb)) {
    return res.status(400).json({ error: "Invalid numbers 'a' and 'b'." });
  }
  res.json({ a: na, b: nb, sum: na + nb });
});

// 404 fallback
app.use((req, res) => res.status(404).json({ error: "Not found" }));

// Solo arrancar si se ejecuta directamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API listening on http://0.0.0.0:${PORT}`);
  });
}

module.exports = app;
