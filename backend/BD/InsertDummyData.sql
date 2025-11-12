-- Datos de Prueba para Base de Datos Quovi
-- Restaurantes reales de la Ciudad de Mexico

\c quovi_db;

-- USUARIOS
INSERT INTO usuarios (nombreUsuario, email, password) VALUES
('alejandra_mx', 'alejandra@email.com', '$2a$10$abcdefghijklmnopqrstuv'),
('ricardo_cdmx', 'ricardo@email.com', '$2a$10$wxyzabcdefghijklmnopqr'),
('sofia_torres', 'sofia@email.com', '$2a$10$stuvwxyzabcdefghijklmn');

-- CIUDADES
INSERT INTO ciudades (nombreCiudad, estado) VALUES
('Ciudad de Mexico', 'CDMX'),
('Guadalajara', 'Jalisco'),
('Monterrey', 'Nuevo Leon');

-- CATEGORIAS DE COCINA
INSERT INTO categorias_cocina (nombreCategoria) VALUES
('Mexicana'),
('Italiana'),
('Japonesa'),
('Mariscos'),
('Tacos'),
('Antojitos'),
('Postres'),
('Internacional');

-- CARACTERISTICAS
INSERT INTO caracteristicas (nombreCaracteristica) VALUES
('Terraza'),
('Techado'),
('Pet-friendly'),
('Estacionamiento'),
('WiFi gratis'),
('Musica en vivo'),
('Para llevar'),
('Servicio a domicilio');

-- RESTAURANTES REALES DE CIUDAD DE MEXICO
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud) VALUES
('El Cardenal', 'Calle de la Palma 23, Centro Historico', 1, 19.43556000, -99.13889000),
('Contramar', 'Calle de Durango 200, Roma Norte', 1, 19.41833000, -99.16611000),
('Quintonil', 'Av. Isaac Newton 55, Polanco', 1, 19.43389000, -99.19528000),
('Pujol', 'Tennyson 133, Polanco', 1, 19.43306000, -99.19139000),
('El Hidalguense', 'Campeche 155, Condesa', 1, 19.41028000, -99.17194000);

-- RELACION RESTAURANTE-CATEGORIAS
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(1, 1), (1, 6),
(2, 4), (2, 1),
(3, 1), (3, 8),
(4, 1), (4, 8),
(5, 1), (5, 5);

-- RELACION RESTAURANTE-CARACTERISTICAS
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(1, 2), (1, 4), (1, 5),
(2, 1), (2, 5),
(3, 2), (3, 4), (3, 5),
(4, 2), (4, 4),
(5, 7), (5, 8);

-- PLATILLOS
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, ingredientes) VALUES
(1, 'Chilaquiles Verdes', 180.00, 'Chilaquiles tradicionales con salsa verde', 'tortilla, salsa verde, crema, queso, cebolla'),
(1, 'Huevos Motuleños', 195.00, 'Platillo yucateco con huevos', 'huevos, frijol, platano, salsa, tortilla'),
(1, 'Pan Dulce Surtido', 85.00, 'Canasta de pan dulce tradicional', 'harina, mantequilla, azucar'),

(2, 'Tostadas de Atun', 240.00, 'Tostadas con atun fresco marinado', 'atun, aguacate, chile, limon, tostada'),
(2, 'Pescado a la Talla', 420.00, 'Pescado entero con adobo especial', 'pescado, chile guajillo, especias'),
(2, 'Aguachile Verde', 280.00, 'Camarones en salsa verde picante', 'camaron, chile serrano, limon, pepino, cebolla'),

(3, 'Esquites con Tuetano', 185.00, 'Elote desgranado con tuetano de res', 'elote, tuetano, epazote, chile, limon'),
(3, 'Tamal de Frijol con Hoja Santa', 165.00, 'Tamal artesanal con hoja santa', 'masa, frijol, hoja santa, chile'),
(3, 'Mole Madre', 485.00, 'Mole tradicional con pato', 'pato, mole, sesamo, arroz'),

(4, 'Taco de Pescado en Costra', 520.00, 'Tacos con pescado fresco', 'pescado, costra, aguacate, salsa'),
(4, 'Mole de Caderas', 680.00, 'Mole tradicional poblano', 'cabra, mole, chile, especias'),
(4, 'Chicharron de Rib Eye', 595.00, 'Rib eye en costra crujiente', 'rib eye, especias, guacamole'),

(5, 'Barbacoa de Borrego', 210.00, 'Barbacoa tradicional hidalguense', 'borrego, pencas, consomé, cilantro, cebolla'),
(5, 'Pancita', 185.00, 'Caldo de pancita estilo Hidalgo', 'pancita, chile guajillo, oregano, limon'),
(5, 'Mixiotes de Carnero', 195.00, 'Carnero envuelto en hoja de maguey', 'carnero, chile, hoja de maguey, especias');

-- HORARIOS (1=Lunes, 7=Domingo)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre) VALUES
(1, 1, '08:00', '18:00'), (1, 2, '08:00', '18:00'), (1, 3, '08:00', '18:00'),
(1, 4, '08:00', '18:00'), (1, 5, '08:00', '18:00'), (1, 6, '08:00', '18:00'),
(1, 7, '08:00', '18:00'),

(2, 2, '13:00', '18:00'), (2, 3, '13:00', '18:00'), (2, 4, '13:00', '18:00'),
(2, 5, '13:00', '18:00'), (2, 6, '13:00', '18:00'), (2, 7, '13:00', '18:00'),

(3, 2, '13:30', '22:30'), (3, 3, '13:30', '22:30'), (3, 4, '13:30', '22:30'),
(3, 5, '13:30', '22:30'), (3, 6, '13:30', '23:00'), (3, 7, '13:30', '22:30'),

(4, 2, '13:30', '22:00'), (4, 3, '13:30', '22:00'), (4, 4, '13:30', '22:00'),
(4, 5, '13:30', '23:00'), (4, 6, '13:30', '23:00'), (4, 7, '13:30', '22:00'),

(5, 1, '08:00', '18:00'), (5, 2, '08:00', '18:00'), (5, 3, '08:00', '18:00'),
(5, 4, '08:00', '18:00'), (5, 5, '08:00', '18:00'), (5, 6, '08:00', '18:00'),
(5, 7, '08:00', '18:00');

-- BUSQUEDAS
INSERT INTO busquedas (idUsuario, texto, contexto) VALUES
(1, 'tacos de barbacoa', 'domingo, manana'),
(1, 'mariscos frescos en la roma', 'tarde, soleado'),
(2, 'algo rico para una cita romantica', 'noche, viernes'),
(3, 'chilaquiles para desayunar', 'manana, entre semana'),
(NULL, 'mole poblano autentico', 'tarde');

-- RESEÑAS
INSERT INTO reseñas (idUsuario, idRestaurante, calificacion, comentario) VALUES
(1, 1, 5, 'Los mejores chilaquiles de la CDMX, autenticos y deliciosos'),
(2, 2, 5, 'Contramar nunca decepciona, las tostadas de atun son espectaculares'),
(1, 3, 5, 'Experiencia gastronomica increible, el mole es una obra de arte'),
(3, 4, 5, 'Pujol es simplemente el mejor, vale cada peso'),
(2, 5, 4, 'Barbacoa tradicional muy buena, el consomé es excelente');

-- FAVORITOS
INSERT INTO favoritos (idUsuario, idRestaurante) VALUES
(1, 1), (1, 2), (1, 3),
(2, 2), (2, 4),
(3, 1), (3, 5);

SELECT 'Datos insertados exitosamente' AS status;