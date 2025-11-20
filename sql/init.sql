-- Tabla de usuarios
CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    password VARCHAR(255),
    document_type VARCHAR(50),
    document_number VARCHAR(50) UNIQUE,
    phone_number VARCHAR(20),
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE products (
    id_product SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    size VARCHAR(20),
    quantity INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de imágenes de productos (puede haber varias imágenes por producto)
CREATE TABLE product_images (
    id_image SERIAL PRIMARY KEY,
    id_product INTEGER NOT NULL REFERENCES products(id_product) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL
);

-- Tabla de evaluaciones de productos (relaciona usuarios y productos)
CREATE TABLE product_evaluations (
    id_product_evaluation SERIAL PRIMARY KEY,
    id_product INTEGER NOT NULL REFERENCES products(id_product) ON DELETE CASCADE,
    id_user INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    assessment INTEGER CHECK (assessment BETWEEN 1 AND 5), -- por ejemplo, de 1 a 5 estrellas
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (id_product, id_user) -- un usuario evalúa una vez cada producto
);

-- Tabla de comentarios (puede haber varios comentarios por producto y usuario)
CREATE TABLE comments (
    id_comment SERIAL PRIMARY KEY,
    id_product INTEGER NOT NULL REFERENCES products(id_product) ON DELETE CASCADE,
    id_user INTEGER REFERENCES users(id_user) ON DELETE SET NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de carritos
CREATE TABLE carts (
    id_cart SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL DEFAULT 'active', -- active, completed, cancelled, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Elementos del carrito (relación muchos a muchos con productos)
CREATE TABLE cart_items (
    id_cart_item SERIAL PRIMARY KEY,
    id_cart INTEGER NOT NULL REFERENCES carts(id_cart) ON DELETE CASCADE,
    id_product INTEGER NOT NULL REFERENCES products(id_product) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (id_cart, id_product) -- un producto solo una vez por carrito
);