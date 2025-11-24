package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

const (
	MaxUploadSize = 5 * 1024 * 1024 // 5MB
)

// LimitUploadSize restringe el tamaño maximo de archivos subidos
func LimitUploadSize(maxSize int64) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, maxSize)
		c.Next()
	}
}

// ValidateFileUpload verifica que la peticion contenga un archivo valido
func ValidateFileUpload(fieldName string) gin.HandlerFunc {
	return func(c *gin.Context) {
		file, err := c.FormFile(fieldName)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error":   "missing_file",
				"message": "No se encontro el archivo en la peticion",
			})
			c.Abort()
			return
		}

		c.Set("uploadedFile", file)
		c.Next()
	}
}
