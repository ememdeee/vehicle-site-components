'use client'

import { useState } from 'react'
import { ColorSection } from './ColorSection'
import LoadingBar from './LoadingBar'
import Link from 'next/link'
import { Info } from 'lucide-react'

interface Color {
  generic_name: string
  description: string
  color_code: string
  rgb_value: string
  hex_value: string
  color_price: string
  color_invoice: string
  color_type: string
}

interface ColorData {
  interior_colors: Color[]
  exterior_colors: Color[]
}

export default function ColorSiteForm() {
  const [vin, setVin] = useState('')
  const [colorData, setColorData] = useState<ColorData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showVinTooltip, setShowVinTooltip] = useState(false)

  const validateVin = (vin: string): string | null => {
    if (vin.trim() === '') {
      return 'Please enter a VIN.'
    }
    if (vin.length !== 17) {
      return 'Please ensure that your VIN is in proper format. 17 digits.'
    }
    // Additional VIN validation could be added here
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    const validationError = validateVin(vin)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/color-code?vin=${vin}`)
      if (!response.ok) {
        throw new Error('Failed to fetch color data')
      }
      const data = await response.json()
      console.log('API Response:', data)
      setColorData(data)
    } catch (error) {
      console.error('Error:', error)
      setError('Error fetching data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-white md:rounded-full rounded-3xl shadow-lg border-2 border-blue-200 md:p-2 md:flex md:items-center">
          <input
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            placeholder="Enter VIN Number"
            className="w-full px-6 py-4 text-lg rounded-3xl md:rounded-full focus:outline-none"
            maxLength={17}
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full md:w-auto md:absolute md:right-2 md:top-1/2 md:transform md:-translate-y-1/2 bg-blue-500 text-white px-6 py-4 rounded-3xl md:rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-md mt-2 md:mt-0 min-w-[140px] whitespace-nowrap"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Check Colors'}
        </button>
      </form>
      
      {isLoading && <LoadingBar isLoading={isLoading} />}

      <div 
        className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
          error ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-red-500 text-sm">
          {error || '\u00A0'}
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-600 flex flex-wrap items-center">
        <div 
          className="relative inline-block cursor-pointer"
          onMouseEnter={() => setShowVinTooltip(true)}
          onMouseLeave={() => setShowVinTooltip(false)}
        >
          <span className="flex items-center">
            Where to find the VIN? <Info className="ml-1 h-4 w-4" />
          </span>
          {showVinTooltip && (
            <div className="absolute z-10 w-64 p-4 mt-2 bg-white rounded-lg shadow-xl border border-gray-200">
              <h3 className="font-bold mb-2">Looking for the VIN?</h3>
              <p>Here is where you&apos;ll find it:</p>
              <ul className="list-disc list-inside mt-2">
                <li>On the driver&apos;s side dashboard near the windshield</li>
                <li>Inside the driver&apos;s side door near the latch</li>
                <li>On the owner&apos;s insurance card or other docs</li>
              </ul>
            </div>
          )}
        </div>
        <span className="mx-2">•</span>
        <Link href="/vin-decoder" className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
          Get Detailed Vehicle History Report
        </Link>
      </div>

      {colorData && (
        <ColorSection 
          interiorColors={colorData.interior_colors}
          exteriorColors={colorData.exterior_colors}
        />
      )}
    </div>
  )
}