import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChallengesSection from "@/components/ChallengesSection";

describe("ChallengesSection", () => {
  it("renders an accessible progressbar for every challenge", () => {
    render(<ChallengesSection />);
    const bars = screen.getAllByRole("progressbar");
    expect(bars).toHaveLength(6);
    for (const bar of bars) {
      expect(bar).toHaveAttribute("aria-valuenow");
      expect(bar).toHaveAttribute("aria-valuemin", "0");
      expect(bar).toHaveAttribute("aria-valuemax", "100");
    }
  });

  it("renders challenge titles", () => {
    render(<ChallengesSection />);
    expect(screen.getByText("Cycle to Work")).toBeInTheDocument();
    expect(screen.getByText("Zero Plastic Day")).toBeInTheDocument();
  });
});
