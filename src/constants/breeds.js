export const BREEDS = {
  cattle: [
    'Friesian',
    'Ayrshire',
    'Guernsey',
    'Jersey',
    'Sahiwal',
    'Zebu',
    'Borana',
    'Maasai Zebu',
  ],
  goats: [
    'Boer',
    'Toggenburg',
    'Saanen',
    'Alpine',
    'Local Indigenous',
    'Somali',
  ],
  sheep: [
    'Merino',
    'Dorper',
    'Suffolk',
    'Romney',
    'Local Indigenous',
    'Red Maasai',
  ],
  pigs: [
    'Large White',
    'Landrace',
    'Duroc',
    'Hampshire',
    'Local Indigenous',
  ],
  poultry: [
    'Broiler',
    'Layer',
    'Kienyeji',
    'Rhode Island Red',
    'Sussex',
    'Leghorn',
  ],
}

export const getBreedsForType = (type) => {
  return BREEDS[type] || []
}
