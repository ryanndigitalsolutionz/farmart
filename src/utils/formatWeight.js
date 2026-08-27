export function formatWeight(weight, unit = "kg") {
  if (weight === null || weight === undefined) return "—";
  return `${weight} ${unit}`;
}
