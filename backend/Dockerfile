# Usa una imagen oficial de Go con la versión correcta
FROM golang:1.23-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Instala git (necesario para algunas dependencias de Go)
RUN apk add --no-cache git

# Copia go.mod y go.sum primero (para aprovechar la caché de Docker)
COPY go.mod go.sum ./

# Descarga las dependencias
RUN go mod download

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 8080

# Comando para iniciar la aplicación (igual que antes)
CMD ["go", "run", "main.go"]