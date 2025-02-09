import React from 'react'
import SiteForm from './SiteForm'
import Image from 'next/image'
import Link from 'next/link'

export default function SaveBanner() {
  return (
    <section 
      className="relative bg-blue-50 md:bg-transparent py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('https://epicvin.com/img2/bunners-bg/webp/save-banner-bg@1x.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative max-w-7xl mx-auto text-center">
        <p className="text-2xl font-bold text-gray-900 mb-2">Save Thousands of Dollars</p>
        <p className="text-lg text-gray-600 mb-6">Learn everything there is to know about your next car.</p>
        
        <div className="max-w-xl mx-auto">
          <SiteForm />
        </div>

        <div className="mt-4 flex flex-col items-center text-sm text-gray-600">
          <div>
            <span>Need the Original Specs for Your Car?</span>{' '}
            <Link href="/window-sticker" className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
              Get Window Sticker
            </Link>
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center space-x-4">
          <Image src="/guaranteed-safe-checkout.png" alt="Safe checkout guaranteed" width={56} height={28} />
          <Image src="/niada.png" alt="Niada logo" width={41} height={25} />
          <Image src="/blockchain.png" alt="Blockchain confirmed data" width={70} height={21} />
        </div>
      </div>
    </section>
  )
}