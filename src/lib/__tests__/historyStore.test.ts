import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { saveCalculation, getHistory, getHistoryForPeriod, clearHistory } from "../historyStore";
import { DEFAULT_INPUTS, computeCarbonResult } from "../carbonUtils";

describe("historyStore", () => {
  beforeEach(() => {
    clearHistory();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns empty array initially", () => {
    expect(getHistory()).toEqual([]);
  });

  it("saves and retrieves a calculation", () => {
    const result = computeCarbonResult(DEFAULT_INPUTS);
    saveCalculation(DEFAULT_INPUTS, result);
    
    const history = getHistory();
    expect(history).toHaveLength(1);
    expect(history[0].inputs).toEqual(DEFAULT_INPUTS);
    expect(history[0].result).toEqual(result);
    expect(typeof history[0].timestamp).toBe("string");
  });

  it("filters history by period", () => {
    const result = computeCarbonResult(DEFAULT_INPUTS);
    
    // Save one now
    const now = new Date("2025-01-15T12:00:00Z");
    vi.setSystemTime(now);
    saveCalculation(DEFAULT_INPUTS, result);
    
    // Save one 10 days ago
    const past = new Date("2025-01-05T12:00:00Z");
    vi.setSystemTime(past);
    saveCalculation(DEFAULT_INPUTS, result);

    // Reset to now
    vi.setSystemTime(now);
    
    // 7 days lookback should only see the 'now' one
    const weekHistory = getHistoryForPeriod(7);
    expect(weekHistory).toHaveLength(1);

    // 30 days lookback should see both
    const monthHistory = getHistoryForPeriod(30);
    expect(monthHistory).toHaveLength(2);
  });

  it("clears history", () => {
    const result = computeCarbonResult(DEFAULT_INPUTS);
    saveCalculation(DEFAULT_INPUTS, result);
    expect(getHistory()).toHaveLength(1);
    
    clearHistory();
    expect(getHistory()).toHaveLength(0);
  });
});
