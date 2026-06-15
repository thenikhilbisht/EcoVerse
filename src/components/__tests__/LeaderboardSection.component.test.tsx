import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LeaderboardSection from "@/components/LeaderboardSection";

describe("LeaderboardSection", () => {
  it("renders ranked eco-warriors", () => {
    render(<LeaderboardSection />);
    // Podium shows first names only; the table rows show full names.
    expect(screen.getByText("Arjun")).toBeInTheDocument();
    expect(screen.getByText(/Yuki Tanaka/)).toBeInTheDocument();
  });

  it("renders the rank tiers", () => {
    render(<LeaderboardSection />);
    expect(screen.getByText("Carbon Master")).toBeInTheDocument();
    expect(screen.getByText("Green Beginner")).toBeInTheDocument();
  });
});
