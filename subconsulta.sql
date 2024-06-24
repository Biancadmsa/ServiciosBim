-- Active: 1713566143574@@127.0.0.1@5432@humberto_bim
CREATE DATABASE humberto_bim;

CREATE TABLE mensajes_contacto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM mensajes_contacto;