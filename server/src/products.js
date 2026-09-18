// server/src/products.js
//
// Fetches real product results (image, title, price, retailer, link) for a
// search query. Default provider is SerpApi's Google Shopping engine,
// which aggregates listings across many retailers in a single call —
// no per-retailer approval needed to start.
//
// TO SWAP PROVIDERS LATER (e.g. official Amazon Product Advertising API
// once you're approved, or a dedicated Amazon/Shein data API):
// Keep this file's export signature — fetchProducts(query) => Product[] —
// the same, and just change what happens inside. Nothing else needs to
// change.

import fetch from "node-fetch";

/** @typedef {{ title: string, image: string, price: string, retailer: string, url: string }} Product */

const SERPAPI_URL = "https://serpapi.com/search.json";

/** @returns {Promise<Product[]>} */
export async function fetchProducts(query) {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey || apiKey === "your_serpapi_key_here") {
    throw new Error(
      "SERPAPI_KEY is not set. Add a real key to server/.env (get one at https://serpapi.com).",
    );
  }

  const params = new URLSearchParams({
    engine: "google_shopping",
    q: query,
    api_key: apiKey,
  });

  const res = await fetch(`${SERPAPI_URL}?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Product provider request failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const results = Array.isArray(data.shopping_results) ? data.shopping_results : [];

  return results
    .filter((r) => r.title && (r.thumbnail || r.image))
    .slice(0, 12)
    .map((r) => ({
      title: r.title,
      image: r.thumbnail ?? r.image,
      price: r.price ?? "See price",
      retailer: r.source ?? "Unknown retailer",
      url: r.product_link ?? r.link ?? "#",
    }));
}
