import mariaGoat from "../mockimages/maria-goat.jpg"
import freshian from "../mockimages/freshian.jpg"
import mimi from "../mockimages/mimi.jpg"
import kito from "../mockimages/kito.jpg"
import kasuku from "../mockimages/kasuku.jpg"

const livestockMockData = [
    {
        id: "LS001", 
        name: "Maria",
        type: "Goat",
        breed: "Boer",
        sex: "Female",
        age: 2,
        weight: 48,
        price: 15000,
        location: "Kiambu",
        seller: {
            id: "S004",
            name: "Malaika Farm",
        },
        image: [mariaGoat],
        description: "Healthy mature goat with good breeding characteristics.",
        health: {
            vaccinated: true,
            lastCheckup: "2026-07-28",
        },
        availability: "Available"
    },
    {
        id: "LS002",
        name: "Baraka",
        type: "Cow",
        breed: "Friesian",
        sex: "Male",
        age: 3,
        weight: 420,
        price: 185000,
        location: "Nakuru",
        seller: {
        id: "S002",
        name: "Sunrise Dairy Farm",
        },
        images: [freshian],
        description:
        "Healthy Friesian cattle with good body condition and strong growth potential.",
        health: {
        vaccinated: true,
        lastCheckup: "2026-07-20",
        },
        availability: "Sold",
    },
    {
        id: "LS003",
        name: "Mimi",
        type: "Sheep",
        breed: "Dorper",
        sex: "Female",
        age: 1,
        weight: 42,
        price: 10000,
        location: "Kajiado",
        seller: {
        id: "S003",
        name: "Kajiado Livestock Farm",
        },
        images: [mimi],
        description:
        "Young Dorper sheep in good heakth and suitable for breeding",
        health: {
        vaccinated: true,
        lastCheckup: "2026-08-01",
        },
        availability: "Pending",
    },
    {
        id: "LS004",
        name: "Kito",
        type: "Chicken",
        breed: "Kienyeji",
        sex: "Female",
        age: 1,
        weight: 2,
        price: 1200,
        location: "Muranga",
        seller: {
        id: "S004",
        name: "Kuku Farm",
        },
        images: [kito],
        description:
        "Healthy kienyeji chicken",
        health: {
        vaccinated: true,
        lastCheckup: "2026-08-04",
        },
        availability: "Available",
    },
    {
        id: "LS005",
        name: "Kasuku",
        type: "Pig",
        breed: "Landrace",
        sex: "Female",
        age: 1,
        weight: 60,
        price: 18000,
        location: "Kiambu",
        seller: {
        id: "S006",
        name: "KwaNgu Farm",
        },
        images: [kasuku],
        description:
        "Healthy, well-fed pig for meat production",
        health: {
        vaccinated: true,
        lastCheckup: "2026-08-04",
        },
        availability: "Available",
    },

];

export default livestockMockData;
