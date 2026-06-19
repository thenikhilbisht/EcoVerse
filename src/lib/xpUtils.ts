/**
 * XP, level, and rank calculation utilities.
 *
 * All functions are pure — no side effects, no framework dependencies.
 * Uses the rank definitions from `constants.ts`.
 *
 * @module xpUtils
 */

import { RANKS, type RankInfo } from "./constants";

// ─── Types ──────────────────────────────────────────────────────────────────

/** Information about a user's current level. */
export interface LevelInfo {
  /** Current level number (1-based). */
  level: number;
  /** XP already earned toward the next level. */
  xpInLevel: number;
  /** Total XP required to advance from current level to the next. */
  xpForLevel: number;
  /** Progress toward next level as a percentage (0–100). */
  progressPercent: number;
}

// ─── Constants ──────────────────────────────────────────────────────────────

/**
 * XP required for each successive level follows a quadratic curve:
 * `XP_PER_LEVEL_BASE * level²`. This keeps early levels quick while
 * making higher levels progressively harder.
 */
const XP_PER_LEVEL_BASE = 100;

// ─── Functions ──────────────────────────────────────────────────────────────

/**
 * Calculates the total XP required to reach a given level from zero.
 *
 * @param level - The target level (1-based).
 * @returns     - Cumulative XP needed. Level 1 requires 0 XP.
 *
 * @example
 * ```ts
 * xpForLevel(1); // 0
 * xpForLevel(2); // 100
 * xpForLevel(5); // 1000
 * ```
 */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += XP_PER_LEVEL_BASE * i;
  }
  return total;
}

/**
 * Derives the user's current level and progress from their total XP.
 *
 * @param totalXP - The user's accumulated XP (must be ≥ 0).
 * @returns       - Level info including progress toward the next level.
 *
 * @example
 * ```ts
 * calculateLevel(0);    // { level: 1, xpInLevel: 0, xpForLevel: 100, progressPercent: 0 }
 * calculateLevel(250);  // { level: 3, xpInLevel: 150, xpForLevel: 300, progressPercent: 50 }
 * ```
 */
export function calculateLevel(totalXP: number): LevelInfo {
  const xp = Math.max(0, totalXP);
  let level = 1;

  while (xpForLevel(level + 1) <= xp) {
    level++;
  }

  const currentLevelXP = xpForLevel(level);
  const nextLevelXP = xpForLevel(level + 1);
  const xpInLevel = xp - currentLevelXP;
  const xpForThisLevel = nextLevelXP - currentLevelXP;
  const progressPercent =
    xpForThisLevel > 0 ? Math.round((xpInLevel / xpForThisLevel) * 100) : 100;

  return { level, xpInLevel, xpForLevel: xpForThisLevel, progressPercent };
}

/**
 * Returns the XP remaining until the next level.
 *
 * @param totalXP - Current accumulated XP.
 * @returns       - XP remaining. Always ≥ 0.
 */
export function xpToNextLevel(totalXP: number): number {
  const { xpForLevel: needed, xpInLevel } = calculateLevel(totalXP);
  return Math.max(0, needed - xpInLevel);
}

/**
 * Looks up the rank corresponding to a given XP total.
 *
 * Ranks are defined in `constants.ts` and ordered from lowest to highest.
 * The highest rank whose `minXP` is ≤ the user's XP is returned.
 *
 * @param totalXP - Current accumulated XP.
 * @returns       - The matching rank info.
 */
export function getRankForXP(totalXP: number): RankInfo {
  const xp = Math.max(0, totalXP);
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXP) rank = r;
  }
  return rank;
}
