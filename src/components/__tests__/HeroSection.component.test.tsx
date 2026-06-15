import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/HeroSection";

describe("HeroSection", () => {
  it("exposes the animated globe as a labelled image", () => {
    render(<HeroSection />);
    expect(screen.getByRole("img", { name: /globe of earth/i })).toBeInTheDocument();
  });

  it("renders the headline and primary CTA", () => {
    render(<HeroSection />);
    expect(screen.getByText("Compete.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /join challenge/i })).toHaveAttribute("href", "/challenges");
  });
});
