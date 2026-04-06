# node:20-alpine : Node 20 sur Alpine Linux
# Alpine = distribution Linux ultra-légère (~5Mo) basée sur musl libc
FROM node:20-alpine

WORKDIR /app

# Copier package.json ET package-lock.json ensemble
# package-lock.json garantit des versions exactes (reproductibilité)
COPY package.json package-lock.json ./

# npm ci vs npm install :
# npm ci = "clean install" → lit package-lock.json exactement, plus rapide, pour CI/CD
# npm install → peut mettre à jour package-lock.json, pour le dev local
RUN npm ci

# Copier le reste du code (après npm ci pour le cache)
COPY . .

EXPOSE 5173

# --host : Vite doit écouter sur 0.0.0.0, pas seulement 127.0.0.1
# Sans ça, le hot-reload de Vite n'est pas accessible depuis l'extérieur du container
CMD ["npm", "run", "dev", "--", "--host"]