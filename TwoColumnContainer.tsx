import React from 'react'

interface TwoColumnContainerProps {
  children: React.ReactNode
  className?: string
  forceOneColumn?: boolean
}

export default function TwoColumnContainer({ 
  children, 
  className = '', 
  forceOneColumn = false 
}: TwoColumnContainerProps) {
  return (
    <div className={`w-full py-12 bg-white ${className}`}>
      <div className={`max-w-7xl mx-auto ${forceOneColumn ? '' : 'flex flex-col lg:flex-row'} gap-8`}>
        {React.Children.map(children, (child, index) => (
          <div className={`w-full ${
            forceOneColumn 
              ? '' 
              : index === 0 
                ? 'lg:w-3/4' 
                : 'hidden lg:block lg:w-1/4'
          }`}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}