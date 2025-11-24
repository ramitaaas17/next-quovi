package main

import (
	"log"
	"os"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/tuusuario/quovi/handlers"
	"github.com/tuusuario/quovi/middleware"
	"github.com/tuusuario/quovi/repository"
	"github.com/tuusuario/quovi/services"
)

func main() {
	// Cargar variables de entorno desde archivo .env
	err := godotenv.Load()
	if err != nil {
		log.Println("Archivo .env no encontrado, usando variables del sistema")
	}

	// Configuración de la base de datos
	dbUser := getEnv("DB_USER", "quovi_user")
	dbPassword := getEnv("DB_PASSWORD", "quovi_secret")
	dbHost := getEnv("DB_HOST", "db")
	dbPort := getEnv("DB_PORT", "3306")
	dbName := getEnv("DB_NAME", "quovi_db")

	// Construir DSN (Data Source Name) para MySQL
	dsn := dbUser + ":" + dbPassword + "@tcp(" + dbHost + ":" + dbPort + ")/" + dbName + "?charset=utf8mb4&parseTime=True&loc=Local"

	// Inicializar gestor de base de datos
	dbManager := repository.New(dsn)

	// Esperar a que la base de datos esté lista
	time.Sleep(2 * time.Second)

	// Verificar que las tablas existan
	if err := dbManager.VerificarTablas(); err != nil {
		time.Sleep(5 * time.Second)
		if err := dbManager.VerificarTablas(); err != nil {
			log.Fatalf("Error: No se pudo conectar a la base de datos: %v", err)
		}
	}

	// Inicializar servicios con sus dependencias
	jwtSecret := getEnv("JWT_SECRET", "mi-secreto-super-seguro-cambiar-en-produccion")
	authService := services.NewAuthService(dbManager, jwtSecret)
	restauranteService := services.NewRestauranteService(dbManager)
	perfilService := services.NewPerfilService(dbManager)
	platilloService := services.NewPlatilloService(dbManager)

	// Inicializar handlers
	authHandler := handlers.NewAuthHandler(authService)
	restauranteHandler := handlers.NewRestauranteHandler(restauranteService)
	perfilHandler := handlers.NewPerfilHandler(perfilService)
	platilloHandler := handlers.NewPlatilloHandler(platilloService)

	// Configurar modo de Gin según el entorno
	if getEnv("ENVIRONMENT", "development") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	// Aplicar middleware global de seguridad
	router.Use(middleware.SecurityHeaders())
	router.Use(middleware.InputSanitization())
	router.Use(middleware.MaxBodySize(5 * 1024 * 1024)) // Límite de 5MB

	// Configurar CORS
	corsOrigins := getCORSOrigins()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     corsOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Servir archivos estáticos (imágenes de perfil, etc.)
	router.Static("/uploads", "./uploads")

	// Grupo de rutas de la API
	api := router.Group("/api")
	{
		// Rutas de autenticación (públicas con rate limiting)
		authRateLimiter := middleware.NewRateLimiter(5)
		auth := api.Group("/auth")
		auth.Use(middleware.ValidateContentType("application/json"))
		auth.Use(authRateLimiter.Middleware())
		{
			auth.POST("/register", authHandler.Registrar)
			auth.POST("/login", authHandler.Login)
			auth.POST("/login/google", authHandler.LoginGoogle)
			auth.POST("/logout", authHandler.Logout)
		}

		// Rutas de restaurantes (públicas)
		restaurantes := api.Group("/restaurantes")
		{
			restaurantes.GET("", restauranteHandler.ObtenerTodosLosRestaurantes)
			restaurantes.GET("/:id", restauranteHandler.ObtenerRestaurantePorID)
			restaurantes.GET("/:id/platillos", platilloHandler.ObtenerPlatillosPorRestaurante)
			restaurantes.GET("/:id/platillos/destacados", platilloHandler.ObtenerPlatilloDestacados)
			restaurantes.POST("/cercanos", restauranteHandler.ObtenerRestaurantesCercanos)
			restaurantes.POST("/buscar", restauranteHandler.BuscarRestaurantes)
		}

		// Rutas de categorías (públicas)
		categorias := api.Group("/categorias")
		{
			categorias.GET("", restauranteHandler.ObtenerCategorias)
			categorias.GET("/:id/restaurantes", restauranteHandler.ObtenerRestaurantesPorCategoria)
		}

		// Ruta de ciudades (pública)
		api.GET("/ciudades", restauranteHandler.ObtenerCiudades)

		// Rutas protegidas (requieren autenticación)
		protected := api.Group("/")
		protected.Use(authHandler.VerificarToken)
		{
			// Gestión de perfil de usuario
			perfil := protected.Group("/perfil")
			{
				perfil.GET("", perfilHandler.ObtenerPerfil)
				perfil.PUT("", perfilHandler.ActualizarPerfil)
				perfil.POST("/foto", perfilHandler.SubirFotoPerfil)
				perfil.POST("/foto/base64", perfilHandler.SubirFotoPerfilBase64)
				perfil.DELETE("/foto", perfilHandler.EliminarFotoPerfil)
				perfil.POST("/cambiar-password", perfilHandler.CambiarPassword)
				perfil.PUT("/nombre-usuario", perfilHandler.ActualizarNombreUsuario)
				perfil.DELETE("/cuenta", perfilHandler.EliminarCuenta)
			}

			// Gestión de favoritos
			favoritos := protected.Group("/favoritos")
			{
				favoritos.GET("", restauranteHandler.ObtenerFavoritos)
				favoritos.POST("", restauranteHandler.AgregarFavorito)
				favoritos.DELETE("/:id", restauranteHandler.EliminarFavorito)
			}
		}
	}

	// Rutas de salud y root
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"service": "Quovi API",
			"version": "1.0.0",
		})
	})

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Quovi API",
			"version": "1.0.0",
			"status":  "running",
		})
	})

	// Iniciar servidor
	port := getEnv("PORT", "8080")
	log.Printf("Servidor iniciado en puerto %s", port)

	if err := router.Run("0.0.0.0:" + port); err != nil {
		log.Fatalf("Error al iniciar servidor: %v", err)
	}
}

// getEnv obtiene una variable de entorno o retorna un valor por defecto
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

// getCORSOrigins obtiene los orígenes permitidos para CORS desde variables de entorno
func getCORSOrigins() []string {
	corsOriginsStr := getEnv("CORS_ORIGINS", "http://localhost:3000,http://localhost:3001")
	origins := strings.Split(corsOriginsStr, ",")
	for i, origin := range origins {
		origins[i] = strings.TrimSpace(origin)
	}
	return origins
}
