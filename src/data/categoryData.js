export const categoryData = [
  {
    id: 'cattle',
    name: 'Cattle',
    description: 'Dairy and beef cattle from trusted farmers',
    count: 45,
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600',
  },
  {
    id: 'goats',
    name: 'Goats',
    description: 'Quality goats for meat and dairy',
    count: 38,
    image: 'https://images.unsplash.com/photo-1529927066849-79b791a69825?w=600',
  },
  {
    id: 'sheep',
    name: 'Sheep',
    description: 'Premium sheep breeds available',
    count: 29,
    image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=600',
  },
  {
    id: 'pigs',
    name: 'Pigs',
    description: 'Healthy pigs for breeding and meat',
    count: 22,
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600',
  },
  {
    id: 'poultry',
    name: 'Poultry',
    description: 'Chickens, ducks, and more',
    count: 67,
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600',
  },
]

export const getCategoryById = (id) => {
  return categoryData.find((cat) => cat.id === id) || null
}

export const getCategoryCounts = () => {
  const counts = {}
  categoryData.forEach((cat) => {
    counts[cat.id] = cat.count
  })
  return counts
}
