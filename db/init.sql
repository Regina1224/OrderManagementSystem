-- Order Management Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob DATE,
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table (belongs to a user)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    customer VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    product VARCHAR(200) NOT NULL,
    quantity INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Payments table (belongs to an order)
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users(first_name, last_name, password, dob, admin_notes) VALUES
('John', 'Smith', 'hashed_pw_001', '1990-05-12', NULL),
('Emma', 'Wilson', 'hashed_pw_002', '1988-11-03', 'VIP customer'),
('Liam', 'Chen', 'hashed_pw_003', NULL, NULL),
('Olivia', 'Brown', 'hashed_pw_004', '1995-02-27', NULL),
('Noah', 'Davis', 'hashed_pw_005', NULL, 'Flagged for review'),
('Ava', 'Martinez', 'hashed_pw_006', '1992-08-19', NULL),
('William', 'Taylor', 'hashed_pw_007', NULL, NULL),
('Sophia', 'Anderson', 'hashed_pw_008', '1993-12-01', NULL),
('James', 'Thomas', 'hashed_pw_009', NULL, 'Newsletter opt-out'),
('Isabella', 'Jackson', 'hashed_pw_010', '1991-07-08', NULL);

INSERT INTO orders(user_id, customer, category, product, quantity, status) VALUES
(1,'John Smith', 'Electronics', 'Laptop', 1, 'pending'),
(2, 'Emma Wilson', 'Clothing', 'Winter Jacket', 2, 'delivered'),
(1, 'John Smith', 'Food', 'Coffee Beans', 3, 'completed'),
(3, 'Liam Chen', 'Books', 'TypeScript Handbook', 1, 'pending'),
(4, 'Olivia Brown', 'Electronics', 'Wireless Mouse', 1, 'failed'),
(2, 'Emma Wilson', 'Clothing', 'Running Shoes', 1, 'completed'),
(5, 'Noah Davis', 'Food', 'Green Tea', 5, 'delivered'),
(3, 'Liam Chen', 'Electronics', 'Mechanical Keyboard', 1, 'pending'),
(6, 'Ava Martinez', 'Books', 'Clean Code', 2, 'completed'),
(4, 'Olivia Brown', 'Food', 'Olive Oil', 1, 'failed');

INSERT INTO payments(order_id, amount, status) VALUES
(1, 1299.99, 'succeeded'),
(2, 89.50, 'succeeded'),
(3, 24.00, 'succeeded'),
(4, 39.99, 'failed'),
(4, 39.99, 'succeeded'),
(5, 15.00, 'failed'),
(6, 65.00, 'succeeded'),
(7, 12.50, 'succeeded'),
(8, 99.00, 'succeeded'),
(9, 45.00, 'succeeded'),
(10, 18.75, 'failed'),
(10, 18.75, 'failed');