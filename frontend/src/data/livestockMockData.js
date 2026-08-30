export const seedData = {
  livestock: [
    { id: "l1", type: "cattle", breed: "Boran Bull", location: "Nakuru", status: "available", isFlagged: false, price: 85000 },
    { id: "l2", type: "goat", breed: "Galla Goat", location: "Meru", status: "available", isFlagged: false, price: 15000 },
    { id: "l3", type: "cattle", breed: "Friesian Cow", location: "Nyeri", status: "available", isFlagged: false, price: 120000 },
    { id: "l4", type: "poultry", breed: "Kienyeji", location: "Meru", status: "available", isFlagged: true, flagReason: "price outlier", price: 1200 },
    { id: "l5", type: "goat", breed: "Boer", location: "Nakuru", status: "pending_review", isFlagged: false, price: 35000 },
    { id: "l6", type: "sheep", breed: "Dorper", location: "Narok", status: "available", isFlagged: false, price: 22000 },
  ],
};
