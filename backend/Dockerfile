# Etapa 1: Build
FROM golang:1.23-alpine AS builder

WORKDIR /app

# Instalar dependencias de sistema
RUN apk add --no-cache git

COPY go.mod go.sum ./
RUN go mod download

# Copiamos todo lo que está en el contexto actual
COPY . .

# Compilar la aplicación
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Etapa 2: Production
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copiar el binario desde la etapa builder
COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]