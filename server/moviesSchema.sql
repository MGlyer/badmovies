-- SET UP SCHEMA HERE
CREATE DATABASE badmovies;

USE badmovies

-- DROP TABLE IF EXISTS movies

CREATE TABLE movies (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(150),
    img VARCHAR(100),
    votes INT,
    date VARCHAR(100),
    PRIMARY KEY (ID)
);