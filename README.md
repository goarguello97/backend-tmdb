# API de Catálogo de Películas

Este proyecto es una API que permite a los usuarios registrarse, iniciar sesión y agregar películas a su lista de favoritos. Utiliza tecnologías como Node.js, Express, Sequelize, y consume la API de TMDB (The Movie Database) para obtener información sobre las películas.

## Tecnologías

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework de Node.js para la creación de APIs.
- **Sequelize**: ORM para trabajar con bases de datos SQL (PostgreSQL).
- **TypeScript**: Lenguaje de programación que transpila a JavaScript.
- **jsonwebtoken**: Para la gestión de autenticación JWT.
- **bcrypt**: Para la encriptación de contraseñas.
- **dotenv**: Para gestionar variables de entorno.
- **Swagger**: Para documentar la API.
- **Axios**: Para realizar peticiones HTTP.
- **TMDB API**: Para obtener información de películas.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js**: [Instalar Node.js](https://nodejs.org/)
- **Docker** (opcional, para ejecutar la app en contenedor): [Instalar Docker](https://www.docker.com/)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <nombre_del_directorio>
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

3. Configura las variables de entorno necesarias. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes configuraciones:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=usuario
   DB_PASSWORD=contraseña
   DB_NAME=nombre_de_base_de_datos
   JWT_SECRET=secreto_para_tokens
   TMDB_API_KEY=tu_api_key_de_tmdb
   ```

## Comandos

- **Iniciar la aplicación** (compilando TypeScript):

  ```bash
  npm start
  ```

- **Desarrollar con recarga automática**:

  ```bash
  npm run server
  ```

- **Compilar el proyecto**:

  ```bash
  npm run build
  ```

- **Ejecutar las pruebas**:
  ```bash
  npm test
  ```

## Levantar la app con Docker

Puedes levantar la aplicación utilizando Docker con el siguiente comando:

```bash
docker-compose up --build
```

```
./
├── config/              # Configuración global de la aplicación
├── controllers/         # Controladores para manejar las peticiones HTTP
├── helpers/             # Funciones de ayuda y utilidades
├── middlewares/         # Middleware para validaciones y autenticación
├── services/            # Lógica de negocio de la aplicación
├── interfaces/          # Definición de interfaces para TypeScript
├── models/              # Modelos de Sequelize para interactuar con la base de datos
├── schemas/             # Definición de los esquemas de validación
├── server.ts            # Punto de entrada de la aplicación
├── tsconfig.json        # Configuración de TypeScript
├── docker-compose.yml   # Configuración para levantar la app con Docker
├── Dockerfile           # Archivo para crear la imagen Docker
├── .dockerignore        # Archivos y carpetas a excluir de la imagen Docker
├── .gitignore           # Archivos y carpetas a excluir del control de versiones
├── package.json         # Dependencias y configuración de npm
├── .env                 # Archivo de configuración con las variables de entorno

```
