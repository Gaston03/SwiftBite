import {
  EstablishmentStatus,
  EstablishmentType,
  UserRole,
} from "@/models/enums";
import { Address } from "@/models/address";
import { Customer } from "@/models/customer";
import { Topping } from "@/models/topping";
import { Product } from "@/models/product";
import { Establishment } from "@/models/establishment";

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

const MOCK_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    area: "Downtown",
    city: "Metropolis",
    zipCode: "12345",
    longitude: -74.006,
    latitude: 40.7128,
    instructions: "Leave at the front door.",
  },
  {
    id: "addr-2",
    area: "Suburbia",
    city: "Smallville",
    zipCode: "67890",
    longitude: -96.6989,
    latitude: 32.96,
    instructions: "Beware of the dog.",
  },
];

export const MOCK_CUSTOMER: Customer = {
  id: "user-1",
  firstName: "Jules",
  lastName: "Verne",
  email: "jules.verne@swiftbite.com",
  countryCode: "+1",
  phoneNumber: "555-123-4567",
  avatar: "https://placehold.co/100x100/9C27B0/FFFFFF/png?text=JV",
  role: UserRole.CUSTOMER,
  createdAt: new Date(),
  updatedAt: new Date(),
  address: MOCK_ADDRESSES[0],
};

const MOCK_TOPPINGS: Topping[] = [
  {
    id: "top-1",
    productId: "prod-1",
    name: "Extra Cheese",
    price: 2.0,
    isRequired: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "top-2",
    productId: "prod-1",
    name: "Mushrooms",
    price: 1.5,
    isRequired: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "top-3",
    productId: "prod-2",
    name: "Bacon",
    price: 2.5,
    isRequired: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "top-4",
    productId: "prod-2",
    name: "Avocado",
    price: 2.0,
    isRequired: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const MOCK_PRODUCTS: Product[] = [
  // Restaurant Products
  {
    id: "prod-1",
    establishmentId: "est-1",
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomatoes, and basil.",
    price: 12.99,
    category: "Main Courses",
    url: "https://placehold.co/300x200/F44336/FFFFFF/png?text=Pizza",
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    toppings: MOCK_TOPPINGS.filter((t) => t.productId === "prod-1"),
  },
  {
    id: "prod-2",
    establishmentId: "est-1",
    name: "Cheeseburger",
    description: "Juicy beef patty with cheddar cheese, lettuce, and tomato.",
    price: 9.99,
    category: "Main Courses",
    url: "https://placehold.co/300x200/FFC107/FFFFFF/png?text=Burger",
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    toppings: MOCK_TOPPINGS.filter((t) => t.productId === "prod-2"),
  },
  {
    id: "prod-5",
    establishmentId: "est-1",
    name: "Garlic Bread",
    description: "Warm and crispy garlic bread with a side of marinara sauce.",
    price: 5.99,
    category: "Appetizers",
    url: "https://placehold.co/300x200/795548/FFFFFF/png?text=Garlic+Bread",
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Pharmacy Products
  {
    id: "prod-3",
    establishmentId: "est-2",
    name: "Painkiller",
    description: "Box of 20 Paracetamol tablets, 500mg.",
    price: 5.49,
    category: "Pain Relief",
    url: "https://placehold.co/300x200/2196F3/FFFFFF/png?text=Meds",
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod-6",
    establishmentId: "est-2",
    name: "Vitamin C",
    description: "Bottle of 100 Vitamin C tablets, 1000mg.",
    price: 12.99,
    category: "Vitamins",
    url: "https://placehold.co/300x200/FF9800/FFFFFF/png?text=Vitamins",
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Grocery Products
  {
    id: "prod-4",
    establishmentId: "est-3",
    name: "Fresh Milk",
    description: "1 liter of fresh, full-fat milk.",
    price: 2.99,
    category: "Dairy",
    url: "https://placehold.co/300x200/4CAF50/FFFFFF/png?text=Milk",
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod-7",
    establishmentId: "est-3",
    name: "Free-range Eggs",
    description: "A dozen of large, free-range brown eggs.",
    price: 4.99,
    category: "Dairy",
    url: "https://placehold.co/300x200/FFEB3B/000000/png?text=Eggs",
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const MOCK_ESTABLISHMENTS: Establishment[] = [
  {
    id: "est-1",
    name: "The Cheesy Crust",
    imageUrl:
      "https://placehold.co/600x400/F44336/FFFFFF/png?text=The+Cheesy+Crust",
    type: EstablishmentType.RESTAURANT,
    openingHours: {
      monday: [11, 23],
      tuesday: [11, 23],
      wednesday: [11, 23],
      thursday: [11, 23],
      friday: [11, 23],
      saturday: [11, 23],
      sunday: [11, 23],
    },
    status: EstablishmentStatus.OPEN,
    deliveryFee: 3.99,
    rate: 4.7,
    deliveryTime: "25-35 min",
    createdAt: new Date(),
    updatedAt: new Date(),
    address: MOCK_ADDRESSES[0],
    products: MOCK_PRODUCTS.filter((p) => p.establishmentId === "est-1"),
  },
  {
    id: "est-2",
    name: "HealthFirst Pharmacy",
    imageUrl:
      "https://placehold.co/600x400/2196F3/FFFFFF/png?text=HealthFirst",
    type: EstablishmentType.PHARMACY,
    openingHours: {
      monday: [0, 24],
      tuesday: [0, 24],
      wednesday: [0, 24],
      thursday: [0, 24],
      friday: [0, 24],
      saturday: [0, 24],
      sunday: [0, 24],
    },
    status: EstablishmentStatus.OPEN,
    deliveryFee: 2.5,
    rate: 4.9,
    deliveryTime: "15-25 min",
    createdAt: new Date(),
    updatedAt: new Date(),
    address: MOCK_ADDRESSES[1],
    products: MOCK_PRODUCTS.filter((p) => p.establishmentId === "est-2"),
  },
  {
    id: "est-3",
    name: "Daily Needs Groceries",
    imageUrl:
      "https://placehold.co/600x400/4CAF50/FFFFFF/png?text=Daily+Needs",
    type: EstablishmentType.SUPER_MARKET,
    openingHours: {
      monday: [8, 22],
      tuesday: [8, 22],
      wednesday: [8, 22],
      thursday: [8, 22],
      friday: [8, 22],
      saturday: [8, 22],
      sunday: [9, 21],
    },
    status: EstablishmentStatus.OPEN,
    deliveryFee: 4.5,
    rate: 4.5,
    deliveryTime: "30-45 min",
    createdAt: new Date(),
    updatedAt: new Date(),
    products: MOCK_PRODUCTS.filter((p) => p.establishmentId === "est-3"),
  },
];
