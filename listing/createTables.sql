

CREATE DATABASE IF NOT EXISTS cartier;
USE cartier;

CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE Shop (
    ShopID INT AUTO_INCREMENT PRIMARY KEY,
    ShopName VARCHAR(255) UNIQUE NOT NULL,
    Location VARCHAR(255)
);

CREATE TABLE Category (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Brand (
    BrandID INT AUTO_INCREMENT PRIMARY KEY,
    BrandName VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Product (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryID INT NOT NULL,
    BrandID INT NOT NULL,
    ProductName VARCHAR(255) NOT NULL,
    Description TEXT,
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID),
    FOREIGN KEY (BrandID) REFERENCES Brand(BrandID)
);

CREATE TABLE List (
    ListID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ShopID INT NOT NULL,
    Notes VARCHAR(225),
    ListName VARCHAR(255) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (ShopID) REFERENCES Shop(ShopID)
);

CREATE TABLE Item (
    ItemID INT AUTO_INCREMENT PRIMARY KEY,
    ListID INT NOT NULL,
    ProductID INT NOT NULL,
    ItemName VARCHAR(225) NOT NULL,
    Quantity INT NOT NULL,
    Purchased BOOLEAN NOT NULL,
    FOREIGN KEY (ListID) REFERENCES List(ListID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

CREATE TABLE Review (
    ReviewID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ShopID INT NOT NULL,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Comment TEXT,
    Date DATE NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (ShopID) REFERENCES Shop(ShopID)
);



--insert statements needed for teacher and grader

INSERT INTO category (CategoryName) VALUES ('Accessories');
INSERT INTO category (CategoryName) VALUES ('Electronics');
INSERT INTO category (CategoryName) VALUES ('Home Decor');
INSERT INTO category (CategoryName) VALUES ('Sporting Goods');
INSERT INTO category (CategoryName) VALUES ('Beauty & Personal Care');
INSERT INTO category (CategoryName) VALUES ('Books & Stationery');
INSERT INTO category (CategoryName) VALUES ('Health & Wellness');
INSERT INTO category (CategoryName) VALUES ('Toys & Games');





INSERT INTO Product (CategoryID, ProductName, Description) 
VALUES 
    (1, 'Running Shoes', 'High-quality running shoes for all terrains'),
    (1, 'Sneakers', 'Comfortable sneakers for everyday wear'),
    (1, 'Boots', 'Stylish and durable boots for any occasion'),
    (1, 'Sandals', 'Casual and comfortable sandals for summer days'),
    (1, 'Dress Shoes', 'Elegant dress shoes for formal events'),
    (2, 'T-Shirts', 'Basic and versatile t-shirts for everyday wear'),
    (2, 'Jeans', 'Classic denim jeans for any style'),
    (2, 'Dresses', 'Beautiful dresses for various occasions'),
    (2, 'Jackets', 'Stylish jackets to keep you warm in style'),
    (2, 'Suits', 'Tailored suits for a professional look'),
    (3, 'Hats', 'Fashionable hats to complement any outfit'),
    (3, 'Scarves', 'Soft and cozy scarves for chilly days'),
    (3, 'Belts', 'Stylish belts to add a finishing touch to your look'),
    (4, 'Smartphones', 'Latest smartphones with advanced features'),
    (4, 'Laptops', 'Powerful laptops for work and entertainment'),
    (4, 'Headphones', 'High-quality headphones for immersive audio experience'),
    (4, 'Cameras', 'Professional cameras for capturing memorable moments'),
    (4, 'Tablets', 'Portable tablets for productivity on the go'),
    (5, 'Wall Art', 'Beautiful wall art to enhance your home decor'),
    (5, 'Candles', 'Scented candles to create a cozy atmosphere'),
    (5, 'Rugs', 'Soft and luxurious rugs to add warmth to your floors'),
    (5, 'Mirrors', 'Elegant mirrors to brighten up your space'),
    (5, 'Decorative Pillows', 'Stylish pillows to add comfort and style to your sofa'),
    (6, 'Yoga Mats', 'High-quality yoga mats for your daily practice'),
    (6, 'Tennis Rackets', 'Durable tennis rackets for a competitive game'),
    (6, 'Bicycles', 'Stylish bicycles for commuting or leisure rides'),
    (6, 'Dumbbells', 'Heavy-duty dumbbells for strength training at home'),
    (6, 'Soccer Balls', 'Durable soccer balls for practice or matches'),
    (7, 'Skincare Products', 'Effective skincare products for healthy and glowing skin'),
    (7, 'Makeup Sets', 'Complete makeup sets for a flawless look'),
    (7, 'Hair Care Products', 'Premium hair care products for shiny and healthy hair'),
    (7, 'Fragrances', 'Exquisite fragrances for both men and women'),
    (7, 'Personal Care Tools', 'Essential personal care tools for grooming routines'),
    (8, 'Notebooks', 'High-quality notebooks for writing or sketching'),
    (8, 'Pens', 'Smooth-writing pens for everyday use'),
    (8, 'Planners', 'Organizational planners to keep you on track'),
    (8, 'Desk Organizers', 'Functional desk organizers to declutter your workspace'),
    (8, 'Sticky Notes', 'Colorful sticky notes for reminders and notes'),
    (9, 'Vitamins & Supplements', 'Essential vitamins and supplements for overall health'),
    (9, 'Fitness Equipment', 'Home fitness equipment for a convenient workout'),
    (9, 'Wellness Books', 'Informative books on health and wellness topics'),
    (9, 'Healthy Snacks', 'Nutritious snacks for guilt-free munching'),
    (9, 'Relaxation Products', 'Products to help you unwind and de-stress'),
    (10, 'Board Games', 'Classic board games for family fun nights'),
    (10, 'Action Figures', 'Collectible action figures for enthusiasts'),
    (10, 'Puzzles', 'Challenging puzzles for hours of entertainment'),
    (10, 'Building Blocks', 'Creative building blocks for imaginative play'),
    (10, 'Dolls', 'Adorable dolls for kids to play and imagine with');


INSERT INTO shop (ShopName, Location) VALUES ('Trader Joes', 'San Jose');
INSERT INTO shop (ShopName, Location) VALUES ('Target', 'San Jose');
INSERT INTO shop (ShopName, Location) VALUES ('Walmart', 'San Jose');
INSERT INTO shop (ShopName, Location) VALUES ('Costco', 'San Jose');
INSERT INTO shop (ShopName, Location) VALUES ('Safeway', 'San Jose');
INSERT INTO shop (ShopName, Location) VALUES ('Whole Foods Market', 'San Jose');
INSERT INTO shop (ShopName, Location) VALUES ('Sprouts Farmers Market', 'San Jose');
INSERT INTO shop (ShopName, Location) VALUES ('CVS Pharmacy', 'San Jose');

-- Reviews for Trader Joe's (ShopID 1)
INSERT INTO review (UserID, ShopID, Rating, Comment, Date) VALUES (1, 1, 5, 'Trader Joe''s has the best snacks!', '2024-05-08');
INSERT INTO review (UserID, ShopID, Rating, Comment, Date) VALUES (1, 1, 4, 'Love their selection of frozen foods.', '2024-05-08');

-- Reviews for Target (ShopID 2)
INSERT INTO review (UserID, ShopID, Rating, Comment, Date) VALUES (1, 2, 4, 'Target always has what I need.', '2024-05-08');
INSERT INTO review (UserID, ShopID, Rating, Comment, Date) VALUES (1, 2, 3, 'Prices are a bit high at times.', '2024-05-08');

-- Reviews for Walmart (ShopID 3)
INSERT INTO review (UserID, ShopID, Rating, Comment, Date) VALUES (1, 3, 3, 'Walmart is convenient but can be chaotic.', '2024-05-08');
INSERT INTO review (UserID, ShopID, Rating, Comment, Date) VALUES (1, 3, 2, 'Customer service needs improvement.', '2024-05-08');

-- Reviews for Costco (ShopID 4)
INSERT INTO review (UserID, ShopID, Rating, Comment, Date) VALUES (1, 4, 5, 'Costco has great deals and quality products.', '2024-05-08');
INSERT INTO review (UserID, ShopID, Rating, Comment, Date) VALUES (1, 4, 5, 'Love shopping at Costco!', '2024-05-08');
INSERT INTO review (UserID, ShopID, Rating, Comment, Date) VALUES (1, 5, 5, 'Great experience at Safeway!', '2024-05-08');
INSERT INTO review (UserID, ShopID, Rating, Comment, Date) VALUES (1, 6, 5, 'Always fresh produce at Whole Foods Market.', '2024-05-08');
INSERT INTO review (UserID, ShopID, Rating, Comment, Date) VALUES (1, 7, 4, 'Good selection at Sprouts Farmers Market.', '2024-05-08');
INSERT INTO review (UserID, ShopID, Rating, Comment, Date) VALUES (1, 8, 3, 'Average experience at CVS Pharmacy.', '2024-05-08');
-- Add more reviews for other shops as needed

--insert brands
INSERT INTO brand (BrandName) VALUES ('Trader joes');

-- Brands for Target (ShopID 2)
INSERT INTO brand (BrandName) VALUES ('Good & Gather');
INSERT INTO brand (BrandName) VALUES ('Cat and Jack');

-- Brands for Walmart (ShopID 3)
INSERT INTO brand (BrandName) VALUES ('Great Value');
INSERT INTO brand (BrandName) VALUES ('Sams Choice');

-- Brands for Costco (ShopID 4)
INSERT INTO brand (BrandName) VALUES ('Kirkland');
INSERT INTO brand (BrandName) VALUES ('Tmobile');

-- Link brands to Trader Joe's (ShopID 1)
INSERT INTO shopbrands (BrandID, ShopID) VALUES (3, 1); -- Traderjoes


-- Link brands to Target (ShopID 2)
INSERT INTO shopbrands (BrandID, ShopID) VALUES (5, 2); -- CatandJack
INSERT INTO shopbrands (BrandID, ShopID) VALUES (4, 2); -- Good&Gather


-- Link brands to Walmart (ShopID 3)

INSERT INTO shopbrands (BrandID, ShopID) VALUES (6, 3); -- GreatValue
INSERT INTO shopbrands (BrandID, ShopID) VALUES (7, 3); -- SamsChoice


-- Link brands to Costco (ShopID 4)
INSERT INTO shopbrands (BrandID, ShopID) VALUES (8, 4); -- Kirkland
INSERT INTO shopbrands (BrandID, ShopID) VALUES (9, 4); -- Tmobile
