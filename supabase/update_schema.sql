CREATE TYPE ride_status AS ENUM (
    'PENDING',
    'ACCEPTED',
    'EN_ROUTE_TO_PICKUP',
    'ARRIVED_AT_PICKUP',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
    'REFUSED'
);

CREATE TABLE rides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) NOT NULL,
    deliverer_id UUID REFERENCES deliverers(id),
    vehicle_type vehicle_type NOT NULL,
    status ride_status NOT NULL,
    origin_latitude NUMERIC NOT NULL,
    origin_longitude NUMERIC NOT NULL,
    origin_description TEXT NOT NULL,
    destination_latitude NUMERIC NOT NULL,
    destination_longitude NUMERIC NOT NULL,
    destination_description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    estimated_duration TEXT,
    distance NUMERIC,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);
