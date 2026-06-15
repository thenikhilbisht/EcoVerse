import { describe, it, expect } from "vitest";
import { clamp, formatNumber, isValidEmail, percentage } from "@/lib/utils";

describe("clamp", () => {
  it("returns the value when within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("clamps to the minimum", () => {
    expect(clamp(-3, 0, 10)).toBe(0);
  });

  it("clamps to the maximum", () => {
    expect(clamp(42, 0, 10)).toBe(10);
  });
});

describe("formatNumber", () => {
  it("adds thousands separators", () => {
    expect(formatNumber(1234567)).toBe("1,234,567");
  });

  it("leaves small numbers unchanged", () => {
    expect(formatNumber(42)).toBe("42");
  });
});

describe("isValidEmail", () => {
  it.each(["a@b.co", "user.name@example.com", "x+tag@sub.domain.org"])(
    "accepts %s",
    (email) => {
      expect(isValidEmail(email)).toBe(true);
    },
  );

  it.each(["", "no-at-sign", "missing@domain", "@nolocal.com", "spaces in@email.com", "trailing@dot."])(
    "rejects %s",
    (email) => {
      expect(isValidEmail(email)).toBe(false);
    },
  );

  it("trims surrounding whitespace before validating", () => {
    expect(isValidEmail("  user@example.com  ")).toBe(true);
  });
});

describe("percentage", () => {
  it("computes a basic percentage", () => {
    expect(percentage(25, 100)).toBe(25);
  });

  it("returns 0 when the total is 0", () => {
    expect(percentage(5, 0)).toBe(0);
  });

  it("clamps to 100", () => {
    expect(percentage(150, 100)).toBe(100);
  });

  it("clamps to 0 for negatives", () => {
    expect(percentage(-5, 100)).toBe(0);
  });
});
