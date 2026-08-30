export function validateEmail(email) {
  if (!email) return "Email is required.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return "Please enter a valid email address.";
  return null;
}

export function validatePassword(password) {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return null;
}

export function validateRequired(value, label) {
  if (!value || !value.trim()) return `${label} is required.`;
  return null;
}

export function validatePhone(phone) {
  if (!phone) return "Phone number is required.";
  const re = /^\+?[\d\s-]{10,}$/;
  if (!re.test(phone)) return "Please enter a valid phone number.";
  return null;
}
