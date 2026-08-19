export const formatCurrency = (amount) => {
  if (amount == null || isNaN(amount)) return 'KSh 0'
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const parseCurrency = (str) => {
  if (!str) return 0
  const cleaned = str.replace(/[KSh,\s]/g, '').trim()
  const num = parseFloat(cleaned)
  return isNaN(num) ? 0 : num
}
