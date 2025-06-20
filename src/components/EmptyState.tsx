import Link from 'next/link'

interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  actionText?: string
  actionHref?: string
  onAction?: () => void
}

export default function EmptyState({ 
  icon = "🤔", 
  title, 
  description, 
  actionText, 
  actionHref,
  onAction 
}: EmptyStateProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-100">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
      {(actionText && (actionHref || onAction)) && (
        <>
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200"
            >
              {actionText}
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200"
            >
              {actionText}
            </button>
          )}
        </>
      )}
    </div>
  )
}
