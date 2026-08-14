# TreeWork Frontend

TreeWork es el frontend de una plataforma de gestión de proyectos tipo Kanban para equipos que necesitan planificar trabajo, mover tareas entre estados y colaborar en tiempo real sin fricción. La interfaz combina una metáfora visual de carpetas/archivos con un tablero funcional, autenticación segura y un sistema de demo live para evaluar el producto sin crear una cuenta real.

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

## Características

- Autenticación con JWT en memoria y refresh token en cookie `httpOnly`, con reintento automático en `401` mediante interceptor de Axios.
- Login nativo con email/password y Google OAuth, con flujo de confirmación y recuperación de contraseña.
- Tablero Kanban con columnas tipo carpeta y tareas tipo archivo (`dog-ear`), con tipografía monoespaciada para metadata técnica.
- DnD real usando `@dnd-kit/react` para mover tareas entre estados sin romper la lógica de negocio ni el estado del servidor.
- Demostración sin registro con usuario efímero y datos precargados, además de onboarding guiado con `driver.js` para explicar la UX del tablero.
- Idempotencia en mutaciones críticas: las tareas creadas llevan `Idempotency-Key`, lo que elimina duplicados por doble click o reintentos de red.
- Tiempo real con Socket.io para notificaciones, cambios de proyecto, tareas y sincronización colaborativa.
- Breadcrumbs dinámicos generados desde `handle.crumb` y `useMatches()` de React Router para mantener contextos claros dentro del flujo del producto.
- Soporte de Light/Dark Mode con variables CSS y tokens semánticos definidos en `src/index.css`.
- Carga diferida por ruta con `lazy()` y skeletons específicos para evitar parpadeos de UI y mantener una experiencia estable.

## Stack técnico

| Categoría | Tecnología | Uso en el proyecto |
| --- | --- | --- |
| Core | React 19 | UI principal del frontend |
| Core | TypeScript | Tipado fuerte del dominio y validaciones |
| Core | Vite 8 | Bundling, dev server y build |
| Core | Tailwind CSS v4 | Sistema visual y tokens semánticos |
| Estado / Datos | TanStack Query | Cache, queries, invalidación y sincronización de servidor |
| Ruteo | React Router v7 | Routing protegido, lazy routes, breadcrumbs |
| Formularios | React Hook Form + Zod | Formularios y validación de inputs |
| HTTP | Axios | Cliente HTTP con interceptores y refresh automático |
| Realtime | Socket.io-client | Notificaciones y sincronización colaborativa |
| UI | Headless UI | Accesibilidad y componentes base |
| UI | `@dnd-kit/react` | Drag and drop del tablero |
| UI / UX | `react-icons`, `react-toastify`, `driver.js` | Iconografía, toasts y onboarding |
| Markdown | `react-markdown` | Render de contenido markdown |
| Auth | `@react-oauth/google` | Login con Google |
| Testing | Vitest + React Testing Library + jsdom | Test de servicios, hooks y componentes |
| Deploy | Render (Static Site + rewrite proxy) | Publicación del frontend y proxy hacia el backend |

## Decisiones técnicas destacadas

### 1) Refresh token en cookie `httpOnly` en lugar de `localStorage`

El acceso se guarda en memoria en un módulo auxiliar (`src/utils/auth.ts`), mientras que el refresh token viaja en cookie `httpOnly`. La razón no es estética: es una decisión de seguridad. El access token se usa en cada request autenticada, pero no persiste en el navegador; el refresh vive en una cookie no accesible desde JavaScript, lo que reduce exposición ante XSS. El interceptor de Axios (`src/lib/axios.ts`) detecta `401`, llama a `/auth/refresh-token` y reintenta la request original con el nuevo access token.

### 2) Idempotencia en creación de tareas

Las mutaciones críticas usan `Idempotency-Key`. En el cliente, el interceptor agrega una UUID para requests mutantes; en la creación de tareas, además, el modal de nueva tarea genera una clave y la reutiliza durante la operación (`src/components/tasks/AddTaskModal.tsx`, `src/services/taskServices.ts`). Esto evita duplicados cuando el usuario hace doble click, el backend responde lento o la red retraza la operación. Es una decisión de UX y de integridad de datos, no solo de convención.

### 3) Cookies cross-domain en producción

El frontend y el backend se publican en dominios distintos en Render. Eso rompe el modelo de cookies de sesión si no se controla el origen. La solución fue mantener `withCredentials: true` en Axios y configurar el frontend con un proxy de rewrites para que `/api/*` llegue al backend bajo el mismo dominio visible del navegador. Así se preserva la cookie de refresh y el flujo de autenticación no se rompe en entorno productivo.

### 4) Cuentas demo efímeras

El botón “Ver demo” dispara una creación de cuenta temporal con datos precargados y se guía al usuario con un tour (`driver.js`) para explicar el flujo principal del producto. La idea es permitir evaluar el producto sin registrar un usuario real ni cargar un dataset manual. La cuenta demo se crea y limpia automáticamente en el backend, reduciendo fricción para demo, evaluación y pruebas de producto.

## Cómo correr el proyecto localmente

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

Crea un archivo `.env.local` en la raíz de `frontend`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=tu-google-client-id
VITE_CLOUDINARY_CLOUD_NAME=tu-cloud-name
```

Notas:
- `VITE_API_URL` debe apuntar al backend API del proyecto.
- `VITE_GOOGLE_CLIENT_ID` es necesario si se quiere usar OAuth de Google.
- `VITE_CLOUDINARY_CLOUD_NAME` se usa en flujos de carga de imágenes/adjuntos según la implementación del backend y del frontend.

### 4) Levantar el frontend

```bash
npm run dev
```

Abrir la URL mostrada por Vite, normalmente `http://localhost:5173`.

### 5) Build de producción

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

También se puede usar el modo interactivo:

```bash
npm run test
```

## Estructura de carpetas

```text
frontend/
+-- src/
¦   +-- components/        # UI reutilizable: cards, forms, modales, la demo tour
¦   +-- hooks/             # queries, mutations y hooks de dominio
¦   +-- layout/            # AppLayout, AuthLayout, ProfileLayout
¦   +-- lib/               # axios, http helpers, socket client, parsers
¦   +-- services/          # Facade HTTP y contratos de API
¦   +-- socket/            # Provider y listeners de eventos en tiempo real
¦   +-- types/             # tipos TS y schemas Zod
¦   +-- utils/             # tokens de auth, helpers y utilidades compartidas
¦   +-- views/             # vistas de rutas públicas y privadas
¦   +-- constants/         # configuración y constantes del dominio
¦   +-- test/              # helpers y utilidades de test
¦   +-- index.css          # tokens de color, dark mode y Tailwind v4
¦   +-- main.tsx           # bootstrap de la app
¦   +-- router.tsx         # configuración de rutas con lazy loading y crumbs
¦   +-- ...
+-- .env.local             # variables de entorno locales
+-- package.json           # scripts y dependencias del frontend
+-- vite.config.ts         # configuración de Vite
+-- tsconfig*.json         # configuración de TypeScript
+-- index.html             # entrada HTML del app
+-- README.md              # documentación del frontend
+-- public/                # assets estáticos
```

## Demo en vivo

- [Ver demo en vivo](https://tree-work-frontend.onrender.com)
- [Backend del proyecto](../backend)

> Si el backend termina publicado en un repositorio independiente, reemplazar el enlace relativo por la URL del repo real.

## Contacto / autor

Desarrollado por Adrián Rivera.

Para consultas técnicas, revisión de código o colaboración, contactar desde la cuenta de GitHub/LinkedIn del repositorio principal del proyecto.

---

TreeWork Frontend demuestra un enfoque técnico serio para un tablero colaborativo: autenticación robusta, sincronización temporal real, validación fuerte de contratos y una UX de producto que busca reducir fricción sin sacrificar control operacional.
