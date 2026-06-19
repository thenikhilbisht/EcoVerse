import { describe, it, expect } from "vitest";
import { getResponse, sanitizeMessage, ecoResponses } from "../aiAssistantUtils";

// ─── sanitizeMessage ──────────────────────────────────────────────────────────

describe("sanitizeMessage", () => {
  it("trims leading and trailing whitespace", () => {
    expect(sanitizeMessage("  hello  ")).toBe("hello");
  });

  it("collapses multiple spaces into one", () => {
    expect(sanitizeMessage("too   many   spaces")).toBe("too many spaces");
  });

  it("strips < and > to prevent HTML injection", () => {
    expect(sanitizeMessage("<script>alert(1)</script> hello")).toBe(
      "scriptalert(1)/script hello"
    );
    // Both < and > characters are stripped
    expect(sanitizeMessage("<b>bold</b>")).toBe("bbold/b");
  });

  it("strips < angle brackets entirely", () => {
    expect(sanitizeMessage("<hello>")).toBe("hello");
  });

  it("handles empty string", () => {
    expect(sanitizeMessage("")).toBe("");
  });

  it("handles whitespace-only string", () => {
    expect(sanitizeMessage("   ")).toBe("");
  });

  it("enforces 280 character limit", () => {
    const long = "a".repeat(400);
    expect(sanitizeMessage(long)).toHaveLength(280);
  });

  it("preserves emoji and unicode characters", () => {
    expect(sanitizeMessage("Hello 🌱 World")).toBe("Hello 🌱 World");
  });

  it("handles already safe input unchanged", () => {
    expect(sanitizeMessage("How can I reduce my carbon footprint?")).toBe(
      "How can I reduce my carbon footprint?"
    );
  });

  it("handles newlines as whitespace", () => {
    expect(sanitizeMessage("hello\nworld")).toBe("hello world");
  });
});

// ─── getResponse routing ──────────────────────────────────────────────────────

describe("getResponse — keyword routing", () => {
  it("returns greeting for 'hello'", () => {
    expect(getResponse("hello")).toBe(ecoResponses.hello);
  });

  it("returns greeting for 'hi'", () => {
    expect(getResponse("hi there")).toBe(ecoResponses.hello);
  });

  it("returns greeting for 'hey'", () => {
    expect(getResponse("Hey EcoBot!")).toBe(ecoResponses.hello);
  });

  it("returns carbon response for 'carbon'", () => {
    expect(getResponse("Tell me about carbon")).toBe(ecoResponses.carbon);
  });

  it("returns carbon response for 'footprint'", () => {
    expect(getResponse("How do I reduce my carbon footprint?")).toBe(ecoResponses.carbon);
  });

  it("returns tip response for 'tip'", () => {
    expect(getResponse("Give me a tip")).toBe(ecoResponses.tip);
  });

  it("returns tip response for 'advice'", () => {
    expect(getResponse("Any advice for green living?")).toBe(ecoResponses.tip);
  });

  it("returns tip response for 'suggest'", () => {
    expect(getResponse("Can you suggest something?")).toBe(ecoResponses.tip);
  });

  it("returns challenge response for 'challenge'", () => {
    expect(getResponse("What challenge should I do today?")).toBe(ecoResponses.challenge);
  });

  it("returns streak response for 'streak'", () => {
    expect(getResponse("How do I keep my streak?")).toBe(ecoResponses.streak);
  });

  it("returns climate response for 'climate'", () => {
    expect(getResponse("Tell me about climate change")).toBe(ecoResponses.climate);
  });

  it("returns climate response for 'global warming'", () => {
    expect(getResponse("What is global warming?")).toBe(ecoResponses.climate);
  });

  it("returns climate response for 'greenhouse'", () => {
    expect(getResponse("greenhouse gas emissions")).toBe(ecoResponses.climate);
  });

  it("returns reward response for 'reward'", () => {
    expect(getResponse("How do I earn rewards?")).toBe(ecoResponses.reward);
  });

  it("returns reward response for 'coin'", () => {
    expect(getResponse("Tell me about eco coins")).toBe(ecoResponses.reward);
  });

  it("returns reward response for 'badge'", () => {
    expect(getResponse("How do I get a badge?")).toBe(ecoResponses.reward);
  });

  it("returns reward response for 'xp'", () => {
    expect(getResponse("How do I earn more XP?")).toBe(ecoResponses.reward);
  });

  it("returns food response for 'food'", () => {
    expect(getResponse("What food should I eat?")).toBe(ecoResponses.food);
  });

  it("returns food response for 'plant'", () => {
    expect(getResponse("I want to eat more plant-based food")).toBe(ecoResponses.food);
  });

  it("returns food response for 'meat'", () => {
    expect(getResponse("I eat a lot of meat")).toBe(ecoResponses.food);
  });

  it("returns food response for 'vegan'", () => {
    expect(getResponse("What are vegan options?")).toBe(ecoResponses.food);
  });

  it("returns transport response for 'transport'", () => {
    expect(getResponse("Best transport options?")).toBe(ecoResponses.transport);
  });

  it("returns transport response for 'car'", () => {
    expect(getResponse("Should I drive my car?")).toBe(ecoResponses.transport);
  });

  it("returns transport response for 'drive'", () => {
    expect(getResponse("I drive to work every day")).toBe(ecoResponses.transport);
  });

  it("returns transport response for 'flight'", () => {
    expect(getResponse("I took a flight last week")).toBe(ecoResponses.transport);
  });

  it("returns water response for 'water'", () => {
    expect(getResponse("How can I save water?")).toBe(ecoResponses.water);
  });

  it("returns water response for 'shower'", () => {
    expect(getResponse("How long should my shower be?")).toBe(ecoResponses.water);
  });

  it("returns energy response for 'energy'", () => {
    expect(getResponse("How can I save energy?")).toBe(ecoResponses.energy);
  });

  it("returns energy response for 'electric'", () => {
    expect(getResponse("I have a high electricity bill")).toBe(ecoResponses.energy);
  });

  it("returns shopping response for 'shop'", () => {
    expect(getResponse("I love to shop for clothes")).toBe(ecoResponses.shopping);
  });

  it("returns shopping response for 'fashion'", () => {
    expect(getResponse("fast fashion impact?")).toBe(ecoResponses.shopping);
  });

  it("returns default for unknown topics", () => {
    expect(getResponse("What is the weather today?")).toBe(ecoResponses.default);
  });

  it("returns default for empty-ish input", () => {
    expect(getResponse("   ")).toBe(ecoResponses.default);
  });

  it("is case-insensitive", () => {
    expect(getResponse("CARBON FOOTPRINT")).toBe(ecoResponses.carbon);
    expect(getResponse("Hello World")).toBe(ecoResponses.hello);
  });

  it("all response values are non-empty strings", () => {
    Object.values(ecoResponses).forEach((resp) => {
      expect(typeof resp).toBe("string");
      expect(resp.length).toBeGreaterThan(0);
    });
  });
});
