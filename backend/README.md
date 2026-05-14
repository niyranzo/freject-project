# FREJECT Backend

API REST desarrollada con Node.js, Express y PostgreSQL usando Sequelize. Esta aplicación gestiona usuarios, clientes, proyectos, tareas, costos y solicitudes con autenticación basada en JWT.

## 📦 Requisitos

- Node.js 18+ o compatible
- npm
- PostgreSQL

## 🔧 Instalación

1. Abrir terminal en `backend`
2. Instalar dependencias:

```bash
npm install
```

## ⚙️ Configuración

Crear un archivo `.env` en `backend` con al menos las siguientes variables:

```env
DATABASE_URL=postgres://usuario:password@host:puerto/nombre_basedatos
JWT_SECRET=una_clave_secreta
PORT=4000
```

> El backend también usa `.env.test` cuando ejecuta pruebas.

## 🚀 Ejecutar el servidor

```bash
npm run dev
```

El servidor arrancará en el puerto especificado en `PORT` o `4000` por defecto.

## 🧪 Pruebas

```bash
npm test
```

Para ver las pruebas en modo watch:

```bash
npm run test:watch
```

## 🗂️ Estructura principal

- `server.js` - punto de entrada de la aplicación
- `src/app.js` - configuración de Express y rutas
- `src/config/db.js` - conexión y sincronización con PostgreSQL
- `src/routes/` - define los endpoints de la API
- `src/controllers/` - lógica de negocio de cada recurso
- `src/middlewares/authMiddleware.js` - protección de rutas con JWT
- `src/models/` - modelos Sequelize

## 📡 Endpoints principales

### Autenticación
- `POST /api/auth/register` - registrar un usuario
- `POST /api/auth/login` - iniciar sesión y obtener token

### Usuarios
- `GET /api/users` - listar usuarios
- `GET /api/users/:id` - obtener usuario por id
- `PUT /api/users/:id` - actualizar usuario
- `DELETE /api/users/:id` - eliminar usuario

### Clientes
- `GET /api/clients`
- `GET /api/clients/:id`
- `POST /api/clients`
- `PUT /api/clients/:id`
- `DELETE /api/clients/:id`

### Proyectos
- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

### Tareas
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Costos
- `GET /api/costs`
- `GET /api/costs/:id`
- `POST /api/costs`
- `PUT /api/costs/:id`
- `DELETE /api/costs/:id`

### Solicitudes
- `GET /api/requests`
- `GET /api/requests/:id`
- `POST /api/requests`
- `PUT /api/requests/:id`
- `DELETE /api/requests/:id`

## 🔐 Autenticación

Las rutas de usuarios, clientes, proyectos, tareas, costos y solicitudes requieren autenticación JWT. Debes enviar el token en el header `Authorization` con formato:

```http
Authorization: Bearer <token>
```

## ✅ Notas

- Antes de ejecutar el servidor, asegúrate de que PostgreSQL esté funcionando y la URL de conexión en `DATABASE_URL` sea correcta.
- El servidor sincroniza los modelos con la base de datos usando Sequelize.
- Si quieres añadir más rutas o recursos, usa el patrón de `routes -> controllers -> models`.
