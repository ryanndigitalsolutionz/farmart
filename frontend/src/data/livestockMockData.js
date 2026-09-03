import farmartImages from "./farmartImages";

const livestock = [
  {
    id: 1,
    name: "Maria",
    type: "Cow",
    breed: "Friesian",
    age: 3,
    sex: "Female",
    weight: 420,
    location: "Nairobi",
    price: 120000,
    image: farmartImages.livestock.cows[0],

    seller: {
      id: 1,
      name: "Nairobi Dairy Farm",
      rating: 4.8,
    },

    description:
      "Healthy Friesian dairy cow with good milk production. Well cared for and suitable for dairy farming.",

    health: {
      vaccinated: true,
      lastCheckup: "2026-08-15",
    },

    availability: "Available",
  },

  {
    id: 2,
    name: "Kamau",
    type: "Goat",
    breed: "Boer",
    age: 2,
    sex: "Male",
    weight: 65,
    location: "Kiambu",
    price: 25000,
    image: farmartImages.livestock.goats[0],

    seller: {
      id: 2,
      name: "Kiambu Goat Farm",
      rating: 4.6,
    },

    description:
      "Strong and healthy Boer goat with good body condition. Suitable for breeding and meat production.",

    health: {
      vaccinated: true,
      lastCheckup: "2026-08-10",
    },

    availability: "Available",
  },

  {
    id: 3,
    name: "Milka",
    type: "Sheep",
    breed: "Dorper",
    age: 2,
    sex: "Female",
    weight: 58,
    location: "Nakuru",
    price: 18000,
    image: farmartImages.livestock.sheep[0],

    seller: {
      id: 3,
      name: "Nakuru Livestock Farm",
      rating: 4.7,
    },

    description:
      "Healthy Dorper sheep in good condition. Suitable for breeding and quality meat production.",

    health: {
      vaccinated: true,
      lastCheckup: "2026-08-01",
    },

    availability: "Available",
  },

  {
    id: 4,
    name: "Kasuku",
    type: "Pig",
    breed: "Landrace",
    age: 1,
    sex: "Male",
    weight: 110,
    location: "Nyeri",
    price: 35000,
    image: farmartImages.livestock.pigs[0],

    seller: {
      id: 4,
      name: "Nyeri Pig Farm",
      rating: 4.5,
    },

    description:
      "Young Landrace pig in good health with good growth potential. Suitable for commercial pig farming.",

    health: {
      vaccinated: true,
      lastCheckup: "2026-08-12",
    },

    availability: "Available",
  },

  {
    id: 5,
    name: "Kienyeji Hen",
    type: "Poultry",
    breed: "Kienyeji",
    age: 1,
    sex: "Female",
    weight: 2.5,
    location: "Machakos",
    price: 1500,
    image: farmartImages.livestock.poultry[0],

    seller: {
      id: 5,
      name: "Machakos Poultry Farm",
      rating: 4.4,
    },

    description:
      "Healthy Kienyeji hen suitable for egg production and breeding. Raised under good farm conditions.",

    health: {
      vaccinated: true,
      lastCheckup: "2026-08-05",
    },

    availability: "Available",
  },
];

export default livestock;