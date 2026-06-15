import { describe, it, expect } from "vitest";
import {
  calculateCarbon,
  computeScore,
  getTips,
  CARBON_FACTORS,
  DEFAULT_INPUTS,
  GLOBAL_AVG_YEARLY_KG,
  MAX_YEARLY_KG,
} from "@/lib/carbonUtils";

describe("calculateCarbon", () => {
  it("returns 0 when every input is zero", () => {
    expect(
      calculateCarbon({ transport: 0, electricity: 0, water: 0, food: 0, shopping: 0, digital: 0 }),
    ).toBe(0);
  });

  it("falls back to default inputs for missing keys", () => {
    expect(calculateCarbon({})).toBeCloseTo(414.48, 2);
  });

  it("applies the published coefficients", () => {
    const result = calculateCarbon({
      transport: 100,
      electricity: 250,
      water: 150,
      food: 7,
      shopping: 5,
      digital: 6,
    });
    const expected =
      100 * CARBON_FACTORS.transport +
      250 * CARBON_FACTORS.electricity +
      150 * CARBON_FACTORS.water +
      7 * CARBON_FACTORS.food +
      5 * CARBON_FACTORS.shopping +
      6 * CARBON_FACTORS.digital;
    expect(result).toBeCloseTo(expected, 6);
  });

  it("computes the maximum-input footprint", () => {
    const result = calculateCarbon({
      transport: 500,
      electricity: 1000,
      water: 500,
      food: 21,
      shopping: 20,
      digital: 24,
    });
    expect(result).toBeCloseTo(1574.92, 2);
  });

  it("does not treat an explicit zero as missing", () => {
    const withZeroTransport = calculateCarbon({ ...DEFAULT_INPUTS, transport: 0 });
    const withDefaultTransport = calculateCarbon(DEFAULT_INPUTS);
    expect(withDefaultTransport - withZeroTransport).toBeCloseTo(
      DEFAULT_INPUTS.transport * CARBON_FACTORS.transport,
      6,
    );
  });
});

describe("computeScore", () => {
  it("returns 100 for a zero footprint", () => {
    expect(computeScore(0)).toBe(100);
  });

  it("returns 0 once the footprint reaches the modeled max", () => {
    expect(computeScore(MAX_YEARLY_KG)).toBe(0);
  });

  it("clamps below zero for extreme footprints", () => {
    expect(computeScore(MAX_YEARLY_KG * 3)).toBe(0);
  });

  it("clamps above 100 for impossible negative footprints", () => {
    expect(computeScore(-5000)).toBe(100);
  });

  it("computes the default-input score", () => {
    const yearly = calculateCarbon(DEFAULT_INPUTS) * 12;
    expect(computeScore(yearly)).toBe(75);
  });
});

describe("getTips", () => {
  it("always recommends planting trees and caps at three tips", () => {
    const tips = getTips(DEFAULT_INPUTS, 3000);
    expect(tips.length).toBeGreaterThanOrEqual(1);
    expect(tips.length).toBeLessThanOrEqual(3);
    expect(tips).toContain("Plant 10 trees to offset your remaining footprint");
  });

  it("returns the highest-priority tips first for a heavy footprint", () => {
    const heavy = { transport: 400, electricity: 600, water: 300, food: 18, shopping: 15, digital: 12 };
    const tips = getTips(heavy, 9000);
    expect(tips).toHaveLength(3);
    expect(tips[0]).toMatch(/public transport/i);
  });

  it("omits category tips that are below threshold", () => {
    const tips = getTips(DEFAULT_INPUTS, 1000);
    expect(tips).not.toContain("Reduce meat intake by 3 meals/week — saves 0.5 ton CO₂/year");
  });
});

describe("constants", () => {
  it("exposes a sane global average", () => {
    expect(GLOBAL_AVG_YEARLY_KG).toBe(4000);
  });
});
