'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import { Eye, Home, Camera, Hammer, Wrench, AlertTriangle } from 'lucide-react'

interface Tab {
  id: string;
  tab: string;
  title: string;
  content: string;
  icon: React.ReactNode;
  image: string;
  alt: string;
}

const tabs: Tab[] = [
  { id: 'odometer', tab:' Odometer Reading',title: 'Verify odometer records and mileage history', content: 'Get accurate odometer readings and uncover essential vehicle history with ChassisVIN free VIN check. Our easy-to-use VIN lookup provides precise data on mileage, previous ownership, and more, helping you verify a vehicle condition and value with confidence. Enjoy a fast, reliable way to understand any car full chassis history.', icon: <Eye />, image: '/OdometerReading.webp', alt: 'Odometer Reading Visualization' },
  { id: 'ownership', tab: 'Ownership History',title: 'Verify mileage and ownership history', content: 'Discover detailed ownership history quickly with ChassisVIN free VIN check tool. Our VIN lookup service gives you easy access to past ownership records, helping you understand a vehicle full background before you buy. Check today for an informed, transparent view of any vehicle journey from one owner to the next.', icon: <Home />, image: '/Ownership.webp', alt: 'Ownership History Visualization' },
  { id: 'photos', tab: 'Auction Photo',title: 'Exclusive auction photos and historical data', content: 'Access auction photos effortlessly with ChassisVin free VIN check tool, offering you a clear visual history of any vehicle. Our VIN lookup service provides detailed auction images, giving you valuable insights into a car past condition and helping you make informed purchasing choices. See what lies beneath the surface today.', icon: <Camera />, image: '/AuctionSales.webp', alt: 'Auction Sales Photos' },
  { id: 'accidents', tab: 'Accidents Check',title: 'Check for accidents, repairs, and recalls', content: 'Ensure peace of mind with ChassisVIN free VIN check service, providing thorough damage checks for any vehicle. Our VIN lookup tool offers detailed insights into past incidents, helping you uncover potential issues before making a purchase. Start your search today to make confident decisions backed by accurate damage history information.', icon: <Hammer />, image: '/AccidentDamageHistory.webp', alt: 'Accident and Damage History Visualization' },
  { id: 'technical', tab: 'Technical Data',title: 'Access Detailed Specification Data with a Free VIN Lookup for Every Vehicle', content: 'Unlock comprehensive specification data effortlessly with ChassisVIN free VIN check service. Our VIN lookup tool provides essential information about any vehicle features, engine type, and performance metrics, ensuring you have all the details needed to make an informed choice. Discover accurate specifications today and drive with confidence!', icon: <Wrench />, image: '/Spec.webp', alt: 'Vehicle Technical Specifications' },
  { id: 'stolen', tab: 'Stolen VIN Check',title: 'Quickly Check if a Vehicle is Stolen with Our Free VIN Lookup for Your Peace of Mind', content: 'Stay safe and informed with ChassisVIN free VIN check service, which includes an easy stolen VIN check for any vehicle. Our VIN lookup tool helps you find out if a vehicle has been reported stolen, giving you the reassurance you need before buying. Start your check now for worry-free shopping!', icon: <AlertTriangle />, image: '/TheftRecords.webp', alt: 'Theft Records Visualization' },
]

const CarHistorySlider: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const startProgress = () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setProgress((prevProgress) => {
            if (prevProgress >= 100) {
              setActiveTab((prevTab) => (prevTab + 1) % tabs.length)
              return 0
            }
            return prevProgress + 0.5
          })
        }
      }, 50)
    }

    startProgress()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [activeTab, isPaused])

  const handleTabClick = (index: number) => {
    setActiveTab(index)
    setProgress(0)
  }

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <section className='bg-blue-50'>
      <div className="max-w-6xl mx-auto px-4 py-12" ref={containerRef}>
        <h2 className="text-3xl font-bold mb-4">Always Check the History of a Car Before Buying It</h2>
        <p className="text-gray-600 mb-6">Uncover comprehensive insights with an ChassisVIN Vehicle History Report</p>
        
        <nav className="overflow-x-auto" aria-label="Car history sections">
          <div className={`flex ${isMobile ? 'flex-wrap gap-2' : 'space-x-4'} pb-2 relative`}>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`px-3 py-2 text-sm md:text-base font-medium transition-colors duration-200 whitespace-nowrap
                  ${isMobile ? 'rounded-full border ' : ''}
                  ${index === activeTab
                    ? isMobile ? 'bg-blue-500 text-white' : 'text-blue-500 border-b-2 border-blue-500'
                    : isMobile ? 'border-gray-300 text-gray-500' : 'text-gray-500 hover:text-gray-700'
                  }`}
                onClick={() => handleTabClick(index)}
                aria-selected={index === activeTab}
                role="tab"
              >
                {tab.tab}
              </button>
            ))}
          </div>
        </nav>
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mt-3 mb-4">
              <div
                className="h-full bg-blue-500 transition-all duration-50"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mb-4">
          <div className="md:w-1/2">
            <Image
              src={tabs[activeTab].image}
              alt={tabs[activeTab].alt}
              width={400}
              height={300}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
            <div className="pt-4">
              <div className="mb-4 inline-flex p-3 bg-white rounded-full shadow-md" aria-hidden="true">
                {React.cloneElement(tabs[activeTab].icon as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{tabs[activeTab].title}</h3>
              <p className="mb-6">{tabs[activeTab].content}</p>
              <CustomButton href='/vin-decoder' text='Check Your Car'/>
            </div>
          </div>
        </div>
        
        {/* Hidden section for SEO */}
        <div className="sr-only">
          {tabs.map((tab, index) => (
            index !== activeTab && (
              <div key={tab.id}>
                <h3>{tab.title}</h3>
                <p>{tab.content}</p>
              </div>
            )
          ))}
        </div>
        
        {/* New blue rectangular element with mobile responsiveness */}
        <div className="mt-8 p-4 sm:p-6 border-2 border-blue-500 rounded-lg bg-blue-50/25">
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-shrink-0">
              <Image
                src="/nmvtis.png"
                alt="NMVTIS Logo"
                width={75}
                height={75}
                className="rounded-full"
              />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2 sm:mb-3">Official NMVTIS Source</h4>
              <p className="text-sm sm:text-base text-gray-700">
                ChassisVIN is an approved NMVTIS data provider. NMVTIS is a national database designed to protect consumers from fraud and unsafe vehicles, to prevent stolen vehicles from being resold, and to provide users with accurate and complete vehicle information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarHistorySlider