-- =============================================
-- Script de Inicialización Base de Datos Quovi
-- Proyecto: Mapa interactivo de comida
-- Con soporte para OAuth (Google, etc.)
-- =============================================
-- Usar la base de datos
USE quovi_db;

-- =============================================
-- TABLA: usuarios (actualizada para OAuth)
-- =============================================
CREATE TABLE IF NOT EXISTS usuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(50) UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255),
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    foto VARCHAR(500),
    
    -- Campos para OAuth
    googleId VARCHAR(255) UNIQUE,
    provider VARCHAR(20) DEFAULT 'local',
    emailVerificado BOOLEAN DEFAULT FALSE,
    
    -- Metadatos
    fechaRegistro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultimoAcceso TIMESTAMP NULL,
    activo BOOLEAN DEFAULT TRUE,
    
    -- Validaciones
    CONSTRAINT chk_provider CHECK (provider IN ('local', 'google', 'facebook', 'apple')),
    CONSTRAINT chk_auth_method CHECK (
        (provider = 'local' AND password IS NOT NULL) OR 
        (provider != 'local' AND googleId IS NOT NULL)
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: sesiones (para JWT y tokens)
-- =============================================
CREATE TABLE IF NOT EXISTS sesiones (
    idSesion INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    token VARCHAR(500) NOT NULL UNIQUE,
    refreshToken VARCHAR(500),
    provider VARCHAR(20),
    expiraEn TIMESTAMP NOT NULL,
    ipAddress VARCHAR(45),
    userAgent VARCHAR(500),
    fechaCreacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: ciudades
-- =============================================
CREATE TABLE IF NOT EXISTS ciudades (
    idCiudad INT AUTO_INCREMENT PRIMARY KEY,
    nombreCiudad VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    pais VARCHAR(50) DEFAULT 'México',
    latitud DECIMAL(10,8),
    longitud DECIMAL(11,8),
    UNIQUE KEY unique_ciudad (nombreCiudad, estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: restaurantes
-- =============================================
CREATE TABLE IF NOT EXISTS restaurantes (
    idRestaurante INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    idCiudad INT NOT NULL,
    latitud DECIMAL(10,8) NOT NULL,
    longitud DECIMAL(11,8) NOT NULL,
    telefono VARCHAR(20),
    sitioweb VARCHAR(200),
    descripcion TEXT,
    precioPromedio DECIMAL(8,2),
    calificacionPromedio DECIMAL(3,2) DEFAULT 0,
    totalReseñas INT DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    fechaRegistro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idCiudad) REFERENCES ciudades(idCiudad) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: categorias_cocina
-- =============================================
CREATE TABLE IF NOT EXISTS categorias_cocina (
    idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    nombreCategoria VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    icono VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: caracteristicas
-- =============================================
CREATE TABLE IF NOT EXISTS caracteristicas (
    idCaracteristica INT AUTO_INCREMENT PRIMARY KEY,
    nombreCaracteristica VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    icono VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: platillos
-- =============================================
CREATE TABLE IF NOT EXISTS platillos (
    idPlatillo INT AUTO_INCREMENT PRIMARY KEY,
    idRestaurante INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(8,2) NOT NULL,
    descripcion TEXT,
    ingredientes TEXT,
    imagen VARCHAR(500),
    disponible BOOLEAN DEFAULT TRUE,
    destacado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (idRestaurante) REFERENCES restaurantes(idRestaurante) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: restaurante_categorias (relación muchos a muchos)
-- =============================================
CREATE TABLE IF NOT EXISTS restaurante_categorias (
    idRestaurante INT NOT NULL,
    idCategoria INT NOT NULL,
    PRIMARY KEY (idRestaurante, idCategoria),
    FOREIGN KEY (idRestaurante) REFERENCES restaurantes(idRestaurante) ON DELETE CASCADE,
    FOREIGN KEY (idCategoria) REFERENCES categorias_cocina(idCategoria) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: restaurante_caracteristicas (relación muchos a muchos)
-- =============================================
CREATE TABLE IF NOT EXISTS restaurante_caracteristicas (
    idRestaurante INT NOT NULL,
    idCaracteristica INT NOT NULL,
    PRIMARY KEY (idRestaurante, idCaracteristica),
    FOREIGN KEY (idRestaurante) REFERENCES restaurantes(idRestaurante) ON DELETE CASCADE,
    FOREIGN KEY (idCaracteristica) REFERENCES caracteristicas(idCaracteristica) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: horarios
-- =============================================
CREATE TABLE IF NOT EXISTS horarios (
    idRestaurante INT NOT NULL,
    dia TINYINT NOT NULL CHECK (dia >= 1 AND dia <= 7),
    apertura TIME NOT NULL,
    cierre TIME NOT NULL,
    cerrado BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (idRestaurante, dia),
    FOREIGN KEY (idRestaurante) REFERENCES restaurantes(idRestaurante) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: busquedas
-- =============================================
CREATE TABLE IF NOT EXISTS busquedas (
    idBusqueda INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    texto TEXT NOT NULL,
    contexto VARCHAR(100),
    resultadosEncontrados INT,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: reseñas
-- =============================================
CREATE TABLE IF NOT EXISTS reseñas (
    idReseña INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idRestaurante INT NOT NULL,
    calificacion TINYINT NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    verificada BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idRestaurante) REFERENCES restaurantes(idRestaurante) ON DELETE CASCADE,
    UNIQUE KEY unique_review (idUsuario, idRestaurante)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: favoritos
-- =============================================
CREATE TABLE IF NOT EXISTS favoritos (
    idUsuario INT NOT NULL,
    idRestaurante INT NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idUsuario, idRestaurante),
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idRestaurante) REFERENCES restaurantes(idRestaurante) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: imagenes_restaurante (nueva)
-- =============================================
CREATE TABLE IF NOT EXISTS imagenes_restaurante (
    idImagen INT AUTO_INCREMENT PRIMARY KEY,
    idRestaurante INT NOT NULL,
    url VARCHAR(500) NOT NULL,
    esPrincipal BOOLEAN DEFAULT FALSE,
    orden INT DEFAULT 0,
    fechaSubida TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idRestaurante) REFERENCES restaurantes(idRestaurante) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- ÍNDICES para mejorar rendimiento
-- =============================================
-- Usuarios
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_google_id ON usuarios(googleId);
CREATE INDEX idx_usuarios_provider ON usuarios(provider);

-- Sesiones
CREATE INDEX idx_sesiones_token ON sesiones(token);
CREATE INDEX idx_sesiones_usuario ON sesiones(idUsuario);
CREATE INDEX idx_sesiones_expira ON sesiones(expiraEn);

-- Restaurantes
CREATE INDEX idx_restaurantes_ciudad ON restaurantes(idCiudad);
CREATE INDEX idx_restaurantes_calificacion ON restaurantes(calificacionPromedio);
CREATE INDEX idx_restaurantes_activo ON restaurantes(activo);

-- Platillos
CREATE INDEX idx_platillos_restaurante ON platillos(idRestaurante);
CREATE INDEX idx_platillos_disponible ON platillos(disponible);

-- Búsquedas
CREATE INDEX idx_busquedas_usuario ON busquedas(idUsuario);
CREATE INDEX idx_busquedas_fecha ON busquedas(fecha);

-- Reseñas
CREATE INDEX idx_reseñas_restaurante ON reseñas(idRestaurante);
CREATE INDEX idx_reseñas_usuario ON reseñas(idUsuario);
CREATE INDEX idx_reseñas_calificacion ON reseñas(calificacion);

-- Favoritos
CREATE INDEX idx_favoritos_fecha ON favoritos(fecha);

-- =============================================
-- TRIGGERS para mantener integridad
-- =============================================

-- Actualizar calificación promedio cuando se crea/actualiza una reseña
DELIMITER $$

CREATE TRIGGER after_reseña_insert
AFTER INSERT ON reseñas
FOR EACH ROW
BEGIN
    UPDATE restaurantes
    SET calificacionPromedio = (
        SELECT AVG(calificacion)
        FROM reseñas
        WHERE idRestaurante = NEW.idRestaurante
    ),
    totalReseñas = (
        SELECT COUNT(*)
        FROM reseñas
        WHERE idRestaurante = NEW.idRestaurante
    )
    WHERE idRestaurante = NEW.idRestaurante;
END$$

CREATE TRIGGER after_reseña_update
AFTER UPDATE ON reseñas
FOR EACH ROW
BEGIN
    UPDATE restaurantes
    SET calificacionPromedio = (
        SELECT AVG(calificacion)
        FROM reseñas
        WHERE idRestaurante = NEW.idRestaurante
    )
    WHERE idRestaurante = NEW.idRestaurante;
END$$

CREATE TRIGGER after_reseña_delete
AFTER DELETE ON reseñas
FOR EACH ROW
BEGIN
    UPDATE restaurantes
    SET calificacionPromedio = (
        SELECT COALESCE(AVG(calificacion), 0)
        FROM reseñas
        WHERE idRestaurante = OLD.idRestaurante
    ),
    totalReseñas = (
        SELECT COUNT(*)
        FROM reseñas
        WHERE idRestaurante = OLD.idRestaurante
    )
    WHERE idRestaurante = OLD.idRestaurante;
END$$

DELIMITER ;