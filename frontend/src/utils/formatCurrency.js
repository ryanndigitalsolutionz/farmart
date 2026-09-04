export function formatKES(amount) {
  if (amount === null || amount === undefined) return "KES 0";
  const num = typeof amount === "string" ? Number(amount) : amount;
  if (isNaN(num)) return "KES 0";
  return `KES ${num.toLocaleString("en-KE")}`;
}
