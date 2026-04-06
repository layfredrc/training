# FROM : image de base sur laquelle on construit
# python:3.12-slim = Python 3.12 sur Debian minimaliste (sans les outils dev inutiles)
# "slim" = ~50Mo vs ~900Mo pour l'image complète
FROM python:3.12-slim

# ENV : variables d'environnement dans le container
# PYTHONDONTWRITEBYTECODE=1 : ne génère pas de fichiers .pyc (inutiles en container)
# PYTHONUNBUFFERED=1 : les logs Python apparaissent immédiatement (pas bufferisés)
#   → sans ça, docker logs ne montre rien jusqu'à ce que le buffer se vide
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# WORKDIR : répertoire de travail pour toutes les commandes suivantes
# Crée le dossier s'il n'existe pas.
# Convention : /app pour les projets web
WORKDIR /app

# RUN : exécute une commande PENDANT le build de l'image
# gcc : compilateur C nécessaire pour certains packages Python (ex: psycopg2)
# rm -rf /var/lib/apt/lists/* : supprime le cache apt pour alléger l'image
RUN apt-get update && apt-get install -y gcc && rm -rf /var/lib/apt/lists/*

# COPY <source_host> <destination_container>
# On copie SEULEMENT requirements.txt d'abord (optimisation du cache, voir ci-dessus)
COPY requirements.txt .

# RUN pip install : installe les dépendances dans l'image
# --no-cache-dir : n'enregistre pas le cache pip dans l'image (économise de l'espace)
RUN pip install --no-cache-dir -r requirements.txt

# Maintenant on copie TOUT le reste du code
# Le . source = tout le dossier backend/ (sauf ce qui est dans .dockerignore)
# Le . destination = /app (le WORKDIR)
COPY . .

# EXPOSE : documente quel port le container utilise
# N'ouvre pas vraiment le port (c'est docker-compose qui fait ça avec 'ports:')
# C'est de la documentation pour les humains et les outils
EXPOSE 8000

# CMD : commande lancée quand le container démarre
# 0.0.0.0 = écouter sur TOUTES les interfaces réseau du container
# Sans ça, runserver écoute sur 127.0.0.1 (loopback) et est inaccessible depuis l'extérieur
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]