import { useEffect, useMemo, useRef, useState } from "react";
import { Search, ExternalLink, TrendingUp, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  RETAILERS,
  getSuggestions,
  fetchPopularSuggestions,
  fetchProducts,
  recordSearch,
  debounce,
  type Suggestion,
  type Product,
} from "@/lib/shopping";

/**
 * Drop-in product search bar: type an item (e.g. "bathing soap"), get
 * predictive suggestions, hit enter to see real product results — image,
 * name, price, retailer — pulled from the backend. Falls back to plain
 * retailer search links if the backend/product API isn't reachable.
 *
 * Usage:
 *   <ProductSearch />
 */
export function ProductSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const [searchedFor, setSearchedFor] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "fallback">("idle");

  const containerRef = useRef<HTMLDivElement>(null);
  const latestQueryRef = useRef("");

  const debouncedSuggest = useMemo(
    () =>
      debounce((q: string) => {
        setSuggestions(getSuggestions(q));
        // Merge in site-wide trending once it arrives, if the query hasn't changed.
        fetchPopularSuggestions(q).then((popular) => {
          if (latestQueryRef.current !== q || popular.length === 0) return;
          setSuggestions((current) => {
            const existingText = new Set(current.map((s) => s.text));
            const merged = [...popular.filter((p) => !existingText.has(p.text)), ...current];
            return merged.slice(0, 6);
          });
        });
      }, 200),
    [],
  );

  useEffect(() => {
    latestQueryRef.current = query;
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    debouncedSuggest(query);
  }, [query, debouncedSuggest]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function runSearch(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;

    setQuery(trimmed);
    setSearchedFor(trimmed);
    setShowSuggestions(false);
    setActiveIndex(-1);
    setStatus("loading");
    recordSearch(trimmed);

    try {
      const results = await fetchProducts(trimmed);
      if (results.length > 0) {
        setProducts(results);
        setStatus("ok");
      } else {
        setProducts([]);
        setStatus("fallback");
      }
    } catch {
      setProducts([]);
      setStatus("fallback");
    }

    setSuggestions(getSuggestions(trimmed));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === "Enter") runSearch(query);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runSearch(activeIndex >= 0 ? suggestions[activeIndex].text : query);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={onKeyDown}
          placeholder="What do you want shipped? e.g. bathing soap"
          className="h-12 pl-9 pr-24 text-base"
        />
        <Button
          size="sm"
          className="absolute right-1.5 top-1/2 -translate-y-1/2"
          onClick={() => runSearch(query)}
        >
          Search
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute z-20 mt-1.5 w-full overflow-hidden py-1 shadow-lg">
          <CardContent className="p-0">
            {suggestions.map((s, i) => (
              <button
                key={s.text}
                onClick={() => runSearch(s.text)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                  i === activeIndex ? "bg-secondary" : "hover:bg-secondary/60"
                }`}
              >
                <TrendingUp className="size-3.5 shrink-0 text-primary" />
                <span>{s.text}</span>
                <Badge variant="secondary" className="ml-auto text-[10px]">
                  {s.source === "history" ? "your searches" : "popular"}
                </Badge>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {status === "loading" && (
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Finding products for &ldquo;{query}&rdquo;&hellip;
        </div>
      )}

      {status === "ok" && searchedFor && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-muted-foreground">
            Results for <span className="font-medium text-foreground">&ldquo;{searchedFor}&rdquo;</span>
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <a key={`${p.url}-${i}`} href={p.url} target="_blank" rel="noopener noreferrer nofollow">
                <Card className="h-full overflow-hidden transition-colors hover:border-primary/40">
                  <div className="aspect-square w-full overflow-hidden bg-secondary/40">
                    <img src={p.image} alt={p.title} className="size-full object-contain p-2" loading="lazy" />
                  </div>
                  <CardContent className="space-y-1.5 p-3">
                    <p className="line-clamp-2 text-sm font-medium leading-snug">{p.title}</p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base font-semibold">{p.price}</span>
                      <Badge variant="secondary" className="gap-1 text-[10px]">
                        {p.retailer} <ExternalLink className="size-3" />
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}

      {status === "fallback" && searchedFor && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-muted-foreground">
            Couldn&rsquo;t pull live product results right now — search directly on a retailer instead:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {RETAILERS.map((r) => (
              <a key={r.id} href={r.buildUrl(searchedFor)} target="_blank" rel="noopener noreferrer nofollow">
                <Card className="transition-colors hover:border-primary/40">
                  <CardContent className="flex items-center justify-between gap-3 p-4">
                    <div className="flex items-center gap-3">
                      <span className={`inline-block size-2.5 rounded-full ${r.color}`} />
                      <span className="font-medium">{r.label}</span>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      Search <ExternalLink className="size-3" />
                    </Badge>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}