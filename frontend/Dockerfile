# Usa una imagen oficial de Node
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto en el que Next.js corre por defecto
EXPOSE 3000

# Comando para iniciar la app en modo desarrollo
CMD ["npm", "run", "dev"]