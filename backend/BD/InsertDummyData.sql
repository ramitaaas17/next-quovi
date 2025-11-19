-- =============================================
-- DATOS SINTÉTICOS - RESTAURANTES REALES CDMX
-- Base de datos: quovi_db
-- =============================================
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;
SET collation_connection = utf8mb4_unicode_ci;

USE quovi_db;
-- =============================================
-- 1. INSERTAR CIUDADES
-- =============================================
INSERT INTO ciudades (nombreCiudad, estado, pais, latitud, longitud) VALUES
('Ciudad de México', 'CDMX', 'México', 19.432608, -99.133209);

SET @idCDMX = LAST_INSERT_ID();

-- =============================================
-- 2. INSERTAR CATEGORÍAS DE COCINA
-- =============================================
INSERT INTO categorias_cocina (nombreCategoria, descripcion, icono) VALUES
('Mexicana', 'Comida tradicional mexicana', '🌮'),
('Tacos', 'Especialidad en tacos', '🌮'),
('Mariscos', 'Pescados y mariscos frescos', '🦐'),
('Italiana', 'Cocina italiana auténtica', '🍝'),
('Japonesa', 'Sushi y cocina japonesa', '🍣'),
('Hamburguesas', 'Burgers gourmet y clásicas', '🍔'),
('Postres', 'Repostería y postres', '🍰'),
('Cafetería', 'Café de especialidad', '☕'),
('Vegana', 'Opciones 100% veganas', '🥗'),
('Argentina', 'Parrilla y cortes argentinos', '🥩'),
('Alitas', 'Alitas y comida americana', '🍗'),
('Antojitos', 'Antojitos mexicanos', '🫔'),
('Internacional', 'Fusión y cocina internacional', '🌍'),
('Desayunos', 'Especialidad en desayunos', '🍳'),
('Pizzas', 'Pizzas artesanales', '🍕');

-- =============================================
-- 3. INSERTAR CARACTERÍSTICAS
-- =============================================
INSERT INTO caracteristicas (nombreCaracteristica, descripcion, icono) VALUES
('WiFi Gratis', 'Internet inalámbrico disponible', '📶'),
('Estacionamiento', 'Estacionamiento disponible', '🅿️'),
('Terraza', 'Área al aire libre', '🌳'),
('Pet Friendly', 'Se admiten mascotas', '🐕'),
('Delivery', 'Servicio a domicilio', '🚚'),
('Para Llevar', 'Comida para llevar', '🥡'),
('Reservaciones', 'Se aceptan reservaciones', '📅'),
('Accesible', 'Acceso para sillas de ruedas', '♿'),
('Bar', 'Barra de bebidas alcohólicas', '🍺'),
('Música en Vivo', 'Presentaciones musicales', '🎵'),
('Buffet', 'Servicio tipo buffet', '🍽️'),
('Aire Acondicionado', 'Clima controlado', '❄️'),
('Pagos con Tarjeta', 'Acepta tarjetas de crédito/débito', '💳'),
('Pago con Efectivo', 'Acepta efectivo', '💵'),
('Opciones Veganas', 'Platillos veganos disponibles', '🌱');

-- =============================================
-- 4. INSERTAR RESTAURANTES REALES
-- =============================================

-- RESTAURANTE 1: El Califa
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('El Califa', 'Av. Ribera de San Cosme 56, San Rafael, Cuauhtémoc', @idCDMX, 19.437889, -99.163728, '5555462020', 'https://www.elcalifa.com.mx', 'Tacos de gaonera reconocidos por su calidad y tradición desde 1968. Especialidad en cortes finos servidos en tortilla.', 150.00, TRUE);
SET @idCalifa = LAST_INSERT_ID();

-- RESTAURANTE 2: Contramar
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Contramar', 'Calle Durango 200, Roma Norte, Cuauhtémoc', @idCDMX, 19.419444, -99.166111, '5555140217', 'https://www.contramar.com.mx', 'Restaurante de mariscos emblema de la Roma. Famoso por su tostada de atún y pescado a la talla.', 450.00, TRUE);
SET @idContramar = LAST_INSERT_ID();

-- RESTAURANTE 3: Pizzeria Gioia
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Pizzeria Gioia', 'Av. Nuevo León 107, Hipódromo Condesa, Cuauhtémoc', @idCDMX, 19.408333, -99.174167, '5556872173', 'https://www.pizzeriagioia.com', 'Pizzería napolitana auténtica con horno de leña. Masa madre fermentada 72 horas.', 280.00, TRUE);
SET @idGioia = LAST_INSERT_ID();

-- RESTAURANTE 4: Taquería Orinoco
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Taquería Orinoco', 'Av. Tamaulipas 30, Hipódromo Condesa, Cuauhtémoc', @idCDMX, 19.410556, -99.169722, '5552861937', 'https://www.taqueriaorinoco.com', 'Tacos al pastor icónicos de la Condesa. El trompo gira desde 1968, tradición familiar.', 120.00, TRUE);
SET @idOrinoco = LAST_INSERT_ID();

-- RESTAURANTE 5: Rokai Ramen
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Rokai Ramen', 'Calle Frontera 168, Roma Norte, Cuauhtémoc', @idCDMX, 19.420833, -99.165000, '5556877898', 'https://www.rokairamen.com', 'Ramen auténtico japonés. Caldo preparado por 18 horas, fideos hechos en casa.', 220.00, TRUE);
SET @idRokai = LAST_INSERT_ID();

-- RESTAURANTE 6: Butcher & Sons
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Butcher & Sons', 'Av. Amsterdam 239, Hipódromo Condesa, Cuauhtémoc', @idCDMX, 19.409444, -99.172222, '5552116266', 'https://www.butcherandsons.com.mx', 'Hamburgueserías gourmet con carne de res añejada. Ambiente casual y moderno.', 250.00, TRUE);
SET @idButcher = LAST_INSERT_ID();

-- RESTAURANTE 7: Panadería Rosetta
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Panadería Rosetta', 'Calle Havre 73, Juárez, Cuauhtémoc', @idCDMX, 19.426111, -99.164167, '5555338805', 'https://www.rosetta.com.mx', 'Panadería artesanal italiana. Famosa por sus roles de guayaba y pan de masa madre.', 180.00, TRUE);
SET @idRosetta = LAST_INSERT_ID();

-- RESTAURANTE 8: Expendio de Maíz
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Expendio de Maíz Sin Nombre', 'Alejandro Dumas 42, Polanco, Miguel Hidalgo', @idCDMX, 19.434167, -99.189722, '5556823466', 'https://www.expendiodemaiz.com', 'Cocina mexicana contemporánea basada en maíz nativo. Experiencia gastronómica única.', 350.00, TRUE);
SET @idExpendio = LAST_INSERT_ID();

-- RESTAURANTE 9: Wings Army
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Wings Army', 'Ámsterdam 123, Condesa, Cuauhtémoc', @idCDMX, 19.411389, -99.170833, '5555847321', 'https://www.wingsarmy.com.mx', 'Alitas estilo Buffalo con más de 30 salsas diferentes. Ambiente deportivo.', 200.00, TRUE);
SET @idWings = LAST_INSERT_ID();

-- RESTAURANTE 10: Lardo
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Lardo', 'Agustín Melgar 6, Condesa, Cuauhtémoc', @idCDMX, 19.410000, -99.170556, '5555535488', 'https://www.lardo.com.mx', 'Cocina mediterránea casual. Famoso por sus focaccias, pastas frescas y ambiente relajado.', 280.00, TRUE);
SET @idLardo = LAST_INSERT_ID();

-- =============================================
-- 5. RELACIONAR RESTAURANTES CON CATEGORÍAS
-- =============================================

-- El Califa
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idCalifa, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Tacos')),
(@idCalifa, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mexicana'));

-- Contramar
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idContramar, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mariscos')),
(@idContramar, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mexicana'));

-- Gioia
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idGioia, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Italiana')),
(@idGioia, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Pizzas'));

-- Orinoco
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idOrinoco, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Tacos')),
(@idOrinoco, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Antojitos'));

-- Rokai
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idRokai, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Japonesa'));

-- Butcher & Sons
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idButcher, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Hamburguesas')),
(@idButcher, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Internacional'));

-- Rosetta
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idRosetta, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Postres')),
(@idRosetta, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Desayunos')),
(@idRosetta, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Cafetería'));

-- Expendio de Maíz
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idExpendio, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mexicana')),
(@idExpendio, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Internacional'));

-- Wings Army
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idWings, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Alitas'));

-- Lardo
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idLardo, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Italiana')),
(@idLardo, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Internacional'));

-- =============================================
-- 6. CARACTERÍSTICAS DE RESTAURANTES
-- =============================================

-- El Califa
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idCalifa, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idCalifa, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Delivery')),
(@idCalifa, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta')),
(@idCalifa, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- Contramar
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idContramar, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Reservaciones')),
(@idContramar, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Bar')),
(@idContramar, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Aire Acondicionado')),
(@idContramar, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- Gioia
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idGioia, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Terraza')),
(@idGioia, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pet Friendly')),
(@idGioia, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idGioia, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Opciones Veganas')),
(@idGioia, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- Orinoco
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idOrinoco, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idOrinoco, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo')),
(@idOrinoco, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Terraza'));

-- Rokai
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idRokai, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Delivery')),
(@idRokai, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idRokai, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Aire Acondicionado')),
(@idRokai, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta')),
(@idRokai, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Opciones Veganas'));

-- Butcher & Sons
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idButcher, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Bar')),
(@idButcher, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Delivery')),
(@idButcher, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idButcher, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Terraza')),
(@idButcher, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- Rosetta
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idRosetta, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'WiFi Gratis')),
(@idRosetta, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idRosetta, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Aire Acondicionado')),
(@idRosetta, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- Expendio de Maíz
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idExpendio, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Reservaciones')),
(@idExpendio, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Bar')),
(@idExpendio, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Aire Acondicionado')),
(@idExpendio, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta')),
(@idExpendio, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Accesible'));

-- Wings Army
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idWings, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Delivery')),
(@idWings, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idWings, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Bar')),
(@idWings, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Música en Vivo')),
(@idWings, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- Lardo
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idLardo, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Bar')),
(@idLardo, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Terraza')),
(@idLardo, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'WiFi Gratis')),
(@idLardo, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Opciones Veganas')),
(@idLardo, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- =============================================
-- 7. PLATILLOS - MENÚ COMPLETO
-- =============================================

-- PLATILLOS EL CALIFA
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idCalifa, 'Taco de Gaonera', 48.00, 'Corte de res estilo gaonera en tortilla recién hecha', 'Carne de res, tortilla de maíz, cebolla, cilantro, limón', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, TRUE),
(@idCalifa, 'Taco de Costilla', 52.00, 'Costilla de res finamente cortada', 'Costilla de res, tortilla, cebolla, cilantro, salsa verde', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, TRUE),
(@idCalifa, 'Taco de Suadero', 42.00, 'Suadero tradicional estilo CDMX', 'Suadero, tortilla, cebolla, cilantro, salsa roja', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, FALSE),
(@idCalifa, 'Taco de Arrachera', 55.00, 'Arrachera marinada al carbón', 'Arrachera, tortilla, guacamole, cebolla asada', 'https://images.unsplash.com/photo-1613514785940-daed07799d9b', TRUE, FALSE),
(@idCalifa, 'Volcán de Queso con Carne', 85.00, 'Tortilla de queso gratinado rellena', 'Queso fundido, carne asada, tortilla, jalapeños', 'https://images.unsplash.com/photo-1582169296194-e4d644c48063', TRUE, TRUE),
(@idCalifa, 'Orden de Guacamole', 75.00, 'Guacamole preparado al momento', 'Aguacate, cebolla, cilantro, jitomate, chile serrano', 'https://images.unsplash.com/photo-1604909052925-56e2b1e6e90a', TRUE, FALSE),
(@idCalifa, 'Alambres de Carne', 180.00, 'Alambres con queso y tortillas', 'Carne, pimientos, cebolla, tocino, queso fundido', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84', TRUE, FALSE),
(@idCalifa, 'Quesadilla de Carne', 95.00, 'Quesadilla con queso y carne', 'Tortilla de harina, queso, carne asada, crema', 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, FALSE);

-- PLATILLOS CONTRAMAR
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idContramar, 'Tostada de Atún', 185.00, 'Tostada icónica con atún fresco marinado', 'Atún, tostada, aguacate, chile serrano, soya', 'https://images.unsplash.com/photo-1559737558-2f5a2c2f9b8d', TRUE, TRUE),
(@idContramar, 'Pescado a la Talla', 420.00, 'Pescado entero asado con adobo especial', 'Pescado robalo, adobo de chiles, limón, especias', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2', TRUE, TRUE),
(@idContramar, 'Ceviche Clásico', 225.00, 'Ceviche fresco del día', 'Pescado blanco, limón, cebolla morada, cilantro, chile', 'https://images.unsplash.com/photo-1501959915551-4e8d30928317', TRUE, TRUE),
(@idContramar, 'Tacos de Pescado', 195.00, 'Tres tacos de pescado empanizado', 'Pescado, tortilla, col, chipotle mayo, limón', 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5', TRUE, FALSE),
(@idContramar, 'Camarones al Coco', 385.00, 'Camarones empanizados en coco', 'Camarones, coco rallado, salsa agridulce', 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47', TRUE, FALSE),
(@idContramar, 'Ensalada Verde', 145.00, 'Ensalada mixta con vinagreta', 'Lechugas variadas, pepino, jitomate, vinagreta de limón', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', TRUE, FALSE),
(@idContramar, 'Aguachile Verde', 265.00, 'Camarones en salsa picante verde', 'Camarones, chile serrano, limón, pepino, cebolla', 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41', TRUE, TRUE),
(@idContramar, 'Pulpo al Carbón', 445.00, 'Pulpo asado con papas', 'Pulpo, papas cambray, pimiento, aceite de oliva', 'https://images.unsplash.com/photo-1605522561233-768ad7a8fabf', TRUE, FALSE);

-- PLATILLOS GIOIA
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idGioia, 'Pizza Margherita', 245.00, 'Pizza napolitana clásica', 'Masa madre, tomate San Marzano, mozzarella, albahaca', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002', TRUE, TRUE),
(@idGioia, 'Pizza Diavola', 285.00, 'Pizza con salami picante', 'Masa madre, tomate, mozzarella, salami picante, aceite chile', 'https://images.unsplash.com/photo-1628840042765-356cda07504e', TRUE, TRUE),
(@idGioia, 'Pizza Quattro Formaggi', 295.00, 'Pizza de cuatro quesos', 'Masa madre, mozzarella, gorgonzola, parmesano, pecorino', 'https://images.unsplash.com/photo-1571407970349-bc81e7e96a47', TRUE, FALSE),
(@idGioia, 'Pizza Prosciutto e Funghi', 305.00, 'Pizza con jamón y hongos', 'Masa madre, tomate, mozzarella, prosciutto, champiñones', 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5', TRUE, FALSE),
(@idGioia, 'Burrata con Tomates', 195.00, 'Queso burrata fresco con tomates', 'Burrata, tomates cherry, albahaca, aceite de oliva, balsámico', 'https://images.unsplash.com/photo-1617343267888-ce527f67f057', TRUE, TRUE),
(@idGioia, 'Antipasto Misto', 265.00, 'Selección de antipastos italianos', 'Prosciutto, salame, quesos, aceitunas, pimientos', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1', TRUE, FALSE),
(@idGioia, 'Tiramisú', 125.00, 'Postre italiano clásico', 'Mascarpone, café, bizcocho, cacao', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9', TRUE, FALSE),
(@idGioia, 'Panna Cotta', 115.00, 'Postre de crema italiana', 'Crema, vainilla, coulis de frutos rojos', 'https://images.unsplash.com/photo-1488477181946-6428a0291777', TRUE, FALSE);

-- PLATILLOS ORINOCO
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idOrinoco, 'Taco al Pastor', 38.00, 'Taco al pastor tradicional', 'Carne al pastor, piña, cebolla, cilantro, tortilla', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idOrinoco, 'Taco de Arrachera', 42.00, 'Taco de arrachera marinada', 'Arrachera, tortilla, guacamole, cebolla', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, FALSE),
(@idOrinoco, 'Taco de Costilla', 40.00, 'Taco de costilla adobada', 'Costilla, tortilla, salsa verde, cebolla, cilantro', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, FALSE),
(@idOrinoco, 'Gringa', 85.00, 'Tortilla de harina con queso y pastor', 'Tortilla de harina, pastor, queso fundido, piña', 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, TRUE),
(@idOrinoco, 'Vampiro', 90.00, 'Tortilla tostada con queso y carne', 'Tortilla tostada, queso, carne asada, salsa', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, FALSE),
(@idOrinoco, 'Orden de Pastor', 180.00, 'Media orden de carne al pastor', 'Carne al pastor, tortillas, cebolla, cilantro, limón, piña', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, FALSE),
(@idOrinoco, 'Quesadilla de Pastor', 75.00, 'Quesadilla con queso y pastor', 'Tortilla, queso, pastor, cebolla, cilantro', 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, FALSE),
(@idOrinoco, 'Alambre Mixto', 195.00, 'Alambre con pastor y arrachera', 'Pastor, arrachera, pimientos, cebolla, queso, tocino', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84', TRUE, FALSE);

-- PLATILLOS ROKAI RAMEN
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idRokai, 'Tonkotsu Ramen', 215.00, 'Ramen con caldo de hueso de cerdo 18hrs', 'Caldo tonkotsu, fideos, chashu, huevo marinado, negi, nori', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624', TRUE, TRUE),
(@idRokai, 'Shoyu Ramen', 195.00, 'Ramen con caldo de soya', 'Caldo de soya, fideos, chashu, menma, huevo, negi', 'https://images.unsplash.com/photo-1623341214825-9f4f963727da', TRUE, TRUE),
(@idRokai, 'Miso Ramen', 205.00, 'Ramen con pasta de miso', 'Caldo miso, fideos, chashu, maíz, huevo, mantequilla', 'https://images.unsplash.com/photo-1617093727343-374698b1b08d', TRUE, FALSE),
(@idRokai, 'Spicy Tan Tan Ramen', 225.00, 'Ramen picante estilo tantanmen', 'Caldo picante, fideos, carne molida, pak choi, huevo, chile', 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1', TRUE, TRUE),
(@idRokai, 'Gyoza de Cerdo', 95.00, 'Dumplings fritos (6 piezas)', 'Cerdo, repollo, jengibre, ajo, salsa ponzu', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec', TRUE, FALSE),
(@idRokai, 'Edamame', 65.00, 'Vainas de soya con sal de mar', 'Edamame, sal marina', 'https://images.unsplash.com/photo-1626200340540-c4f8e52af0ed', TRUE, FALSE),
(@idRokai, 'Karaage', 125.00, 'Pollo frito estilo japonés', 'Pollo marinado, harina de papa, salsa mayo picante', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec', TRUE, FALSE),
(@idRokai, 'Arroz Frito', 115.00, 'Arroz salteado con verduras', 'Arroz, huevo, verduras, salsa de soya, aceite de ajonjolí', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b', TRUE, FALSE);

-- PLATILLOS BUTCHER & SONS
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idButcher, 'Classic Burger', 185.00, 'Hamburguesa clásica con queso', 'Carne añejada, queso cheddar, lechuga, jitomate, cebolla, pepinillos', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', TRUE, TRUE),
(@idButcher, 'BBQ Bacon Burger', 215.00, 'Hamburguesa con tocino y BBQ', 'Carne, tocino, queso, aros de cebolla, salsa BBQ', 'https://images.unsplash.com/photo-1550547660-d9450f859349', TRUE, TRUE),
(@idButcher, 'Blue Cheese Burger', 225.00, 'Hamburguesa con queso azul', 'Carne, queso azul, arúgula, cebolla caramelizada, reducción balsámica', 'https://images.unsplash.com/photo-1553979459-d2229ba7433b', TRUE, FALSE),
(@idButcher, 'Mexican Burger', 205.00, 'Hamburguesa estilo mexicano', 'Carne, queso, guacamole, jalapeños, chipotle mayo', 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5', TRUE, FALSE),
(@idButcher, 'Papas Gajo', 85.00, 'Papas gajo con especias', 'Papas, especias, crema agria, cebollín', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877', TRUE, FALSE),
(@idButcher, 'Aros de Cebolla', 95.00, 'Aros de cebolla crujientes', 'Cebolla, empanizado, salsa ranch', 'https://images.unsplash.com/photo-1639024471283-03518883512d', TRUE, FALSE),
(@idButcher, 'Costillas BBQ', 285.00, 'Media rack de costillas', 'Costillas de cerdo, salsa BBQ casera, ensalada de col', 'https://images.unsplash.com/photo-1544025162-d76694265947', TRUE, TRUE),
(@idButcher, 'Ensalada César', 145.00, 'Ensalada césar con pollo', 'Lechuga romana, pollo, crutones, parmesano, aderezo césar', 'https://images.unsplash.com/photo-1546793665-c74683f339c1', TRUE, FALSE);

-- PLATILLOS ROSETTA
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idRosetta, 'Rol de Guayaba', 65.00, 'Icónico rol relleno de guayaba', 'Masa madre, mermelada de guayaba, queso crema', 'https://images.unsplash.com/photo-1509440159596-0249088772ff', TRUE, TRUE),
(@idRosetta, 'Croissant de Mantequilla', 55.00, 'Croissant hojaldrado francés', 'Harina, mantequilla francesa, levadura', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a', TRUE, TRUE),
(@idRosetta, 'Pan de Chocolate', 60.00, 'Pain au chocolat tradicional', 'Masa hojaldrada, chocolate belga', 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e', TRUE, FALSE),
(@idRosetta, 'Focaccia', 85.00, 'Focaccia italiana con aceite de oliva', 'Harina, aceite de oliva, romero, sal marina', 'https://images.unsplash.com/photo-1621952268783-82257f996fc9', TRUE, FALSE),
(@idRosetta, 'Huevos Benedictinos', 165.00, 'Huevos pochados con jamón', 'Huevos, jamón, muffin inglés, salsa holandesa', 'https://images.unsplash.com/photo-1608039755401-742074f0548d', TRUE, TRUE),
(@idRosetta, 'Chilaquiles Verdes', 145.00, 'Chilaquiles con salsa verde', 'Tortillas, salsa verde, crema, queso, cebolla, huevo', 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41', TRUE, FALSE),
(@idRosetta, 'Café Latte', 65.00, 'Espresso con leche vaporizada', 'Café espresso, leche', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735', TRUE, FALSE),
(@idRosetta, 'Cappuccino', 68.00, 'Espresso con espuma de leche', 'Café espresso, leche, espuma', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d', TRUE, FALSE);

-- PLATILLOS EXPENDIO DE MAÍZ
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idExpendio, 'Degustación de Maíces', 485.00, 'Degustación de 5 tipos de maíz nativo', 'Maíces nativos, salsas artesanales, acompañamientos', 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85', TRUE, TRUE),
(@idExpendio, 'Tetela de Huitlacoche', 195.00, 'Tetela rellena de huitlacoche', 'Masa de maíz azul, huitlacoche, queso, epazote', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idExpendio, 'Esquites Gourmet', 145.00, 'Esquites de maíz nativo', 'Maíz cacahuacintle, epazote, chile, mayonesa, queso', 'https://images.unsplash.com/photo-1562346713-03b18e53065f', TRUE, FALSE),
(@idExpendio, 'Tamales de Mole', 165.00, 'Tamal de mole negro oaxaqueño', 'Masa de maíz, mole negro, pollo, hoja de plátano', 'https://images.unsplash.com/photo-1606309331686-458b1f89d902', TRUE, FALSE),
(@idExpendio, 'Sopa de Elote', 135.00, 'Sopa cremosa de elote', 'Maíz dulce, caldo de vegetales, crema, epazote', 'https://images.unsplash.com/photo-1547592166-23ac45744acd', TRUE, FALSE),
(@idExpendio, 'Tlayuda Especial', 225.00, 'Tlayuda oaxaqueña gourmet', 'Tortilla grande, asiento, frijoles, tasajo, quesillo, aguacate', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idExpendio, 'Memela de Chapulín', 175.00, 'Memela con chapulines oaxaqueños', 'Masa de maíz, frijoles, chapulines, queso, salsa', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, FALSE),
(@idExpendio, 'Mezcal Artesanal', 185.00, 'Copa de mezcal (2oz)', 'Mezcal artesanal de Oaxaca', 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b', TRUE, FALSE);

-- PLATILLOS WINGS ARMY
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idWings, '10 Alitas Buffalo', 165.00, 'Alitas clásicas estilo Buffalo', 'Alitas, salsa buffalo, apio, aderezo ranch', 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7', TRUE, TRUE),
(@idWings, '10 Alitas BBQ', 165.00, 'Alitas con salsa BBQ', 'Alitas, salsa BBQ, miel, apio', 'https://images.unsplash.com/photo-1527477396000-e27163b481c2', TRUE, FALSE),
(@idWings, '10 Alitas Habanero', 165.00, 'Alitas picantes de habanero', 'Alitas, salsa habanero, mango, chile', 'https://images.unsplash.com/photo-1624726175512-19b9baf9422b', TRUE, TRUE),
(@idWings, '10 Alitas Mango Habanero', 175.00, 'Alitas agridulces picantes', 'Alitas, mango, habanero, miel', 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7', TRUE, FALSE),
(@idWings, 'Boneless (250g)', 155.00, 'Tiras de pollo empanizadas', 'Pechuga de pollo, empanizado, salsa a elegir', 'https://images.unsplash.com/photo-1562967914-608f82629710', TRUE, FALSE),
(@idWings, 'Dedos de Queso', 125.00, 'Dedos de queso mozzarella', 'Queso mozzarella, empanizado, marinara', 'https://images.unsplash.com/photo-1548340748-6d2b7d7da280', TRUE, FALSE),
(@idWings, 'Papas con Queso', 115.00, 'Papas fritas con queso fundido', 'Papas, queso cheddar, tocino, cebollín, crema', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877', TRUE, FALSE),
(@idWings, 'Hamburguesa Buffalo', 185.00, 'Hamburguesa con pollo buffalo', 'Pollo, salsa buffalo, queso azul, lechuga, jitomate', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', TRUE, FALSE);

-- PLATILLOS LARDO
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idLardo, 'Focaccia de Mortadela', 165.00, 'Focaccia con mortadela italiana', 'Focaccia casera, mortadela, burrata, pistacho, rúcula', 'https://images.unsplash.com/photo-1509722747041-616f39b57569', TRUE, TRUE),
(@idLardo, 'Pasta Carbonara', 195.00, 'Pasta cremosa con guanciale', 'Pasta, huevo, guanciale, pecorino, pimienta negra', 'https://images.unsplash.com/photo-1612874742237-6526221588e3', TRUE, TRUE),
(@idLardo, 'Pasta Cacio e Pepe', 175.00, 'Pasta simple con queso y pimienta', 'Pasta, pecorino romano, pimienta negra, mantequilla', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9', TRUE, FALSE),
(@idLardo, 'Pasta Pomodoro', 165.00, 'Pasta con salsa de tomate fresco', 'Pasta, tomate San Marzano, albahaca, ajo, aceite de oliva', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9', TRUE, FALSE),
(@idLardo, 'Ensalada Caprese', 155.00, 'Ensalada italiana clásica', 'Tomate, mozzarella, albahaca, aceite de oliva, balsámico', 'https://images.unsplash.com/photo-1608897013039-887f21d8c804', TRUE, FALSE),
(@idLardo, 'Arancini', 135.00, 'Bolitas de arroz fritas (4 piezas)', 'Arroz, queso mozzarella, ragú, empanizado', 'https://images.unsplash.com/photo-1633504581786-316c8002b1b9', TRUE, FALSE),
(@idLardo, 'Tiramisú', 125.00, 'Postre italiano tradicional', 'Mascarpone, café, bizcocho, cacao', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9', TRUE, TRUE),
(@idLardo, 'Affogato', 95.00, 'Helado con espresso', 'Helado de vainilla, espresso doble', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb', TRUE, FALSE);

-- =============================================
-- 8. HORARIOS DE RESTAURANTES
-- =============================================

-- El Califa (Lunes a Domingo: 1pm-11pm)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idCalifa, 1, '13:00:00', '23:00:00', FALSE),
(@idCalifa, 2, '13:00:00', '23:00:00', FALSE),
(@idCalifa, 3, '13:00:00', '23:00:00', FALSE),
(@idCalifa, 4, '13:00:00', '23:00:00', FALSE),
(@idCalifa, 5, '13:00:00', '23:00:00', FALSE),
(@idCalifa, 6, '13:00:00', '23:00:00', FALSE),
(@idCalifa, 7, '13:00:00', '23:00:00', FALSE);

-- Contramar (Lunes cerrado, Ma-Ju: 1pm-6pm, Vi-Do: 1pm-7pm)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idContramar, 1, '00:00:00', '00:00:00', TRUE),
(@idContramar, 2, '13:00:00', '18:00:00', FALSE),
(@idContramar, 3, '13:00:00', '18:00:00', FALSE),
(@idContramar, 4, '13:00:00', '18:00:00', FALSE),
(@idContramar, 5, '13:00:00', '19:00:00', FALSE),
(@idContramar, 6, '13:00:00', '19:00:00', FALSE),
(@idContramar, 7, '13:00:00', '19:00:00', FALSE);

-- Gioia (Martes a Domingo: 1pm-10pm, Lunes cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idGioia, 1, '00:00:00', '00:00:00', TRUE),
(@idGioia, 2, '13:00:00', '22:00:00', FALSE),
(@idGioia, 3, '13:00:00', '22:00:00', FALSE),
(@idGioia, 4, '13:00:00', '22:00:00', FALSE),
(@idGioia, 5, '13:00:00', '22:00:00', FALSE),
(@idGioia, 6, '13:00:00', '23:00:00', FALSE),
(@idGioia, 7, '13:00:00', '23:00:00', FALSE);

-- Orinoco (Lunes a Domingo: 1pm-2am)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idOrinoco, 1, '13:00:00', '02:00:00', FALSE),
(@idOrinoco, 2, '13:00:00', '02:00:00', FALSE),
(@idOrinoco, 3, '13:00:00', '02:00:00', FALSE),
(@idOrinoco, 4, '13:00:00', '02:00:00', FALSE),
(@idOrinoco, 5, '13:00:00', '02:00:00', FALSE),
(@idOrinoco, 6, '13:00:00', '02:00:00', FALSE),
(@idOrinoco, 7, '13:00:00', '02:00:00', FALSE);

-- Rokai (Lunes a Sábado: 2pm-11pm, Domingo: 2pm-10pm)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idRokai, 1, '14:00:00', '23:00:00', FALSE),
(@idRokai, 2, '14:00:00', '23:00:00', FALSE),
(@idRokai, 3, '14:00:00', '23:00:00', FALSE),
(@idRokai, 4, '14:00:00', '23:00:00', FALSE),
(@idRokai, 5, '14:00:00', '23:00:00', FALSE),
(@idRokai, 6, '14:00:00', '23:00:00', FALSE),
(@idRokai, 7, '14:00:00', '22:00:00', FALSE);

-- Butcher & Sons (Lunes a Domingo: 1pm-11pm)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idButcher, 1, '13:00:00', '23:00:00', FALSE),
(@idButcher, 2, '13:00:00', '23:00:00', FALSE),
(@idButcher, 3, '13:00:00', '23:00:00', FALSE),
(@idButcher, 4, '13:00:00', '23:00:00', FALSE),
(@idButcher, 5, '13:00:00', '00:00:00', FALSE),
(@idButcher, 6, '13:00:00', '00:00:00', FALSE),
(@idButcher, 7, '13:00:00', '23:00:00', FALSE);

-- Rosetta (Lunes a Sábado: 7am-6pm, Domingo: 8am-4pm)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idRosetta, 1, '07:00:00', '18:00:00', FALSE),
(@idRosetta, 2, '07:00:00', '18:00:00', FALSE),
(@idRosetta, 3, '07:00:00', '18:00:00', FALSE),
(@idRosetta, 4, '07:00:00', '18:00:00', FALSE),
(@idRosetta, 5, '07:00:00', '18:00:00', FALSE),
(@idRosetta, 6, '07:00:00', '18:00:00', FALSE),
(@idRosetta, 7, '08:00:00', '16:00:00', FALSE);

-- Expendio de Maíz (Martes a Sábado: 2pm-11pm, Dom-Lun cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idExpendio, 1, '00:00:00', '00:00:00', TRUE),
(@idExpendio, 2, '00:00:00', '00:00:00', TRUE),
(@idExpendio, 3, '14:00:00', '23:00:00', FALSE),
(@idExpendio, 4, '14:00:00', '23:00:00', FALSE),
(@idExpendio, 5, '14:00:00', '23:00:00', FALSE),
(@idExpendio, 6, '14:00:00', '23:00:00', FALSE),
(@idExpendio, 7, '14:00:00', '23:00:00', FALSE);

-- Wings Army (Lunes a Domingo: 1pm-12am)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idWings, 1, '13:00:00', '00:00:00', FALSE),
(@idWings, 2, '13:00:00', '00:00:00', FALSE),
(@idWings, 3, '13:00:00', '00:00:00', FALSE),
(@idWings, 4, '13:00:00', '00:00:00', FALSE),
(@idWings, 5, '13:00:00', '01:00:00', FALSE),
(@idWings, 6, '13:00:00', '01:00:00', FALSE),
(@idWings, 7, '13:00:00', '00:00:00', FALSE);

-- Lardo (Martes a Domingo: 1pm-11pm, Lunes cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idLardo, 1, '00:00:00', '00:00:00', TRUE),
(@idLardo, 2, '13:00:00', '23:00:00', FALSE),
(@idLardo, 3, '13:00:00', '23:00:00', FALSE),
(@idLardo, 4, '13:00:00', '23:00:00', FALSE),
(@idLardo, 5, '13:00:00', '23:00:00', FALSE),
(@idLardo, 6, '13:00:00', '23:00:00', FALSE),
(@idLardo, 7, '13:00:00', '23:00:00', FALSE);

-- =============================================
-- 9. IMÁGENES DE RESTAURANTES
-- =============================================

-- El Califa
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idCalifa, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, 1),
(@idCalifa, 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', FALSE, 2),
(@idCalifa, 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', FALSE, 3);

-- Contramar
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idContramar, 'https://images.unsplash.com/photo-1559737558-2f5a2c2f9b8d', TRUE, 1),
(@idContramar, 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2', FALSE, 2),
(@idContramar, 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41', FALSE, 3);

-- Gioia
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idGioia, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002', TRUE, 1),
(@idGioia, 'https://images.unsplash.com/photo-1571407970349-bc81e7e96a47', FALSE, 2),
(@idGioia, 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5', FALSE, 3);

-- Orinoco
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idOrinoco, 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, 1),
(@idOrinoco, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', FALSE, 2);

-- Rokai
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idRokai, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624', TRUE, 1),
(@idRokai, 'https://images.unsplash.com/photo-1623341214825-9f4f963727da', FALSE, 2),
(@idRokai, 'https://images.unsplash.com/photo-1617093727343-374698b1b08d', FALSE, 3);

-- Butcher & Sons
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idButcher, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', TRUE, 1),
(@idButcher, 'https://images.unsplash.com/photo-1550547660-d9450f859349', FALSE, 2);

-- Rosetta
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idRosetta, 'https://images.unsplash.com/photo-1509440159596-0249088772ff', TRUE, 1),
(@idRosetta, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a', FALSE, 2);

-- Expendio de Maíz
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idExpendio, 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85', TRUE, 1),
(@idExpendio, 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', FALSE, 2);

-- Wings Army
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idWings, 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7', TRUE, 1),
(@idWings, 'https://images.unsplash.com/photo-1527477396000-e27163b481c2', FALSE, 2);

-- Lardo
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idLardo, 'https://images.unsplash.com/photo-1509722747041-616f39b57569', TRUE, 1),
(@idLardo, 'https://images.unsplash.com/photo-1612874742237-6526221588e3', FALSE, 2);

-- =============================================
-- 10. RESEÑAS DE EJEMPLO (Datos sintéticos)
-- =============================================

-- Primero insertamos usuarios de ejemplo
INSERT INTO usuarios (nombreUsuario, email, password, nombre, apellido, provider, emailVerificado) VALUES
('maria_g', 'maria.garcia@email.com', '$2b$10$abcdefghijklmnopqrstuvwxyz123456', 'María', 'García', 'local', TRUE),
('carlos_r', 'carlos.rodriguez@email.com', '$2b$10$abcdefghijklmnopqrstuvwxyz123456', 'Carlos', 'Rodríguez', 'local', TRUE),
('ana_m', 'ana.martinez@email.com', '$2b$10$abcdefghijklmnopqrstuvwxyz123456', 'Ana', 'Martínez', 'local', TRUE),
('luis_h', 'luis.hernandez@email.com', '$2b$10$abcdefghijklmnopqrstuvwxyz123456', 'Luis', 'Hernández', 'local', TRUE),
('sofia_l', 'sofia.lopez@email.com', '$2b$10$abcdefghijklmnopqrstuvwxyz123456', 'Sofía', 'López', 'local', TRUE);

SET @idMaria = (SELECT idUsuario FROM usuarios WHERE nombreUsuario = 'maria_g');
SET @idCarlos = (SELECT idUsuario FROM usuarios WHERE nombreUsuario = 'carlos_r');
SET @idAna = (SELECT idUsuario FROM usuarios WHERE nombreUsuario = 'ana_m');
SET @idLuis = (SELECT idUsuario FROM usuarios WHERE nombreUsuario = 'luis_h');
SET @idSofia = (SELECT idUsuario FROM usuarios WHERE nombreUsuario = 'sofia_l');

-- Reseñas El Califa
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idMaria, @idCalifa, 5, 'Los mejores tacos de gaonera que he probado. La carne es de excelente calidad y las tortillas están recién hechas. Totalmente recomendado.', TRUE),
(@idCarlos, @idCalifa, 5, 'Un clásico de la CDMX. El taco de costilla es espectacular. Vale cada peso.', TRUE),
(@idAna, @idCalifa, 4, 'Muy buenos tacos, aunque a veces hay que esperar un poco. El sabor lo vale.', TRUE);

-- Reseñas Contramar
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idLuis, @idContramar, 5, 'La tostada de atún es icónica por algo. El pescado a la talla también es increíble. Ambiente perfecto.', TRUE),
(@idSofia, @idContramar, 5, 'Mariscos fresquísimos. El servicio es excelente y el lugar tiene un ambiente muy agradable.', TRUE),
(@idMaria, @idContramar, 4, 'Excelente comida, aunque es un poco caro. Perfecto para ocasiones especiales.', TRUE);

-- Reseñas Gioia
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idCarlos, @idGioia, 5, 'Pizza napolitana auténtica. La masa es perfecta y los ingredientes son de calidad. La terraza es pet friendly!', TRUE),
(@idAna, @idGioia, 5, 'Me encanta este lugar. La burrata está deliciosa y las pizzas son las mejores de la ciudad.', TRUE);

-- Reseñas Orinoco
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idLuis, @idOrinoco, 5, 'Tradición pura. El pastor es espectacular y las gringas son adictivas. Ambiente casual y precio justo.', TRUE),
(@idSofia, @idOrinoco, 4, 'Buenos tacos al pastor. El lugar es pequeño pero tiene su encanto. Recomiendo las vampiros.', TRUE);

-- Reseñas Rokai
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idMaria, @idRokai, 5, 'El tonkotsu ramen es auténtico. Se nota que preparan el caldo con dedicación. Los gyozas también están muy buenos.', TRUE),
(@idCarlos, @idRokai, 5, 'Ramen de calidad en CDMX. El spicy tan tan es mi favorito. Porciones generosas.', TRUE);

-- Reseñas Butcher & Sons
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idAna, @idButcher, 5, 'Las hamburguesas son gourmet de verdad. La carne está perfectamente cocinada. Las costillas BBQ son enormes!', TRUE),
(@idLuis, @idButcher, 4, 'Buenas hamburguesas, ambiente agradable. Los aros de cebolla están crujientes y deliciosos.', TRUE);

-- Reseñas Rosetta
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idSofia, @idRosetta, 5, 'El rol de guayaba es lo mejor que existe. Los croissants están perfectos. Vale la pena la fila.', TRUE),
(@idMaria, @idRosetta, 5, 'Panadería artesanal de primer nivel. Todo está delicioso. El café también es excelente.', TRUE);

-- Reseñas Expendio de Maíz
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idCarlos, @idExpendio, 5, 'Experiencia gastronómica única. La degustación de maíces es fascinante. Cocina mexicana contemporánea al máximo.', TRUE),
(@idAna, @idExpendio, 5, 'Cada platillo es una obra de arte. Los sabores son increíbles y aprenden mucho sobre el maíz nativo.', TRUE);

-- Reseñas Wings Army
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idLuis, @idWings, 4, 'Gran variedad de salsas para las alitas. Ambiente deportivo perfecto para ver el partido con amigos.', TRUE),
(@idSofia, @idWings, 4, 'Las alitas habanero son muy picantes pero deliciosas. Buenos precios y porciones generosas.', TRUE);

-- Reseñas Lardo
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idMaria, @idLardo, 5, 'La focaccia de mortadela es espectacular. Pastas frescas y ambiente relajado. Muy recomendable.', TRUE),
(@idCarlos, @idLardo, 5, 'Cocina mediterránea casual bien ejecutada. La carbonara está perfecta y el tiramisú es delicioso.', TRUE);

-- =============================================
-- 11. AGREGAR MÁS RESTAURANTES REALES
-- =============================================

-- RESTAURANTE 11: Quintonil
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Quintonil', 'Av. Isaac Newton 55, Polanco, Miguel Hidalgo', @idCDMX, 19.433889, -99.193889, '5552804408', 'https://www.quintonil.com', 'Alta cocina mexicana contemporánea. Ingredientes locales y técnicas innovadoras. Estrella Michelin.', 1200.00, TRUE);
SET @idQuintonil = LAST_INSERT_ID();

-- RESTAURANTE 12: Maximo Bistrot
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Maximo Bistrot', 'Calle Tonalá 133, Roma Norte, Cuauhtémoc', @idCDMX, 19.419722, -99.166389, '5552640291', 'https://www.maximobistrot.com.mx', 'Bistrot de mercado con menú cambiante. Cocina de temporada con ingredientes frescos del mercado.', 650.00, TRUE);
SET @idMaximo = LAST_INSERT_ID();

-- RESTAURANTE 13: Pujol
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Pujol', 'Tennyson 133, Polanco, Miguel Hidalgo', @idCDMX, 19.434167, -99.194444, '5555454111', 'https://www.pujol.com.mx', 'Restaurante del chef Enrique Olvera. Cocina mexicana de vanguardia. Entre los mejores de Latinoamérica.', 2500.00, TRUE);
SET @idPujol = LAST_INSERT_ID();

-- RESTAURANTE 14: Taquería El Güero
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Taquería El Güero', 'Calle Ámsterdam 164, Condesa, Cuauhtémoc', @idCDMX, 19.410278, -99.170833, '5552869773', 'https://www.taqueriaelguero.com', 'Taquería tradicional familiar. Tacos de guisado caseros y agua de frutas naturales.', 95.00, TRUE);
SET @idGuero = LAST_INSERT_ID();

-- RESTAURANTE 15: Sushi Kanpai
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Kanpai', 'Calle Michoacán 45, Condesa, Cuauhtémoc', @idCDMX, 19.410000, -99.170000, '5552868733', 'https://www.kanpai.com.mx', 'Sushi bar japonés. Rolls creativos y sashimi fresco. Barra de sake premium.', 380.00, TRUE);
SET @idKanpai = LAST_INSERT_ID();

-- RESTAURANTE 16: Parrilla Argentina Don Asado
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Don Asado Parrilla Argentina', 'Av. Insurgentes Sur 1605, San José Insurgentes, Benito Juárez', @idCDMX, 19.370833, -99.172222, '5555988470', 'https://www.donasado.com.mx', 'Parrilla argentina auténtica. Cortes de res importados y vinos argentinos.', 480.00, TRUE);
SET @idDonAsado = LAST_INSERT_ID();

-- RESTAURANTE 17: Café Avellaneda
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Café Avellaneda', 'Calle Guanajuato 138, Roma Norte, Cuauhtémoc', @idCDMX, 19.418056, -99.166667, '5555847321', 'https://www.cafeavellaneda.com', 'Cafetería de especialidad. Métodos de extracción y repostería artesanal.', 120.00, TRUE);
SET @idAvellaneda = LAST_INSERT_ID();

-- RESTAURANTE 18: Fonda Fina
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Fonda Fina', 'Calle Medellín 79, Roma Norte, Cuauhtémoc', @idCDMX, 19.419444, -99.165556, '5555148834', 'https://www.fondafina.com', 'Cocina mexicana contemporánea. Platillos creativos con base tradicional.', 320.00, TRUE);
SET @idFondaFina = LAST_INSERT_ID();

-- RESTAURANTE 19: La Docena
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('La Docena', 'Calle Álvaro Obregón 31, Roma Norte, Cuauhtémoc', @idCDMX, 19.419167, -99.167778, '5552088637', 'https://www.ladocena.mx', 'Oyster bar y mariscos. Ostiones frescos y cocteles especializados.', 420.00, TRUE);
SET @idDocena = LAST_INSERT_ID();

-- RESTAURANTE 20: Blend Station
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Blend Station', 'Calle Córdoba 107, Roma Norte, Cuauhtémoc', @idCDMX, 19.417500, -99.165833, '5556621234', 'https://www.blendstation.com.mx', 'Bowls saludables y smoothies. Opciones veganas y vegetarianas. Ambiente wellness.', 145.00, TRUE);
SET @idBlend = LAST_INSERT_ID();

-- =============================================
-- Categorías para nuevos restaurantes
-- =============================================

-- Quintonil
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idQuintonil, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mexicana')),
(@idQuintonil, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Internacional'));

-- Maximo Bistrot
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idMaximo, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Internacional'));

-- Pujol
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idPujol, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mexicana')),
(@idPujol, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Internacional'));

-- El Güero
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idGuero, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Tacos')),
(@idGuero, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Antojitos')),
(@idGuero, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Desayunos'));

-- Kanpai
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idKanpai, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Japonesa'));

-- Don Asado
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idDonAsado, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Argentina'));

-- Avellaneda
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idAvellaneda, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Cafetería')),
(@idAvellaneda, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Postres')),
(@idAvellaneda, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Desayunos'));

-- Fonda Fina
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idFondaFina, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mexicana')),
(@idFondaFina, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Internacional'));

-- La Docena
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idDocena, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mariscos'));

-- Blend Station
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(@idBlend, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Vegana')),
(@idBlend, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Desayunos'));

-- =============================================
-- Características para nuevos restaurantes
-- =============================================

-- Quintonil
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idQuintonil, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Reservaciones')),
(@idQuintonil, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Bar')),
(@idQuintonil, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Aire Acondicionado')),
(@idQuintonil, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Accesible')),
(@idQuintonil, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- Maximo Bistrot
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idMaximo, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Reservaciones')),
(@idMaximo, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Bar')),
(@idMaximo, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Opciones Veganas')),
(@idMaximo, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- Pujol
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idPujol, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Reservaciones')),
(@idPujol, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Bar')),
(@idPujol, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Aire Acondicionado')),
(@idPujol, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Accesible')),
(@idPujol, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- El Güero
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idGuero, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idGuero, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Delivery')),
(@idGuero, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo')),
(@idGuero, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- Kanpai
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idKanpai, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Bar')),
(@idKanpai, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Delivery')),
(@idKanpai, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idKanpai, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- Don Asado
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idDonAsado, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Reservaciones')),
(@idDonAsado, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Bar')),
(@idDonAsado, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Estacionamiento')),
(@idDonAsado, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Aire Acondicionado')),
(@idDonAsado, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- Avellaneda
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idAvellaneda, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'WiFi Gratis')),
(@idAvellaneda, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idAvellaneda, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Opciones Veganas')),
(@idAvellaneda, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- Fonda Fina
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idFondaFina, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Bar')),
(@idFondaFina, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Reservaciones')),
(@idFondaFina, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Opciones Veganas')),
(@idFondaFina, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- La Docena
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idDocena, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Bar')),
(@idDocena, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Terraza')),
(@idDocena, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Reservaciones')),
(@idDocena, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- Blend Station
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idBlend, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'WiFi Gratis')),
(@idBlend, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idBlend, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Delivery')),
(@idBlend, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Opciones Veganas')),
(@idBlend, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- =============================================
-- PLATILLOS para nuevos restaurantes
-- =============================================

-- QUINTONIL
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idQuintonil, 'Menú Degustación', 2400.00, 'Experiencia completa de 8 tiempos', 'Ingredientes de temporada, técnicas mexicanas contemporáneas', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0', TRUE, TRUE),
(@idQuintonil, 'Aguachile de Camarón', 385.00, 'Camarones con chiles mexicanos', 'Camarón, chile manzano, lima, pepino', 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41', TRUE, FALSE),
(@idQuintonil, 'Mole Madre', 520.00, 'Mole con más de 1000 días de fermentación', 'Mole negro, ingredientes nativos', 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85', TRUE, TRUE);

-- MAXIMO BISTROT
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idMaximo, 'Ensalada del Mercado', 245.00, 'Ensalada con ingredientes del día', 'Verduras frescas del mercado, vinagreta', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', TRUE, TRUE),
(@idMaximo, 'Risotto de Hongos', 385.00, 'Risotto cremoso con hongos locales', 'Arroz arborio, hongos silvestres, parmesano', 'https://images.unsplash.com/photo-1476124369491-b79d48fddb0e', TRUE, FALSE),
(@idMaximo, 'Cordero Braseado', 565.00, 'Cordero cocido lentamente', 'Cordero, vegetales de temporada, jus', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba', TRUE, TRUE);

-- PUJOL
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idPujol, 'Menú Taco Omakase', 3200.00, 'Experiencia de 7 tacos gourmet', 'Ingredientes premium, técnicas vanguardistas', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, TRUE),
(@idPujol, 'Menú Maíz', 4500.00, 'Degustación completa (9 tiempos)', 'Ingredientes mexicanos de temporada', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0', TRUE, TRUE);

-- EL GÜERO
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idGuero, 'Taco de Guisado', 28.00, 'Tacos de guisado casero', 'Guisados variados, tortilla, salsa', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idGuero, 'Quesadilla de Chicharrón', 55.00, 'Quesadilla con chicharrón prensado', 'Tortilla, queso, chicharrón, salsa verde', 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, FALSE),
(@idGuero, 'Chilaquiles', 85.00, 'Chilaquiles verdes o rojos', 'Tortillas, salsa, queso, crema, cebolla', 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41', TRUE, TRUE),
(@idGuero, 'Agua de Horchata', 35.00, 'Agua fresca natural de horchata', 'Arroz, canela, vainilla', 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87', TRUE, FALSE);

-- KANPAI
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idKanpai, 'Sashimi Variado', 385.00, 'Selección de 12 piezas', 'Salmón, atún, hamachi, pulpo', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351', TRUE, TRUE),
(@idKanpai, 'Roll Philadelphia', 185.00, 'Roll con salmón y queso crema', 'Salmón, queso crema, aguacate, pepino', 'https://images.unsplash.com/photo-1617196034183-421b4917c92d', TRUE, FALSE),
(@idKanpai, 'Roll Tempura', 195.00, 'Roll empanizado con salsa especial', 'Camarón tempura, aguacate, salsa anguila', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351', TRUE, FALSE),
(@idKanpai, 'Nigiri Salmón', 95.00, 'Dos piezas de nigiri', 'Salmón fresco, arroz', 'https://images.unsplash.com/photo-1617196034183-421b4917c92d', TRUE, FALSE);

-- DON ASADO
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idDonAsado, 'Bife de Chorizo', 485.00, 'Corte argentino premium (350g)', 'Carne de res importada, chimichurri, papas', 'https://images.unsplash.com/photo-1558030006-450675393462', TRUE, TRUE),
(@idDonAsado, 'Ojo de Bife', 520.00, 'Ribeye argentino (400g)', 'Ribeye importado, sal parrillera, guarnición', 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6', TRUE, TRUE),
(@idDonAsado, 'Vacío', 445.00, 'Corte vacío argentino (300g)', 'Vacío, chimichurri, ensalada criolla', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba', TRUE, FALSE),
(@idDonAsado, 'Provoleta', 185.00, 'Queso provolone a la parrilla', 'Queso provolone, orégano, aceite de oliva', 'https://images.unsplash.com/photo-1452195100486-9cc805987862', TRUE, FALSE),
(@idDonAsado, 'Empanadas Argentinas', 145.00, 'Tres empanadas caseras', 'Carne, cebolla, aceitunas, huevo, especias', 'https://images.unsplash.com/photo-1601050690597-df0568f70950', TRUE, FALSE);

-- AVELLANEDA
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idAvellaneda, 'Café Filtrado V60', 75.00, 'Café de origen único', 'Café de especialidad, método V60', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085', TRUE, TRUE),
(@idAvellaneda, 'Flat White', 70.00, 'Espresso con microespuma', 'Espresso doble, leche vaporizada', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d', TRUE, FALSE),
(@idAvellaneda, 'Cold Brew', 80.00, 'Café en frío 24hrs', 'Café en extracción fría', 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7', TRUE, FALSE),
(@idAvellaneda, 'Tarta de Limón', 95.00, 'Tarta de limón casera', 'Limón, merengue, base de galleta', 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13', TRUE, TRUE),
(@idAvellaneda, 'Croissant de Almendra', 75.00, 'Croissant relleno de almendra', 'Masa hojaldrada, crema de almendra', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a', TRUE, FALSE),
(@idAvellaneda, 'Pan Tostado con Aguacate', 125.00, 'Toast con aguacate y huevo', 'Pan masa madre, aguacate, huevo pochado', 'https://images.unsplash.com/photo-1525351484163-7529414344d8', TRUE, TRUE);

-- FONDA FINA
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idFondaFina, 'Tostadas de Atún', 225.00, 'Tostadas con atún marinado', 'Atún, aguacate, chile serrano, soya', 'https://images.unsplash.com/photo-1559737558-2f5a2c2f9b8d', TRUE, TRUE),
(@idFondaFina, 'Pulpo al Carbón', 385.00, 'Pulpo con puré de camote', 'Pulpo, camote morado, chile pasilla', 'https://images.unsplash.com/photo-1605522561233-768ad7a8fabf', TRUE, TRUE),
(@idFondaFina, 'Enmoladas de Pollo', 265.00, 'Tortillas bañadas en mole', 'Pollo, mole negro, sésamo, cebolla', 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85', TRUE, FALSE),
(@idFondaFina, 'Pescado Zarandeado', 345.00, 'Pescado al carbón estilo Nayarit', 'Pescado, adobo, verduras asadas', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2', TRUE, FALSE);

-- LA DOCENA
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idDocena, 'Ostiones Frescos', 320.00, 'Media docena de ostiones', 'Ostiones frescos, limón, salsa mignonette', 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58', TRUE, TRUE),
(@idDocena, 'Aguachile Rojo', 285.00, 'Camarones en salsa picante', 'Camarones, chile chiltepin, pepino, limón', 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41', TRUE, TRUE),
(@idDocena, 'Ceviche Mixto', 295.00, 'Ceviche de pescado y camarón', 'Pescado, camarón, limón, cebolla morada, cilantro', 'https://images.unsplash.com/photo-1501959915551-4e8d30928317', TRUE, FALSE),
(@idDocena, 'Tacos de Pescado', 225.00, 'Tres tacos de pescado empanizado', 'Pescado, col, chipotle, limón', 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5', TRUE, FALSE),
(@idDocena, 'Camarones al Coco', 365.00, 'Camarones empanizados en coco', 'Camarones jumbo, coco, salsa dulce', 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47', TRUE, FALSE);

-- BLEND STATION
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idBlend, 'Açai Bowl', 145.00, 'Bowl de açai con granola', 'Açai, plátano, granola, miel, frutos rojos', 'https://images.unsplash.com/photo-1590301157890-4810ed352733', TRUE, TRUE),
(@idBlend, 'Green Bowl', 135.00, 'Bowl verde detox', 'Espinaca, kale, aguacate, quinoa, pepino', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', TRUE, TRUE),
(@idBlend, 'Smoothie Proteico', 115.00, 'Smoothie con proteína vegetal', 'Plátano, proteína, mantequilla de almendra, leche vegetal', 'https://images.unsplash.com/photo-1505252585461-04db1eb84625', TRUE, FALSE),
(@idBlend, 'Ensalada Buddha Bowl', 155.00, 'Bowl completo con proteínas', 'Quinoa, garbanzos, hummus, verduras, tahini', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', TRUE, TRUE),
(@idBlend, 'Avocado Toast Deluxe', 125.00, 'Pan con aguacate y toppings', 'Pan integral, aguacate, tomate, ajonjolí', 'https://images.unsplash.com/photo-1525351484163-7529414344d8', TRUE, FALSE),
(@idBlend, 'Jugo Verde Detox', 85.00, 'Jugo natural verde', 'Apio, pepino, espinaca, jengibre, limón', 'https://images.unsplash.com/photo-1610970881699-44a5587cabec', TRUE, FALSE);

-- =============================================
-- HORARIOS para nuevos restaurantes
-- =============================================

-- Quintonil (Martes a Sábado: 1:30pm-11pm, Dom-Lun cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idQuintonil, 1, '00:00:00', '00:00:00', TRUE),
(@idQuintonil, 2, '00:00:00', '00:00:00', TRUE),
(@idQuintonil, 3, '13:30:00', '23:00:00', FALSE),
(@idQuintonil, 4, '13:30:00', '23:00:00', FALSE),
(@idQuintonil, 5, '13:30:00', '23:00:00', FALSE),
(@idQuintonil, 6, '13:30:00', '23:00:00', FALSE),
(@idQuintonil, 7, '13:30:00', '23:00:00', FALSE);

-- Maximo Bistrot (Martes a Sábado: 1pm-11pm, Dom-Lun cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idMaximo, 1, '00:00:00', '00:00:00', TRUE),
(@idMaximo, 2, '00:00:00', '00:00:00', TRUE),
(@idMaximo, 3, '13:00:00', '23:00:00', FALSE),
(@idMaximo, 4, '13:00:00', '23:00:00', FALSE),
(@idMaximo, 5, '13:00:00', '23:00:00', FALSE),
(@idMaximo, 6, '13:00:00', '23:00:00', FALSE),
(@idMaximo, 7, '13:00:00', '23:00:00', FALSE);

-- Pujol (Lunes a Sábado: 1:30pm-11pm, Domingo cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idPujol, 1, '00:00:00', '00:00:00', TRUE),
(@idPujol, 2, '13:30:00', '23:00:00', FALSE),
(@idPujol, 3, '13:30:00', '23:00:00', FALSE),
(@idPujol, 4, '13:30:00', '23:00:00', FALSE),
(@idPujol, 5, '13:30:00', '23:00:00', FALSE),
(@idPujol, 6, '13:30:00', '23:00:00', FALSE),
(@idPujol, 7, '13:30:00', '23:00:00', FALSE);

-- El Güero (Lunes a Domingo: 9am-6pm)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idGuero, 1, '09:00:00', '18:00:00', FALSE),
(@idGuero, 2, '09:00:00', '18:00:00', FALSE),
(@idGuero, 3, '09:00:00', '18:00:00', FALSE),
(@idGuero, 4, '09:00:00', '18:00:00', FALSE),
(@idGuero, 5, '09:00:00', '18:00:00', FALSE),
(@idGuero, 6, '09:00:00', '18:00:00', FALSE),
(@idGuero, 7, '09:00:00', '18:00:00', FALSE);

-- Kanpai (Martes a Domingo: 2pm-11pm, Lunes cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idKanpai, 1, '00:00:00', '00:00:00', TRUE),
(@idKanpai, 2, '14:00:00', '23:00:00', FALSE),
(@idKanpai, 3, '14:00:00', '23:00:00', FALSE),
(@idKanpai, 4, '14:00:00', '23:00:00', FALSE),
(@idKanpai, 5, '14:00:00', '23:00:00', FALSE),
(@idKanpai, 6, '14:00:00', '23:30:00', FALSE),
(@idKanpai, 7, '14:00:00', '23:00:00', FALSE);

-- Don Asado (Lunes a Domingo: 1pm-11pm)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idDonAsado, 1, '13:00:00', '23:00:00', FALSE),
(@idDonAsado, 2, '13:00:00', '23:00:00', FALSE),
(@idDonAsado, 3, '13:00:00', '23:00:00', FALSE),
(@idDonAsado, 4, '13:00:00', '23:00:00', FALSE),
(@idDonAsado, 5, '13:00:00', '23:00:00', FALSE),
(@idDonAsado, 6, '13:00:00', '00:00:00', FALSE),
(@idDonAsado, 7, '13:00:00', '23:00:00', FALSE);

-- Avellaneda (Lunes a Viernes: 7am-7pm, Sábado-Domingo: 8am-8pm)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idAvellaneda, 1, '07:00:00', '19:00:00', FALSE),
(@idAvellaneda, 2, '07:00:00', '19:00:00', FALSE),
(@idAvellaneda, 3, '07:00:00', '19:00:00', FALSE),
(@idAvellaneda, 4, '07:00:00', '19:00:00', FALSE),
(@idAvellaneda, 5, '07:00:00', '19:00:00', FALSE),
(@idAvellaneda, 6, '08:00:00', '20:00:00', FALSE),
(@idAvellaneda, 7, '08:00:00', '20:00:00', FALSE);

-- Fonda Fina (Martes a Sábado: 1pm-11pm, Domingo: 1pm-6pm, Lunes cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idFondaFina, 1, '00:00:00', '00:00:00', TRUE),
(@idFondaFina, 2, '13:00:00', '23:00:00', FALSE),
(@idFondaFina, 3, '13:00:00', '23:00:00', FALSE),
(@idFondaFina, 4, '13:00:00', '23:00:00', FALSE),
(@idFondaFina, 5, '13:00:00', '23:00:00', FALSE),
(@idFondaFina, 6, '13:00:00', '23:00:00', FALSE),
(@idFondaFina, 7, '13:00:00', '18:00:00', FALSE);

-- La Docena (Lunes a Domingo: 1pm-11pm)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idDocena, 1, '13:00:00', '23:00:00', FALSE),
(@idDocena, 2, '13:00:00', '23:00:00', FALSE),
(@idDocena, 3, '13:00:00', '23:00:00', FALSE),
(@idDocena, 4, '13:00:00', '23:00:00', FALSE),
(@idDocena, 5, '13:00:00', '00:00:00', FALSE),
(@idDocena, 6, '13:00:00', '00:00:00', FALSE),
(@idDocena, 7, '13:00:00', '23:00:00', FALSE);

-- Blend Station (Lunes a Sábado: 8am-8pm, Domingo: 9am-6pm)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idBlend, 1, '08:00:00', '20:00:00', FALSE),
(@idBlend, 2, '08:00:00', '20:00:00', FALSE),
(@idBlend, 3, '08:00:00', '20:00:00', FALSE),
(@idBlend, 4, '08:00:00', '20:00:00', FALSE),
(@idBlend, 5, '08:00:00', '20:00:00', FALSE),
(@idBlend, 6, '08:00:00', '20:00:00', FALSE),
(@idBlend, 7, '09:00:00', '18:00:00', FALSE);

-- =============================================
-- IMÁGENES para nuevos restaurantes
-- =============================================

-- Quintonil
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idQuintonil, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0', TRUE, 1),
(@idQuintonil, 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85', FALSE, 2);

-- Maximo Bistrot
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idMaximo, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', TRUE, 1),
(@idMaximo, 'https://images.unsplash.com/photo-1476124369491-b79d48fddb0e', FALSE, 2);

-- Pujol
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idPujol, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, 1),
(@idPujol, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0', FALSE, 2);

-- El Güero
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idGuero, 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, 1),
(@idGuero, 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41', FALSE, 2);

-- Kanpai
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idKanpai, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351', TRUE, 1),
(@idKanpai, 'https://images.unsplash.com/photo-1617196034183-421b4917c92d', FALSE, 2);

-- Don Asado
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idDonAsado, 'https://images.unsplash.com/photo-1558030006-450675393462', TRUE, 1),
(@idDonAsado, 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6', FALSE, 2);

-- Avellaneda
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idAvellaneda, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085', TRUE, 1),
(@idAvellaneda, 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13', FALSE, 2);

-- Fonda Fina
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idFondaFina, 'https://images.unsplash.com/photo-1559737558-2f5a2c2f9b8d', TRUE, 1),
(@idFondaFina, 'https://images.unsplash.com/photo-1605522561233-768ad7a8fabf', FALSE, 2);

-- La Docena
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idDocena, 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58', TRUE, 1),
(@idDocena, 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41', FALSE, 2);

-- Blend Station
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idBlend, 'https://images.unsplash.com/photo-1590301157890-4810ed352733', TRUE, 1),
(@idBlend, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', FALSE, 2);

-- =============================================
-- RESEÑAS ADICIONALES
-- =============================================

-- Quintonil
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idMaria, @idQuintonil, 5, 'Experiencia gastronómica increíble. Cada platillo es una obra de arte. El mole madre es impresionante.', TRUE),
(@idCarlos, @idQuintonil, 5, 'Alta cocina mexicana al máximo nivel. Servicio impecable y presentación hermosa.', TRUE);

-- Maximo Bistrot
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idAna, @idMaximo, 5, 'El menú cambia según el mercado. Siempre sorprenden con sabores increíbles. Ambiente acogedor.', TRUE);

-- Pujol
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idLuis, @idPujol, 5, 'Una experiencia inolvidable. El menú taco omakase es espectacular. Totalmente vale la pena.', TRUE);

-- El Güero
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idSofia, @idGuero, 5, 'Tacos de guisado caseros deliciosos. Precios accesibles y sabor auténtico. Las aguas frescas son naturales.', TRUE);

-- Kanpai
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idMaria, @idKanpai, 4, 'Buen sushi, pescado fresco. Los rolls son creativos. La selección de sake es excelente.', TRUE);

-- Don Asado
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idCarlos, @idDonAsado, 5, 'Los cortes argentinos están perfectos. El ojo de bife es mi favorito. Buena carta de vinos.', TRUE);

-- Avellaneda
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idAna, @idAvellaneda, 5, 'Café de especialidad excepcional. Los métodos de extracción son variados. Repostería deliciosa.', TRUE);

-- Fonda Fina
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idLuis, @idFondaFina, 5, 'Cocina mexicana con un twist contemporáneo. Las tostadas de atún son adictivas.', TRUE);

-- La Docena
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idSofia, @idDocena, 5, 'Los ostiones son fresquísimos. Gran variedad de mariscos. Los cocteles están muy bien hechos.', TRUE);

-- Blend Station
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idMaria, @idBlend, 4, 'Opciones saludables y deliciosas. Los bowls son completos y nutritivos. Lugar perfecto para desayunar.', TRUE);

