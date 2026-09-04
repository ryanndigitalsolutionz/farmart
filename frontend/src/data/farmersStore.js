const STORAGE_KEY = "farmartFarmers";

const DEFAULT_FARMERS = [
  {
    id: 1,
    farm_name: "Kiambu Green Pastures",
    location: "Kiambu",
    phone_number: "—",
    email: "—",
    description: "",
    status: "pending",
    rejection_reason: null,
    joined_date: "2026-01-01",
    listing_count: 0,
    animals_sold: 0,
    rating: null,
    user_id: 1,
  },
  {
    id: 2,
    farm_name: "Nakuru Boran Ranch",
    location: "Nakuru",
    phone_number: "—",
    email: "—",
    description: "",
    status: "pending",
    rejection_reason: null,
    joined_date: "2026-01-01",
    listing_count: 0,
    animals_sold: 0,
    rating: null,
    user_id: 2,
  },
  {
    id: 3,
    farm_name: "Eldoret Dairy Farm",
    location: "Eldoret",
    phone_number: "—",
    email: "—",
    description: "",
    status: "verified",
    rejection_reason: null,
    joined_date: "2026-01-01",
    listing_count: 0,
    animals_sold: 0,
    rating: 4.6,
    user_id: 3,
  },
  {
    id: 4,
    farm_name: "Machakos Poultry Co-op",
    location: "Machakos",
    phone_number: "—",
    email: "—",
    description: "",
    status: "verified",
    rejection_reason: null,
    joined_date: "2026-01-01",
    listing_count: 0,
    animals_sold: 0,
    rating: 4.8,
    user_id: 4,
  },
];

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_FARMERS));
      return DEFAULT_FARMERS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read farmers store:", err);
    return DEFAULT_FARMERS;
  }
}

function writeAll(farmers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(farmers));
}

export function getAllFarmers() {
  return readAll();
}

export function getFarmerById(farmerId) {
  const farmers = readAll();
  return farmers.find((f) => String(f.id) === String(farmerId)) || null;
}

export function getPendingFarmers() {
  return readAll().filter((f) => f.status === "pending");
}

export function addPendingFarmer({ farm_name, location, phone_number, description }) {
  const farmers = readAll();
  const nextId = farmers.length > 0 ? Math.max(...farmers.map((f) => f.id)) + 1 : 1;

  const newFarmer = {
    id: nextId,
    farm_name,
    location,
    phone_number,
    email: "—",
    description,
    status: "pending",
    rejection_reason: null,
    joined_date: new Date().toISOString().slice(0, 10),
    listing_count: 0,
    animals_sold: 0,
    rating: null,
    user_id: nextId,
  };

  writeAll([...farmers, newFarmer]);
  return newFarmer;
}

export function approveFarmer(farmerId) {
  const farmers = readAll();
  const updated = farmers.map((f) =>
    String(f.id) === String(farmerId)
      ? { ...f, status: "verified", rejection_reason: null }
      : f
  );
  writeAll(updated);
}

export function rejectFarmer(farmerId, reason) {
  const farmers = readAll();
  const updated = farmers.map((f) =>
    String(f.id) === String(farmerId)
      ? { ...f, status: "rejected", rejection_reason: reason }
      : f
  );
  writeAll(updated);
}

export function removeFarmer(farmerId) {
  const farmers = readAll();
  writeAll(farmers.filter((f) => String(f.id) !== String(farmerId)));
}