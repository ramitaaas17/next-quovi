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




















-- =============================================
-- DATOS SINTÉTICOS - NEGOCIOS LOCALES Y CALLEJEROS CDMX
-- Base de datos: quovi_db
-- Enfoque: Pequeños negocios, puestos callejeros, fondas
-- =============================================

-- Obtener ID de CDMX
SET @idCDMX = (SELECT idCiudad FROM ciudades WHERE nombreCiudad = 'Ciudad de México' LIMIT 1);

-- =============================================
-- PUESTOS CALLEJEROS Y NEGOCIOS LOCALES
-- =============================================

-- PUESTO 1: Tacos El Vilsito (Taller/Taquería Nocturna)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('El Vilsito', 'Av. Universidad esq. Petén 248, Narvarte Poniente, Benito Juárez', @idCDMX, 19.395833, -99.158056, '5555386279', NULL, 'Taller mecánico de día, taquería de noche. Famoso por sus tacos al pastor desde 1966. Salió en Netflix Taco Chronicles.', 80.00, TRUE);
SET @idVilsito = LAST_INSERT_ID();

-- PUESTO 2: Tacos Los Cocuyos (24 horas)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Los Cocuyos', 'Simón Bolívar 59, Centro Histórico, Cuauhtémoc', @idCDMX, 19.432222, -99.138611, NULL, NULL, 'Puesto abierto 24 horas. Especialidad en tacos de suadero confitado en manteca. Recomendado por Anthony Bourdain.', 70.00, TRUE);
SET @idCocuyos = LAST_INSERT_ID();

-- PUESTO 3: Taquería Los Parados (Nocturna)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Tacos Los Parados', 'Monterrey 333, Roma Norte, Cuauhtémoc', @idCDMX, 19.419167, -99.166944, '5555844729', NULL, 'Puesto callejero nocturno famoso. Tacos de suadero, pastor y volcanes. Ambiente de barrio auténtico.', 75.00, TRUE);
SET @idParados = LAST_INSERT_ID();

-- PUESTO 4: El Borrego Viudo (Servicio al auto)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('El Borrego Viudo', 'Av. Revolución 241, Tacubaya, Miguel Hidalgo', @idCDMX, 19.403889, -99.187222, '5552770032', NULL, 'Servicio 24 horas directo al auto. Tacos de pastor, suadero, lengua y cabeza. Salsas legendarias.', 85.00, TRUE);
SET @idBorrego = LAST_INSERT_ID();

-- PUESTO 5: Quesadillas Doña Jenni (Roma Norte)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Quesadillas Doña Jenni', 'Colima esq. Jalapa, Roma Norte, Cuauhtémoc', @idCDMX, 19.416944, -99.165000, NULL, NULL, 'Puesto callejero con quesadillas de maíz azul. Rellenos: huitlacoche, flor de calabaza, tinga, chicharrón. Favorito de extranjeros.', 45.00, TRUE);
SET @idJenni = LAST_INSERT_ID();

-- PUESTO 6: Tortas Armando (Desde 1892)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Tortas Armando', 'Río Nazas 64, Cuauhtémoc, Cuauhtémoc', @idCDMX, 19.429167, -99.164722, '5555921683', 'https://www.tortasarmando.com', 'Primera tortería oficial de CDMX desde 1892. Tortas de milanesa, jamón y queso de puerco. Historia y tradición.', 65.00, TRUE);
SET @idArmando = LAST_INSERT_ID();

-- PUESTO 7: Casa del Pavo (Desde 1901)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Casa del Pavo', 'Motolinía 40, Centro Histórico, Cuauhtémoc', @idCDMX, 19.433611, -99.139444, '5555210689', NULL, 'Tortería histórica desde 1901. Famosa por sus tortas de pavo. Aparece en la película Roma de Alfonso Cuarón.', 70.00, TRUE);
SET @idCasaPavo = LAST_INSERT_ID();

-- PUESTO 8: Esquites Molière (Polanco)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Esquites Molière', 'Molière esq. Ejército Nacional 352, Polanco, Miguel Hidalgo', @idCDMX, 19.432222, -99.194167, NULL, NULL, 'Puesto famoso de esquites frescos. Abre 19:30-22:30 y se acaba todo. Lunes a viernes solamente.', 50.00, TRUE);
SET @idMoliere = LAST_INSERT_ID();

-- PUESTO 9: Torta de Chilaquiles "La Esquina"
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('La Esquina del Chilaquil', 'Paseo de la Reforma s/n, junto a Estela de Luz, Cuauhtémoc', @idCDMX, 19.426111, -99.171389, NULL, NULL, 'Puesto callejero famoso por tortas de chilaquiles (bombas). Opción con milanesa o cochinita. Perfecto para desayuno.', 60.00, TRUE);
SET @idChilaquil = LAST_INSERT_ID();

-- PUESTO 10: Tamales Don Chuy (Azcapotzalco)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Tamales Don Chuy', 'Calzada Camarones esq. 22 de Febrero, Santa María Maninalco, Azcapotzalco', @idCDMX, 19.484722, -99.192500, NULL, NULL, 'Puesto móvil de tamales mañanero. Más de 20 años. Sabores: mole con almendra, rajas con champiñones, dulces de nutella.', 25.00, TRUE);
SET @idChuy = LAST_INSERT_ID();

-- PUESTO 11: Tacos Tony (Narvarte)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Tacos Tony', 'Avenida Universidad esq. Municipio Libre, Narvarte Poniente, Benito Juárez', @idCDMX, 19.395278, -99.156111, NULL, NULL, 'Puesto de lámina especializado en suadero confitado en manteca. Experiencia callejera auténtica. Se come de pie.', 55.00, TRUE);
SET @idTony = LAST_INSERT_ID();

-- PUESTO 12: Taquería El Huequito (Desde 1959)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('El Huequito', 'Calle Bolívar 58, Centro Histórico, Cuauhtémoc', @idCDMX, 19.432778, -99.138889, '5555185528', 'https://www.elhuequito.com.mx', 'Afirman ser creadores del taco al pastor. Pastor especial con torre de carne. Tradición desde 1959.', 90.00, TRUE);
SET @idHuequito = LAST_INSERT_ID();

-- PUESTO 13: Tacos de Canasta Marven (Centro)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Tacos de Canasta Marven', 'Eje Central Lázaro Cárdenas, Centro Histórico, Cuauhtémoc', @idCDMX, 19.432500, -99.139167, NULL, NULL, 'Vendedor ambulante famoso por su grito característico. Tacos de canasta tradicionales económicos. Ícono del Centro.', 12.00, TRUE);
SET @idMarven = LAST_INSERT_ID();

-- PUESTO 14: Taquería Héroes (Héroes de Churubusco)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Tacos Doña Mary', 'Atanasio G. Sarabia esq. 109 A, Héroes de Churubusco, Iztapalapa', @idCDMX, 19.361667, -99.094722, NULL, NULL, 'Puesto con anafre al carbón. Tacos norteños: carne asada con queso, costilla BBQ, salchicha con piña. 30 años.', 50.00, TRUE);
SET @idMary = LAST_INSERT_ID();

-- PUESTO 15: El Paisa Chilaquil (24 horas Iztapalapa)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('El Paisa Chilaquil', 'Av. Tláhuac 481, Culhuacán, Iztapalapa', @idCDMX, 19.347222, -99.103333, '5555810445', NULL, 'Taquería 24 horas. Famosos molcajetes con carne y salsa verde. Más de 20 variedades de tacos. Alambres colosales.', 150.00, TRUE);
SET @idPaisa = LAST_INSERT_ID();

-- PUESTO 16: Tortas de Cochinita "La Cebolla Morada"
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('La Cebolla Morada', 'Liverpool 158, Juárez, Cuauhtémoc', @idCDMX, 19.427222, -99.162778, '5555333894', NULL, 'Especialidad en tortas y tacos de cochinita pibil yucateca. Cebolla morada con habanero. Sabor auténtico.', 75.00, TRUE);
SET @idCebolla = LAST_INSERT_ID();

-- PUESTO 17: Quesadillas Doña Gloria (Mercado La Rodeo)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Quesadillas Doña Gloria', 'Interior Mercado La Rodeo, Álvaro Obregón', @idCDMX, 19.365000, -99.213611, NULL, NULL, 'Puesto dentro del mercado. Quesadillas fritas con guisados variados. Chicharrón prensado, flor de calabaza, hongos.', 35.00, TRUE);
SET @idGloria = LAST_INSERT_ID();

-- PUESTO 18: Tlacoyos y Sopes "La Lupita"
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Tlacoyos La Lupita', 'Av. Insurgentes Sur esq. Félix Cuevas, Del Valle Sur, Benito Juárez', @idCDMX, 19.371944, -99.176667, NULL, NULL, 'Puesto callejero vespertino. Tlacoyos de frijol, haba, requesón. Sopes con nopales, bistec, cochinita.', 40.00, TRUE);
SET @idLupita = LAST_INSERT_ID();

-- PUESTO 19: Birria Tijuana Style "Don Beto"
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Birria Don Beto', 'Esquina Puebla y Monterrey, Roma Norte, Cuauhtémoc', @idCDMX, 19.416389, -99.165278, NULL, NULL, 'Puesto de lámina. Birria estilo Tijuana adobada con chilitos. Consomé incluido. Quesabirrias famosas.', 90.00, TRUE);
SET @idBeto = LAST_INSERT_ID();

-- PUESTO 20: Gorditas "El Rincón Michoacano"
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Gorditas El Rincón', 'Metro Sevilla, salida Chapultepec, Cuauhtémoc', @idCDMX, 19.421667, -99.171111, NULL, NULL, 'Puesto afuera del metro. Gorditas de chicharrón, picadillo, rajas, tinga. Precio accesible. Muy concurrido.', 25.00, TRUE);
SET @idRincon = LAST_INSERT_ID();

-- =============================================
-- CATEGORÍAS PARA PUESTOS
-- =============================================

INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
-- El Vilsito
(@idVilsito, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Tacos')),
(@idVilsito, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mexicana')),

-- Los Cocuyos
(@idCocuyos, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Tacos')),
(@idCocuyos, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mexicana')),

-- Los Parados
(@idParados, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Tacos')),
(@idParados, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Antojitos')),

-- El Borrego Viudo
(@idBorrego, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Tacos')),
(@idBorrego, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mexicana')),

-- Doña Jenni
(@idJenni, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Antojitos')),
(@idJenni, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mexicana')),

-- Tortas Armando
(@idArmando, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Antojitos')),

-- Casa del Pavo
(@idCasaPavo, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Antojitos')),
(@idCasaPavo, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Desayunos')),

-- Esquites Molière
(@idMoliere, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Antojitos')),

-- La Esquina
(@idChilaquil, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Antojitos')),
(@idChilaquil, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Desayunos')),

-- Tamales Don Chuy
(@idChuy, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Antojitos')),
(@idChuy, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Desayunos')),

-- Tacos Tony
(@idTony, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Tacos')),

-- El Huequito
(@idHuequito, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Tacos')),
(@idHuequito, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mexicana')),

-- Marven
(@idMarven, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Tacos')),
(@idMarven, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Antojitos')),

-- Doña Mary
(@idMary, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Tacos')),

-- El Paisa
(@idPaisa, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Tacos')),
(@idPaisa, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mexicana')),

-- La Cebolla Morada
(@idCebolla, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mexicana')),
(@idCebolla, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Antojitos')),

-- Doña Gloria
(@idGloria, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Antojitos')),

-- La Lupita
(@idLupita, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Antojitos')),

-- Don Beto
(@idBeto, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Tacos')),
(@idBeto, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Mexicana')),

-- El Rincón
(@idRincon, (SELECT idCategoria FROM categorias_cocina WHERE nombreCategoria = 'Antojitos'));

-- =============================================
-- CARACTERÍSTICAS DE PUESTOS CALLEJEROS
-- =============================================

-- El Vilsito
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idVilsito, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idVilsito, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- Los Cocuyos
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idCocuyos, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idCocuyos, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- Los Parados
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idParados, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idParados, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- El Borrego Viudo
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idBorrego, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idBorrego, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo')),
(@idBorrego, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta'));

-- Doña Jenni
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idJenni, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idJenni, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Opciones Veganas')),
(@idJenni, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- Tortas Armando
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idArmando, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idArmando, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta')),
(@idArmando, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- Casa del Pavo
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idCasaPavo, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idCasaPavo, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- Esquites Molière
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idMoliere, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idMoliere, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- La Esquina
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idChilaquil, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idChilaquil, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- Tamales Don Chuy
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idChuy, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idChuy, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- Tacos Tony
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idTony, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idTony, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- El Huequito
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idHuequito, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idHuequito, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta')),
(@idHuequito, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- Marven
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idMarven, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idMarven, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- Doña Mary
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idMary, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idMary, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- El Paisa
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idPaisa, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idPaisa, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pagos con Tarjeta')),
(@idPaisa, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- La Cebolla Morada
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idCebolla, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idCebolla, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- Doña Gloria
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idGloria, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idGloria, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- La Lupita
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idLupita, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idLupita, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- Don Beto
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idBeto, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idBeto, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- El Rincón
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(@idRincon, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Para Llevar')),
(@idRincon, (SELECT idCaracteristica FROM caracteristicas WHERE nombreCaracteristica = 'Pago con Efectivo'));

-- =============================================
-- PLATILLOS DE PUESTOS CALLEJEROS
-- =============================================

-- EL VILSITO
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idVilsito, 'Taco de Pastor', 38.00, 'Taco al pastor tradicional con piña', 'Carne al pastor, piña, cebolla, cilantro, tortilla', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idVilsito, 'Taco de Pastor con Queso', 48.00, 'Pastor con queso fundido', 'Pastor, queso fundido, piña, tortilla', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, TRUE),
(@idVilsito, 'Gringa de Pastor', 75.00, 'Tortilla de harina con queso y pastor', 'Tortilla de harina, pastor, queso, piña', 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, TRUE),
(@idVilsito, 'Volcán', 80.00, 'Tortilla con queso gratinado y pastor', 'Queso fundido, pastor, tortilla, salsa', 'https://images.unsplash.com/photo-1582169296194-e4d644c48063', TRUE, FALSE),
(@idVilsito, 'Taco de Bistec', 35.00, 'Taco de bistec de res', 'Bistec, cebolla, cilantro, tortilla', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, FALSE),
(@idVilsito, 'Taco de Costilla', 42.00, 'Taco de costilla de res', 'Costilla, cebolla, cilantro, salsa', 'https://images.unsplash.com/photo-1613514785940-daed07799d9b', TRUE, FALSE);

-- LOS COCUYOS
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idCocuyos, 'Taco de Suadero', 35.00, 'Suadero confitado en manteca', 'Suadero, cebolla, cilantro, limón, tortilla', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idCocuyos, 'Taco de Bistec', 32.00, 'Taco de bistec asado', 'Bistec, cebolla, cilantro, tortilla', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, FALSE),
(@idCocuyos, 'Taco de Longaniza', 38.00, 'Longaniza casera asada', 'Longaniza, cebolla, cilantro, limón', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, FALSE),
(@idCocuyos, 'Taco de Tripa', 40.00, 'Tripa dorada crujiente', 'Tripa, cebolla, cilantro, salsa verde', 'https://images.unsplash.com/photo-1613514785940-daed07799d9b', TRUE, TRUE),
(@idCocuyos, 'Quesadilla de Suadero', 70.00, 'Quesadilla con suadero', 'Tortilla, queso, suadero, crema', 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, FALSE);

-- LOS PARADOS
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idParados, 'Taco de Suadero', 40.00, 'Suadero jugoso al comal', 'Suadero, cebolla, cilantro, tortilla', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idParados, 'Taco de Pastor', 38.00, 'Pastor con especias secretas', 'Pastor, piña, cebolla, cilantro', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, TRUE),
(@idParados, 'Volcán de Suadero', 85.00, 'Tortilla con queso fundido y suadero', 'Queso, suadero, tortilla tostada, salsa', 'https://images.unsplash.com/photo-1582169296194-e4d644c48063', TRUE, TRUE),
(@idParados, 'Taco de Chorizo', 35.00, 'Chorizo artesanal', 'Chorizo, cebolla, cilantro, limón', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, FALSE),
(@idParados, 'Gringa Mixta', 90.00, 'Pastor y bistec con queso', 'Tortilla harina, pastor, bistec, queso', 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, FALSE);

-- EL BORREGO VIUDO
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idBorrego, 'Taco de Pastor', 40.00, 'Pastor jugoso directo al auto', 'Pastor, piña, cebolla, cilantro', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idBorrego, 'Taco de Suadero', 42.00, 'Suadero confitado especial', 'Suadero, cebolla, cilantro, limón', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, TRUE),
(@idBorrego, 'Taco de Lengua', 45.00, 'Lengua suave y tierna', 'Lengua de res, cebolla, cilantro, salsa verde', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, FALSE),
(@idBorrego, 'Taco de Cabeza', 45.00, 'Cabeza de res seleccionada', 'Cabeza, cebolla, cilantro, limón', 'https://images.unsplash.com/photo-1613514785940-daed07799d9b', TRUE, FALSE),
(@idBorrego, 'Orden de Salsas', 25.00, 'Salsas legendarias del Borrego', 'Salsa verde, roja, habanero, chile de árbol', 'https://images.unsplash.com/photo-1604909052925-56e2b1e6e90a', TRUE, TRUE);

-- DOÑA JENNI
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idJenni, 'Quesadilla de Huitlacoche', 50.00, 'Maíz azul con huitlacoche fresco', 'Masa azul, huitlacoche, epazote, queso', 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, TRUE),
(@idJenni, 'Quesadilla de Flor de Calabaza', 45.00, 'Flor de calabaza con epazote', 'Masa azul, flor, epazote, queso', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idJenni, 'Quesadilla de Tinga', 48.00, 'Tinga de pollo casera', 'Masa azul, tinga, queso, crema', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, FALSE),
(@idJenni, 'Quesadilla de Chicharrón Prensado', 45.00, 'Chicharrón en salsa verde', 'Masa azul, chicharrón, salsa verde, queso', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, FALSE),
(@idJenni, 'Quesadilla de Champiñones', 42.00, 'Champiñones con ajo y epazote', 'Masa azul, champiñones, epazote, queso', 'https://images.unsplash.com/photo-1613514785940-daed07799d9b', TRUE, TRUE);

-- TORTAS ARMANDO
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idArmando, 'Torta de Milanesa de Res', 75.00, 'Clásica milanesa con aguacate', 'Milanesa, aguacate, jitomate, cebolla, jalapeño, frijoles', 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3', TRUE, TRUE),
(@idArmando, 'Torta de Milanesa de Pollo', 70.00, 'Milanesa de pollo empanizada', 'Milanesa pollo, aguacate, jitomate, lechuga, frijoles', 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3', TRUE, FALSE),
(@idArmando, 'Torta de Jamón', 65.00, 'Jamón de pierna con queso', 'Jamón, queso, aguacate, jitomate, cebolla', 'https://images.unsplash.com/photo-1509722747041-616f39b57569', TRUE, FALSE),
(@idArmando, 'Torta de Queso de Puerco', 70.00, 'Tradicional queso de puerco', 'Queso de puerco, aguacate, jalapeño, frijoles', 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3', TRUE, TRUE),
(@idArmando, 'Torta Cubana', 95.00, 'Torta con todo', 'Milanesa, jamón, salchicha, huevo, queso, aguacate, frijoles', 'https://images.unsplash.com/photo-1509722747041-616f39b57569', TRUE, TRUE);

-- CASA DEL PAVO
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idCasaPavo, 'Torta de Pavo', 75.00, 'Pavo rostizado tradicional', 'Pavo, aguacate, jitomate, cebolla, jalapeño, frijoles', 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3', TRUE, TRUE),
(@idCasaPavo, 'Torta de Jamón con Pavo', 80.00, 'Combinación de jamón y pavo', 'Jamón, pavo, queso, aguacate, frijoles', 'https://images.unsplash.com/photo-1509722747041-616f39b57569', TRUE, FALSE),
(@idCasaPavo, 'Torta de Pierna', 70.00, 'Pierna de cerdo adobada', 'Pierna, aguacate, jitomate, cebolla, frijoles', 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3', TRUE, FALSE),
(@idCasaPavo, 'Sandwich de Pavo', 65.00, 'Pavo en pan tipo sandwich', 'Pavo, lechuga, jitomate, mostaza, mayonesa', 'https://images.unsplash.com/photo-1509722747041-616f39b57569', TRUE, FALSE);

-- ESQUITES MOLIÈRE
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idMoliere, 'Esquites Tradicionales', 50.00, 'Maíz cacahuacintle fresco', 'Maíz, mayonesa, queso, chile piquín, limón, epazote', 'https://images.unsplash.com/photo-1562346713-03b18e53065f', TRUE, TRUE),
(@idMoliere, 'Esquites con Cueritos', 60.00, 'Esquites con cueritos de cerdo', 'Maíz, cueritos, mayonesa, queso, chile, limón', 'https://images.unsplash.com/photo-1562346713-03b18e53065f', TRUE, TRUE),
(@idMoliere, 'Esquites con Champiñones', 65.00, 'Esquites gourmet con champiñones', 'Maíz, champiñones, mayonesa, queso, epazote', 'https://images.unsplash.com/photo-1562346713-03b18e53065f', TRUE, FALSE);

-- LA ESQUINA DEL CHILAQUIL
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idChilaquil, 'Torta de Chilaquiles Verdes', 55.00, 'La famosa "bomba" verde', 'Chilaquiles verdes, frijoles, crema, queso, bolillo', 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41', TRUE, TRUE),
(@idChilaquil, 'Torta de Chilaquiles Rojos', 55.00, 'Chilaquiles rojos en torta', 'Chilaquiles rojos, frijoles, crema, queso, bolillo', 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41', TRUE, TRUE),
(@idChilaquil, 'Torta de Chilaquiles con Milanesa', 75.00, 'Bomba con milanesa de pollo', 'Chilaquiles, milanesa, frijoles, crema, queso', 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3', TRUE, TRUE),
(@idChilaquil, 'Torta de Chilaquiles con Cochinita', 80.00, 'Chilaquiles con cochinita pibil', 'Chilaquiles, cochinita, cebolla morada, bolillo', 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41', TRUE, FALSE);

-- TAMALES DON CHUY
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idChuy, 'Tamal de Mole con Almendra', 28.00, 'Tamal especial con almendras', 'Masa, mole, pollo, almendras, hoja de maíz', 'https://images.unsplash.com/photo-1606309331686-458b1f89d902', TRUE, TRUE),
(@idChuy, 'Tamal de Rajas con Champiñones', 25.00, 'Rajas poblanas con champiñones', 'Masa, rajas, champiñones, queso, crema', 'https://images.unsplash.com/photo-1606309331686-458b1f89d902', TRUE, TRUE),
(@idChuy, 'Tamal Verde de Pollo', 22.00, 'Tamal tradicional de salsa verde', 'Masa, salsa verde, pollo, hoja de maíz', 'https://images.unsplash.com/photo-1606309331686-458b1f89d902', TRUE, FALSE),
(@idChuy, 'Tamal de Dulce Nutella', 30.00, 'Tamal dulce con Nutella', 'Masa dulce, Nutella, pasas, hoja de maíz', 'https://images.unsplash.com/photo-1606309331686-458b1f89d902', TRUE, TRUE),
(@idChuy, 'Tamal de Fresa', 28.00, 'Tamal dulce de fresa', 'Masa dulce, mermelada fresa, hoja de maíz', 'https://images.unsplash.com/photo-1606309331686-458b1f89d902', TRUE, FALSE),
(@idChuy, 'Atole de Arroz', 20.00, 'Atole casero de arroz', 'Arroz, leche, canela, vainilla', 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87', TRUE, FALSE);

-- TACOS TONY
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idTony, 'Taco de Suadero', 30.00, 'Suadero confitado en manteca pura', 'Suadero, cebolla, cilantro, limón, tortilla', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idTony, 'Taco de Longaniza', 32.00, 'Longaniza casera', 'Longaniza, cebolla, cilantro, salsa', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, FALSE),
(@idTony, 'Taco de Bistec', 28.00, 'Bistec al comal', 'Bistec, cebolla, cilantro, tortilla', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, FALSE),
(@idTony, 'Orden de 10 Tacos', 280.00, 'Orden completa para compartir', 'Tacos variados, cebolla, cilantro, salsas', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE);

-- EL HUEQUITO
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idHuequito, 'Taco al Pastor', 45.00, 'El original, creadores del pastor', 'Carne al pastor, piña, cebolla, cilantro', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idHuequito, 'Taco al Pastor Especial', 55.00, 'Pastor con torre de carne extra', 'Carne al pastor premium, piña, cebolla, cilantro', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, TRUE),
(@idHuequito, 'Taco de Suadero', 42.00, 'Suadero tradicional', 'Suadero, cebolla, cilantro, salsa', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, FALSE),
(@idHuequito, 'Gringa al Pastor', 95.00, 'Gringa con queso fundido', 'Pastor, queso, tortilla harina, piña', 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, TRUE),
(@idHuequito, 'Alambre al Pastor', 185.00, 'Alambre con tocino y queso', 'Pastor, tocino, pimientos, cebolla, queso', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84', TRUE, FALSE);

-- TACOS DE CANASTA MARVEN
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idMarven, 'Taco de Papa', 10.00, 'Taco de papa con chorizo', 'Papa, chorizo, tortilla sudada', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idMarven, 'Taco de Frijol', 10.00, 'Taco de frijoles refritos', 'Frijoles, tortilla sudada', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, FALSE),
(@idMarven, 'Taco de Chicharrón', 12.00, 'Chicharrón prensado en verde', 'Chicharrón, salsa verde, tortilla', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, TRUE),
(@idMarven, 'Taco de Mole Verde', 12.00, 'Pollo en mole verde', 'Pollo, mole verde, tortilla sudada', 'https://images.unsplash.com/photo-1613514785940-daed07799d9b', TRUE, FALSE),
(@idMarven, 'Orden de 10 Tacos', 100.00, 'Orden surtida de canasta', 'Tacos variados de canasta', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE);

-- TACOS DOÑA MARY
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idMary, 'Taco de Carne Asada con Queso', 55.00, 'Carne norteña con queso', 'Carne asada, queso fundido, tortilla harina', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idMary, 'Taco de Costilla BBQ', 60.00, 'Costilla en salsa BBQ casera', 'Costilla, salsa BBQ, cebolla, tortilla', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, TRUE),
(@idMary, 'Taco de Salchicha con Piña', 48.00, 'Salchicha asada con piña', 'Salchicha, piña, cebolla, mostaza, tortilla', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, FALSE),
(@idMary, 'Taco de Arrachera', 65.00, 'Arrachera marinada al carbón', 'Arrachera, guacamole, cebolla asada', 'https://images.unsplash.com/photo-1613514785940-daed07799d9b', TRUE, TRUE);

-- EL PAISA CHILAQUIL
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idPaisa, 'Molcajete de Carne', 280.00, 'Molcajete con carne y salsa verde', 'Carne asada, nopales, cebollitas, queso, salsa verde, tortillas', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84', TRUE, TRUE),
(@idPaisa, 'Taco de Pastor', 32.00, 'Taco al pastor tradicional', 'Pastor, piña, cebolla, cilantro', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, FALSE),
(@idPaisa, 'Taco de Bistec', 30.00, 'Bistec asado al carbón', 'Bistec, cebolla, cilantro, tortilla', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, FALSE),
(@idPaisa, 'Alambre Especial', 195.00, 'Alambre con todos los ingredientes', 'Carne, tocino, pimientos, cebolla, queso, tortillas', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84', TRUE, TRUE),
(@idPaisa, 'Gringa de Pastor', 85.00, 'Gringa con queso fundido', 'Pastor, queso, tortilla harina, piña', 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, FALSE);

-- LA CEBOLLA MORADA
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idCebolla, 'Torta de Cochinita Pibil', 80.00, 'Cochinita yucateca auténtica', 'Cochinita, cebolla morada, habanero, bolillo', 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3', TRUE, TRUE),
(@idCebolla, 'Tacos de Cochinita', 95.00, 'Tres tacos de cochinita', 'Cochinita, cebolla morada, habanero, tortilla', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idCebolla, 'Torta de Lechón', 85.00, 'Lechón al horno', 'Lechón, cebolla morada, aguacate, bolillo', 'https://images.unsplash.com/photo-1509722747041-616f39b57569', TRUE, FALSE),
(@idCebolla, 'Salbutes', 75.00, 'Tres salbutes yucatecos', 'Tortilla frita, cochinita, lechuga, tomate, cebolla', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, FALSE);

-- QUESADILLAS DOÑA GLORIA
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idGloria, 'Quesadilla de Chicharrón Prensado', 38.00, 'Chicharrón en salsa verde', 'Chicharrón, salsa verde, queso, masa', 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, TRUE),
(@idGloria, 'Quesadilla de Flor de Calabaza', 35.00, 'Flor fresca con epazote', 'Flor de calabaza, epazote, queso, masa', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idGloria, 'Quesadilla de Hongos', 38.00, 'Hongos salteados con ajo', 'Hongos, ajo, epazote, queso, masa', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, FALSE),
(@idGloria, 'Quesadilla de Tinga', 40.00, 'Tinga de pollo casera', 'Tinga, queso, crema, masa', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, FALSE),
(@idGloria, 'Sope de Picadillo', 30.00, 'Sope con picadillo', 'Picadillo, lechuga, crema, queso, sope', 'https://images.unsplash.com/photo-1613514785940-daed07799d9b', TRUE, FALSE);

-- TLACOYOS LA LUPITA
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idLupita, 'Tlacoyo de Frijol', 35.00, 'Tlacoyo relleno de frijol', 'Masa azul, frijol, nopales, queso, salsa', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idLupita, 'Tlacoyo de Haba', 38.00, 'Tlacoyo con haba fresca', 'Masa azul, haba, nopales, queso, salsa verde', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, TRUE),
(@idLupita, 'Tlacoyo de Requesón', 42.00, 'Requesón fresco con epazote', 'Masa azul, requesón, nopales, salsa', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, FALSE),
(@idLupita, 'Sope de Bistec', 45.00, 'Sope con bistec asado', 'Bistec, lechuga, crema, queso, frijoles', 'https://images.unsplash.com/photo-1613514785940-daed07799d9b', TRUE, FALSE),
(@idLupita, 'Sope de Cochinita', 48.00, 'Sope con cochinita pibil', 'Cochinita, cebolla morada, frijoles, crema', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, TRUE);

-- BIRRIA DON BETO
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idBeto, 'Taco de Birria', 45.00, 'Taco dorado de birria con consomé', 'Birria, tortilla, cebolla, cilantro, consomé', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idBeto, 'Quesabirria', 95.00, 'Tres quesabirrias con consomé', 'Birria, queso, tortilla, cebolla, cilantro, consomé', 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, TRUE),
(@idBeto, 'Orden de Birria', 180.00, 'Birria en plato con tortillas', 'Birria, tortillas, cebolla, cilantro, limón, consomé', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84', TRUE, TRUE),
(@idBeto, 'Consomé de Birria', 65.00, 'Consomé calientito con limón', 'Consomé, cebolla, cilantro, limón', 'https://images.unsplash.com/photo-1547592166-23ac45744acd', TRUE, FALSE);

-- GORDITAS EL RINCÓN
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes, imagen, disponible, destacado) VALUES
(@idRincon, 'Gordita de Chicharrón', 25.00, 'Gordita con chicharrón prensado', 'Chicharrón, salsa verde, gordita', 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, TRUE),
(@idRincon, 'Gordita de Picadillo', 25.00, 'Gordita con picadillo casero', 'Picadillo, papa, gordita', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, FALSE),
(@idRincon, 'Gordita de Rajas', 22.00, 'Rajas con queso', 'Rajas poblanas, queso, crema, gordita', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, TRUE),
(@idRincon, 'Gordita de Tinga', 28.00, 'Tinga de pollo', 'Tinga, crema, queso, gordita', 'https://images.unsplash.com/photo-1613514785940-daed07799d9b', TRUE, FALSE);

-- =============================================
-- HORARIOS DE PUESTOS CALLEJEROS
-- =============================================

-- El Vilsito (Lunes a Sábado: 6:30pm-2am, Domingo cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idVilsito, 1, '18:30:00', '02:00:00', FALSE),
(@idVilsito, 2, '18:30:00', '02:00:00', FALSE),
(@idVilsito, 3, '18:30:00', '02:00:00', FALSE),
(@idVilsito, 4, '18:30:00', '02:00:00', FALSE),
(@idVilsito, 5, '18:30:00', '02:00:00', FALSE),
(@idVilsito, 6, '18:30:00', '02:00:00', FALSE),
(@idVilsito, 7, '00:00:00', '00:00:00', TRUE);

-- Los Cocuyos (24 horas, 7 días)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idCocuyos, 1, '00:00:00', '23:59:59', FALSE),
(@idCocuyos, 2, '00:00:00', '23:59:59', FALSE),
(@idCocuyos, 3, '00:00:00', '23:59:59', FALSE),
(@idCocuyos, 4, '00:00:00', '23:59:59', FALSE),
(@idCocuyos, 5, '00:00:00', '23:59:59', FALSE),
(@idCocuyos, 6, '00:00:00', '23:59:59', FALSE),
(@idCocuyos, 7, '00:00:00', '23:59:59', FALSE);

-- Los Parados (Martes a Domingo: 8pm-3am, Lunes cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idParados, 1, '00:00:00', '00:00:00', TRUE),
(@idParados, 2, '20:00:00', '03:00:00', FALSE),
(@idParados, 3, '20:00:00', '03:00:00', FALSE),
(@idParados, 4, '20:00:00', '03:00:00', FALSE),
(@idParados, 5, '20:00:00', '03:00:00', FALSE),
(@idParados, 6, '20:00:00', '04:00:00', FALSE),
(@idParados, 7, '20:00:00', '03:00:00', FALSE);

-- El Borrego Viudo (24 horas, 7 días)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idBorrego, 1, '00:00:00', '23:59:59', FALSE),
(@idBorrego, 2, '00:00:00', '23:59:59', FALSE),
(@idBorrego, 3, '00:00:00', '23:59:59', FALSE),
(@idBorrego, 4, '00:00:00', '23:59:59', FALSE),
(@idBorrego, 5, '00:00:00', '23:59:59', FALSE),
(@idBorrego, 6, '00:00:00', '23:59:59', FALSE),
(@idBorrego, 7, '00:00:00', '23:59:59', FALSE);

-- Doña Jenni (Lunes a Sábado: 6pm-11pm, Domingo cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idJenni, 1, '18:00:00', '23:00:00', FALSE),
(@idJenni, 2, '18:00:00', '23:00:00', FALSE),
(@idJenni, 3, '18:00:00', '23:00:00', FALSE),
(@idJenni, 4, '18:00:00', '23:00:00', FALSE),
(@idJenni, 5, '18:00:00', '23:00:00', FALSE),
(@idJenni, 6, '18:00:00', '23:00:00', FALSE),
(@idJenni, 7, '00:00:00', '00:00:00', TRUE);

-- Tortas Armando (Lunes a Domingo: 11am-7pm)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idArmando, 1, '11:00:00', '19:00:00', FALSE),
(@idArmando, 2, '11:00:00', '19:00:00', FALSE),
(@idArmando, 3, '11:00:00', '19:00:00', FALSE),
(@idArmando, 4, '11:00:00', '19:00:00', FALSE),
(@idArmando, 5, '11:00:00', '19:00:00', FALSE),
(@idArmando, 6, '11:00:00', '19:00:00', FALSE),
(@idArmando, 7, '11:00:00', '19:00:00', FALSE);

-- Casa del Pavo (Lunes a Sábado: 10am-6pm, Domingo cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idCasaPavo, 1, '10:00:00', '18:00:00', FALSE),
(@idCasaPavo, 2, '10:00:00', '18:00:00', FALSE),
(@idCasaPavo, 3, '10:00:00', '18:00:00', FALSE),
(@idCasaPavo, 4, '10:00:00', '18:00:00', FALSE),
(@idCasaPavo, 5, '10:00:00', '18:00:00', FALSE),
(@idCasaPavo, 6, '10:00:00', '18:00:00', FALSE),
(@idCasaPavo, 7, '00:00:00', '00:00:00', TRUE);

-- Esquites Molière (Lunes a Viernes: 7:30pm-10:30pm, Fin de semana cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idMoliere, 1, '19:30:00', '22:30:00', FALSE),
(@idMoliere, 2, '19:30:00', '22:30:00', FALSE),
(@idMoliere, 3, '19:30:00', '22:30:00', FALSE),
(@idMoliere, 4, '19:30:00', '22:30:00', FALSE),
(@idMoliere, 5, '19:30:00', '22:30:00', FALSE),
(@idMoliere, 6, '00:00:00', '00:00:00', TRUE),
(@idMoliere, 7, '00:00:00', '00:00:00', TRUE);

-- La Esquina del Chilaquil (Lunes a Sábado: 8am-2pm, Domingo cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idChilaquil, 1, '08:00:00', '14:00:00', FALSE),
(@idChilaquil, 2, '08:00:00', '14:00:00', FALSE),
(@idChilaquil, 3, '08:00:00', '14:00:00', FALSE),
(@idChilaquil, 4, '08:00:00', '14:00:00', FALSE),
(@idChilaquil, 5, '08:00:00', '14:00:00', FALSE),
(@idChilaquil, 6, '08:00:00', '14:00:00', FALSE),
(@idChilaquil, 7, '00:00:00', '00:00:00', TRUE);

-- Tamales Don Chuy (Lunes a Domingo: 6am-11am)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idChuy, 1, '06:00:00', '11:00:00', FALSE),
(@idChuy, 2, '06:00:00', '11:00:00', FALSE),
(@idChuy, 3, '06:00:00', '11:00:00', FALSE),
(@idChuy, 4, '06:00:00', '11:00:00', FALSE),
(@idChuy, 5, '06:00:00', '11:00:00', FALSE),
(@idChuy, 6, '06:00:00', '11:00:00', FALSE),
(@idChuy, 7, '06:00:00', '11:00:00', FALSE);

-- Tacos Tony (Martes a Domingo: 6pm-1am, Lunes cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idTony, 1, '00:00:00', '00:00:00', TRUE),
(@idTony, 2, '18:00:00', '01:00:00', FALSE),
(@idTony, 3, '18:00:00', '01:00:00', FALSE),
(@idTony, 4, '18:00:00', '01:00:00', FALSE),
(@idTony, 5, '18:00:00', '01:00:00', FALSE),
(@idTony, 6, '18:00:00', '02:00:00', FALSE),
(@idTony, 7, '18:00:00', '01:00:00', FALSE);

-- El Huequito (Lunes a Domingo: 1pm-2am)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idHuequito, 1, '13:00:00', '02:00:00', FALSE),
(@idHuequito, 2, '13:00:00', '02:00:00', FALSE),
(@idHuequito, 3, '13:00:00', '02:00:00', FALSE),
(@idHuequito, 4, '13:00:00', '02:00:00', FALSE),
(@idHuequito, 5, '13:00:00', '02:00:00', FALSE),
(@idHuequito, 6, '13:00:00', '03:00:00', FALSE),
(@idHuequito, 7, '13:00:00', '02:00:00', FALSE);

-- Tacos de Canasta Marven (Lunes a Viernes: 7am-3pm, Fin de semana cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idMarven, 1, '07:00:00', '15:00:00', FALSE),
(@idMarven, 2, '07:00:00', '15:00:00', FALSE),
(@idMarven, 3, '07:00:00', '15:00:00', FALSE),
(@idMarven, 4, '07:00:00', '15:00:00', FALSE),
(@idMarven, 5, '07:00:00', '15:00:00', FALSE),
(@idMarven, 6, '00:00:00', '00:00:00', TRUE),
(@idMarven, 7, '00:00:00', '00:00:00', TRUE);

-- Tacos Doña Mary (Jueves a Domingo: 6pm-1am, Lun-Mie cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idMary, 1, '00:00:00', '00:00:00', TRUE),
(@idMary, 2, '00:00:00', '00:00:00', TRUE),
(@idMary, 3, '00:00:00', '00:00:00', TRUE),
(@idMary, 4, '18:00:00', '01:00:00', FALSE),
(@idMary, 5, '18:00:00', '01:00:00', FALSE),
(@idMary, 6, '18:00:00', '02:00:00', FALSE),
(@idMary, 7, '18:00:00', '01:00:00', FALSE);

-- El Paisa Chilaquil (24 horas, 7 días)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idPaisa, 1, '00:00:00', '23:59:59', FALSE),
(@idPaisa, 2, '00:00:00', '23:59:59', FALSE),
(@idPaisa, 3, '00:00:00', '23:59:59', FALSE),
(@idPaisa, 4, '00:00:00', '23:59:59', FALSE),
(@idPaisa, 5, '00:00:00', '23:59:59', FALSE),
(@idPaisa, 6, '00:00:00', '23:59:59', FALSE),
(@idPaisa, 7, '00:00:00', '23:59:59', FALSE);

-- La Cebolla Morada (Lunes a Sábado: 12pm-9pm, Domingo cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idCebolla, 1, '12:00:00', '21:00:00', FALSE),
(@idCebolla, 2, '12:00:00', '21:00:00', FALSE),
(@idCebolla, 3, '12:00:00', '21:00:00', FALSE),
(@idCebolla, 4, '12:00:00', '21:00:00', FALSE),
(@idCebolla, 5, '12:00:00', '21:00:00', FALSE),
(@idCebolla, 6, '12:00:00', '21:00:00', FALSE),
(@idCebolla, 7, '00:00:00', '00:00:00', TRUE);

-- Doña Gloria (Lunes a Sábado: 9am-5pm, Domingo cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idGloria, 1, '09:00:00', '17:00:00', FALSE),
(@idGloria, 2, '09:00:00', '17:00:00', FALSE),
(@idGloria, 3, '09:00:00', '17:00:00', FALSE),
(@idGloria, 4, '09:00:00', '17:00:00', FALSE),
(@idGloria, 5, '09:00:00', '17:00:00', FALSE),
(@idGloria, 6, '09:00:00', '17:00:00', FALSE),
(@idGloria, 7, '00:00:00', '00:00:00', TRUE);

-- La Lupita (Lunes a Sábado: 5pm-11pm, Domingo cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idLupita, 1, '17:00:00', '23:00:00', FALSE),
(@idLupita, 2, '17:00:00', '23:00:00', FALSE),
(@idLupita, 3, '17:00:00', '23:00:00', FALSE),
(@idLupita, 4, '17:00:00', '23:00:00', FALSE),
(@idLupita, 5, '17:00:00', '23:00:00', FALSE),
(@idLupita, 6, '17:00:00', '23:00:00', FALSE),
(@idLupita, 7, '00:00:00', '00:00:00', TRUE);

-- Don Beto (Viernes a Domingo: 6pm-12am, Lun-Jue cerrado)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idBeto, 1, '00:00:00', '00:00:00', TRUE),
(@idBeto, 2, '00:00:00', '00:00:00', TRUE),
(@idBeto, 3, '00:00:00', '00:00:00', TRUE),
(@idBeto, 4, '00:00:00', '00:00:00', TRUE),
(@idBeto, 5, '18:00:00', '00:00:00', FALSE),
(@idBeto, 6, '18:00:00', '01:00:00', FALSE),
(@idBeto, 7, '13:00:00', '00:00:00', FALSE);

-- El Rincón (Lunes a Sábado: 7am-9pm, Domingo: 8am-5pm)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
(@idRincon, 1, '07:00:00', '21:00:00', FALSE),
(@idRincon, 2, '07:00:00', '21:00:00', FALSE),
(@idRincon, 3, '07:00:00', '21:00:00', FALSE),
(@idRincon, 4, '07:00:00', '21:00:00', FALSE),
(@idRincon, 5, '07:00:00', '21:00:00', FALSE),
(@idRincon, 6, '07:00:00', '21:00:00', FALSE),
(@idRincon, 7, '08:00:00', '17:00:00', FALSE);

-- =============================================
-- IMÁGENES DE PUESTOS
-- =============================================

-- El Vilsito
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idVilsito, 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, 1),
(@idVilsito, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', FALSE, 2);

-- Los Cocuyos
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idCocuyos, 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, 1);

-- Los Parados
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idParados, 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, 1);

-- El Borrego Viudo
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idBorrego, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, 1);

-- Doña Jenni
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idJenni, 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, 1);

-- Tortas Armando
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idArmando, 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3', TRUE, 1);

-- Casa del Pavo
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idCasaPavo, 'https://images.unsplash.com/photo-1509722747041-616f39b57569', TRUE, 1);

-- Esquites Molière
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idMoliere, 'https://images.unsplash.com/photo-1562346713-03b18e53065f', TRUE, 1);

-- La Esquina
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idChilaquil, 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41', TRUE, 1);

-- Tamales Don Chuy
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idChuy, 'https://images.unsplash.com/photo-1606309331686-458b1f89d902', TRUE, 1);

-- Tacos Tony
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idTony, 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, 1);

-- El Huequito
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idHuequito, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, 1);

-- Marven
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idMarven, 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, 1);

-- Doña Mary
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idMary, 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, 1);

-- El Paisa
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idPaisa, 'https://images.unsplash.com/photo-1606491956689-2ea866880c84', TRUE, 1);

-- La Cebolla Morada
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idCebolla, 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3', TRUE, 1);

-- Doña Gloria
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idGloria, 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, 1);

-- La Lupita
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idLupita, 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', TRUE, 1);

-- Don Beto
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idBeto, 'https://images.unsplash.com/photo-1618040996337-2dabc3d32b88', TRUE, 1);

-- El Rincón
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(@idRincon, 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, 1);

-- =============================================
-- RESEÑAS DE PUESTOS CALLEJEROS
-- =============================================

-- Obtener IDs de usuarios existentes
SET @idMaria = (SELECT idUsuario FROM usuarios WHERE nombreUsuario = 'maria_g' LIMIT 1);
SET @idCarlos = (SELECT idUsuario FROM usuarios WHERE nombreUsuario = 'carlos_r' LIMIT 1);
SET @idAna = (SELECT idUsuario FROM usuarios WHERE nombreUsuario = 'ana_m' LIMIT 1);
SET @idLuis = (SELECT idUsuario FROM usuarios WHERE nombreUsuario = 'luis_h' LIMIT 1);
SET @idSofia = (SELECT idUsuario FROM usuarios WHERE nombreUsuario = 'sofia_l' LIMIT 1);

-- El Vilsito
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idMaria, @idVilsito, 5, 'Experiencia única. Ver cómo el taller se convierte en taquería es fascinante. Los tacos al pastor son deliciosos. Salió en Netflix y lo vale.', TRUE),
(@idCarlos, @idVilsito, 5, 'Tradición pura. El pastor está jugoso y la piña perfecta. Los volcanes son enormes. Hay que llegar temprano porque se llena.', TRUE);

-- Los Cocuyos
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idAna, @idCocuyos, 5, 'Abierto 24 horas, perfecto para el antojo nocturno. El suadero confitado es adictivo. Lugar legendario del Centro.', TRUE),
(@idLuis, @idCocuyos, 5, 'El suadero más rico que he probado. Se deshace en la boca. Las salsas pican perfecto. Un clásico chilango.', TRUE);

-- Los Parados
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idSofia, @idParados, 5, 'Puesto nocturno icónico de la Roma. Los volcanes son espectaculares. Ambiente de barrio muy auténtico. Se come de pie.', TRUE);

-- El Borrego Viudo
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idMaria, @idBorrego, 5, 'Servicio al auto 24 horas. Perfecto para cuando llegas tarde y con hambre. Las salsas son legendarias, pican delicioso.', TRUE);

-- Doña Jenni
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idCarlos, @idJenni, 5, 'Las quesadillas de maíz azul son otra cosa. El huitlacoche está fresco y la flor de calabaza deliciosa. Muy recomendado.', TRUE);

-- Tortas Armando
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idAna, @idArmando, 5, 'Historia pura desde 1892. La torta de milanesa es clásica y deliciosa. El lugar tiene mucha tradición familiar.', TRUE);

-- El Huequito
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idLuis, @idHuequito, 5, 'Si dicen ser los creadores del taco al pastor, les creo. El sabor es único. La torre de carne es impresionante.', TRUE);

-- Tamales Don Chuy
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idSofia, @idChuy, 5, 'Los tamales más creativos que he probado. El de mole con almendra es espectacular. Los dulces de nutella son adictivos.', TRUE);

-- La Cebolla Morada
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idMaria, @idCebolla, 5, 'Cochinita pibil auténtica yucateca. La cebolla morada con habanero le da el toque perfecto. Muy recomendado.', TRUE);

-- El Paisa Chilaquil
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idCarlos, @idPaisa, 5, 'Abierto 24 horas en Iztapalapa. Los molcajetes son gigantes y deliciosos. Precios justos y porciones generosas.', TRUE);

-- Don Beto
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idAna, @idBeto, 5, 'Birria estilo Tijuana auténtica. Las quesabirrias con consomé son lo máximo. El fin de semana vale la pena la visita.', TRUE);

-- Esquites Molière
INSERT INTO resenas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(@idLuis, @idMoliere, 5, 'Se acaban rápido porque son los mejores esquites de Polanco. Hay que llegar temprano. Solo de lunes a viernes.', TRUE);

-- =============================================
-- FIN DEL SCRIPT
-- =============================================


-- =============================================
-- ESTADÍSTICAS FINALES
-- =============================================
/*
RESUMEN DE DATOS INSERTADOS:

PUESTOS Y NEGOCIOS LOCALES: 20
- Taquerías callejeras: 10
- Torterías históricas: 2
- Puestos de antojitos: 5
- Puestos de birria/tamales: 3

PLATILLOS TOTALES: ~180
- Tacos variados: 60+
- Tortas y sándwiches: 15+
- Quesadillas y antojitos: 40+
- Tamales: 6
- Especialidades: 60+

CARACTERÍSTICAS DESTACADAS:
- Horarios realistas (nocturnos, 24hrs, mañaneros)
- Precios accesibles ($12-$280)
- Ubicaciones reales en CDMX
- Descripciones auténticas
- Enfoque en comida callejera tradicional

COLONIAS REPRESENTADAS:
- Centro Histórico
- Roma Norte
- Condesa
- Narvarte
- Polanco
- Juárez
- Iztapalapa
- Azcapotzalco

TIPOS DE ESTABLECIMIENTO:
✓ Puestos de lámina
✓ Vendedores ambulantes
✓ Taquerías familiares
✓ Negocios dentro de mercados
✓ Torterías históricas
✓ Puestos nocturnos
✓ Servicio al auto
✓ Negocios 24 horas

IDEAL PARA QUOVI:
- Búsquedas en lenguaje natural
- Filtros por horario
- Búsqueda por precio accesible
- Comida tradicional mexicana
- Experiencias auténticas locales
- Negocios pequeños y familiares
*/