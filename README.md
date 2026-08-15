# TreeWork Frontend

TreeWork es el frontend de una plataforma de gestion de proyectos tipo Kanban para equipos que necesitan planificar trabajo, mover tareas entre estados y colaborar en tiempo real sin friccion. La interfaz combina una metafora visual de carpetas/archivos con un tablero funcional, autenticacion segura y un sistema de demo live para evaluar el producto sin crear una cuenta real.

<!-- Reemplazar por una captura real del dashboard/tablero -->
<!-- <img src="./docs/treework-dashboard.png" alt="TreeWork dashboard" width="1200" /> -->

## Stack principal

![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite 8](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack-Query-FF4154?logo=reactquery&logoColor=white)
![React Router 7](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-Client-010101?logo=socket.io&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-Testing-6E9F18?logo=vitest&logoColor=white)

## Caracteristicas

- Autenticacion con JWT en memoria y refresh token en cookie `httpOnly`, con reintento automotico en `401` mediante interceptor de Axios.
- Login nativo con email/password y Google OAuth, con flujo de confirmacion y recuperacion de contraseña.
- Tablero Kanban con columnas tipo carpeta y tareas tipo archivo (`dog-ear`), con tipografia monoespaciada para metadata tecnica.
- DnD real usando `@dnd-kit/react` para mover tareas entre estados sin romper la logica de negocio ni el estado del servidor.
- Demostracion sin registro con usuario efimero y datos precargados.
- Idempotencia en mutaciones criticas: las tareas creadas llevan `Idempotency-Key`, lo que elimina duplicados por doble click o reintentos de red.
- Tiempo real con Socket.io para notificaciones, cambios de proyecto, tareas y sincronizacion colaborativa.
- Breadcrumbs dinamicos generados desde `handle.crumb` y `useMatches()` de React Router para mantener contextos claros dentro del flujo del producto.
- Soporte de Light/Dark Mode con variables CSS y tokens semanticos definidos en `src/index.css`.
- Carga diferida por ruta con `lazy()` y skeletons especificos para evitar parpadeos de UI y mantener una experiencia estable.

## Stack tecnico

| Categoria | Tecnologia | Uso en el proyecto |
| --- | --- | --- |
| Core | React 19 | UI principal del frontend |
| Core | TypeScript | Tipado fuerte del dominio y validaciones |
| Core | Vite 8 | Bundling, dev server y build |
| Core | Tailwind CSS v4 | Sistema visual y tokens semanticos |
| Estado / Datos | TanStack Query | Cache, queries, invalidacion y sincronizacion de servidor |
| Ruteo | React Router v7 | Routing protegido, lazy routes, breadcrumbs |
| Formularios | React Hook Form + Zod | Formularios y validacion de inputs |
| HTTP | Axios | Cliente HTTP con interceptores y refresh automotico |
| Realtime | Socket.io-client | Notificaciones y sincronizacion colaborativa |
| UI | Headless UI | Accesibilidad y componentes base |
| UI | `@dnd-kit/react` | Drag and drop del tablero |
| UI / UX | `react-icons`, `react-toastify` | Iconografia, toasts y onboarding |
| Markdown | `react-markdown` | Render de contenido markdown |
| Auth | `@react-oauth/google` | Login con Google |
| Testing | Vitest + React Testing Library + jsdom | Test de servicios, hooks y componentes |
| Deploy | Render (Static Site + rewrite proxy) | Publicacion del frontend y proxy hacia el backend |

## Decisiones tecnicas destacadas

### 1) Refresh token en cookie `httpOnly` en lugar de `localStorage`

El acceso se guarda en memoria en un modulo auxiliar (`src/utils/auth.ts`), mientras que el refresh token viaja en cookie `httpOnly`. La razon no es estatica: es una decision de seguridad. El access token se usa en cada request autenticada, pero no persiste en el navegador; el refresh vive en una cookie no accesible desde JavaScript, lo que reduce exposicion ante XSS. El interceptor de Axios (`src/lib/axios.ts`) detecta `401`, llama a `/auth/refresh-token` y reintenta la request original con el nuevo access token.

### 2) Idempotencia en creacion de tareas

Las mutaciones criticas usan `Idempotency-Key`. En el cliente, el interceptor agrega una UUID para requests mutantes; en la creacion de tareas, ademas, el modal de nueva tarea genera una clave y la reutiliza durante la operacion (`src/components/tasks/AddTaskModal.tsx`, `src/services/taskServices.ts`). Esto evita duplicados cuando el usuario hace doble click, el backend responde lento o la red retraza la operacion. Es una decision de UX y de integridad de datos, no solo de convencion.

### 3) Cookies cross-domain en produccion

El frontend y el backend se publican en dominios distintos en Render. Eso rompe el modelo de cookies de sesion si no se controla el origen. La solucion fue mantener `withCredentials: true` en Axios y configurar el frontend con un proxy de rewrites para que `/api/*` llegue al backend bajo el mismo dominio visible del navegador. Asi se preserva la cookie de refresh y el flujo de autenticacion no se rompe en entorno productivo.

### 4) Cuentas demo efimeras

El boton �Ver demo� dispara una creacion de cuenta temporal con datos precargados. La idea es permitir evaluar el producto sin registrar un usuario real ni cargar un dataset manual. La cuenta demo se crea y limpia automoticamente en el backend, reduciendo friccion para demo, evaluacion y pruebas de producto.

## Como correr el proyecto localmente

### Requisitos

- Node.js 20+
- npm
- Backend de TreeWork corriendo localmente

### 1) Clonar y entrar al proyecto

```bash
git clone <url-del-repo>
cd TreeWork/frontend
```

### 2) Instalar dependencias

```bash
npm install
```

### 3) Configurar variables de entorno

Crea un archivo `.env.local` en la raiz de `frontend`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=tu-google-client-id
VITE_CLOUDINARY_CLOUD_NAME=tu-cloud-name
```

Notas:
- `VITE_API_URL` debe apuntar al backend API del proyecto.
- `VITE_GOOGLE_CLIENT_ID` es necesario si se quiere usar OAuth de Google.
- `VITE_CLOUDINARY_CLOUD_NAME` se usa en flujos de carga de imagenes/adjuntos segun la implementacion del backend y del frontend.

### 4) Levantar el frontend

```bash
npm run dev
```

Abrir la URL mostrada por Vite, normalmente `http://localhost:5173`.

### 5) Build de produccion

```bash
npm run build
```

### 6) Ejecutar servidor de preview

```bash
npm run preview
```

## Testing

El proyecto usa `Vitest` + `React Testing Library` para validar servicios, hooks y componentes clave.

```bash
npm run test -- --run
```

Tambien se puede usar el modo interactivo:

```bash
npm run test
```

## Estructura de carpetas

```text
frontend/
+-- src/
�   +-- components/        # UI reutilizable: cards, forms, modales, la demo tour
�   +-- hooks/             # queries, mutations y hooks de dominio
�   +-- layout/            # AppLayout, AuthLayout, ProfileLayout
�   +-- lib/               # axios, http helpers, socket client, parsers
�   +-- services/          # Facade HTTP y contratos de API
�   +-- socket/            # Provider y listeners de eventos en tiempo real
�   +-- types/             # tipos TS y schemas Zod
�   +-- utils/             # tokens de auth, helpers y utilidades compartidas
�   +-- views/             # vistas de rutas publicas y privadas
�   +-- constants/         # configuracion y constantes del dominio
�   +-- test/              # helpers y utilidades de test
�   +-- index.css          # tokens de color, dark mode y Tailwind v4
�   +-- main.tsx           # bootstrap de la app
�   +-- router.tsx         # configuracion de rutas con lazy loading y crumbs
�   +-- ...
+-- .env.local             # variables de entorno locales
+-- package.json           # scripts y dependencias del frontend
+-- vite.config.ts         # configuracion de Vite
+-- tsconfig*.json         # configuracion de TypeScript
+-- index.html             # entrada HTML del app
+-- README.md              # documentacion del frontend
+-- public/                # assets estaticos
```

## Demo en vivo

- [Ver demo en vivo](https://tree-work-frontend.onrender.com)
- [Backend del proyecto](../backend)

> Si el backend termina publicado en un repositorio independiente, reemplazar el enlace relativo por la URL del repo real.

## Contacto / autor

Desarrollado por Adrian Rivarola.

Para consultas tecnicas, revision de codigo o colaboracion, contactar desde la cuenta de GitHub/LinkedIn del repositorio principal del proyecto.

---

TreeWork Frontend demuestra un enfoque tecnico serio para un tablero colaborativo: autenticacion robusta, sincronizacion temporal real, validacion fuerte de contratos y una UX de producto que busca reducir friccion sin sacrificar control operacional.
