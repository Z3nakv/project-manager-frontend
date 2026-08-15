# TreeWork Frontend

TreeWork es el frontend de una plataforma de gesti�n de proyectos tipo Kanban para equipos que necesitan planificar trabajo, mover tareas entre estados y colaborar en tiempo real sin fricci�n. La interfaz combina una met�fora visual de carpetas/archivos con un tablero funcional, autenticaci�n segura y un sistema de demo live para evaluar el producto sin crear una cuenta real.

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

## Caracter�sticas

- Autenticaci�n con JWT en memoria y refresh token en cookie `httpOnly`, con reintento autom�tico en `401` mediante interceptor de Axios.
- Login nativo con email/password y Google OAuth, con flujo de confirmaci�n y recuperaci�n de contrase�a.
- Tablero Kanban con columnas tipo carpeta y tareas tipo archivo (`dog-ear`), con tipograf�a monoespaciada para metadata t�cnica.
- DnD real usando `@dnd-kit/react` para mover tareas entre estados sin romper la l�gica de negocio ni el estado del servidor.
- Demostraci�n sin registro con usuario ef�mero y datos precargados.
- Idempotencia en mutaciones cr�ticas: las tareas creadas llevan `Idempotency-Key`, lo que elimina duplicados por doble click o reintentos de red.
- Tiempo real con Socket.io para notificaciones, cambios de proyecto, tareas y sincronizaci�n colaborativa.
- Breadcrumbs din�micos generados desde `handle.crumb` y `useMatches()` de React Router para mantener contextos claros dentro del flujo del producto.
- Soporte de Light/Dark Mode con variables CSS y tokens sem�nticos definidos en `src/index.css`.
- Carga diferida por ruta con `lazy()` y skeletons espec�ficos para evitar parpadeos de UI y mantener una experiencia estable.

## Stack t�cnico

| Categor�a | Tecnolog�a | Uso en el proyecto |
| --- | --- | --- |
| Core | React 19 | UI principal del frontend |
| Core | TypeScript | Tipado fuerte del dominio y validaciones |
| Core | Vite 8 | Bundling, dev server y build |
| Core | Tailwind CSS v4 | Sistema visual y tokens sem�nticos |
| Estado / Datos | TanStack Query | Cache, queries, invalidaci�n y sincronizaci�n de servidor |
| Ruteo | React Router v7 | Routing protegido, lazy routes, breadcrumbs |
| Formularios | React Hook Form + Zod | Formularios y validaci�n de inputs |
| HTTP | Axios | Cliente HTTP con interceptores y refresh autom�tico |
| Realtime | Socket.io-client | Notificaciones y sincronizaci�n colaborativa |
| UI | Headless UI | Accesibilidad y componentes base |
| UI | `@dnd-kit/react` | Drag and drop del tablero |
| UI / UX | `react-icons`, `react-toastify` | Iconograf�a, toasts y onboarding |
| Markdown | `react-markdown` | Render de contenido markdown |
| Auth | `@react-oauth/google` | Login con Google |
| Testing | Vitest + React Testing Library + jsdom | Test de servicios, hooks y componentes |
| Deploy | Render (Static Site + rewrite proxy) | Publicaci�n del frontend y proxy hacia el backend |

## Decisiones t�cnicas destacadas

### 1) Refresh token en cookie `httpOnly` en lugar de `localStorage`

El acceso se guarda en memoria en un m�dulo auxiliar (`src/utils/auth.ts`), mientras que el refresh token viaja en cookie `httpOnly`. La raz�n no es est�tica: es una decisi�n de seguridad. El access token se usa en cada request autenticada, pero no persiste en el navegador; el refresh vive en una cookie no accesible desde JavaScript, lo que reduce exposici�n ante XSS. El interceptor de Axios (`src/lib/axios.ts`) detecta `401`, llama a `/auth/refresh-token` y reintenta la request original con el nuevo access token.

### 2) Idempotencia en creaci�n de tareas

Las mutaciones cr�ticas usan `Idempotency-Key`. En el cliente, el interceptor agrega una UUID para requests mutantes; en la creaci�n de tareas, adem�s, el modal de nueva tarea genera una clave y la reutiliza durante la operaci�n (`src/components/tasks/AddTaskModal.tsx`, `src/services/taskServices.ts`). Esto evita duplicados cuando el usuario hace doble click, el backend responde lento o la red retraza la operaci�n. Es una decisi�n de UX y de integridad de datos, no solo de convenci�n.

### 3) Cookies cross-domain en producci�n

El frontend y el backend se publican en dominios distintos en Render. Eso rompe el modelo de cookies de sesi�n si no se controla el origen. La soluci�n fue mantener `withCredentials: true` en Axios y configurar el frontend con un proxy de rewrites para que `/api/*` llegue al backend bajo el mismo dominio visible del navegador. As� se preserva la cookie de refresh y el flujo de autenticaci�n no se rompe en entorno productivo.

### 4) Cuentas demo ef�meras

El bot�n �Ver demo� dispara una creaci�n de cuenta temporal con datos precargados. La idea es permitir evaluar el producto sin registrar un usuario real ni cargar un dataset manual. La cuenta demo se crea y limpia autom�ticamente en el backend, reduciendo fricci�n para demo, evaluaci�n y pruebas de producto.

## C�mo correr el proyecto localmente

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

Crea un archivo `.env.local` en la ra�z de `frontend`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=tu-google-client-id
VITE_CLOUDINARY_CLOUD_NAME=tu-cloud-name
```

Notas:
- `VITE_API_URL` debe apuntar al backend API del proyecto.
- `VITE_GOOGLE_CLIENT_ID` es necesario si se quiere usar OAuth de Google.
- `VITE_CLOUDINARY_CLOUD_NAME` se usa en flujos de carga de im�genes/adjuntos seg�n la implementaci�n del backend y del frontend.

### 4) Levantar el frontend

```bash
npm run dev
```

Abrir la URL mostrada por Vite, normalmente `http://localhost:5173`.

### 5) Build de producci�n

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

Tambi�n se puede usar el modo interactivo:

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
�   +-- views/             # vistas de rutas p�blicas y privadas
�   +-- constants/         # configuraci�n y constantes del dominio
�   +-- test/              # helpers y utilidades de test
�   +-- index.css          # tokens de color, dark mode y Tailwind v4
�   +-- main.tsx           # bootstrap de la app
�   +-- router.tsx         # configuraci�n de rutas con lazy loading y crumbs
�   +-- ...
+-- .env.local             # variables de entorno locales
+-- package.json           # scripts y dependencias del frontend
+-- vite.config.ts         # configuraci�n de Vite
+-- tsconfig*.json         # configuraci�n de TypeScript
+-- index.html             # entrada HTML del app
+-- README.md              # documentaci�n del frontend
+-- public/                # assets est�ticos
```

## Demo en vivo

- [Ver demo en vivo](https://tree-work-frontend.onrender.com)
- [Backend del proyecto](../backend)

> Si el backend termina publicado en un repositorio independiente, reemplazar el enlace relativo por la URL del repo real.

## Contacto / autor

Desarrollado por Adri�n Rivera.

Para consultas t�cnicas, revisi�n de c�digo o colaboraci�n, contactar desde la cuenta de GitHub/LinkedIn del repositorio principal del proyecto.

---

TreeWork Frontend demuestra un enfoque t�cnico serio para un tablero colaborativo: autenticaci�n robusta, sincronizaci�n temporal real, validaci�n fuerte de contratos y una UX de producto que busca reducir fricci�n sin sacrificar control operacional.
