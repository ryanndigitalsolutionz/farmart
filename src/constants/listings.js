export const LISTING_STATUSES = [
  { value: 'draft', label: 'Draft', color: 'gray' },
  { value: 'pending', label: 'Pending Approval', color: 'yellow' },
  { value: 'approved', label: 'Approved', color: 'green' },
  { value: 'rejected', label: 'Rejected', color: 'red' },
  { value: 'sold', label: 'Sold', color: 'purple' },
  { value: 'reserved', label: 'Reserved', color: 'blue' },
  { value: 'suspended', label: 'Suspended', color: 'orange' },
]

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'age', label: 'Age' },
  { value: 'popular', label: 'Most Popular' },
]

export const LISTING_CATEGORIES = [
  { id: 'cattle', name: 'Cattle' },
  { id: 'goats', name: 'Goats' },
  { id: 'sheep', name: 'Sheep' },
  { id: 'pigs', name: 'Pigs' },
  { id: 'poultry', name: 'Poultry' },
]
