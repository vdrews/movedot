// server/src/index.js
//
// Minimal API for the MoveDot product search bar:
//   GET /api/products?q=...   -> real product results (logs the search too)
//   GET /api/trending?prefix=... -> site-wide popular searches matching prefix
//   GET /api/health           -> uptime check

import "dotenv/config";
import express from "express";
import cors from "cors";
import { fetchProducts } from "./products.js";
import { recordSearch, getTrending } from "./store.js";

const app = express();
const PORT = process.env.PORT || 8787;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  }),
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/products", async (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'." });
  }

  // Every real search is the signal for trending — log it here so the
  // frontend doesn't need a separate call.
  recordSearch(q);

  try {
    const products = await fetchProducts(q);
    res.json({ products });
  } catch (err) {
    console.error("[/api/products] error:", err.message);
    res.status(502).json({ error: "Could not fetch product results.", detail: err.message });
  }
});

app.get("/api/trending", (req, res) => {
  const prefix = typeof req.query.prefix === "string" ? req.query.prefix : "";
  const limit = Math.min(Number(req.query.limit) || 5, 10);
  res.json({ suggestions: getTrending(prefix, limit) });
});

app.listen(PORT, () => {
  console.log(`MoveDot search API listening on http://localhost:${PORT}`);
});
