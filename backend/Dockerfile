# Usa una imagen oficial de Go
FROM golang:1.22-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Instala git (necesario para algunas dependencias de Go)
RUN apk add --no-cache git

# Copia el resto del código
COPY . .

# Inicializa el módulo de Go si no existe
RUN go mod init quovi || true
RUN go mod tidy || true

# Expone el puerto
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["go", "run", "main.go"]