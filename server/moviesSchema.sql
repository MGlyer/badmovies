-- SET UP SCHEMA HERE
CREATE DATABASE favorites;

USE favorites

CREATE TABLE movies2 (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(150),
    img VARCHAR(100),
    votes INT,
    date VARCHAR(100),
    PRIMARY KEY (ID)
);