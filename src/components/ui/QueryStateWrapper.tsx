import { type ReactNode } from 'react'
import { FiAlertTriangle, FiRefreshCw, FiInbox } from 'react-icons/fi'

type QueryStateWrapperProps = {
  isLoading: boolean
  isError: boolean
  error?: unknown
  isEmpty?: boolean
  emptyMessage?: string
  skeleton?: ReactNode
  onRetry?: () => void
  children: ReactNode
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return 'Ocurrió un error inesperado. Intenta de nuevo.'
}

export function QueryStateWrapper({
  isLoading,
  isError,
  error,
  isEmpty = false,
  emptyMessage = 'No hay elementos todavía.',
  skeleton,
  onRetry,
  children,
}: QueryStateWrapperProps) {
  if (isLoading) {
    return skeleton ?? <DefaultSkeleton />
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-rose-900/40 bg-rose-950/20 px-6 py-10 text-center">
        <FiAlertTriangle className="h-8 w-8 text-rose-400" strokeWidth={1.5} />
        <p className="text-sm text-rose-200">{getErrorMessage(error)}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 ring-1 ring-rose-500/30 hover:bg-rose-500/20"
          >
            <FiRefreshCw className="h-3.5 w-3.5" />
            Reintentar
          </button>
        )}
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/40 px-6 py-10 text-center">
        <FiInbox className="h-8 w-8 text-slate-500" strokeWidth={1.5} />
        <p className="text-sm text-slate-400">{emptyMessage}</p>
      </div>
    )
  }

  return <>{children}</>
}

function DefaultSkeleton() {
  return (
    <div className="space-y-2" role="status" aria-live="polite">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-14 rounded-lg bg-slate-800/60 animate-pulse" />
      ))}
    </div>
  )
}