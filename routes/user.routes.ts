import express from "express";
import { checkSchema } from "express-validator";
import UserControllers from "../controllers/user.controllers";
import { validateAuth, validateFields } from "../middlewares/index";
import { del, login, update, user } from "../schemas/index";
const router = express.Router();
const {
  getUsers,
  getUser,
  getUserWithId,
  registerUser,
  loginUser,
  secret,
  updateUser,
  deleteUser,
} = UserControllers;

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene la lista de usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "c86cef30-383d-49de-bd95-778e309c52b8"
 *                   name:
 *                     type: string
 *                     example: "John"
 *                   lastname:
 *                     type: string
 *                     example: "Doe"
 *                   email:
 *                     type: string
 *                     example: "johndoe@mail.com"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-01-30T20:34:34.123Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-01-30T20:34:34.123Z"
 *                   moviesId:
 *                     type: array
 *                     items:
 *                       type: string
 *                   favorites:
 *                     type: array
 *                     items:
 *                       type: string
 *       204:
 *         description: No se encontraron usuarios
 */
router.get("/", getUsers);

//router.get("/user", getUser);

/**
 * @swagger
 * /api/users/user/{id}:
 *   get:
 *     summary: Busca un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "9ad4e065-d6a9-4ad9-a69b-f6972786ebf8"
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "9ad4e065-d6a9-4ad9-a69b-f6972786ebf8"
 *                 name:
 *                   type: string
 *                   example: "Michael"
 *                 lastname:
 *                   type: string
 *                   example: "Smith"
 *                 email:
 *                   type: string
 *                   example: "michalssmith@mail.com"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-30T20:35:27.556Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-30T20:35:27.556Z"
 *                 moviesId:
 *                   type: array
 *                   items:
 *                     type: string
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Usuario no encontrado
 */
router.get("/user/:id", getUserWithId);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Esta ruta registra un nuevo usuario con los campos `name`, `lastname`, `email` y `password`.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre del usuario.
 *                 example: "Michael"
 *               lastname:
 *                 type: string
 *                 description: El apellido del usuario.
 *                 example: "Jordan"
 *               email:
 *                 type: string
 *                 description: El correo electrónico del usuario. Debe ser válido.
 *                 example: "michaljordan@mail.com"
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario. Debe cumplir con los requisitos de seguridad (mínimo 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial).
 *                 example: "Password123!"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario registrado satisfactoriamente."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "7ead6e2f-bb02-4b6c-8871-084ff2e7b782"
 *                     name:
 *                       type: string
 *                       example: "Michael"
 *                     lastname:
 *                       type: string
 *                       example: "Jordan"
 *                     email:
 *                       type: string
 *                       example: "michaljordan@mail.com"
 *                     password:
 *                       type: string
 *                       example: "$2b$10$dsCFTaY.KTaijAsFklh59uP45KdyarDuitLtqR.RbW86uJixcCqRq"
 *                     createdAt:
 *                       type: string
 *                       example: "2025-01-30T21:02:15.265Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2025-01-30T21:02:15.265Z"
 *                     moviesId:
 *                       type: object
 *                       example: null
 *       400:
 *         description: Errores de validación. El campo no cumple con los requisitos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errores:
 *                   type: integer
 *                   example: 8
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "field"
 *                       msg:
 *                         type: string
 *                         example: "El nombre es requerido."
 *                       path:
 *                         type: string
 *                         example: "name"
 *                       location:
 *                         type: string
 *                         example: "body"
 *       422:
 *         description: El email o la contraseña no cumplen los requisitos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errores:
 *                   type: integer
 *                   example: 1
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "field"
 *                       value:
 *                         type: string
 *                         example: "michaljordan"
 *                       msg:
 *                         type: string
 *                         example: "Ingrese un email válido."
 *                       path:
 *                         type: string
 *                         example: "email"
 *                       location:
 *                         type: string
 *                         example: "body"
 */
router.post("/", checkSchema(user), validateFields, registerUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Inicia sesión con email y password
 *     description: Inicia sesión enviando un email y contraseña válidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "michaljordann@mail.com"  # Aquí va el valor de ejemplo visible en el campo
 *               password:
 *                 type: string
 *                 example: "Jordan123-"  # Aquí va el valor de ejemplo visible en el campo
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "michaljordann@mail.com"
 *                     name:
 *                       type: string
 *                       example: "Michael"
 *                     lastname:
 *                       type: string
 *                       example: "Jordan"
 *                     id:
 *                       type: string
 *                       example: "2a54e5c4-d069-4b88-95fd-7ac52a57fa94"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Error en los datos proporcionados
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", checkSchema(login), validateFields, loginUser);
router.get("/secret/:token", validateAuth, secret);
router.put("/", checkSchema(update), validateFields, updateUser);
router.delete("/", checkSchema(del), validateFields, deleteUser);

export default router;
