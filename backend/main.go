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
	// Cargar variables de entorno
	err := godotenv.Load()
	if err != nil {
		log.Println("WARNING: .env file not found, using system environment variables")
	}

	// Configuración de la base de datos
	dbUser := getEnv("DB_USER", "quovi_user")
	dbPassword := getEnv("DB_PASSWORD", "quovi_secret")
	dbHost := getEnv("DB_HOST", "db")
	dbPort := getEnv("DB_PORT", "3306")
	dbName := getEnv("DB_NAME", "quovi_db")

	// Construir DSN para MySQL
	dsn := dbUser + ":" + dbPassword + "@tcp(" + dbHost + ":" + dbPort + ")/" + dbName + "?charset=utf8mb4&parseTime=True&loc=Local"

	log.Println("Connecting to database...")
	log.Printf("Host: %s:%s", dbHost, dbPort)
	log.Printf("Database: %s", dbName)

	// Inicializar base de datos
	dbManager := repository.New(dsn)

	// Verificar tablas
	log.Println("Waiting for database to be ready...")
	time.Sleep(2 * time.Second)

	if err := dbManager.VerificarTablas(); err != nil {
		log.Println("ERROR: Failed to verify tables, retrying in 5 seconds...")
		time.Sleep(5 * time.Second)

		if err := dbManager.VerificarTablas(); err != nil {
			log.Fatalf("FATAL: Could not connect to database: %v", err)
		}
	}

	// Inicializar servicios
	jwtSecret := getEnv("JWT_SECRET", "mi-secreto-super-seguro-cambiar-en-produccion")
	authService := services.NewAuthService(dbManager, jwtSecret)
	restauranteService := services.NewRestauranteService(dbManager)

	// Inicializar handlers
	authHandler := handlers.NewAuthHandler(authService)
	restauranteHandler := handlers.NewRestauranteHandler(restauranteService)

	// Configurar Gin en modo release para producción
	if getEnv("ENVIRONMENT", "development") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Configurar Gin
	router := gin.Default()

	// Middlewares de seguridad globales
	router.Use(middleware.SecurityHeaders())
	router.Use(middleware.InputSanitization())
	router.Use(middleware.MaxBodySize(5 * 1024 * 1024))

	// Configurar CORS
	corsOrigins := getCORSOrigins()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     corsOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// API Routes
	api := router.Group("/api")
	{
		// Auth routes
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

		// Public restaurant routes
		restaurantes := api.Group("/restaurantes")
		{
			restaurantes.GET("", restauranteHandler.ObtenerTodosLosRestaurantes)
			restaurantes.GET("/:id", restauranteHandler.ObtenerRestaurantePorID)
			restaurantes.POST("/cercanos", restauranteHandler.ObtenerRestaurantesCercanos)
			restaurantes.POST("/buscar", restauranteHandler.BuscarRestaurantes)
		}

		// Categories routes
		categorias := api.Group("/categorias")
		{
			categorias.GET("", restauranteHandler.ObtenerCategorias)
			categorias.GET("/:id/restaurantes", restauranteHandler.ObtenerRestaurantesPorCategoria)
		}

		// Cities routes
		api.GET("/ciudades", restauranteHandler.ObtenerCiudades)

		// Protected routes
		protected := api.Group("/")
		protected.Use(authHandler.VerificarToken)
		{
			protected.GET("/perfil", func(c *gin.Context) {
				userID := c.GetUint("userID")
				c.JSON(200, gin.H{
					"message": "Protected route",
					"userID":  userID,
				})
			})

			favoritos := protected.Group("/favoritos")
			{
				favoritos.GET("", restauranteHandler.ObtenerFavoritos)
				favoritos.POST("", restauranteHandler.AgregarFavorito)
				favoritos.DELETE("/:id", restauranteHandler.EliminarFavorito)
			}
		}
	}

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"service": "Quovi API",
			"version": "1.0.0",
		})
	})

	// Root endpoint
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Quovi API",
			"version": "1.0.0",
			"status":  "running",
			"endpoints": gin.H{
				"health": "GET /health",
				"auth": gin.H{
					"register": "POST /api/auth/register",
					"login":    "POST /api/auth/login",
					"google":   "POST /api/auth/login/google",
					"logout":   "POST /api/auth/logout",
				},
				"restaurantes": gin.H{
					"all":      "GET /api/restaurantes",
					"byId":     "GET /api/restaurantes/:id",
					"cercanos": "POST /api/restaurantes/cercanos",
					"buscar":   "POST /api/restaurantes/buscar",
				},
				"categorias": gin.H{
					"all":          "GET /api/categorias",
					"restaurantes": "GET /api/categorias/:id/restaurantes",
				},
				"ciudades": "GET /api/ciudades",
				"favoritos": gin.H{
					"get":    "GET /api/favoritos (auth required)",
					"add":    "POST /api/favoritos (auth required)",
					"remove": "DELETE /api/favoritos/:id (auth required)",
				},
			},
		})
	})

	// Start server
	port := getEnv("PORT", "8080")
	log.Printf("Server starting on port %s", port)
	log.Printf("Health check: http://localhost:%s/health", port)

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
