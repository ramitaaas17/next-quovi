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
	err := godotenv.Load()
	if err != nil {
		log.Println("WARNING: .env file not found, using system environment variables")
	}

	dbUser := getEnv("DB_USER", "quovi_user")
	dbPassword := getEnv("DB_PASSWORD", "quovi_secret")
	dbHost := getEnv("DB_HOST", "db")
	dbPort := getEnv("DB_PORT", "3306")
	dbName := getEnv("DB_NAME", "quovi_db")

	dsn := dbUser + ":" + dbPassword + "@tcp(" + dbHost + ":" + dbPort + ")/" + dbName + "?charset=utf8mb4&parseTime=True&loc=Local"

	log.Println("Connecting to database...")
	log.Printf("Host: %s:%s", dbHost, dbPort)
	log.Printf("Database: %s", dbName)

	dbManager := repository.New(dsn)

	log.Println("Waiting for database to be ready...")
	time.Sleep(2 * time.Second)

	if err := dbManager.VerificarTablas(); err != nil {
		log.Println("ERROR: Failed to verify tables, retrying in 5 seconds...")
		time.Sleep(5 * time.Second)

		if err := dbManager.VerificarTablas(); err != nil {
			log.Fatalf("FATAL: Could not connect to database: %v", err)
		}
	}

	// ========================================
	// INYECCIÓN DE DEPENDENCIAS - SERVICES
	// ========================================
	jwtSecret := getEnv("JWT_SECRET", "mi-secreto-super-seguro-cambiar-en-produccion")
	authService := services.NewAuthService(dbManager, jwtSecret)
	restauranteService := services.NewRestauranteService(dbManager)
	perfilService := services.NewPerfilService(dbManager)
	platilloService := services.NewPlatilloService(dbManager) // ✅ NUEVO

	// ========================================
	// INYECCIÓN DE DEPENDENCIAS - HANDLERS
	// ========================================
	authHandler := handlers.NewAuthHandler(authService)
	restauranteHandler := handlers.NewRestauranteHandler(restauranteService)
	perfilHandler := handlers.NewPerfilHandler(perfilService)
	platilloHandler := handlers.NewPlatilloHandler(platilloService) // ✅ NUEVO

	if getEnv("ENVIRONMENT", "development") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	// ========================================
	// MIDDLEWARE GLOBAL
	// ========================================
	router.Use(middleware.SecurityHeaders())
	router.Use(middleware.InputSanitization())
	router.Use(middleware.MaxBodySize(5 * 1024 * 1024))

	corsOrigins := getCORSOrigins()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     corsOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	router.Static("/uploads", "./uploads")

	// ========================================
	// RUTAS DE LA API
	// ========================================
	api := router.Group("/api")
	{
		// ========================================
		// AUTENTICACIÓN (público, con rate limiting)
		// ========================================
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

		// ========================================
		// RESTAURANTES (público)
		// ========================================
		restaurantes := api.Group("/restaurantes")
		{
			restaurantes.GET("", restauranteHandler.ObtenerTodosLosRestaurantes)
			restaurantes.GET("/:id", restauranteHandler.ObtenerRestaurantePorID)
			restaurantes.GET("/:id/platillos", platilloHandler.ObtenerPlatillosPorRestaurante)
			restaurantes.GET("/:id/platillos/destacados", platilloHandler.ObtenerPlatilloDestacados)
			restaurantes.POST("/cercanos", restauranteHandler.ObtenerRestaurantesCercanos)
			restaurantes.POST("/buscar", restauranteHandler.BuscarRestaurantes)
		}

		// ========================================
		// CATEGORÍAS (público)
		// ========================================
		categorias := api.Group("/categorias")
		{
			categorias.GET("", restauranteHandler.ObtenerCategorias)
			categorias.GET("/:id/restaurantes", restauranteHandler.ObtenerRestaurantesPorCategoria)
		}

		// ========================================
		// CIUDADES (público)
		// ========================================
		api.GET("/ciudades", restauranteHandler.ObtenerCiudades)

		// ========================================
		// RUTAS PROTEGIDAS (requieren autenticación)
		// ========================================
		protected := api.Group("/")
		protected.Use(authHandler.VerificarToken)
		{
			// PERFIL
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

			// FAVORITOS
			favoritos := protected.Group("/favoritos")
			{
				favoritos.GET("", restauranteHandler.ObtenerFavoritos)
				favoritos.POST("", restauranteHandler.AgregarFavorito)
				favoritos.DELETE("/:id", restauranteHandler.EliminarFavorito)
			}
		}
	}

	// ========================================
	// RUTAS DE SALUD Y ROOT
	// ========================================
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

	// ========================================
	// INICIAR SERVIDOR
	// ========================================
	port := getEnv("PORT", "8080")
	log.Printf("Server starting on port %s", port)

	if err := router.Run(":" + port); err != nil {
		log.Fatalf("FATAL: Failed to start server: %v", err)
	}
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func getCORSOrigins() []string {
	corsOriginsStr := getEnv("CORS_ORIGINS", "http://localhost:3000,http://localhost:3001")
	origins := strings.Split(corsOriginsStr, ",")
	for i, origin := range origins {
		origins[i] = strings.TrimSpace(origin)
	}
	return origins
}
