DROP DATABASE IF EXISTS acid-rain;
CREATE DATABASE acid-rain;
USE acid-rain;
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  email varchar(255),
  password varchar(255),
  nickname varchar(255),
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
/* Create other tables and define schemas for them here! */
CREATE TABLE stages (
  id INT NOT NULL AUTO_INCREMENT,
  stageName varchar(255),
  contents varchar(255),
  createdBy varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE playlogs (
  id INT NOT NULL AUTO_INCREMENT,
  score INT(10000),
  missedCode varchar(255),
  userid varchar(255),
  stageid varchar(255),
  guestid varchar(255),
  createdAt datetime DEFAULT CURRENT_TIMESTAMP
  PRIMARY KEY (id)
);

CREATE TABLE guests (
  id INT NOT NULL AUTO_INCREMENT,
  nickname varchar(255),
  createdAt datetime DEFAULT CURRENT_TIMESTAMP
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/schema.sql
 *  to create the database and the tables.*/