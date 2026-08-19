import { farmers } from './farmerMockData'

export const buyers = [
  {
    id: 'buyer-001',
    name: 'James Mwangi',
    email: 'buyer@farmart.test',
    password: 'password123',
    phone: '+254 756 789 012',
    location: 'Nairobi',
    role: 'buyer',
    memberSince: new Date('2023-02-10').toISOString(),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    verified: true,
  },
  {
    id: 'buyer-002',
    name: 'Sarah Njeri',
    email: 'sarah.n@farmart.test',
    password: 'password123',
    phone: '+254 767 890 123',
    location: 'Mombasa',
    role: 'buyer',
    memberSince: new Date('2023-04-15').toISOString(),
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
    verified: true,
  },
]

export const admins = [
  {
    id: 'admin-001',
    name: 'Admin User',
    email: 'admin@farmart.test',
    password: 'admin123',
    phone: '+254 700 000 000',
    location: 'Nairobi',
    role: 'admin',
    memberSince: new Date('2022-01-01').toISOString(),
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200',
    verified: true,
  },
]

export const users = [...farmers, ...buyers, ...admins]

export const getUserById = (id) => {
  return users.find((u) => u.id === id) || null
}

export const getUserByEmail = (email) => {
  return users.find((u) => u.email === email) || null
}

export const getUsersByRole = (role) => {
  return users.filter((u) => u.role === role)
}

export const addUser = (user) => {
  users.push(user)
  return user
}

export const updateUser = (id, updates) => {
  const index = users.findIndex((u) => u.id === id)
  if (index >= 0) {
    users[index] = { ...users[index], ...updates }
    return users[index]
  }
  return null
}

export const deleteUser = (id) => {
  const index = users.findIndex((u) => u.id === id)
  if (index >= 0) {
    users.splice(index, 1)
    return true
  }
  return false
}
