import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CarbonCalculator from "@/components/CarbonCalculator";

describe("CarbonCalculator", () => {
  it("renders the input form with a slider per category", () => {
    render(<CarbonCalculator />);
    expect(screen.getByText("Your Lifestyle Data")).toBeInTheDocument();
    expect(screen.getAllByRole("slider")).toHaveLength(6);
  });

  it("gates the results behind the Calculate button", () => {
    render(<CarbonCalculator />);
    expect(screen.getByText("See Your Carbon Score")).toBeInTheDocument();
    expect(screen.queryByText("Monthly Emissions")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /calculate my carbon score/i }));

    expect(screen.queryByText("See Your Carbon Score")).not.toBeInTheDocument();
    expect(screen.getByText("Monthly Emissions")).toBeInTheDocument();
    expect(screen.getByText("AI Recommendations")).toBeInTheDocument();
  });

  it("exposes the score as an accessible progressbar after calculating", () => {
    render(<CarbonCalculator />);
    fireEvent.click(screen.getByRole("button", { name: /calculate my carbon score/i }));
    const progressbar = screen.getByRole("progressbar", { name: /carbon score/i });
    expect(progressbar).toHaveAttribute("aria-valuenow", "75");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
  });

  it("updates the displayed value when a slider moves", () => {
    render(<CarbonCalculator />);
    const slider = screen.getByLabelText("Transport") as HTMLInputElement;
    fireEvent.change(slider, { target: { value: "300" } });
    expect(slider.value).toBe("300");
    // The numeric read-out next to the label reflects the new value.
    expect(screen.getByText("300 km")).toBeInTheDocument();
  });

  it("recomputes the score when inputs change before calculating", () => {
    render(<CarbonCalculator />);
    const slider = screen.getByLabelText("Transport") as HTMLInputElement;
    fireEvent.change(slider, { target: { value: "0" } });
    fireEvent.change(screen.getByLabelText("Electricity") as HTMLInputElement, { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: /calculate my carbon score/i }));
    const progressbar = screen.getByRole("progressbar", { name: /carbon score/i });
    // Lower inputs yield a higher score than the default of 75.
    expect(Number(progressbar.getAttribute("aria-valuenow"))).toBeGreaterThan(75);
  });
});
