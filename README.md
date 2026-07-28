# Trello Clone — Frontend
Aplicación React para la gestión de proyectos con tablero Kanban. Proporciona autenticación con JWT y Google OAuth, drag-and-drop de tareas entre estados, asignación de miembros, etiquetas personalizables, notas por tarea, subida de imágenes a Cloudinary, notificaciones en tiempo real vía WebSocket y sugerencias de tareas generadas con Gemini AI.
## Stack tecnológico
| Categoría               | Tecnología                              | Versión      |
| ----------------------- | --------------------------------------- | ------------ |
| Framework UI            | React                                   | ^19.2.6      |
| Lenguaje                | TypeScript                              | ~6.0.2       |
| Bundler / Dev server    | Vite                                    | ^8.0.12      |
| Estilos                 | Tailwind CSS                            | ^4.3.0       |
| Ruteo                   | react-router                            | ^7.15.1      |
| Estado servidor / cache | TanStack Query                          | ^5.100.14    |
| Formularios             | React Hook Form                         | ^7.76.1      |
| Validación              | Zod                                     | ^4.4.3       |
| Drag & Drop             | @dnd-kit/react                          | ^0.4.0       |
| WebSocket (cliente)     | socket.io-client                        | ^4.8.3       |
| HTTP client             | Axios                                   | ^1.16.1      |
| Testing                 | Vitest + Testing Library + jsdom        | ^4.1.10      |
| Google OAuth (UI)       | @react-oauth/google                     | ^0.13.5      |
| UI / iconos             | Headless UI ^2.2.10, react-icons ^5.7.0 | —            |
| Notificaciones          | react-toastify                          | ^11.1.0      |
| Markdown                | react-markdown                          | ^10.1.0      |
| Herramientas de build   | @vitejs/plugin-react, @tailwindcss/vite | —            |
| Análisis de bundle      | rollup-plugin-visualizer                | ^6.0.11      |
**Versión de TypeScript estricta** (tsconfig.app.json): `target: es2023`, `moduleResolution: bundler`, `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`.
## Arquitectura del proyecto
## Arquitectura del proyecto

```text
src/
├── components/
│   ├── ui/               # Componentes base reutilizables
│   ├── tasks/
│   ├── projects/
│   ├── team/
│   ├── notes/
│   ├── attachments/
│   ├── auth/
│   ├── dashboard/
│   └── profile/
│
├── hooks/
│   ├── queries/
│   ├── mutations/
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   ├── useIsMobile.ts
│   ├── useForbidden.ts
│   └── ...
│
├── services/
├── views/
│   ├── auth/
│   └── profile/
│
├── layout/
├── socket/
│   ├── listeners/
│   ├── SocketProvider.tsx
│   └── events.ts
│
├── lib/
├── types/
├── constants/
├── utils/
├── test/
├── router.tsx
├── main.tsx
└── index.css
```
### Responsabilidad de cada capa
| Carpeta         | Responsabilidad                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| `views/`        | Páginas completas. Componen layouts, hooks y componentes. Sin lógica HTTP.      |
| `hooks/`        | Encapsulan TanStack Query (queries + mutations) y hooks utilitarios.            |
| `services/`     | Llamadas HTTP. Cada función llama a `httpGet/httpPost/...` y valida con Zod.    |
| `components/`   | UI reutilizable. Sin acceso directo a servicios ni TanStack Query.              |
| `lib/`          | Infraestructura: cliente Axios con interceptores, helpers HTTP, queryClient.    |
| `types/`        | Schemas Zod y tipos inferidos. Fuente única de verdad para tipos.               |
| `socket/`       | Proveedor React + listeners por dominio. Cleanup automático en unmount.         |
## Flujo de datos
View (página)
  │ Usa hooks de queries/mutations
  ▼
Hook (useProjectMutations, useTaskQueries, etc.)
  │ Llama a servicios
  ▼
Service (ProjectService, taskService, etc.)
  │ Usa httpGet / httpPost / etc. + parseOrThrow con Zod
  ▼
API (backend Express)
**Regla:** Las views nunca llaman servicios HTTP directamente. La lógica de fetching, mutación, cacheo e invalidación vive exclusivamente en los hooks de TanStack Query (carpetas `hooks/queries/` y `hooks/mutations/`).
## Gestión de estado
| Estado                     | Responsabilidad                             | Herramienta      |
| -------------------------- | ------------------------------------------- | ---------------- |
| Datos del servidor         | Proyectos, tareas, notas, notificaciones…   | TanStack Query   |
| Sesión de usuario          | Quién es el usuario autenticado             | TanStack Query   |
| Estado global del cliente  | — No existe en este proyecto —              | —                |
| Estado local de UI         | Modales abiertos/cerrados, formularios      | React state / React Hook Form |
No se utiliza Zustand, Redux ni ningún store global. TanStack Query cubre todo el estado asíncrono. Los modales y formularios usan estado local en el componente o hooks livianos (`useShowModal`).
## Routing

Definido en `src/router.tsx` mediante `createBrowserRouter` de `react-router`.

```text
/
└── LandingView (pública)

layout/
├── DashboardView
├── Projects
│   ├── :projectId
│   │   └── ProjectDetailsView (lazy + skeleton)
│   ├── create-project
│   │   └── CreateProjectView (lazy)
│   ├── :projectId/edit
│   │   └── EditProjectView (lazy + skeleton)
│   └── :projectId/team
│       └── ProjectTeamView (lazy + skeleton)
│
├── ProfileLayout
│   ├── profile
│   │   └── ProfileView (lazy)
│   └── profile/password
│       └── ChangePasswordView (lazy)
│
└── AuthLayout
    ├── auth/login
    │   └── LoginWithGoogleProvider (lazy)
    ├── auth/register
    │   └── RegisterView (lazy)
    ├── auth/confirm-account
    │   └── ConfirmAccountView (lazy)
    ├── auth/request-code
    │   └── RequestNewCode (lazy)
    ├── auth/forgot-password
    │   └── ForgotPasswordView (lazy)
    ├── auth/new-password
    │   └── NewPasswordView (lazy)
    └── *
        └── NotFound (lazy)
```
### Patrón de lazy loading
Todas las rutas protegidas y la mayoría de las rutas públicas usan `lazy()` de React + `HydrateFallback` con skeletons específicos (`ProjectDetailsSkeleton`, `EditProjectSkeleton`, `ProjectTeamSkeleton`). Esto permite que el bundle principal sea pequeño y que cada vista se descargue bajo demanda.
### Protección de rutas
`AppLayout` ejecuta `useAuth()` al montarse. Si el usuario no está autenticado, redirige a `/`. El layout público `AuthLayout` no tiene esta protección.
## Tiempo real con Socket.io
### Conexión
El socket se crea en `src/lib/socket.ts` con `socket.io-client`, apuntando a `http://localhost:5000` con `autoConnect: false`.
### Proveedor
`SocketProvider` (`src/socket/SocketProvider.tsx`) se monta dentro de `AppLayout` solo cuando hay un usuario autenticado. En el `useEffect`:
1. Hace `connect()` si no está conectado.
2. Emite `join_user` con el `user._id` para unirse a su sala privada (backend).
3. Registra todos los listeners vía `registerListeners()`.
4. En cleanup: remueve listeners (`socket.off()`), desconecta el socket.
### Eventos manejados
| Evento (server → client)        | Acción                          |
| ------------------------------- | ------------------------------- |
| `static_notification`           | Invalida queryKey `[notifications]` |
| `task_created_notification`     | Toast + invalida `[project, id]` |
| `task_updated_notification`     | Toast + invalida `[project, id]` |
| `task_deleted_notification`     | Toast + invalida `[project, id]` |
| `task_status_updated_notification` | Toast + invalida `[project, id]` y `[notifications]` |
| `assigned_task_notification`    | Toast + invalida ambas queries   |
| `project_updated_notification`  | Toast + invalida `[projects]`    |
| `project_deleted_notification`  | Toast + invalida `[projects]`    |
| `member_added_notification`     | Toast + invalida `[projects]`    |
| `member_removed_notification`   | Toast + invalida `[projects]`    |
| `note_added`                    | Toast + invalida ambas queries   |
| `note_deleted`                  | Toast + invalida ambas queries   |
### Listeners (client → server)
Las mutaciones emiten eventos como `"project_deleted"`, `"project_updated"`, `"task_status_updated"` después de una operación exitosa, para notificar a otros usuarios conectados.
### Buenas prácticas implementadas
- Cada listener module devuelve una función `cleanup` que llama a `socket.off()` con la referencia exacta del callback, evitando fugas de memoria y listeners duplicados.
- `SocketProvider` se monta/desmonta con el ciclo de vida del layout autenticado.
- Se utiliza `autoConnect: false` + `connect()` explícito para controlar cuándo inicia la conexión.
## Testing
### Configuración
- Framework: **Vitest** integrado en Vite (vite.config.ts).
- Entorno: **jsdom**.
- Setup: `src/test/setup.ts` (importa `@testing-library/jest-dom`).
- Globals habilitados: `describe`, `it`, `expect` disponibles sin import.
### Tests existentes
**27 archivos de test** en `src/`, aproximadamente **141 casos** (`it`/`test`):
| Tipo               | Archivos | Casos aprox. |
| ------------------ | -------- | ------------ |
| Componentes UI     | 2        | 6            |
| Hooks (mutations)  | 8        | 48           |
| Hooks (queries)    | 4 (5)*   | 17           |
| Servicios          | 10       | 58           |
| Utilidades (lib)   | 2        | 12           |
| Vistas             | 1        | 6            |
_* Incluye `useAttachmentQueries.tes.tsx` (nombre con typo en el archivo original)._
### Comandos
```bash
npm run test       # Vitest en modo CLI
npm run test:ui    # Vitest con interfaz gráfica
npm run coverage   # Reporte de cobertura
Variables de entorno
VITE_API_URL=<url_base_del_backend>          # Ej: http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=<google_oauth_client_id>
VITE_CLOUDINARY_CLOUD_NAME=<cloudinary_cloud_name>
Instalación y ejecución
# Instalar dependencias
npm install
# Desarrollo (HMR en http://localhost:5173)
npm run dev
# Build de producción (Rolldown + code-splitting)
npm run build
# Preview del build generado
npm run preview
Output del build
Vite con Rolldown genera chunks separados por vendor mediante codeSplitting.groups:
- vendor-dndkit — @dnd-kit
- vendor-tanstack — @tanstack/react-query
- vendor-ui — @headlessui/react
- vendor-react — react, react-dom, react-router
- vendor — catch-all del resto de node_modules
Además, el build activa el React Compiler (vía @rolldown/plugin-babel con reactCompilerPreset()), que optimiza automáticamente renders y memorización.
Convenciones de código
Convención	Regla
Nombres de componentes	PascalCase
Nombres de hooks	Prefijo use (ej: useAuth, useProjectMutations)
Nombres de servicios	PascalCase para clases/instancias, camelCase para funciones exportadas
Nombres de archivos	camelCase (servicios, hooks), PascalCase (componentes, vistas)
Llamadas HTTP	Solo desde services/, nunca desde componentes o vistas
Tipos	Preferir z.infer sobre interfaces manuales. Repository de tipos en types/
any	Evitar salvo casos justificados y con comentario
TypeScript	Strict mode habilitado. noUnusedLocals y noUnusedParameters activos
CSS	Tailwind utility classes. Sin CSS modules ni archivos .css adicionales
Reutilización	Usar QueryStateWrapper para estados loading/error/empty en lugar de repetirlos
ESLint	Configuración con typescript-eslint y eslint-plugin-react-hooks

Performance
Optimización	Implementación
Lazy loading	React.lazy() + HydrateFallback en cada ruta
Code splitting (rutas)	Cada vista es un chunk separado gracias a lazy() + import()
Vendor chunks (build)	Rolldown codeSplitting.groups separa dnd-kit, TanStack, Headless UI, React
React Compiler	Habilitado vía babel preset reactCompilerPreset() — optimiza renders automáticamente
Bundle analysis	rollup-plugin-visualizer genera stats.html con tamaños gzip y brotli
TanStack Query cache	staleTime: 30s, gcTime: 5min, sin refetch en window focus
Retry inteligente	No reintenta errores 4xx (validación del lado del cliente)
Skeletons	Cada ruta lazy tiene un skeleton específico (ProjectDetailsSkeleton, etc.)