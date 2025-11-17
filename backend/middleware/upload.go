package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

const (
	MaxUploadSize = 5 * 1024 * 1024 // 5MB
)

// LimitUploadSize limita el tamaño de archivos que se pueden subir
func LimitUploadSize(maxSize int64) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Establecer límite de tamaño del body
		c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, maxSize)
		c.Next()
	}
}

// ValidateFileUpload valida que la petición contenga un archivo
func ValidateFileUpload(fieldName string) gin.HandlerFunc {
	return func(c *gin.Context) {
		file, err := c.FormFile(fieldName)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error":   "missing_file",
				"message": "No se encontró el archivo en la petición",
			})
			c.Abort()
			return
		}

		// Guardar el archivo en el contexto para uso posterior
		c.Set("uploadedFile", file)
		c.Next()
	}
}
