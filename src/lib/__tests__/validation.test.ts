import { describe, it, expect } from "vitest";
import { validateCarbonInputs, sanitizeTextInput, validateEmail } from "../validation";
import { DEFAULT_INPUTS } from "../carbonUtils";

describe("validation utils", () => {
  describe("validateCarbonInputs", () => {
    it("returns default-like zeros if passed null or undefined", () => {
      expect(validateCarbonInputs(null)).toBeNull();
      expect(validateCarbonInputs(undefined)).toBeNull();
    });

    it("clamps out of bounds values", () => {
      const bad = { transport: -100, electricity: 5000, water: "not a number", food: NaN, shopping: 5, digital: 6 };
      const valid = validateCarbonInputs(bad);
      
      expect(valid).not.toBeNull();
      if (valid) {
        expect(valid.transport).toBe(0); // Clamped from < 0
        expect(valid.electricity).toBe(1000); // Clamped from > 1000
        expect(valid.water).toBe(0); // Replaced non-number
        expect(valid.food).toBe(0); // Replaced NaN
        expect(valid.shopping).toBe(5); // Passed
      }
    });

    it("passes valid inputs unchanged (except for rounding if float)", () => {
      const ok = { ...DEFAULT_INPUTS, transport: 100.5 };
      const valid = validateCarbonInputs(ok);
      expect(valid?.transport).toBe(101); // rounded
    });
  });

  describe("sanitizeTextInput", () => {
    it("removes HTML brackets", () => {
      expect(sanitizeTextInput("Hello <script>alert(1)</script> World")).toBe("Hello scriptalert(1)/script World");
    });

    it("collapses whitespace", () => {
      expect(sanitizeTextInput("  Hello \n  World  ")).toBe("Hello World");
    });

    it("enforces max length", () => {
      const long = "a".repeat(300);
      expect(sanitizeTextInput(long, 50)).toHaveLength(50);
    });
  });

  describe("validateEmail", () => {
    it("accepts valid email", () => {
      expect(validateEmail("user@example.com")).toBe(true);
      expect(validateEmail("first.last+tag@sub.domain.co.uk")).toBe(true);
    });

    it("rejects invalid email", () => {
      expect(validateEmail("invalid")).toBe(false);
      expect(validateEmail("user@.com")).toBe(false);
      expect(validateEmail("@example.com")).toBe(false);
      expect(validateEmail("")).toBe(false);
    });
  });
});
