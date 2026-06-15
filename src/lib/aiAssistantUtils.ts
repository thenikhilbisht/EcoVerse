export const ecoResponses: Record<string, string> = {
  default:
    "Great question! I'm EcoBot, your sustainability guide. Ask me about carbon reduction, eco challenges, or climate tips! 🌱",
  hello:
    "Hello, Eco Warrior! 👋 I'm EcoBot. Ready to help you reduce your carbon footprint and crush eco challenges today?",
  carbon:
    "Your carbon footprint consists of transport (30%), food (25%), energy (20%), shopping (15%) and digital use (10%). Start by tackling your biggest category! 🎯",
  tip: "Here are today's top eco tips:\n1. 🚴 Cycle or walk for trips under 5km\n2. 🥦 Try one plant-based meal today\n3. 💡 Unplug devices when not in use\n4. 🛁 Cut your shower by 2 minutes\n5. ♻️ Refuse single-use plastics",
  challenge:
    "Today's featured challenge: **Zero Plastic Day** 🎯\nAvoid all single-use plastics for 24 hours. Earn 100 XP and help reduce ocean plastic pollution. Can you do it?",
  streak:
    "Your current streak is amazing! 🔥 Maintaining daily challenges can reduce your footprint by up to 15% per month. Keep it up!",
  climate:
    "Climate change is caused by greenhouse gas emissions, primarily CO₂ from burning fossil fuels. But together, millions of small actions create massive change. You're part of the solution! 🌍",
  reward:
    "You can earn: 🪙 Eco Coins, 🏆 Digital Badges, 📜 Certificates, and even NFT-style impact cards! Visit the Rewards section to see what you can unlock.",
  food: "Going plant-based just 3 days a week saves ~0.5 tons of CO₂ per year — equivalent to driving 1,200km less! 🌱",
  transport:
    "Switching from a car to cycling/walking for short trips is the #1 individual action for reducing carbon. Electric vehicles are 3x cleaner than petrol cars! ⚡",
  energy:
    "Lower your energy use: switch to LED bulbs, unplug idle electronics, and wash clothes in cold water. Renewables can cut your home emissions by up to 70%. 💡",
  water:
    "Save water with shorter showers, fixing leaks, and only running full loads. Cutting 2 minutes off your shower saves ~10 liters each time. 🚿",
};

export function getResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return ecoResponses.hello;
  if (lower.includes("carbon") || lower.includes("footprint")) return ecoResponses.carbon;
  if (lower.includes("tip") || lower.includes("advice")) return ecoResponses.tip;
  if (lower.includes("challenge")) return ecoResponses.challenge;
  if (lower.includes("streak")) return ecoResponses.streak;
  if (lower.includes("climate") || lower.includes("global warming")) return ecoResponses.climate;
  if (lower.includes("reward") || lower.includes("coin") || lower.includes("badge")) return ecoResponses.reward;
  if (lower.includes("food") || lower.includes("plant") || lower.includes("meat")) return ecoResponses.food;
  if (lower.includes("transport") || lower.includes("car") || lower.includes("drive")) return ecoResponses.transport;
  if (lower.includes("energy") || lower.includes("electric") || lower.includes("power")) return ecoResponses.energy;
  if (lower.includes("water") || lower.includes("shower")) return ecoResponses.water;
  return ecoResponses.default;
}

export const MAX_MESSAGE_LENGTH = 500;

/**
 * Strips HTML/markup characters from user input. React already escapes rendered
 * text, so we strip tags rather than HTML-encode them to avoid double-encoding
 * artifacts like "&lt;script&gt;" showing up literally on screen.
 */
export function sanitizeMessage(input: string, maxLength: number = MAX_MESSAGE_LENGTH): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export const RATE_LIMIT = {
  maxMessages: 8,
  windowMs: 60_000,
} as const;

/**
 * Returns true when the number of message timestamps within the trailing
 * `windowMs` window meets or exceeds `maxMessages`.
 */
export function isRateLimited(
  timestamps: number[],
  now: number,
  limit: { maxMessages: number; windowMs: number } = RATE_LIMIT,
): boolean {
  const recent = timestamps.filter((t) => now - t < limit.windowMs);
  return recent.length >= limit.maxMessages;
}

/**
 * Records a new message attempt against the rolling rate-limit window.
 * Returns whether the message is allowed and the pruned timestamp list to
 * persist. Keeping `Date.now()` here keeps the calling component render-pure.
 */
export function registerMessage(
  timestamps: number[],
  limit: { maxMessages: number; windowMs: number } = RATE_LIMIT,
): { allowed: boolean; timestamps: number[] } {
  const now = Date.now();
  const recent = timestamps.filter((t) => now - t < limit.windowMs);
  if (recent.length >= limit.maxMessages) {
    return { allowed: false, timestamps: recent };
  }
  return { allowed: true, timestamps: [...recent, now] };
}
