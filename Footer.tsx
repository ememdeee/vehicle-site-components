import React from 'react'
import { Search, Linkedin, Github } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div className="flex flex-col mb-6 md:mb-0">
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/ChassisVIN.webp"
                alt="ChassisVIN"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="text-xl font-semibold text-gray-900">ChassisVIN</span>
            </Link>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 mb-2">Service</span>
              <nav className="flex flex-col space-y-2">
                <Link href="/vin-decoder" className="text-gray-600 hover:text-gray-900">VIN Decoder</Link>
                <Link href="/classic-lookup" className="text-gray-600 hover:text-gray-900">Classic Car Lookup</Link>
                <Link href="/window-sticker" className="text-gray-600 hover:text-gray-900">Window Sticker</Link>
                <Link href="/build-sheet-by-vin" className="text-gray-600 hover:text-gray-900">Build Sheet</Link>
                <Link href="/vehicle-recalls" className="text-gray-600 hover:text-gray-900">Vehicle Recalls by VIN</Link>
                <Link href="/vin-explorer" className="text-gray-600 hover:text-gray-900">VIN Explorer</Link>
              </nav>
            </div>
          </div>
          <div className="flex flex-col mb-6 md:mb-0">
            <span className="font-semibold text-gray-900 mb-2">Other Services</span>
            <nav className="flex flex-col space-y-2">
              <Link href="/vin-check" className="text-gray-600 hover:text-gray-900">US Vin Check</Link>
              <Link href="/license-plate-lookup" className="text-gray-600 hover:text-gray-900">License Plate Lookup</Link>
              <Link href="/paint-code-by-vin" className="text-gray-600 hover:text-gray-900">Paint Code by VIN</Link>
              <Link href="/build-sheet-by-vin" className="text-gray-600 hover:text-gray-900">Buildsheet</Link>
              <Link href="/warranty-by-vin" className="text-gray-600 hover:text-gray-900">Warranty Check</Link>
              <Link href="/rv-vin-lookup" className="text-gray-600 hover:text-gray-900">RV & Camper Check</Link>
              <Link href="/unlimited-vehicle-history-reports" className="text-gray-600 hover:text-gray-900">Become a Dealer</Link>
            </nav>
          </div>
          <div className="flex flex-col mb-6 md:mb-0">
            <span className="font-semibold text-gray-900 mb-2">Resources</span>
            <nav className="flex flex-col space-y-2">
              <Link href="/blogs" className="text-gray-600 hover:text-gray-900">Blogs</Link>
              <Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link>
              <Link href="/sample" className="text-gray-600 hover:text-gray-900">Sample Report</Link>
              <Link href="/about-us" className="text-gray-600 hover:text-gray-900">About Us</Link>
              <Link href="/contact-us" className="text-gray-600 hover:text-gray-900">Contact Us</Link>
            </nav>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold text-gray-900 mb-2">Follow Us</span>
            <div className="flex space-x-4">
              <a href="/vin-explorer" aria-label="Search" className="text-gray-400 hover:text-gray-600">
                <Search className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/company/chassisvin/" aria-label="LinkedIn profile of Muhammad Basurah" className="text-gray-400 hover:text-gray-600">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://github.com/ememdeee" aria-label="GitHub profile of Muhammad Basurah" className="text-gray-400 hover:text-gray-600">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="text-center mb-4 md:mb-0">© 2025 ChassisVIN. Made with ❤</p>
          {/* <p className="text-center mb-4 md:mb-0">© 2025 ChassisVIN. Made with ❤ by <a href='https://www.basrh.com/' target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">Basrh</a> | <a href='https://cloudteamize.com/' target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">CloudTeamize</a></p> */}
          
          <div className="flex space-x-4">
            <a href="https://chassisvin.freshdesk.com/support/home" target="_blank" className="hover:text-gray-700">Help</a>
            <Link href="/privacy-policy" className="hover:text-gray-700">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-gray-700">Terms of Use</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-700">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

