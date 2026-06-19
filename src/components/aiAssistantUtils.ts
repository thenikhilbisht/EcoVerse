/**
 * Sanitize raw user input for safe text display.
 * Strips angle brackets and control characters. React handles HTML escaping
 * during rendering, so we only need to clean up dangerous markup characters.
 */
export function sanitizeMessage(rawValue: string): string {
  return rawValue
    .replace(/[<>]/g, "") // strip tag delimiters (React escapes & automatically)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 280);
}

export const ecoResponses: Record<string, string> = {
  default:
    "Great question! I'm EcoBot, your sustainability assistant. Ask me about carbon reduction, eco challenges, or climate tips! 🌱",
  hello:
    "Hello, Eco Warrior! 👋 I'm EcoBot. Ready to help you reduce your carbon footprint and crush eco challenges today?",
  carbon:
    "Your carbon footprint consists of transport (30%), food (25%), energy (20%), shopping (15%) and digital use (10%). Start by tackling your biggest category! 🎯",
  tip: "Here are today's top eco tips:\n1. 🚴 Cycle or walk for trips under 5 km\n2. 🥦 Try one plant-based meal today\n3. 💡 Unplug devices when not in use\n4. 🛁 Cut your shower by 2 minutes\n5. ♻️ Refuse single-use plastics",
  challenge:
    "Today's featured challenge: Zero Plastic Day 🎯\nAvoid all single-use plastics for 24 hours. Earn 100 XP and help reduce ocean plastic pollution. Can you do it?",
  streak:
    "Maintaining daily challenges can reduce your footprint by up to 15% per month. Keep building that streak! 🔥",
  climate:
    "Climate change is caused by greenhouse gas emissions, primarily CO₂ from burning fossil fuels. But together, millions of small actions create massive change. You're part of the solution! 🌍",
  reward:
    "You can earn: 🪙 Eco Coins, 🏆 Digital Badges, 📜 Certificates, and real-world impact rewards! Visit the Rewards section to see what you can unlock.",
  food: "Going plant-based just 3 days a week saves ~0.5 tons of CO₂ per year — equivalent to driving 1,200 km less! 🌱",
  transport:
    "Switching from a car to cycling/walking for short trips is the #1 individual action for reducing carbon. Electric vehicles are 3× cleaner than petrol cars! ⚡",
  water:
    "The average person uses 150 litres of water per day. Cutting showers by 2 minutes saves about 20 litres — and the energy to heat it! 💧",
  energy:
    "Switching to LED bulbs, unplugging standby devices, and using a smart thermostat can cut household energy use by 25%. 💡",
  shopping:
    "Fast fashion produces 10% of global CO₂. Buying secondhand or choosing sustainable brands can cut your clothing footprint by 80%! 👕",
};

export function getResponse(message: string): string {
  const lower = sanitizeMessage(message).toLowerCase();

  if (/\b(hello|hi|hey)\b/.test(lower))
    return ecoResponses.hello;
  if (lower.includes("carbon") || lower.includes("footprint"))
    return ecoResponses.carbon;
  if (lower.includes("tip") || lower.includes("advice") || lower.includes("suggest"))
    return ecoResponses.tip;
  if (lower.includes("challenge")) return ecoResponses.challenge;
  if (lower.includes("streak")) return ecoResponses.streak;
  if (lower.includes("climate") || lower.includes("global warming") || lower.includes("greenhouse"))
    return ecoResponses.climate;
  if (lower.includes("reward") || lower.includes("coin") || lower.includes("badge") || lower.includes("xp"))
    return ecoResponses.reward;
  if (lower.includes("food") || lower.includes("plant") || lower.includes("meat") || lower.includes("vegan"))
    return ecoResponses.food;
  if (lower.includes("transport") || lower.includes("car") || lower.includes("drive") || lower.includes("flight"))
    return ecoResponses.transport;
  if (lower.includes("water") || lower.includes("shower") || lower.includes("litre"))
    return ecoResponses.water;
  if (lower.includes("energy") || lower.includes("electric") || lower.includes("power"))
    return ecoResponses.energy;
  if (lower.includes("shop") || lower.includes("fashion") || lower.includes("buy") || lower.includes("purchase"))
    return ecoResponses.shopping;

  return ecoResponses.default;
}
