CREATE TYPE vehicle_type AS ENUM ('CAR', 'MOTORCYCLE', 'BICYCLE');
CREATE TYPE document_type AS ENUM ('ID_CARD', 'DRIVER_LICENSE', 'VEHICLE_REGISTRATION');
CREATE TYPE establishment_type AS ENUM ('RESTAURANT', 'BAKERY', 'FAST_FOOD', 'PHARMACY', 'SUPER_MARKET', 'COFFEE_SHOP', 'GROCERY', 'CONVENIENCE_STORE');
CREATE TYPE establishment_status AS ENUM ('OPEN', 'CLOSED', 'TEMPORARILY_UNAVAILABLE');
CREATE TYPE order_status AS ENUM ('PENDING', 'ACCEPTED', 'PREPARING', 'READY_FOR_PICKUP', 'PICKED_UP', 'DELIVERING', 'DELIVERED', 'CANCELLED', 'REFUSED');
CREATE TYPE payment_method_type AS ENUM ('CREDIT_CARD', 'CASH', 'MOBILE_MONEY', 'PAYCARD');
CREATE TYPE user_role AS ENUM ('CUSTOMER', 'DELIVERER');

CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    area TEXT NOT NULL,
    city TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    longitude NUMERIC NOT NULL,
    latitude NUMERIC NOT NULL,
    instructions TEXT
);

CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    country_code TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ,
    role user_role NOT NULL,
    address_id UUID REFERENCES addresses(id)
);

CREATE TABLE payment_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type payment_method_type NOT NULL,
    country_code TEXT,
    phone TEXT,
    owner_first_name TEXT,
    owner_last_name TEXT,
    card_last_4_digits TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ,
    customer_id UUID REFERENCES customers(id)
);

CREATE TABLE deliverers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    country_code TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    available BOOLEAN DEFAULT false,
    rate NUMERIC,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ,
    role user_role NOT NULL,
    address_id UUID REFERENCES addresses(id),
    payment_method_id UUID REFERENCES payment_methods(id)
);

CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plate_number TEXT NOT NULL,
    type vehicle_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ,
    deliverer_id UUID REFERENCES deliverers(id)
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id),
    establishment_id UUID REFERENCES establishments(id),
    deliverer_id UUID REFERENCES deliverers(id),
    status order_status NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    delivery_fee NUMERIC NOT NULL,
    total_price NUMERIC NOT NULL,
    delivering_address_id UUID REFERENCES addresses(id),
    estimated_delivery_time TEXT,
    updated_at TIMESTAMPTZ
);

CREATE TABLE order_product_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id),
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price NUMERIC NOT NULL,
    total_price NUMERIC NOT NULL,
    special_instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE order_product_line_toppings (
    product_line_id UUID REFERENCES order_product_lines(id),
    topping_id UUID REFERENCES toppings(id),
    PRIMARY KEY (product_line_id, topping_id)
);

CREATE TABLE sb_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    url TEXT NOT NULL,
    type document_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
    -- vehicle_id UUID REFERENCES vehicles(id)
    -- deliverer_id UUID REFERENCES deliverers(id)
);

CREATE TABLE vehicle_documents (
    vehicle_id UUID REFERENCES vehicles(id),
    sb_document_id UUID REFERENCES sb_documents(id),
    PRIMARY KEY (vehicle_id, sb_document_id)
);

CREATE TABLE deliverer_documents (
    deliverer_id UUID REFERENCES deliverers(id),
    sb_document_id UUID REFERENCES sb_documents(id),
    PRIMARY KEY (deliverer_id, sb_document_id)
);

CREATE TABLE establishments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type establishment_type NOT NULL,
    opening_hours JSONB NOT NULL,
    status establishment_status NOT NULL,
    delivery_fee NUMERIC NOT NULL,
    rate NUMERIC,
    delivery_time TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ,
    address_id UUID REFERENCES addresses(id)
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    establishment_id UUID REFERENCES establishments(id),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    category TEXT,
    url TEXT,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE toppings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    is_required BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);
