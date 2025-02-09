'use client'

import { useState } from 'react'
import SiteForm from './SiteForm'
import Link from 'next/link'

interface Color {
  generic_name: string
  description: string
  color_code: string
  rgb_value: string
  hex_value: string
}

interface ColorSectionProps {
  interiorColors: Color[]
  exteriorColors: Color[]
}

function ColorSwatch({ color, onClick }: { color: Color; onClick: () => void }) {
  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div 
        className="w-16 h-16 rounded-full border"
        style={{ backgroundColor: color.hex_value }}
        title={color.description}
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{color.generic_name || color.description}</h3>
        <p className="text-sm text-gray-500">{color.color_code}</p>
        <p className="text-xs text-gray-400">{color.hex_value}</p>
      </div>
    </div>
  )
}

function ColorDetails({ color, onClose }: { color: Color; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{color.description}</h2>
        <div className="mb-4">
          <div 
            className="w-full h-32 rounded-lg border mb-2"
            style={{ backgroundColor: color.hex_value }}
          />
          <p className="text-sm text-gray-600">Generic Name: {color.generic_name}</p>
          <p className="text-sm text-gray-600">Color Code: {color.color_code}</p>
          <p className="text-sm text-gray-600">RGB Value: {color.rgb_value}</p>
          <p className="text-sm text-gray-600">HEX Value: {color.hex_value}</p>
        </div>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

function ColorList({ colors, title, searchTerm, onColorClick }: { colors: Color[]; title: string; searchTerm: string; onColorClick: (color: Color) => void }) {
  const filteredColors = colors.filter(color => 
    color.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    color.generic_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    color.color_code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {filteredColors.map((color) => (
          <ColorSwatch key={color.color_code} color={color} onClick={() => onColorClick(color)} />
        ))}
      </div>
      {filteredColors.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No colors found matching your search.</p>
      )}
    </div>
  )
}

export function ColorSection({ interiorColors, exteriorColors }: ColorSectionProps) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [exteriorSearchTerm, setExteriorSearchTerm] = useState('')
  const [interiorSearchTerm, setInteriorSearchTerm] = useState('')

  return (
    <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4 ">
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-2">Vehicle Colors</h2>
        <p className="text-gray-600 mb-6">Explore our range of exterior and interior color options</p>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Exterior Colors</h2>
          <input
            type="text"
            placeholder="Search exterior colors..."
            className="w-full p-2 border rounded-lg mb-4"
            value={exteriorSearchTerm}
            onChange={(e) => setExteriorSearchTerm(e.target.value)}
          />
          <ColorList
            colors={exteriorColors}
            title="Exterior Colors"
            searchTerm={exteriorSearchTerm}
            onColorClick={setSelectedColor}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Interior Colors</h2>
          <input
            type="text"
            placeholder="Search interior colors..."
            className="w-full p-2 border rounded-lg mb-4"
            value={interiorSearchTerm}
            onChange={(e) => setInteriorSearchTerm(e.target.value)}
          />
          <ColorList
            colors={interiorColors}
            title="Interior Colors"
            searchTerm={interiorSearchTerm}
            onColorClick={setSelectedColor}
          />
        </div>

        <div className="mt-12 border p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Get Comprehensive Vehicle History</h2>
          <p className="text-gray-700 mb-4">
            While exploring vehicle colors is exciting, there&apos;s much more to learn about a car&apos;s history. 
            Our VIN decoder provides detailed information including:
          </p>
          <ul className="list-disc list-inside mb-6 text-gray-700">
            <li>Complete vehicle history</li>
            <li>Theft records</li>
            <li>Auction history</li>
            <li>Accurate mileage data</li>
            <li>MSRP and current market value</li>
            <li>Outstanding recalls</li>
            <li>Previous accidents and damage reports</li>
          </ul>
          <p className="text-gray-700 mb-6">
            To access this wealth of information, simply enter the Vehicle Identification Number (VIN) below:
          </p>
          <SiteForm reportType="VHR" />
          <p className="mt-4 text-sm text-gray-600">
            Don&apos;t have the VIN? <Link href="/vin-decoder" className="text-blue-500 hover:underline">Learn how to find your VIN</Link>
          </p>
        </div>
      </div>

      {selectedColor && (
        <ColorDetails color={selectedColor} onClose={() => setSelectedColor(null)} />
      )}
    </div>
  )
}