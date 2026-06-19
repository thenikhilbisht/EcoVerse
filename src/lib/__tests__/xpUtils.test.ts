import { describe, it, expect } from "vitest";
import { xpForLevel, calculateLevel, xpToNextLevel, getRankForXP } from "../xpUtils";
import { RANKS } from "../constants";

describe("xpUtils", () => {
  describe("xpForLevel", () => {
    it("returns 0 for level 1", () => {
      expect(xpForLevel(1)).toBe(0);
    });

    it("returns 100 for level 2", () => {
      expect(xpForLevel(2)).toBe(100);
    });

    it("returns 300 for level 3", () => {
      // Level 1=0, 2=100, 3=100+200=300
      expect(xpForLevel(3)).toBe(300);
    });
  });

  describe("calculateLevel", () => {
    it("returns level 1 and correct progress for 0 XP", () => {
      const info = calculateLevel(0);
      expect(info.level).toBe(1);
      expect(info.xpInLevel).toBe(0);
      expect(info.xpForLevel).toBe(100); // 100 to get to level 2
      expect(info.progressPercent).toBe(0);
    });

    it("returns level 2 for exactly 100 XP", () => {
      const info = calculateLevel(100);
      expect(info.level).toBe(2);
      expect(info.xpInLevel).toBe(0);
      expect(info.xpForLevel).toBe(200); // 200 to get to level 3
      expect(info.progressPercent).toBe(0);
    });

    it("calculates progress correctly mid-level", () => {
      const info = calculateLevel(150); // Level 2 needs 100. So in level 2, has 50 XP towards level 3 (needs 200 total)
      expect(info.level).toBe(2);
      expect(info.xpInLevel).toBe(50);
      expect(info.xpForLevel).toBe(200);
      expect(info.progressPercent).toBe(25); // 50 / 200
    });
  });

  describe("xpToNextLevel", () => {
    it("returns correct remainder", () => {
      expect(xpToNextLevel(0)).toBe(100);
      expect(xpToNextLevel(99)).toBe(1);
      expect(xpToNextLevel(100)).toBe(200);
    });
  });

  describe("getRankForXP", () => {
    it("returns lowest rank for 0 XP", () => {
      const rank = getRankForXP(0);
      expect(rank.name).toBe(RANKS[0].name);
    });

    it("returns highest rank if XP exceeds max rank boundary", () => {
      const rank = getRankForXP(1000000);
      expect(rank.name).toBe(RANKS[RANKS.length - 1].name);
    });

    it("returns correct mid-tier rank", () => {
      const rankInfo = RANKS[2];
      const rank = getRankForXP(rankInfo.minXP + 50);
      expect(rank.name).toBe(rankInfo.name);
    });
  });
});
