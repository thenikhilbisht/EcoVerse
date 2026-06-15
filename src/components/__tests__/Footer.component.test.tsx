import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("rejects an invalid newsletter email", () => {
    render(<Footer />);
    fireEvent.change(screen.getByLabelText("Email for newsletter"), {
      target: { value: "not-an-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));

    const input = screen.getByLabelText("Email for newsletter");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent(/valid email/i);
  });

  it("accepts a valid newsletter email and clears the field", () => {
    render(<Footer />);
    const input = screen.getByLabelText("Email for newsletter") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "warrior@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/thanks for subscribing/i);
    expect(input.value).toBe("");
  });

  it("hardens external social links with rel=noopener noreferrer", () => {
    render(<Footer />);
    for (const label of ["GitHub", "Twitter", "LinkedIn", "Instagram"]) {
      expect(screen.getByLabelText(label)).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
