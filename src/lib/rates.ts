/**
 * Shared rate structure. The /calculator page and the /rates page BOTH read
 * from this file so the numbers always agree.
 *
 * TODO: SAMPLE DATA — replace every number below with confirmed MoveDot
 * pricing. The WEIGHT_RATE_TABLE below is placeholder/random data and
 * should be swapped for real per-lb JMD rates before launch.
 *
 * MoveDot is air-only — sea/barrel freight has been removed from the
 * calculator. Barrel/sea requests are now handled as a separate
 * "purchase assistance" service, not priced here.
 */

export const ORIGINS = [
  { id: "mia", label: "Miami, FL", surcharge: 0 },
  { id: "fll", label: "Fort Lauderdale, FL", surcharge: 0 },
  { id: "nynj", label: "New York / New Jersey", surcharge: 1800 }, // TODO: confirm JMD surcharge
] as const;

export const PARISHES = [
  "Kingston",
  "St. Andrew",
  "St. Thomas",
  "Portland",
  "St. Mary",
  "St. Ann",
  "Trelawny",
  "St. James",
  "Hanover",
  "Westmoreland",
  "St. Elizabeth",
  "Manchester",
  "Clarendon",
  "St. Catherine",
] as const;

/** Parishes with a MoveDot pickup hub — everything else is an outer-parish handoff. */
export const HUB_PARISHES = ["Kingston", "St. Andrew", "St. James", "St. Catherine"];
export const OUTER_PARISH_FEE = 1200; // JMD placeholder. TODO: confirm.

/**
 * TODO: SAMPLE / RANDOM DATA — replace with confirmed rates.
 * Index 0 = 1 lb, index 49 = 50 lb. Weights are billed rounded up to the
 * next whole lb. Weights above 50 lb extrapolate from the last two rows
 * until a real rate table extends further.
 */
export const WEIGHT_RATE_TABLE: number[] = [
  700, 1050, 1400, 1750, 2100, 2450, 2750, 3100, 3450, 3800, 4150, 4500, 4850, 5200, 5550, 5900,
  6250, 6600, 6950, 7300, 7650, 8000, 8350, 8700, 9050, 9400, 9750, 10100, 10450, 10800, 11150,
  11500, 11850, 12200, 12550, 12900, 13250, 13600, 13950, 14300, 14650, 15000, 15350, 15700, 16050,
  16400, 16750, 17100, 17450, 17800,
];

export const CARGO_TYPES = [
  { id: "box", label: "Standard box", multiplier: 1 },
  { id: "pallet", label: "Pallet", multiplier: 1.25 },
  { id: "commercial", label: "Commercial / wholesale", multiplier: 1.15 },
] as const;

export const TRANSIT = "As fast as 24 hours, door to door";

/** Looks up (or extrapolates past the table) the base JMD rate for a given weight. */
function baseRateForWeight(weightLb: number): number {
  const billed = Math.max(1, Math.ceil(weightLb));
  if (billed <= WEIGHT_RATE_TABLE.length) {
    return WEIGHT_RATE_TABLE[billed - 1];
  }
  // Beyond the table: extend using the marginal rate implied by the last two rows.
  const last = WEIGHT_RATE_TABLE[WEIGHT_RATE_TABLE.length - 1];
  const secondLast = WEIGHT_RATE_TABLE[WEIGHT_RATE_TABLE.length - 2];
  const marginalRate = last - secondLast;
  return last + (billed - WEIGHT_RATE_TABLE.length) * marginalRate;
}

export function quote(opts: { weight: number; originId: string; parish: string; cargoId: string }) {
  const billedWeight = Math.max(1, Math.ceil(opts.weight));
  const freight = baseRateForWeight(opts.weight);
  const cargo = CARGO_TYPES.find((c) => c.id === opts.cargoId)?.multiplier ?? 1;
  const origin = ORIGINS.find((o) => o.id === opts.originId)?.surcharge ?? 0;
  const outer = HUB_PARISHES.includes(opts.parish) ? 0 : OUTER_PARISH_FEE;
  const total = freight * cargo + origin + outer;

  return {
    billedWeight,
    freight,
    cargoMultiplier: cargo,
    originSurcharge: origin,
    outerParishFee: outer,
    total: Math.round(total),
    transit: TRANSIT,
  };
}