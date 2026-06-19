/**
 * Input validation and sanitisation utilities.
 *
 * Used on the client side for defence-in-depth. React auto-escapes JSX output,
 * so these helpers provide an extra layer for edge-cases (e.g. localStorage data,
 * user-entered chat messages).
 *
 * @module validation
 */

import { SLIDER_CONFIGS, type CategoryId } from "./constants";
import type { CarbonInputs } from "./carbonUtils";

// ─── Carbon Input Validation ────────────────────────────────────────────────

/**
 * Validates and clamps a raw carbon inputs object.
 *
 * Each field is verified to be a finite number within the allowed slider range
 * (0 to max). Out-of-range values are clamped. Missing or non-numeric fields
 * are replaced with 0.
 *
 * @param raw  - Unknown object to validate.
 * @returns    - A valid `CarbonInputs` object, or `null` if `raw` is not an
 *               object at all.
 *
 * @example
 * ```ts
 * validateCarbonInputs({ transport: 999, electricity: -5 });
 * // → { transport: 500, electricity: 0, water: 0, food: 0, shopping: 0, digital: 0 }
 * ```
 */
export function validateCarbonInputs(
  raw: unknown
): CarbonInputs | null {
  if (typeof raw !== "object" || raw === null) return null;

  const obj = raw as Record<string, unknown>;
  const result: Record<string, number> = {};

  for (const config of SLIDER_CONFIGS) {
    const value = obj[config.id];
    if (typeof value === "number" && Number.isFinite(value)) {
      result[config.id] = Math.max(0, Math.min(config.max, Math.round(value)));
    } else {
      result[config.id] = 0;
    }
  }

  return result as unknown as CarbonInputs;
}

/**
 * Clamps a single slider value to [0, max] for the given category.
 *
 * @param categoryId - The category to look up the max for.
 * @param value      - The raw numeric value.
 * @returns          - Clamped integer value.
 */
export function clampSliderValue(categoryId: CategoryId, value: number): number {
  const config = SLIDER_CONFIGS.find((c) => c.id === categoryId);
  if (!config) return 0;
  return Math.max(0, Math.min(config.max, Math.round(value)));
}

// ─── Text Sanitisation ──────────────────────────────────────────────────────

/**
 * Sanitises raw user text input for safe processing.
 *
 * Strips HTML tag delimiters (`<` and `>`), collapses whitespace, trims, and
 * enforces a maximum length. React already escapes output during rendering,
 * so this provides defence-in-depth.
 *
 * @param raw    - The raw string to sanitise.
 * @param maxLen - Maximum allowed length (default 280).
 * @returns      - Cleaned string, possibly empty.
 */
export function sanitizeTextInput(raw: string, maxLen = 280): string {
  return raw
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

// ─── Email Validation ───────────────────────────────────────────────────────

/**
 * Basic email format validation.
 *
 * Checks for a reasonable structure (local@domain.tld). Does not guarantee
 * deliverability — that requires server-side verification.
 *
 * @param email - The email string to validate.
 * @returns     - `true` if the format is acceptable.
 */
export function validateEmail(email: string): boolean {
  if (!email || email.length > 320) return false;
  // Intentionally simple regex — avoids pathological backtracking
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return pattern.test(email);
}
