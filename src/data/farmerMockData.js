export const farmers = [
  {
    id: 'farmer-001',
    name: 'John Kamau',
    email: 'farmer@farmart.test',
    password: 'password123',
    phone: '+254 712 345 678',
    location: 'Nakuru',
    farmName: 'Kamau Dairy Farm',
    farmDescription: 'Premium dairy farm specializing in Friesian and Jersey cows. Over 15 years of experience in livestock farming.',
    rating: 4.8,
    totalSales: 156,
    totalEarnings: 2450000,
    memberSince: new Date('2023-01-15').toISOString(),
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    role: 'farmer',
    verified: true,
  },
  {
    id: 'farmer-002',
    name: 'Mary Wanjiku',
    email: 'mary.wanjiku@farmart.test',
    password: 'password123',
    phone: '+254 723 456 789',
    location: 'Kiambu',
    farmName: 'Wanjiku Sheep Ranch',
    farmDescription: 'Quality sheep and goat breeding farm. Known for Dorper and Boer breeds.',
    rating: 4.5,
    totalSales: 89,
    totalEarnings: 1200000,
    memberSince: new Date('2023-03-20').toISOString(),
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    role: 'farmer',
    verified: true,
  },
  {
    id: 'farmer-003',
    name: 'Peter Kipchoge',
    email: 'peter.k@farmart.test',
    password: 'password123',
    phone: '+254 734 567 890',
    location: 'Eldoret',
    farmName: 'Kipchoge Pig Farm',
    farmDescription: 'Modern pig farming operation using the latest husbandry practices.',
    rating: 4.2,
    totalSales: 67,
    totalEarnings: 890000,
    memberSince: new Date('2023-05-10').toISOString(),
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    role: 'farmer',
    verified: true,
  },
  {
    id: 'farmer-004',
    name: 'Grace Muthoni',
    email: 'grace.m@farmart.test',
    password: 'password123',
    phone: '+254 745 678 901',
    location: 'Nyeri',
    farmName: 'Muthori Poultry Farm',
    farmDescription: 'Specialized poultry farm producing healthy, high-quality birds.',
    rating: 4.9,
    totalSales: 234,
    totalEarnings: 980000,
    memberSince: new Date('2022-11-05').toISOString(),
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    role: 'farmer',
    verified: true,
  },
]

export const getFarmerById = (id) => {
  return farmers.find((f) => f.id === id) || null
}

export const getFarmerByEmail = (email) => {
  return farmers.find((f) => f.email === email) || null
}

export const updateFarmer = (id, updates) => {
  const index = farmers.findIndex((f) => f.id === id)
  if (index >= 0) {
    farmers[index] = { ...farmers[index], ...updates }
    return farmers[index]
  }
  return null
}
