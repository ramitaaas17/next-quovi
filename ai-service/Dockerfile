# ai-service/Dockerfile - MULTI-STAGE BUILD

# ==================== STAGE 1: Builder ====================
FROM python:3.11-slim AS builder

WORKDIR /app

# Instalar dependencias de compilación
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Crear virtualenv para aislar dependencias
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copiar requirements e instalar
COPY requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Pre-descargar el modelo
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')"

# ==================== STAGE 2: Runtime ====================
FROM python:3.11-slim

WORKDIR /app

# Instalar SOLO curl (para healthcheck), no gcc/g++
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copiar virtualenv desde builder
COPY --from=builder /opt/venv /opt/venv

# Copiar el cache del modelo
COPY --from=builder /root/.cache /root/.cache

# Usar el virtualenv
ENV PATH="/opt/venv/bin:$PATH"

# Copiar código de la aplicación
COPY . .

# Crear directorio para cache
RUN mkdir -p /app/cache

EXPOSE 5050

ENV PORT=5050 \
    ENVIRONMENT=development \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Healthcheck más tolerante
HEALTHCHECK --interval=30s --timeout=30s --start-period=120s --retries=5 \
    CMD curl -f http://localhost:5050/health || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5050"]