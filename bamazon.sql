DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("GameCube", "Electronics", 47.13, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Flash Shoes", "Footwear", 33.33, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gamer Glasses", "Electronics", 27.11, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cyclops Pashmina", "Apparel", 17.38, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Candy Corn 1lb bag", "Snacks", 10.10, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gravy Boat", "Kitchenware", 11.12, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pink Elephant", "Miscellaneous", 4000.47, 47);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Neon Green Yacht", "Boats", 999999.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo 32", "Electronics", 32.13, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Air Jordan Oreo II", "Footwear", 174.15, 5);