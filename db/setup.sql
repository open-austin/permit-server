CREATE EXTENSION postgis;

CREATE TABLE airport_zones (
  id serial PRIMARY KEY,
  dateCreated timestamp DEFAULT current_timestamp,
  geom geometry
);

CREATE TABLE floodplain_zones (
  id serial PRIMARY KEY,
  dateCreated timestamp DEFAULT current_timestamp,
  geom geometry
);

CREATE TABLE historic_zones (
  id serial PRIMARY KEY,
  dateCreated timestamp DEFAULT current_timestamp,
  geom geometry
);
