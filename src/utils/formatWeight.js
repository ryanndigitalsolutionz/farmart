export const formatWeight = (weight, unit = 'kg') => {
  if (weight == null || isNaN(weight)) return 'N/A'
  return `${weight} ${unit}`
}

export const parseWeight = (str) => {
  if (!str) return 0
  const cleaned = str.replace(/[^\d.]/g, '').trim()
  const num = parseFloat(cleaned)
  return isNaN(num) ? 0 : num
}
