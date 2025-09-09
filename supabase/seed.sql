-- Addresses
INSERT INTO addresses (id, area, city, zip_code, longitude, latitude, instructions) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Downtown', 'Metropolis', '12345', -74.006, 40.7128, 'Leave at the front door.'),
('b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'Suburbia', 'Smallville', '67890', -96.6989, 32.96, 'Beware of the dog.');

-- Customers
INSERT INTO customers (id, first_name, last_name, email, country_code, phone_number, role, address_id) VALUES
('c3d4e5f6-a7b8-9012-3456-7890abcdef01', 'Jules', 'Verne', 'jules.verne@swiftbite.com', '+1', '555-123-4567', 'CUSTOMER', 'a1b2c3d4-e5f6-7890-1234-567890abcdef');

-- Establishments
INSERT INTO establishments (id, name, type, opening_hours, status, delivery_fee, rate, delivery_time, address_id, image_url) VALUES
('d4e5f6a7-b8c9-0123-4567-890abcdef012', 'The Cheesy Crust', 'RESTAURANT', '{"monday": [11, 23], "tuesday": [11, 23], "wednesday": [11, 23], "thursday": [11, 23], "friday": [11, 23], "saturday": [11, 23], "sunday": [11, 23]}', 'OPEN', 3.99, 4.7, '25-35 min', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'https://placehold.co/600x400/F44336/FFFFFF/png?text=The+Cheesy+Crust'),
('e5f6a7b8-c9d0-1234-5678-90abcdef0123', 'HealthFirst Pharmacy', 'PHARMACY', '{"monday": [0, 24], "tuesday": [0, 24], "wednesday": [0, 24], "thursday": [0, 24], "friday": [0, 24], "saturday": [0, 24], "sunday": [0, 24]}', 'OPEN', 2.5, 4.9, '15-25 min', 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'https://placehold.co/600x400/2196F3/FFFFFF/png?text=HealthFirst'),
('f6a7b8c9-d0e1-2345-6789-0abcdef01234', 'Daily Needs Groceries', 'SUPER_MARKET', '{"monday": [8, 22], "tuesday": [8, 22], "wednesday": [8, 22], "thursday": [8, 22], "friday": [8, 22], "saturday": [8, 22], "sunday": [9, 21]}', 'OPEN', 4.5, 4.5, '30-45 min', NULL, 'https://placehold.co/600x400/4CAF50/FFFFFF/png?text=Daily+Needs');

-- Products
INSERT INTO products (id, establishment_id, name, description, price, category, url, available) VALUES
('p1', 'd4e5f6a7-b8c9-0123-4567-890abcdef012', 'Margherita Pizza', 'Classic pizza with fresh mozzarella, tomatoes, and basil.', 12.99, 'Main Courses', 'https://placehold.co/300x200/F44336/FFFFFF/png?text=Pizza', true),
('p2', 'd4e5f6a7-b8c9-0123-4567-890abcdef012', 'Cheeseburger', 'Juicy beef patty with cheddar cheese, lettuce, and tomato.', 9.99, 'Main Courses', 'https://placehold.co/300x200/FFC107/FFFFFF/png?text=Burger', true),
('p3', 'd4e5f6a7-b8c9-0123-4567-890abcdef012', 'Garlic Bread', 'Warm and crispy garlic bread with a side of marinara sauce.', 5.99, 'Appetizers', 'https://placehold.co/300x200/795548/FFFFFF/png?text=Garlic+Bread', true),
('p4', 'e5f6a7b8-c9d0-1234-5678-90abcdef0123', 'Painkiller', 'Box of 20 Paracetamol tablets, 500mg.', 5.49, 'Pain Relief', 'https://placehold.co/300x200/2196F3/FFFFFF/png?text=Meds', true),
('p5', 'e5f6a7b8-c9d0-1234-5678-90abcdef0123', 'Vitamin C', 'Bottle of 100 Vitamin C tablets, 1000mg.', 12.99, 'Vitamins', 'https://placehold.co/300x200/FF9800/FFFFFF/png?text=Vitamins', true),
('p6', 'f6a7b8c9-d0e1-2345-6789-0abcdef01234', 'Fresh Milk', '1 liter of fresh, full-fat milk.', 2.99, 'Dairy', 'https://placehold.co/300x200/4CAF50/FFFFFF/png?text=Milk', true),
('p7', 'f6a7b8c9-d0e1-2345-6789-0abcdef01234', 'Free-range Eggs', 'A dozen of large, free-range brown eggs.', 4.99, 'Dairy', 'https://placehold.co/300x200/FFEB3B/000000/png?text=Eggs', true);

-- Toppings
INSERT INTO toppings (id, product_id, name, price, is_required) VALUES
('t1', 'p1', 'Extra Cheese', 2.0, false),
('t2', 'p1', 'Mushrooms', 1.5, false),
('t3', 'p2', 'Bacon', 2.5, false),
('t4', 'p2', 'Avocado', 2.0, false);
