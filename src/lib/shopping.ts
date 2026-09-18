// src/lib/shopping.ts
//
// Powers the ProductSearch bar:
//  - getSuggestions(query): instant local suggestions from this visitor's
//    own past searches while they type. No made-up/generic suggestions —
//    only real things that have actually been searched.
//  - fetchPopularSuggestions(query): site-wide trending searches from the
//    backend, merged in once they arrive.
//  - fetchProducts(query): real product results (image/title/price) from
//    the backend. Falls back to plain retailer deep-links if the backend
//    is unreachable, so the search bar still works with zero setup.

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8787";

// --- Retailer deep links (fallback only) ------------------------------
//
// Used only when the backend/product API can't be reached — e.g. before
// you've set SERPAPI_KEY, or if the request fails. Real searches should
// go through fetchProducts() instead, which returns actual images/prices.

export type Retailer = {
  id: string;
  label: string;
  color: string;
  buildUrl: (query: string) => string;
};

export const RETAILERS: Retailer[] = [
  { id: "amazon", label: "Amazon", color: "bg-orange-500", buildUrl: (q) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}` },
  { id: "shein", label: "Shein", color: "bg-black", buildUrl: (q) => `https://us.shein.com/pdsearch/${encodeURIComponent(q)}/` },
  { id: "walmart", label: "Walmart", color: "bg-blue-600", buildUrl: (q) => `https://www.walmart.com/search?q=${encodeURIComponent(q)}` },
  { id: "ebay", label: "eBay", color: "bg-red-500", buildUrl: (q) => `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(q)}` },
  { id: "aliexpress", label: "AliExpress", color: "bg-rose-500", buildUrl: (q) => `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(q)}` },
  { id: "fashionnova", label: "Fashion Nova", color: "bg-fuchsia-600", buildUrl: (q) => `https://www.fashionnova.com/search?q=${encodeURIComponent(q)}` },
  { id: "target", label: "Target", color: "bg-red-600", buildUrl: (q) => `https://www.target.com/s?searchTerm=${encodeURIComponent(q)}` },
];

// --- Real product results (backend) ------------------------------------

export type Product = {
  title: string;
  image: string;
  price: string;
  retailer: string;
  url: string;
};

export async function fetchProducts(query: string): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/api/products?q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Product request failed (${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data.products) ? data.products : [];
}

// --- Suggestions ---------------------------------------------------------

export type Suggestion = {
  text: string;
  source: "history" | "popular";
};

// Per-visitor personalization stays local (instant, works offline).
const HISTORY_KEY = "movedot_search_history_v1";
const MAX_HISTORY_ENTRIES = 200;

type HistoryEntry = { query: string; count: number; lastSearched: number };

function isBrowser() {
  return typeof window !== "undefined" && !!window.localStorage;
}

function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or disabled — fail silently.
  }
}

function getHistory(): HistoryEntry[] {
  return readJSON<HistoryEntry[]>(HISTORY_KEY, []);
}

/**
 * Call whenever a search actually runs. Updates local (per-visitor) history.
 * Site-wide trending is recorded automatically by the backend on
 * fetchProducts() — no separate call needed for that part.
 */
export function recordSearch(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return;

  const history = getHistory();
  const existing = history.find((h) => h.query === q);
  if (existing) {
    existing.count += 1;
    existing.lastSearched = Date.now();
  } else {
    history.push({ query: q, count: 1, lastSearched: Date.now() });
  }
  history.sort((a, b) => b.lastSearched - a.lastSearched);
  writeJSON(HISTORY_KEY, history.slice(0, MAX_HISTORY_ENTRIES));
}

/** Instant, local suggestions: only this visitor's own real past searches. */
export function getSuggestions(query: string): Suggestion[] {
  const q = query.trim();
  if (q.length < 2) return [];
  const qLower = q.toLowerCase();

  return getHistory()
    .filter((h) => h.query.startsWith(qLower) && h.query !== qLower)
    .sort((a, b) => b.count - a.count || b.lastSearched - a.lastSearched)
    .slice(0, 6)
    .map((h): Suggestion => ({ text: h.query, source: "history" }));
}

/** Site-wide trending from the backend. Returns [] on any failure — caller just keeps local suggestions. */
export async function fetchPopularSuggestions(query: string): Promise<Suggestion[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  try {
    const res = await fetch(`${API_BASE_URL}/api/trending?prefix=${encodeURIComponent(q)}&limit=3`);
    if (!res.ok) return [];
    const data = await res.json();
    const suggestions: string[] = Array.isArray(data.suggestions) ? data.suggestions : [];
    return suggestions.map((text): Suggestion => ({ text, source: "popular" }));
  } catch {
    return [];
  }
}

export function debounce<Args extends unknown[]>(fn: (...args: Args) => void, delayMs: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  };
}