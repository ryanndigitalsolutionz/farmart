import { formatCurrency } from './formatCurrency'

export const downloadFile = (content, filename, mimeType = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const downloadInvoice = (order) => {
  const lines = [
    '====================================',
    '           FARMART INVOICE           ',
    '====================================',
    '',
    `Order ID: ${order.id}`,
    `Date: ${new Date(order.createdAt).toLocaleString()}`,
    `Status: ${order.orderStatus.toUpperCase()}`,
    `Payment: ${order.paymentStatus.toUpperCase()}`,
    '',
    '--- Buyer Information ---',
    `Name: ${order.buyerName}`,
    `Phone: ${order.buyerPhone}`,
    `Location: ${order.buyerLocation}`,
    '',
    '--- Farmer Information ---',
    `Name: ${order.farmerName}`,
    `Farm: ${order.farmName}`,
    `Location: ${order.farmerLocation}`,
    '',
    '--- Order Items ---',
    ...order.items.map(
      (item, i) =>
        `${i + 1}. ${item.name} (${item.type}) x${item.quantity} @ ${formatCurrency(item.price)} = ${formatCurrency(item.price * item.quantity)}`
    ),
    '',
    '--- Summary ---',
    `Subtotal: ${formatCurrency(order.subtotal)}`,
    `Platform Fee (2%): ${formatCurrency(order.platformFee)}`,
    `Total: ${formatCurrency(order.total)}`,
    `Payment Method: ${order.paymentMethod}`,
    '',
    '====================================',
    '    Thank you for using Farmart!     ',
    '====================================',
  ].join('\n')

  downloadFile(lines, `farmart-invoice-${order.id}.txt`, 'text/plain')
}
