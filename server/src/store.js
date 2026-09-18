// server/src/store.js
//
// Minimal persistence for "what's searched often, site-wide." A JSON file
// on disk is enough to start with zero setup — swap this module for a real
// table (Postgres/SQLite/etc.) once you have meaningful traffic; every
// other file only talks to the functions exported here, so that swap
// doesn't touch route code.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "..", "data", "search-log.json");

/** @typedef {{ query: string, count: number, lastSearched: number }} HistoryEntry */

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "{}");
}

/** @returns {Record<string, HistoryEntry>} */
function load() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/** @param {Record<string, HistoryEntry>} data */
function save(data) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

/** Call whenever a real search happens. Bumps that query's count. */
export function recordSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return;

  const data = load();
  const existing = data[q];
  if (existing) {
    existing.count += 1;
    existing.lastSearched = Date.now();
  } else {
    data[q] = { query: q, count: 1, lastSearched: Date.now() };
  }
  save(data);
}

/**
 * Returns the top past searches (site-wide) that start with `prefix`,
 * ranked by how often they've been searched.
 */
export function getTrending(prefix, limit = 5) {
  const p = prefix.trim().toLowerCase();
  if (p.length < 2) return [];

  const data = load();
  return Object.values(data)
    .filter((e) => e.query.startsWith(p) && e.query !== p)
    .sort((a, b) => b.count - a.count || b.lastSearched - a.lastSearched)
    .slice(0, limit)
    .map((e) => e.query);
}
