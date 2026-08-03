import { Button } from './Button'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-secondary/50 border border-white/8 flex items-center justify-center mb-6 text-muted">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-tertiary mb-2">{title}</h3>
      {description && <p className="text-sm text-muted max-w-xs mb-6">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
