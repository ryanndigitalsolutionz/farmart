export const validators = {
  required: (value) => {
    if (value == null || value === '' || (typeof value === 'string' && value.trim() === '')) {
      return 'This field is required'
    }
    return null
  },

  email: (value) => {
    if (!value) return 'Email is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
    return null
  },

  password: (value) => {
    if (!value) return 'Password is required'
    if (value.length < 6) {
      return 'Password must be at least 6 characters'
    }
    return null
  },

  confirmPassword: (value, password) => {
    if (!value) return 'Please confirm your password'
    if (value !== password) {
      return 'Passwords do not match'
    }
    return null
  },

  phone: (value) => {
    if (!value) return 'Phone number is required'
    const phoneRegex = /^[+]?[\d\s()-]{10,15}$/
    if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number'
    }
    return null
  },

  minLength: (min) => (value) => {
    if (!value) return null
    if (value.length < min) {
      return `Must be at least ${min} characters`
    }
    return null
  },

  maxLength: (max) => (value) => {
    if (!value) return null
    if (value.length > max) {
      return `Must be no more than ${max} characters`
    }
    return null
  },

  number: (value) => {
    if (!value && value !== 0) return 'This field is required'
    if (isNaN(Number(value))) {
      return 'Please enter a valid number'
    }
    return null
  },

  positiveNumber: (value) => {
    const error = validators.number(value)
    if (error) return error
    if (Number(value) <= 0) {
      return 'Must be a positive number'
    }
    return null
  },
}

export const validate = (values, rules) => {
  const errors = {}
  for (const [field, fieldRules] of Object.entries(rules)) {
    const fieldErrors = []
    for (const rule of fieldRules) {
      const error = rule(values[field])
      if (error) fieldErrors.push(error)
    }
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors[0]
    }
  }
  return errors
}
