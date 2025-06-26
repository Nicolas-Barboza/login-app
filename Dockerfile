# Paso 1: Fase de "build" - Construye la aplicación React
# Usamos una imagen Node.js para instalar dependencias y construir el proyecto
FROM node:18-alpine as builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración y dependencias
# Esto es para aprovechar el cache de capas de Docker/Podman
COPY package.json package-lock.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el resto del código fuente de tu aplicación
COPY . .

# Construye la aplicación React para producción
# Esto generará los archivos estáticos en la carpeta 'dist'
RUN npm run build

# Paso 2: Fase de "producción" - Sirve la aplicación con Nginx
# Usamos una imagen ligera de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos estáticos construidos desde la fase "builder"
# La carpeta 'dist' es donde Vite guarda la salida de producción
COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto 80 del contenedor, que es el puerto predeterminado de Nginx
EXPOSE 80

# Comando para iniciar Nginx en primer plano
# Esto es necesario para que el contenedor permanezca en ejecución
CMD ["nginx", "-g", "daemon off;"]