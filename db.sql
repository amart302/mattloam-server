use mattLoam;

drop table bookings;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(12) NOT NULL,
    role ENUM("admin", "user") DEFAULT "user",
    password VARCHAR(255) NOT NULL,
    isVerified BOOLEAN DEFAULT false,
    verificationCode INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    phoneNumber VARCHAR(12),
    roomId INT NOT NULL,
    dateOfEntry DATE NOT NULL,
    departureDate DATE NOT NULL,
    adults INT NOT NULL,
    children INT NOT NULL,
    status ENUM("active", "pending") DEFAULT "pending",
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE,
    INDEX (userId),
    INDEX (roomId)
);

CREATE TABLE rooms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    mainImage VARCHAR(255) NOT NULL,
    files JSON NOT NULL,
    priceFrom INT NOT NULL,
    pricing JSON NOT NULL,
    description TEXT NOT NULL,
    guests INT NOT NULL,
    beds INT NOT NULL,
    bedrooms INT NOT NULL,
    floor INT NOT NULL,
    services JSON NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);