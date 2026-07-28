AI Coding Guidelines
Esta sección está dirigida a agentes de IA (Aider, Claude Code, Cursor Copilot, etc.) que modifiquen el código.
1. Analiza patrones existentes antes de escribir. Revisa la estructura de un hook o servicio similar al que vas a modificar o crear. No asumas una convención diferente a la del proyecto.
2. Respeta la separación View → Hook → Service.
   - No hagas fetch/axios directamente en un componente.
   - No pongas lógica de TanStack Query en un service.
   - No definas hooks dentro de componentes.
3. Reutiliza servicios y hooks existentes. Antes de crear un nuevo archivo en services/ o hooks/, verifica si ya existe una función que haga lo que necesitas.
4. Validación con Zod en services. Cada service que recibe datos de la API debe usar parseOrThrow(schema, data, "contextName") para validar la respuesta. Los tipos se infieren del schema con z.infer.
5. Hooks de mutaciones. Siguen el patrón useXMutation que retorna { mutate, isPending } (u otros campos que devuelva useMutation). Invalida queries relacionadas en onSuccess y muestra toast en onError.
6. Hooks de queries. Siguen el patrón useXQuery o useGetXById que retorna { data, isLoading, isError }.
7. No crees abstracciones innecesarias. El proyecto no tiene store global ni capa de servicios intermedia entre hooks y servicios. Mantén esa simplicidad.
8. Escribe tests para lógica nueva. Ubícalos en __tests__/ junto al archivo que testedan. Usa describe/it/expect (globals habilitados).
9. Revisa los tipos existentes antes de modificar interfaces. Los schemas Zod en types/ son la fuente de verdad. Modifica primero el schema y deja que TypeScript propague los cambios.
10. No modifiques configuraciones globales (vite.config.ts, tsconfig.json, main.tsx, router.tsx) sin una justificación explícita en el plan de trabajo.
11. Componentes nuevos deben integrarse con la arquitectura actual. Si agregas un modal, usa el patrón de useShowModal. Si agregas un skeleton, colócalo en components/ui/.