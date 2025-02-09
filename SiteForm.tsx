'use client'

import React, { useEffect, useState } from 'react'
import { ChevronDown, Info } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SiteFormProps {
  forceMobileLayout?: boolean
  reportType?: 'VHR' | 'WS'
}

const SiteForm: React.FC<SiteFormProps> = ({ forceMobileLayout = false , reportType = 'VHR' }) => {
  const [inputType, setInputType] = useState<'VIN' | 'LP'>('VIN')
  const [vinInput, setVinInput] = useState('')
  const [plateInput, setPlateInput] = useState('')
  const [stateInput, setStateInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [displayedError, setDisplayedError] = useState<string | null>(null)
  const [showVinTooltip, setShowVinTooltip] = useState(false)
  const [currentURL, setCurrentURL] = useState('')
  const router = useRouter()

  const states = [
    { value: 'AL', label: 'AL - Alabama' },
    { value: 'AK', label: 'AK - Alaska' },
    { value: 'AZ', label: 'AZ - Arizona' },
    { value: 'AR', label: 'AR - Arkansas' },
    { value: 'CA', label: 'CA - California' },
    { value: 'CO', label: 'CO - Colorado' },
    { value: 'CT', label: 'CT - Connecticut' },
    { value: 'DE', label: 'DE - Delaware' },
    { value: 'DC', label: 'DC - Washington DC' },
    { value: 'FL', label: 'FL - Florida' },
    { value: 'GA', label: 'GA - Georgia' },
    { value: 'HI', label: 'HI - Hawaii' },
    { value: 'ID', label: 'ID - Idaho' },
    { value: 'IL', label: 'IL - Illinois' },
    { value: 'IN', label: 'IN - Indiana' },
    { value: 'IA', label: 'IA - Iowa' },
    { value: 'KS', label: 'KS - Kansas' },
    { value: 'KY', label: 'KY - Kentucky' },
    { value: 'LA', label: 'LA - Louisiana' },
    { value: 'ME', label: 'ME - Maine' },
    { value: 'MD', label: 'MD - Maryland' },
    { value: 'MA', label: 'MA - Massachusetts' },
    { value: 'MI', label: 'MI - Michigan' },
    { value: 'MN', label: 'MN - Minnesota' },
    { value: 'MS', label: 'MS - Mississippi' },
    { value: 'MO', label: 'MO - Missouri' },
    { value: 'MT', label: 'MT - Montana' },
    { value: 'NE', label: 'NE - Nebraska' },
    { value: 'NV', label: 'NV - Nevada' },
    { value: 'NH', label: 'NH - New Hampshire' },
    { value: 'NJ', label: 'NJ - New Jersey' },
    { value: 'NM', label: 'NM - New Mexico' },
    { value: 'NY', label: 'NY - New York' },
    { value: 'NC', label: 'NC - North Carolina' },
    { value: 'ND', label: 'ND - North Dakota' },
    { value: 'OH', label: 'OH - Ohio' },
    { value: 'OK', label: 'OK - Oklahoma' },
    { value: 'OR', label: 'OR - Oregon' },
    { value: 'PA', label: 'PA - Pennsylvania' },
    { value: 'RI', label: 'RI - Rhode Island' },
    { value: 'SC', label: 'SC - South Carolina' },
    { value: 'SD', label: 'SD - South Dakota' },
    { value: 'TN', label: 'TN - Tennessee' },
    { value: 'TX', label: 'TX - Texas' },
    { value: 'UT', label: 'UT - Utah' },
    { value: 'VT', label: 'VT - Vermont' },
    { value: 'VA', label: 'VA - Virginia' },
    { value: 'WA', label: 'WA - Washington' },
    { value: 'WV', label: 'WV - West Virginia' },
    { value: 'WI', label: 'WI - Wisconsin' },
    { value: 'WY', label: 'WY - Wyoming' }
  ];

  useEffect(() => {
    if (error) {
      setDisplayedError(error)
    } else {
      const timer = setTimeout(() => {
        setDisplayedError(null)
      }, 300) // This should match the duration in the className
      return () => clearTimeout(timer)
    }
  }, [error])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentURL(window.location.href)
    }
  }, [])

  const isValidVin = (vin: string) => vin.length == 17

  const fetchVinData = async (state: string, plate: string): Promise<string | null> => {
    try {
      const response = await fetch('https://app.detailedvehiclehistory.com/landing/get_license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state,
          plate,
          email: 'test@test.com',
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      return data.vin || null
    } catch (error) {
      console.error('Error fetching VIN:', error)
      return null
    }
  }

  const exportCurrentURL = () => {
    const url = new URL(currentURL);
    let path = url.pathname;

    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    const abbreviation = 'cv';

    const readablePath = path === '' ? '_homePage' : path.replace(/[/:?&=]/g, '_');

    return `${abbreviation}${readablePath}`;
  }

  const redirectToReport = (vin: string) => {
    const baseUrl = 'https://www.clearvin.com/en/';
    const affiliateParam = '?a_aid=b3a49a62';
    const affiliateChannel = '&chan=cv';
    const affiliateTracking = '&variation=' + exportCurrentURL();
    const affiliateData = '&data2=' + exportCurrentURL() + '_2';
    const url = reportType === 'VHR'
      ? `${baseUrl}payment/prepare/${vin}/${affiliateParam}${affiliateChannel}${affiliateTracking}${affiliateData}`
      : `${baseUrl}window-sticker/checkout/${vin}/${affiliateParam}}${affiliateChannel}${affiliateTracking}${affiliateData}`
    router.push(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    let vin: string | null = null

    if (inputType === 'VIN') {
      if (!isValidVin(vinInput)) {
        setError('Please ensure that your VIN is in proper format. 17 digits')
        return
      }
      vin = vinInput
    } else {
      if (!plateInput) {
        setError('The plate field is required.')
        return
      }
      if (!stateInput) {
        setError('The state field is required.')
        return
      }
      vin = await fetchVinData(stateInput, plateInput)
      if (!vin) {
        setError("Sorry, we couldn't find your record. Please check the License Plate and try again.")
        return
      }
    }

    if (vin) {
      redirectToReport(vin)
    }
  }

  const mobileLayout = forceMobileLayout || 'md'

  return (
    <div className={`w-full ${forceMobileLayout ? '' : 'max-w-3xl mx-auto'}`}>
      <div className="flex justify-start mb-4 space-x-2">
        <button
          onClick={() => setInputType('VIN')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            inputType === 'VIN'
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          by VIN
        </button>
        <button
          onClick={() => setInputType('LP')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            inputType === 'LP'
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          by US License Plate
        </button>
      </div>
      <form onSubmit={handleSubmit} className="relative">
        <div className={`bg-white ${mobileLayout === true ? 'rounded-3xl' : 'md:rounded-full rounded-3xl'} shadow-lg border-2 border-blue-200 ${mobileLayout === true ? 'p-0' : 'md:p-2'} ${mobileLayout === true ? '' : 'md:flex md:items-center'}`}>
          {inputType === 'VIN' ? (
            <input
              type="text"
              placeholder="Enter VIN Number"
              value={vinInput}
              onChange={(e) => setVinInput(e.target.value)}
              className={`w-full px-6 py-4 text-lg ${mobileLayout === true ? 'rounded-3xl' : 'rounded-3xl md:rounded-full'} focus:outline-none`}
            />
          ) : (
            <div className={`w-full ${mobileLayout === true ? '' : 'md:flex md:items-center'}`}>
              <input
                type="text"
                placeholder="License Plate"
                value={plateInput}
                onChange={(e) => setPlateInput(e.target.value)}
                className={`w-full ${mobileLayout === true ? '' : 'md:w-1/2'} px-6 py-4 text-lg ${mobileLayout === true ? 'rounded-t-3xl rounded-b-none' : 'rounded-t-3xl rounded-b-none md:rounded-l-full'} focus:outline-none border-b ${mobileLayout === true ? '' : 'md:border-b-0 md:border-r'} border-gray-200`}
              />
              <div className={`relative w-full ${mobileLayout === true ? '' : 'md:w-1/2'}`}>
                <select
                  value={stateInput}
                  onChange={(e) => setStateInput(e.target.value)}
                  className={`w-full px-6 py-4 text-lg appearance-none focus:outline-none ${mobileLayout === true ? 'rounded-3xl' : 'rounded-3xl md:rounded-r-full'}`}
                >
                  <option value="" disabled>State</option>
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>{state.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`w-full ${mobileLayout === true ? '' : 'md:w-auto md:absolute md:right-2 md:top-1/2 md:transform md:-translate-y-1/2'} bg-blue-500 text-white px-6 py-4 rounded-3xl ${mobileLayout === true ? '' : 'md:rounded-full'} hover:bg-blue-600 transition-colors duration-200 shadow-md mt-2 ${mobileLayout === true ? '' : 'md:mt-0'} min-w-[140px] whitespace-nowrap`}
        >
          Check {inputType === 'VIN' ? 'VIN' : 'Plate'}
        </button>
      </form>
      <div 
        className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
          error ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-red-500 text-sm">
          {displayedError || '\u00A0'}
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
        <span>No VIN? <Link className="text-blue-500 hover:text-blue-600 transition-colors duration-200" href="/license-plate-lookup">Use license plate decoder</Link>
          </span>
        <span className="mx-2">•</span>
        <Link href="/sample" className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
          View our sample report
        </Link>
      </div>
    </div>
  )
}

export default SiteForm