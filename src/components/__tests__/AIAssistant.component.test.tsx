import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import AIAssistant from "@/components/AIAssistant";
import { ecoResponses } from "@/lib/aiAssistantUtils";

async function flushTyping() {
  // The assistant waits up to ~1.8s before replying.
  await act(async () => {
    await vi.advanceTimersByTimeAsync(2000);
  });
}

describe("AIAssistant", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("opens the chat panel from the floating button", () => {
    render(<AIAssistant />);
    fireEvent.click(screen.getByRole("button", { name: /open ecobot assistant/i }));
    expect(screen.getByText("EcoBot Assistant")).toBeInTheDocument();
    expect(screen.getByLabelText("Chat input")).toBeInTheDocument();
  });

  it("does not advertise itself as AI in the header", () => {
    render(<AIAssistant />);
    fireEvent.click(screen.getByRole("button", { name: /open ecobot assistant/i }));
    expect(screen.queryByText("EcoBot AI")).not.toBeInTheDocument();
  });

  it("echoes the user message and replies with a keyword response", async () => {
    vi.useFakeTimers();
    render(<AIAssistant />);
    fireEvent.click(screen.getByRole("button", { name: /open ecobot assistant/i }));
    const input = screen.getByLabelText("Chat input");
    fireEvent.change(input, { target: { value: "hello" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await flushTyping();

    expect(screen.getByText(ecoResponses.hello)).toBeInTheDocument();
  });

  it("sanitizes HTML out of the rendered user message", async () => {
    vi.useFakeTimers();
    render(<AIAssistant />);
    fireEvent.click(screen.getByRole("button", { name: /open ecobot assistant/i }));
    const input = screen.getByLabelText("Chat input");
    fireEvent.change(input, { target: { value: "<script>alert('x')</script>hi there" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await flushTyping();

    expect(screen.getByText("alert('x')hi there")).toBeInTheDocument();
    expect(screen.queryByText(/<script>/)).not.toBeInTheDocument();
  });

  it("warns when the user exceeds the rate limit", async () => {
    vi.useFakeTimers();
    render(<AIAssistant />);
    fireEvent.click(screen.getByRole("button", { name: /open ecobot assistant/i }));
    const input = screen.getByLabelText("Chat input");
    const sendBtn = screen.getByRole("button", { name: /send message/i });

    for (let i = 0; i < 8; i++) {
      fireEvent.change(input, { target: { value: `message ${i}` } });
      fireEvent.click(sendBtn);
      await flushTyping();
    }

    fireEvent.change(input, { target: { value: "one too many" } });
    fireEvent.click(sendBtn);

    expect(screen.getByRole("alert")).toHaveTextContent(/slow down/i);
  });
});
