export type CarbonInputs = Record<string, number>;

export const DEFAULT_INPUTS: CarbonInputs = {
  transport: 100,
  electricity: 250,
  water: 150,
  food: 7,
  shopping: 5,
  digital: 6,
};

// Emission coefficients expressed as kg CO₂ per month for one unit of each input.
export const CARBON_FACTORS = {
  transport: 0.21, // per km/week
  electricity: 0.82, // per kWh/month
  water: 0.002 * 30, // per liter/day, summed over a month
  food: 3.5 * 4, // per meat meal/week, summed over a month
  shopping: 15, // per new item/month
  digital: 0.036 * 30, // per hour/day, summed over a month
} as const;

export const GLOBAL_AVG_YEARLY_KG = 4000;
export const MAX_YEARLY_KG = 20000;

export function calculateCarbon(inputs: CarbonInputs): number {
  const {
    transport = DEFAULT_INPUTS.transport,
    electricity = DEFAULT_INPUTS.electricity,
    water = DEFAULT_INPUTS.water,
    food = DEFAULT_INPUTS.food,
    shopping = DEFAULT_INPUTS.shopping,
    digital = DEFAULT_INPUTS.digital,
  } = inputs;

  return (
    transport * CARBON_FACTORS.transport +
    electricity * CARBON_FACTORS.electricity +
    water * CARBON_FACTORS.water +
    food * CARBON_FACTORS.food +
    shopping * CARBON_FACTORS.shopping +
    digital * CARBON_FACTORS.digital
  );
}

export function computeScore(yearlyCarbon: number): number {
  return Math.max(0, Math.min(100, 100 - Math.round((yearlyCarbon / MAX_YEARLY_KG) * 100)));
}

export function getTips(inputs: CarbonInputs, yearlyCarbon: number): string[] {
  return [
    yearlyCarbon > 6000 && "Switch to public transport — saves ~1.5 tons CO₂/year",
    inputs.food > 10 && "Reduce meat intake by 3 meals/week — saves 0.5 ton CO₂/year",
    inputs.electricity > 400 && "Switch to renewable energy — could cut 70% of electricity emissions",
    inputs.shopping > 8 && "Buy secondhand — saves ~500kg CO₂ per item avoided",
    "Plant 10 trees to offset your remaining footprint",
  ].filter((tip): tip is string => Boolean(tip)).slice(0, 3);
}
