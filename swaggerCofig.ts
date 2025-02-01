const PORT = process.env.PORT || 3001;
const { DB_HOST } = process.env;

export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "API tmdb",
      version: "1.0.0",
      description: "Descripción de API tmdb",
      contact: "Gonzalo Argüello",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/`, // Cambia esto al puerto que uses en tu app
        description: "Servidor local",
      },
    ],
  },
  apis: ["./dist/docs/swagger.yaml"], // Rutas que quieres documentar (ajusta el path a tus rutas)
};
