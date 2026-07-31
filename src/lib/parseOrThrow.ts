import { ZodType } from 'zod'

export function parseOrThrow<T>(schema: ZodType<T>, data: unknown, context: string): T {
  const response = schema.safeParse(data)  
  if (!response.success) {
    console.error(`Zod validation error en ${context}:`, response.error.issues)
    throw new Error(`Los datos de "${context}" no tienen el formato esperado.`)
  }
  return response.data
}