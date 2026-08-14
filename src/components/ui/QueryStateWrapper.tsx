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
      <div className="flex flex-col items-center gap-3 rounded-lg border border-error/40 bg-error-subtle px-6 py-10 text-center">
        <FiAlertTriangle className="h-8 w-8 text-error" strokeWidth={1.5} />
        <p className="text-sm text-error">{getErrorMessage(error)}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-error-subtle px-3 py-1.5 text-xs font-medium text-error ring-1 ring-error/30 hover:bg-error hover:text-text-on-primary"
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
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-surface-hover px-6 py-10 text-center">
        <FiInbox className="h-8 w-8 text-text-muted" strokeWidth={1.5} />
        <p className="text-sm text-text-secondary">{emptyMessage}</p>
      </div>
    )
  }

  return <>{children}</>
}

function DefaultSkeleton() {
  return (
    <div className="space-y-2" role="status" aria-live="polite">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-14 rounded-lg bg-bg-alt animate-pulse" />
      ))}
    </div>
  )
}