DROP DATABASE IF EXISTS acidrain;
CREATE DATABASE acidrain;
USE acidrain;
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email varchar(255),
  password varchar(255),
  nickname varchar(255),
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
);
/* Create other tables and define schemas for them here! */
CREATE TABLE stages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  stageName varchar(255),
  contents varchar(255),
  createdBy varchar(255),
);

CREATE TABLE playlogs (
  id int PRIMARY KEY AUTO_INCREMENT,
  score INT(10000),
  missedCode varchar(255),
  userid varchar(255),
  stageid varchar(255),
  guestid varchar(255),
  createdAt datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE guests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nickname varchar(255),
  createdAt datetime DEFAULT CURRENT_TIMESTAMP
);

/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/schema.sql
 server/schema.sql
 *  to create the database and the tables.*/