import { EstablishmentType } from "@/models/enums";

// Mock Data for UI Development

export const MOCK_CATEGORIES = [
  {
    name: "Restaurants",
    image: "https://placehold.co/150x150/FFC107/FFFFFF/png?text=Food",
    type: EstablishmentType.RESTAURANT,
  },
  {
    name: "Groceries",
    image: "https://placehold.co/150x150/4CAF50/FFFFFF/png?text=Groceries",
    type: EstablishmentType.SUPER_MARKET,
  },
  {
    name: "Pharmacies",
    image: "https://placehold.co/150x150/2196F3/FFFFFF/png?text=Pharmacy",
    type: EstablishmentType.PHARMACY,
  },
  {
    name: "Cafés",
    image: "https://placehold.co/150x150/795548/FFFFFF/png?text=Coffee",
    type: EstablishmentType.COFFEE_SHOP,
  },
  {
    name: "Bakeries",
    image: "https://placehold.co/150x150/FF9800/FFFFFF/png?text=Bakery",
    type: EstablishmentType.BAKERY,
  },
  {
    name: "Fast Food",
    image: "https://placehold.co/150x150/F44336/FFFFFF/png?text=Fast+Food",
    type: EstablishmentType.FAST_FOOD,
  },
];

export const MOCK_PRODUCTS = [
  // Restaurant Products
  {
    id: "prod-1",
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomatoes, and basil.",
    price: 12.99,
    category: "Main Courses",
    imageUrl: "https://placehold.co/300x200/F44336/FFFFFF/png?text=Pizza",
    establishmentId: "est-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    toppings: [
      { id: "top-1", name: "Extra Cheese", price: 2.0 },
      { id: "top-2", name: "Mushrooms", price: 1.5 },
    ],
  },
  {
    id: "prod-2",
    name: "Cheeseburger",
    description: "Juicy beef patty with cheddar cheese, lettuce, and tomato.",
    price: 9.99,
    category: "Main Courses",
    imageUrl: "https://placehold.co/300x200/FFC107/FFFFFF/png?text=Burger",
    establishmentId: "est-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    toppings: [
      { id: "top-3", name: "Bacon", price: 2.5 },
      { id: "top-4", name: "Avocado", price: 2.0 },
    ],
  },
  {
    id: "prod-5",
    name: "Garlic Bread",
    description: "Warm and crispy garlic bread with a side of marinara sauce.",
    price: 5.99,
    category: "Appetizers",
    imageUrl: "https://placehold.co/300x200/795548/FFFFFF/png?text=Garlic+Bread",
    establishmentId: "est-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Pharmacy Products
  {
    id: "prod-3",
    name: "Painkiller",
    description: "Box of 20 Paracetamol tablets, 500mg.",
    price: 5.49,
    category: "Pain Relief",
    imageUrl: "https://placehold.co/300x200/2196F3/FFFFFF/png?text=Meds",
    establishmentId: "est-2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-6",
    name: "Vitamin C",
    description: "Bottle of 100 Vitamin C tablets, 1000mg.",
    price: 12.99,
    category: "Vitamins",
    imageUrl: "https://placehold.co/300x200/FF9800/FFFFFF/png?text=Vitamins",
    establishmentId: "est-2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Grocery Products
  {
    id: "prod-4",
    name: "Fresh Milk",
    description: "1 liter of fresh, full-fat milk.",
    price: 2.99,
    category: "Dairy",
    imageUrl: "https://placehold.co/300x200/4CAF50/FFFFFF/png?text=Milk",
    establishmentId: "est-3",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-7",
    name: "Free-range Eggs",
    description: "A dozen of large, free-range brown eggs.",
    price: 4.99,
    category: "Dairy",
    imageUrl: "https://placehold.co/300x200/FFEB3B/000000/png?text=Eggs",
    establishmentId: "est-3",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const MOCK_ESTABLISHMENTS = [
  {
    id: "est-1",
    name: "The Cheesy Crust",
    type: EstablishmentType.RESTAURANT,
    address: "123 Pizza Lane",
    rate: 4.7,
    is_popular: true,
    opening_hours: "11:00 AM - 11:00 PM",
    delivery_time: "25-35 min",
    image: "https://placehold.co/600x400/F44336/FFFFFF/png?text=The+Cheesy+Crust",
    products: MOCK_PRODUCTS.filter((p) => p.establishmentId === "est-1"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "est-2",
    name: "HealthFirst Pharmacy",
    type: EstablishmentType.PHARMACY,
    address: "456 Wellness Blvd",
    rate: 4.9,
    is_popular: true,
    opening_hours: "24/7",
    delivery_time: "15-25 min",
    image: "https://placehold.co/600x400/2196F3/FFFFFF/png?text=HealthFirst",
    products: MOCK_PRODUCTS.filter((p) => p.establishmentId === "est-2"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "est-3",
    name: "Daily Needs Groceries",
    type: EstablishmentType.SUPER_MARKET,
    address: "789 Market St",
    rate: 4.5,
    is_popular: false,
    opening_hours: "8:00 AM - 10:00 PM",
    delivery_time: "30-45 min",
    image: "https://placehold.co/600x400/4CAF50/FFFFFF/png?text=Daily+Needs",
    products: MOCK_PRODUCTS.filter((p) => p.establishmentId === "est-3"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const MOCK_POPULAR_ESTABLISHMENTS = MOCK_ESTABLISHMENTS.filter(
  (e) => e.is_popular
);

export const MOCK_USER = {
  id: "user-1",
  firstName: "Jules",
  lastName: "Verne",
  email: "jules.verne@swiftbite.com",
  phone: "555-123-4567",
  avatar: "https://placehold.co/100x100/9C27B0/FFFFFF/png?text=JV",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
