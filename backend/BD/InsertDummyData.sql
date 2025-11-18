-- =============================================
-- Datos Reales para Quovi - Restaurantes CDMX
-- =============================================

USE quovi_db;

-- =============================================
-- CIUDADES
-- =============================================
INSERT INTO ciudades (nombreCiudad, estado, pais, latitud, longitud) VALUES
('Ciudad de México', 'CDMX', 'México', 19.4326, -99.1332),
('Guadalajara', 'Jalisco', 'México', 20.6597, -103.3496),
('Monterrey', 'Nuevo León', 'México', 25.6866, -100.3161),
('Puebla', 'Puebla', 'México', 19.0414, -98.2063),
('Querétaro', 'Querétaro', 'México', 20.5888, -100.3899);

-- =============================================
-- CATEGORÍAS DE COCINA
-- =============================================
INSERT INTO categorias_cocina (nombreCategoria, descripcion, icono) VALUES
('Mexicana', 'Cocina tradicional mexicana', '🌮'),
('Italiana', 'Pasta, pizza y cocina italiana', '🍝'),
('Japonesa', 'Sushi, ramen y cocina japonesa', '🍣'),
('Mariscos', 'Pescados y mariscos frescos', '🦐'),
('Tacos', 'Taquerías y tacos especializados', '🌮'),
('Steakhouse', 'Cortes de carne premium', '🥩'),
('Internacional', 'Fusión y cocina internacional', '🌍'),
('Cafetería', 'Café, postres y desayunos', '☕'),
('Vegetariana', 'Opciones vegetarianas y veganas', '🥗'),
('Argentina', 'Parrilla y cocina argentina', '🇦🇷'),
('Española', 'Tapas y cocina española', '🇪🇸'),
('Francesa', 'Alta cocina francesa', '🇫🇷'),
('Asiática', 'Cocina asiática variada', '🥢'),
('Contemporánea', 'Cocina de autor y moderna', '🍽️'),
('Seafood', 'Especialidad en productos del mar', '🐟');

-- =============================================
-- CARACTERÍSTICAS
-- =============================================
INSERT INTO caracteristicas (nombreCaracteristica, descripcion, icono) VALUES
('Pet Friendly', 'Acepta mascotas', '🐕'),
('Terraza', 'Cuenta con área al aire libre', '🌳'),
('Estacionamiento', 'Tiene estacionamiento propio', '🅿️'),
('Wifi Gratis', 'Internet inalámbrico gratuito', '📶'),
('Bar', 'Servicio de bar y coctelería', '🍸'),
('Música en Vivo', 'Eventos con música en vivo', '🎵'),
('Reservaciones', 'Acepta reservaciones', '📅'),
('Delivery', 'Servicio a domicilio', '🚗'),
('Para Llevar', 'Servicio para llevar', '🥡'),
('Accesible', 'Accesible para sillas de ruedas', '♿'),
('Aire Acondicionado', 'Ambiente climatizado', '❄️'),
('Jardín', 'Cuenta con jardín o patio', '🌺'),
('Desayunos', 'Sirve desayunos', '🍳'),
('Buffet', 'Servicio de buffet', '🍱'),
('Romántico', 'Ambiente ideal para parejas', '💕');

-- =============================================
-- RESTAURANTES EN CIUDAD DE MÉXICO
-- =============================================

-- Zona: Polanco
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Pujol', 'Tennyson 133, Polanco', 1, 19.4361, -99.1914, '5545454111', 'pujol.com.mx', 'Restaurante de alta cocina mexicana contemporánea por el chef Enrique Olvera. Experiencia gastronómica única con ingredientes locales.', 2500, TRUE),
('Quintonil', 'Av. Isaac Newton 55, Polanco', 1, 19.4353, -99.1953, '5552804778', 'quintonil.com', 'Cocina mexicana moderna con ingredientes orgánicos y de temporada. Reconocido internacionalmente.', 2000, TRUE),
('Sud 777', 'Boulevard de la Luz 777, Jardines del Pedregal', 1, 19.3242, -99.2071, '5555685777', 'sud777.com.mx', 'Innovación culinaria mexicana con técnicas contemporáneas en ambiente elegante y acogedor.', 1800, TRUE),
('Maximo Bistrot', 'Tonalá 133, Roma Norte', 1, 19.4189, -99.1623, '5552640758', 'maximobistrot.com.mx', 'Bistrot local con menú cambiante basado en ingredientes de mercado y temporada.', 900, TRUE),
('Rosetta', 'Colima 166, Roma Norte', 1, 19.4178, -99.1625, '5555336804', 'rosetta.com.mx', 'Cocina italiana con influencia mexicana en una hermosa casona de la Roma.', 1200, TRUE),

-- Zona: Roma/Condesa
('Contramar', 'Durango 200, Roma Norte', 1, 19.4156, -99.1634, '5555149217', 'contramar.com.mx', 'Icónico restaurante de mariscos. Famoso por su pescado a la talla y tostadas de atún.', 850, TRUE),
('Lardo', 'Agustín Melgar 6, Condesa', 1, 19.4088, -99.1712, '5555116390', 'lardo.com.mx', 'Cocina mediterránea casual con ingredientes de alta calidad. Famoso por su pan artesanal.', 600, TRUE),
('Merotoro', 'Ámsterdam 204, Condesa', 1, 19.4105, -99.1689, '5555644990', 'merotoro.mx', 'Mariscos y cortes en ambiente contemporáneo. Especialidad en pescados frescos del día.', 950, TRUE),
('Expendio de Maíz', 'Tonalá 53, Roma Norte', 1, 19.4205, -99.1612, '5555844876', NULL, 'Auténtica cocina mexicana tradicional. Tortillas hechas a mano y mole casero.', 400, TRUE),
('Fonda Fina', 'Medellín 79, Roma Norte', 1, 19.4145, -99.1656, '5552116850', 'fondafina.com', 'Cocina mexicana honesta y de mercado con toques contemporáneos.', 550, TRUE),

-- Zona: Centro Histórico
('Azul Histórico', 'Isabel la Católica 30, Centro', 1, 19.4334, -99.1386, '5555102316', 'azulhistorico.com', 'Cocina tradicional mexicana en hermoso patio colonial. Ambiente único en el Centro.', 650, TRUE),
('Casino Español', 'Isabel la Católica 29, Centro', 1, 19.4336, -99.1387, '5555224894', 'casinoespanol.mx', 'Restaurante histórico de cocina española desde 1863. Arquitectura impresionante.', 800, TRUE),
('La Ópera', 'Av. 5 de Mayo 10, Centro', 1, 19.4334, -99.1377, '5555128959', NULL, 'Bar-restaurante histórico con arquitectura del siglo XIX. Cocina mexicana e internacional.', 500, TRUE),
('Café de Tacuba', 'Tacuba 28, Centro', 1, 19.4353, -99.1403, '5555181440', 'cafedetacuba.com.mx', 'Restaurante histórico desde 1912. Cocina tradicional mexicana en ambiente colonial.', 400, TRUE),

-- Zona: San Ángel
('San Ángel Inn', 'Diego Rivera 50, San Ángel', 1, 19.3475, -99.1889, '5556162222', 'sanangelin.com', 'Restaurante en hacienda del siglo XVII. Cocina mexicana refinada en jardines históricos.', 950, TRUE),
('Cluny', 'Arenal 102, Chimalistac', 1, 19.3523, -99.1878, '5556617030', NULL, 'Bistrot francés acogedor con cocina clásica y mercado local. Terraza con jardín.', 700, TRUE),

-- Taquerías y Comida Casual
('El Califa', 'Ribera de San Cosme 56, San Rafael', 1, 19.4395, -99.1547, '5555467666', 'elcalifa.com.mx', 'Taquería legendaria con más de 50 años. Famosa por su gaonera y costilla.', 200, TRUE),
('Tacos Hola', 'Ámsterdam 135, Condesa', 1, 19.4115, -99.1701, '5555536950', NULL, 'Taquería gourmet con ingredientes premium. Tacos de autor y salsas caseras.', 180, TRUE),
('Los Cocuyos', 'Bolívar 56, Centro', 1, 19.4287, -99.1368, '5555121501', NULL, 'Tacos al pastor tradicionales desde 1946. Clásico imperdible del Centro.', 120, TRUE),
('Taquería Orinoco', 'Orinoco 91, Condesa', 1, 19.4132, -99.1734, '5555533835', NULL, 'Tacos y quesadillas gourmet. Famosa por sus variedades creativas y salsas.', 150, TRUE),
('El Vilsito', 'Av. Universidad 2802, Copilco', 1, 19.3356, -99.1789, NULL, NULL, 'Taller mecánico que de noche se convierte en taquería. Tacos al pastor legendarios.', 100, TRUE),

-- Comida Internacional
('Rokai', 'Río Ebro 87, Cuauhtémoc', 1, 19.4245, -99.1678, '5552071164', 'rokai.com.mx', 'Ramen auténtico japonés. Caldos preparados por 12 horas con recetas tradicionales.', 280, TRUE),
('Sartoria', 'Lago Zurich 245, Polanco', 1, 19.4325, -99.1956, '5552812080', 'sartoriamx.com', 'Cocina italiana contemporánea. Pasta fresca hecha en casa y vinos italianos.', 850, TRUE),
('Maison Kayser', 'Tennyson 117, Polanco', 1, 19.4365, -99.1912, '5552805278', 'maison-kayser.mx', 'Panadería y bistrot francés. Panes artesanales y cocina francesa tradicional.', 400, TRUE),
('Eno', 'Av. Álvaro Obregón 151, Roma Norte', 1, 19.4156, -99.1645, '5552088968', 'eno.rest', 'Wine bar y restaurante. Cocina internacional con excelente carta de vinos.', 750, TRUE),
('Falling Piano', 'Chihuahua 97, Roma Norte', 1, 19.4134, -99.1598, '5555642721', NULL, 'Brunch y cocina internacional en ambiente hipster. Famoso por huevos benedictinos.', 320, TRUE),

-- Mariscos
('El Lago', 'Lago Mayor, Chapultepec', 1, 19.4201, -99.1912, '5552715809', 'ellagochapultepec.com.mx', 'Restaurante en el lago de Chapultepec. Mariscos frescos con vista espectacular.', 900, TRUE),
('La Docena', 'Álvaro Obregón 31, Roma Norte', 1, 19.4178, -99.1612, '5555148268', 'ladocena.com.mx', 'Ostionería contemporánea. Ostiones frescos y mariscos de calidad con bebidas artesanales.', 650, TRUE),
('Agua y Sal', 'Colima 130, Roma Norte', 1, 19.4189, -99.1634, '5555842782', 'aguaysal.com', 'Cocina de mar contemporánea. Ceviches creativos y pescados frescos del Pacífico.', 550, TRUE),

-- Cafeterías y Brunch
('Panadería Rosetta', 'Havre 73, Juárez', 1, 19.4245, -99.1589, '5555333000', 'rosetta.com.mx', 'Famosa panadería artesanal. Pan de la casa, guava rolls y café de especialidad.', 250, TRUE),
('Blend Station', 'Durango 261, Roma Norte', 1, 19.4134, -99.1656, '5555647874', 'blendstation.com.mx', 'Café de especialidad y brunch. Métodos de extracción japoneses y australianos.', 280, TRUE),
('Butcher & Sons', 'Atlixco 28, Condesa', 1, 19.4089, -99.1723, '5555538181', 'butchersons.mx', 'Panadería artesanal y brunch. Bagels caseros y pan de masa madre.', 300, TRUE),
('Cardinal Casa de Café', 'Orizaba 145, Roma Norte', 1, 19.4156, -99.1623, '5555640499', NULL, 'Café de especialidad en casona antigua. Tostado propio y métodos de preparación únicos.', 180, TRUE),

-- Cortes y Carnes
('Sonora Grill', 'Homero 1425, Polanco', 1, 19.4312, -99.2001, '5552550722', 'sonora-grill.com', 'Steakhouse mexicana premium. Cortes Sonora Prime y cocina del norte de México.', 1200, TRUE),
('Harry\'s', 'Leibnitz 102, Polanco', 1, 19.4378, -99.1934, '5552813330', 'harrys.com.mx', 'Steakhouse clásico desde 1953. Cortes Prime y ambiente elegante tradicional.', 1400, TRUE),
('Mochomos', 'Campos Elíseos 247, Polanco', 1, 19.4289, -99.1989, '5552818080', 'mochomos.mx', 'Cocina sinaloense moderna. Famoso por aguachile, mariscos y cortes.', 950, TRUE),
('Puerto Madero', 'Andres Bello 10, Polanco', 1, 19.4312, -99.1945, '5552804200', 'puertomadero.com.mx', 'Parrilla argentina. Carnes importadas de Argentina y amplia cava de vinos.', 1100, TRUE),

-- Zona: Coyoacán
('El Morral', 'Aguayo 2, Coyoacán', 1, 19.3523, -99.1623, '5556598998', NULL, 'Restaurante tradicional en el corazón de Coyoacán. Cocina mexicana casera.', 280, TRUE),
('Los Danzantes', 'Jardín Centenario 12, Coyoacán', 1, 19.3534, -99.1612, '5556582054', 'losdanzantes.com', 'Cocina oaxaqueña contemporánea. Mezcales artesanales y mole negro tradicional.', 650, TRUE),
('Corazón de Maguey', 'Jardín Centenario 9A, Coyoacán', 1, 19.3535, -99.1615, '5556594773', 'corazondemaguey.com', 'Cocina mexicana y mezcalería. Amplia selección de mezcales artesanales.', 450, TRUE),

-- Zona: Santa Fe
('Saks Polanco', 'Moliere 50, Polanco', 1, 19.4334, -99.1978, '5552800891', NULL, 'Restaurante de cocina internacional. Desayunos ejecutivos y comidas de negocios.', 600, TRUE),
('La Buena Barra', 'Vasco de Quiroga 3880, Santa Fe', 1, 19.3589, -99.2645, '5552927203', 'labuenabarra.com.mx', 'Mariscos y pescados del Pacífico. Ambiente casual y fresco.', 550, TRUE),

-- Más opciones variadas
('Nicos', 'Av. Cuitláhuac 3102, Clavería', 1, 19.4534, -99.1823, '5555963636', 'nicosmx.com', 'Cocina mexicana tradicional desde 1957. Recetas de doña María Elena Lugo.', 480, TRUE),
('La Polar', 'Av. Cuitláhuac 3102, Clavería', 1, 19.4534, -99.1823, '5555963636', NULL, 'Taquería y antojitos mexicanos. Famosa por carnitas y chicharrón.', 180, TRUE),
('Limosneros', 'Ignacio Allende 3, Centro', 1, 19.4289, -99.1423, '5555214165', 'limosneros.com.mx', 'Cocina mexicana de mercado en casa del siglo XVIII. Ingredientes locales.', 550, TRUE),
('Bellini', 'Torre Latinoamericana, Centro', 1, 19.4334, -99.1406, '5555184530', 'bellinirestaurante.com', 'Restaurante giratorio en Torre Latinoamericana. Vista panorámica de la ciudad.', 750, TRUE),
('La Casa de Toño', 'Insurgentes Sur 421, Condesa', 1, 19.3989, -99.1689, '5555536959', 'lacasadetono.com.mx', 'Pozole y cocina mexicana tradicional. Cadena familiar con recetas originales.', 250, TRUE),
('Tori-Tori', 'Temístocles 61, Polanco', 1, 19.4289, -99.1934, '5552829460', 'toritoritoritoricom', 'Cocina japonesa moderna. Sushi creativo y robata grill.', 850, TRUE),
('Sushi Itto', 'Av. Insurgentes Sur 1581, San José Insurgentes', 1, 19.3678, -99.1789, '5555987878', 'sushi-itto.com.mx', 'Sushi roll estilo occidental. Cadena popular con opciones fusión.', 380, TRUE);

-- =============================================
-- PLATILLOS (ejemplos para cada restaurante)
-- =============================================

-- Pujol (id: 1)
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, disponible, destacado) VALUES
(1, 'Mole Madre', 1200, 'Mole negro de 2000 días envejecido, servido con mole nuevo', TRUE, TRUE),
(1, 'Taco de Hoja Santa', 450, 'Taco de hoja santa con chinicuiles y requesón', TRUE, TRUE),
(1, 'Ceviche de Pescado', 520, 'Pescado fresco con leche de tigre y aguachile verde', TRUE, FALSE),
(1, 'Tostada de Atún', 380, 'Atún fresco con aguacate y salsa macha', TRUE, FALSE),

-- Quintonil (id: 2)
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, disponible, destacado) VALUES
(2, 'Ensalada de Nopales', 340, 'Nopales asados con flor de calabaza y queso de cabra', TRUE, TRUE),
(2, 'Taco de Pescado Zarandeado', 420, 'Pescado del día zarandeado con salsa verde', TRUE, FALSE),
(2, 'Costilla de Res Nixtamalizada', 680, 'Costilla de res en salsa de maíz nixtamalizado', TRUE, TRUE),
(2, 'Sopa de Huitlacoche', 290, 'Crema de huitlacoche con flor de calabaza', TRUE, FALSE),

-- Contramar (id: 6)
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, disponible, destacado) VALUES
(6, 'Pescado a la Talla', 485, 'Pescado entero con salsa verde y roja, especialidad de la casa', TRUE, TRUE),
(6, 'Tostada de Atún', 165, 'Tostada con atún fresco, aguacate y salsa de chipotle', TRUE, TRUE),
(6, 'Ceviche Clásico', 285, 'Ceviche de pescado con limón, cilantro y cebolla morada', TRUE, FALSE),
(6, 'Camarones al Coco', 395, 'Camarones empanizados con coco, salsa de tamarindo', TRUE, FALSE),
(6, 'Tacos de Pescado', 245, 'Tres tacos de pescado empanizado con col y salsa', TRUE, FALSE),

-- El Califa (id: 17)
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, disponible, destacado) VALUES
(17, 'Taco de Gaonera', 52, 'Clásico taco de gaonera con cebolla y cilantro', TRUE, TRUE),
(17, 'Taco de Costilla', 58, 'Taco de costilla de res con guacamole', TRUE, TRUE),
(17, 'Orden de Tacos Mixtos', 195, 'Orden de 4 tacos surtidos', TRUE, FALSE),
(17, 'Vampiro de Costilla', 75, 'Quesadilla dorada con costilla de res', TRUE, FALSE),

-- Tacos Hola (id: 18)
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, disponible, destacado) VALUES
(18, 'Taco de Rib Eye', 85, 'Taco de rib eye con guacamole y cebolla caramelizada', TRUE, TRUE),
(18, 'Taco de Pulpo', 95, 'Pulpo a la parrilla con salsa de habanero', TRUE, TRUE),
(18, 'Taco de Cochinita', 68, 'Cochinita pibil con cebolla morada encurtida', TRUE, FALSE),
(18, 'Quesadilla de Arrachera', 115, 'Quesadilla con arrachera y queso manchego', TRUE, FALSE),

-- Rosetta (id: 5)
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, disponible, destacado) VALUES
(5, 'Pasta del Día', 385, 'Pasta fresca con ingredientes de temporada', TRUE, TRUE),
(5, 'Burrata con Jitomates', 295, 'Burrata importada con jitomates cherry asados', TRUE, FALSE),
(5, 'Lasagna de Berenjena', 425, 'Lasagna vegetariana con berenjena y ricotta', TRUE, FALSE),
(5, 'Tiramisu de la Casa', 185, 'Tiramisú tradicional italiano', TRUE, TRUE),

-- Rokai (id: 21)
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, disponible, destacado) VALUES
(21, 'Tonkotsu Ramen', 245, 'Ramen con caldo de hueso de cerdo, chashu y huevo marinado', TRUE, TRUE),
(21, 'Shoyu Ramen', 225, 'Ramen con caldo de soya, pollo y vegetales', TRUE, FALSE),
(21, 'Spicy Miso Ramen', 255, 'Ramen picante con miso, cerdo y brotes de soya', TRUE, TRUE),
(21, 'Gyoza', 125, 'Empanadillas japonesas de cerdo y vegetales', TRUE, FALSE),

-- Maximo Bistrot (id: 4)
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, disponible, destacado) VALUES
(4, 'Plato del Día', 385, 'Menú cambiante según mercado y temporada', TRUE, TRUE),
(4, 'Ensalada de Mercado', 245, 'Lechugas y vegetales frescos del día', TRUE, FALSE),
(4, 'Pescado del Día', 485, 'Pescado fresco con guarniciones de temporada', TRUE, TRUE),
(4, 'Postre de la Casa', 165, 'Postre artesanal del día', TRUE, FALSE),

-- Sonora Grill (id: 33)
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, disponible, destacado) VALUES
(33, 'New York Sonora Prime', 895, 'Corte New York 350g de carne Sonora Prime', TRUE, TRUE),
(33, 'Rib Eye Sonora Prime', 1050, 'Rib Eye 400g de carne Sonora Prime', TRUE, TRUE),
(33, 'Arrachera Norteña', 485, 'Arrachera marinada estilo Sonora', TRUE, FALSE),
(33, 'Camarones Momias', 395, 'Camarones envueltos en tocino', TRUE, FALSE),

-- Panadería Rosetta (id: 28)
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, disponible, destacado) VALUES
(28, 'Guava Roll', 85, 'Pan danés con guayaba, especialidad de la casa', TRUE, TRUE),
(28, 'Croissant de Mantequilla', 55, 'Croissant francés tradicional', TRUE, FALSE),
(28, 'Pan de la Casa', 65, 'Pan artesanal del día', TRUE, FALSE),
(28, 'Café Americano', 45, 'Café de especialidad', TRUE, FALSE),

-- Más platillos para otros restaurantes
INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, disponible, destacado) VALUES
(3, 'Tataki de Atún', 425, 'Atún sellado con salsa ponzu y ajonjolí', TRUE, TRUE),
(3, 'Aguachile Verde', 385, 'Camarones en aguachile de cilantro', TRUE, FALSE),
(7, 'Burrata con Prosciutto', 285, 'Burrata importada con jamón serrano', TRUE, TRUE),
(8, 'Tostada de Atún Sellado', 195, 'Atún sellado sobre tostada con aguacate', TRUE, TRUE),
(9, 'Tacos de Cochinita', 185, 'Tacos de cochinita pibil tradicional', TRUE, FALSE),
(10, 'Enchiladas de Mole', 245, 'Enchiladas con mole poblano casero', TRUE, TRUE),
(11, 'Cochinillo al Horno', 595, 'Cochinillo asado estilo español', TRUE, TRUE),
(12, 'Paella Valenciana', 425, 'Paella tradicional para 2 personas', TRUE, TRUE),
(13, 'Chiles en Nogada', 385, 'Platillo tradicional de temporada', TRUE, TRUE),
(14, 'Pollo al Ajillo', 325, 'Pollo en salsa de ajo con papas', TRUE, FALSE),
(15, 'Filete de Res Chimichurri', 595, 'Filete con chimichurri argentino', TRUE, TRUE),
(19, 'Tacos al Pastor', 45, 'Tacos al pastor tradicionales', TRUE, TRUE),
(20, 'Quesadilla de Huitlacoche', 95, 'Quesadilla gourmet con huitlacoche', TRUE, TRUE),
(23, 'Risotto de Hongos', 395, 'Risotto cremoso con hongos porcini', TRUE, FALSE),
(24, 'Croissant de Almendra', 65, 'Croissant relleno de crema de almendra', TRUE, FALSE),
(25, 'Huevos Benedictinos', 185, 'Huevos pochados con salsa holandesa', TRUE, TRUE),
(26, 'Pulpo a las Brasas', 485, 'Pulpo a la parrilla con pure de papa', TRUE, TRUE),
(27, 'Ostiones Rockefeller', 295, 'Media docena de ostiones gratinados', TRUE, FALSE),
(29, 'Chemex V60', 95, 'Café de origen único método V60', TRUE, FALSE),
(30, 'Bagel de Salmón', 195, 'Bagel con salmón ahumado y queso crema', TRUE, TRUE),
(31, 'Flat White', 75, 'Café con leche estilo australiano', TRUE, FALSE),
(34, 'Cowboy Steak', 1250, 'Corte cowboy 600g con hueso', TRUE, TRUE),
(35, 'Camarones Roca', 395, 'Camarones empanizados estilo Sinaloa', TRUE, FALSE),
(36, 'Bife de Chorizo', 895, 'Corte argentino 400g con chimichurri', TRUE, TRUE),
(37, 'Pozole Rojo', 145, 'Pozole tradicional con cerdo', TRUE, TRUE),
(38, 'Chilaquiles Verdes', 135, 'Chilaquiles con pollo y crema', TRUE, FALSE),
(39, 'Tempura de Vegetales', 245, 'Vegetales en tempura ligera', TRUE, FALSE),
(40, 'California Roll', 185, 'Roll clásico con cangrejo y aguacate', TRUE, FALSE);

-- =============================================
-- RELACIONES: RESTAURANTE - CATEGORÍAS
-- =============================================
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
-- Pujol: Mexicana, Contemporánea
(1, 1), (1, 14),
-- Quintonil: Mexicana, Contemporánea
(2, 1), (2, 14),
-- Sud 777: Mexicana, Contemporánea
(3, 1), (3, 14),
-- Maximo Bistrot: Internacional, Contemporánea
(4, 7), (4, 14),
-- Rosetta: Italiana
(5, 2),
-- Contramar: Mariscos, Seafood
(6, 4), (6, 15),
-- Lardo: Internacional, Italiana
(7, 7), (7, 2),
-- Merotoro: Mariscos, Seafood, Steakhouse
(8, 4), (8, 15), (8, 6),
-- Expendio de Maíz: Mexicana
(9, 1),
-- Fonda Fina: Mexicana
(10, 1),
-- Azul Histórico: Mexicana
(11, 1),
-- Casino Español: Española
(12, 11),
-- La Ópera: Mexicana, Internacional
(13, 1), (13, 7),
-- Café de Tacuba: Mexicana
(14, 1),
-- San Ángel Inn: Mexicana
(15, 1),
-- Cluny: Francesa
(16, 12),
-- El Califa: Tacos
(17, 5),
-- Tacos Hola: Tacos
(18, 5),
-- Los Cocuyos: Tacos
(19, 5),
-- Taquería Orinoco: Tacos
(20, 5),
-- El Vilsito: Tacos
(21, 5),
-- Rokai: Japonesa, Asiática
(22, 3), (22, 13),
-- Sartoria: Italiana
(23, 2),
-- Maison Kayser: Francesa, Cafetería
(24, 12), (24, 8),
-- Eno: Internacional
(25, 7),
-- Falling Piano: Internacional, Cafetería
(26, 7), (26, 8),
-- El Lago: Mariscos, Mexicana
(27, 4), (27, 1),
-- La Docena: Mariscos, Seafood
(28, 4), (28, 15),
-- Agua y Sal: Mariscos, Seafood
(29, 4), (29, 15),
-- Panadería Rosetta: Cafetería
(30, 8),
-- Blend Station: Cafetería
(31, 8),
-- Butcher & Sons: Cafetería
(32, 8),
-- Cardinal: Cafetería
(33, 8),
-- Sonora Grill: Steakhouse, Mexicana
(34, 6), (34, 1),
-- Harry's: Steakhouse
(35, 6),
-- Mochomos: Mariscos, Steakhouse
(36, 4), (36, 6),
-- Puerto Madero: Steakhouse, Argentina
(37, 6), (37, 10),
-- El Morral: Mexicana
(38, 1),
-- Los Danzantes: Mexicana
(39, 1),
-- Corazón de Maguey: Mexicana
(40, 1),
-- Saks: Internacional
(41, 7),
-- La Buena Barra: Mariscos
(42, 4),
-- Nicos: Mexicana
(43, 1),
-- La Polar: Mexicana, Tacos
(44, 1), (44, 5),
-- Limosneros: Mexicana
(45, 1),
-- Bellini: Internacional
(46, 7),
-- La Casa de Toño: Mexicana
(47, 1),
-- Tori-Tori: Japonesa
(48, 3),
-- Sushi Itto: Japonesa
(49, 3);

-- =============================================
-- RELACIONES: RESTAURANTE - CARACTERÍSTICAS
-- =============================================
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
-- Pujol
(1, 7), (1, 11), (1, 15),
-- Quintonil
(2, 7), (2, 11), (2, 10),
-- Sud 777
(3, 2), (3, 7), (3, 3), (3, 11),
-- Maximo Bistrot
(4, 7), (4, 4), (4, 11),
-- Rosetta
(5, 7), (5, 11), (5, 15),
-- Contramar
(6, 7), (6, 5), (6, 4),
-- Lardo
(7, 2), (7, 4), (7, 9),
-- Merotoro
(8, 7), (8, 5), (8, 11),
-- Expendio de Maíz
(9, 9), (9, 8),
-- Fonda Fina
(10, 7), (10, 4), (10, 9),
-- Azul Histórico
(11, 2), (11, 7), (11, 5), (11, 12),
-- Casino Español
(12, 7), (12, 11), (12, 5),
-- La Ópera
(13, 5), (13, 7), (13, 6),
-- Café de Tacuba
(14, 7), (14, 11),
-- San Ángel Inn
(15, 2), (15, 7), (15, 12), (15, 15), (15, 3),
-- Cluny
(16, 2), (16, 7), (16, 12),
-- El Califa
(17, 9), (17, 8),
-- Tacos Hola
(18, 7), (18, 9), (18, 8),
-- Los Cocuyos
(19, 9),
-- Taquería Orinoco
(20, 9), (20, 8),
-- El Vilsito
(21, 9),
-- Rokai
(22, 7), (22, 9), (22, 11),
-- Sartoria
(23, 7), (23, 5), (23, 11), (23, 15),
-- Maison Kayser
(24, 2), (24, 4), (24, 13), (24, 9),
-- Eno
(25, 5), (25, 7), (25, 4),
-- Falling Piano
(26, 2), (26, 4), (26, 13), (26, 1),
-- El Lago
(27, 2), (27, 7), (27, 3), (27, 5), (27, 12),
-- La Docena
(28, 5), (28, 7), (28, 4), (28, 2),
-- Agua y Sal
(29, 7), (29, 4), (29, 9),
-- Panadería Rosetta
(30, 9), (30, 4), (30, 13),
-- Blend Station
(31, 4), (31, 9), (31, 13),
-- Butcher & Sons
(32, 2), (32, 4), (32, 13), (32, 1),
-- Cardinal
(33, 4), (33, 11),
-- Sonora Grill
(34, 7), (34, 5), (34, 3), (34, 11), (34, 10),
-- Harry's
(35, 7), (35, 5), (35, 3), (35, 11),
-- Mochomos
(36, 7), (36, 5), (36, 11), (36, 3),
-- Puerto Madero
(37, 7), (37, 5), (37, 11), (37, 3), (37, 15),
-- El Morral
(38, 2), (38, 12), (38, 7),
-- Los Danzantes
(39, 2), (39, 5), (39, 7), (39, 12),
-- Corazón de Maguey
(40, 2), (40, 5), (40, 6), (40, 12),
-- Saks
(41, 7), (41, 3), (41, 11), (41, 4),
-- La Buena Barra
(42, 7), (42, 3), (42, 9),
-- Nicos
(43, 7), (43, 3), (43, 11),
-- La Polar
(44, 9), (44, 8),
-- Limosneros
(45, 7), (45, 12), (45, 2),
-- Bellini
(46, 7), (46, 5), (46, 11), (46, 15),
-- La Casa de Toño
(47, 8), (47, 9), (47, 13),
-- Tori-Tori
(48, 7), (48, 11), (48, 5), (48, 2),
-- Sushi Itto
(49, 7), (49, 8), (49, 9), (49, 11);

-- =============================================
-- HORARIOS (Lunes=1, Domingo=7)
-- =============================================

-- Restaurantes fine dining (Pujol, Quintonil, Sud 777, etc.)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
-- Pujol (cerrado domingos y lunes)
(1, 1, '13:00', '23:00', TRUE),
(1, 2, '13:00', '23:00', FALSE),
(1, 3, '13:00', '23:00', FALSE),
(1, 4, '13:00', '23:00', FALSE),
(1, 5, '13:00', '23:00', FALSE),
(1, 6, '13:00', '23:00', FALSE),
(1, 7, '13:00', '23:00', TRUE),

-- Quintonil
(2, 1, '13:00', '23:00', FALSE),
(2, 2, '13:00', '23:00', FALSE),
(2, 3, '13:00', '23:00', FALSE),
(2, 4, '13:00', '23:00', FALSE),
(2, 5, '13:00', '23:00', FALSE),
(2, 6, '13:00', '23:00', FALSE),
(2, 7, '13:00', '17:00', FALSE),

-- Sud 777
(3, 1, '13:00', '23:00', TRUE),
(3, 2, '13:00', '23:00', FALSE),
(3, 3, '13:00', '23:00', FALSE),
(3, 4, '13:00', '23:00', FALSE),
(3, 5, '13:00', '23:00', FALSE),
(3, 6, '13:00', '23:00', FALSE),
(3, 7, '13:00', '18:00', FALSE),

-- Contramar (cerrado martes)
(6, 1, '13:00', '19:00', FALSE),
(6, 2, '13:00', '19:00', FALSE),
(6, 3, '13:00', '19:00', TRUE),
(6, 4, '13:00', '19:00', FALSE),
(6, 5, '13:00', '19:00', FALSE),
(6, 6, '13:00', '19:00', FALSE),
(6, 7, '13:00', '19:00', FALSE),

-- Taquerías (horarios amplios)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
-- El Califa
(17, 1, '11:00', '01:00', FALSE),
(17, 2, '11:00', '01:00', FALSE),
(17, 3, '11:00', '01:00', FALSE),
(17, 4, '11:00', '01:00', FALSE),
(17, 5, '11:00', '02:00', FALSE),
(17, 6, '11:00', '02:00', FALSE),
(17, 7, '11:00', '23:00', FALSE),

-- Tacos Hola
(18, 1, '13:00', '23:00', FALSE),
(18, 2, '13:00', '23:00', FALSE),
(18, 3, '13:00', '23:00', FALSE),
(18, 4, '13:00', '23:00', FALSE),
(18, 5, '13:00', '01:00', FALSE),
(18, 6, '13:00', '01:00', FALSE),
(18, 7, '13:00', '23:00', FALSE),

-- El Vilsito (taller de día, taquería de noche)
(21, 1, '19:00', '02:00', FALSE),
(21, 2, '19:00', '02:00', FALSE),
(21, 3, '19:00', '02:00', FALSE),
(21, 4, '19:00', '02:00', FALSE),
(21, 5, '19:00', '03:00', FALSE),
(21, 6, '19:00', '03:00', FALSE),
(21, 7, '19:00', '23:00', FALSE),

-- Cafeterías (horarios matutinos)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
-- Panadería Rosetta
(30, 1, '07:00', '19:00', FALSE),
(30, 2, '07:00', '19:00', FALSE),
(30, 3, '07:00', '19:00', FALSE),
(30, 4, '07:00', '19:00', FALSE),
(30, 5, '07:00', '19:00', FALSE),
(30, 6, '08:00', '19:00', FALSE),
(30, 7, '08:00', '17:00', FALSE),

-- Blend Station
(31, 1, '08:00', '20:00', FALSE),
(31, 2, '08:00', '20:00', FALSE),
(31, 3, '08:00', '20:00', FALSE),
(31, 4, '08:00', '20:00', FALSE),
(31, 5, '08:00', '20:00', FALSE),
(31, 6, '08:00', '20:00', FALSE),
(31, 7, '09:00', '18:00', FALSE),

-- Restaurantes generales (horario estándar)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
-- Rosetta
(5, 1, '08:00', '23:00', FALSE),
(5, 2, '08:00', '23:00', FALSE),
(5, 3, '08:00', '23:00', FALSE),
(5, 4, '08:00', '23:00', FALSE),
(5, 5, '08:00', '23:00', FALSE),
(5, 6, '08:00', '23:00', FALSE),
(5, 7, '09:00', '17:00', FALSE),

-- Sonora Grill
(34, 1, '13:00', '23:00', FALSE),
(34, 2, '13:00', '23:00', FALSE),
(34, 3, '13:00', '23:00', FALSE),
(34, 4, '13:00', '23:00', FALSE),
(34, 5, '13:00', '01:00', FALSE),
(34, 6, '13:00', '01:00', FALSE),
(34, 7, '13:00', '22:00', FALSE),

-- Rokai
(22, 1, '13:00', '22:00', FALSE),
(22, 2, '13:00', '22:00', FALSE),
(22, 3, '13:00', '22:00', FALSE),
(22, 4, '13:00', '22:00', FALSE),
(22, 5, '13:00', '23:00', FALSE),
(22, 6, '13:00', '23:00', FALSE),
(22, 7, '13:00', '22:00', FALSE);

-- =============================================
-- IMÁGENES DE RESTAURANTES
-- =============================================
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
-- Pujol
(1, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0', TRUE, 1),
(1, 'https://images.unsplash.com/photo-1559339352-11d035aa65de', FALSE, 2),
(1, 'https://images.unsplash.com/photo-1544148103-0773bf10d330', FALSE, 3),

-- Quintonil
(2, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', TRUE, 1),
(2, 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c', FALSE, 2),

-- Contramar
(6, 'https://images.unsplash.com/photo-1559847844-5315695dadae', TRUE, 1),
(6, 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df', FALSE, 2),

-- El Califa
(17, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, 1),
(17, 'https://images.unsplash.com/photo-1613514785940-daed07799d9b', FALSE, 2),

-- Tacos Hola
(18, 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', TRUE, 1),

-- Rosetta
(5, 'https://images.unsplash.com/photo-1544025162-d76694265947', TRUE, 1),
(5, 'https://images.unsplash.com/photo-1481931715705-36f5f79f1f3d', FALSE, 2),

-- Rokai
(22, 'https://images.unsplash.com/photo-1557872943-16a5ac26437e', TRUE, 1),
(22, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624', FALSE, 2),

-- Panadería Rosetta
(30, 'https://images.unsplash.com/photo-1509440159596-0249088772ff', TRUE, 1),
(30, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a', FALSE, 2),

-- Sonora Grill
(34, 'https://images.unsplash.com/photo-1544025162-d76694265947', TRUE, 1),
(34, 'https://images.unsplash.com/photo-1558030006-450675393462', FALSE, 2),

-- Más restaurantes con imágenes genéricas apropiadas
(4, 'https://images.unsplash.com/photo-1552566626-52f8b828add9', TRUE, 1),
(7, 'https://images.unsplash.com/photo-1528605248644-14dd04022da1', TRUE, 1),
(8, 'https://images.unsplash.com/photo-1587314168485-3236d6710814', TRUE, 1),
(11, 'https://images.unsplash.com/photo-1583394838336-acd977736f90', TRUE, 1),
(15, 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17', TRUE, 1),
(27, 'https://images.unsplash.com/photo-1580959675944-2b2e5c6eb40e', TRUE, 1),
(28, 'https://images.unsplash.com/photo-1535473895227-bdecb20fb157', TRUE, 1),
(36, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', TRUE, 1),
(37, 'https://images.unsplash.com/photo-1432139555190-58524dae6a55', TRUE, 1);

-- =============================================
-- DATOS DE EJEMPLO: USUARIOS Y RESEÑAS
-- =============================================

-- Usuarios de ejemplo (con OAuth)
INSERT INTO usuarios (nombreUsuario, email, nombre, apellido, provider, emailVerificado, activo) VALUES
('juanperez', 'juan.perez@gmail.com', 'Juan', 'Pérez', 'google', TRUE, TRUE),
('mariarodriguez', 'maria.rodriguez@gmail.com', 'María', 'Rodríguez', 'google', TRUE, TRUE),
('carloslopez', 'carlos.lopez@outlook.com', 'Carlos', 'López', 'local', FALSE, TRUE),
('anamartinez', 'ana.martinez@yahoo.com', 'Ana', 'Martínez', 'local', TRUE, TRUE),
('luisgomez', 'luis.gomez@gmail.com', 'Luis', 'Gómez', 'google', TRUE, TRUE);

-- Reseñas de ejemplo
INSERT INTO reseñas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(1, 1, 5, 'Experiencia increíble en Pujol. El mole madre es algo que todos deben probar. Servicio impecable y ambiente sofisticado.', TRUE),
(2, 1, 5, 'Sin duda uno de los mejores restaurantes de México. Cada platillo es una obra de arte. Vale cada peso.', TRUE),
(1, 6, 5, 'El pescado a la talla de Contramar es legendario y no decepciona. Las tostadas de atún son perfectas. Siempre lleno pero vale la espera.', TRUE),
(3, 6, 4, 'Muy bueno pero esperaba más por la fama. El pescado está bien pero no extraordinario. El ambiente es agradable.', TRUE),
(2, 17, 5, 'Los mejores tacos de gaonera de la ciudad. Un clásico que nunca falla. Precios justos y buen servicio.', TRUE),
(4, 17, 5, 'Tradición pura. Los tacos de costilla son espectaculares. Si vas a CDMX, es parada obligada.', TRUE),
(5, 22, 5, 'El mejor ramen que he probado en México. El caldo tonkotsu es auténtico, cremoso y delicioso. Totalmente recomendado.', TRUE),
(1, 5, 5, 'Rosetta es mágico. La pasta fresca es excelente y el tiramisú es el mejor que he probado fuera de Italia.', TRUE),
(3, 30, 5, 'Los guava rolls son adictivos. El pan es de otro nivel. Siempre hay fila pero se mueve rápido.', TRUE),
(4, 18, 4, 'Tacos gourmet bien hechos. El de rib eye es muy bueno. Un poco caro para tacos pero la calidad lo justifica.', TRUE),
(2, 34, 5, 'Cortes excelentes. El New York Sonora Prime está en su punto perfecto. Ambiente elegante y servicio atento.', TRUE),
(5, 2, 5, 'Quintonil es espectacular. Cocina mexicana elevada con ingredientes frescos. La ensalada de nopales es sorprendente.', TRUE),
(1, 8, 4, 'Buenos mariscos y cortes. El pulpo está muy bien preparado. Precios medios-altos pero calidad buena.', TRUE),
(3, 15, 5, 'Experiencia única en San Ángel Inn. Los jardines son hermosos y la comida tradicional mexicana está deliciosa.', TRUE),
(4, 27, 4, 'Linda ubicación en el lago. Los mariscos frescos y buena vista. Ideal para ocasiones especiales.', TRUE);

-- Favoritos de ejemplo
INSERT INTO favoritos (idUsuario, idRestaurante) VALUES
(1, 1), (1, 6), (1, 17), (1, 30),
(2, 1), (2, 5), (2, 22), (2, 34),
(3, 6), (3, 17), (3, 18), (3, 30),
(4, 15), (4, 27), (4, 22), (4, 5),
(5, 2), (5, 22), (5, 8), (5, 34);

-- Búsquedas de ejemplo
INSERT INTO busquedas (idUsuario, texto, contexto, resultadosEncontrados) VALUES
(1, 'tacos cerca de mi', 'mapa', 5),
(1, 'restaurantes mexicanos polanco', 'búsqueda', 12),
(2, 'mejor sushi cdmx', 'búsqueda', 8),
(3, 'mariscos roma', 'búsqueda', 6),
(4, 'brunch condesa', 'búsqueda', 10),
(5, 'restaurantes románticos', 'búsqueda', 15);

-- =============================================
-- MÁS RESTAURANTES - DIVERSAS ZONAS CDMX
-- =============================================

INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
-- Zona: Santa Fe / Interlomas
('Hunan', 'Prado Norte 324, Lomas de Chapultepec', 1, 19.4256, -99.2134, '5552022088', 'hunan.mx', 'Cocina china cantonesa de alta calidad. Especialidades en dim sum y pato laqueado.', 750, TRUE),
('Astrid y Gastón', 'Tennyson 117, Polanco', 1, 19.4362, -99.1915, '5552804003', 'astridygaston.com.mx', 'Cocina peruana de alta gama. Propuesta del chef Gastón Acurio con ceviches y anticuchos.', 1200, TRUE),
('Biko', 'Av. Presidente Masaryk 407, Polanco', 1, 19.4289, -99.1989, '5552827100', 'biko.com.mx', 'Cocina vasca contemporánea. Técnicas innovadoras con productos locales y españoles.', 1800, TRUE),

-- Zona: Del Valle / Nápoles
('Blanco Colima', 'Colima 168, Roma Norte', 1, 19.4176, -99.1627, '5555148658', 'blancocolima.com', 'Cocina contemporánea mexicana. Ambiente elegante y carta de vinos selecta.', 850, TRUE),
('Grumo', 'Saltillo 46, Condesa', 1, 19.4098, -99.1756, '5555535934', NULL, 'Pizzería napolitana auténtica. Masa fermentada 72 horas, horno de leña importado.', 380, TRUE),
('Ficus', 'Alfonso Reyes 232, Condesa', 1, 19.4145, -99.1689, '5552564634', 'ficusrestaurante.com', 'Cocina mediterránea y de mercado. Terraza arbolada y ambiente relajado.', 550, TRUE),

-- Zona: Juárez / Cuauhtémoc
('Huset', 'Colima 256, Roma Norte', 1, 19.4123, -99.1667, '5555333823', 'huset.mx', 'Cocina nórdica con ingredientes mexicanos. Panadería y café de especialidad.', 480, TRUE),
('Merkavá', 'Calle Chihuahua 173, Roma Norte', 1, 19.4134, -99.1634, '5555145329', 'merkava.mx', 'Cocina israelí moderna. Hummus casero, shawarma y panes horneados al momento.', 420, TRUE),
('Maque', 'Insurgentes Sur 377, Condesa', 1, 19.4078, -99.1712, '5556874677', 'maque.mx', 'Cocina mexicana moderna. Especialidad en moles regionales y mezcales artesanales.', 580, TRUE),

-- Zona: Coyoacán (adicionales)
('La Vinería', 'Centenario 5, Coyoacán', 1, 19.3512, -99.1625, '5556589821', NULL, 'Wine bar y tapas españolas. Más de 100 etiquetas de vino y quesos importados.', 520, TRUE),
('Chez Nous', 'Allende 111, Coyoacán', 1, 19.3545, -99.1598, '5556591974', NULL, 'Cocina francesa casera. Crêpes, quiches y fondues en ambiente bohemio.', 380, TRUE),

-- Zona: San Pedro de los Pinos / Narvarte
('Dulce Patria', 'Av. Anatole France 100, Polanco', 1, 19.4278, -99.1967, '5553002330', 'dulcepatria.com.mx', 'Cocina mexicana decorativa. Presentaciones artísticas de platillos tradicionales.', 950, TRUE),
('Lampuga', 'Av. Universidad 2903, Copilco', 1, 19.3367, -99.1756, '5556618988', 'lampuga.com.mx', 'Seafood bar contemporáneo. Ostiones, almejas y pescados con preparaciones creativas.', 680, TRUE),

-- Zona: Anzures / Verónica Anzures
('Anatol', 'Emilio Castelar 95, Polanco', 1, 19.4334, -99.1912, '5552803840', NULL, 'Steakhouse clásico. Cortes importados y nacionales, cava privada extensa.', 1150, TRUE),
('Ardea', 'Av. Nuevo León 107, Condesa', 1, 19.4089, -99.1689, '5555845000', 'ardearestaurante.com', 'Cocina de autor mexicana. Menú degustación con ingredientes endémicos y técnicas modernas.', 1400, TRUE),

-- Taquerías adicionales
('El Fogoncito', 'Av. Insurgentes Sur 1377, Noche Buena', 1, 19.3767, -99.1789, '5556687171', 'elfogoncito.com.mx', 'Cadena tradicional de tacos al pastor. Trompo clásico y salsas caseras desde 1966.', 150, TRUE),
('El Turix', 'Emilio Castelar 212, Polanco', 1, 19.4323, -99.1934, '5552814306', NULL, 'Cocina yucateca casual. Especialidad en cochinita pibil y panuchos auténticos.', 180, TRUE),
('Por Siempre Vegana Taquería', 'Av. Insurgentes Sur 235, Roma Norte', 1, 19.4201, -99.1623, '5555332051', 'porsiemprevegana.com', 'Taquería 100% vegana. Suadero, pastor y bistec vegetales con sabores auténticos.', 160, TRUE),
('Tacos Don Juan', 'Pachuca 24, Condesa', 1, 19.4123, -99.1745, NULL, NULL, 'Tacos de guisados tradicionales. Variedad diaria de guisos caseros estilo abuela.', 90, TRUE),

-- Cocina Asiática
('Suntory', 'Torre del Caballito, Reforma 222', 1, 19.4267, -99.1678, '5552071895', 'suntory.com.mx', 'Restaurante japonés tradicional. Teppanyaki, sushi y robatayaki desde 1970.', 950, TRUE),
('Kura', 'Av. Presidente Masaryk 339, Polanco', 1, 19.4301, -99.1978, '5552818800', 'kurarestaurante.mx', 'Cocina japonesa de autor. Omakase premium y sake importados de regiones especializadas.', 1600, TRUE),
('Mog', 'Amsterdam 263, Condesa', 1, 19.4089, -99.1701, '5555849602', 'mogbistro.com', 'Cocina coreana moderna. Bibimbap, Korean BBQ y kimchi casero fermentado.', 480, TRUE),
('Bao Bei', 'Av. Nuevo León 73, Condesa', 1, 19.4101, -99.1712, '5555640012', NULL, 'Bao buns artesanales y cocina asiática fusión. Rellenos creativos y postres únicos.', 320, TRUE),

-- Pizzerías
('Cancino', 'Viaducto Miguel Alemán 26, Escandón', 1, 19.4012, -99.1789, '5556151596', 'cancino.com.mx', 'Pizzería italiana familiar. Receta napolitana tradicional desde 1953.', 380, TRUE),
('Félix', 'Av. Álvaro Obregón 64, Roma Norte', 1, 19.4167, -99.1634, '5555644626', NULL, 'Pizza al taglio romana. Masa madre 48 horas, ingredientes italianos premium.', 280, TRUE),
('Caseina', 'Amsterdam 122, Condesa', 1, 19.4123, -99.1723, '5555532000', NULL, 'Pizza y pasta artesanal. Buffala importada y productos orgánicos locales.', 420, TRUE),

-- Cocina Libanesa / Medio Oriente
('Noor', 'Durango 279, Roma Norte', 1, 19.4134, -99.1678, '5552072992', 'noor.rest', 'Cocina árabe contemporánea. Mezzes creativos, grills y panes horneados al momento.', 580, TRUE),
('Ziryab', 'Insurgentes Sur 1971, Florida', 1, 19.3656, -99.1867, '5556625678', NULL, 'Restaurante libanés tradicional. Shawarma, kibbeh y narguiles en terraza.', 380, TRUE),

-- Brunch / Desayunos especializados
('Lalo!', 'Zacatecas 173, Roma Norte', 1, 19.4156, -99.1589, '5555110821', 'lalo.com.mx', 'Brunch all-day. Chilaquiles gourmet, pancakes y bebidas artesanales creativos.', 280, TRUE),
('Cicatriz', 'Marsella 89, Juárez', 1, 19.4223, -99.1623, '5555922050', 'cicatrizcafe.com', 'Café de especialidad y desayunos. Waffles, molletes y avocado toast en ambiente trendy.', 260, TRUE),
('Belmondo', 'Mérida 109, Roma Norte', 1, 19.4145, -99.1645, '5555335131', 'belmondo.mx', 'Bistrot francés y brunch. Croissants, omelettes y French toast en terraza verde.', 340, TRUE),

-- Vegetarianos / Veganos
('Plantasia', 'Cozumel 83, Roma Norte', 1, 19.4167, -99.1601, '5555259990', NULL, 'Cocina vegana creativa. Bowl nutritivos, burgers vegetales y postres sin lácteos.', 240, TRUE),
('Forever Vegano', 'Amsterdam 255, Condesa', 1, 19.4098, -99.1689, '5555642847', 'forevervegano.com', 'Comfort food vegano. Alitas de coliflor, nachos y hamburguesas plant-based.', 280, TRUE),
('Pan Comido', 'Cozumel 5, Roma Norte', 1, 19.4189, -99.1589, '5555140426', 'pancomido.com', 'Panadería vegana. Pan dulce, roles de canela y café orgánico.', 180, TRUE),

-- Postres / Helados
('Nevería Roxy', 'Fernando Montes de Oca 89, Condesa', 1, 19.4123, -99.1678, '5555531867', 'neveriaroxy.com.mx', 'Helados artesanales. Sabores mexicanos y exóticos con ingredientes naturales.', 120, TRUE),
('Gelateria La Nonna', 'Mazatlán 74, Condesa', 1, 19.4134, -99.1734, NULL, NULL, 'Gelato italiano auténtico. Sabores tradicionales y proceso artesanal diario.', 110, TRUE),
('Maque Postres', 'Insurgentes Sur 377, Condesa', 1, 19.4078, -99.1712, '5556874677', NULL, 'Postres contemporáneos mexicanos. Repostería fina con ingredientes mexicanos.', 150, TRUE),

-- Comida Peruana
('Mar', 'Anatole France 42, Polanco', 1, 19.4289, -99.1956, '5555454444', NULL, 'Cevichería peruana. Ceviches variados, tiraditos y causas con productos frescos.', 480, TRUE),
('Mayta', 'Emilio Castelar 163, Polanco', 1, 19.4312, -99.1923, '5552817637', 'mayta.com.mx', 'Restaurante peruano de alto nivel. Cocina moderna con raíces tradicionales andinas.', 980, TRUE),

-- Comida Brasileña / Sudamericana
('Rojo Bistrot', 'Ámsterdam 71, Condesa', 1, 19.4123, -99.1723, '5556876432', NULL, 'Bistrot contemporáneo. Cortes, pastas y ceviches en ambiente casual-elegante.', 650, TRUE),
('Terra', 'Av. de la Paz 40, San Ángel', 1, 19.3478, -99.1867, '5556160947', 'restauranteterra.com', 'Cocina de autor latinoamericana. Ingredientes orgánicos en casa colonial histórica.', 880, TRUE),

-- Seafood adicionales
('Kayab', 'Tehuantepec 283, Roma Sur', 1, 19.4001, -99.1678, '5555840110', NULL, 'Mariscos estilo Nayarit. Aguachiles, cocteles y tostadas con productos del Pacífico.', 420, TRUE),
('Pesca', 'Boulevard Adolfo López Mateos 2100, Altavista', 1, 19.3423, -99.2012, '5556839177', NULL, 'Fish market y restaurante. Pescado fresco del día preparado a elección del cliente.', 550, TRUE),
('Mariscos Mazatlán', 'Insurgentes Sur 1673, Guadalupe Inn', 1, 19.3689, -99.1823, '5556875555', NULL, 'Mariscos estilo Sinaloa. Callo de hacha, camarones y marlin ahumado tradicional.', 380, TRUE),

-- Alitas y Casual American
('Hooters', 'Insurgentes Sur 1991, Florida', 1, 19.3645, -99.1878, '5556611100', 'hooters.com.mx', 'Sports bar americano. Alitas estilo búfalo, burgers y pantallas para deportes.', 320, TRUE),
('Buffalo Wild Wings', 'Viaducto Río de la Piedad 515, Roma', 1, 19.4012, -99.1578, '5555598888', 'buffalowildwings.com.mx', 'Alitas y sports bar. 16 salsas distintas, cervezas y ambiente deportivo.', 350, TRUE),

-- Hamburguesas Gourmet
('Butcher', 'Ámsterdam 239, Condesa', 1, 19.4089, -99.1689, '5555645554', 'butcher.mx', 'Burgers premium. Carne 100% angus, pan brioche artesanal y papas truffle.', 380, TRUE),
('Buns', 'Frontera 168, Roma Norte', 1, 19.4178, -99.1612, '5555143400', NULL, 'Hamburguesas artesanales. Blend especial de carnes y toppings creativos.', 280, TRUE),
('Shake Shack', 'Antara Polanco, Ejército Nacional', 1, 19.4389, -99.2012, '5555001000', 'shakeshack.com.mx', 'Cadena icónica NY. ShackBurger, cheese fries y milkshakes cremosos.', 320, TRUE),

-- Wings y Sports Bars
('Wings Army', 'Av. de los Insurgentes Sur 1079, Noche Buena', 1, 19.3756, -99.1789, '5556611818', 'wingsarmy.com.mx', 'Alitas y boneless. Salsas únicas y promociones para ver partidos.', 280, TRUE),
('Wingería Los Amigos', 'Atlixco 64, Condesa', 1, 19.4089, -99.1745, NULL, NULL, 'Alitas de autor. Salsas innovadoras y cervezas artesanales mexicanas.', 260, TRUE),

-- Fast Casual Mexicano
('Los Parados', 'Monterrey 333, Roma Norte', 1, 19.4123, -99.1634, '5555642000', NULL, 'Tacos y quesadillas para llevar. Ingredientes frescos y porciones generosas.', 110, TRUE),
('El Borrego Viudo', 'Dr. Lucio 125, Doctores', 1, 19.4234, -99.1445, '5555887650', NULL, 'Tacos de borrego y barbacoa. Especialidad en pancita y consomé tradicional.', 140, TRUE),

-- =============================================
-- PLATILLOS ADICIONALES (para nuevos restaurantes)
-- =============================================

INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, disponible, destacado) VALUES
-- Hunan (50)
(50, 'Pato Laqueado', 685, 'Pato laqueado estilo Pekín con pancakes y salsa hoisin', TRUE, TRUE),
(50, 'Dim Sum Surtido', 385, 'Selección de 8 piezas de dim sum variado', TRUE, TRUE),
(50, 'Beef with Broccoli', 295, 'Res salteada con brócoli en salsa de ostión', TRUE, FALSE),

-- Astrid y Gastón (51)
(51, 'Ceviche Clásico', 385, 'Ceviche de pescado con leche de tigre y camote', TRUE, TRUE),
(51, 'Anticuchos de Corazón', 295, 'Corazón de res marinado en anticucho con papa huayro', TRUE, TRUE),
(51, 'Lomo Saltado', 485, 'Salteado peruano con res, tomate y papas fritas', TRUE, FALSE),

-- Biko (52)
(52, 'Menú Degustación Corto', 1500, '7 tiempos de cocina vasca contemporánea', TRUE, TRUE),
(52, 'Menú Degustación Largo', 2200, '11 tiempos con maridaje opcional', TRUE, TRUE),

-- Blanco Colima (53)
(53, 'Aguachile Negro', 395, 'Camarones en aguachile de chile pasilla', TRUE, TRUE),
(53, 'Rib Eye Blanco', 685, 'Rib eye 300g con pure de papa y mantequilla compound', TRUE, FALSE),

-- Grumo (54)
(54, 'Margherita', 245, 'Pizza clásica con bufala, tomate San Marzano y albahaca', TRUE, TRUE),
(54, 'Diavola', 285, 'Pizza con pepperoni picante y aceite de chile', TRUE, FALSE),
(54, 'Quattro Formaggi', 295, 'Pizza con cuatro quesos italianos', TRUE, FALSE),

-- Ficus (55)
(55, 'Pulpo a la Parrilla', 495, 'Pulpo mediterráneo con pure de garbanzo y pimentón', TRUE, TRUE),
(55, 'Pasta Nero di Seppia', 385, 'Pasta negra con calamar fresco y tomates cherry', TRUE, FALSE),

-- Huset (56)
(56, 'Gravlax de Salmón', 295, 'Salmón curado estilo nórdico con eneldo y mostaza', TRUE, TRUE),
(56, 'Pan de Masa Madre', 85, 'Pan artesanal horneado diariamente', TRUE, FALSE),
(56, 'Smørrebrød', 245, 'Pan abierto danés con toppings variados', TRUE, FALSE),

-- Merkavá (57)
(57, 'Hummus Completo', 185, 'Hummus casero con tahini, garbanzos y pan pita', TRUE, TRUE),
(57, 'Shawarma de Cordero', 285, 'Cordero marinado en pan pita con verduras y tahini', TRUE, TRUE),
(57, 'Falafel Plate', 225, 'Falafel crujiente con ensalada y salsas', TRUE, FALSE),

-- Maque (58)
(58, 'Mole Negro Oaxaqueño', 385, 'Mole negro con pollo y arroz blanco', TRUE, TRUE),
(58, 'Tlayuda Oaxaqueña', 245, 'Tortilla gigante con asiento, frijoles y tasajo', TRUE, FALSE),

-- La Vinería (59)
(59, 'Tabla de Quesos', 385, 'Selección de 5 quesos con mermeladas y frutos secos', TRUE, TRUE),
(59, 'Jamón Ibérico', 485, 'Jamón ibérico de bellota con pan de cristal', TRUE, TRUE),

-- Chez Nous (60)
(60, 'Crêpe de Nutella', 135, 'Crêpe con nutella y fresas frescas', TRUE, FALSE),
(60, 'Quiche Lorraine', 195, 'Quiche clásica con tocino y queso gruyere', TRUE, TRUE),
(60, 'Fondue de Queso', 385, 'Fondue suizo para 2 personas con pan y verduras', TRUE, FALSE),

-- Dulce Patria (61)
(61, 'Chile en Nogada', 485, 'Chile poblano relleno con nogada y granada', TRUE, TRUE),
(61, 'Cochinita Pibil', 395, 'Cochinita yucateca con cebolla morada', TRUE, FALSE),

-- Lampuga (62)
(62, 'Ostiones Frescos', 285, 'Media docena de ostiones con migronnettes', TRUE, TRUE),
(62, 'Ceviche de Pulpo', 385, 'Pulpo en ceviche con aguacate y cilantro', TRUE, FALSE),

-- Anatol (63)
(63, 'Tomahawk Steak', 1450, 'Corte Tomahawk 800g para compartir', TRUE, TRUE),
(63, 'Filet Mignon', 895, 'Filete mignon 250g con salsa béarnaise', TRUE, FALSE),

-- Ardea (64)
(64, 'Menú Degustación 7 tiempos', 1800, 'Experiencia gastronómica de autor', TRUE, TRUE),

-- El Fogoncito (65)
(65, 'Tacos al Pastor', 48, 'Tacos al pastor con piña', TRUE, TRUE),
(65, 'Gringas', 95, 'Tortilla de harina con pastor y queso', TRUE, FALSE),

-- El Turix (66)
(66, 'Cochinita Pibil', 145, 'Tacos de cochinita con cebolla morada', TRUE, TRUE),
(66, 'Panuchos Yucatecos', 155, 'Panuchos rellenos de frijol con cochinita', TRUE, FALSE),

-- Por Siempre Vegana (67)
(67, 'Tacos de Suadero Vegano', 95, 'Suadero vegetal con cebolla y cilantro', TRUE, TRUE),
(67, 'Pastor Vegano', 95, 'Pastor de soya con piña', TRUE, FALSE),

-- Tacos Don Juan (68)
(68, 'Tacos de Guisado', 38, 'Taco de guisado del día', TRUE, TRUE),
(68, 'Quesadilla de Guisado', 55, 'Quesadilla rellena de guisado', TRUE, FALSE),

-- Suntory (69)
(69, 'Teppanyaki de Res', 895, 'Res preparada en teppanyaki con verduras', TRUE, TRUE),
(69, 'Sushi Surtido', 685, 'Selección premium de 16 piezas', TRUE, FALSE),

-- Kura (70)
(70, 'Omakase Premium', 2800, 'Experiencia omakase por el chef', TRUE, TRUE),
(70, 'Sashimi Deluxe', 1200, 'Selección de pescados del día en sashimi', TRUE, FALSE),

-- Mog (71)
(71, 'Bibimbap', 285, 'Arroz con verduras, huevo y carne bulgogi', TRUE, TRUE),
(71, 'Korean BBQ Combo', 485, 'Carnes marinadas para asar en mesa', TRUE, FALSE),

-- Bao Bei (72)
(72, 'Bao de Pork Belly', 95, 'Bao con panceta crujiente y verduras', TRUE, TRUE),
(72, 'Bao de Pollo Frito', 85, 'Bao con pollo frito estilo asiático', TRUE, FALSE),

-- Cancino (73)
(73, 'Pizza Napolitana', 285, 'Pizza margarita clásica napolitana', TRUE, TRUE),
(73, 'Calzone', 295, 'Calzone relleno de jamón y queso', TRUE, FALSE),

-- Félix (74)
(74, 'Pizza al Taglio Margherita', 85, 'Rebanada de pizza margherita', TRUE, TRUE),
(74, 'Pizza Mortadela', 95, 'Pizza con mortadela y pistacho', TRUE, FALSE),

-- Caseina (75)
(75, 'Pizza Bufala', 385, 'Pizza con mozzarella de búfala importada', TRUE, TRUE),
(75, 'Pasta Carbonara', 295, 'Carbonara cremosa con guanciale', TRUE, FALSE),

-- Noor (76)
(76, 'Mezze Platter', 485, 'Tabla de mezzes variados árabes', TRUE, TRUE),
(76, 'Cordero Asado', 685, 'Pierna de cordero con especias', TRUE, FALSE),

-- Ziryab (77)
(77, 'Shawarma Mixto', 195, 'Shawarma de pollo y res con salsas', TRUE, TRUE),
(77, 'Kibbeh', 165, 'Kibbeh frito relleno de carne', TRUE, FALSE),

-- Lalo! (78)
(78, 'Chilaquiles Lalo', 185, 'Chilaquiles con pollo y dos huevos', TRUE, TRUE),
(78, 'Pancakes de Plátano', 165, 'Pancakes con plátano caramelizado', TRUE, FALSE),

-- Cicatriz (79)
(79, 'Avocado Toast', 185, 'Pan masa madre con aguacate y huevo pochado', TRUE, TRUE),
(79, 'Waffle Belga', 165, 'Waffle con frutos rojos y maple', TRUE, FALSE),

-- Belmondo (80)
(80, 'Croque Monsieur', 195, 'Sándwich francés gratinado con bechamel', TRUE, TRUE),
(80, 'Omelette Francesa', 185, 'Omelette de 3 huevos con queso gruyere', TRUE, FALSE),

-- Plantasia (81)
(81, 'Buddha Bowl', 195, 'Bowl con quinoa, vegetales y tahini', TRUE, TRUE),
(81, 'Burger Vegana', 185, 'Hamburguesa de lentejas y hongos', TRUE, FALSE),

-- Forever Vegano (82)
(82, 'Alitas de Coliflor', 165, 'Coliflor búfalo con ranch vegano', TRUE, TRUE),
(82, 'Nachos Veganos', 185, 'Nachos con queso vegano y guacamole', TRUE, FALSE),

-- Pan Comido (83)
(83, 'Rol de Canela', 65, 'Rol de canela vegano con glaseado', TRUE, TRUE),
(83, 'Pan Dulce Vegano', 45, 'Concha o cuerno vegano', TRUE, FALSE),

-- Nevería Roxy (84)
(84, 'Helado 2 Bolas', 85, 'Dos bolas de helado artesanal', TRUE, TRUE),
(84, 'Banana Split', 135, 'Plátano con helado y toppings', TRUE, FALSE),

-- Gelatería La Nonna (85)
(85, 'Gelato 2 Sabores', 95, 'Gelato italiano artesanal', TRUE, TRUE),
(85, 'Affogato', 115, 'Gelato con espresso caliente', TRUE, FALSE),

-- Maque Postres (86)
(86, 'Pastel de Tres Leches', 125, 'Tres leches con cajeta y nuez', TRUE, TRUE),
(86, 'Flan Napolitano', 95, 'Flan tradicional cremoso', TRUE, FALSE),

-- Mar (87)
(87, 'Ceviche Mixto', 385, 'Ceviche de pescado y camarón', TRUE, TRUE),
(87, 'Tiradito Nikkei', 395, 'Tiradito con salsa acevichada', TRUE, TRUE),

-- Mayta (88)
(88, 'Ceviche Carretillero', 485, 'Ceviche estilo carretilla peruana', TRUE, TRUE),
(88, 'Pulpo al Olivo', 585, 'Pulpo con salsa de aceituna negra', TRUE, FALSE),

-- Rojo Bistrot (89)
(89, 'Entraña a la Parrilla', 485, 'Entraña con chimichurri y papas', TRUE, TRUE),
(89, 'Pasta Frutti di Mare', 425, 'Pasta con mariscos en salsa de tomate', TRUE, FALSE),

-- Terra (90)
(90, 'Menú Degustación Terra', 1200, '6 tiempos de cocina latinoamericana', TRUE, TRUE),
(90, 'Ceviche de la Casa', 385, 'Ceviche con toque de autor', TRUE, FALSE),

-- Kayab (91)
(91, 'Aguachile de Camarón', 285, 'Camarones en aguachile verde limón', TRUE, TRUE),
(91, 'Tostada de Atún', 145, 'Tostada con atún fresco y aguacate', TRUE, FALSE),
(91, 'Cóctel Vuelve a la Vida', 245, 'Cóctel mixto de mariscos', TRUE, FALSE),

-- Pesca (92)
(92, 'Pescado del Día', 395, 'Pescado fresco preparado a elección', TRUE, TRUE),
(92, 'Camarones a la Diabla', 385, 'Camarones en salsa picante', TRUE, FALSE),

-- Mariscos Mazatlán (93)
(93, 'Callo de Hacha', 295, 'Callo de hacha fresco con limón', TRUE, TRUE),
(93, 'Marlin Ahumado', 245, 'Marlin ahumado con tostadas', TRUE, FALSE),
(93, 'Aguachile Rojo', 285, 'Camarones en aguachile de chile seco', TRUE, FALSE),

-- Hooters (94)
(94, 'Alitas Búfalo', 245, 'Orden de 10 alitas salsa búfalo', TRUE, TRUE),
(94, 'Burger Clásica', 185, 'Hamburguesa con papas fritas', TRUE, FALSE),

-- Buffalo Wild Wings (95)
(95, 'Boneless 10 piezas', 195, 'Boneless con salsa a elegir', TRUE, TRUE),
(95, 'Alitas Tradicionales', 225, 'Alitas con hueso, salsa a elegir', TRUE, FALSE),

-- Butcher (96)
(96, 'Butcher Burger', 285, 'Burger 200g angus con queso y tocino', TRUE, TRUE),
(96, 'Papas Truffle', 145, 'Papas con aceite de trufa y parmesano', TRUE, FALSE),

-- Buns (97)
(97, 'Buns Classic', 195, 'Hamburguesa clásica con cebolla caramelizada', TRUE, TRUE),
(97, 'Buns BBQ', 215, 'Burger con salsa BBQ y onion rings', TRUE, FALSE),

-- Shake Shack (98)
(98, 'ShackBurger', 185, 'Burger clásica con ShackSauce', TRUE, TRUE),
(98, 'Cheese Fries', 125, 'Papas con queso fundido', TRUE, FALSE),
(98, 'Milkshake Vainilla', 95, 'Milkshake cremoso de vainilla', TRUE, FALSE),

-- Wings Army (99)
(99, 'Alitas 10 piezas', 185, 'Alitas con salsa a elegir', TRUE, TRUE),
(99, 'Boneless Combo', 195, 'Boneless con papas y refresco', TRUE, FALSE),

-- Wingería Los Amigos (100)
(100, 'Alitas de Autor', 215, 'Alitas con salsas especiales de la casa', TRUE, TRUE),
(100, 'Dedos de Queso', 125, 'Dedos de queso empanizados', TRUE, FALSE),

-- Los Parados (101)
(101, 'Quesadilla Mixta', 85, 'Quesadilla con carne y vegetales', TRUE, TRUE),
(101, 'Tacos de Suadero', 55, 'Orden de 3 tacos de suadero', TRUE, FALSE),

-- El Borrego Viudo (102)
(102, 'Tacos de Borrego', 95, 'Tacos de borrego en barbacoa', TRUE, TRUE),
(102, 'Consomé Grande', 85, 'Consomé de borrego con garbanzos', TRUE, TRUE),
(102, 'Quesadilla de Pancita', 105, 'Quesadilla con pancita de borrego', TRUE, FALSE);

-- =============================================
-- MÁS RELACIONES RESTAURANTE-CATEGORÍAS
-- =============================================
INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(50, 13), -- Hunan: Asiática
(51, 7),  -- Astrid y Gastón: Internacional
(52, 12), (52, 14), -- Biko: Francesa, Contemporánea
(53, 14), (53, 1), -- Blanco Colima: Contemporánea, Mexicana
(54, 2), -- Grumo: Italiana
(55, 7), (55, 14), -- Ficus: Internacional, Contemporánea
(56, 7), (56, 8), -- Huset: Internacional, Cafetería
(57, 7), -- Merkavá: Internacional
(58, 1), -- Maque: Mexicana
(59, 11), -- La Vinería: Española
(60, 12), -- Chez Nous: Francesa
(61, 1), (61, 14), -- Dulce Patria: Mexicana, Contemporánea
(62, 4), (62, 15), -- Lampuga: Mariscos, Seafood
(63, 6), -- Anatol: Steakhouse
(64, 14), (64, 1), -- Ardea: Contemporánea, Mexicana
(65, 5), -- El Fogoncito: Tacos
(66, 1), (66, 5), -- El Turix: Mexicana, Tacos
(67, 9), (67, 5), -- Por Siempre Vegana: Vegetariana, Tacos
(68, 1), (68, 5), -- Tacos Don Juan: Mexicana, Tacos
(69, 3), -- Suntory: Japonesa
(70, 3), -- Kura: Japonesa
(71, 13), -- Mog: Asiática
(72, 13), -- Bao Bei: Asiática
(73, 2), -- Cancino: Italiana
(74, 2), -- Félix: Italiana
(75, 2), -- Caseina: Italiana
(76, 7), -- Noor: Internacional
(77, 7), -- Ziryab: Internacional
(78, 8), (78, 7), -- Lalo!: Cafetería, Internacional
(79, 8), -- Cicatriz: Cafetería
(80, 12), (80, 8), -- Belmondo: Francesa, Cafetería
(81, 9), -- Plantasia: Vegetariana
(82, 9), -- Forever Vegano: Vegetariana
(83, 8), (83, 9), -- Pan Comido: Cafetería, Vegetariana
(84, 8), -- Nevería Roxy: Cafetería
(85, 8), -- Gelatería La Nonna: Cafetería
(86, 8), -- Maque Postres: Cafetería
(87, 4), (87, 7), -- Mar: Mariscos, Internacional
(88, 7), (88, 4), -- Mayta: Internacional, Mariscos
(89, 7), (89, 6), -- Rojo Bistrot: Internacional, Steakhouse
(90, 7), (90, 14), -- Terra: Internacional, Contemporánea
(91, 4), (91, 15), -- Kayab: Mariscos, Seafood
(92, 4), (92, 15), -- Pesca: Mariscos, Seafood
(93, 4), -- Mariscos Mazatlán: Mariscos
(94, 7), -- Hooters: Internacional
(95, 7), -- Buffalo Wild Wings: Internacional
(96, 7), -- Butcher: Internacional
(97, 7), -- Buns: Internacional
(98, 7), -- Shake Shack: Internacional
(99, 7), -- Wings Army: Internacional
(100, 7), -- Wingería Los Amigos: Internacional
(101, 1), (101, 5), -- Los Parados: Mexicana, Tacos
(102, 1), (102, 5); -- El Borrego Viudo: Mexicana, Tacos

-- =============================================
-- MÁS RELACIONES RESTAURANTE-CARACTERÍSTICAS
-- =============================================
INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(50, 7), (50, 3), (50, 11), (50, 10), -- Hunan
(51, 7), (51, 11), (51, 15), (51, 10), -- Astrid y Gastón
(52, 7), (52, 11), (52, 15), -- Biko
(53, 7), (53, 5), (53, 4), (53, 11), -- Blanco Colima
(54, 9), (54, 8), (54, 2), -- Grumo
(55, 2), (55, 7), (55, 4), (55, 12), -- Ficus
(56, 4), (56, 9), (56, 13), (56, 2), -- Huset
(57, 9), (57, 8), (57, 4), (57, 10), -- Merkavá
(58, 7), (58, 5), (58, 4), -- Maque
(59, 5), (59, 2), (59, 7), (59, 6), -- La Vinería
(60, 2), (60, 15), (60, 4), -- Chez Nous
(61, 7), (61, 11), (61, 15), (61, 2), (61, 12), -- Dulce Patria
(62, 7), (62, 2), (62, 4), (62, 9), -- Lampuga
(63, 7), (63, 3), (63, 5), (63, 11), -- Anatol
(64, 7), (64, 11), (64, 15), -- Ardea
(65, 8), (65, 9), (65, 13), -- El Fogoncito
(66, 9), (66, 8), (66, 13), -- El Turix
(67, 9), (67, 8), (67, 10), (67, 4), -- Por Siempre Vegana
(68, 9), (68, 8), -- Tacos Don Juan
(69, 7), (69, 11), (69, 3), (69, 5), -- Suntory
(70, 7), (70, 11), (70, 15), -- Kura
(71, 7), (71, 9), (71, 4), -- Mog
(72, 9), (72, 8), (72, 4), -- Bao Bei
(73, 8), (73, 9), (73, 13), -- Cancino
(74, 9), (74, 4), -- Félix
(75, 2), (75, 7), (75, 4), -- Caseina
(76, 7), (76, 2), (76, 5), (76, 11), -- Noor
(77, 2), (77, 7), (77, 6), (77, 9), -- Ziryab
(78, 4), (78, 13), (78, 2), (78, 1), -- Lalo!
(79, 4), (79, 13), (79, 2), -- Cicatriz
(80, 2), (80, 15), (80, 4), (80, 13), -- Belmondo
(81, 9), (81, 8), (81, 4), (81, 10), -- Plantasia
(82, 9), (82, 8), (82, 4), (82, 1), -- Forever Vegano
(83, 9), (83, 4), (83, 13), -- Pan Comido
(84, 9), (84, 2), (84, 13), -- Nevería Roxy
(85, 9), (85, 2), -- Gelatería La Nonna
(86, 9), (86, 4), -- Maque Postres
(87, 7), (87, 4), (87, 5), (87, 2), -- Mar
(88, 7), (88, 11), (88, 15), (88, 5), -- Mayta
(89, 7), (89, 5), (89, 2), (89, 4), -- Rojo Bistrot
(90, 7), (90, 12), (90, 2), (90, 15), -- Terra
(91, 7), (91, 9), (91, 8), (91, 2), -- Kayab
(92, 7), (92, 3), (92, 9), -- Pesca
(93, 9), (93, 8), (93, 13), -- Mariscos Mazatlán
(94, 5), (94, 6), (94, 3), (94, 4), -- Hooters
(95, 5), (95, 6), (95, 3), (95, 4), (95, 8), -- Buffalo Wild Wings
(96, 7), (96, 5), (96, 4), (96, 2), -- Butcher
(97, 7), (97, 9), (97, 8), (97, 4), -- Buns
(98, 9), (98, 8), (98, 13), (98, 11), -- Shake Shack
(99, 8), (99, 9), (99, 6), (99, 5), -- Wings Army
(100, 5), (100, 2), (100, 7), (100, 4), -- Wingería Los Amigos
(101, 9), (101, 8), -- Los Parados
(102, 9), (102, 13); -- El Borrego Viudo

-- =============================================
-- HORARIOS ADICIONALES PARA NUEVOS RESTAURANTES
-- =============================================

-- Restaurantes Fine Dining (horario elegante)
INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
-- Biko (cerrado domingo y lunes)
(52, 1, '13:00', '23:00', TRUE),
(52, 2, '13:00', '23:00', TRUE),
(52, 3, '13:00', '23:00', FALSE),
(52, 4, '13:00', '23:00', FALSE),
(52, 5, '13:00', '23:00', FALSE),
(52, 6, '13:00', '23:00', FALSE),
(52, 7, '13:00', '23:00', FALSE),

-- Astrid y Gastón
(51, 1, '13:00', '23:00', FALSE),
(51, 2, '13:00', '23:00', FALSE),
(51, 3, '13:00', '23:00', FALSE),
(51, 4, '13:00', '23:00', FALSE),
(51, 5, '13:00', '23:00', FALSE),
(51, 6, '13:00', '23:00', FALSE),
(51, 7, '13:00', '18:00', FALSE),

-- Hunan (todos los días)
(50, 1, '13:00', '23:00', FALSE),
(50, 2, '13:00', '23:00', FALSE),
(50, 3, '13:00', '23:00', FALSE),
(50, 4, '13:00', '23:00', FALSE),
(50, 5, '13:00', '23:00', FALSE),
(50, 6, '13:00', '23:00', FALSE),
(50, 7, '13:00', '22:00', FALSE),

-- Pizzerías (horario amplio)
(54, 1, '13:00', '23:00', FALSE), -- Grumo
(54, 2, '13:00', '23:00', FALSE),
(54, 3, '13:00', '23:00', FALSE),
(54, 4, '13:00', '23:00', FALSE),
(54, 5, '13:00', '01:00', FALSE),
(54, 6, '13:00', '01:00', FALSE),
(54, 7, '13:00', '23:00', FALSE),

(73, 1, '12:00', '22:00', FALSE), -- Cancino
(73, 2, '12:00', '22:00', FALSE),
(73, 3, '12:00', '22:00', FALSE),
(73, 4, '12:00', '22:00', FALSE),
(73, 5, '12:00', '23:00', FALSE),
(73, 6, '12:00', '23:00', FALSE),
(73, 7, '12:00', '22:00', FALSE),

(74, 1, '12:00', '21:00', FALSE), -- Félix
(74, 2, '12:00', '21:00', FALSE),
(74, 3, '12:00', '21:00', FALSE),
(74, 4, '12:00', '21:00', FALSE),
(74, 5, '12:00', '22:00', FALSE),
(74, 6, '12:00', '22:00', FALSE),
(74, 7, '12:00', '20:00', FALSE),

-- Taquerías adicionales
(65, 1, '10:00', '23:00', FALSE), -- El Fogoncito
(65, 2, '10:00', '23:00', FALSE),
(65, 3, '10:00', '23:00', FALSE),
(65, 4, '10:00', '23:00', FALSE),
(65, 5, '10:00', '01:00', FALSE),
(65, 6, '10:00', '01:00', FALSE),
(65, 7, '10:00', '23:00', FALSE),

(66, 1, '12:00', '22:00', FALSE), -- El Turix
(66, 2, '12:00', '22:00', FALSE),
(66, 3, '12:00', '22:00', FALSE),
(66, 4, '12:00', '22:00', FALSE),
(66, 5, '12:00', '22:00', FALSE),
(66, 6, '12:00', '22:00', FALSE),
(66, 7, '12:00', '20:00', FALSE),

(67, 1, '12:00', '21:00', FALSE), -- Por Siempre Vegana
(67, 2, '12:00', '21:00', FALSE),
(67, 3, '12:00', '21:00', FALSE),
(67, 4, '12:00', '21:00', FALSE),
(67, 5, '12:00', '22:00', FALSE),
(67, 6, '12:00', '22:00', FALSE),
(67, 7, '12:00', '21:00', FALSE),

(68, 1, '09:00', '17:00', FALSE), -- Tacos Don Juan
(68, 2, '09:00', '17:00', FALSE),
(68, 3, '09:00', '17:00', FALSE),
(68, 4, '09:00', '17:00', FALSE),
(68, 5, '09:00', '17:00', FALSE),
(68, 6, '09:00', '17:00', FALSE),
(68, 7, '09:00', '15:00', FALSE),

(101, 1, '10:00', '20:00', FALSE), -- Los Parados
(101, 2, '10:00', '20:00', FALSE),
(101, 3, '10:00', '20:00', FALSE),
(101, 4, '10:00', '20:00', FALSE),
(101, 5, '10:00', '21:00', FALSE),
(101, 6, '10:00', '21:00', FALSE),
(101, 7, '10:00', '18:00', FALSE),

(102, 1, '08:00', '18:00', FALSE), -- El Borrego Viudo
(102, 2, '08:00', '18:00', FALSE),
(102, 3, '08:00', '18:00', FALSE),
(102, 4, '08:00', '18:00', FALSE),
(102, 5, '08:00', '18:00', FALSE),
(102, 6, '08:00', '18:00', FALSE),
(102, 7, '08:00', '17:00', FALSE),

-- Cafeterías brunch
(78, 1, '08:00', '17:00', FALSE), -- Lalo!
(78, 2, '08:00', '17:00', FALSE),
(78, 3, '08:00', '17:00', FALSE),
(78, 4, '08:00', '17:00', FALSE),
(78, 5, '08:00', '17:00', FALSE),
(78, 6, '08:00', '18:00', FALSE),
(78, 7, '08:00', '18:00', FALSE),

(79, 1, '08:00', '19:00', FALSE), -- Cicatriz
(79, 2, '08:00', '19:00', FALSE),
(79, 3, '08:00', '19:00', FALSE),
(79, 4, '08:00', '19:00', FALSE),
(79, 5, '08:00', '20:00', FALSE),
(79, 6, '08:00', '20:00', FALSE),
(79, 7, '09:00', '18:00', FALSE),

(80, 1, '08:00', '22:00', FALSE), -- Belmondo
(80, 2, '08:00', '22:00', FALSE),
(80, 3, '08:00', '22:00', FALSE),
(80, 4, '08:00', '22:00', FALSE),
(80, 5, '08:00', '23:00', FALSE),
(80, 6, '08:00', '23:00', FALSE),
(80, 7, '09:00', '17:00', FALSE),

(83, 1, '08:00', '20:00', FALSE), -- Pan Comido
(83, 2, '08:00', '20:00', FALSE),
(83, 3, '08:00', '20:00', FALSE),
(83, 4, '08:00', '20:00', FALSE),
(83, 5, '08:00', '20:00', FALSE),
(83, 6, '08:00', '20:00', FALSE),
(83, 7, '09:00', '18:00', FALSE),

-- Heladerías
(84, 1, '12:00', '22:00', FALSE), -- Nevería Roxy
(84, 2, '12:00', '22:00', FALSE),
(84, 3, '12:00', '22:00', FALSE),
(84, 4, '12:00', '22:00', FALSE),
(84, 5, '12:00', '23:00', FALSE),
(84, 6, '12:00', '23:00', FALSE),
(84, 7, '12:00', '22:00', FALSE),

(85, 1, '13:00', '21:00', FALSE), -- La Nonna
(85, 2, '13:00', '21:00', FALSE),
(85, 3, '13:00', '21:00', FALSE),
(85, 4, '13:00', '21:00', FALSE),
(85, 5, '13:00', '22:00', FALSE),
(85, 6, '13:00', '22:00', FALSE),
(85, 7, '13:00', '21:00', FALSE),

-- Wings y Sports Bars
(94, 1, '12:00', '23:00', FALSE), -- Hooters
(94, 2, '12:00', '23:00', FALSE),
(94, 3, '12:00', '23:00', FALSE),
(94, 4, '12:00', '01:00', FALSE),
(94, 5, '12:00', '02:00', FALSE),
(94, 6, '12:00', '02:00', FALSE),
(94, 7, '12:00', '23:00', FALSE),

(95, 1, '12:00', '23:00', FALSE), -- Buffalo Wild Wings
(95, 2, '12:00', '23:00', FALSE),
(95, 3, '12:00', '23:00', FALSE),
(95, 4, '12:00', '01:00', FALSE),
(95, 5, '12:00', '02:00', FALSE),
(95, 6, '12:00', '02:00', FALSE),
(95, 7, '12:00', '23:00', FALSE),

(99, 1, '13:00', '23:00', FALSE), -- Wings Army
(99, 2, '13:00', '23:00', FALSE),
(99, 3, '13:00', '23:00', FALSE),
(99, 4, '13:00', '01:00', FALSE),
(99, 5, '13:00', '02:00', FALSE),
(99, 6, '13:00', '02:00', FALSE),
(99, 7, '13:00', '23:00', FALSE);

-- =============================================
-- IMÁGENES ADICIONALES
-- =============================================
INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(50, 'https://images.unsplash.com/photo-1526318896980-cf78c088247c', TRUE, 1),
(51, 'https://images.unsplash.com/photo-1623341214825-9f4f963727da', TRUE, 1),
(52, 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d', TRUE, 1),
(54, 'https://images.unsplash.com/photo-1513104890138-7c749659a591', TRUE, 1),
(56, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', TRUE, 1),
(57, 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783', TRUE, 1),
(61, 'https://images.unsplash.com/photo-1562059390-a761a084768e', TRUE, 1),
(65, 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5', TRUE, 1),
(66, 'https://images.unsplash.com/photo-1599974266405-35482a3de5b7', TRUE, 1),
(69, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351', TRUE, 1),
(70, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351', TRUE, 1),
(71, 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9', TRUE, 1),
(73, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38', TRUE, 1),
(78, 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666', TRUE, 1),
(84, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb', TRUE, 1),
(87, 'https://images.unsplash.com/photo-1559847844-d05f23b3e58f', TRUE, 1),
(94, 'https://images.unsplash.com/photo-1527477396000-e27163b481c2', TRUE, 1),
(96, 'https://images.unsplash.com/photo-1550547660-d9450f859349', TRUE, 1),
(98, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9', TRUE, 1);

-- =============================================
-- RESEÑAS ADICIONALES
-- =============================================
INSERT INTO reseñas (idUsuario, idRestaurante, calificacion, comentario, verificada) VALUES
(1, 54, 5, 'Grumo tiene la mejor pizza napolitana de CDMX. La masa es perfecta y los ingredientes son de calidad. Siempre hay fila pero vale la pena.', TRUE),
(2, 51, 5, 'Astrid y Gastón es espectacular. El ceviche es fresco y el lomo saltado está delicioso. Servicio impecable.', TRUE),
(3, 78, 4, 'Lalo! es ideal para brunch. Los chilaquiles son buenos pero un poco caros. Ambiente agradable y service rápido.', TRUE),
(4, 65, 5, 'El Fogoncito nunca decepciona. Tacos al pastor clásicos, tortillas suaves y salsas picantes. Un clásico de CDMX.', TRUE),
(5, 69, 5, 'Suntory es tradición japonesa en México. El teppanyaki es todo un show y la comida está deliciosa. Recomendado para ocasiones especiales.', TRUE),
(1, 98, 4, 'Shake Shack tiene buenas burgers pero nada extraordinario. Las cheese fries son adictivas. Precios justos.', TRUE),
(2, 87, 5, 'Mar tiene excelentes ceviches peruanos. El tiradito nikkei es una delicia. Ambiente casual y buen servicio.', TRUE),
(3, 56, 4, 'Huset es diferente, cocina nórdica bien ejecutada. El gravlax es auténtico y el pan es excepcional.', TRUE),
(4, 61, 5, 'Dulce Patria es una experiencia visual y gastronómica. Los platillos son arte comestible. Chiles en nogada impecables.', TRUE),
(5, 73, 5, 'Cancino es tradición. Pizza al horno de leña perfecta, masa delgada y crujiente. Precios accesibles y ambiente familiar.', TRUE),
(1, 91, 5, 'Kayab tiene los mejores aguachiles de la ciudad. Frescos, picosos y bien servidos. Las tostadas también están increíbles.', TRUE),
(2, 66, 4, 'El Turix tiene buena cochinita pibil. Auténtico sabor yucateco. Los panuchos podrían tener más sabor.', TRUE),
(3, 96, 5, 'Butcher hace las mejores burgers gourmet. Carne jugosa, pan perfecto y las papas truffle son otro nivel.', TRUE),
(4, 50, 5, 'Hunan es el mejor chino de la ciudad. Pato laqueado espectacular y dim sum auténtico. Vale cada peso.', TRUE),
(5, 57, 5, 'Merkavá es auténtica cocina israelí. El hummus es cremoso y el shawarma de cordero está delicioso.', TRUE);

-- Más favoritos
INSERT INTO favoritos (idUsuario, idRestaurante) VALUES
(1, 54), (1, 78), (1, 91), (1, 96),
(2, 51), (2, 87), (2, 69), (2, 50),
(3, 56), (3, 65), (3, 98), (3, 73),
(4, 61), (4, 66), (4, 102), (4, 78),
(5, 57), (5, 69), (5, 73), (5, 96);

-- Más búsquedas
INSERT INTO busquedas (idUsuario, texto, contexto, resultadosEncontrados) VALUES
(1, 'pizza napolitana', 'búsqueda', 8),
(2, 'ceviche peruano cdmx', 'búsqueda', 6),
(3, 'mejor brunch roma condesa', 'búsqueda', 15),
(4, 'cocina israelí méxico', 'búsqueda', 4),
(5, 'alitas cerca de mi', 'mapa', 12),
(1, 'restaurantes veganos', 'búsqueda', 10),
(2, 'sushi omakase', 'búsqueda', 5),
(3, 'hamburguesas gourmet polanco', 'búsqueda', 8);

-- =============================================
-- RESTAURANTES ADICIONALES - MÁS ZONAS
-- =============================================

INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
-- Zona: Narvarte / Noche Buena
('Birriería Zaragoza', 'Zaragoza 22, Narvarte', 1, 19.3967, -99.1534, '5555197138', NULL, 'Birria de chivo tradicional. Consomé, tacos dorados y quesabirrias desde 1950.', 180, TRUE),
('Mero Toro Narvarte', 'Eje 5 Sur 10, Narvarte', 1, 19.3978, -99.1589, '5556878282', NULL, 'Sucursal de mariscos y cortes. Pulpo, aguachiles y rib eye de calidad.', 680, TRUE),

-- Zona: Cuauhtémoc / Buenavista
('Expendio Tradición', 'José Martí 204, Escandón', 1, 19.4023, -99.1823, '5556544545', NULL, 'Cocina mexicana de mercado. Moles, pozoles y tamales tradicionales.', 280, TRUE),
('Fonda Margarita', 'Adolfo Prieto 1364, Del Valle', 1, 19.3756, -99.1689, '5555591040', NULL, 'Fonda tradicional familiar. Comida mexicana casera con sazón de abuela.', 220, TRUE),

-- Zona: Tlalpan / Coapa
('Villa Maria', 'Insurgentes Sur 4661, Tlalpan', 1, 19.2945, -99.1578, '5555732140', 'villamaria.com.mx', 'Restaurante en ex hacienda. Cocina mexicana en jardines coloniales históricos.', 580, TRUE),
('Hostería Santo Domingo', 'Belisario Domínguez 72, Centro', 1, 19.4389, -99.1412, '5555265276', NULL, 'Fonda histórica desde 1860. Chiles en nogada y romeritos tradicionales.', 380, TRUE),

-- Zona: Xochimilco / Sur
('El Cardenal', 'Palma 23, Centro', 1, 19.4334, -99.1389, '5555218815', 'restauranteelcardenal.com', 'Desayunos y cocina mexicana tradicional. Pan dulce hecho en casa y chocolate de metate.', 380, TRUE),
('La Casa de los Azulejos', 'Madero 4, Centro', 1, 19.4345, -99.1398, '5555127000', 'sanborns.com.mx', 'Sanborns en palacio del siglo XVI. Enchiladas y comida mexicana en arquitectura histórica.', 320, TRUE),

-- Zona: Interlomas / Huixquilucan
('Tori Tori Interlomas', 'Blvd. Interlomas 5, Interlomas', 1, 19.3645, -99.2589, '5552461212', 'toritoritoritoricom', 'Sucursal de cocina japonesa moderna. Sushi creativo y robata grill.', 820, TRUE),
('Kyo Santa Fe', 'Centro Santa Fe, Vasco de Quiroga', 1, 19.3589, -99.2678, '5552927676', NULL, 'Ramen y cocina japonesa. Gyozas, ramen tonkotsu y curry japonés.', 320, TRUE),

-- Fast Casual / Street Food
('King Bur', 'Veracruz 141, Roma Norte', 1, 19.4178, -99.1612, NULL, NULL, 'Hot dogs estilo Sonora. Burros, dogos envueltos en tocino y carne asada.', 120, TRUE),
('Los Panchos', 'Calle Tolsa, Centro', 1, 19.4301, -99.1401, NULL, NULL, 'Tortas clásicas desde 1945. Tortas de milanesa, pierna y jamón legendarias.', 90, TRUE),
('Bisquets Obregón', 'Orizaba 49, Roma Norte', 1, 19.4189, -99.1601, '5555146463', 'bisquetsobregon.com.mx', 'Cadena de desayunos tradicionales. Bisquets esponjosos, molletes y chilaquiles.', 160, TRUE),
('Tortas Don Polo', 'Insurgentes Sur 1100, Noche Buena', 1, 19.3756, -99.1778, NULL, NULL, 'Tortas gigantes y cubanas. Pambazos y quesadillas en comal.', 95, TRUE),

-- Cadenas Populares Mexicanas
('Toks', 'Insurgentes Sur 1971, San José Insurgentes', 1, 19.3656, -99.1856, '5556689000', 'toks.com.mx', 'Cadena familiar mexicana. Molletes, enchiladas y desayunos todo el día.', 240, TRUE),
('Vips', 'Reforma 222, Cuauhtémoc', 1, 19.4267, -99.1678, '5555887878', 'vips.com.mx', 'Cadena casual. Menú variado con desayunos, comidas y postres clásicos.', 220, TRUE),
('El Portón', 'Av. Insurgentes Sur 1991, Florida', 1, 19.3645, -99.1867, '5556622525', 'elporton.com.mx', 'Restaurante del norte de México. Carnes asadas, frijoles charros y tortillas de harina.', 420, TRUE),

-- Cocina Árabe / Libanesa adicional
('Beit', 'Av. Nuevo León 71, Condesa', 1, 19.4101, -99.1689, '5555648822', NULL, 'Restaurante libanés moderno. Manakish, kibbeh y ensalada fattoush.', 380, TRUE),
('Al Andalus', 'Michoacán 78, Condesa', 1, 19.4089, -99.1723, '5556876868', NULL, 'Cocina marroquí y libanesa. Tajines, cuscús y té de menta auténtico.', 420, TRUE),

-- Seafood adicionales
('El Parnita', 'Yucatán 84, Roma Norte', 1, 19.4167, -99.1589, '5555143975', 'elparnita.com', 'Mariscos estilo Baja California. Fish tacos, ceviche tostadas y cocteles frescos.', 380, TRUE),
('Marisquería Topolobampo', 'Nuevo León 135, Condesa', 1, 19.4089, -99.1701, '5555642559', NULL, 'Mariscos del Pacífico. Camarones, pulpo y pescado fresco con estilo sinaloense.', 480, TRUE),
('Don Fish', 'Viaducto Río de la Piedad 549, Roma', 1, 19.4023, -99.1589, NULL, NULL, 'Fish & chips y mariscos británicos. Pescado empanizado crujiente y papas.', 320, TRUE),

-- Desayunos / Brunch adicionales
('Moska', 'Córdoba 74, Roma Norte', 1, 19.4156, -99.1634, '5555338090', NULL, 'Brunch contemporáneo. Avocado toast, smoothie bowls y café de especialidad.', 280, TRUE),
('Broka', 'Colima 378, Roma Norte', 1, 19.4089, -99.1678, '5555642525', 'brokaroma.com', 'Bistrot de brunch. Hot cakes, huevos benedictinos y jugos naturales.', 260, TRUE),
('Carmela y Sal', 'Frontera 168B, Roma Norte', 1, 19.4178, -99.1612, '5555643376', 'carmelaysal.com', 'Panadería y café. Pan artesanal, conchas rellenas y café orgánico.', 180, TRUE),

-- Comida Coreana adicional
('Choi', 'Amsterdam 135, Condesa', 1, 19.4115, -99.1701, '5555536756', NULL, 'Cocina coreana fusión. Kimchi pancakes, bulgogi tacos y soju cocteles.', 380, TRUE),
('Seoul Food', 'Tamaulipas 168, Condesa', 1, 19.4123, -99.1689, NULL, NULL, 'Korean BBQ y comfort food. Bibimbap, japchae y kimchi casero.', 350, TRUE),

-- Thai / Vietnamita
('Blue Canteen', 'Veracruz 103, Condesa', 1, 19.4089, -99.1712, '5555536956', NULL, 'Cocina asiática fusión. Pad thai, curry verde y pho vietnamita.', 320, TRUE),
('Thai Gardens', 'Liverpool 159, Juárez', 1, 19.4234, -99.1612, '5555252525', NULL, 'Cocina tailandesa auténtica. Curries, som tam y satay de pollo.', 380, TRUE),

-- Barbacoa y Carnitas
('Arroyo', 'Insurgentes Sur 4003, Tlalpan', 1, 19.3012, -99.1689, '5556898697', 'arroyo.com.mx', 'Restaurante familiar gigante. Barbacoa, carnitas, mariachi y trajineras.', 380, TRUE),
('Carnitas El Paisa', 'Viaducto Miguel Alemán 380, Piedad Narvarte', 1, 19.3989, -99.1534, NULL, NULL, 'Carnitas michoacanas tradicionales. Maciza, surtida y buche jugosos.', 160, TRUE),

-- Antojitos y Quesadillas
('El Huequito', 'Bolívar 58, Centro', 1, 19.4289, -99.1367, '5555181313', 'elhuequito.com.mx', 'Taquería histórica desde 1959. Tacos al pastor original y gringas famosas.', 140, TRUE),
('Quesadillas Tere', 'Nuevo León 33, Condesa', 1, 19.4123, -99.1734, NULL, NULL, 'Quesadillas con ingredientes gourmet. Huitlacoche, flor de calabaza y chicharrón prensado.', 120, TRUE),

-- Postres especializados
('Churrería El Moro', 'Eje Central 42, Centro', 1, 19.4289, -99.1423, '5555121896', 'elmoro.mx', 'Churrería histórica desde 1935. Churros con chocolate espeso las 24 horas.', 110, TRUE),
('Pandora', 'Anatole France 120, Polanco', 1, 19.4289, -99.1956, '5552808422', 'pandorapasteleria.com', 'Pastelería y postres finos. Macarons, éclairs y pasteles de autor.', 180, TRUE),
('Le Pain Quotidien', 'Av. Presidente Masaryk 393, Polanco', 1, 19.4289, -99.1989, '5552806790', 'lepainquotidien.mx', 'Panadería orgánica belga. Pan rústico, tartines y café orgánico.', 280, TRUE),

-- Steakhouses adicionales
('Cambalache', 'Arquímedes 85, Polanco', 1, 19.4334, -99.1934, '5552804380', 'cambalache.com.mx', 'Parrilla argentina. Cortes importados, empanadas y vinos malbec.', 980, TRUE),
('CisCo', 'Hegel 406, Polanco', 1, 19.4312, -99.1945, '5552807714', NULL, 'Steakhouse y mariscos. Cortes prime, langosta y ostiones en barra.', 1200, TRUE),
('Maíz de Mar', 'Alejandro Dumas 125, Polanco', 1, 19.4289, -99.1923, '5552808585', NULL, 'Fusión mar y tierra. Tacos de camarón, aguachiles y rib eye.', 750, TRUE),

-- Cocina Española adicional
('Fismuler', 'Hegel 529, Polanco', 1, 19.4334, -99.1967, '5552800069', 'fismuler.com', 'Taberna española. Jamones ibéricos, pulpo a la gallega y vinos españoles.', 780, TRUE),
('Tinto', 'Emilio Castelar 95, Polanco', 1, 19.4334, -99.1912, '5552805246', NULL, 'Wine bar español. Tapas, paellas y selección de vinos de España.', 650, TRUE),

-- Ramen adicionales
('Mr. Curry', 'Amsterdam 236, Condesa', 1, 19.4089, -99.1689, NULL, NULL, 'Ramen y curry japonés. Tonkotsu, shoyu y katsu curry casero.', 260, TRUE),
('Soy Ramen', 'Veracruz 121, Roma Norte', 1, 19.4156, -99.1601, NULL, NULL, 'Ramen bar casual. Variedad de caldos y toppings personalizables.', 240, TRUE);

-- =============================================
-- PLATILLOS PARA RESTAURANTES NUEVOS
-- =============================================

INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, disponible, destacado) VALUES
-- Birriería Zaragoza (103)
(103, 'Birria de Chivo', 165, 'Birria tradicional con tortillas y consomé', TRUE, TRUE),
(103, 'Tacos Dorados de Birria', 145, 'Tacos dorados con queso y cebolla', TRUE, TRUE),
(103, 'Consomé Grande', 95, 'Consomé de birria con garbanzos', TRUE, FALSE),

-- Expendio Tradición (105)
(105, 'Mole Poblano', 185, 'Pollo en mole poblano con arroz', TRUE, TRUE),
(105, 'Pozole Verde', 165, 'Pozole verde guerrerense', TRUE, FALSE),
(105, 'Tamales Oaxaqueños', 65, 'Tamal de mole negro envuelto en hoja de plátano', TRUE, FALSE),

-- Fonda Margarita (106)
(106, 'Comida Corrida', 125, 'Menú del día con sopa, guisado, postre y agua', TRUE, TRUE),
(106, 'Chiles Rellenos', 145, 'Chile poblano relleno de queso en caldillo', TRUE, FALSE),
(106, 'Albóndigas en Chipotle', 135, 'Albóndigas de res en salsa de chipotle', TRUE, FALSE),

-- Villa Maria (107)
(107, 'Mixiotes de Carnero', 385, 'Carnero en mixiote con nopales', TRUE, TRUE),
(107, 'Sopa Azteca', 165, 'Sopa de tortilla con aguacate y queso', TRUE, FALSE),

-- Hostería Santo Domingo (108)
(108, 'Chiles en Nogada', 385, 'Chile poblano en temporada con nogada', TRUE, TRUE),
(108, 'Romeritos', 245, 'Romeritos en mole con camarón seco', TRUE, FALSE),

-- El Cardenal (109)
(109, 'Molletes Cardenal', 145, 'Molletes con frijoles y queso gratinado', TRUE, TRUE),
(109, 'Huevos Motuleños', 165, 'Huevos estilo Yucatán con frijol y plátano', TRUE, FALSE),
(109, 'Pan Dulce Surtido', 85, 'Canasta de pan dulce recién horneado', TRUE, TRUE),
(109, 'Chocolate de Metate', 75, 'Chocolate caliente tradicional', TRUE, FALSE),

-- La Casa de los Azulejos (110)
(110, 'Enchiladas Suizas', 185, 'Enchiladas verdes con pollo y crema', TRUE, TRUE),
(110, 'Club Sandwich', 165, 'Sándwich triple con pollo y tocino', TRUE, FALSE),

-- King Bur (113)
(113, 'Hot Dog Sonorense', 85, 'Hot dog envuelto en tocino con frijoles', TRUE, TRUE),
(113, 'Burro de Carne Asada', 95, 'Burrito con carne asada y frijoles', TRUE, FALSE),

-- Los Panchos (114)
(114, 'Torta de Milanesa', 75, 'Torta con milanesa de res empanizada', TRUE, TRUE),
(114, 'Torta Cubana', 95, 'Torta con jamón, queso, huevo y milanesa', TRUE, TRUE),

-- Bisquets Obregón (115)
(115, 'Bisquets con Mermelada', 85, 'Tres bisquets con mantequilla y mermelada', TRUE, TRUE),
(115, 'Molletes Obregón', 95, 'Molletes con frijol y chorizo', TRUE, FALSE),
(115, 'Chilaquiles Verdes', 125, 'Chilaquiles con pollo y crema', TRUE, FALSE),

-- Tortas Don Polo (116)
(116, 'Torta Cubana Especial', 115, 'Torta gigante con 5 tipos de carne', TRUE, TRUE),
(116, 'Pambazo', 75, 'Pan guisado con papa y chorizo', TRUE, FALSE),

-- Toks (117)
(117, 'Molletes Gratinados', 95, 'Molletes con frijol y queso fundido', TRUE, TRUE),
(117, 'Enchiladas Verdes', 145, 'Enchiladas con pollo y salsa verde', TRUE, FALSE),

-- Vips (118)
(118, 'Desayuno Vips', 125, 'Huevos al gusto con frijoles y café', TRUE, TRUE),
(118, 'Club Sandwich Clásico', 145, 'Sándwich triple con papas', TRUE, FALSE),
(118, 'Pay de Queso', 85, 'Rebanada de cheesecake', TRUE, FALSE),

-- El Portón (119)
(119, 'Arrachera Norteña', 385, 'Arrachera con frijoles charros y guacamole', TRUE, TRUE),
(119, 'Cabrito al Horno', 485, 'Cabrito estilo Monterrey', TRUE, TRUE),

-- Beit (120)
(120, 'Manakish Zaatar', 125, 'Pan libanés con zaatar y aceite de oliva', TRUE, TRUE),
(120, 'Kafta con Hummus', 285, 'Kafta de cordero con hummus y tabulé', TRUE, FALSE),

-- Al Andalus (121)
(121, 'Tajine de Cordero', 385, 'Tajine marroquí con cordero y ciruelas', TRUE, TRUE),
(121, 'Cuscús con Vegetales', 285, 'Cuscús con vegetales al vapor', TRUE, FALSE),

-- El Parnita (122)
(122, 'Fish Tacos', 165, 'Tacos de pescado empanizado estilo Baja', TRUE, TRUE),
(122, 'Tostada de Atún', 145, 'Tostada con atún fresco y aguacate', TRUE, FALSE),

-- Marisquería Topolobampo (123)
(123, 'Camarones Zarandeados', 385, 'Camarones a la parrilla con salsa', TRUE, TRUE),
(123, 'Aguachile de Camarón', 295, 'Camarones en salsa verde picante', TRUE, FALSE),

-- Don Fish (124)
(124, 'Fish & Chips', 245, 'Pescado empanizado con papas fritas', TRUE, TRUE),
(124, 'Taco de Pescado Frito', 95, 'Taco con pescado crujiente', TRUE, FALSE),

-- Moska (125)
(125, 'Avocado Toast Deluxe', 185, 'Pan masa madre con aguacate y huevo', TRUE, TRUE),
(125, 'Smoothie Bowl', 165, 'Bowl de açaí con frutas y granola', TRUE, FALSE),

-- Broka (126)
(126, 'Hot Cakes de Plátano', 165, 'Hot cakes con plátano caramelizado', TRUE, TRUE),
(126, 'Huevos Benedictinos', 185, 'Huevos pochados con salsa holandesa', TRUE, FALSE),

-- Carmela y Sal (127)
(127, 'Concha Rellena', 65, 'Concha rellena de nata o nutella', TRUE, TRUE),
(127, 'Pan Francés', 125, 'Pan francés con frutos rojos', TRUE, FALSE),

-- Choi (128)
(128, 'Kimchi Pancake', 145, 'Pancake de kimchi crujiente', TRUE, TRUE),
(128, 'Bulgogi Tacos', 165, 'Tacos fusión con carne bulgogi', TRUE, FALSE),

-- Seoul Food (129)
(129, 'Bibimbap Tradicional', 245, 'Arroz con vegetales, huevo y carne', TRUE, TRUE),
(129, 'Japchae', 215, 'Fideos de camote con vegetales', TRUE, FALSE),

-- Blue Canteen (130)
(130, 'Pad Thai', 245, 'Fideos thai con camarón y cacahuate', TRUE, TRUE),
(130, 'Curry Verde', 265, 'Curry verde tailandés con pollo', TRUE, FALSE),

-- Thai Gardens (131)
(131, 'Tom Yum Goong', 245, 'Sopa tailandesa picante con camarón', TRUE, TRUE),
(131, 'Satay de Pollo', 185, 'Brochetas de pollo con salsa de cacahuate', TRUE, FALSE),

-- Arroyo (132)
(132, 'Barbacoa de Borrego', 245, 'Barbacoa tradicional con consomé', TRUE, TRUE),
(132, 'Carnitas Surtidas', 265, 'Carnitas con maciza, cuerito y buche', TRUE, TRUE),
(132, 'Mixiotes', 225, 'Mixiotes de pollo o carnero', TRUE, FALSE),

-- Carnitas El Paisa (133)
(133, 'Carnitas por Kilo', 380, 'Kilo de carnitas surtidas', TRUE, TRUE),
(133, 'Taco de Carnitas', 38, 'Taco de carnitas con cebolla y cilantro', TRUE, FALSE),

-- El Huequito (134)
(134, 'Tacos al Pastor', 48, 'Tacos al pastor tradicionales', TRUE, TRUE),
(134, 'Gringa Clásica', 85, 'Tortilla de harina con pastor y queso', TRUE, TRUE),
(134, 'Volcán de Pastor', 95, 'Quesadilla dorada con pastor', TRUE, FALSE),

-- Quesadillas Tere (135)
(135, 'Quesadilla de Huitlacoche', 95, 'Quesadilla con huitlacoche fresco', TRUE, TRUE),
(135, 'Quesadilla de Flor de Calabaza', 85, 'Con flor de calabaza y epazote', TRUE, FALSE),

-- Churrería El Moro (136)
(136, 'Churros con Chocolate', 95, 'Orden de churros con chocolate espeso', TRUE, TRUE),
(136, 'Churros Rellenos', 115, 'Churros rellenos de cajeta o nutella', TRUE, FALSE),

-- Pandora (137)
(137, 'Macarons Surtidos', 185, 'Caja de 6 macarons franceses', TRUE, TRUE),
(137, 'Éclair de Chocolate', 95, 'Éclair relleno de crema de chocolate', TRUE, FALSE),

-- Le Pain Quotidien (138)
(138, 'Tartine de Salmón', 245, 'Pan con salmón ahumado y queso crema', TRUE, TRUE),
(138, 'Avocado Tartine', 195, 'Pan con aguacate, huevo y semillas', TRUE, FALSE),

-- Cambalache (139)
(139, 'Bife de Chorizo 400g', 895, 'Corte argentino con chimichurri', TRUE, TRUE),
(139, 'Empanadas Argentinas', 145, 'Tres empanadas de carne', TRUE, FALSE),

-- CisCo (140)
(140, 'New York Steak', 1150, 'Corte New York 350g prime', TRUE, TRUE),
(140, 'Langosta del Maine', 1450, 'Langosta entera con mantequilla', TRUE, TRUE),

-- Maíz de Mar (141)
(141, 'Tacos Gobernador', 285, 'Tacos de camarón con queso', TRUE, TRUE),
(141, 'Rib Eye Mar y Tierra', 895, 'Rib eye con camarones', TRUE, FALSE),

-- Fismuler (142)
(142, 'Jamón Ibérico de Bellota', 585, 'Jamón ibérico 5 jotas', TRUE, TRUE),
(142, 'Pulpo a la Gallega', 485, 'Pulpo con pimentón y aceite', TRUE, FALSE),

-- Tinto (143)
(143, 'Tabla de Tapas', 485, 'Selección de tapas españolas', TRUE, TRUE),
(143, 'Paella Valenciana', 485, 'Paella para 2 personas', TRUE, TRUE),

-- Mr. Curry (144)
(144, 'Tonkotsu Ramen', 245, 'Ramen con caldo de hueso de cerdo', TRUE, TRUE),
(144, 'Katsu Curry', 225, 'Pollo empanizado con curry japonés', TRUE, FALSE),

-- Soy Ramen (145)
(145, 'Miso Ramen', 225, 'Ramen con caldo de miso', TRUE, TRUE),
(145, 'Shoyu Ramen', 215, 'Ramen clásico con soya', TRUE, FALSE);

-- =============================================
-- RELACIONES FINALES
-- =============================================

INSERT INTO restaurante_categorias (idRestaurante, idCategoria) VALUES
(103, 1), -- Birriería Zaragoza: Mexicana
(104, 4), (104, 6), -- Mero Toro Narvarte: Mariscos, Steakhouse
(105, 1), -- Expendio Tradición: Mexicana
(106, 1), -- Fonda Margarita: Mexicana
(107, 1), -- Villa Maria: Mexicana
(108, 1), -- Hostería Santo Domingo: Mexicana
(109, 1), (109, 8), -- El Cardenal: Mexicana, Cafetería
(110, 1), -- La Casa de los Azulejos: Mexicana
(111, 3), -- Tori Tori Interlomas: Japonesa
(112, 3), (112, 13), -- Kyo Santa Fe: Japonesa, Asiática
(113, 7), -- King Bur: Internacional
(114, 1), -- Los Panchos: Mexicana
(115, 8), (115, 1), -- Bisquets Obregón: Cafetería, Mexicana
(116, 1), -- Tortas Don Polo: Mexicana
(117, 1), (117, 7), -- Toks: Mexicana, Internacional
(118, 7), -- Vips: Internacional
(119, 1), (119, 6), -- El Portón: Mexicana, Steakhouse
(120, 7), -- Beit: Internacional
(121, 7), -- Al Andalus: Internacional
(122, 4), (122, 15), -- El Parnita: Mariscos, Seafood
(123, 4), -- Marisquería Topolobampo: Mariscos
(124, 15), (124, 7), -- Don Fish: Seafood, Internacional
(125, 8), (125, 9), -- Moska: Cafetería, Vegetariana
(126, 8), -- Broka: Cafetería
(127, 8), -- Carmela y Sal: Cafetería
(128, 13), -- Choi: Asiática
(129, 13), -- Seoul Food: Asiática
(130, 13), -- Blue Canteen: Asiática
(131, 13), -- Thai Gardens: Asiática
(132, 1), -- Arroyo: Mexicana
(133, 1), -- Carnitas El Paisa: Mexicana
(134, 5), (134, 1), -- El Huequito: Tacos, Mexicana
(135, 1), -- Quesadillas Tere: Mexicana
(136, 8), -- Churrería El Moro: Cafetería
(137, 8), (137, 12), -- Pandora: Cafetería, Francesa
(138, 8), -- Le Pain Quotidien: Cafetería
(139, 10), (139, 6), -- Cambalache: Argentina, Steakhouse
(140, 6), (140, 4), -- CisCo: Steakhouse, Mariscos
(141, 4), (141, 6), -- Maíz de Mar: Mariscos, Steakhouse
(142, 11), -- Fismuler: Española
(143, 11), -- Tinto: Española
(144, 3), (144, 13), -- Mr. Curry: Japonesa, Asiática
(145, 3); -- Soy Ramen: Japonesa

INSERT INTO restaurante_caracteristicas (idRestaurante, idCaracteristica) VALUES
(103, 9), (103, 8), (103, 13), -- Birriería Zaragoza
(104, 7), (104, 5), (104, 4), -- Mero Toro Narvarte
(105, 9), (105, 8), (105, 13), -- Expendio Tradición
(106, 13), (106, 9), -- Fonda Margarita
(107, 2), (107, 7), (107, 3), (107, 12), (107, 15), -- Villa Maria
(108, 7), (108, 11), -- Hostería Santo Domingo
(109, 7), (109, 13), (109, 11), -- El Cardenal
(110, 7), (110, 11), (110, 2), -- La Casa de los Azulejos
(111, 7), (111, 11), (111, 3), (111, 2), -- Tori Tori Interlomas
(112, 9), (112, 8), (112, 11), -- Kyo Santa Fe
(113, 9), (113, 8), -- King Bur
(114, 9), (114, 8), -- Los Panchos
(115, 13), (115, 8), (115, 9), -- Bisquets Obregón
(116, 9), (116, 8), -- Tortas Don Polo
(117, 13), (117, 7), (117, 3), (117, 11), -- Toks
(118, 13), (118, 7), (118, 3), (118, 11), -- Vips
(119, 7), (119, 3), (119, 5), -- El Portón
(120, 2), (120, 7), (120, 4), -- Beit
(121, 2), (121, 7), (121, 6), -- Al Andalus
(122, 2), (122, 5), (122, 4), (122, 9), -- El Parnita
(123, 7), (123, 9), (123, 8), -- Marisquería Topolobampo
(124, 9), (124, 8), (124, 4), -- Don Fish
(125, 4), (125, 13), (125, 2), -- Moska
(126, 4), (126, 13), (126, 2), -- Broka
(127, 9), (127, 4), (127, 13), -- Carmela y Sal
(128, 5), (128, 7), (128, 4), -- Choi
(129, 9), (129, 8), (129, 4), -- Seoul Food
(130, 9), (130, 8), (130, 4), -- Blue Canteen
(131, 7), (131, 9), (131, 11), -- Thai Gardens
(132, 2), (132, 6), (132, 3), (132, 13), -- Arroyo
(133, 9), (133, 8), -- Carnitas El Paisa
(134, 8), (134, 9), -- El Huequito
(135, 9), (135, 8), -- Quesadillas Tere
(136, 9), (136, 8), -- Churrería El Moro
(137, 9), (137, 4), (137, 11), -- Pandora
(138, 9), (138, 4), (138, 2), (138, 13), -- Le Pain Quotidien
(139, 7), (139, 5), (139, 11), (139, 3), -- Cambalache
(140, 7), (140, 11), (140, 15), (140, 3), (140, 5), -- CisCo
(141, 7), (141, 5), (141, 2), (141, 4), -- Maíz de Mar
(142, 7), (142, 5), (142, 11), (142, 2), -- Fismuler
(143, 5), (143, 7), (143, 2), -- Tinto
(144, 9), (144, 8), (144, 4), -- Mr. Curry
(145, 9), (145, 8), (145, 4); -- Soy Ramen

-- =============================================
-- HORARIOS FINALES
-- =============================================

INSERT INTO horarios (idRestaurante, dia, apertura, cierre, cerrado) VALUES
-- Birriería Zaragoza (todos los días temprano)
(103, 1, '08:00', '18:00', FALSE),
(103, 2, '08:00', '18:00', FALSE),
(103, 3, '08:00', '18:00', FALSE),
(103, 4, '08:00', '18:00', FALSE),
(103, 5, '08:00', '18:00', FALSE),
(103, 6, '08:00', '18:00', FALSE),
(103, 7, '08:00', '17:00', FALSE),

-- El Cardenal (desayunos)
(109, 1, '08:00', '20:00', FALSE),
(109, 2, '08:00', '20:00', FALSE),
(109, 3, '08:00', '20:00', FALSE),
(109, 4, '08:00', '20:00', FALSE),
(109, 5, '08:00', '20:00', FALSE),
(109, 6, '08:00', '20:00', FALSE),
(109, 7, '08:00', '19:00', FALSE),

-- King Bur (horario nocturno)
(113, 1, '19:00', '03:00', FALSE),
(113, 2, '19:00', '03:00', FALSE),
(113, 3, '19:00', '03:00', FALSE),
(113, 4, '19:00', '04:00', FALSE),
(113, 5, '19:00', '05:00', FALSE),
(113, 6, '19:00', '05:00', FALSE),
(113, 7, '19:00', '02:00', FALSE),

-- Los Panchos (todo el día)
(114, 1, '10:00', '22:00', FALSE),
(114, 2, '10:00', '22:00', FALSE),
(114, 3, '10:00', '22:00', FALSE),
(114, 4, '10:00', '22:00', FALSE),
(114, 5, '10:00', '23:00', FALSE),
(114, 6, '10:00', '23:00', FALSE),
(114, 7, '10:00', '21:00', FALSE),

-- Bisquets Obregón (desayunos)
(115, 1, '07:00', '23:00', FALSE),
(115, 2, '07:00', '23:00', FALSE),
(115, 3, '07:00', '23:00', FALSE),
(115, 4, '07:00', '23:00', FALSE),
(115, 5, '07:00', '23:00', FALSE),
(115, 6, '07:00', '23:00', FALSE),
(115, 7, '07:00', '23:00', FALSE),

-- Churrería El Moro (24 horas)
(136, 1, '00:00', '23:59', FALSE),
(136, 2, '00:00', '23:59', FALSE),
(136, 3, '00:00', '23:59', FALSE),
(136, 4, '00:00', '23:59', FALSE),
(136, 5, '00:00', '23:59', FALSE),
(136, 6, '00:00', '23:59', FALSE),
(136, 7, '00:00', '23:59', FALSE),

-- Arroyo (fines de semana principalmente)
(132, 1, '09:00', '19:00', FALSE),
(132, 2, '09:00', '19:00', FALSE),
(132, 3, '09:00', '19:00', FALSE),
(132, 4, '09:00', '19:00', FALSE),
(132, 5, '09:00', '19:00', FALSE),
(132, 6, '09:00', '20:00', FALSE),
(132, 7, '09:00', '20:00', FALSE),

-- Carnitas El Paisa (horario matutino)
(133, 1, '08:00', '16:00', FALSE),
(133, 2, '08:00', '16:00', FALSE),
(133, 3, '08:00', '16:00', FALSE),
(133, 4, '08:00', '16:00', FALSE),
(133, 5, '08:00', '16:00', FALSE),
(133, 6, '08:00', '16:00', FALSE),
(133, 7, '08:00', '15:00', FALSE),

-- El Huequito (horario amplio)
(134, 1, '11:00', '23:00', FALSE),
(134, 2, '11:00', '23:00', FALSE),
(134, 3, '11:00', '23:00', FALSE),
(134, 4, '11:00', '01:00', FALSE),
(134, 5, '11:00', '02:00', FALSE),
(134, 6, '11:00', '02:00', FALSE),
(134, 7, '11:00', '23:00', FALSE),

-- Cambalache (cenas)
(139, 1, '13:00', '23:00', FALSE),
(139, 2, '13:00', '23:00', FALSE),
(139, 3, '13:00', '23:00', FALSE),
(139, 4, '13:00', '01:00', FALSE),
(139, 5, '13:00', '01:00', FALSE),
(139, 6, '13:00', '01:00', FALSE),
(139, 7, '13:00', '22:00', FALSE);

-- =============================================
-- IMÁGENES FINALES
-- =============================================

INSERT INTO imagenes_restaurante (idRestaurante, url, esPrincipal, orden) VALUES
(103, 'https://images.unsplash.com/photo-1599974266405-35482a3de5b7', TRUE, 1),
(109, 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666', TRUE, 1),
(110, 'https://images.unsplash.com/photo-1583394838336-acd977736f90', TRUE, 1),
(113, 'https://images.unsplash.com/photo-1612392062798-2deae4a394df', TRUE, 1),
(114, 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3', TRUE, 1),
(122, 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df', TRUE, 1),
(127, 'https://images.unsplash.com/photo-1509440159596-0249088772ff', TRUE, 1),
(132, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1', TRUE, 1),
(134, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', TRUE, 1),
(136, 'https://images.unsplash.com/photo-1564355808539-22fec8e4d3e6', TRUE, 1),
(139, 'https://images.unsplash.com/photo-1558030006-450675393462', TRUE, 1),
(142, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', TRUE, 1);



-- =============================================
-- CORRECCIÓN: Cierre correcto del INSERT de restaurantes
-- =============================================

-- Últimos restaurantes (asegúrate que terminen correctamente)
INSERT INTO restaurantes (nombre, direccion, idCiudad, latitud, longitud, telefono, sitioweb, descripcion, precioPromedio, activo) VALUES
('Soy Ramen', 'Veracruz 121, Roma Norte', 1, 19.4156, -99.1601, NULL, NULL, 'Ramen bar casual. Variedad de caldos y toppings personalizables.', 240, TRUE);

-- =============================================
-- PLATILLOS (ahora sí comienza correctamente)
-- =============================================

INSERT INTO platillos (idRestaurante, nombre, precio, descripcion, disponible, destacado) VALUES
-- Pujol (id: 1)
(1, 'Mole Madre', 1200, 'Mole negro de 2000 días envejecido, servido con mole nuevo', TRUE, TRUE),
(1, 'Taco de Hoja Santa', 450, 'Taco de hoja santa con chinicuiles y requesón', TRUE, TRUE),
(1, 'Ceviche de Pescado', 520, 'Pescado fresco con leche de tigre y aguachile verde', TRUE, FALSE),
(1, 'Tostada de Atún', 380, 'Atún fresco con aguacate y salsa macha', TRUE, FALSE);  
