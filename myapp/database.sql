/* create table & putting data into */

CREATE TABLE schedules ( id serial PRIMARY KEY, user_id INTEGER NOT NULL, day INTEGER NOT NULL, start_at VARCHAR NOT NULL, end_at VARCHAR NOT NULL );

CREATE TABLE users ( id serial PRIMARY KEY,
firstname VARCHAR NOT NULL,
lastname VARCHAR NOT NULL,
email VARCHAR NOT NULL,
password VARCHAR NOT NULL );

INSERT INTO users (firstname, lastname, email, password) VALUES ('James', 'Bond', 'james.bond@gmail.com', 'one'), ('Tony', 'Stark', 'starkrulz@gmail.com', 'two'), ('Ali', 'G', 'nameisnotborat@gmail.com', 'three');

INSERT INTO schedules (user_id, day, start_at, end_at) VALUES ('0', '1', '2PM', '4PM'), ('1', '2', '2PM', '4PM'), ('2', '3', '2PM', '4PM'), ('3', '5', '8AM', '6PM');