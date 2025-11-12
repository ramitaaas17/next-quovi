# Usa una imagen oficial de Python
FROM python:3.11-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo el archivo de requerimientos primero
COPY requirements.txt .

# Instala dependencias
RUN pip install --no-cache-dir -r requirements.txt --timeout=120

# Copia el resto del código fuente
COPY . .

# Expone el puerto
EXPOSE 5000

# Iniciar la aplicación
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0", "--port=5000"]