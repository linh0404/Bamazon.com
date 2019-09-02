CREATE DATABASE products_db;

USE products_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2),
stock_quantity INT,
PRIMARY KEY(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sunbeam Rice Perfect Deluxe", "Kitchen", 59.95, 8),
("Breville, Toast & Melt", "Kitchen", 54.99, 12),
("Scanpan Impact Covered Wok", "Kitchen", 82.95, 4),
("Sheridan Living Textures Queen Towel Set", "Homewares", 34.50, 25),
("Dyson Pure Cool Desk Fan", "Home Appliances", 649.00, 7),
("Dyson Cyclone V11", "Home Appliances", 989.83, 5),
("Apple Airpods 2nd Gen", "Technology", 249.99, 18),
("Sonos One: Wireless Speaker", "Technology", 299.00, 24),
("Bellroy Note Sleeve Wallet", "Fashion", 119.00, 52),
("Bellroy Shift Backpack", "Sports", 299.00, 38);

SELECT * FROM products;

ALTER USER 'root'@'localhost' IDENTIFIED BY 'pae.mepaim2'; 

