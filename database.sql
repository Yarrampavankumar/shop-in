CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    description TEXT
);

TRUNCATE TABLE products;

INSERT INTO products (name, category, price, image_url, description) VALUES
('iPhone 15 Pro', 'Phones', 999.00, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop', 'The latest iPhone with A17 Pro chip.'),
('Samsung Galaxy S24 Ultra', 'Phones', 1299.00, 'https://images.unsplash.com/photo-1610940562853-f77259ecdd45?q=80&w=800&auto=format&fit=crop', 'AI-powered smartphone with exceptional zoom.'),
('Google Pixel 8 Pro', 'Phones', 899.00, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop', 'Advanced AI features and the best camera system.'),
('OnePlus 12', 'Phones', 799.00, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop', 'Incredible performance and battery life.'),
('MacBook Air M3', 'Laptops', 1099.00, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop', 'Super lightweight and powerful laptop.'),
('Dell XPS 13', 'Laptops', 1199.00, 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop', 'Beautiful infinity edge display and compact size.'),
('Lenovo ThinkPad X1 Carbon', 'Laptops', 1399.00, 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop', 'The ultimate business laptop.'),
('ASUS ROG Zephyrus G14', 'Laptops', 1499.00, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop', 'Powerful gaming laptop in a portable chassis.');
