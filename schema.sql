CREATE DATABASE IF NOT EXISTS giftogram;
USE giftogram;

CREATE TABLE users (
    user_id int AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL
);

CREATE TABLE messages (
    message_id int AUTO_INCREMENT PRIMARY KEY,
    sender_user_id int NOT NULL,
    receiver_user_id int NOT NULL,
    message TEXT NOT NULL,
    epoch INT NOT NULL,
    FOREIGN KEY (sender_user_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_user_id) REFERENCES users(user_id)    
);

SHOW TABLES;
DESCRIBE users;
DESCRIBE messages;

SELECT * FROM users;