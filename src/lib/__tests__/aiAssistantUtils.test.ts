import { describe, it, expect, vi, afterEach } from "vitest";
import {
  getResponse,
  sanitizeMessage,
  isRateLimited,
  registerMessage,
  ecoResponses,
  RATE_LIMIT,
  MAX_MESSAGE_LENGTH,
} from "@/lib/aiAssistantUtils";

describe("getResponse", () => {
  it.each([
    ["hello there", ecoResponses.hello],
    ["hi", ecoResponses.hello],
    ["hey!", ecoResponses.hello],
    ["what is my carbon footprint", ecoResponses.carbon],
    ["give me a tip", ecoResponses.tip],
    ["need advice", ecoResponses.tip],
    ["show me a challenge", ecoResponses.challenge],
    ["my streak", ecoResponses.streak],
    ["climate change", ecoResponses.climate],
    ["global warming", ecoResponses.climate],
    ["what reward can I get", ecoResponses.reward],
    ["earn a badge", ecoResponses.reward],
    ["plant based food", ecoResponses.food],
    ["i drive a car", ecoResponses.transport],
    ["save energy", ecoResponses.energy],
    ["shorter shower", ecoResponses.water],
  ])("maps %s to the right response", (input, expected) => {
    expect(getResponse(input)).toBe(expected);
  });

  it("is case-insensitive", () => {
    expect(getResponse("HELLO")).toBe(ecoResponses.hello);
    expect(getResponse("CaRbOn")).toBe(ecoResponses.carbon);
  });

  it("matches partial keywords inside larger words", () => {
    expect(getResponse("challenges")).toBe(ecoResponses.challenge);
  });

  it("prioritizes the earliest matching branch", () => {
    expect(getResponse("carbon tip")).toBe(ecoResponses.carbon);
  });

  it("falls back to the default response for unknown input", () => {
    expect(getResponse("xyzzy")).toBe(ecoResponses.default);
  });
});

describe("sanitizeMessage", () => {
  it("strips complete HTML tags including scripts", () => {
    expect(sanitizeMessage("<script>alert('xss')</script>")).toBe("alert('xss')");
  });

  it("removes self-contained tags entirely", () => {
    expect(sanitizeMessage("<img src=x onerror=alert(1)>")).toBe("");
  });

  it("removes inline tags but keeps text", () => {
    expect(sanitizeMessage("a<b>c</b>d")).toBe("acd");
  });

  it("strips stray angle brackets", () => {
    expect(sanitizeMessage("a < b")).toBe("a b");
  });

  it("collapses whitespace and trims", () => {
    expect(sanitizeMessage("  hello    world  ")).toBe("hello world");
  });

  it("returns empty string for whitespace-only input", () => {
    expect(sanitizeMessage("    ")).toBe("");
  });

  it("preserves emoji and unicode", () => {
    expect(sanitizeMessage("🌱 héllo 🌍")).toBe("🌱 héllo 🌍");
  });

  it("enforces the max length", () => {
    expect(sanitizeMessage("a".repeat(600))).toHaveLength(MAX_MESSAGE_LENGTH);
    expect(sanitizeMessage("a".repeat(600), 10)).toHaveLength(10);
  });
});

describe("isRateLimited", () => {
  it("is false below the limit", () => {
    const now = 1_000_000;
    const stamps = Array.from({ length: RATE_LIMIT.maxMessages - 1 }, () => now);
    expect(isRateLimited(stamps, now)).toBe(false);
  });

  it("is true at the limit within the window", () => {
    const now = 1_000_000;
    const stamps = Array.from({ length: RATE_LIMIT.maxMessages }, () => now);
    expect(isRateLimited(stamps, now)).toBe(true);
  });

  it("ignores timestamps outside the window", () => {
    const now = 1_000_000;
    const old = now - RATE_LIMIT.windowMs - 1;
    const stamps = Array.from({ length: RATE_LIMIT.maxMessages }, () => old);
    expect(isRateLimited(stamps, now)).toBe(false);
  });
});

describe("registerMessage", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows messages under the limit and records timestamps", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1));
    const result = registerMessage([]);
    expect(result.allowed).toBe(true);
    expect(result.timestamps).toHaveLength(1);
  });

  it("blocks once the window is saturated", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1));
    let stamps: number[] = [];
    for (let i = 0; i < RATE_LIMIT.maxMessages; i++) {
      const res = registerMessage(stamps);
      expect(res.allowed).toBe(true);
      stamps = res.timestamps;
    }
    const blocked = registerMessage(stamps);
    expect(blocked.allowed).toBe(false);
    expect(blocked.timestamps).toHaveLength(RATE_LIMIT.maxMessages);
  });

  it("frees up capacity after the window passes", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1));
    let stamps: number[] = [];
    for (let i = 0; i < RATE_LIMIT.maxMessages; i++) {
      stamps = registerMessage(stamps).timestamps;
    }
    expect(registerMessage(stamps).allowed).toBe(false);
    vi.advanceTimersByTime(RATE_LIMIT.windowMs + 1);
    expect(registerMessage(stamps).allowed).toBe(true);
  });
});
