'use client'

import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import YMMValueChartWithMSRP from './YMMValueChartWithMSRP'

interface SpecItem {
  title: string
  value: string
}

interface TrimData {
  [key: string]: {
    section: string
    items: SpecItem[]
  }
}

interface VehicleData {
  title: string
  trims: string[]
  data: { [key: string]: TrimData[] }[]
}

export default function ClassicYmmSpecs() {
  const [slug, setSlug] = useState<string | null>(null)
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null)
  const [selectedTrim, setSelectedTrim] = useState('')
  const [trimData, setTrimData] = useState<TrimData[]>([])
  const [activeSection, setActiveSection] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    function getSlugFromUrl() {
      const url = window.location.href;
      const path = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/, '');
      const segments = path.split('/').filter(segment => segment.length > 0);
      return segments[segments.length - 1] || null;
    }

    const currentSlug = getSlugFromUrl()
    setSlug(currentSlug)
    console.log("Current slug:", currentSlug);
  }, [])

  useEffect(() => {
    async function loadData() {
      if (!slug) {
        setError('No slug provided')
        setIsLoading(false)
        return
      }

      try {
        console.log('Attempting to load data for slug:', slug)
        const response = await fetch(`/classicYmmt/${slug}.json`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log('Data loaded successfully:', data)
        setVehicleData(data)
        setSelectedTrim(data.trims[0])
        setError(null)
      } catch (error) {
        console.error('Failed to load data:', error)
        setError(`Failed to load data for ${slug}`)
        setVehicleData(null)
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      setIsLoading(true)
      loadData()
    }
  }, [slug])

  useEffect(() => {
    if (vehicleData && selectedTrim) {
      console.log('Updating trim data for:', selectedTrim)
      const selectedTrimData = vehicleData.data.find(item => item[selectedTrim])?.[selectedTrim] || []
      setTrimData(selectedTrimData)
      
      const filteredSections = selectedTrimData.filter(sectionData => {
        const sectionKey = Object.keys(sectionData)[0].toLowerCase();
        return sectionKey !== 'msrp' && sectionKey !== 'market_value';
      });
      
      if (!activeSection || !filteredSections.some(section => section[Object.keys(section)[0]].section === activeSection)) {
        const newActiveSection = filteredSections[2]?.[Object.keys(filteredSections[2])[0]]?.section || ''
        console.log('Setting new active section:', newActiveSection)
        setActiveSection(newActiveSection)
      }
    }
  }, [selectedTrim, vehicleData, activeSection]);

  const getChartData = (trimData: TrimData[]) => {
    const marketValueData = trimData.find(item => item.market_value)?.market_value.items || []
    return marketValueData.map(item => ({
      condition: item.title,
      price: parseInt(item.value.replace(/[$,]/g, ''))
    })).sort((a, b) => b.price - a.price)
  }

  const getMSRP = (trimData: TrimData[]) => {
    const msrpData = trimData.find(item => item.msrp)?.msrp.items[0] || { title: "MSRP", value: "N/A" }
    return { title: msrpData.title, value: msrpData.value }
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>
  }

  return (
    <div className="bg-white min-h-screen px-4">
      <div className="relative mb-6">
        <span className="text-3xl font-bold py-6 text-gray-800">
          {isLoading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            vehicleData?.title
          )}
        </span>
      </div>

      <div className="mb-6">
        {isLoading ? (
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <Select value={selectedTrim} onValueChange={setSelectedTrim}>
            <SelectTrigger className="w-full h-12 text-lg">
              <SelectValue placeholder="Select a trim" />
            </SelectTrigger>
            <SelectContent>
              {vehicleData?.trims.map((trim) => (
                <SelectItem key={trim} value={trim}>
                  {trim}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {vehicleData && trimData.length > 0 && (
        <div className="mb-6">
          <YMMValueChartWithMSRP
            chartData={getChartData(trimData)}
            msrp={getMSRP(trimData)}
          />
        </div>
      )}
      
      <div className="flex">
        <div className="w-1/3 p-6 sticky top-0 h-screen overflow-y-auto border-r">
          <nav>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              ))
            ) : (
              trimData
                .filter(sectionData => {
                  const sectionKey = Object.keys(sectionData)[0].toLowerCase();
                  return sectionKey !== 'msrp' && sectionKey !== 'market_value';
                })
                .map((sectionData, index) => {
                  const sectionKey = Object.keys(sectionData)[0]
                  const sectionValue = sectionData[sectionKey]
                  return (
                    <button
                      key={index}
                      className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-md mb-2 ${activeSection === sectionValue.section ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-blue-50/50'}`}
                      onClick={() => setActiveSection(sectionValue.section)}
                    >
                      {sectionValue.section}
                    </button>
                  )
                })
            )}
          </nav>
        </div>

        <div className="w-2/3 p-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="rounded-lg shadow-sm border p-6">
                  {Array.from({ length: 5 }).map((_, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            trimData
              .filter(sectionData => {
                const sectionKey = Object.keys(sectionData)[0].toLowerCase();
                return sectionKey !== 'msrp' && sectionKey !== 'market_value';
              })
              .map((sectionData, index) => {
                const sectionKey = Object.keys(sectionData)[0]
                const sectionValue = sectionData[sectionKey]
                return (
                  <div key={index} id={sectionValue.section} className={`mb-8 ${activeSection === sectionValue.section ? 'block' : 'hidden'}`}>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">{sectionValue.section}</h3>
                    <div className="rounded-lg shadow-sm border p-6">
                      {sectionValue.items.map((item: SpecItem, itemIndex: number) => (
                        <div key={itemIndex} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                          <span className="font-medium text-gray-600">{item.title}:</span>
                          <span className="text-gray-800">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
          )}
        </div>
      </div>
    </div>
  )
}