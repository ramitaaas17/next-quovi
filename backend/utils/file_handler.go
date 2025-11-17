package utils

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"
)

const (
	MaxFileSize      = 5 * 1024 * 1024 // 5MB
	UploadDir        = "./uploads/avatars"
	AllowedMimeTypes = "image/jpeg,image/png,image/jpg,image/gif,image/webp"
)

// ValidarImagen valida que el archivo sea una imagen válida
func ValidarImagen(file *multipart.FileHeader) error {
	// Validar tamaño
	if file.Size > MaxFileSize {
		return errors.New("el archivo excede el tamaño máximo permitido (5MB)")
	}

	// Validar tipo MIME
	mimeType := file.Header.Get("Content-Type")
	if !strings.Contains(AllowedMimeTypes, mimeType) {
		return fmt.Errorf("tipo de archivo no permitido. Solo se aceptan: %s", AllowedMimeTypes)
	}

	return nil
}

// GuardarImagen guarda la imagen en el servidor y retorna la URL
func GuardarImagen(file *multipart.FileHeader, userID uint) (string, error) {
	// Validar imagen
	if err := ValidarImagen(file); err != nil {
		return "", err
	}

	// Crear directorio si no existe
	if err := os.MkdirAll(UploadDir, 0755); err != nil {
		return "", fmt.Errorf("error al crear directorio de uploads: %v", err)
	}

	// Generar nombre único para el archivo
	ext := filepath.Ext(file.Filename)
	filename := fmt.Sprintf("user_%d_%s%s", userID, generarIDUnico(), ext)
	filepath := filepath.Join(UploadDir, filename)

	// Abrir el archivo subido
	src, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("error al abrir archivo: %v", err)
	}
	defer src.Close()

	// Crear el archivo de destino
	dst, err := os.Create(filepath)
	if err != nil {
		return "", fmt.Errorf("error al crear archivo: %v", err)
	}
	defer dst.Close()

	// Copiar contenido
	if _, err := io.Copy(dst, src); err != nil {
		return "", fmt.Errorf("error al guardar archivo: %v", err)
	}

	// Retornar URL relativa
	return fmt.Sprintf("/uploads/avatars/%s", filename), nil
}

// EliminarImagen elimina una imagen del servidor
func EliminarImagen(imageURL string) error {
	if imageURL == "" {
		return nil
	}

	// Extraer nombre del archivo de la URL
	filename := filepath.Base(imageURL)
	filepath := filepath.Join(UploadDir, filename)

	// Verificar si el archivo existe
	if _, err := os.Stat(filepath); os.IsNotExist(err) {
		return nil // Archivo no existe, no hay error
	}

	// Eliminar archivo
	if err := os.Remove(filepath); err != nil {
		return fmt.Errorf("error al eliminar archivo: %v", err)
	}

	return nil
}

// generarIDUnico genera un ID único para nombres de archivo
func generarIDUnico() string {
	b := make([]byte, 16)
	rand.Read(b)
	return base64.URLEncoding.EncodeToString(b)[:16]
}

// ValidarBase64Image valida y decodifica una imagen en base64
func ValidarBase64Image(base64String string) ([]byte, error) {
	// Remover prefijo data:image si existe
	parts := strings.Split(base64String, ",")
	if len(parts) == 2 {
		base64String = parts[1]
	}

	// Decodificar base64
	imageData, err := base64.StdEncoding.DecodeString(base64String)
	if err != nil {
		return nil, errors.New("formato de imagen base64 inválido")
	}

	// Validar tamaño
	if len(imageData) > MaxFileSize {
		return nil, errors.New("la imagen excede el tamaño máximo permitido (5MB)")
	}

	return imageData, nil
}

// GuardarBase64Image guarda una imagen en base64 y retorna la URL
func GuardarBase64Image(base64String string, userID uint, extension string) (string, error) {
	// Validar y decodificar
	imageData, err := ValidarBase64Image(base64String)
	if err != nil {
		return "", err
	}

	// Crear directorio si no existe
	if err := os.MkdirAll(UploadDir, 0755); err != nil {
		return "", fmt.Errorf("error al crear directorio de uploads: %v", err)
	}

	// Generar nombre único
	filename := fmt.Sprintf("user_%d_%s.%s", userID, generarIDUnico(), extension)
	filepath := filepath.Join(UploadDir, filename)

	// Guardar archivo
	if err := os.WriteFile(filepath, imageData, 0644); err != nil {
		return "", fmt.Errorf("error al guardar imagen: %v", err)
	}

	// Retornar URL relativa
	return fmt.Sprintf("/uploads/avatars/%s", filename), nil
}
