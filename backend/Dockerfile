# Usa una imagen oficial de Go
FROM golang:1.22-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Instala git (necesario para algunas dependencias de Go)
RUN apk add --no-cache git

# Copia go.mod y go.sum primero (para aprovechar la caché de Docker)
COPY go.mod go.sum* ./

# Descarga las dependencias
RUN go mod download

# Copia el resto del código
COPY . .

# Asegúrate de que las dependencias están sincronizadas
RUN go mod tidy

# Expone el puerto
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["go", "run", "main.go"]