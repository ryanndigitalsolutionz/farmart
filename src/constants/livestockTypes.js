export const LIVESTOCK_TYPES = [
  { value: 'cattle', label: 'Cattle' },
  { value: 'goats', label: 'Goats' },
  { value: 'sheep', label: 'Sheep' },
  { value: 'pigs', label: 'Pigs' },
  { value: 'poultry', label: 'Poultry' },
]

export const HEALTH_STATUS_OPTIONS = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
]

export const HEALTH_STATUS = {
  EXCELLENT: 'excellent',
  GOOD: 'good',
  FAIR: 'fair',
  POOR: 'poor',
}

export const VACCINATION_STATUS_OPTIONS = [
  { value: 'fully_vaccinated', label: 'Fully Vaccinated' },
  { value: 'partially_vaccinated', label: 'Partially Vaccinated' },
  { value: 'not_vaccinated', label: 'Not Vaccinated' },
]

export const VACCINATION_STATUS = {
  FULLY_VACCINATED: 'fully_vaccinated',
  PARTIALLY_VACCINATED: 'partially_vaccinated',
  NOT_VACCINATED: 'not_vaccinated',
}

export const LISTING_STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending Approval' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'sold', label: 'Sold' },
  { value: 'reserved', label: 'Reserved' },
  { value: 'suspended', label: 'Suspended' },
]

export const CATEGORIES = [
  { id: 'cattle', name: 'Cattle', icon: null, count: 0 },
  { id: 'goats', name: 'Goats', icon: null, count: 0 },
  { id: 'sheep', name: 'Sheep', icon: null, count: 0 },
  { id: 'pigs', name: 'Pigs', icon: null, count: 0 },
  { id: 'poultry', name: 'Poultry', icon: null, count: 0 },
]

export const LISTING_CATEGORIES = CATEGORIES

export const KENYAN_LOCATIONS = [
  'Nairobi',
  'Nakuru',
  'Kiambu',
  'Eldoret',
  'Kisumu',
  'Nyeri',
  'Meru',
  'Machakos',
  'Mombasa',
  'Kakamega',
  'Nanyuki',
  'Thika',
]

export const BREEDS = {
  cattle: ['Friesian', 'Ayrshire', 'Guernsey', 'Jersey', 'Sahiwal', 'Zebu', 'Borana', 'Maasai Zebu'],
  goats: ['Boer', 'Toggenburg', 'Saanen', 'Alpine', 'Local Indigenous', 'Somali'],
  sheep: ['Merino', 'Dorper', 'Suffolk', 'Romney', 'Local Indigenous', 'Red Maasai'],
  pigs: ['Large White', 'Landrace', 'Duroc', 'Hampshire', 'Local Indigenous'],
  poultry: ['Broiler', 'Layer', 'Kienyeji', 'Rhode Island Red', 'Sussex', 'Leghorn'],
}

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'age', label: 'Age' },
  { value: 'popular', label: 'Most Popular' },
]

export const AGE_RANGES = [
  { value: '0-1', label: 'Less than 1 year' },
  { value: '1-2', label: '1-2 years' },
  { value: '2-3', label: '2-3 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '5+', label: '5+ years' },
]

export const PRICE_RANGES = [
  { value: '0-50000', label: 'Under KSh 50,000' },
  { value: '50000-100000', label: 'KSh 50,000 - 100,000' },
  { value: '100000-200000', label: 'KSh 100,000 - 200,000' },
  { value: '200000-500000', label: 'KSh 200,000 - 500,000' },
  { value: '500000+', label: 'Over KSh 500,000' },
]
