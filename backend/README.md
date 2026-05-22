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

## 📚 Modelos

A continuación se listan los modelos con sus atributos, tipos y restricciones (ver definiciones en `src/models/`).

- **User**
	- `id`: INTEGER, primaryKey, autoIncrement
	- `name`: STRING(255), allowNull: false
	- `email`: STRING(100), allowNull: false, unique, validate: isEmail
	- `password`: STRING, allowNull: false
	- `tableName`: `User`, `timestamps`: false

- **Client**
	- `id`: INTEGER, primaryKey, autoIncrement
	- `id_user`: INTEGER, allowNull: false (FK a `User`)
	- `name`: STRING(255), allowNull: false
	- `email`: STRING(100), allowNull: false, unique, validate: isEmail
	- `company`: STRING(255), allowNull: false
	- `timestamps`: true

- **Project**
	- `id`: INTEGER, primaryKey, autoIncrement
	- `id_user`: INTEGER, allowNull: false (FK a `User`)
	- `id_client`: INTEGER, allowNull: false (FK a `Client`)
	- `name`: STRING(255), allowNull: false
	- `price`: DECIMAL(10,2), allowNull: false
	- `status`: ENUM('pending','in_progress','completed','cancelled'), defaultValue: 'pending', allowNull: false
	- `create_date`: DATE, allowNull: false, defaultValue: NOW
	- `timestamps`: true

- **Task**
	- `id`: INTEGER, primaryKey, autoIncrement
	- `id_project`: INTEGER, allowNull: false (FK a `Project`)
	- `title`: STRING, allowNull: false, unique
	- `status`: ENUM('to_do','progress','completed'), defaultValue: 'to_do'
	- `timestamps`: true

- **Request**
	- `id`: INTEGER, primaryKey, autoIncrement
	- `id_project`: INTEGER, allowNull: false (FK a `Project`)
	- `title`: STRING, allowNull: false, unique
	- `timestamps`: true

- **Cost**
	- `id`: INTEGER, primaryKey, autoIncrement
	- `id_project`: INTEGER, allowNull: false (FK a `Project`)
	- `title`: STRING, allowNull: false, unique
	- `amount`: DECIMAL(10,2), allowNull: false
	- `timestamps`: true

Relaciones principales (definidas en `src/models/index.js`):
- Un `User` tiene muchos `Client` y muchos `Project`.
- Un `Client` tiene muchos `Project`.
- Un `Project` tiene muchas `Task`, `Request` y `Cost`.

## 📡 Endpoints principales

### Autenticación
- `POST /api/auth/register` - registrar un usuario
- `POST /api/auth/login` - iniciar sesión (genera cookie `token`)
- `GET /api/auth/me` - obtener datos del usuario autenticado (lee cookie `token`)
- `POST /api/auth/logout` - cerrar sesión (elimina cookie `token`)

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
- `GET /api/tasks` - listar todas las tareas
- `GET /api/tasks/:id` - obtener tarea por id
- `GET /api/tasks/project/:projectId` - listar tareas de un proyecto
- `POST /api/tasks` - crear tarea
- `PUT /api/tasks/:id` - actualizar tarea
- `DELETE /api/tasks/:id` - eliminar tarea

### Costos
- `GET /api/costs` - listar costes
- `GET /api/costs/:id` - obtener coste por id
- `GET /api/costs/project/:projectId` - listar costes de un proyecto
- `POST /api/costs` - crear coste
- `PUT /api/costs/:id` - actualizar coste
- `DELETE /api/costs/:id` - eliminar coste

### Solicitudes
- `GET /api/requests` - listar solicitudes
- `GET /api/requests/:id` - obtener solicitud por id
- `GET /api/requests/project/:projectId` - listar solicitudes de un proyecto
- `POST /api/requests` - crear solicitud
- `PUT /api/requests/:id` - actualizar solicitud
- `DELETE /api/requests/:id` - eliminar solicitud

## 🔐 Autenticación

La API utiliza JWT para autenticación, pero el token se almacena y consulta a través de cookies HTTP:

- Al hacer `POST /api/auth/login` el servidor genera un JWT y lo guarda en una cookie llamada `token`.
- La cookie tiene las siguientes propiedades (configuración en `src/controllers/authController.js`):
	- `httpOnly: true` (no accesible desde JavaScript del cliente)
	- `secure: false` en desarrollo (debe ser `true` en producción con HTTPS)
	- `sameSite: 'lax'`
	- `maxAge: 7 días`
- El middleware de autenticación (`src/middlewares/authMiddleware.js`) lee `req.cookies.token` y valida el JWT.
- `GET /api/auth/me` devuelve el usuario del token y `POST /api/auth/logout` limpia la cookie (`res.clearCookie('token')`).

Para probar desde clientes como Postman, la forma más sencilla es usar el endpoint de login para que el servidor establezca la cookie, o enviar manualmente la cookie `token` en las peticiones autorizadas.

## ✅ Notas

- Antes de ejecutar el servidor, asegúrate de que PostgreSQL esté funcionando y la URL de conexión en `DATABASE_URL` sea correcta.
- El servidor sincroniza los modelos con la base de datos usando Sequelize.
- Si quieres añadir más rutas o recursos, usa el patrón de `routes -> controllers -> models`.
