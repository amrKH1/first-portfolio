'use client'

interface PlaceholderImageProps {
  width: number
  height: number
  text?: string
  className?: string
}

const PlaceholderImage = ({ width, height, text = 'Image', className = '' }: PlaceholderImageProps) => {
  return (
    <div 
      className={`bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 font-medium ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="text-center">
        <div className="text-4xl mb-2">📷</div>
        <div className="text-sm">{text}</div>
        <div className="text-xs mt-1">{width}×{height}</div>
      </div>
    </div>
  )
}

export default PlaceholderImage
