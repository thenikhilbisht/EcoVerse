import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import Navbar from "@/components/Navbar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar", () => {
  it("marks the More dropdown as an accessible popup", () => {
    render(<Navbar />);
    const moreBtn = screen.getByRole("button", { name: /more/i });
    expect(moreBtn).toHaveAttribute("aria-haspopup", "true");
    expect(moreBtn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(moreBtn);
    expect(moreBtn).toHaveAttribute("aria-expanded", "true");
  });

  it("opens the mobile menu and closes it on Escape", async () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: /toggle menu/i }));
    expect(screen.getByRole("progressbar", { name: /level progress/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    await waitForElementToBeRemoved(() =>
      screen.queryByRole("progressbar", { name: /level progress/i }),
    );
  });
});
