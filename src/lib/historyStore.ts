/**
 * LocalStorage-based calculation history persistence.
 *
 * Stores an array of `HistoryEntry` objects. Each entry captures the user's
 * inputs, computed result, and a timestamp so the dashboard can render trend
 * charts over 7/30/90-day windows.
 *
 * @module historyStore
 */

import { HISTORY_STORAGE_KEY, HISTORY_MAX_ENTRIES } from "./constants";
import type { CarbonInputs, CarbonResult } from "./carbonUtils";

// ─── Types ──────────────────────────────────────────────────────────────────

/** A single saved calculation. */
export interface HistoryEntry {
  /** ISO-8601 timestamp of the calculation. */
  timestamp: string;
  /** The inputs the user provided. */
  inputs: CarbonInputs;
  /** The computed result. */
  result: CarbonResult;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Safely parses the history array from localStorage.
 * Returns an empty array if the data is missing, corrupt, or not an array.
 */
function readRaw(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Basic shape validation: each entry must have timestamp, inputs, result
    return parsed.filter(
      (e: unknown) =>
        typeof e === "object" &&
        e !== null &&
        typeof (e as HistoryEntry).timestamp === "string" &&
        typeof (e as HistoryEntry).inputs === "object" &&
        typeof (e as HistoryEntry).result === "object"
    ) as HistoryEntry[];
  } catch {
    return [];
  }
}

/**
 * Writes the history array to localStorage, enforcing the max entry cap.
 */
function writeRaw(entries: HistoryEntry[]): void {
  if (typeof window === "undefined") return;
  const trimmed = entries.slice(-HISTORY_MAX_ENTRIES);
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Storage full or unavailable — silently degrade
  }
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Saves a new calculation to the history.
 *
 * @param inputs - The raw user inputs.
 * @param result - The computed carbon result.
 */
export function saveCalculation(
  inputs: CarbonInputs,
  result: CarbonResult
): void {
  const entries = readRaw();
  entries.push({
    timestamp: new Date().toISOString(),
    inputs,
    result,
  });
  writeRaw(entries);
}

/**
 * Returns the full calculation history, newest last.
 */
export function getHistory(): HistoryEntry[] {
  return readRaw();
}

/**
 * Returns history entries within the last `days` days.
 *
 * @param days - Number of days to look back (e.g. 7, 30, 90).
 * @returns    - Filtered entries, newest last.
 */
export function getHistoryForPeriod(days: number): HistoryEntry[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffISO = cutoff.toISOString();

  return readRaw().filter((e) => e.timestamp >= cutoffISO);
}

/**
 * Clears all history data from localStorage.
 */
export function clearHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch {
    // Silently degrade
  }
}
