# Etapa 1: Build
FROM golang:1.23-alpine AS builder

WORKDIR /app

# Instalar dependencias de sistema
RUN apk add --no-cache git

# Copiar archivos de dependencias
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Copiar el resto del código
COPY backend/ .

# Compilar la aplicación
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Etapa 2: Production
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copiar el binario
COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]