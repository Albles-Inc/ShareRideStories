interface LoadingProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
}

export default function Loading({ message = "Loading...", size = 'medium' }: LoadingProps) {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin border-4 border-blue-600 border-t-transparent rounded-full ${sizeClasses[size]}`}></div>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  )
}
