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

// ValidarImagen verifica tamaño y tipo MIME del archivo
func ValidarImagen(file *multipart.FileHeader) error {
	if file.Size > MaxFileSize {
		return errors.New("el archivo excede el tamaño máximo permitido (5MB)")
	}

	mimeType := file.Header.Get("Content-Type")
	if !strings.Contains(AllowedMimeTypes, mimeType) {
		return fmt.Errorf("tipo de archivo no permitido. Solo se aceptan: %s", AllowedMimeTypes)
	}

	return nil
}

// GuardarImagen guarda el archivo en el servidor y retorna la URL
func GuardarImagen(file *multipart.FileHeader, userID uint) (string, error) {
	if err := ValidarImagen(file); err != nil {
		return "", err
	}

	if err := os.MkdirAll(UploadDir, 0755); err != nil {
		return "", fmt.Errorf("error al crear directorio de uploads: %v", err)
	}

	// Genera nombre único: user_{id}_{random}.ext
	ext := filepath.Ext(file.Filename)
	filename := fmt.Sprintf("user_%d_%s%s", userID, generarIDUnico(), ext)
	filepath := filepath.Join(UploadDir, filename)

	src, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("error al abrir archivo: %v", err)
	}
	defer src.Close()

	dst, err := os.Create(filepath)
	if err != nil {
		return "", fmt.Errorf("error al crear archivo: %v", err)
	}
	defer dst.Close()

	if _, err := io.Copy(dst, src); err != nil {
		return "", fmt.Errorf("error al guardar archivo: %v", err)
	}

	return fmt.Sprintf("/uploads/avatars/%s", filename), nil
}

// EliminarImagen borra la imagen del servidor
func EliminarImagen(imageURL string) error {
	if imageURL == "" {
		return nil
	}

	filename := filepath.Base(imageURL)
	filepath := filepath.Join(UploadDir, filename)

	if _, err := os.Stat(filepath); os.IsNotExist(err) {
		return nil
	}

	if err := os.Remove(filepath); err != nil {
		return fmt.Errorf("error al eliminar archivo: %v", err)
	}

	return nil
}

// generarIDUnico crea un ID aleatorio de 16 caracteres
func generarIDUnico() string {
	b := make([]byte, 16)
	rand.Read(b)
	return base64.URLEncoding.EncodeToString(b)[:16]
}

// ValidarBase64Image decodifica y valida imagen en formato base64
func ValidarBase64Image(base64String string) ([]byte, error) {
	// Remueve el prefijo data:image si existe
	parts := strings.Split(base64String, ",")
	if len(parts) == 2 {
		base64String = parts[1]
	}

	imageData, err := base64.StdEncoding.DecodeString(base64String)
	if err != nil {
		return nil, errors.New("formato de imagen base64 inválido")
	}

	if len(imageData) > MaxFileSize {
		return nil, errors.New("la imagen excede el tamaño máximo permitido (5MB)")
	}

	return imageData, nil
}

// GuardarBase64Image convierte y guarda una imagen base64 en el servidor
func GuardarBase64Image(base64String string, userID uint, extension string) (string, error) {
	imageData, err := ValidarBase64Image(base64String)
	if err != nil {
		return "", err
	}

	if err := os.MkdirAll(UploadDir, 0755); err != nil {
		return "", fmt.Errorf("error al crear directorio de uploads: %v", err)
	}

	filename := fmt.Sprintf("user_%d_%s.%s", userID, generarIDUnico(), extension)
	filepath := filepath.Join(UploadDir, filename)

	if err := os.WriteFile(filepath, imageData, 0644); err != nil {
		return "", fmt.Errorf("error al guardar imagen: %v", err)
	}

	return fmt.Sprintf("/uploads/avatars/%s", filename), nil
}
