# ai-service/Dockerfile - OPTIMIZADO PARA MEMORIA

FROM python:3.11-slim

WORKDIR /app

# ✅ Instalar dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    curl \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# ✅ Copiar requirements primero (mejor caché de Docker)
COPY requirements.txt .

# ✅ Instalar dependencias Python con optimizaciones
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# ✅ Variables de entorno para optimización de memoria
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    OMP_NUM_THREADS=1 \
    MKL_NUM_THREADS=1 \
    OPENBLAS_NUM_THREADS=1 \
    TOKENIZERS_PARALLELISM=false \
    PYTORCH_ENABLE_MPS_FALLBACK=1

# Exponer puerto
EXPOSE 5050

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=240s \
    CMD curl -f http://localhost:5050/health || exit 1

# ✅ Comando con menos workers para ahorrar memoria
CMD ["python", "-u", "main.py"]