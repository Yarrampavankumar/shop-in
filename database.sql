CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

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
('iPhone 15 Pro', 'Phones', 999.00, 'iphone.png', 'The latest iPhone with A17 Pro chip.'),
('Samsung Galaxy S24 Ultra', 'Phones', 1299.00, 'samsung.png', 'AI-powered smartphone with exceptional zoom.'),
('Google Pixel 8 Pro', 'Phones', 899.00, 'pixel.png', 'Advanced AI features and the best camera system.'),
('OnePlus 12', 'Phones', 799.00, 'oneplus.png', 'Incredible performance and battery life.'),
('MacBook Air M3', 'Laptops', 1099.00, 'macbook.png', 'Super lightweight and powerful laptop.'),
('Dell XPS 13', 'Laptops', 1199.00, 'dell.png', 'Beautiful infinity edge display and compact size.'),
('Lenovo ThinkPad X1 Carbon', 'Laptops', 1399.00, 'lenovo.png', 'The ultimate business laptop.'),
('ASUS ROG Zephyrus G14', 'Laptops', 1499.00, 'asus.png', 'Powerful gaming laptop in a portable chassis.');
