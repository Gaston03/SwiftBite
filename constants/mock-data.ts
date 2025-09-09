import 'react-native-get-random-values';
import { Address } from "@/models/address";
import { Customer } from "@/models/customer";
import {
  EstablishmentStatus,
  EstablishmentType,
  UserRole,
} from "@/models/enums";
import { Establishment } from "@/models/establishment";
import { Product } from "@/models/product";
import { Topping } from "@/models/topping";
import { v4 as uuid } from "uuid";

// Mock Data for UI Development

const addressIds = {
  1: uuid(),
  2: uuid(),
};
const customerId = uuid();
const establishmentIds = {
  1: uuid(),
  2: uuid(),
  3: uuid(),
};
const productIds = {
  1: uuid(),
  2: uuid(),
  3: uuid(),
  4: uuid(),
  5: uuid(),
  6: uuid(),
  7: uuid(),
};
const toppingIds = {
  1: uuid(),
  2: uuid(),
  3: uuid(),
  4: uuid(),
};

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
    id: addressIds[1],
    area: "Downtown",
    city: "Metropolis",
    zipCode: "12345",
    longitude: -74.006,
    latitude: 40.7128,
    instructions: "Leave at the front door.",
  },
  {
    id: addressIds[2],
    area: "Suburbia",
    city: "Smallville",
    zipCode: "67890",
    longitude: -96.6989,
    latitude: 32.96,
    instructions: "Beware of the dog.",
  },
];

export const MOCK_CUSTOMER: Customer = {
  id: customerId,
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
    id: toppingIds[1],
    productId: productIds[1],
    name: "Extra Cheese",
    price: 2.0,
    isRequired: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: toppingIds[2],
    productId: productIds[1],
    name: "Mushrooms",
    price: 1.5,
    isRequired: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: toppingIds[3],
    productId: productIds[2],
    name: "Bacon",
    price: 2.5,
    isRequired: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: toppingIds[4],
    productId: productIds[2],
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
    id: productIds[1],
    establishmentId: establishmentIds[1],
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomatoes, and basil.",
    price: 12.99,
    category: "Main Courses",
    url: "https://placehold.co/300x200/F44336/FFFFFF/png?text=Pizza",
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    toppings: MOCK_TOPPINGS.filter((t) => t.productId === productIds[1]),
  },
  {
    id: productIds[2],
    establishmentId: establishmentIds[1],
    name: "Cheeseburger",
    description: "Juicy beef patty with cheddar cheese, lettuce, and tomato.",
    price: 9.99,
    category: "Main Courses",
    url: "https://placehold.co/300x200/FFC107/FFFFFF/png?text=Burger",
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    toppings: MOCK_TOPPINGS.filter((t) => t.productId === productIds[2]),
  },
  {
    id: productIds[3],
    establishmentId: establishmentIds[1],
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
    id: productIds[4],
    establishmentId: establishmentIds[2],
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
    id: productIds[5],
    establishmentId: establishmentIds[2],
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
    id: productIds[6],
    establishmentId: establishmentIds[3],
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
    id: productIds[7],
    establishmentId: establishmentIds[3],
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
    id: establishmentIds[1],
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
    products: MOCK_PRODUCTS.filter((p) => p.establishmentId === establishmentIds[1]),
  },
  {
    id: establishmentIds[2],
    name: "HealthFirst Pharmacy",
    imageUrl: "https://placehold.co/600x400/2196F3/FFFFFF/png?text=HealthFirst",
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
    products: MOCK_PRODUCTS.filter((p) => p.establishmentId === establishmentIds[2]),
  },
  {
    id: establishmentIds[3],
    name: "Daily Needs Groceries",
    imageUrl: "https://placehold.co/600x400/4CAF50/FFFFFF/png?text=Daily+Needs",
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
    products: MOCK_PRODUCTS.filter((p) => p.establishmentId === establishmentIds[3]),
  },
];
